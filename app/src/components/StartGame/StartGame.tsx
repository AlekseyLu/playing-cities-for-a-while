import { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  setIsStarted: (prev: (arg: boolean) => boolean) => void;
  setWaitPlayer: (prev: (arg: boolean) => boolean) => void;
  setCitiesList: (prev: (arg: string[]) => string[]) => void;
}

const StartGame: FC<IProps> = ({
  setIsStarted,
  setCitiesList,
  setWaitPlayer,
}) => {
  const changeStrted = () => {
    setIsStarted((prev) => (prev = true));
    setCitiesList(() => []);
    setWaitPlayer((prev) => (prev = false));
  };

  return (
    <section>
      <h1 className="text-center p-4 text-base font-normal leading-6">
        Игра в города на время
      </h1>
      <div className="h-1 bg-gray-100" />
      <div className="p-6">
        <p>Цель: Назвать как можно больше реальных городов.</p>
        <ul className="py-6 pl-6">
          <li className="list-disc">Запрещается повторение городов.</li>
          <li className="list-disc">
            Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого
            бы пропускаем эту букву и игрок должен назвать город на букву
            стоящую перед ъ или ь знаком.
          </li>
          <li className="list-disc">
            Каждому игроку дается 2 минуты на размышления, если спустя это время
            игрок не вводит слово он считается проигравшим
          </li>
        </ul>
        <div className="text-center">
          <button
            className="py-3 px-4 rounded text-white bg-purple-600"
            onClick={changeStrted}
          >
            <Link to="/game">Начать игру</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export { StartGame };
