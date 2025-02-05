import { motion } from "motion/react";

interface IWelcome {
  handleGetStarted: () => void;
}

export function Welcome({ handleGetStarted }: IWelcome) {
  return (
    <main className="grid h-screen place-items-center pt-8 pb-4">
      <div className="grid place-items-center text-white">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.2, damping: 8 }}
          className="text-3xl font-semibold"
        >
          {" "}
          Welcome To Memory Game
        </motion.h1>
        <motion.button
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              delay: 0.4,
              type: "spring",
              duration: 0.2,
              damping: 8,
            },
          }}
          onClick={handleGetStarted}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.2, damping: 8 }}
          className="px-[2rem] mx-auto py-[.8rem] inline-block  rounded-full border cursor-pointer mt-12"
        >
          Get Started
        </motion.button>
      </div>
    </main>
  );
}
