import { GameProvider, useGame } from './context/GameContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameScreen } from './components/GameScreen';

function GameContainer() {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-indigo-900 font-sans text-slate-900 overflow-hidden relative flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      
      {/* Hero Stripe */}
      <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400 z-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600 z-20"></div>

      <div className="container mx-auto px-4 py-6 relative z-10 flex-1 flex flex-col">
        <header className="mb-8 text-center flex flex-col items-center">
          <div className="relative inline-block transform hover:scale-105 transition-transform duration-300">
             <h1 className="text-6xl md:text-8xl font-display font-black text-yellow-400 uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-stroke">
              PLUS ULTRA
             </h1>
             <span className="absolute -bottom-4 right-0 md:-right-8 bg-red-600 text-white font-display text-2xl md:text-3xl px-3 py-1 border-2 border-black -rotate-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
               QUIZ
             </span>
          </div>
          <div className="mt-6 bg-white border-2 border-black px-6 py-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <p className="text-lg md:text-xl font-bold uppercase tracking-widest text-indigo-900">
              Boku No Hero Academia
            </p>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          {gameState === 'LOBBY' && <WelcomeScreen />}
          {gameState !== 'LOBBY' && gameState !== 'GAME_OVER' && <GameScreen />}
        </main>
        
        <footer className="mt-8 text-center text-indigo-200 text-sm font-bold opacity-60">
          Fanowski Quiz BNHA • Stworzony dla zabawy
        </footer>
      </div>
    </div>
  );
}

export function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
