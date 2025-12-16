import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion';
import { Home, TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const contentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 14,
            staggerChildren: 0.12,
            delayChildren: 0.4,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

const ErrorPage = ({
    title = 'Page Not Found',
    message,
    ctaText = 'Return Home',
}) => {
    const shouldReduceMotion = useReducedMotion();
    const navigate = useNavigate();

    return (
        <div className="
            min-h-screen flex items-center justify-center 
            bg-linear-to-br from-indigo-50 via-white to-emerald-50 
            text-gray-900 p-6 overflow-hidden relative
        ">
            <title>Error Page - eTuitionBd</title>

            {/* Soft floating gradient glow */}
            <motion.div
                className="
                    absolute w-[750px] h-[750px] 
                    bg-indigo-300/20 rounded-full blur-[120px]
                "
                animate={
                    shouldReduceMotion
                        ? {}
                        : { scale: [0.9, 1.1, 0.9], opacity: [0.25, 0.15, 0.25] }
                }
                transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Card */}
            <motion.div
                className="
                    bg-white/80 backdrop-blur-xl 
                    border border-white/60
                    rounded-3xl shadow-xl shadow-indigo-200/40 
                    p-10 sm:p-14 md:p-16 max-w-lg w-full z-10 
                    text-center transition-all duration-500
                    hover:shadow-indigo-300/50
                "
                variants={contentVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Icon container */}
                <motion.div variants={itemVariants} className="mb-8">
                    <motion.div
                        animate={
                            shouldReduceMotion
                                ? {}
                                : { rotate: [0, -5, 5, 0] }
                        }
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 4,
                        }}
                        className="
                            inline-flex items-center justify-center p-5 
                            rounded-2xl bg-linear-to-br from-indigo-100 to-emerald-100 
                            shadow-inner shadow-white/40
                        "
                    >
                        <TriangleAlert className="w-20 h-20 text-indigo-600 stroke-[1.4]" />
                    </motion.div>
                </motion.div>

                {/* 404 */}
                <motion.h1
                    variants={itemVariants}
                    className="
                        text-8xl sm:text-[10rem] font-black mb-6 
                        text-transparent bg-clip-text 
                        bg-linear-to-r from-indigo-600 to-emerald-600
                        tracking-tight
                    "
                    style={{
                        textShadow: "0 6px 24px rgba(79, 70, 229, 0.15)",
                    }}
                >
                    404
                </motion.h1>

                {/* Title */}
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3"
                >
                    {title}
                </motion.h2>

                {/* Message */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-500 max-w-md mx-auto mb-10"
                >
                    {message ||
                        "Looks like this page doesn't exist anymore. Let’s get you back on track."}
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                    <motion.button
                        onClick={() => navigate('/')}
                        className="
                            px-10 py-3 rounded-full
                            bg-linear-to-r from-indigo-600 to-emerald-600 
                            text-white text-lg font-semibold
                            shadow-lg shadow-indigo-400/40
                            hover:shadow-xl hover:shadow-emerald-400/50
                            transition-transform duration-300
                            flex items-center justify-center gap-2 mx-auto
                        "
                        whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <Home className="w-5 h-5" />
                        {ctaText}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
