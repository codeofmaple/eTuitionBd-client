import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, DollarSign, ArrowRight } from 'lucide-react';

// Animation
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 10,
            staggerChildren: 0.1,
            when: "beforeChildren",
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

// Data
const howItWorksData = [
    {
        icon: FileText,
        title: "Post Your Tuition Need",
        description: "Students create detailed requirements, specifying subject, class, budget, and location.",
        colorClass: "text-indigo-600",
        bgClass: "bg-indigo-50",
    },
    {
        icon: Users,
        title: "Connect with Expert Tutors",
        description: "Tutors browse and apply. Review verified profiles and application details to find the perfect match.",
        colorClass: "text-emerald-600",
        bgClass: "bg-emerald-50",
    },
    {
        icon: DollarSign,
        title: "Secure Booking & Learning",
        description: "Accept the tutor, handle payments securely, and begin your personalized learning journey.",
        colorClass: "text-rose-600",
        bgClass: "bg-rose-50",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-20 md:py-32 font-inter">
            <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.h2 variants={itemVariants} className="text-sm font-bold uppercase text-indigo-600 tracking-widest mb-2">
                    Simple & Transparent
                </motion.h2>
                <motion.h3 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-16">
                    How <span className="bg-clip-text text-transparent bg-indigo-600 to-indigo-400">eTuitionBd</span> Works
                </motion.h3>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    <div className="absolute inset-x-0 top-[2.5rem] hidden md:flex justify-around pointer-events-none">
                        <div className="flex-1 border-t-2 border-dashed border-indigo-200 mx-10 mt-[-2px]"></div>
                        <div className="flex-1 border-t-2 border-dashed border-indigo-200 mx-10 mt-[-2px]"></div>
                    </div>

                    {howItWorksData.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative flex flex-col items-center p-8 pt-12 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/70"
                        >
                            <div className={`absolute top-0 transform -translate-y-1/2 p-2 rounded-full ${step.bgClass} ${step.colorClass} border-4 border-white shadow-xl`}>
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl font-extrabold bg-white ${step.colorClass}`}>
                                    {index + 1}
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold text-gray-800 mt-4 mb-3">{step.title}</h4>
                            <p className="text-gray-500 text-base">{step.description}</p>

                            {index < howItWorksData.length - 1 && (
                                <div className="md:hidden mt-8 w-full flex justify-center">
                                    <ArrowRight className="w-8 h-8 text-indigo-300 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default HowItWorks;