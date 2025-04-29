"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Shield, Users, HardHat } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

export default function PurposeBuilt() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "In-store sales and pDOOH performance",
      icon: ShoppingBag,
      color: "#3b81f6",
      description:
        "Track customer engagement metrics in real-time to optimize product placement and digital signage effectiveness. Analyze foot traffic patterns and conversion rates to increase sales.",
    },
    {
      title: "Access control and sensitive zones supervision",
      icon: Shield,
      color: "#3b81f6",
      description:
        "Monitor restricted areas with advanced detection systems. Receive instant alerts for unauthorized access attempts and maintain comprehensive security logs for compliance purposes.",
    },
    {
      title: "Streamline crowd management",
      icon: Users,
      color: "#3b81f6",
      description:
        "Automatically detect high-density areas and optimize flow patterns. Prevent bottlenecks and enhance visitor experience with real-time occupancy monitoring and predictive analytics.",
    },
    {
      title: "Ensure PPE Compliance",
      icon: HardHat,
      color: "#3b81f6",
      description:
        "Automate safety compliance with AI-powered detection of proper protective equipment. Generate compliance reports and receive alerts for potential safety violations in work environments.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleDotClick = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  // Custom svg background patterns for each feature
  const renderBackgroundPattern = (index: number) => {
    switch (index) {
      case 0: // Sales pattern - grid with dots
        return (
          <svg
            className="absolute opacity-5 top-0 right-0 h-full w-1/2"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="1" fill="#3b81f6" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        );
      case 1: // Security pattern - shield outlines
        return (
          <svg
            className="absolute opacity-5 top-0 right-0 h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 10 L80 25 L80 60 C80 70 70 85 50 90 C30 85 20 70 20 60 L20 25 Z"
              stroke="#3b81f6"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M50 20 L70 30 L70 55 C70 65 60 75 50 80 C40 75 30 65 30 55 L30 30 Z"
              stroke="#3b81f6"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        );
      case 2: // Crowd pattern - connected nodes
        return (
          <svg
            className="absolute opacity-5 top-0 right-0 h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="2" fill="#3b81f6" />
            <circle cx="40" cy="30" r="2" fill="#3b81f6" />
            <circle cx="60" cy="15" r="2" fill="#3b81f6" />
            <circle cx="30" cy="50" r="2" fill="#3b81f6" />
            <circle cx="70" cy="40" r="2" fill="#3b81f6" />
            <circle cx="20" cy="70" r="2" fill="#3b81f6" />
            <circle cx="50" cy="80" r="2" fill="#3b81f6" />
            <circle cx="80" cy="60" r="2" fill="#3b81f6" />
            <line
              x1="20"
              y1="20"
              x2="40"
              y2="30"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="40"
              y1="30"
              x2="60"
              y2="15"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="40"
              y1="30"
              x2="30"
              y2="50"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="30"
              y1="50"
              x2="70"
              y2="40"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="30"
              y1="50"
              x2="20"
              y2="70"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="20"
              y1="70"
              x2="50"
              y2="80"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="80"
              x2="80"
              y2="60"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
            <line
              x1="70"
              y1="40"
              x2="80"
              y2="60"
              stroke="#3b81f6"
              strokeWidth="0.5"
            />
          </svg>
        );
      case 3: // PPE pattern - safety hat outlines
        return (
          <svg
            className="absolute opacity-5 top-0 right-0 h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 60 C30 45 45 35 50 35 C55 35 70 45 70 60 L30 60 Z"
              stroke="#3b81f6"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M20 60 L80 60 L75 70 L25 70 Z"
              stroke="#3b81f6"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M35 50 C35 45 40 40 50 40 C60 40 65 45 65 50"
              stroke="#3b81f6"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        );
      default:
        return null;
    }
  };
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-transparent text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          className="max-w-6xl mx-auto mb-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-light mb-2 tracking-tight">
              Purpose-Built for
            </h2>

            <div className="relative inline-block mt-2">
              {/* Accent line behind text */}
              <motion.div
                className="absolute h-1 bg-gradient-to-r from-blue-500 to-purple-600 bottom-0 left-0 right-0 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-2">
                Performance and Efficiency
              </h1>
            </div>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
                Built to boost speed, cut waste, and keep you ahead.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <Card className="border border-[#3b81f6]/30 bg-zinc-900 bg-opacity-70 overflow-hidden relative">
                {renderBackgroundPattern(activeIndex)}
                <CardHeader className="p-8 flex md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
                  <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-[#3b81f6]/20">
                    {React.createElement(features[activeIndex].icon, {
                      className: "h-8 w-8 text-[#3b81f6]",
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                      {features[activeIndex].title}
                    </h3>
                    <p className="text-zinc-300 text-lg">
                      {features[activeIndex].description}
                    </p>

                    <div className="mt-6 flex space-x-2">
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-[#3b81f6]/10 text-white border border-[#3b81f6]/30">
                        Real-time analytics
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-[#3b81f6]/10 text-white border border-[#3b81f6]/30">
                        AI-powered
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-[#3b81f6]/10 text-white border border-[#3b81f6]/30">
                        Cloud integration
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <motion.div
                  className="h-1 bg-[#3b81f6]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 15, ease: "linear" }}
                  key={`progress-${activeIndex}`}
                />
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex space-x-3 mt-8">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-[#3b81f6]" : "w-3 bg-zinc-700"
                }`}
                aria-label={`Show feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-30 hover:opacity-100 transition-opacity duration-500">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden border rounded-xl ${
                index === activeIndex
                  ? "border-[#3b81f6] bg-gradient-to-br from-[#3b81f6]/10 to-black"
                  : "border-zinc-800 bg-zinc-900 bg-opacity-50"
              }`}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleDotClick(index)}
            >
              <Card className="!border-none bg-transparent cursor-pointer">
                <CardHeader className="space-y-4 p-6">
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-[#3b81f6]/20">
                    <feature.icon className="h-6 w-6 text-[#3b81f6]" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
