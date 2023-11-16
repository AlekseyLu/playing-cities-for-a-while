import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { StartGame } from "./components/StartGame/StartGame";
import { GameProgress } from "./components/GameProgress/GameProgress";
import { GameEnd } from "./components/GameEnd/GameEnd";

function App() {
  const nav = useNavigate();
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [waitPlayer, setWaitPlayer] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    if (!isStarted) nav("/");
  }, [isStarted, nav]);

  return (
    <div className="flex bg-slate-300 font-sans h-screen items-center justify-center mx-auto px-4 w-full ">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <StartGame
                setIsStarted={setIsStarted}
                setCitiesList={setCitiesList}
                setWaitPlayer={setWaitPlayer}
              />
            }
          />
          <Route
            path="game"
            element={
              <GameProgress
                citiesList={citiesList}
                setCitiesList={setCitiesList}
                next={next}
                setNext={setNext}
                waitPlayer={waitPlayer}
                setWaitPlayer={setWaitPlayer}
              />
            }
          />
          <Route
            path="end"
            element={
              <GameEnd
                citiesList={citiesList}
                waitPlayer={waitPlayer}
                setIsStarted={setIsStarted}
              />
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
