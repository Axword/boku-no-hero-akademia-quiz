import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

export const QuestionView = () => {
  const { currentQuestion, timeLeft, submitAnswer, myPeerId, answers, playSound } = useGame();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestion]);

  if (!currentQuestion) return null;

  const handleSelect = (option: string) => {
    if (selectedOption) return; 
    setSelectedOption(option);
    submitAnswer(option);
    playSound('click');
  };

  const hasAnswered = !!answers[myPeerId!];
  const timePercentage = (timeLeft / 15) * 100;

  return (
    <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
      {/* Timer Bar */}
      <div className="w-full h-10 border-4 border-black bg-slate-800 mb-8 relative overflow-hidden comic-shadow-sm">
        <div 
            className={`h-full transition-all duration-1000 ease-linear ${timePercentage < 30 ? 'bg-red-600' : 'bg-yellow-400'}`}
            style={{ width: `${timePercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-black font-display text-2xl text-white text-stroke-sm z-10 tracking-widest">
            {timeLeft} SEKUND
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-6 bg-indigo-600 text-white px-8 py-2 border-4 border-black font-black font-display text-xl uppercase comic-shadow-sm -rotate-2">
        {currentQuestion.category}
      </div>

      {/* Question Card */}
      <div className="bg-white border-4 border-black p-10 w-full text-center mb-10 comic-shadow relative">
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-black"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-black"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-black"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-black"></div>
        
        <h2 className="text-3xl md:text-5xl font-black font-display leading-tight">{currentQuestion.question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {currentQuestion.options.map((option, idx) => {
             const isSelected = selectedOption === option;
             return (
                <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    disabled={hasAnswered || timeLeft === 0}
                    className={`
                        p-6 border-4 border-black font-bold text-xl transition-all
                        ${isSelected 
                            ? 'bg-blue-600 text-white comic-shadow-active translate-y-1' 
                            : 'bg-white hover:bg-blue-50 hover:border-blue-500 comic-shadow-sm comic-shadow-hover'}
                        ${(hasAnswered && !isSelected) ? 'opacity-40 cursor-not-allowed filter grayscale' : ''}
                    `}
                >
                    {option}
                </button>
             );
        })}
      </div>
      
      {hasAnswered && (
          <div className="mt-8 text-2xl font-black text-white text-stroke-sm animate-pulse tracking-wide">
            ODPOWIEDŹ ZAPISANA! OCZEKIWANIE NA WYNIKI...
          </div>
      )}
    </div>
  );
};
