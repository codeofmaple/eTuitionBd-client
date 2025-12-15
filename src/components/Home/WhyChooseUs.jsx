import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    SearchCheck,
    CreditCard,
    MessageSquare,
    Zap,
    Smartphone,
} from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.06,
            when: "beforeChildren",
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.995, y: 12 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.32, ease: "easeOut" },
    },
};

const featuresData = [
    {
        icon: ShieldCheck,
        title: "Vetted & Verified Profiles",
        description:
            "Every tutor profile undergoes a rigorous verification process, ensuring quality and reliability.",
    },
    {
        icon: SearchCheck,
        title: "Advanced Search & Filtering",
        description:
            "Find the ideal match instantly using powerful search, sorting by budget, and filtering by subject/class.",
    },
    {
        icon: CreditCard,
        title: "Secure Stripe Payments",
        description:
            "All transactions are handled securely via Stripe, offering transparent financial tracking.",
    },
    {
        icon: MessageSquare,
        title: "Direct Communication",
        description:
            "Integrated tools allow students and tutors to discuss requirements and schedules seamlessly.",
    },
    {
        icon: Zap,
        title: "Instant Workflow",
        description:
            "Automated notifications and status updates ensure a friction-free experience from posting to booking.",
    },
    {
        icon: Smartphone,
        title: "Fully Responsive Platform",
        description:
            "Access all features flawlessly on any device—desktop, tablet, or mobile—with our sleek design.",
    },
];

const WhyChooseUs = () => {
    const reduceMotion = useReducedMotion();
    const motionProps = reduceMotion
        ? { initial: false, animate: true }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.05 } };

    return (
        <section className="">
            <motion.div variants={containerVariants} {...motionProps}>
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase text-emerald-600 tracking-widest mb-2">
                        Platform Advantages
                    </h2>
                    <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                        The{" "}
                        <span className="text-emerald-600">
                            Smart Choice
                        </span>{" "}
                        for Tuition
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 transform hover:shadow-2xl hover:border-emerald-300 flex flex-col text-left cursor-pointer"
                            style={{ willChange: "transform, opacity" }}
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-4 rounded-xl bg-emerald-100 text-emerald-600 shadow-sm">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold text-gray-800 mb-3">
                                {feature.title}
                            </h4>
                            <p className="text-gray-500 grow">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default React.memo(WhyChooseUs);
