import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import zarkLogo from "../../src/assets/logo.svg"; // Adjust the path as necessary
import blackbg from "../assets/black-login.png"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const ForgetPassowrd: React.FC = () => {
  const [email, setEmail] = useState<string>("");
 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Controls for the eye animations
  const eyeControls = useAnimation();
  const pupilControls = useAnimation();

  // Random eye movement
  useEffect(() => {
    // Function to move eye to random position
    const moveEyeRandomly = () => {
      // Random value between -4 and 4 for X, -3 and 3 for Y
      const randomX = (Math.random() - 0.5) * 8;
      const randomY = (Math.random() - 0.5) * 6;

      // Move the pupil
      pupilControls.start({
        x: randomX,
        y: randomY,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 10,
          duration: 0.8,
        },
      });

      // Schedule next movement after random interval (1-3 seconds)
      const nextMovementDelay = 1000 + Math.random() * 2000;
      setTimeout(moveEyeRandomly, nextMovementDelay);
    };

    // Start random movement
    moveEyeRandomly();

    // Occasionally blink
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        eyeControls.start({
          scaleY: [1, 0.1, 1],
          transition: { duration: 0.2 },
        });
      }
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, [eyeControls, pupilControls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log("Login attempted with:", email);
    }, 1500);
  };

  // Scanning animation for iris
  const irisVariants = {
    scanning: {
      backgroundPosition: ["0% 0%", "100% 0%", "100% 100%", "0% 100%", "0% 0%"],
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  // Subtle pulsing animation
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.6, 0.8, 0.6],
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const navigate = useNavigate();
  const backHome = () => {
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-90 text-white p-4"
    style={{

    }}
    >
      {/* Static background with subtle texture */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-950 to-black">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "-0.5px -0.5px",
          }}
        />
      </div>

      <div className="w-full max-w-xl relative z-10">
        {" "}
        {/* Increased from max-w-md to max-w-lg */}
        {/* Login container with glass effect */}
        <motion.div
          className="bg-gray-900 bg-opacity-40 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top border accent with gradient glow */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 relative">
            <div className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-300 opacity-80" />
          </div>

          <div className="p-8">
            {/* Header with enhanced AI eye */}
            <div className="flex justify-center mb-8">
              <div className="text-center">
                {/* AI Eye Animation - Enhanced version */}
                <div className="w-28 h-28 mx-auto mb-10 relative">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                    variants={pulseVariants}
                    animate="pulse"
                  />

                  {/* Cybernetic details - rings */}
                  <div className="absolute inset-1 rounded-full border-2 border-gray-700 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black to-transparent opacity-40" />
                  </div>

                  {/* Eye housing */}
                  <motion.div
                    className="absolute inset-3 rounded-full bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden"
                    animate={eyeControls}
                  >
                    {/* Metallic rim */}
                    <div className="absolute inset-0 border-4 border-gray-700 rounded-full opacity-40" />

                    {/* Glowing iris base */}
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                      variants={irisVariants}
                      animate="scanning"
                    >
                      {/* Iris pattern - creates a tech look */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage: `radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.4) 70%), 
                                            repeating-radial-gradient(circle at 50% 50%, transparent, transparent 8px, rgba(255, 255, 255, 0.1) 8px, rgba(255, 255, 255, 0.1) 9px)`,
                          backgroundSize: "100% 100%, 100% 100%",
                          backgroundPosition: "center",
                        }}
                      />
                    </motion.div>

                    {/* Pupil that moves randomly */}
                    <motion.div
                      className="absolute w-6 h-6 rounded-full bg-black shadow-inner"
                      animate={pupilControls}
                    >
                      {/* Reflection highlights */}
                      <div className="absolute top-0.5 left-1 w-2 h-2 rounded-full bg-white opacity-60" />
                      <div className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-white opacity-30" />
                    </motion.div>
                  </motion.div>

                  {/* Tech details around eye */}
                  <div className="absolute top-4 right-0 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <div className="absolute bottom-4 left-1 w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                </div>

                <motion.h1
                    className="text-9xl font-bold tracking-tighter bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#00C2FF] text-transparent bg-clip-text inline-block"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img className="w-[18rem]" src={zarkLogo} alt="zark logo" />
                    <motion.div
                        className="gradients z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                       
                    </motion.div>
                </motion.h1>
                <p className="text-gray-400 text-sm mt-1">
                  By BLUEDOVE AI
                </p>
              </div>
            </div>

            {/* Login form with more width */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Email input with enhanced styling */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg 
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                               transition-all group-hover:border-gray-500"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                      @
                    </div>
                  </div>
                </div>

               

                {/* Submit button with enhanced styling */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 rounded-lg 
                 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700
                 text-white font-medium transition-all focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
                 disabled:opacity-70 shadow-lg shadow-blue-700/20"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <motion.div
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      "Get Code"
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    className="mt-5 w-full flex justify-center items-center py-3 px-4 rounded-lg 
                 bg-transparent border-2 border-transparent
                 text-white font-medium transition-all focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
                 disabled:opacity-70 relative
                 before:absolute before:inset-0 before:rounded-lg before:p-0.5
                 
                 "
                    onClick={backHome}
                  >
                    {isLoading ? (
                      <motion.div
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgetPassowrd;
