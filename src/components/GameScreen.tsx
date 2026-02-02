import { useGame } from '../context/GameContext';
import { CategorySelect } from './CategorySelect';
import { QuestionView } from './QuestionView';
import { RoundResult } from './RoundResult';

export const GameScreen = () => {
  const { gameState } = useGame();

  return (
    <div className="w-full flex flex-col items-center">
      {gameState === 'CATEGORY_SELECT' && <CategorySelect />}
      {gameState === 'QUESTION' && <QuestionView />}
      {gameState === 'ROUND_RESULT' && <RoundResult />}
    </div>
  );
};
