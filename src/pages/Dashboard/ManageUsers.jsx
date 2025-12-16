/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEdit, FaSearch } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import { FaUserShield, FaGraduationCap } from 'react-icons/fa';
import useSecureAxios from '../../hooks/useAxiosSecure';

const RolePill = ({ role = 'student' }) => {
    const map = {
        admin: 'bg-red-600 text-white',
        tutor: 'bg-indigo-600 text-white',
        student: 'bg-emerald-600 text-white',
    };
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${map[role] || map.student}`}>
            {role === 'admin' ? <FaUserShield /> : role === 'tutor' ? <FaGraduationCap /> : <PiStudentBold />} {role}
        </span>
    );
};

const ManageUsers = () => {
    const axios = useSecureAxios();
    const qc = useQueryClient();

    const [q, setQ] = useState('');
    const [selected, setSelected] = useState(null);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', q],
        queryFn: async () => (await axios.get(`/users?search=${encodeURIComponent(q || '')}`)).data || [],
        keepPreviousData: true,
        staleTime: 60_000,
    });

    const delMutation = useMutation({
        mutationFn: async (id) => axios.delete(`/users/${id}`),
        onSuccess: () => {
            toast.success('User removed');
            qc.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => toast.error('Delete failed'),
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, payload }) => axios.patch(`/users/admin/${id}`, payload),
        onSuccess: () => {
            toast.success('User updated');
            qc.invalidateQueries({ queryKey: ['users'] });
            setSelected(null);
        },
        onError: () => toast.error('Update failed'),
    });

    const { register, handleSubmit, reset, formState } = useForm();

    useEffect(() => {
        if (!selected) return;
        reset({
            name: selected.name || '',
            role: selected.role || 'student',
            phone: selected.phone || '',
        });
    }, [selected, reset]);

    const onDelete = (u) =>
        Swal.fire({
            title: `Delete ${u.name}?`,
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC2626',
            confirmButtonText: 'Delete',
        }).then((res) => {
            if (res.isConfirmed) delMutation.mutate(u._id);
        });

    const onUpdate = (vals) => {
        if (!selected) return;
        updateMutation.mutate({ id: selected._id, payload: vals });
    };

    const filtered = useMemo(() => users, [users]);

    return (
        <div className=" min-h-screen">
            <title>Manage Users - eTuitionBd</title>
            <div className=" space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Search, edit roles, or remove users.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-80">
                            <FaSearch className="text-gray-400 mr-2" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search name or email..."
                                className="outline-none text-sm w-full"
                                aria-label="Search users"
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-indigo-50 text-gray-600">
                            <tr>
                                <th className="p-3 text-left w-12">#</th>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">Contact</th>
                                <th className="p-3 text-left w-40">Role</th>
                                <th className="p-3 text-center w-36">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-6 text-center"><span className="loading loading-spinner text-indigo-600" /></td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="p-6 text-center text-gray-500">No users found</td></tr>
                            ) : (
                                filtered.map((u, i) => (
                                    <motion.tr key={u._id} whileHover={{ backgroundColor: 'rgba(99,102,241,0.02)' }}>
                                        <td className="p-3 align-top">{i + 1}</td>

                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={u.photoURL || u.photo || 'https://i.ibb.co/5GzXkwq/user.png'}
                                                    alt={u.name}
                                                    className="w-10 h-10 rounded-md object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <div className="font-medium text-gray-800 truncate">{u.name}</div>
                                                    <div className="text-xs text-gray-400">ID: {String(u._id).slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3">
                                            <div className="text-sm">{u.email}</div>
                                            {u.phone && <div className="text-xs text-gray-500 mt-1">{u.phone}</div>}
                                        </td>

                                        <td className="p-3">
                                            <RolePill role={u.role} />
                                        </td>

                                        <td className="p-3 text-center">
                                            <div className="inline-flex gap-2">
                                                <button
                                                    onClick={() => setSelected(u)}
                                                    className="p-2 rounded-md hover:bg-indigo-50 text-indigo-600"
                                                    aria-label="Edit user"
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    onClick={() => onDelete(u)}
                                                    className="p-2 rounded-md hover:bg-red-50 text-red-500"
                                                    aria-label="Delete user"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 bg-white rounded-xl animate-pulse" />)
                    ) : filtered.length === 0 ? (
                        <div className="p-6 bg-white rounded-xl text-center text-gray-500">No users</div>
                    ) : (
                        filtered.map((u, i) => (
                            <motion.article key={u._id} className="bg-white rounded-xl p-4 border shadow-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <img src={u.photoURL || u.photo || 'https://i.ibb.co/5GzXkwq/user.png'} alt={u.name} className="w-12 h-12 rounded-md object-cover" />
                                            <div className="min-w-0">
                                                <div className="font-medium text-gray-800 truncate">{u.name}</div>
                                                <div className="text-xs text-gray-500">{u.email}</div>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <RolePill role={u.role} />
                                            <div className="flex gap-2">
                                                <button onClick={() => setSelected(u)} className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 grid place-items-center">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => onDelete(u)} className="w-9 h-9 rounded-md bg-red-50 text-red-500 grid place-items-center">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))
                    )}
                </div>

                {/* Edit modal */}
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
                        <motion.div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit user</h3>
                            <p className="text-xs text-gray-500 mb-4">ID: {String(selected._id).slice(-8)}</p>

                            <form onSubmit={handleSubmit(onUpdate)} className="space-y-3">
                                <div>
                                    <label className="text-xs text-gray-600 block mb-1">Full name</label>
                                    <input {...register('name', { required: true })} defaultValue={selected.name} className="input input-bordered w-full" />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-600 block mb-1">Phone</label>
                                    <input {...register('phone')} defaultValue={selected.phone || ''} className="input input-bordered w-full" />
                                </div>

                                <div>
                                    <label className="text-xs text-gray-600 block mb-1">Role</label>
                                    <select {...register('role')} defaultValue={selected.role} className="select select-bordered w-full">
                                        <option value="student">Student</option>
                                        <option value="tutor">Tutor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-end gap-2 mt-4">
                                    <button type="button" onClick={() => setSelected(null)} className="btn btn-ghost">Cancel</button>
                                    <button type="submit" disabled={updateMutation?.isLoading} className="btn bg-emerald-600 text-white">
                                        {updateMutation?.isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
