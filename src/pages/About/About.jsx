import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { GraduationCap, HandHelping, CheckCircle, Users } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        className="card bg-base-100 shadow-xl border border-indigo-100/50 hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
    >
        <div className="card-body items-center text-center">
            <Icon className="w-12 h-12 text-indigo-600 mb-4" />
            <h2 className="card-title text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    </motion.div>
);

const About = () => {
    return (
        <div className="min-h-screen  ">
            <title>About - eTuitionBd</title>
            <div className="container mx-auto px-4 py-16 max-w-7xl">

                {/* Hero Section */}
                <motion.header
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Our Mission at <span className="text-indigo-600">eTuitionBd</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Connecting aspiring minds with expert mentors to bridge the gap in quality education and verified tuition services.
                    </p>
                </motion.header>

                {/* Story Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center mb-20 p-8 bg-white shadow-lg rounded-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-l-4 border-emerald-500 pl-3">
                            The <span className="text-indigo-600">Story</span> Behind Our Platform
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            We started eTuitionBd to solve the common frustration of finding reliable, qualified tutors in a fragmented market. Our founders, a team of educators and tech professionals, envisioned a seamless platform where students could post specific requirements and tutors could easily apply, all while being monitored by a dedicated administrative team.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Every feature, from the role-based dashboards to the secure Stripe payment integration, is built with transparency and trust in mind. We are dedicated to providing a structured environment that empowers both learning and teaching.
                        </p>
                    </motion.div>
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <img
                            src="https://placehold.co/600x400/4F46E5/ffffff?text=eTuitionBd+Team"
                            alt="Team discussing project goals"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/4F46E5/ffffff?text=Team+Working" }}
                        />
                    </motion.div>
                </section>

                {/* Core Values Section */}
                <section className="mb-20">
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
                        Our <span className="text-emerald-500">Core Values</span>
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={GraduationCap}
                            title="Quality Education"
                            description="Ensuring every student is matched with a highly qualified, verified tutor."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={CheckCircle}
                            title="Transparency"
                            description="Open communication and clear payment tracking via secure Stripe integration."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={HandHelping}
                            title="Supportive Community"
                            description="Fostering a helpful and encouraging environment for both tutors and students."
                            delay={0.5}
                        />
                        <FeatureCard
                            icon={Users}
                            title="Trust & Safety"
                            description="Admin-reviewed tuition posts and tutor applications for a secure platform."
                            delay={0.7}
                        />
                    </div>
                </section>

                {/* Team Call to Action */}
                <motion.div
                    className="text-center p-10 bg-indigo-600 rounded-xl shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to find your perfect mentor?</h3>
                    <p className="text-indigo-200 mb-6 max-w-2xl mx-auto">
                        Browse our approved tuition posts or register as a verified tutor today to start your journey.
                    </p>
                    <button className="btn btn-outline btn-lg text-white hover:bg-white hover:text-indigo-600 border-white">
                        Get Started
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default About;