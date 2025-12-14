import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useAxiosSecure";
import { Pencil, Trash, Users } from "lucide-react";
import toast from "react-hot-toast";
import EditModal from "./EditModal";
import ApplicationsModal from "./ApplicationsModal";

const StudentTuitions = () => {
    const axiosSecure = useSecureAxios();
    const queryClient = useQueryClient();

    // State for modals
    const [editingTuition, setEditingTuition] = useState(null);
    const [viewingApplicationsId, setViewingApplicationsId] = useState(null);

    // Fetch tuitions
    const { data: myTuitions = [], isLoading } = useQuery({
        queryKey: ["my-tuitions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tuitions/student/my-tuitions");
            return res.data;
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/tuitions/${id}`);
        },
        onSuccess: () => {
            toast.success("Tuition deleted successfully");
            queryClient.invalidateQueries(["my-tuitions"]);
        },
        onError: () => toast.error("Failed to delete tuition"),
    });

    if (isLoading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">My Posted Tuitions</h2>
                <div className="badge badge-primary badge-lg p-4">Total: {myTuitions.length}</div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto shadow-xl rounded-2xl bg-white border border-gray-100">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-indigo-50 text-indigo-900 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="py-4">Title</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th className="text-center">Applications</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-100">
                        {myTuitions.map((tuition) => (
                            <tr key={tuition._id} className="hover:bg-gray-50 transition-colors">
                                <td className="font-medium text-gray-900">{tuition.title}</td>
                                <td>
                                    <span className="badge badge-ghost font-medium">{tuition.subject}</span>
                                </td>
                                <td>{tuition.classGrade}</td>
                                <td className="font-bold text-gray-700">৳{tuition.salary}</td>
                                <td className="text-gray-500 max-w-[150px] truncate" title={tuition.location}>
                                    {tuition.location}
                                </td>
                                <td>
                                    <div className={`badge ${tuition.status === 'approved' ? 'badge-success text-white' :
                                        tuition.status === 'pending' ? 'badge-warning text-white' :
                                            'badge-error text-white'
                                        } gap-2`}>
                                        {tuition.status}
                                    </div>
                                </td>

                                {/* APPLICATIONS COLUMN */}
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none gap-2"
                                        onClick={() => setViewingApplicationsId(tuition._id)}
                                    >
                                        <Users size={16} />
                                        View
                                    </button>
                                </td>

                                {/* ACTIONS */}
                                <td className="flex gap-2 justify-center py-4">
                                    <button
                                        className="btn btn-sm btn-square btn-outline btn-primary"
                                        onClick={() => setEditingTuition(tuition)}
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-square btn-outline btn-error"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this tuition?')) {
                                                deleteMutation.mutate(tuition._id)
                                            }
                                        }}
                                        title="Delete"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODALS */}
            {editingTuition && (
                <EditModal
                    tuition={editingTuition}
                    onClose={() => setEditingTuition(null)}
                />
            )}

            {/* Application Modal */}
            {viewingApplicationsId && (
                <ApplicationsModal
                    tuitionId={viewingApplicationsId}
                    onClose={() => setViewingApplicationsId(null)}
                />
            )}
        </div>
    );
};

export default StudentTuitions;