import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/Shared/SocialLogin";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await signIn(data.email, data.password);

            toast.success("Welcome back! Login Successful.");
            navigate(from, { replace: true });
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Invalid email or password. Please try again.");
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
        <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-emerald-100 flex items-center justify-center px-4 py-12">

            {/* Glass Card */}
            <div className="
                w-full max-w-md p-8 sm:p-10 rounded-3xl 
                backdrop-blur-xl bg-white/70 
                border border-white/40 
                shadow-xl
            ">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Login to access your dashboard and tuitions.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            className={inputClass}
                            placeholder=" "
                            {...register("email", { required: true })}
                        />
                        <label className={labelClass}>Email Address</label>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">Email is required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={inputClass}
                            placeholder=" "
                            {...register("password", { required: true })}
                        />
                        <label className={labelClass}>Password</label>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="
                                absolute right-4 top-4 text-gray-500 
                                hover:text-indigo-600 transition-all
                            "
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                        <div className="text-right mt-1">
                            <a className="text-sm text-indigo-600 hover:underline font-medium" href="#">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full py-3.5  rounded-xl bg-indigo-600 text-white font-semibold 
                            hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg
                            active:scale-[0.98]  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                        `}
                    >
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </button>

                    <p className="text-center text-sm text-gray-600 pt-2">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 hover:underline font-semibold"
                        >
                            Create an account
                        </Link>
                    </p>
                </form>

                {/* Social Login */}
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;