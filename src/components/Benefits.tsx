"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingUp, ShieldAlert, Lock, ClipboardCheck } from "lucide-react"

export default function SetupSteps() {
  const benefits = [
    {
      text: "Maximize ROI on your camera investments",
      icon: DollarSign,
      gradient: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
    {
      text: "Boost your revenues through enhanced monitoring",
      icon: TrendingUp,
      borderColor: "border-[#22b8cf]",
    },
    {
      text: "Prevent fraud theft and minimize losses",
      icon: ShieldAlert,
      gradient: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
    {
      text: "Strengthen security",
      icon: Lock,
      borderColor: "border-[#7c3aed]",
    },
    {
      text: "Ensure compliance with HSE norms",
      icon: ClipboardCheck,
      gradient: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
  ]

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  return (
    <>
       <motion.div 
              className="max-w-6xl mx-auto mb-16 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={titleVariants}
            >
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-light mb-2 tracking-tight">
                Monetize Your
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
                  Camera Investments with ZARK
                  </h1>
                </div>
                
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
                Turn every frame into revenue—leverage your gear with ZARK’s smart monetization tools.
                </p>
              </div>
            </motion.div>
      <motion.div
        className="w-full px-4 pb-12"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`relative ${
                benefit.gradient
                  ? `p-[3px] rounded-2xl ${benefit.gradient}`
                  : `border-2 ${benefit.borderColor} rounded-2xl`
              }`}
            >
              <div className="flex flex-col justify-center items-center bg-transparent rounded-2xl p-6 h-full">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className="mb-4"
                >
                  <benefit.icon className="h-12 w-12 text-white" strokeWidth={1.5} />
                </motion.div>
                <h2 className="text-2xl font-bold text-white text-center">{benefit.text}</h2>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
