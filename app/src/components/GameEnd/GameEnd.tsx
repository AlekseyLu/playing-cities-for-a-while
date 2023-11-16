import { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  citiesList: string[];
  waitPlayer: boolean;
  setIsStarted: (prev: (arg: boolean) => boolean) => void;
}

const GameEnd: FC<IProps> = ({ citiesList, waitPlayer, setIsStarted }) => {
  console.log(waitPlayer);
  const handleClick = () => setIsStarted((prev) => (prev = true));

  return (
    <div className="p-10 flex flex-col h-full items-center justify-between">
      <div className="text-center text-xl">
        {waitPlayer ? (
          <p>Поздравляем тебя с победой!</p>
        ) : (
          <p>К сожалению твое время вышло!</p>
        )}
        {waitPlayer ? (
          <p>Твой противник не вспомнил нужный город!</p>
        ) : (
          <p>Твой противник победил!</p>
        )}
      </div>
      <p
        className={
          "text-3xl font-medium" +
          " " +
          (waitPlayer ? "text-green-600" : "text-red-600")
        }
      >
        00:00
      </p>
      <div className="text-xl text-center">
        <p>Всего было перечислено городов: {citiesList.length}</p>
        <p>Очень не плохой результат!</p>
      </div>
      <p className="text-xl">Последний город названный победителем</p>
      <p className="text-2xl font-medium">
        {citiesList[citiesList.length - 1]}
      </p>
      <button
        className="text-base text-white font-medium bg-violet-600 px-4 py-2 rounded"
        onClick={handleClick}
      >
        <Link to={"/"}>Начать новую игру</Link>
      </button>
    </div>
  );
};

export { GameEnd };
