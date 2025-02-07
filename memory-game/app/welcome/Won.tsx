import { GrPowerReset } from "react-icons/gr";
import { motion } from "motion/react";

interface IWon {
  playAgain: () => void;
  quit: () => void;
}

const Won = ({ quit, playAgain }: IWon) => {
  return (
    <div>
      <h1 className="text-2xl font-bold  text-center">🎉 "YOU WIN!" 🎉</h1>
      <motion.div className="flex justify-center gap-x-2.5 mt-6">
        <button
          onClick={playAgain}
          className="py-1.5  px-5 rounded-full bg-gray-950 text-white group flex cursor-pointer items-center gap-x-2"
        >
          Play Again
          <GrPowerReset className="group-hover:-rotate-45 transition-all duration-300" />
        </button>
        <button
          onClick={quit}
          className="py-1.5 px-5 bg-red-500 text-white rounded-full cursor-pointer "
        >
          Quit
        </button>
      </motion.div>
    </div>
  );
};
export default Won;
