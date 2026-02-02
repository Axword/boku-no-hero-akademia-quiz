import { useGame } from '../context/GameContext';
import { CATEGORIES } from '../data/questions';

export const CategorySelect = () => {
  const { currentTurnPlayerId, myPeerId, selectCategory, players } = useGame();

  const isMyTurn = currentTurnPlayerId === myPeerId;
  const currentPlayer = players.find(p => p.id === currentTurnPlayerId);

  return (
    <div className="w-full max-w-5xl animate-fade-in">
       <div className="text-center mb-10 bg-white border-4 border-black p-6 comic-shadow relative">
         <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
         <h2 className="text-4xl font-black font-display uppercase tracking-wider mb-2">
           {isMyTurn ? <span className="text-green-600">TWOJA KOLEJ!</span> : <span className="text-indigo-600">KOLEJ: {currentPlayer?.name}</span>}
         </h2>
         <p className="text-xl text-slate-600 font-bold uppercase tracking-wide">Wybierz cel misji (Kategorię)</p>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
         {CATEGORIES.map((cat) => (
           <button
             key={cat}
             onClick={() => isMyTurn && selectCategory(cat)}
             disabled={!isMyTurn}
             className={`
               p-8 border-4 border-black font-black font-display text-2xl uppercase transition-all
               ${isMyTurn 
                 ? 'bg-white hover:bg-yellow-400 comic-shadow-sm comic-shadow-hover active:comic-shadow-active cursor-pointer text-slate-900' 
                 : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'}
             `}
           >
             {cat}
           </button>
         ))}
       </div>
    </div>
  );
};
