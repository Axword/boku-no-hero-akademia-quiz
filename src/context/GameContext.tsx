import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { questions, Category, Question } from '../data/questions';
import { useSound } from '../hooks/useSound';

// --- Types ---

export type GameState = 'LOBBY' | 'CATEGORY_SELECT' | 'QUESTION' | 'ROUND_RESULT' | 'GAME_OVER';

export interface Player {
  id: string; // Peer ID
  name: string;
  score: number;
  isHost: boolean;
  avatarId: number; // For fun visual
}

export interface GameContextType {
  // State
  myPeerId: string | null;
  players: Player[];
  gameState: GameState;
  currentTurnPlayerId: string | null;
  currentCategory: Category | null;
  currentQuestion: Question | null;
  answers: Record<string, string>; // playerId -> answer option
  timeLeft: number;
  winner: Player | null;
  isHost: boolean;
  roomCode: string | null;
  
  // Actions
  createGame: (name: string) => void;
  joinGame: (code: string, name: string) => void;
  startGame: () => void;
  selectCategory: (category: Category) => void;
  submitAnswer: (answer: string) => void;
  playAgain: () => void;
  playSound: (type: 'correct' | 'wrong' | 'click' | 'turn' | 'join') => void;
  startSinglePlayer: (name: string) => void;
  isSinglePlayer: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// --- Provider ---

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myPeerId, setMyPeerId] = useState<string | null>(null);
  const [connections, setConnections] = useState<DataConnection[]>([]);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  const hostConnection = useRef<DataConnection | null>(null);

  // Game State
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());

  const { playSound } = useSound();
  const timerRef = useRef<number | null>(null);

  // --- KLUCZOWA ZMIANA 1: Konfiguracja STUN serwerów ---
  useEffect(() => {
    const newPeer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' }
        ]
      }
    });
    
    newPeer.on('open', (id) => {
      setMyPeerId(id);
      setPeer(newPeer);
    });
    
    newPeer.on('error', (err) => {
      console.error('PeerJS error:', err);
    });
    
    // Cleanup
    return () => {
      newPeer.destroy();
    };
  }, []);

  // --- Ref for Event Listeners ---
  const stateRef = useRef({
    players,
    gameState,
    currentTurnPlayerId,
    answers,
    isSinglePlayer,
    isHost
  });

  useEffect(() => {
    stateRef.current = {
      players,
      gameState,
      currentTurnPlayerId,
      answers,
      isSinglePlayer,
      isHost
    };
  }, [players, gameState, currentTurnPlayerId, answers, isSinglePlayer, isHost]);

  // --- Host Logic: Handling Incoming Connections ---
  useEffect(() => {
    if (!peer) return;

    const handleConnection = (conn: DataConnection) => {
      conn.on('open', () => {
        setConnections(prev => [...prev, conn]);
        
        conn.on('data', (data: any) => {
          const currentState = stateRef.current;
          
          if (!currentState.isHost && !currentState.isSinglePlayer) return;
          
          handleHostReceiveData(conn, data, currentState);
        });
        
        if (stateRef.current.isHost) {
            setTimeout(() => broadcastState(), 100);
        }
      });
      
      conn.on('close', () => {
          setConnections(prev => prev.filter(c => c !== conn));
          setPlayers(prev => prev.filter(p => p.id !== conn.peer));
      });
    };

    peer.on('connection', handleConnection);

    return () => {
      peer.off('connection', handleConnection);
    };
  }, [peer]);

  // --- Game Loop (Host Only) ---
  useEffect(() => {
    if (!isHost) return;
    broadcastState();
  }, [players, gameState, currentTurnPlayerId, currentCategory, currentQuestion, answers, timeLeft, isHost]);

  // --- Helper: Broadcast ---
  const broadcastState = () => {
    if (isSinglePlayer) return;

    const state = {
      type: 'UPDATE_STATE',
      payload: {
        players,
        gameState,
        currentTurnPlayerId,
        currentCategory,
        currentQuestion,
        answers,
        timeLeft
      }
    };
    
    connections.forEach(conn => {
      if(conn.open) conn.send(state);
    });
  };

  // --- Host Logic: Data Handler ---
  const handleHostReceiveData = (conn: DataConnection, data: any, currentState: any) => {
    switch (data.type) {
      case 'JOIN_REQUEST':
        if (currentState.gameState !== 'LOBBY') {
          return;
        }
        
        const newPlayer: Player = {
          id: conn.peer,
          name: data.name,
          score: 0,
          isHost: false,
          avatarId: Math.floor(Math.random() * 5)
        };
        
        setPlayers(prev => {
           if (prev.find(p => p.id === newPlayer.id)) return prev;
           playSound('join');
           return [...prev, newPlayer];
        });
        break;

      case 'SELECT_CATEGORY':
        if (currentState.gameState === 'CATEGORY_SELECT' && conn.peer === currentState.currentTurnPlayerId) {
          handleCategorySelected(data.category);
        }
        break;

      case 'SUBMIT_ANSWER':
        if (currentState.gameState === 'QUESTION') {
           setAnswers(prev => {
               const newAnswers = { ...prev, [conn.peer]: data.answer };
               
               // KLUCZOWA ZMIANA 2: Sprawdzenie czy wszyscy odpowiedzieli
               if (Object.keys(newAnswers).length === currentState.players.length) {
                 // Wszyscy odpowiedzieli - natychmiast kończymy rundę
                 setTimeLeft(0);
               }
               
               return newAnswers;
           });
        }
        break;
    }
  };

  // --- Methods ---

  const createGame = (name: string) => {
    if (!myPeerId) return;
    setIsHost(true);
    setRoomCode(myPeerId);
    setPlayers([{
      id: myPeerId,
      name,
      score: 0,
      isHost: true,
      avatarId: Math.floor(Math.random() * 5)
    }]);
    setGameState('LOBBY');
  };

  const startSinglePlayer = (name: string) => {
    const fakeId = myPeerId || `SP_${Math.floor(Math.random() * 10000)}`;
    setMyPeerId(fakeId);
    setIsHost(true);
    setIsSinglePlayer(true);
    setRoomCode('SINGLE_PLAYER');
    
    const player: Player = {
        id: fakeId,
        name,
        score: 0,
        isHost: true,
        avatarId: Math.floor(Math.random() * 5)
    };
    
    setPlayers([player]);
    setCurrentTurnPlayerId(fakeId);
    setGameState('CATEGORY_SELECT');
    playSound('turn');
  };

  const joinGame = (code: string, name: string) => {
    if (!peer || !myPeerId) return;
    
    const conn = peer.connect(code);
    conn.on('open', () => {
      hostConnection.current = conn;
      conn.send({ type: 'JOIN_REQUEST', name });
      setRoomCode(code);
    });

    conn.on('data', (data: any) => {
      if (data.type === 'UPDATE_STATE') {
        const { players, gameState, currentTurnPlayerId, currentCategory, currentQuestion, answers, timeLeft } = data.payload;
        setPlayers(players);
        setGameState(gameState);
        setCurrentTurnPlayerId(currentTurnPlayerId);
        setCurrentCategory(currentCategory);
        setCurrentQuestion(currentQuestion);
        setAnswers(answers);
        setTimeLeft(timeLeft);
      }
    });

    conn.on('close', () => {
      alert('Connection to host lost');
      window.location.reload();
    });
    
    conn.on('error', (err) => {
      console.error('Connection error:', err);
      alert('Failed to connect to game');
    });
  };

  const startGame = () => {
    if (!isHost) return;
    if (players.length < 1) return; 
    
    const randomIdx = Math.floor(Math.random() * players.length);
    setCurrentTurnPlayerId(players[randomIdx].id);
    setGameState('CATEGORY_SELECT');
    playSound('turn');
  };

  const handleCategorySelected = (category: Category) => {
    setCurrentCategory(category);
    
    const availableQuestions = questions.filter(q => q.category === category && !usedQuestionIds.has(q.id));
    
    if (availableQuestions.length === 0) {
      const anyCatQuestions = questions.filter(q => q.category === category);
      const randomQ = anyCatQuestions[Math.floor(Math.random() * anyCatQuestions.length)];
      startQuestion(randomQ);
    } else {
      const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setUsedQuestionIds(prev => new Set(prev).add(randomQ.id));
      startQuestion(randomQ);
    }
  };

  const startQuestion = (question: Question) => {
    const shuffledOptions = [...question.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    const questionWithShuffledOptions = { ...question, options: shuffledOptions };

    setCurrentQuestion(questionWithShuffledOptions);
    setAnswers({});
    setGameState('QUESTION');
    setTimeLeft(15);
    playSound('turn');

    if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
    }
    
    const interval = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = interval;
  };

  useEffect(() => {
    if (gameState !== 'QUESTION') {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }
  }, [gameState]);

  useEffect(() => {
    if (!isHost) return;

    if (gameState === 'QUESTION' && timeLeft === 0) {
      setGameState('ROUND_RESULT');
    
      if (currentQuestion) {
        setPlayers(prevPlayers => {
          return prevPlayers.map(p => {
            const ans = answers[p.id];
            let scoreChange = 0;
            if (ans === currentQuestion.correctAnswer) {
              scoreChange = 1;
            } else if (ans) {
              scoreChange = -1;
            } else {
              scoreChange = 0; 
            }
            return { ...p, score: p.score + scoreChange };
          });
        });
      }
    }
  }, [timeLeft, gameState, isHost, answers, currentQuestion]);

  const playersRef = useRef(players);
  const currentTurnPlayerIdRef = useRef(currentTurnPlayerId);
  useEffect(() => { playersRef.current = players; }, [players]);
  useEffect(() => { currentTurnPlayerIdRef.current = currentTurnPlayerId; }, [currentTurnPlayerId]);

  useEffect(() => {
     if (!isHost) return;
     if (gameState === 'ROUND_RESULT') {
         const timeoutDuration = isSinglePlayer ? 1000 : 2500;
         const timer = setTimeout(() => {
             const currentPlayers = playersRef.current;
             const currentTurnId = currentTurnPlayerIdRef.current;
             
             const currentPlayerIdx = currentPlayers.findIndex(p => p.id === currentTurnId);
             
             const nextPlayerIdx = (currentPlayerIdx + 1) % currentPlayers.length;
             setCurrentTurnPlayerId(currentPlayers[nextPlayerIdx].id);
             
             setGameState('CATEGORY_SELECT');
             playSound('turn');
         }, timeoutDuration);
         return () => clearTimeout(timer);
     }
  }, [gameState, isHost, isSinglePlayer]);

  const selectCategory = (category: Category) => {
    if (isHost) {
      handleCategorySelected(category);
    } else {
      hostConnection.current?.send({ type: 'SELECT_CATEGORY', category });
    }
  };

  const submitAnswer = (answer: string) => {
    if (timeLeft <= 0 && gameState === 'QUESTION') return;

    if (isHost) {
       setAnswers(prev => {
           if (prev[myPeerId!]) return prev;
           const newAnswers = { ...prev, [myPeerId!]: answer };
           
           // KLUCZOWA ZMIANA 3: Sprawdzenie czy wszyscy odpowiedzieli (dla hosta)
           if (Object.keys(newAnswers).length === players.length) {
             setTimeLeft(0);
           }
           
           return newAnswers;
       });
       
       if (isSinglePlayer) {
         setTimeLeft(0);
       }
    } else {
       // Klient wysyła odpowiedź do hosta
       hostConnection.current?.send({ type: 'SUBMIT_ANSWER', answer });
    }
  };
  
  const playAgain = () => {
      if(isHost) {
          setPlayers(prev => prev.map(p => ({...p, score: 0})));
          setUsedQuestionIds(new Set());
          if (isSinglePlayer) {
              setGameState('CATEGORY_SELECT');
          } else {
              setGameState('LOBBY');
          }
      }
  };

  const winner = null;

  return (
    <GameContext.Provider value={{
      myPeerId,
      players,
      gameState,
      currentTurnPlayerId,
      currentCategory,
      currentQuestion,
      answers,
      timeLeft,
      winner,
      isHost,
      isSinglePlayer,
      roomCode,
      createGame,
      joinGame,
      startGame,
      selectCategory,
      submitAnswer,
      playAgain,
      playSound,
      startSinglePlayer
    }}>
      {children}
    </GameContext.Provider>
  );
};