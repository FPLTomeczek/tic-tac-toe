import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export interface GameState {
  count: number;
  board: Array<string | number>;
  lastPlayerID: string | null;
  sign: "X" | "O";
  isGameOver: boolean;
}

type GameActions = {
  increment: (params: { amount: number }) => void;
  move: (params: {
    playerID: PlayerId | undefined;
    boardIndex: number;
  }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getCount(game: GameState) {
  return game.count;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (): GameState => {
    return {
      count: 0,
      board: Array.from({ length: 9 }, (v, i) => 0),
      lastPlayerID: null,
      sign: "X",
      isGameOver: false,
    };
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    move: ({ playerID, boardIndex }, { game }) => {
      if (game.lastPlayerID !== playerID) {
        //logic
        game.board[boardIndex] = game.sign;
        game.sign = game.sign === "X" ? "O" : "X";
      }

      // check if game is over
      for (const index in WINNING_COMBINATIONS) {
        if (
          (game.board[WINNING_COMBINATIONS[index][0]] === "X" &&
            game.board[WINNING_COMBINATIONS[index][1]] === "X" &&
            game.board[WINNING_COMBINATIONS[index][2]] === "X") ||
          (game.board[WINNING_COMBINATIONS[index][0]] === "O" &&
            game.board[WINNING_COMBINATIONS[index][1]] === "O" &&
            game.board[WINNING_COMBINATIONS[index][2]] === "O")
        ) {
          game.isGameOver = true;
          Rune.gameOver();
        }
      }

      const gameInPlay = game.board.some((item) => item === 0);
      if (!gameInPlay) {
        Rune.gameOver();
      }

      game.lastPlayerID = playerID as string;
    },
  },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
});
