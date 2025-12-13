// pages/AllTutors.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Filter, GraduationCap, Star, Award, X } from 'lucide-react';
import useAxios from '../../hooks/useAxios';
import TutorListingSkeleton from '../../components/Shared/TutorListingSkeleton';
import TutorCard from '../../components/Shared/TutorCard';

const AllTutors = () => {
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        subject: '',
        minRating: '',
        experience: ''
    });
    const axios = useAxios();

    const { data: tutors, isLoading, error } = useQuery({
        queryKey: ['tutors', search, filters],
        queryFn: async () => {
            const params = new URLSearchParams({
                ...(search && { search }),
                ...(filters.subject && { subject: filters.subject }),
                ...(filters.minRating && { minRating: filters.minRating }),
                ...(filters.experience && { experience: filters.experience })
            });

            const res = await axios.get(`/tutors?${params}`);
            return res.data;
        }
    });

    const subjectOptions = [
        '', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
        'Bangla', 'ICT', 'Accounting', 'Economics'
    ];

    const ratingOptions = ['', '4.0+', '4.5+', '5.0'];
    const experienceOptions = ['', '1-2 years', '3-5 years', '5+ years'];

    const handleClearFilters = () => {
        setFilters({ subject: '', minRating: '', experience: '' });
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

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
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-primary text-white py-16 rounded-b-3xl">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Meet Our Expert Tutors
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl opacity-90 max-w-2xl mx-auto"
                    >
                        Connect with qualified, verified tutors ready to help you succeed
                    </motion.p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search tutors by name, subject, or location..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-3 border rounded-xl transition-colors flex items-center gap-2 ${hasActiveFilters
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <Filter className="w-5 h-5" />
                            Filters {hasActiveFilters && `(${Object.values(filters).filter(v => v).length})`}
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mt-6 border-t">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <GraduationCap className="inline w-4 h-4 mr-1" />
                                        Subject
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                        value={filters.subject}
                                        onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                                    >
                                        {subjectOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option || 'All Subjects'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Star className="inline w-4 h-4 mr-1" />
                                        Minimum Rating
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                        value={filters.minRating}
                                        onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                                    >
                                        {ratingOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option || 'Any Rating'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Award className="inline w-4 h-4 mr-1" />
                                        Experience
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                        value={filters.experience}
                                        onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                                    >
                                        {experienceOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option || 'Any Experience'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
                                {hasActiveFilters && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([key, value]) => {
                                if (!value) return null;
                                return (
                                    <span key={key} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                        {key}: {value}
                                        <button
                                            onClick={() => setFilters({ ...filters, [key]: '' })}
                                            className="hover:text-primary-dark"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Found <span className="font-semibold">{tutors?.length || 0}</span> tutors
                    </p>
                </div>

                {/* Tutors Grid */}
                {isLoading ? (
                    <TutorListingSkeleton count={6} />
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-3">Error Loading Tutors</h3>
                            <p className="text-gray-600 mb-8">Please try again later</p>
                        </div>
                    </div>
                ) : tutors?.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
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
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <GraduationCap className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Tutors Found</h3>
                            <p className="text-gray-600 mb-8">
                                {search || hasActiveFilters
                                    ? 'Try adjusting your search or filters'
                                    : 'No tutors are available at the moment'}
                            </p>
                            {(search || hasActiveFilters) && (
                                <button
                                    onClick={handleClearFilters}
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTutors;