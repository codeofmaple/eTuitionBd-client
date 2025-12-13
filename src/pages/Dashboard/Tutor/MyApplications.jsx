import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/applications/my-applications/${user.email}`)
                .then(res => {
                    const filtered = res.data.filter(app => app.status !== 'approved');
                    setApplications(filtered);
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your application has been deleted.', 'success');
                            const remaining = applications.filter(app => app._id !== id);
                            setApplications(remaining);
                        }
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Applications</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Subject</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td>{app.tuitionDetails.studentName}</td>
                                <td>{app.tuitionDetails.subject} <br /><span className="badge badge-ghost badge-sm">{app.tuitionDetails.classGrade}</span></td>
                                <td>৳{app.expectedSalary}</td>
                                <td>
                                    {app.status === 'pending' ? (
                                        <span className="badge badge-warning">Pending</span>
                                    ) : (
                                        <span className="badge badge-error">Rejected</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(app._id)}
                                        className="btn btn-sm btn-circle btn-outline btn-error"
                                        disabled={app.status === 'approved'}
                                    >
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {applications.length === 0 && <p className="text-center mt-4">No pending applications found.</p>}
            </div>
        </div>
    );
};

export default MyApplications;