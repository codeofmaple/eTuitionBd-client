import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Star, GraduationCap, BookOpen, Award } from 'lucide-react';

const TutorCard = ({ tutor, variant = 'default', animation = null, className = '' }) => {
    const CardWrapper = animation ? motion.div : 'div';
    const wrapperProps = animation ? {
        whileHover: { y: -5, scale: 1.02 },
        transition: { type: "spring", stiffness: 400, damping: 25 },
        ...animation
    } : {};

    return (
        <CardWrapper
            {...wrapperProps}
            className={`group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}
        >
            <div className="p-6">
                {/* Tutor Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                        <img
                            src={tutor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=4F46E5&color=fff`}
                            alt={tutor.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">
                            {tutor.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {tutor.email}
                        </p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                    {tutor.phone && (
                        <div className="flex items-center text-gray-600 text-sm">
                            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{tutor.phone}</span>
                        </div>
                    )}
                    <div className="flex items-center text-gray-600 text-sm">
                        <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Verified Tutor</span>
                    </div>
                </div>

                {/* Stats & Subjects */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-bold text-gray-800">4.8</span>
                        <span className="text-gray-500 text-sm ml-1">(24 reviews)</span>
                    </div>
                    <div className="text-primary font-semibold">
                        50+ Students
                    </div>
                </div>

                {/* Subjects Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {['Mathematics', 'Physics', 'Chemistry'].map((subject, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {subject}
                        </span>
                    ))}
                </div>

                {/* Action Button */}
                <Link
                    to={`/tutor/${tutor._id}`}
                    className="block w-full text-center py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors group-hover:shadow-lg"
                >
                    View Profile
                </Link>
            </div>
        </CardWrapper>
    );
};

export default TutorCard;