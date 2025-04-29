import { useRef } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import { motion, useTransform, useScroll } from "framer-motion";
// import SparklesCore from "react-sparkle-core";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

// import { useMediaQuery } from "usehooks-ts";
// import { useIsLaptop } from "@/pages/Home";

export const useIsLaptop = () => {
  const [isLaptop, setIsLaptop] = React.useState(typeof window !== 'undefined' && window.innerWidth > 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLaptop;
};


export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isLaptop = useIsLaptop();

  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  return (
    <motion.div className="header" style={{ opacity, scale }}>
      <div className="header">
        {/* Navigation */}
        <Nav />

        {/* Hero Section */}
        <Hero />

        
      </div>
    </motion.div>
  );
}
