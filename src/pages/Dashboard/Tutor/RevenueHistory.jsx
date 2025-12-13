import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const RevenueHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/payments/tutor/${user.email}`)
                .then(res => {
                    setPayments(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // Calculate total earnings
    const totalRevenue = payments.reduce((sum, item) => sum + Number(item.amount), 0);

    if (loading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Revenue History</h2>

            {/* Stats Card */}
            <div className="stats shadow mb-8 bg-base-100 border border-gray-200">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Total Earnings</div>
                    <div className="stat-value text-primary">৳{totalRevenue}</div>
                    <div className="stat-desc">From {payments.length} successful tuitions</div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Student Email</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                                    <td>{payment.studentEmail}</td>
                                    <td className="font-mono text-xs">{payment.transactionId || payment._id}</td>
                                    <td className="font-bold text-success">+ <span className='text-xl'>৳</span>{payment.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No revenue history available yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RevenueHistory;