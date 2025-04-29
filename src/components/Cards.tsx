import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BenefitsGrid from "@/components/Benefits";
import FeatureCards from "@/components/feature-cards";

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.48, 0.54], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.48, 0.54], [1, 0.8]);

  return (
    <motion.div
      className="space-y-16"
      style={{ opacity: opacity, scale: scale }}
    >
      <BenefitsGrid />
      <FeatureCards />
    </motion.div>
  );
}
