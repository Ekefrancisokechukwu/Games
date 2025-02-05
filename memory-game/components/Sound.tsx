import { useState } from "react";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { motion } from "motion/react";

const Sound = () => {
  const [isSoundOn, setIssoundOn] = useState(true);

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 1 }}
      onClick={() => setIssoundOn(!isSoundOn)}
      className="fixed bottom-[2rem] cursor-pointer group p-2 rounded-lg bg-white/5 z-50 right-[10rem]"
    >
      {isSoundOn ? (
        <span className="grid place-items-center">
          <HiOutlineSpeakerWave size={25} />
        </span>
      ) : (
        <span className="grid place-items-center">
          <HiOutlineSpeakerXMark size={25} />
        </span>
      )}
    </motion.button>
  );
};
export default Sound;
