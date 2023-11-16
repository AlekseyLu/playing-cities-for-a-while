import { FC, FormEvent, useEffect, useState } from "react";

import { getCities } from "../../utils/getCities";

import { useNavigate } from "react-router-dom";

interface ITimer {
  sec: number;
  min: number;
}

interface IProps {
  citiesList: string[];
  setCitiesList: (prev: (arg: string[]) => string[]) => void;
  next: boolean;
  setNext: (prev: (arg: boolean) => boolean) => void;
  waitPlayer: boolean;
  setWaitPlayer: (prev: (arg: boolean) => boolean) => void;
}

const GameProgress: FC<IProps> = ({
  citiesList,
  setCitiesList,
  next,
  setNext,
  waitPlayer,
  setWaitPlayer,
}) => {
  const nav = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [err, setErr] = useState(false);
  const [timer, setTimer] = useState({ min: 0, sec: 10 });

  const cities = getCities();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr(false);
    if (citiesList.find((v) => v === inputValue)) return setErr(true);
    setCitiesList((prev: string[]) => [...prev, inputValue]);
    setInputValue("");
    setNext((prev) => !prev);
    setTimer(() => ({ min: 0, sec: 10 }));
  };

  const randomCitiesLetter = () =>
    cities.filter(
      (w) =>
        w[0] ===
        (citiesList[citiesList.length - 1].slice(-1).toUpperCase() === "Ь" ||
        citiesList[citiesList.length - 1].slice(-1).toUpperCase() === "Ъ"
          ? citiesList[citiesList.length - 1].slice(-2).toUpperCase()[0]
          : citiesList[citiesList.length - 1].slice(-1).toUpperCase())
    );

  useEffect(() => {
    if (citiesList.length < 1) return;
    setWaitPlayer(() => true);
    const awaitReq = setTimeout(() => {
      const newCity = randomCitiesLetter();

      const uniqCity =
        newCity &&
        newCity.find((item) =>
          citiesList.includes(item) ? console.log("first") : item
        );
      if (uniqCity) {
        setCitiesList((prev: string[]) => [...prev, uniqCity]);
        setTimer(() => ({ min: 0, sec: 10 }));
        setWaitPlayer(() => false);
      }
    }, 3000);
    return () => {
      clearTimeout(awaitReq);
    };
  }, [next]);

  useEffect(() => {
    let endTimer: any;
    if (timer.sec > 0) {
      endTimer = setTimeout(
        () => setTimer((prev: ITimer) => ({ ...prev, sec: prev.sec - 1 })),
        1000
      );
    } else if (timer.sec === 0 && timer.min > 0) {
      setTimer((prev: ITimer) => ({ min: prev.min - 0, sec: 10 }));
    } else {
      nav("/end");
      clearTimeout(endTimer);
    }
    return () => clearTimeout(endTimer);
  }, [timer, next]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex content-center justify-between p-4">
        {waitPlayer ? (
          <span className="text-base text-black font-normal">
            Сейчас очередь соперника
          </span>
        ) : (
          <span className="text-base text-black font-normal">
            Сечайс ваша очередь
          </span>
        )}
        <span className="font-medium text-xl">
          0{timer.min}:{timer.sec > 10 ? timer.sec : `0${timer.sec}`}
        </span>
      </div>
      <div className="h-1 bg-gray-100" />
      <div className="flex flex-col-reverse basis-full overflow-y-hidden">
        {citiesList.length < 1 ? (
          <div className="flex basis-full items-center justify-center">
            <span className="text-sm text-gray-400">
              Первый участник вспоминает города...
            </span>
          </div>
        ) : (
          <ul className="list-none p-4 text-base text-white flex flex-col gap-2 w-full">
            {citiesList.map((city, i) => (
              <li
                key={i}
                className={
                  (i % 2 === 1
                    ? "rounded-bl-none bg-violet-50 text-black mr-auto"
                    : "justify-end bg-violet-500 rounded-ee-none ml-auto") +
                  " " +
                  "flex rounded-md py-1 px-3"
                }
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-center text-gray-400">
        Всего перечислено городов: {citiesList.length}
      </div>
      {err && <p className="text-gray-400">Такой город уже был</p>}
      <form
        className="flex bg-gray-100 items-center ml-4 mr-4 mb-4 p-2 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={
            waitPlayer
              ? "Ожидаем ответа соперника..."
              : citiesList.length < 1
              ? "Напишите любой город, например: Где вы живете?"
              : `Знаете город на букву “${
                  citiesList[citiesList.length - 1].slice(-1) === "ъ" ||
                  citiesList[citiesList.length - 1].slice(-1) === "ь"
                    ? citiesList[citiesList.length - 1]
                        .slice(-2)
                        .toUpperCase()[0]
                    : citiesList[citiesList.length - 1].slice(-1).toUpperCase()
                }”?`
          }
          className="bg-gray-100 text-base flex-auto placeholder:text-gray-400 disabled:text-gray-200"
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
          disabled={waitPlayer}
        />
        <button
          className="w-8 h-8 flex bg-violet-500 rounded-md items-center justify-center disabled:bg-gray-400"
          disabled={waitPlayer}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Icon" clipPath="url(#clip0_7618_580)">
              <path
                id="Vector"
                d="M8.33337 11.6667L17.5 2.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M17.5001 2.5L12.0834 17.5C12.0468 17.5798 11.9881 17.6474 11.9143 17.6948C11.8404 17.7422 11.7545 17.7674 11.6667 17.7674C11.579 17.7674 11.493 17.7422 11.4192 17.6948C11.3453 17.6474 11.2866 17.5798 11.2501 17.5L8.33339 11.6667L2.50006 8.75C2.42027 8.71344 2.35266 8.65474 2.30526 8.58088C2.25786 8.50701 2.23267 8.4211 2.23267 8.33333C2.23267 8.24557 2.25786 8.15965 2.30526 8.08579C2.35266 8.01193 2.42027 7.95323 2.50006 7.91667L17.5001 2.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_7618_580">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
    </div>
  );
};

export { GameProgress };
