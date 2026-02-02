import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Lobby } from './Lobby';
import { HelpCircle, Users, Play, User } from 'lucide-react';

export const WelcomeScreen = () => {
  const { createGame, joinGame, roomCode, playSound, startSinglePlayer } = useGame();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<'menu' | 'join' | 'tutorial'>('menu');

  if (roomCode) {
    return <Lobby />;
  }

  const handleCreate = () => {
    if (!name.trim()) return alert('Podaj imię!');
    playSound('click');
    createGame(name);
  };

  const handleSinglePlayer = () => {
    if (!name.trim()) return alert('Podaj imię!');
    playSound('click');
    startSinglePlayer(name);
  };

  const handleJoin = () => {
    if (!name.trim() || !code.trim()) return alert('Podaj imię i kod!');
    playSound('click');
    joinGame(code, name);
  };

  if (mode === 'tutorial') {
    return (
      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full relative animate-fade-in">
        <h2 className="text-3xl font-display font-black mb-6 text-center uppercase tracking-wider">Jak grać?</h2>
        <ul className="space-y-4 text-lg font-bold text-slate-800 list-disc pl-6">
          <li>Zbierz do 4 osób (wyślij im kod pokoju).</li>
          <li>Gra odbywa się turowo.</li>
          <li>W każdej turze jeden gracz wybiera kategorię.</li>
          <li>Wszyscy odpowiadają na to samo pytanie.</li>
          <li>Poprawna odpowiedź: <span className="text-green-600">+1 pkt</span>.</li>
          <li>Błędna odpowiedź: <span className="text-red-600">-1 pkt</span>.</li>
          <li>Brak odpowiedzi: 0 pkt.</li>
          <li>Wygrywa osoba z największą liczbą punktów!</li>
        </ul>
        <button 
          onClick={() => { playSound('click'); setMode('menu'); }}
          className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black font-display text-2xl py-3 border-4 border-black comic-shadow-sm comic-shadow-active transition-all"
        >
          ZROZUMIAŁEM!
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md animate-fade-in">
      <div className="bg-white border-4 border-black p-8 w-full comic-shadow">
        
        {mode === 'menu' && (
          <div className="space-y-4">
            <div className="text-center space-y-2 mb-6">
              <label className="block text-2xl font-black font-display uppercase">Twoje Imię BOHATERA</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Np. Deku"
                className="w-full bg-slate-100 border-4 border-black p-3 text-xl font-bold focus:outline-none focus:bg-yellow-100 focus:border-indigo-600 transition-colors placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleCreate}
              className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black font-display tracking-widest text-2xl py-4 border-4 border-black comic-shadow-sm comic-shadow-active transition-all"
            >
              <Play size={28} strokeWidth={3} /> STWÓRZ POKÓJ
            </button>

            <button
              onClick={handleSinglePlayer}
              className="w-full flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-black font-display tracking-widest text-2xl py-4 border-4 border-black comic-shadow-sm comic-shadow-active transition-all"
            >
              <User size={28} strokeWidth={3} /> SOLO MISJA
            </button>

            <button
              onClick={() => { playSound('click'); setMode('join'); }}
              className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-black font-display tracking-widest text-2xl py-4 border-4 border-black comic-shadow-sm comic-shadow-active transition-all"
            >
              <Users size={28} strokeWidth={3} /> DOŁĄCZ DO GRY
            </button>

            <button
              onClick={() => { playSound('click'); setMode('tutorial'); }}
              className="w-full flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-black font-black font-display text-xl py-2 border-4 border-black comic-shadow-sm comic-shadow-active transition-all"
            >
              <HelpCircle size={24} strokeWidth={2.5} /> PORADNIK
            </button>
          </div>
        )}

        {mode === 'join' && (
          <div className="space-y-6">
            <h3 className="text-3xl font-black font-display text-center uppercase tracking-wider">Dołącz do misji</h3>
             <div className="space-y-2">
              <label className="block text-lg font-bold uppercase">Twoje Imię</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-100 border-4 border-black p-3 text-xl font-bold focus:outline-none focus:bg-yellow-100 focus:border-indigo-600 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-bold uppercase">Kod Pokoju</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Wklej kod tutaj"
                className="w-full bg-slate-100 border-4 border-black p-3 text-xl font-bold focus:outline-none focus:bg-yellow-100 focus:border-indigo-600 transition-colors"
              />
            </div>
            
            <button
              onClick={handleJoin}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black font-display tracking-widest text-2xl py-4 border-4 border-black comic-shadow-sm comic-shadow-active transition-all"
            >
              DOŁĄCZ!
            </button>

            <button
              onClick={() => { playSound('click'); setMode('menu'); }}
              className="w-full text-slate-500 font-bold hover:text-slate-800 uppercase text-sm"
            >
              &larr; Wróć do menu
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
