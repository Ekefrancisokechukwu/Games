import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons/lib";
import { MdQuestionMark } from "react-icons/md";

interface ITeal {
  Icon: IconType;
  selected: boolean;
  matched: boolean;
  handleSelect: () => void;
}

const Teal = ({ Icon, selected, handleSelect, matched }: ITeal) => {
  const [peep, setPeep] = useState(false);

  useEffect(() => {
    setPeep(true);
    const timer = setTimeout(() => setPeep(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      onClick={handleSelect}
      className={`relative group  transition-all duration-500 transform-3d perspective-[1500] ${
        peep ? "rotate-y-180" : ""
      } ${selected || matched ? "rotate-y-180" : ""}`}
    >
      <div className="absolute   w-full h-full bg-gray-100 grid place-items-center   rounded-lg cursor-pointer  perspective-[1000px] backface-hidden">
        <MdQuestionMark size={60} className="text-gray-600/35" />
      </div>
      <div className="absolute  rotate-y-180 transition-all duration-1000  w-full h-full bg-gray-100 backface-hidden rounded-lg grid place-items-center perspective-[1000px] cursor-pointer">
        <Icon size={50} className="text-gray-600" />
      </div>
    </motion.div>
  );
};
export default Teal;
