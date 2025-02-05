import Teal from "./Teal";
import { IoDiamondSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaTree } from "react-icons/fa";
import { GiGoldScarab } from "react-icons/gi";
import { GiCrystalGrowth } from "react-icons/gi";
import type { IconType } from "react-icons/lib";
import { useEffect, useState } from "react";
import Overlay from "components/Overlay";
import GameOver from "./GameOver";

const items = [
  IoDiamondSharp,
  IoDiamondSharp,
  FaStar,
  FaStar,
  FaHeart,
  FaHeart,
  FaTree,
  FaTree,
  GiGoldScarab,
  GiGoldScarab,
  GiCrystalGrowth,
  GiCrystalGrowth,
];

const shuffleArray = (array: IconType[]) =>
  [...array].sort(() => Math.random() - 0.5);

interface IPlayScreen {
  quit: () => void;
}

const PlayScreen = ({ quit }: IPlayScreen) => {
  const [cards, setCards] = useState(shuffleArray(items));
  const [selected, setSelcted] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleSelect = (index: number) => {
    const newSelected = [...selected, index];
    if (selected.length === 2 || selected.includes(index)) return;
    setSelcted(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }

      setAttempts((prev) => {
        if (prev === 10) return 10;
        return prev + 1;
      });
      setTimeout(() => setSelcted([]), 1000);
    }
  };

  const reset = () => {
    setSelcted([]);
    setMatched([]);
    setAttempts(0);
    setGameOver(false);
    setCards(shuffleArray(items));
  };

  const handleQuit = () => {
    quit();
    reset();
  };

  useEffect(() => {
    if (attempts === 10) {
      setGameOver(true);
    }
  }, [attempts]);

  return (
    <div className="h-screen pt-9">
      <div className="flex items-center justify-between px-[5rem]">
        <h1 className="font-bold text-4xl"></h1>
        <h1 className="text-3xl text-center text-white">Memory Game</h1>
        <div className="w-[10rem]">
          <div className="flex  items-center text-white justify-between">
            <span>Attempts</span>
            <span>{attempts}/10</span>
          </div>
          <div className="w-full mt-1 h-2 rounded-full bg-white/10">
            <div
              style={{ width: `${(attempts / 10) * 100}%` }}
              className="transition-all duration-500 h-full bg-white rounded-full"
            ></div>
          </div>
        </div>
      </div>
      <section className=" max-w-[30rem] h-[30rem] mt-10 p-1 gap-2 grid grid-cols-3 mx-auto">
        {cards.map((Icon, i) => {
          return (
            <Teal
              Icon={Icon}
              selected={selected.includes(i)}
              matched={matched.includes(i)}
              handleSelect={() => handleSelect(i)}
            />
          );
        })}
      </section>
      <Overlay isOpen={gameOver}>
        <GameOver reset={reset} quit={handleQuit} />
      </Overlay>
    </div>
  );
};
export default PlayScreen;
