import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import zarkAnalytics from "../assets/rtrt.png";
import zarkConnect from "../assets/mobile2.png";
import zarkAdvertising from "../assets/Smart Screen from Bluedove.png";
import zarkFlowDisplay from "../assets/No Waiting Display.jpg";

export default function PurposeBuilt() {
  // Reference for the container to track scroll position
  const sectionRef = useRef(null);
  
  // Product data with enhanced descriptions
  const products = [
    {
      id: "analytics",
      src: zarkAnalytics,
      title: "Zark Analytics",
      tagline: "Intelligent Insights",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: "connect",
      src: zarkConnect,
      title: "Zark Connect",
      tagline: "Seamless Integration",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "flow",
      src: zarkFlowDisplay,
      title: "Zark Flow Display",
      tagline: "Real-time Visualization",
      color: "from-cyan-600 to-emerald-600",
    },
    {
      id: "advertising",
      src: zarkAdvertising,
      title: "Zark Smart Advertising",
      tagline: "Targeted Marketing",
      color: "from-emerald-600 to-yellow-500",
    },
  ];

  // State for current slide
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-advance slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Navigation functions
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  // Slide to specific index
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  // Header animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-black text-white overflow-hidden"
    >
      {/* Stylized header with gradient accents */}
      <motion.div 
        className="max-w-7xl mx-auto mb-16 relative"
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
              ZARK VISIONARY SUITE
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Tools that think ahead—crafted to sharpen your edge.
          </p>
        </div>
      </motion.div>

      {/* Slider container */}
      <div className="max-w-7xl mx-auto relative">
        {/* Main slider with product cards */}
        <div className="relative h-96 md:h-80 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="absolute w-full h-full"
            >
              {/* Current product card */}
              <div className="w-full h-full px-4">
                <div className="rounded-xl overflow-hidden bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 h-full transform transition-all shadow-lg">
                  {/* Colorful top border accent */}
                  <div className={`h-1 w-full bg-gradient-to-r ${products[currentIndex].color}`} />
                  
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image container */}
                    <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                      <img
                        src={products[currentIndex].src}
                        alt={products[currentIndex].title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900 opacity-30" />
                    </div>
                    
                    {/* Content area */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-gradient-to-r ${products[currentIndex].color} inline-block`}>
                          {products[currentIndex].tagline}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-4">{products[currentIndex].title}</h3>
                      
                      <p className="text-gray-400 mb-6">
                        Experience the future of {products[currentIndex].title.split(' ')[1]} with our innovative solution designed for tomorrow's challenges.
                      </p>
                      
                      {/* Interactive button */}
                      <div>
                        <button className="group flex items-center text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                          <span>Explore solution</span>
                          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between mt-8">
          {/* Indicators */}
          <div className="flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? `bg-gradient-to-r ${products[index].color} w-8` 
                    : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Previous slide"
            >
              <span>←</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Next slide"
            >
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}