import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useRef } from "react";
import { useEffect } from "react";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [count, setCount] = useState(1);
  const newGameButton = useRef(null);

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value == dice[0].value);

  useEffect(() => {
    if (newGameButton != null && gameWon) newGameButton.current.focus();
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        if (die.id == id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          };
        } else {
          return die;
        }
      })
    );
  }

  const diceList = dice.map((die) => {
    return (
      <Die
        value={die.value}
        key={die.id}
        isHeld={die.isHeld}
        hold={hold}
        id={die.id}
      />
    );
  });

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice);
      setCount(1);
      return;
    }
    setCount((prevCount) => prevCount + 1);
    setDice((prevDice) =>
      prevDice.map((die) => {
        if (!die.isHeld) {
          return {
            ...die,
            value: Math.ceil(Math.random() * 6),
          };
        } else {
          return die;
        }
      })
    );
  }

  return (
    <main className="size-[100%] max-h-[400px] max-w-[400px]  rounded-[10px] bg-[#F5F5F5] flex items-center justify-evenly flex-col">
      {gameWon ? <Confetti /> : null}
      <div
        aria-live="polite"
        className="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0 "
      >
        {gameWon && (
          <p>Congratulations, you won! Pres "New Game" to start again</p>
        )}
      </div>
      <section className="flex flex-col items-center font-[karla]">
        <h1 className="text-[1.7rem] font-bold text-[#2B283A] leading-8">
          Tenzies
        </h1>
        <p className="w-[70%] text-center font-[inter] text-[#4A4E74] text-[1rem] font-[500]">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>
      <div className="w-full grid grid-cols-[11%_11%_11%_11%_11%]  items-center justify-center gap-[18px] ">
        {diceList}
      </div>
      <p className="font-[inter] text-[#4A4E74] text-[1rem] font-[500]">
        Count : {count}
      </p>
      <button
        className="bg-[#5035FF] font-[Karla] text-white font-bold text-[1.1rem] rounded-[4px] p-[40px] pt-[8px] pb-[8px] cursor-pointer shadow-md/20"
        onClick={rollDice}
        ref={gameWon ? newGameButton : null}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
