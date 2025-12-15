import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Star } from 'lucide-react';
import TutorCard from '../Shared/TutorCard';
import TutorListingSkeleton from '../Shared/TutorListingSkeleton';
import useAxios from '../../hooks/useAxios';

const LatestTutors = () => {
    const axios = useAxios();

    const { data: tutors, isLoading, error } = useQuery({
        queryKey: ['latestTutors'],
        queryFn: async () => {
            const res = await axios.get('/tutors');
            return res.data.slice(0, 6);
        }
    });

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
                        className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
                    >
                        Meet Our <span className='text-emerald-500'>Expert</span> Tutors
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Highly qualified, experienced tutors dedicated to helping students achieve academic success
                    </motion.p>
                </div>

                {/* Tutors Grid */}
                {isLoading ? (
                    <TutorListingSkeleton count={6} />
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Unable to load tutors</h3>
                            <p className="text-gray-500 mb-4">Please try again later</p>
                        </div>
                    </div>
                ) : tutors?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tutors.map((tutor, index) => (
                                <motion.div
                                    key={tutor._id}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="whileHover"
                                    variants={cardAnimation}
                                    transition={{ delay: index * 0.1 }}

                                >
                                    <TutorCard
                                        tutor={tutor}
                                        className="h-full"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* View All Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="text-center mt-12"
                        >
                            <Link
                                to="/tutors"
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                View All Tutors
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tutors Available</h3>
                            <p className="text-gray-500 mb-4">Check back later for tutor profiles</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestTutors;