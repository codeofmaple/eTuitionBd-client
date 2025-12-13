// Profile.jsx

import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Mail, Smartphone, Upload, Briefcase } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useSecureAxios();
    const queryClient = useQueryClient();
    // 1. Fetch user profile data
    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        staleTime: 60000 // Data is relatively static
    });

    // 2. Initialize form with fetched data
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userData && userData._id) {
            // Reset form with fetched data
            reset({
                name: userData.name || '',
                photo: userData.photo || user.photoURL || '',
                phone: userData.phone === 'N/A' ? '' : userData.phone || '', // Clear 'N/A' for editing
            });
        }
    }, [userData, reset, user.photoURL]);


    // 3. Mutation for updating profile
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            const id = userData._id;
            // Send only the fields we want to update
            return axiosSecure.patch(`/users/${id}`, {
                name: data.name,
                photo: data.photo,
                phone: data.phone
            });
        },
        onSuccess: (res) => {
            toast.success("Profile updated successfully!");
            queryClient.invalidateQueries(['userProfile', user?.email]);

            const updatedUser = res?.data?.updatedUser;

            if (updatedUser) {
                updateUserProfile(updatedUser.name, updatedUser.photo)
                    .catch(() => { });
            }
        },
        onError: () => {
            toast.error("Failed to update profile.");
        }
    });

    // 4. Handle Form Submission
    const onSubmit = (data) => {
        updateMutation.mutate(data);
    };

    if (isLoading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    const roleColor = {
        'student': 'text-green-600 bg-green-100',
        'tutor': 'text-indigo-600 bg-indigo-100',
        'admin': 'text-red-600 bg-red-100',
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : 'User'} Profile Settings
            </h2>

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 max-w-3xl mx-auto">

                {/* Profile Photo and Role Display */}
                <div className="flex flex-col items-center mb-6 border-b pb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                        <img
                            src={userData.photo || user.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-2xl font-semibold mt-4 text-gray-800">{userData.name || user.displayName}</p>
                    <span className={`px-3 py-1 mt-2 rounded-full text-xs font-semibold uppercase ${roleColor[userData.role] || 'text-gray-500 bg-gray-100'}`}>
                        {userData.role}
                    </span>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                        <Mail size={14} /> {userData.email}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Name Field */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text flex items-center gap-2"><User size={16} /> Full Name</span></div>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                        />
                    </label>

                    {/* Photo URL Field */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text flex items-center gap-2"><Upload size={16} /> Photo URL</span></div>
                        <input
                            type="url"
                            {...register("photo")}
                            placeholder="Link to your profile picture (optional)"
                            className="input input-bordered w-full"
                        />
                    </label>

                    {/* Phone Number Field */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text flex items-center gap-2"><Smartphone size={16} /> Phone Number</span></div>
                        <input
                            type="tel"
                            {...register("phone")}
                            placeholder="Phone Number (optional)"
                            className="input input-bordered w-full"
                        />
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={updateMutation.isLoading}
                        className="btn btn-lg w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none mt-8"
                    >
                        {updateMutation.isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;