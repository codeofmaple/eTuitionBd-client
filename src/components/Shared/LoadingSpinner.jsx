/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-10 select-none">

            {/* Outer Glow Ring */}
            <motion.div
                className="
                    relative w-20 h-20 
                    flex items-center justify-center
                "
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >

                {/* Glow ring */}
                <div
                    className="
                        absolute inset-0 rounded-full 
                        bg-gradient-to-br from-indigo-400/20 to-emerald-400/20 
                        blur-xl
                    "
                />

                {/* Rotating dual ring */}
                <motion.div
                    className="
                        absolute inset-0 rounded-full border-[6px] 
                        border-transparent 
                        border-t-indigo-500 border-r-emerald-500
                    "
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />

                {/* Soft pulsing center dot */}
                <motion.div
                    className="
                        w-6 h-6 rounded-full 
                        bg-gradient-to-br from-indigo-500 to-emerald-500 shadow-lg
                    "
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;
