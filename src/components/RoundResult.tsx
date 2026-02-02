import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Check, X } from 'lucide-react';

export const RoundResult = () => {
  const { currentQuestion, answers, players, myPeerId, playSound } = useGame();

  const myAnswer = answers[myPeerId!] || null;
  const isCorrect = myAnswer === currentQuestion?.correctAnswer;
  const noAnswer = !myAnswer;

  useEffect(() => {
    if (isCorrect) playSound('correct');
    else playSound('wrong');
  }, [isCorrect, playSound]);

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
       <div className={`
          w-full p-10 border-4 border-black text-center mb-10 comic-shadow relative
          ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}
       `}>
          <h2 className="text-6xl font-black font-display uppercase mb-4 text-stroke">
            {isCorrect ? 'PLUS ULTRA!' : noAnswer ? 'ZA WOLNO!' : 'SMASH... PUDŁO!'}
          </h2>
          <div className="bg-white border-4 border-black p-4 inline-block comic-shadow-sm transform rotate-1">
             <p className="text-2xl font-black text-slate-900 font-display uppercase">
               ODPOWIEDŹ: <span className="text-indigo-600">{currentQuestion.correctAnswer}</span>
             </p>
          </div>
       </div>

       <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map(p => {
             const pAnswer = answers[p.id];
             const pCorrect = pAnswer === currentQuestion.correctAnswer;
             const pNoAnswer = !pAnswer;
             
             return (
               <div key={p.id} className={`
                 bg-white border-4 border-black p-6 flex flex-col items-center relative comic-shadow-sm transition-transform hover:scale-105
                 ${p.id === myPeerId ? 'bg-yellow-50' : ''}
               `}>
                  <div className="w-full border-b-4 border-black mb-4 pb-2 text-center">
                    <div className="font-black font-display text-xl truncate">{p.name}</div>
                  </div>
                  
                  <div className="text-5xl font-black font-display mb-4 text-indigo-600">{p.score}</div>
                  
                  <div className="absolute -top-3 -right-3 bg-white border-4 border-black rounded-full p-1 z-10">
                    {pCorrect ? <Check className="text-green-500" size={24} strokeWidth={4} /> : 
                     pNoAnswer ? <span className="text-slate-400 font-black text-2xl px-2">?</span> :
                     <X className="text-red-500" size={24} strokeWidth={4} />}
                  </div>
                  
                  {pAnswer && (
                    <div className={`text-sm font-bold px-3 py-1 border-2 border-black uppercase text-center w-full truncate ${pCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
                        {pAnswer}
                    </div>
                  )}
               </div>
             );
          })}
       </div>
       
       <div className="mt-10 text-center text-white font-black text-xl text-stroke-sm animate-pulse tracking-widest uppercase">
          Przygotuj się na kolejną rundę...
       </div>
    </div>
  );
};
