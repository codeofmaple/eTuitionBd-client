/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaWallet } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const fmt = (n) => (n == null ? '—' : n.toLocaleString());
const cur = (n) => (n == null ? '—' : `৳${Number(n).toLocaleString()}`);
const dateShort = (d) => (d ? new Date(d).toLocaleDateString() : '—');

const RevenueHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['tutor-payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/tutor/${user.email}`);
            return res.data || [];
        },
        staleTime: 1000 * 60 * 2,
    });

    const total = useMemo(() => payments.reduce((s, p) => s + Number(p.amount || 0), 0), [payments]);

    return (
        <div className="min-h-screen">
            <title>Revenue History - eTuitionBd</title>
            <div className="space-y-6">
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Revenue History</h2>
                        <p className="mt-1 text-sm text-gray-500">All received payments - recent first.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="text-xs text-gray-500">Total</div>
                            <div className="text-lg font-semibold text-emerald-600">{cur(total)}</div>
                            <div className="text-xs text-gray-400 mt-1">{fmt(payments.length)} payments</div>
                        </div>
                        <div className="hidden md:block text-sm text-gray-500">
                            <div className="flex items-center gap-2"><FaWallet /> <span>Live</span></div>
                        </div>
                    </div>
                </header>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-xs text-gray-500">
                            <tr>
                                <th className="p-4 text-left w-12">#</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Student</th>
                                <th className="p-4 text-left">Txn ID</th>
                                <th className="p-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading
                                ? Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse border-t">
                                        <td className="p-4"><div className="h-3 w-6 bg-gray-200 rounded" /></td>
                                        <td className="p-4"><div className="h-3 w-24 bg-gray-200 rounded" /></td>
                                        <td className="p-4"><div className="h-3 w-36 bg-gray-200 rounded" /></td>
                                        <td className="p-4"><div className="h-3 w-40 bg-gray-200 rounded" /></td>
                                        <td className="p-4 text-right"><div className="h-3 w-20 bg-gray-200 rounded inline-block" /></td>
                                    </tr>
                                ))
                                : payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No revenue history yet.</td>
                                    </tr>
                                ) : (
                                    payments
                                        .slice()
                                        .reverse()
                                        .map((p, i) => (
                                            <tr key={p._id} className="border-t hover:bg-gray-50">
                                                <td className="p-4 text-sm text-gray-600">{payments.length - i}</td>
                                                <td className="p-4 text-sm">{dateShort(p.date)}</td>
                                                <td className="p-4 text-sm">{p.studentEmail ?? '—'}</td>
                                                <td className="p-4 text-sm font-mono">{p.transactionId || p._id}</td>
                                                <td className="p-4 text-right text-sm font-semibold text-emerald-600">+ {cur(p.amount)}</td>
                                            </tr>
                                        ))
                                )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 bg-white rounded-xl shadow-sm animate-pulse" />)
                        : payments.length === 0
                            ? (
                                <div className="py-12 text-center text-gray-500">
                                    <div className="mx-auto mb-4 w-40 h-24 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                        <FaCalendarAlt />
                                    </div>
                                    <div>No revenue yet.</div>
                                </div>
                            ) : (
                                payments.slice().reverse().map((p) => (
                                    <motion.article
                                        key={p._id}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                    <FaCalendarAlt />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-800">{dateShort(p.date)}</div>
                                                    <div className="text-xs text-gray-500">{p.studentEmail ?? '—'}</div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-emerald-600">+ {cur(p.amount)}</div>
                                                <div className="text-xs font-mono text-gray-400 truncate max-w-32">{p.transactionId || p._id}</div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))
                            )}
                </div>
            </div>
        </div>
    );
};

export default RevenueHistory;
