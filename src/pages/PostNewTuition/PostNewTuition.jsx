import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, DollarSign, Layers, FileText, Send, User, Mail, Type } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

// Animation for container
const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 15,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const PostNewTuition = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const tuitionData = {
                ...data,
                studentName: user?.displayName,
                studentEmail: user?.email,
                status: 'pending',
                isBooked: false,
                createdAt: new Date().toISOString(),
                salary: Number(data.salary)
            };

            await axiosSecure.post('/tuitions', tuitionData);

            toast.success("Tuition requirement posted successfully! Pending Admin approval.");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to post tuition. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <title>Post New Tuition - eTuitionBd</title>
            <motion.div
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        Post a New <span className="text-indigo-600">Tuition</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Fill in the details below to find the perfect tutor for your needs.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    {/* Decorative Top Bar */}
                    <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>

                    <div className="p-8 sm:p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* --- Section 1: User Info (Read Only) --- */}
                            <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 mb-8">
                                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Student Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-gray-600">Name</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={user?.displayName || ''}
                                                readOnly
                                                className="input input-bordered w-full pl-10 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none border-gray-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium text-gray-600">Email</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={user?.email || ''}
                                                readOnly
                                                className="input input-bordered w-full pl-10 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none border-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- Section 2: Tuition Details --- */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-emerald-600" /> Tuition Details
                                </h3>

                                {/* Title */}
                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-700">Tuition Title / Headline</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Type className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="e.g. Need Math Tutor for Class 10 near Dhanmondi"
                                            className={`input input-bordered w-full pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.title ? 'input-error' : ''}`}
                                            {...register("title", { required: "Title is required" })}
                                        />
                                    </div>
                                    {errors.title && <span className="text-red-500 text-xs mt-1 ml-1">{errors.title.message}</span>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Subject */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Subject</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <BookOpen className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                className={`select select-bordered w-full pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.subject ? 'select-error' : ''}`}
                                                {...register("subject", { required: "Subject is required" })}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select Subject</option>
                                                <option value="Mathematics">Mathematics</option>
                                                <option value="English">English</option>
                                                <option value="Physics">Physics</option>
                                                <option value="Chemistry">Chemistry</option>
                                                <option value="Biology">Biology</option>
                                                <option value="Bangla">Bangla</option>
                                                <option value="ICT">ICT</option>
                                                <option value="Higher Math">Higher Math</option>
                                                <option value="General Science">General Science</option>
                                            </select>
                                        </div>
                                        {errors.subject && <span className="text-red-500 text-xs mt-1 ml-1">{errors.subject.message}</span>}
                                    </div>

                                    {/* Class/Grade */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Class / Grade</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Layers className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                className={`select select-bordered w-full pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.classGrade ? 'select-error' : ''}`}
                                                {...register("classGrade", { required: "Class is required" })}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select Class</option>
                                                <option value="Class 5">Class 5</option>
                                                <option value="Class 6">Class 6</option>
                                                <option value="Class 7">Class 7</option>
                                                <option value="Class 8">Class 8</option>
                                                <option value="Class 9">Class 9</option>
                                                <option value="Class 10">Class 10</option>
                                                <option value="HSC 1st Year">HSC 1st Year</option>
                                                <option value="HSC 2nd Year">HSC 2nd Year</option>
                                            </select>
                                        </div>
                                        {errors.classGrade && <span className="text-red-500 text-xs mt-1 ml-1">{errors.classGrade.message}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Salary/Budget */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Budget / Salary (BDT)</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSign className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="e.g. 5000"
                                                className={`input input-bordered w-full pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.salary ? 'input-error' : ''}`}
                                                {...register("salary", {
                                                    required: "Salary is required",
                                                    min: { value: 1000, message: "Minimum salary is 1000" }
                                                })}
                                            />
                                        </div>
                                        {errors.salary && <span className="text-red-500 text-xs mt-1 ml-1">{errors.salary.message}</span>}
                                    </div>

                                    {/* Location */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-700">Location</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="e.g. Uttara, Sector 4, Dhaka"
                                                className={`input input-bordered w-full pl-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.location ? 'input-error' : ''}`}
                                                {...register("location", { required: "Location is required" })}
                                            />
                                        </div>
                                        {errors.location && <span className="text-red-500 text-xs mt-1 ml-1">{errors.location.message}</span>}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="form-control mb-8">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-700">Detailed Description / Requirements</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            className={`textarea textarea-bordered w-full pl-10 h-32 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-normal ${errors.description ? 'textarea-error' : ''}`}
                                            placeholder="Describe your requirements (e.g. prefer female tutor, 3 days a week, evening shift...)"
                                            {...register("description", {
                                                required: "Description is required",
                                                minLength: { value: 20, message: "Please provide more details (min 20 chars)" }
                                            })}
                                        ></textarea>
                                    </div>
                                    {errors.description && <span className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</span>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="w-full btn btn-lg bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 text-lg font-bold transition-all duration-300 transform hover:scale-[1.01]"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="w-5 h-5" />
                                Post Tuition Requirement
                            </motion.button>

                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PostNewTuition;