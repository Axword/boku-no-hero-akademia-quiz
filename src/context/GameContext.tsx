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

  // --- Initialization ---

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on('open', (id) => {
      setMyPeerId(id);
      setPeer(newPeer);
    });
    
    // Cleanup
    return () => {
      newPeer.destroy();
    };
  }, []);

  // --- Ref for Event Listeners ---
  // We use a ref to hold the latest state so event listeners (which are bound once)
  // can access the current state without being re-bound.
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

    // Only set up the connection listener ONCE per peer instance
    const handleConnection = (conn: DataConnection) => {
      conn.on('open', () => {
        setConnections(prev => [...prev, conn]);
        
        conn.on('data', (data: any) => {
          // Use Ref to access latest state
          const currentState = stateRef.current;
          
          if (!currentState.isHost && !currentState.isSinglePlayer) return; // Only host processes data
          
          handleHostReceiveData(conn, data, currentState);
        });
        
        // Send initial state if we are already in a game
        if (stateRef.current.isHost) {
            // Slight delay to ensure connection is ready
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
  }, [peer]); // Only depend on peer


  // --- Game Loop (Host Only) ---
  useEffect(() => {
    if (!isHost) return;
    // Broadcast state whenever it changes
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
  // Now accepts currentState as argument to avoid closure staleness
  const handleHostReceiveData = (conn: DataConnection, data: any, currentState: any) => {
    switch (data.type) {
      case 'JOIN_REQUEST':
        // Check if game is in lobby
        if (currentState.gameState !== 'LOBBY') {
          // Reject
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
    
    // Filter questions by category and unused
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
    // Shuffle options to prevent predictable answer positions
    const shuffledOptions = [...question.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    const questionWithShuffledOptions = { ...question, options: shuffledOptions };

    setCurrentQuestion(questionWithShuffledOptions);
    setAnswers({});
    setGameState('QUESTION');
    setTimeLeft(15); // 15 seconds to answer
    playSound('turn');

    if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
    }
    
    const interval = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // Interval will be cleared by the useEffect cleanup when state changes
          // or we can safely return 0 here.
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = interval;
  };

  // CRITICAL: Cleanup timer when NOT in QUESTION state
  useEffect(() => {
    if (gameState !== 'QUESTION') {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }
  }, [gameState]);

  // FIX: Timer and Round End Logic
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

  // Ref to access latest players/turn in timeout
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
    // Safety check: don't accept answers if time is up
    if (timeLeft <= 0 && gameState === 'QUESTION') return;

    if (isHost) {
       setAnswers(prev => {
           // Prevent answering twice
           if (prev[myPeerId!]) return prev;
           return { ...prev, [myPeerId!]: answer };
       });
       
       if (isSinglePlayer) {
         // Instant feedback for single player
         // Force timer to 0 to trigger Round End
         setTimeLeft(0);
       }
    } else {
       hostConnection.current?.send({ type: 'SUBMIT_ANSWER', answer });
    }
  };
  
  const playAgain = () => {
      if(isHost) {
          setPlayers(prev => prev.map(p => ({...p, score: 0})));
          setUsedQuestionIds(new Set()); // Reset used questions
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
