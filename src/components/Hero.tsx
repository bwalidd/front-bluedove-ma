import { motion } from "framer-motion";
import { FlipWordsZark } from "./flip-words";
import zarkLogo from "@/assets/logo.svg";
import { TypewriterEffect } from "./TypeWriter";

export default function Hero() {
    return (
        <div
            className="flex flex-col items-center justify-center text-center
        px-4 py-32 relative h-screen z-10
    "
        >
            <div className="mb-8">
                <motion.h1
                    className="text-9xl font-bold tracking-tighter bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#00C2FF] text-transparent bg-clip-text inline-block"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img className="w-[48rem]" src={zarkLogo} alt="zark logo" />
                    <motion.div
                        className="gradients z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <div className="absolute inset-x-0 top-[54%] bg-gradient-to-r from-transparent via-white to-transparent h-[2px] w-[100%] blur-sm " />
                        <div className="absolute inset-x-0 top-[54%] bg-gradient-to-r from-transparent via-white to-transparent h-px w-[100%]" />
                        <div className="absolute inset-x-50 top-[54%] bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-[50%] blur-sm" />
                        <div className="absolute inset-x-50 top-[54%] bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-[50%]" />
                    </motion.div>
                </motion.h1>
            </div>
            <FlipWordsZark />
            <TypewriterEffect />
            {/* <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1.5}
        particleDensity={10}
        className="w-[98vw] h-screen absolute -top-16 z-0"
        particleColor="#FFFFFF"
      /> */}
            {/* <img
        src={heroBg}
        alt="hero bg"
        className="absolute bottom-0 left-1/2 -translate-x-[48%] z-0"
      /> */}
        </div>
    );
}
