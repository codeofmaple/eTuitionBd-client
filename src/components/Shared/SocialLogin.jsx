import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: 'Student',
                phone: 'N/A'
            };

            // push userInfo to MongoDB. If user exists, ignore error.
            try {
                await axios.post('/users', userInfo);
                toast.success('Registration Successful!');
            } catch (err) {
                if (err?.response?.status === 409) {
                    console.info('User already exists in DB — proceeding with login.');
                } else {
                    throw err;
                }
            }

            toast.success('Login Successful!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message || 'Google sign-in failed.');
        }
    };


    return (
        <div className="pt-4">
            <div className="divider text-sm text-gray-500">OR CONTINUE WITH</div>
            <button
                onClick={handleGoogleLogin}
                className="
                    w-full py-3.5 rounded-xl bg-white text-gray-700 font-medium 
                    border border-gray-300 hover:bg-gray-50 transition-all shadow-sm
                    flex items-center justify-center gap-3
                "
            >
                <FaGoogle className="text-xl text-red-500" />
                Google
            </button>
        </div>
    );
};

export default SocialLogin;