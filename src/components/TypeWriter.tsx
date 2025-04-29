"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffect() {
  const words = [
    {
      text: "Transform",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "your",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "standard",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "cameras",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "into",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "tireless",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "smart",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "eyes",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "with",
      className: "text-white-500 dark:white-500 md:text-xl xl:text-4xl",
    },
    {
      text: "Zark.",
      className: "text-blue-500 dark:text-blue-500 md:text-xl xl:text-4xl",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[3rem]">
      <TypewriterEffectSmooth words={words} className="hidden md:flex" />
      <p className="block md:hidden mt-14">
        Transform your standard cameras into tireless smart eyes with{" "}
        <span className="p-1 rounded-md bg-white text-black font-bold">
          Zark
        </span>
        .
      </p>
    </div>
  );
}
