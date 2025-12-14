import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, BookOpen, DollarSign, Calendar, GraduationCap, ArrowRight } from 'lucide-react';

const TuitionCard = ({
    tuition,
    variant = 'default',
    showStatus = true,
    animation = null,
    className = ''
}) => {
    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Card variants
    const cardVariants = {
        default: {
            hidden: { y: 20, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100, damping: 12 }
            },
            hover: {
                y: -5,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
            }
        },
        minimal: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3 }
            }
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'minimal':
                return "bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200";
            default:
                return "bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group";
        }
    };

    const getButtonStyle = () => {
        switch (variant) {
            case 'minimal':
                return "px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors text-sm";
            case 'featured':
                return "px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg";
            default:
                return "block w-full text-center py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors group-hover:shadow-lg";
        }
    };

    const CardWrapper = animation ? motion.div : 'div';
    const wrapperProps = animation ? {
        variants: cardVariants[variant] || cardVariants.default,
        ...animation
    } : {};

    return (
        <CardWrapper
            {...wrapperProps}
            className={`${getVariantStyles()} ${className}`}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className={`font-bold ${variant === 'featured' ? 'text-2xl text-gray-900' : 'text-xl text-gray-800'} group-hover:text-primary transition-colors mb-1`}>
                            {tuition.subject} {variant === 'minimal' ? 'Tutor Needed' : 'Tuition'}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                            <GraduationCap className="w-4 h-4 mr-1 shrink-0" />
                            <span>Class {tuition.classGrade}</span>
                        </div>
                    </div>

                    {showStatus && tuition.status && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tuition.status === 'approved' ? 'bg-green-100 text-green-800' : tuition.status === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {tuition.status === 'approved' ? 'Active' : tuition.status === 'booked' ? 'Booked' : 'Pending'}
                        </span>
                    )}
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 shrink-0" />
                        <span className="truncate">{tuition.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 shrink-0" />
                        <span className="font-bold text-primary">৳{tuition.salary?.toLocaleString()}</span>
                        <span className="text-gray-500 ml-1">per month</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 shrink-0" />
                        <span>Posted {formatDate(tuition.createdAt)}</span>
                    </div>
                </div>

                {/* Description Preview */}
                {/* {tuition.description && (
                    <p className="text-gray-700 mb-6 line-clamp-2">
                        {tuition.description}
                    </p>
                )} */}

                {/* Footer */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                            Posted by <span className="font-medium text-gray-700">{tuition.studentName}</span>
                        </span>
                        {variant !== 'minimal' && (
                            <span className="flex items-center text-primary text-xs">
                                <BookOpen className="w-3 h-3 mr-1" />
                                {tuition.subject}
                            </span>
                        )}
                    </div>

                    {/* Action Button */}
                    <Link
                        to={`/tuition/${tuition._id}`}
                        className={getButtonStyle()}
                    >
                        {variant === 'minimal' ? (
                            'View Details'
                        ) : variant === 'featured' ? (
                            <span className="flex items-center justify-center">
                                Apply Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </span>
                        ) : (
                            'View Details & Apply'
                        )}
                    </Link>
                </div>
            </div>
        </CardWrapper>
    );
};

// Default props
TuitionCard.defaultProps = {
    variant: 'default',
    showStatus: true,
    animation: null,
    className: ''
};

export default TuitionCard;