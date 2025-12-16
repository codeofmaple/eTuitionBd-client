/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { User, Mail, Smartphone, Upload } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const RolePill = ({ role = '' }) => {
    const map = {
        student: 'text-green-700 bg-green-100',
        tutor: 'text-indigo-700 bg-indigo-100',
        admin: 'text-red-700 bg-red-100',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[role] || 'text-gray-600 bg-gray-100'}`}>
            {role ? role.toUpperCase() : 'USER'}
        </span>
    );
};

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useSecureAxios();
    const queryClient = useQueryClient();
    const firstRef = useRef(null);


    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => (await axiosSecure.get(`/users/${user.email}`)).data,
        staleTime: 60_000,
    });

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    useEffect(() => {
        if (userData && userData._id) {
            reset({
                name: userData.name || user?.displayName || '',
                photo: userData.photo || user?.photoURL || '',
                phone: userData.phone && userData.phone !== 'N/A' ? userData.phone : '',
            });
            setTimeout(() => firstRef.current?.focus?.(), 60);
        }
    }, [userData, reset, user]);

    const upd = useMutation({
        mutationFn: async (payload) => axiosSecure.patch(`/users/${userData._id}`, payload),
        onSuccess: (res) => {
            toast.success('Profile updated');
            queryClient.invalidateQueries(['userProfile', user?.email]);
            const updatedUser = res?.data?.updatedUser;
            if (updatedUser) updateUserProfile(updatedUser.name, updatedUser.photo).catch(() => { });
        },
        onError: () => toast.error('Update failed'),
    });

    const onSubmit = (vals) => upd.mutate({ name: vals.name, photo: vals.photo, phone: vals.phone });

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <title>Profile - eTuitionBd</title>
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
            >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                        <img
                            src={userData.photo || user?.photoURL || 'https://i.ibb.co/tM85b03/user-placeholder.png'}
                            alt="avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = 'https://i.ibb.co/tM85b03/user-placeholder.png')}
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-800">{userData.name || user?.displayName || 'Unnamed'}</h2>
                        <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                            <RolePill role={userData.role} />
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <Mail size={14} /> <span>{userData.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block flex items-center gap-2">
                            <User size={16} /> Full name
                        </label>
                        <input
                            {...register('name')}
                            ref={(e) => {
                                register('name').ref(e);
                                firstRef.current = e;
                            }}
                            className="input input-bordered w-full"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-1  flex items-center gap-2">
                            <Upload size={16} /> Photo URL
                        </label>
                        <input {...register('photo')} className="input input-bordered w-full" placeholder="https://..." />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-1  flex items-center gap-2">
                            <Smartphone size={16} /> Phone
                        </label>
                        <input {...register('phone')} className="input input-bordered w-full" placeholder="+880..." />
                    </div>

                    <div className="mt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting || upd.isLoading}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition"
                        >
                            {upd.isLoading ? <span className="loading loading-spinner" /> : 'Save changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
