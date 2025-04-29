import { FlipWords } from "./ui/flip-words";
import { motion } from "framer-motion";

export function FlipWordsZark() {
  const words = [
    "Monitor",
    "See",
    "Count",
    "Understand",
    "Alert",
    "Communicate",
  ];

  return (
    <motion.div
      className="text-white absolute bottom-48 left-1/2 z-10"
      initial={{ opacity: 0, y: 100, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <div className="text-lg md:text-5xl mx-auto font-normal">
        <span className="font-semibold bg-white text-black rounded-md p-1">
          ZARK
        </span>
        <span> Can</span>
        <FlipWords
          words={words}
          className="text-blue-500 dark:text-blue-500"
        />{" "}
      </div>
    </motion.div>
  );
}

export function FlipWordsZarkSecond() {
  const words = ["secure", "intelligent", "efficient", "innovative"];

  return (
    <motion.div
      className="text-white z-10"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="text-6xl mx-auto font-bold">
        Empower
        <FlipWords words={words} className="text-blue-500 dark:text-blue-500" />
        surveillance with
      </div>
    </motion.div>
  );
}
