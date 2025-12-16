import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    MapPin, BookOpen, DollarSign, Calendar, User,
    MessageSquare, CheckCircle, Clock, Award
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import TuitionCard from '../../components/Shared/TuitionCard';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useSecureAxios from '../../hooks/useAxiosSecure';

const TuitionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [role] = useRole();
    const [tuition, setTuition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [formData, setFormData] = useState({
        qualifications: '',
        experience: '',
        expectedSalary: ''
    });
    const axiosSecure = useSecureAxios();

    useEffect(() => {
        const fetchTuitionDetails = async () => {
            setLoading(true);
            try {
                const res = await axiosSecure.get(`/tuitions/${id}`);
                setTuition(res.data);
                if (res.data?.salary) {
                    setFormData(prev => ({ ...prev, expectedSalary: res.data.salary }));
                }
            } catch (error) {
                console.error('Error fetching tuition details:', error);
                Swal.fire('Error', 'Failed to load tuition details', 'error');
                navigate('/tuitions');
            }
            setLoading(false);
        };
        fetchTuitionDetails();
    }, [id, navigate, axiosSecure]);

    const handleApply = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire('Login Required', 'Please login to apply for this tuition', 'info');
            navigate('/login', { state: { from: `/tuition/${id}` } });
            return;
        }

        if (role !== 'tutor') {
            Swal.fire('Tutors Only', 'Only registered tutors can apply for tuitions', 'warning');
            return;
        }

        setApplying(true);
        try {
            const applicationData = {
                tuitionId: id,
                tutorEmail: user.email,
                tutorName: user.displayName || user.name,
                expectedSalary: Number(formData.expectedSalary),
                qualifications: formData.qualifications,
                experience: formData.experience,
                studentEmail: tuition.studentEmail
            };

            await axiosSecure.post('/applications', applicationData);

            setShowApplyModal(false);
            Swal.fire({
                title: 'Application Submitted!',
                text: 'Your application has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4F46E5'
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to submit application';
            Swal.fire('Error', errorMessage, 'error');
        } finally {
            setApplying(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!tuition) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Tuition Not Found</h2>
                <button
                    onClick={() => navigate('/tuitions')}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Browse All Tuitions
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <title>Tuition Details - eTuitionBd</title>
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li><a href="/" className="hover:text-primary">Home</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li><a href="/tuitions" className="hover:text-primary">Tuitions</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li className="font-medium text-gray-800">{tuition.subject} Tuition</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-primary text-white p-8">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2">{tuition.title || `${tuition.subject} Tuition Needed`}</h1>
                                        <div className="flex items-center flex-wrap gap-4">
                                            <span className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
                                                <BookOpen className="w-4 h-4 mr-1" />
                                                Class {tuition.classGrade}
                                            </span>
                                            <span className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {tuition.location}
                                            </span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${tuition.status === 'approved' ? 'bg-green-500/20 text-green-100' : tuition.status === 'booked' ? 'bg-blue-500/20 text-blue-100' : 'bg-yellow-500/20 text-yellow-100'}`}>
                                                {tuition.status === 'approved' ? 'Active' : tuition.status === 'booked' ? 'Booked' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">৳{tuition.salary?.toLocaleString()}</div>
                                        <div className="text-primary-content/80">per month</div>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                {/* Posted By */}
                                <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-4">
                                        {tuition.studentName?.charAt(0) || 'S'}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">Posted by {tuition.studentName}</div>
                                        <div className="flex items-center text-gray-600 text-sm mt-1">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            Posted {new Date(tuition.createdAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <BookOpen className="w-5 h-5 mr-2" />
                                            <span className="font-medium">Subject</span>
                                        </div>
                                        <p className="text-xl font-semibold text-gray-800">{tuition.subject}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Award className="w-5 h-5 mr-2" />
                                            <span className="font-medium">Class/Grade</span>
                                        </div>
                                        <p className="text-xl font-semibold text-gray-800">Class {tuition.classGrade}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <span className="font-medium">Location</span>
                                        </div>
                                        <p className="text-xl font-semibold text-gray-800">{tuition.location}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <DollarSign className="w-5 h-5 mr-2" />
                                            <span className="font-medium">Monthly Salary</span>
                                        </div>
                                        <p className="text-xl font-semibold text-primary">৳{tuition.salary?.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Description
                                    </h3>
                                    <div className="prose max-w-none text-gray-700">
                                        {tuition.description ? (
                                            <p className="whitespace-pre-line">{tuition.description}</p>
                                        ) : (
                                            <p className="text-gray-500 italic">No description provided.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <div className="pt-6 border-t">
                                    {role === 'tutor' ? (
                                        tuition.status === 'approved' ? (
                                            <button
                                                onClick={() => setShowApplyModal(true)}
                                                className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold 
                                                rounded-xl hover:bg-primary-dark transition-all duration-300 hover:scale-105 
                                                active:scale-95 shadow-lg hover:shadow-xl"
                                            >
                                                Apply for This Tuition
                                            </button>
                                        ) : tuition.status === 'booked' ? (
                                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                                                <div className="flex items-center justify-center text-blue-700 mb-2">
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">This tuition has been booked</span>
                                                </div>
                                                <p className="text-blue-600 text-sm">This position is no longer available</p>
                                            </div>
                                        ) : (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                                                <div className="flex items-center justify-center text-yellow-700 mb-2">
                                                    <Clock className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Awaiting approval</span>
                                                </div>
                                                <p className="text-yellow-600 text-sm">This tuition is pending admin approval</p>
                                            </div>
                                        )
                                    ) : !user ? (
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-4">Login as a tutor to apply for this tuition</p>
                                            <button
                                                onClick={() => navigate('/login', { state: { from: `/tuition/${id}` } })}
                                                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
                                            >
                                                Login to Apply
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                                            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Tutors Only</h4>
                                            <p className="text-gray-600 mb-4">Only registered tutors can apply for tuition posts</p>
                                            <button
                                                onClick={() => navigate('/dashboard/profile')}
                                                className="px-6 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                                            >
                                                Update Your Profile
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Facts</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-gray-600">Status</span>
                                    <span className={`font-semibold ${tuition.status === 'approved' ? 'text-green-600' : tuition.status === 'booked' ? 'text-blue-600' : 'text-yellow-600'}`}>
                                        {tuition.status?.charAt(0).toUpperCase() + tuition.status?.slice(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-gray-600">Salary</span>
                                    <span className="font-semibold text-primary">৳{tuition.salary?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-gray-600">Class Level</span>
                                    <span className="font-semibold">Class {tuition.classGrade}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Location</span>
                                    <span className="font-semibold">{tuition.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Similar Tuitions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Similar Tuitions</h3>
                            <p className="text-gray-600 text-sm mb-4">Other opportunities you might be interested in</p>
                            <div className="space-y-4">
                                {/* You would fetch and map similar tuitions here */}
                                <p className="text-gray-500 text-center py-4">No similar tuitions available at the moment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Apply for Tuition</h3>
                                <button
                                    onClick={() => setShowApplyModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleApply} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Qualifications
                                        </label>
                                        <textarea
                                            name="qualifications"
                                            value={formData.qualifications}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., BSc in Mathematics, TEFL Certified, 5 years teaching experience"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            rows="3"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Briefly describe your qualifications and certifications</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teaching Experience
                                        </label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., 3 years of private tutoring experience"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Expected Salary (৳ per month)
                                        </label>
                                        <input
                                            type="number"
                                            name="expectedSalary"
                                            value={formData.expectedSalary}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Tuition budget: ৳{tuition.salary?.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowApplyModal(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                        disabled={applying}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={applying}
                                        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {applying ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default TuitionDetails;