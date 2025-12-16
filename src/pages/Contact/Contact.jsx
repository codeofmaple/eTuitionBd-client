/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Send,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // console.log('Contact Form Submitted:', data);
        toast.success("Thank you for your message! We will get back to you shortly.");
        reset();
    };

    return (
        <div className="min-h-screen">
            <title>Contact - eTuitionBd</title>
            <div className="container mx-auto px-4 py-16 max-w-7xl">

                {/* Header Section */}
                <motion.header
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Get In Touch With <span className="text-indigo-600">eTuitionBd</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We are here to answer any questions you may have about our platform, services, or partnerships.
                    </p>
                </motion.header>

                {/* Contact Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Contact Information Cards*/}
                    <motion.div
                        className="lg:col-span-1 space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="card bg-white shadow-xl p-6 border-t-4 border-indigo-600">
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Our Office Location</h3>
                                    <p className="text-gray-500">123 TutorLink Avenue, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white shadow-xl p-6 border-t-4 border-indigo-600">
                            <div className="flex items-center space-x-4">
                                <Mail className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                                    <p className="text-gray-500">support@etuitionbd.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white shadow-xl p-6 border-t-4 border-indigo-600">
                            <div className="flex items-center space-x-4">
                                <Phone className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                                    <p className="text-gray-500">+880 123 456 7890</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="btn btn-circle bg-indigo-600 text-white hover:bg-indigo-700">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="btn btn-circle bg-indigo-600 text-white hover:bg-indigo-700">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="btn btn-circle bg-indigo-600 text-white hover:bg-indigo-700">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-2 bg-white p-8 md:p-12 shadow-2xl rounded-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us A Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Name and Email*/}
                            <div className="grid md:grid-cols-2 gap-6">
                                <label className="form-control w-full">
                                    <div className="label"><span className="label-text font-medium text-gray-700">Your Name</span></div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && <div className="label"><span className="label-text-alt text-error">{errors.name.message}</span></div>}
                                </label>

                                <label className="form-control w-full">
                                    <div className="label"><span className="label-text font-medium text-gray-700">Your Email</span></div>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                        {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                                    />
                                    {errors.email && <div className="label"><span className="label-text-alt text-error">Valid email is required</span></div>}
                                </label>
                            </div>

                            {/* Subject */}
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text font-medium text-gray-700">Subject</span></div>
                                <input
                                    type="text"
                                    placeholder="Inquiry about Tutor Application"
                                    className={`input input-bordered w-full ${errors.subject ? 'input-error' : ''}`}
                                    {...register("subject", { required: "Subject is required" })}
                                />
                                {errors.subject && <div className="label"><span className="label-text-alt text-error">{errors.subject.message}</span></div>}
                            </label>

                            {/* Message */}
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text font-medium text-gray-700">Your Message</span></div>
                                <textarea
                                    className={`textarea textarea-bordered h-32 w-full ${errors.message ? 'textarea-error' : ''}`}
                                    placeholder="Type your detailed message here..."
                                    {...register("message", { required: "Message is required" })}
                                ></textarea>
                                {errors.message && <div className="label"><span className="label-text-alt text-error">{errors.message.message}</span></div>}
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary bg-indigo-600 text-white hover:bg-indigo-700 w-full md:w-auto"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Contact;