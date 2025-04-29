// import { motion } from "framer-motion";
// import zarkLogo from "../assets/logo.svg";
// import { FlipWordsZarkSecond } from "./flip-words";
// import Cards from "./Cards";
// import PurposeBuilt from "./PurposeBuilt";
// import SetupSteps from "./setup-steps";
// import VideoPlayer from "./video-player";
// import Industries from "./Industries";
// import Partners from "./Partners";
// // import Pricing from "./Pricing";
// import { PricingPlans } from "./PricingPlans";

// export default function Info() {
//   return (
//     <div className="about relative z-10">
//       <Cards />
//       <PurposeBuilt />
     
//       <Industries />
//       <SetupSteps />
//       <VideoPlayer />
//       <Partners />
//       {/* <Pricing /> */}
//       <PricingPlans />
//       {/* <motion.div className="flex items-center justify-center flex-col my-48 space-y-14 px-4">
//         <FlipWordsZarkSecond />
//         <motion.img
//           className="w-[48rem]"
//           src={zarkLogo}
//           alt="zark logo"
//           initial={{ opacity: 0, y: 200 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//         />
//         <motion.h2
//           className="text-xl md:text-7xl font-bold"
//           initial={{ opacity: 0, y: 200 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           THE BLUEDOVE'S AI ENGINE
//         </motion.h2>
//       </motion.div> */}
//     </div>
//   );
// }


import { motion } from "framer-motion";
import zarkLogo from "../assets/logo.svg";
import { FlipWordsZarkSecond } from "./flip-words";
import Cards from "./Cards";
import PurposeBuilt from "./PurposeBuilt";
import SetupSteps from "./setup-steps";
import VideoPlayer from "./video-player";
import Industries from "./Industries";
import Partners from "./Partners";
import { PricingPlans } from "./PricingPlans";
import React, { forwardRef } from "react";


// Forwards ref to allow parent to access this component
const Info = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div className="about relative z-10" ref={ref}>
      <Cards />
      <PurposeBuilt />
      <Industries />
      <SetupSteps />
      <VideoPlayer />
      <Partners />
      
      {/* Pricing section with ID for detection */}
      <div id="pricing-section" className="pricing-container">
        <PricingPlans />
      </div>
      
     
    </div>
  );
});

// Adding display name for React DevTools
Info.displayName = 'Info';

export default Info;