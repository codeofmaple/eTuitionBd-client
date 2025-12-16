import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useSecureAxios from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['my-payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/my-payments/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            <title>Payment History - eTuitionBd</title>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h2>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Head */}
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="py-4">#</th>
                                <th>Transaction ID</th>
                                <th>Tutor Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {/* Body */}
                        <tbody className="text-gray-700">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No payment history found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-indigo-50 transition-colors">
                                        <th>{index + 1}</th>
                                        <td className="font-mono text-xs">{payment.transactionId}</td>
                                        <td className="font-medium">{payment.tutorName}</td>
                                        <td className="font-bold text-indigo-600">৳{payment.amount}</td>
                                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                                        <td>
                                            <span className="badge badge-success text-white">
                                                {payment.status || 'Paid'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;