import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Zap, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const slidesData = [
    {
        id: 1,
        headline: "Find Your Perfect Tutor",
        highlight: "Today",
        description: "Browse verified profiles and subjects tailored to your specific academic needs. Master any subject with 1-on-1 guidance.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop",
        icon: BookOpen,
        theme: 'indigo',
    },
    {
        id: 2,
        headline: "Flexible Learning,",
        highlight: "Your Schedule",
        description: "Set your preferred class times and location. Stop juggling conflicts and learn at your own pace, on your own terms.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
        icon: Clock,
        theme: 'red',
    },
    {
        id: 3,
        headline: "Start Teaching &",
        highlight: "Earn Instantly",
        description: "Join a community of experts. Enjoy a quick application process, direct student matching, and guaranteed secure payments.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
        icon: Zap,
        theme: 'emerald',
    },
];

const colorStyles = {
    indigo: {
        badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        button: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25",
        progress: "bg-indigo-500"
    },
    red: {
        badge: "bg-red-500/20 text-red-300 border-red-500/30",
        button: "bg-red-600 hover:bg-red-500 shadow-red-500/25",
        progress: "bg-red-500"
    },
    emerald: {
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        button: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
        progress: "bg-emerald-500"
    }
};

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);
    const DURATION = 6000;

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    };

    useEffect(() => {
        if (!isPaused) {
            resetTimeout();
            timeoutRef.current = setTimeout(nextSlide, DURATION);
        }
        return () => resetTimeout();
    }, [currentIndex, isPaused]);

    const currentSlide = slidesData[currentIndex];
    const theme = colorStyles[currentSlide.theme];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div
            className="relative max-h-[70vh] w-full rounded-3xl mt-5 bg-gray-900 overflow-hidden font-sans"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image */}
            <AnimatePresence initial={false} mode="sync">
                <motion.div
                    key={currentSlide.id}
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    <img
                        src={currentSlide.image}
                        alt={currentSlide.headline}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-900/40 to-gray-900/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container  */}
            <div className="relative mt-2 z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-center pb-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-3xl text-center"
                    >
                        {/* Icon & Badge  */}
                        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
                            <div className={`p-2 rounded-lg border backdrop-blur-md ${theme.badge}`}>
                                <currentSlide.icon className="w-5 h-5" />
                            </div>
                            <span className="text-gray-300 font-medium tracking-wide uppercase text-sm flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                Top Rated Platform
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                            {currentSlide.headline}{' '}
                            <span className={`bg-clip-text text-transparent bg-gradient-to-r 
                                ${currentSlide.theme === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                                    currentSlide.theme === 'red' ? 'from-red-500 to-red-500' :
                                        'from-emerald-400 to-emerald-600'}`}>
                                {currentSlide.highlight}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                            {currentSlide.description}
                        </motion.p>

                        {/* Buttons  */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
                            <button className={`flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl ${theme.button}`}>
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 rounded-full text-white font-semibold bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-all">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows   */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-md"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-md"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slidesData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="relative h-1 w-12 rounded-full bg-gray-700 overflow-hidden cursor-pointer group"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {index === currentIndex && !isPaused && (
                            <motion.div
                                className={`absolute top-0 left-0 h-full ${theme.progress}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: DURATION / 1000, ease: "linear" }}
                            />
                        )}
                        {index === currentIndex && isPaused && (
                            <div className={`absolute top-0 left-0 h-full w-full ${theme.progress}`} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;