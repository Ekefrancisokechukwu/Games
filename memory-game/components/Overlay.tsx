import type { ReactNode } from "react";
import { motion } from "motion/react";

interface IOverlay {
  children: ReactNode;
  isOpen: boolean;
}

const Overlay = ({ children, isOpen }: IOverlay) => {
  return (
    <div
      className={`fixed backdrop-blur-xs h-screen w-full bg-black/20 z-[80] top-0 left-0 grid place-items-center ${
        isOpen ? "opacity-100 visible" : "invisible opacity-0"
      }`}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, visibility: "hidden" }}
        animate={isOpen ? { scale: 1, opacity: 1, visibility: "visible" } : {}}
        transition={{ type: "spring", duration: 0.3, stiffness: 110 }}
        className="w-[25rem] rounded-xl bg-white p-4"
      >
        {children}
      </motion.div>
    </div>
  );
};
export default Overlay;
