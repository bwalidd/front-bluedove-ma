import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import StreamWebRtc from "./StreamWebRtc";
import axios from "axios";
import demoVid from "../assets/demo.mp4";
import GradiantButton from "./ui/GradiantButton";
// import demoPoster from "../assets/demo-poster.png";

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [streamStatus, setStreamStatus] = React.useState(false);
  const [streamId, setStreamId] = React.useState(1);
  // const sseRef = useRef<EventSource | null>(null);

  // useEffect(() => {
  //   sseRef.current = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/events/stream`);
  //   sseRef.current.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('new event', data);

  //     setStreamStatus(data.is_activated);
  //     setStreamId(data.stream_id);
  //   };
  //   return () => {
  //     sseRef.current?.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/status`).then(res => {
  //     console.log('initial ', res.data);
  //     setStreamStatus(res.data.is_activated);
  //     setStreamId(res.data.stream_id);
  //   })
  // }, [streamStatus]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  return (
    <>
      <section className="w-full py-16 relative mt-40">
        <motion.div 
               className="max-w-7xl mx-auto mb-16 relative"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }}
               variants={titleVariants}
             >
               <div className="text-center">
                 <h2 className="text-3xl md:text-5xl font-light mb-2 tracking-tight">
                   Watch
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
                     Zark in action
                   </h1>
                 </div>
                 
                 <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
                   How ZARK transforms standard cameras into intelligent surveillance systems
                 </p>
               </div>
             </motion.div>
        <div className="container mx-auto px-4 relative mt-10">
          
          

          {/* Video Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Glowing border effect */}
            <div className="relative rounded-xl overflow-hidden">
              {
                !streamStatus ?
                  <>
                    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur-sm" />
                    <video
                      ref={videoRef}
                      className={`w-full aspect-video transition ${isPlaying ? "brightness-100" : "brightness-50"
                        }`}
                      // controls
                      preload="metadata"
                      // poster={`${import.meta.env.VITE_BACKEND_URL}/client/demo-poster.png`}
                      // poster={demoPoster}
                      autoPlay={false}
                      onClick={() => setIsPlaying((prev) => !prev)}
                    >
                      <source src={demoVid} type="video/mp4" />
                      {/* <source src={`${import.meta.env.VITE_BACKEND_URL}/client/demo.mp4`} type="video/mp4" /> */}
                      Your browser does not support the video tag.
                    </video>
                    <motion.div
                      className={`play-btn absolute top-1/2 left-1/2
                text-blue-600 rounded-lg transition ${isPlaying ? "scale-0 opacity-0" : "scale-100 opacity-100"
                        }`}
                      initial={{ y: "-50%", x: "-50%" }}
                      whileHover={{ scale: 1.1, y: "-50%", x: "-50%" }}
                      whileTap={{ scale: 0.9, y: "-50%", x: "-50%" }}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <FaPlay size={70} />
                    </motion.div>
                  </>
                  :
                  <StreamWebRtc id={streamId} />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoComponent;