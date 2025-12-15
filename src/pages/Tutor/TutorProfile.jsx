import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Star, GraduationCap,
    BookOpen, Award, Calendar, Users, MessageSquare,
    CheckCircle, ArrowLeft, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const TutorProfile = () => {
    const { id } = useParams();
    const axios = useAxios();

    const { data: tutor, isLoading, error } = useQuery({
        queryKey: ['tutor', id],
        queryFn: async () => {
            const res = await axios.get(`/tutors/${id}`);
            return res.data;
        }
    });

    const { data: applications } = useQuery({
        queryKey: ['tutorApplications', id],
        queryFn: async () => {
            const res = await axios.get(`/applications/my-applications/${tutor?.email}`);
            return res.data;
        },
        enabled: !!tutor
    });

    if (isLoading) {
        return (
            <LoadingSpinner></LoadingSpinner>
        );
    }

    if (error || !tutor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md p-8">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tutor Not Found</h2>
                    <p className="text-gray-600 mb-6">The tutor profile you're looking for doesn't exist or has been removed.</p>
                    <Link
                        to="/tutors"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to All Tutors
                    </Link>
                </div>
            </div>
        );
    }

    // Calculating stats from applications
    const stats = {
        totalApplications: applications?.length || 0,
        approvedApplications: applications?.filter(app => app.status === 'approved').length || 0,
        pendingApplications: applications?.filter(app => app.status === 'pending').length || 0,
        averageSalary: applications?.reduce((sum, app) => sum + (app.expectedSalary || 0), 0) / (applications?.length || 1) || 0
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back navigation */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        to="/tutors"
                        className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to All Tutors
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={tutor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=4F46E5&color=fff`}
                                        alt={tutor.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 mx-auto"
                                    />
                                    <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">{tutor.name}</h1>
                                <div className="flex items-center justify-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <span className="font-bold text-gray-800">4.8</span>
                                    <span className="text-gray-500">(24 reviews)</span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-600">
                                    <Mail className="w-5 h-5 mr-3 text-primary" />
                                    <span className="truncate">{tutor.email}</span>
                                </div>
                                {tutor.phone && (
                                    <div className="flex items-center text-gray-600">
                                        <Phone className="w-5 h-5 mr-3 text-primary" />
                                        <span>{tutor.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                                    <span>Dhaka, Bangladesh</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Award className="w-5 h-5 mr-3 text-primary" />
                                    <span className="font-medium">Verified Tutor</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Teaching Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <BookOpen className="w-5 h-5 text-primary mr-3" />
                                        <span className="text-gray-600">Total Applications</span>
                                    </div>
                                    <span className="font-bold text-gray-800">{stats.totalApplications}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                        <span className="text-gray-600">Approved</span>
                                    </div>
                                    <span className="font-bold text-green-600">{stats.approvedApplications}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 text-blue-500 mr-3" />
                                        <span className="text-gray-600">Students Helped</span>
                                    </div>
                                    <span className="font-bold text-gray-800">50+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 text-purple-500 mr-3" />
                                        <span className="text-gray-600">Member Since</span>
                                    </div>
                                    <span className="font-bold text-gray-800">
                                        {new Date(tutor.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <User className="w-6 h-6 mr-3 text-primary" />
                                About {tutor.name}
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                {tutor.description || `Experienced ${tutor.subject || ''} tutor with a passion for helping students achieve their academic goals. With years of teaching experience and a student-centered approach, I focus on building strong foundational knowledge while making learning engaging and enjoyable.`}
                            </p>

                            {/* Expertise */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Areas of Expertise</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['Mathematics', 'Physics', 'Chemistry', 'Calculus', 'Statistics', 'ICT'].map((subject, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Teaching Style */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Teaching Methodology</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                        <span className="text-gray-600">Concept-based learning with real-world applications</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                        <span className="text-gray-600">Regular assessments and progress tracking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                        <span className="text-gray-600">Interactive sessions with practical examples</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                        <span className="text-gray-600">Personalized lesson plans based on student needs</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Recent Applications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <BookOpen className="w-6 h-6 mr-3 text-primary" />
                                Recent Applications
                            </h2>

                            {applications?.length > 0 ? (
                                <div className="space-y-4">
                                    {applications.slice(0, 3).map((app, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-gray-800">{app.tuitionDetails?.subject || 'Tuition'}</h4>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm mb-2">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {app.tuitionDetails?.location || 'Location not specified'}
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">
                                                    Expected: ৳{app.expectedSalary?.toLocaleString()}
                                                </span>
                                                <span className="text-gray-500">
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-600">No recent applications</p>
                                </div>
                            )}
                        </motion.div>

                        {/* Contact Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <Link
                                to={`/tuitions`}
                                className="inline-flex items-center justify-center px-8 py-4
                                 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark 
                                 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                            >
                                <MessageSquare className="w-5 h-5 mr-3" />
                                View Available Tuitions
                                <ExternalLink className="w-5 h-5 ml-3" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfile;