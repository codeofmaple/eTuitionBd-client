import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTuitions = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch ALL tuitions regardless of status
    const { data: tuitions = [], refetch } = useQuery({
        queryKey: ['all-tuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuitions/all/all'); // Admin specific endpoint
            return res.data;
        }
    });

    // Handle Status Change [cite: 133, 383]
    const handleStatus = (item, newStatus) => {
        axiosSecure.patch(`/tuitions/status/${item._id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Updated!', `Tuition is now ${newStatus}.`, 'success');
                }
            })
    }

    return (
        <div className="w-full p-6">
            <h2 className="text-3xl font-semibold my-4">Manage Tuitions Requests</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject</th>
                            <th>Student Email</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.subject} <br /> <span className="text-xs opacity-50">{item.classGrade}</span></td>
                                <td>{item.studentEmail}</td>
                                <td>${item.salary}</td>
                                <td>
                                    {/* Display Status Badge */}
                                    <div className={`badge ${item.status === 'approved' ? 'badge-success' : item.status === 'rejected' ? 'badge-error' : 'badge-warning'} gap-2`}>
                                        {item.status}
                                    </div>
                                </td>
                                <td>
                                    {/* Approve Button [cite: 384] */}
                                    <button
                                        onClick={() => handleStatus(item, 'approved')}
                                        disabled={item.status === 'approved'}
                                        className="btn btn-sm btn-success text-white mr-2">
                                        Approve
                                    </button>

                                    {/* Reject Button [cite: 385] */}
                                    <button
                                        onClick={() => handleStatus(item, 'rejected')}
                                        disabled={item.status === 'rejected'}
                                        className="btn btn-sm btn-error text-white">
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTuitions;