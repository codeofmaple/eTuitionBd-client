import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import LoadingTuitionCard from '../Shared/LoadingTuitionCard';
import TuitionCard from '../Shared/TuitionCard';
import useAxios from '../../hooks/useAxios';

const LatestTuitions = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    useEffect(() => {
        const fetchLatestTuitions = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/tuitions?page=1&limit=6&sort=createdAt&sortOrder=desc');
                setTuitions(res.data.tuitions || []);
            } catch (error) {
                console.error('Error fetching latest tuitions:', error);
                setTuitions([]);
            }
            setLoading(false);
        };
        fetchLatestTuitions();
    }, [axios]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Card animation- Framer Motion
    const cardAnimation = {
        initial: { y: 20, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        },
        whileHover: {
            y: -5,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <section className="">
            <div className="">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
                    >
                        Latest Tuition <span className='text-emerald-500'>Opportunities</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Browse through our latest verified tuition posts. Find the perfect match for your teaching expertise.
                    </motion.p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <LoadingTuitionCard count={6} />
                    </div>
                ) : (
                    <>
                        {/* Tuitions Grid */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {tuitions.length > 0 ? tuitions.map((tuition, index) => (
                                <motion.div
                                    key={tuition._id}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="whileHover"
                                    variants={cardAnimation}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <TuitionCard
                                        tuition={tuition}
                                    />
                                </motion.div>
                            )) : (
                                // Empty State
                                <div className="col-span-full text-center py-12">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto"
                                    >
                                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tuitions Available</h3>
                                        <p className="text-gray-500 mb-4">Check back later for new tuition opportunities</p>
                                        <Link
                                            to="/tuitions"
                                            className="inline-flex items-center justify-center px-6 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                                        >
                                            Browse All Tuitions
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>

                        {/* View All Link */}
                        {tuitions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-center mt-12"
                            >
                                <Link
                                    to="/tuitions"
                                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    Browse All Tuitions
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default LatestTuitions;