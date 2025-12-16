import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SortAsc, SortDesc, MapPin, BookOpen, DollarSign, Calendar, GraduationCap, X } from 'lucide-react';
import useAxios from '../../hooks/useAxios';
import TuitionCard from '../../components/Shared/TuitionCard';
import LoadingTuitionCard from '../../components/Shared/LoadingTuitionCard';

const AllTuitions = () => {
    const [tuitions, setTuitions] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        classGrade: '',
        subject: '',
        location: '',
        minSalary: '',
        maxSalary: ''
    });

    const axios = useAxios();

    // Class options for filter
    const classOptions = [
        '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
        'Admission Test', 'University', 'Professional'
    ];

    // Subject options for filter
    const subjectOptions = [
        '', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
        'Bangla', 'ICT', 'Accounting', 'Economics', 'Science', 'History'
    ];

    const fetchTuitions = async () => {
        setLoading(true);
        try {
            // Build query parameters
            const params = new URLSearchParams({
                page: page.toString(),
                search: search,
                sort: sort,
                sortOrder: sortOrder,
                ...(filters.classGrade && { class: filters.classGrade }),
                ...(filters.subject && { subject: filters.subject }),
                ...(filters.location && { location: filters.location }),
                ...(filters.minSalary && { minSalary: filters.minSalary }),
                ...(filters.maxSalary && { maxSalary: filters.maxSalary })
            });

            const res = await axios.get(`/tuitions?${params}`);
            setTuitions(res.data.tuitions || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching tuitions:', error);
            setTuitions([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTuitions();
    }, [page, sort, sortOrder]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (page !== 1) setPage(1);
            else fetchTuitions();
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Apply filters
    const handleApplyFilters = () => {
        setPage(1);
        fetchTuitions();
        setShowFilters(false);
    };

    // Clear all filters
    const handleClearFilters = () => {
        setFilters({
            classGrade: '',
            subject: '',
            location: '',
            minSalary: '',
            maxSalary: ''
        });
        setPage(1);
        fetchTuitions();
    };

    // Clear individual filter
    const handleClearFilter = (filterKey) => {
        setFilters(prev => ({ ...prev, [filterKey]: '' }));
        setPage(1);
        fetchTuitions();
    };

    // Check if any filter is active
    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

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
            <title>Tuitions - eTuitionBd</title>
            {/* Hero Section */}
            <div className="bg-primary text-white py-16 rounded-b-3xl">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Find Your Perfect Tuition Match
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl opacity-90 max-w-2xl mx-auto"
                    >
                        Browse through verified tuition opportunities
                    </motion.p>
                </div>
            </div>

            {/* Search and Filters Section */}
            <div className="py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Search Input */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by subject, location, or keywords..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Sort Controls */}
                        <div className="flex gap-3">
                            <select
                                className="px-4 py-3 border border-gray-200 rounded-xl focus:border-primary focus:outline-none bg-white"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="createdAt">Sort by Date</option>
                                <option value="salary">Sort by Salary</option>
                                <option value="classGrade">Sort by Class</option>
                            </select>

                            <button
                                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                                title={sortOrder === 'desc' ? 'Descending' : 'Ascending'}
                            >
                                {sortOrder === 'desc' ? <SortDesc className="w-5 h-5" /> : <SortAsc className="w-5 h-5" />}
                            </button>

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
                    </div>

                    {/* Advanced Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 mt-6 border-t">
                                    {/* Class Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <GraduationCap className="inline w-4 h-4 mr-1" />
                                            Class
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                            value={filters.classGrade}
                                            onChange={(e) => setFilters({ ...filters, classGrade: e.target.value })}
                                        >
                                            {classOptions.map(option => (
                                                <option key={option} value={option}>
                                                    {option || 'All Classes'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Subject Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <BookOpen className="inline w-4 h-4 mr-1" />
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

                                    {/* Location Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="inline w-4 h-4 mr-1" />
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter location..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                            value={filters.location}
                                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                        />
                                    </div>

                                    {/* Salary Range */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <DollarSign className="inline w-4 h-4 mr-1" />
                                            Salary Range (৳)
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                                value={filters.minSalary}
                                                onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                                                value={filters.maxSalary}
                                                onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Filter Actions */}
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
                                    <button
                                        onClick={handleApplyFilters}
                                        className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Count and Active Filters */}
                <div className="mb-6">
                    <p className="text-gray-600 mb-2">
                        Showing <span className="font-semibold">{tuitions.length}</span> tuition opportunities
                    </p>

                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([key, value]) => {
                                if (!value) return null;
                                return (
                                    <span key={key} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                        {key === 'classGrade' ? 'Class' : key === 'minSalary' ? 'Min Salary' : key === 'maxSalary' ? 'Max Salary' : key}: {value}
                                        <button
                                            onClick={() => handleClearFilter(key)}
                                            className="hover:text-primary-dark"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <LoadingTuitionCard count={9} />
                    </div>
                ) : (
                    <>
                        {/* Tuitions Grid */}
                        {tuitions.length > 0 ? (
                            <>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {tuitions.map((tuition, index) => (
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
                                            // variant="featured"
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Pagination */}
                                {totalPages > 0 && (
                                    <div className="flex justify-center items-center mt-12 space-x-2">
                                        <button
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
                                        >
                                            ← Previous
                                        </button>

                                        <div className="flex items-center space-x-1">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (page <= 3) {
                                                    pageNum = i + 1;
                                                } else if (page >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = page - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`w-10 h-10 rounded-lg transition-colors ${page === pageNum
                                                            ? 'bg-primary text-white'
                                                            : 'border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}

                                            {totalPages > 5 && page < totalPages - 2 && (
                                                <>
                                                    <span className="px-2 text-gray-400">...</span>
                                                    <button
                                                        onClick={() => handlePageChange(totalPages)}
                                                        className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        {totalPages}
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Empty State
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No Tuitions Found</h3>
                                    <p className="text-gray-600 mb-8">
                                        {search || hasActiveFilters
                                            ? 'Try adjusting your search or filters to find what you\'re looking for.'
                                            : 'No tuition opportunities are available at the moment. Check back later!'}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default AllTuitions;