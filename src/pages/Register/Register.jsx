import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import SocialLogin from "../../components/Shared/SocialLogin";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axios = useAxios();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Create User
            await createUser(data.email, data.password);

            // Update Profile
            await updateUserProfile(data.name, data.photoUrl);

            // data for MongoDB 
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photoUrl,
                phone: data.phone,
                role: data.role,
            };

            // 4. Save to Database
            const dbResponse = await axios.post("/users", userInfo);

            if (dbResponse.data.insertedId) {
                reset();
                toast.success("Account created successfully! Welcome to eTuitionBd.");
                navigate("/", { replace: true });
            }
        } catch (error) {
            const errorMessage = error.message.includes("email-already-in-use")
                ? "This email is already registered."
                : "Registration failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Common input class
    const inputClass = `
  peer w-full px-4 py-4 rounded-xl
  bg-gray-100/50
  border border-gray-300
  focus:border-indigo-500
  focus:ring-4 focus:ring-indigo-200/40
  outline-none transition-all
  text-gray-800
`;
    // Common label class
    const labelClass = `
  absolute left-3 -top-2.5 px-2
  text-xs text-indigo-600 font-medium
  bg-white/90 backdrop-blur-sm
  transition-all duration-200 ease-out
  pointer-events-none z-20 rounded
  peer-placeholder-shown:top-3.5
  peer-placeholder-shown:text-base
  peer-placeholder-shown:text-gray-500
  peer-focus:-top-2.5
  peer-focus:text-xs
  peer-focus:text-indigo-600
`;

    return (
        <div className="min-h-screen
         flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT — Text Section */}
                <div className="space-y-4 text-center lg:text-left hidden lg:block">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-700 tracking-tight leading-snug">
                        Start Your Learning <br />
                        <span className="text-emerald-600">Journey Today.</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0 pt-2">
                        Join eTuitionBd to find verified tutors, trusted students, and a smart
                        learning ecosystem tailored for your growth.
                    </p>
                </div>

                {/* RIGHT — Glass Form */}
                <div
                    className="
                        backdrop-blur-xl bg-white/70 border border-white/40 
                        rounded-3xl shadow-xl 
                        p-8 sm:p-10 w-full max-w-md mx-auto
                    "
                >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 lg:hidden">
                        Create Account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Name */}
                        <div className="relative">
                            <input type="text" placeholder=" " className={inputClass} {...register("name", { required: true })} />
                            <label className={labelClass}>Full Name</label>
                            {errors.name && <p className="text-red-500 text-xs mt-1">Full Name is required</p>}
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input type="email" placeholder=" " className={inputClass} {...register("email", { required: true })} />
                            <label className={labelClass}>Email Address</label>
                            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
                        </div>

                        {/* Photo URL */}
                        <div className="relative">
                            <input type="url" placeholder=" " className={inputClass} {...register("photoUrl", { required: true })} />
                            <label className={labelClass}>Profile Photo URL</label>
                            {errors.photoUrl && <p className="text-red-500 text-xs mt-1">Photo URL is required</p>}
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <input type="tel" placeholder=" " className={inputClass} {...register("phone", { required: true, pattern: /^(\+880|0)\d{10}$/ })} />
                            <label className={labelClass}>Phone Number (+880 or 0)</label>
                            {errors.phone?.type === 'required' && <p className="text-red-500 text-xs mt-1">Phone Number is required</p>}
                            {errors.phone?.type === 'pattern' && <p className="text-red-500 text-xs mt-1">Invalid phone format (e.g., +88017...)</p>}
                        </div>

                        {/* Role*/}
                        <div className="relative">
                            <select
                                className={`${inputClass} appearance-none cursor-pointer`}
                                defaultValue=""
                                {...register("role", { required: true })}
                            >
                                <option value="" disabled hidden>Select your role...</option>
                                <option value="Student">I am a Student</option>
                                <option value="Tutor">I want to be a Tutor</option>
                            </select>
                            <label className={`${labelClass} bg-transparent`}>Select Role</label>
                            <span className="absolute right-4 top-4 text-gray-500 pointer-events-none transition">
                                <FaEyeSlash />
                            </span>
                            {errors.role && <p className="text-red-500 text-xs mt-1">Role selection is required</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder=" "
                                className={inputClass}
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                            />
                            <label className={labelClass}>Password</label>

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-gray-500 hover:text-indigo-600 transition"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                            {/* Password Error Messages */}
                            {errors.password?.type === "required" && (<p className="text-red-500 text-xs mt-1">Password is required</p>)}
                            {errors.password?.type === "minLength" && (<p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>)}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password must include: uppercase, lowercase, number & special character.
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold 
                                hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg 
                                active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Register'}
                        </button>

                        <p className="text-center text-sm text-gray-600 pt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
                                Login
                            </Link>
                        </p>
                    </form>

                    {/* Social Login */}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;