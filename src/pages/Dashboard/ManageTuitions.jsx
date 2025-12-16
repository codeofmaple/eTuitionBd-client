/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const statusColor = (s = 'pending') =>
    s === 'approved' ? 'bg-emerald-600 text-white' : s === 'rejected' ? 'bg-red-500 text-white' : 'bg-indigo-100 text-indigo-700';

const ManageTuitions = () => {
    const axios = useAxiosSecure();
    const qc = useQueryClient();
    const [filter, setFilter] = useState('');
    const [q, setQ] = useState('');

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ['all-tuitions', filter],
        queryFn: async () => (await axios.get(`/tuitions/all/all?status=${filter}`)).data || [],
        keepPreviousData: true,
        staleTime: 60_000,
    });

    const mutate = useMutation({
        mutationFn: ({ id, status }) => axios.patch(`/tuitions/status/${id}`, { status }),
        onSuccess: () => {
            toast.success('Status updated');
            qc.invalidateQueries({ queryKey: ['all-tuitions'] });
        },
        onError: () => toast.error('Update failed'),
    });

    const confirmAndChange = (item, newStatus) => {
        Swal.fire({
            title: `Mark as ${newStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: newStatus === 'approved' ? '#059669' : '#DC2626',
            confirmButtonText: 'Confirm',
        }).then((r) => r.isConfirmed && mutate.mutate({ id: item._id, status: newStatus }));
    };

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return tuitions;
        return tuitions.filter((t) =>
            (t.subject || '').toLowerCase().includes(term) ||
            (t.location || '').toLowerCase().includes(term) ||
            (t.studentEmail || '').toLowerCase().includes(term)
        );
    }, [tuitions, q]);

    return (
        <div className=" min-h-screen">
            <title>Manage Tuitions - eTuitionBd</title>
            <div className="space-y-4">
                {/* header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold text-gray-800 ">Tuition Requests</h1>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-80">
                            <FaSearch className="text-gray-400 mr-2" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search subject, location or email..."
                                className="outline-none text-sm w-full"
                            />
                        </div>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="ml-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* TABLE - desktop */}
                <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-indigo-50 text-sm text-gray-600">
                            <tr>
                                <th className="p-3 text-left w-12">#</th>
                                <th className="p-3 text-left">Tuition</th>
                                <th className="p-3 text-left w-40">Location</th>
                                <th className="p-3 text-left w-36">Salary / By</th>
                                <th className="p-3 text-left w-32">Status</th>
                                <th className="p-3 text-center w-36">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm">
                            {isLoading ? (
                                <tr><td colSpan={6} className="p-6 text-center"><span className="loading loading-spinner text-indigo-600" /> Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="p-6 text-center text-gray-500">No requests found.</td></tr>
                            ) : filtered.map((t, i) => (
                                <motion.tr key={t._id} whileHover={{ backgroundColor: 'rgba(99,102,241,0.03)' }}>
                                    <td className="p-3 align-top">{i + 1}</td>

                                    <td className="p-3">
                                        <div className="font-medium text-gray-800">{t.subject}</div>
                                        <div className="text-xs text-gray-400 mt-1">{t.classGrade}</div>
                                    </td>

                                    <td className="p-3 align-top text-sm">{t.location || '—'}</td>

                                    <td className="p-3">
                                        <div className="font-semibold text-emerald-600">৳{t.salary}</div>
                                        <div className="text-xs text-gray-400 mt-1">{t.studentEmail}</div>
                                    </td>

                                    <td className="p-3">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusColor(t.status)}`}>
                                            {t.status || 'pending'}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <div className="inline-flex gap-2">
                                            <button
                                                onClick={() => confirmAndChange(t, 'approved')}
                                                disabled={(t.status || 'pending') === 'approved' || mutate.isLoading}
                                                className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm disabled:opacity-50"
                                                aria-label="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => confirmAndChange(t, 'rejected')}
                                                disabled={(t.status || 'pending') === 'rejected' || mutate.isLoading}
                                                className="px-3 py-1 rounded-md bg-red-500 text-white text-sm disabled:opacity-50"
                                                aria-label="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* CARDS - tablet & mobile */}
                <div className="lg:hidden space-y-3">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 bg-white rounded-xl border animate-pulse" />)
                    ) : filtered.length === 0 ? (
                        <div className="p-6 bg-white rounded-xl text-center text-gray-500">No requests</div>
                    ) : filtered.map((t) => (
                        <motion.article
                            key={t._id}
                            className="bg-white rounded-xl p-4 border shadow-sm"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -6 }}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-800 truncate">{t.subject}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${statusColor(t.status)}`}>{t.status || 'pending'}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{t.classGrade} • {t.location || '—'}</div>
                                    <div className="mt-3 text-sm text-emerald-600 font-semibold">৳{t.salary}</div>
                                    <div className="text-xs text-gray-400 mt-1">By: {t.studentEmail}</div>
                                </div>

                                <div className="flex flex-col items-center gap-2 ml-3">
                                    <button
                                        onClick={() => confirmAndChange(t, 'approved')}
                                        disabled={(t.status || 'pending') === 'approved' || mutate.isLoading}
                                        className="w-10 h-10 rounded-md bg-emerald-600 text-white grid place-items-center disabled:opacity-50"
                                        aria-label="Approve"
                                    >
                                        <FaCheck />
                                    </button>

                                    <button
                                        onClick={() => confirmAndChange(t, 'rejected')}
                                        disabled={(t.status || 'pending') === 'rejected' || mutate.isLoading}
                                        className="w-10 h-10 rounded-md bg-red-500 text-white grid place-items-center disabled:opacity-50"
                                        aria-label="Reject"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageTuitions;
