import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const loaderVariants = {
    animationOne: {
      x: [-20, 20],
      y: [0, -30],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 0.1
        },
        y: {
          yoyo: Infinity,
          duration: 0.25,
          ease: "easeOut"
        }
      }
    }
  };
  console.log("dksnbjksndfffffffffffffffffffffff")

  return (
    <div className="flex justify-center items-center h-screen">
      Loading ... 
    </div>
  );
};

export default Loader;