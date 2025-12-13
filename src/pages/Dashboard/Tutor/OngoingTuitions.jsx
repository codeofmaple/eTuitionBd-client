import React, { useEffect, useState } from 'react';
import useSecureAxios from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const OngoingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();

    const [ongoing, setOngoing] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/applications/my-applications/${user.email}`)
                .then(res => {
                    const filtered = res.data.filter(app => app.status === 'approved');
                    setOngoing(filtered);
                });
        }
    }, [user, axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Ongoing Tuitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ongoing.map(item => (
                    <div key={item._id} className="card bg-base-100 shadow-xl border-l-4 border-primary">
                        <div className="card-body">
                            <h3 className="card-title">{item.tuitionDetails.subject}</h3>
                            <p className="text-gray-500">Student: {item.tuitionDetails.studentName}</p>
                            <p><strong>Location:</strong> {item.tuitionDetails.location}</p>
                            <p><strong>Agreed Salary:</strong> ৳{item.expectedSalary}</p>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-primary btn-sm btn-outline">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {ongoing.length === 0 && (
                <div className="text-center mt-10">
                    <p className="text-lg">You have no ongoing tuitions yet.</p>
                </div>
            )}
        </div>
    );
};

export default OngoingTuitions;