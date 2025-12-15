import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();
    const queryClient = useQueryClient();

    // modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    // react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            salary: '',
            experience: '',
            qualifications: '',
        },
    });

    // getting tutors applications
    const {
        data: applications = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['my-applications', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/my-applications/${user.email}`);
            return res.data;
        },
        staleTime: 1000 * 60 * 2,
    });

    // Delete 
    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/applications/${id}`),
        onSuccess: () => {
            toast.success('Application cancelled');
            queryClient.invalidateQueries(['my-applications', user?.email]);
        },
        onError: () => toast.error('Failed to cancel application'),
    });

    // Update 
    const updateMutation = useMutation({
        mutationFn: async ({ id, payload }) =>
            axiosSecure.patch(`/applications/update-request/${id}`, payload),
        onSuccess: () => {
            toast.success('Application updated');
            queryClient.invalidateQueries(['my-applications', user?.email]);
            setIsModalOpen(false);
            setSelectedApp(null);
        },
        onError: () => toast.error('Failed to update application'),
    });

    // open edit modal and edit
    const handleEditClick = (app) => {
        setSelectedApp(app);
        reset({
            salary: app.salary ?? app.expectedSalary ?? '',
            experience: app.experience ?? '',
            qualifications: app.qualifications ?? '',
        });
        setIsModalOpen(true);
    };

    // deleting with confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Cancel application?',
            text: "You won't be able to revert this.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, cancel it',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    // on submiting update
    const onSubmit = async (values) => {
        if (!selectedApp?._id) return;
        const payload = {
            salary: values.salary,
            experience: values.experience,
            qualifications: values.qualifications,
        };
        await updateMutation.mutateAsync({ id: selectedApp._id, payload });
    };

    // close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApp(null);
    };

    // sync form
    useEffect(() => {
        if (selectedApp) {
            reset({
                salary: selectedApp.salary ?? selectedApp.expectedSalary ?? '',
                experience: selectedApp.experience ?? '',
                qualifications: selectedApp.qualifications ?? '',
            });
        }
    }, [selectedApp, reset]);

    return (
        <div className="bg-base-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">My Applications</h2>

            {/* Desktop Table*/}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-base-200 shadow-sm bg-white">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-xs text-gray-500">#</th>
                            <th className="text-xs text-gray-500">Tuition</th>
                            <th className="text-xs text-gray-500">Offer</th>
                            <th className="text-xs text-gray-500">Status</th>
                            <th className="text-xs text-gray-500">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            // skeleton while loading
                            Array.from({ length: 4 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td><div className="h-3 w-4 bg-gray-200 rounded" /></td>
                                    <td><div className="h-3 w-36 bg-gray-200 rounded" /></td>
                                    <td><div className="h-3 w-28 bg-gray-200 rounded" /></td>
                                    <td><div className="h-3 w-20 bg-gray-200 rounded" /></td>
                                    <td><div className="h-3 w-24 bg-gray-200 rounded" /></td>
                                </tr>
                            ))
                        ) : applications.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-6 text-gray-500">
                                    No applications found. Go to "Tuition Jobs" to apply!
                                </td>
                            </tr>
                        ) : (
                            applications.map((app, index) => (
                                <tr key={app._id} className="hover:bg-gray-50">
                                    <th className="text-sm">{index + 1}</th>

                                    <td>
                                        <div className="font-semibold text-sm">{app.tuitionDetails?.subject ?? '—'}</div>
                                        <div className="text-xs text-gray-500">Class: {app.tuitionDetails?.classGrade ?? '—'}</div>
                                        <div className="text-xs mt-1 inline-block px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px]">
                                            {app.tuitionDetails?.location ?? '—'}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="text-sm">
                                            Salary: <span className="font-medium text-emerald-600">৳{app.salary ?? app.expectedSalary ?? '—'}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 truncate max-w-40" title={app.experience}>
                                            Exp: {app.experience ?? '—'}
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className={`badge text-xs ${app.status === 'approved'
                                                ? 'badge-success text-white'
                                                : app.status === 'rejected'
                                                    ? 'badge-error text-white'
                                                    : 'badge-warning'
                                                }`}
                                        >
                                            {String(app.status ?? 'pending').replace(/^./, (s) => s.toUpperCase())}
                                        </span>
                                    </td>

                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(app)}
                                            disabled={app.status !== 'pending'}
                                            className="btn btn-sm btn-ghost btn-outline"
                                            title={app.status !== 'pending' ? 'Cannot edit a non-pending application' : 'Edit request'}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            disabled={app.status !== 'pending'}
                                            className="btn btn-sm btn-ghost btn-outline text-red-600"
                                            title={app.status !== 'pending' ? 'Cannot cancel a non-pending application' : 'Cancel request'}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards*/}
            <div className="md:hidden mt-4 space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-4 bg-white rounded-xl border animate-pulse space-y-3" />
                    ))
                ) : applications.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No applications found.</p>
                ) : (
                    applications.map((app, idx) => (
                        <motion.div
                            key={app._id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, delay: idx * 0.04 }}
                            className="bg-white rounded-xl border p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold text-base text-gray-800">{app.tuitionDetails?.subject ?? '—'}</h3>
                                    <p className="text-xs text-gray-500">Class: {app.tuitionDetails?.classGrade ?? '—'}</p>
                                    <div className="mt-2 inline-block px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px]">
                                        {app.tuitionDetails?.location ?? '—'}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-sm">
                                        <span className="font-medium text-emerald-600">৳{app.salary ?? app.expectedSalary ?? '—'}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Exp: {app.experience ?? '—'}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className={`badge text-xs ${app.status === 'approved' ? 'badge-success text-white' :
                                    app.status === 'rejected' ? 'badge-error text-white' : 'badge-warning'
                                    }`}>
                                    {String(app.status ?? 'pending').replace(/^./, s => s.toUpperCase())}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(app)}
                                        disabled={app.status !== 'pending'}
                                        className="btn btn-sm btn-outline"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(app._id)}
                                        disabled={app.status !== 'pending'}
                                        className="btn btn-sm btn-outline text-red-600"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedApp && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <motion.div
                        initial={{ y: 8, scale: 0.995 }}
                        animate={{ y: 0, scale: 1 }}
                        className="w-full max-w-2xl bg-white rounded-xl shadow-xl ring-1 ring-black/5 p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Edit Application</h3>
                            <button className="btn btn-ghost btn-sm" onClick={closeModal}>Close</button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="label text-sm">Expected Salary (৳)</label>
                                <input
                                    type="number"
                                    step="1"
                                    {...register('salary', { required: 'Salary is required', min: { value: 0, message: 'Invalid salary' } })}
                                    className="input input-bordered w-full"
                                />
                                {errors.salary && <p className="text-xs text-red-600 mt-1">{errors.salary.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm">Experience</label>
                                <textarea
                                    {...register('experience', { required: 'Experience is required', minLength: { value: 6, message: 'Write 6+ chars' } })}
                                    className="textarea textarea-bordered w-full h-28"
                                />
                                {errors.experience && <p className="text-xs text-red-600 mt-1">{errors.experience.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm">Qualifications</label>
                                <input
                                    type="text"
                                    {...register('qualifications', { required: 'Qualifications required' })}
                                    className="input input-bordered w-full"
                                />
                                {errors.qualifications && <p className="text-xs text-red-600 mt-1">{errors.qualifications.message}</p>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                                <button
                                    type="submit"
                                    className="btn bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={isSubmitting || updateMutation.isLoading}
                                >
                                    {updateMutation.isLoading ? 'Updating...' : 'Update Request'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default MyApplications;
