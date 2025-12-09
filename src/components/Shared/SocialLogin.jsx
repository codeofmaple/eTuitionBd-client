import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            // Default role "Student"
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: 'Student',
                phone: 'N/A'
            };

            // Save user to MongoDB
            await axios.post('http://localhost:5000/users', userInfo);

            toast.success('Login Successful!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
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