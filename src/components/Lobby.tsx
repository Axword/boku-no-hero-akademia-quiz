import { useGame } from '../context/GameContext';
import { Copy, User, Crown } from 'lucide-react';

export const Lobby = () => {
  const { players, isHost, startGame, roomCode, playSound } = useGame();

  const handleCopy = () => {
    if (roomCode) {
        navigator.clipboard.writeText(roomCode);
        playSound('click');
        alert('Skopiowano kod do schowka!');
    }
  };

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      <div className="bg-white border-4 border-black p-8 comic-shadow relative">
        <div className="absolute -top-5 -right-5 bg-indigo-600 text-white font-black font-display text-xl px-6 py-2 border-4 border-black comic-shadow-sm">
          LOBBY
        </div>

        <div className="text-center mb-8">
            <p className="text-sm font-bold uppercase text-slate-500 mb-2 tracking-wider">Kod Pokoju</p>
            <div 
                onClick={handleCopy}
                className="inline-flex items-center gap-3 bg-yellow-100 border-4 border-black border-dashed px-8 py-4 cursor-pointer hover:bg-yellow-200 transition-colors group"
            >
                <span className="text-4xl font-mono font-black tracking-widest text-slate-900 group-hover:scale-105 transition-transform">{roomCode}</span>
                <Copy size={24} className="text-slate-700" />
            </div>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase">Kliknij, aby skopiować</p>
        </div>

        <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-black font-display uppercase border-b-4 border-black pb-2 flex justify-between items-end">
                <span>Bohaterowie</span>
                <span className="text-lg bg-black text-white px-2 py-0.5">{players.length}/4</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {players.map((player) => (
                    <div key={player.id} className="flex items-center gap-3 bg-white p-3 border-4 border-black comic-shadow-sm">
                        <div className={`w-12 h-12 border-2 border-black flex items-center justify-center bg-indigo-500 text-white shadow-sm`}>
                            <User size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-lg leading-tight truncate">{player.name}</p>
                            {player.isHost && <span className="text-xs bg-yellow-400 px-1.5 py-0.5 font-bold border border-black inline-flex items-center gap-1 mt-1"><Crown size={12}/> HOST</span>}
                        </div>
                    </div>
                ))}
                {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
                     <div key={`empty-${i}`} className="flex items-center gap-3 bg-slate-50 p-3 border-4 border-dashed border-slate-300 opacity-60">
                        <div className="w-12 h-12 bg-slate-200 flex items-center justify-center border-2 border-slate-300">
                            <span className="text-slate-400 text-2xl font-black">?</span>
                        </div>
                        <p className="font-bold text-slate-400 uppercase tracking-wide">Oczekiwanie...</p>
                     </div>
                ))}
            </div>
        </div>

        {isHost ? (
            <button
                onClick={() => { playSound('click'); startGame(); }}
                disabled={players.length < 1} 
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black font-display tracking-widest text-3xl py-4 border-4 border-black comic-shadow-sm comic-shadow-active transition-all uppercase"
            >
                Start Misji!
            </button>
        ) : (
             <div className="text-center p-6 bg-yellow-100 border-4 border-black animate-pulse">
                <p className="font-black text-xl uppercase">Czekam na hosta...</p>
             </div>
        )}
      </div>
    </div>
  );
};
