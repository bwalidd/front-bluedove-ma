import { FaShieldAlt } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaAnchor } from "react-icons/fa";
import { LuPickaxe } from "react-icons/lu";
import { TbCircleLetterEFilled } from "react-icons/tb";
import { ReactElement } from "react";
import { motion } from "framer-motion";
import retail from '@/assets/retail.png'
import security from '@/assets/security.jpg'
import port from '@/assets/port.jpg'
import mines from '@/assets/mines-and-factories.jpg'
import erp from '@/assets/erp.jpg'


interface card {
  icon: ReactElement;
  image: string;
  content: string;
}

export default function Industries() {
  const cards: card[] = [
    {
      icon: <IoStorefrontSharp size={45} />,
      image: retail,
      content: "Retail",
    },
    {
      icon: <FaShieldAlt size={45} />,
      image: security,
      content: "Security",
    },
    {
      icon: <FaAnchor size={45} />,
      image: port,
      content: "Port And Aeroport",
    },
    {
      icon: <LuPickaxe size={45} />,
      image: mines,
      content: "Mines And Factories",
    },
    {
      icon: <TbCircleLetterEFilled size={45} />,
      image: erp,
      content: "ERP",
    },
  ];

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
    <div className="space-y-20 ">
      <motion.div 
              className="max-w-6xl mx-auto mb-16 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={titleVariants}
            >
              <div className="text-center mt-40">
                <h2 className="text-3xl md:text-5xl font-light mb-2 tracking-tight">
                  Served
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
                    Industries
                  </h1>
                </div>
                
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
                  Transformative solutions designed to elevate your business experience
                </p>
              </div>
            </motion.div>
      <div className="row-one flex flex-col gap-4 md:gap-20 md:flex-row justify-center">
        {cards.slice(0, 2).map((card, i) => (
          <div
            className="box w-[90%] mx-auto md:mx-0 md:w-[40%] bg-black  min-h-60 rounded-t-3xl flex justify-center items-center relative
            bg-cover bg-center
          "
            style={{ backgroundImage: `url(${card.image})` }}
            key={i}
          >
            <div className="content text-2xl md:text-3xl font-semibold absolute w-full h-full bg-gradient-to-b from-black/50 to-[#000] ">
              <div className="content-inner absolute w-full h-full flex justify-center items-center">
                {card.content}
              </div>
            </div>
            <motion.div className="border-effect absolute -top-[1px] w-[calc(100%+4px)] h-[calc(100%+1px)] rounded-t-3xl bg-gradient-to-b from-[#4D4960] -z-10"></motion.div>
            <div className="icon absolute -top-9 rounded-full p-3 bg-black border-2 border-[#73747E]">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="row-two flex flex-col gap-4 md:gap-0 md:flex-row justify-around">
        {cards.slice(2).map((card, i) => (
          <div
            key={i}
            className="box w-[90%] mx-auto md:w-[calc((100%/3)-2rem)] bg-gradient-to-b from-[#000] to-black  min-h-60 rounded-t-3xl flex justify-center items-center relative
            bg-cover bg-center
        "
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className="content text-2xl md:text-3xl font-semibold text-center absolute w-full h-full bg-gradient-to-b from-black/50 to-[#000] rounded-t-3xl">
              <div className="content-inner absolute w-full h-full flex justify-center items-center">
                {card.content}
              </div>
            </div>
            <div className="border-effect absolute -top-[1px] w-[calc(100%+4px)] h-[calc(100%+1px)] rounded-t-3xl bg-gradient-to-b from-[#4D4960] -z-10"></div>
            <div className="icon absolute -top-9 rounded-full p-3 bg-black border-2 border-[#73747E]">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
