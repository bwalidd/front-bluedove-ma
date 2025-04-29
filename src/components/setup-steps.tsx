import { motion } from "framer-motion";
import React from "react";

export default function SetupSteps() {
  const steps = [
    {
      number: "1",
      title: "Activate your Zark pack",
      gradient: "from-cyan-500 to-blue-500",
      numberColor: "text-cyan-400"
    },
    {
      number: "2",
      title: "Connect a standard PC to your cameras network with internet",
      gradient: "from-teal-500 to-cyan-500",
      numberColor: "text-teal-300"
    },
    {
      number: "3", 
      title: "Ensure a good internet connection",
      gradient: "from-indigo-500 to-purple-600",
      numberColor: "text-indigo-300"
    },
    {
      number: "4",
      title: "Enjoy ZARK's advanced capabilities",
      gradient: "from-purple-500 to-pink-600",
      numberColor: "text-purple-300"
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-black text-white mt-40">
      <motion.div 
        className="max-w-6xl mx-auto mb-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-2 tracking-tight">
            How to
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
              Activate ZARK
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Unleash the power of automation and innovation with a single activation.
          </p>
        </div>
      </motion.div>

      <div className="w-full px-4 py-6 max-w-7xl mx-auto">
        {/* Steps Grid - Changed to grid-cols-2 for a 2x2 layout */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 p-4">
          {steps.map((step, index) => (
            <motion.div 
              key={`step-${index}`}
              className="relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-200 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                ease: "easeOut" 
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className={`bg-gradient-to-r ${step.gradient} h-full`}>
                {/* Content */}
                <div className="relative p-8 h-full bg-black bg-opacity-80 hover:bg-opacity-70 transition-all duration-200">
                  <div className={`text-6xl font-bold ${step.numberColor} mb-4`}>
                    {step.number}.
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {step.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}