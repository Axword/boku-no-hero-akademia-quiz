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

  // --- Host Logic: Handling Incoming Connections ---
  useEffect(() => {
    if (!peer || !isHost) return;

    peer.on('connection', (conn) => {
      conn.on('open', () => {
        // New player joining
        conn.on('data', (data: any) => {
          handleHostReceiveData(conn, data);
        });
      });
      
      setConnections(prev => [...prev, conn]);
    });
  }, [peer, isHost, players, gameState]); // Deps might need tuning to avoid stale closures if not careful, but handleHostReceiveData will access state via Refs or setState callbacks if needed.
  // Actually, for complex state in event listeners, it's better to use refs or functional updates.

  // --- Client Logic: Handling Connection to Host ---
  useEffect(() => {
    if (!peer || isHost) return;
    // Client listeners are set up in joinGame
  }, [peer, isHost]);


  // --- Game Loop (Host Only) ---
  useEffect(() => {
    if (!isHost) return;

    // Broadcast state whenever it changes
    broadcastState();
  }, [players, gameState, currentTurnPlayerId, currentCategory, currentQuestion, answers, timeLeft]);


  // --- Helper: Broadcast ---
  const broadcastState = () => {
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
  const handleHostReceiveData = (conn: DataConnection, data: any) => {
    switch (data.type) {
      case 'JOIN_REQUEST':
        const newPlayer: Player = {
          id: conn.peer,
          name: data.name,
          score: 0,
          isHost: false,
          avatarId: Math.floor(Math.random() * 5)
        };
        // Check if game is in lobby
        if (gameState !== 'LOBBY') {
          // Reject (Optional: could implement spectator)
          return;
        }
        
        setPlayers(prev => {
           if (prev.find(p => p.id === newPlayer.id)) return prev;
           playSound('join');
           return [...prev, newPlayer];
        });
        break;

      case 'SELECT_CATEGORY':
        if (gameState === 'CATEGORY_SELECT' && conn.peer === currentTurnPlayerId) {
          handleCategorySelected(data.category);
        }
        break;

      case 'SUBMIT_ANSWER':
        if (gameState === 'QUESTION') {
           setAnswers(prev => ({
             ...prev,
             [conn.peer]: data.answer
           }));
           // If all players answered, maybe fast forward?
           // For now, wait for timer.
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
    if (players.length < 1) return; // Allow solo for testing, but prompt says multiplayer.
    
    // Pick random starting player
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
      // Fallback if we run out of questions in a category (unlikely with 100+ but possible)
      // Just pick any random question or reset used
      // For now, pick a random one from category even if used
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
    setCurrentQuestion(question);
    setAnswers({});
    setGameState('QUESTION');
    setTimeLeft(15); // 15 seconds to answer
    playSound('turn');

    // Timer Logic
    if (timerRef.current) window.clearInterval(timerRef.current);
    
    // We only decrement here. The end condition is handled by the useEffect watching timeLeft.
    const interval = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          window.clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = interval;
  };

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
         const timer = setTimeout(() => {
             const currentPlayers = playersRef.current;
             const currentTurnId = currentTurnPlayerIdRef.current;
             
             const currentPlayerIdx = currentPlayers.findIndex(p => p.id === currentTurnId);
             // Handle if player left?
             const safeIdx = currentPlayerIdx === -1 ? 0 : currentPlayerIdx;
             
             const nextPlayerIdx = (safeIdx + 1) % currentPlayers.length;
             setCurrentTurnPlayerId(currentPlayers[nextPlayerIdx].id);
             
             setGameState('CATEGORY_SELECT');
             playSound('turn');
         }, 5000);
         return () => clearTimeout(timer);
     }
  }, [gameState, isHost]); // Only trigger when entering ROUND_RESULT

  const selectCategory = (category: Category) => {
    if (isHost) {
      handleCategorySelected(category);
    } else {
      hostConnection.current?.send({ type: 'SELECT_CATEGORY', category });
    }
  };

  const submitAnswer = (answer: string) => {
    if (isHost) {
       setAnswers(prev => ({ ...prev, [myPeerId!]: answer }));
    } else {
       hostConnection.current?.send({ type: 'SUBMIT_ANSWER', answer });
    }
  };
  
  const playAgain = () => {
      // Reset scores but keep players
      if(isHost) {
          setPlayers(prev => prev.map(p => ({...p, score: 0})));
          setGameState('LOBBY');
      }
  };

  const winner = null; // Calculated if needed

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
      roomCode,
      createGame,
      joinGame,
      startGame,
      selectCategory,
      submitAnswer,
      playAgain,
      playSound
    }}>
      {children}
    </GameContext.Provider>
  );
};
