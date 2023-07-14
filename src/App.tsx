import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic.ts";
import { Players } from "rune-games-sdk/multiplayer";
import XSign from "./assets/close-svgrepo-com.svg";
import OSign from "./assets/circle-svgrepo-com.svg";

function App() {
  const [game, setGame] = useState<GameState>();
  const [playerID, setPlayerID] = useState<string | undefined>("");
  const [players, setPlayers] = useState<Players>();
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, yourPlayerId }) => {
        setGame(newGame);
        setPlayerID(yourPlayerId);
      },
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-700 h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 w-screen overflow-hidden">
        {game.board.map((value, ind) => {
          return (
            <div
              key={ind}
              className="flex justify-center items-center outline outline-1 h-20"
              onClick={() => {
                Rune.actions.move({ playerID, boardIndex: ind });
              }}
            >
              {value === "X" ? (
                <img src={XSign} className="text-lg" />
              ) : value === "O" ? (
                <img src={OSign} className="text-lg" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://developers.rune.ai" target="_blank">
  //         <img src={reactLogo} className="logo rune" alt="Rune logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + Rune</h1>
  //     <div className="card">
  //       <button onClick={() => Rune.actions.increment({ amount: 1 })}>
  //         count is {game.count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> or <code>src/logic.ts</code> and save to
  //         test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and Rune logos to learn more
  //     </p>
  //   </>
  // );
}

export default App;
