import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Check, XCircle, User, GraduationCap, Briefcase, DollarSign, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApplicationsModal = ({ tuitionId, onClose }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetching Applications for this specific tuition
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['applications', tuitionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/for-my-tuition/${tuitionId}`);
            return res.data;
        }
    });

    // 2. Reject Mutation
    const rejectMutation = useMutation({
        mutationFn: async (appId) => {
            return axiosSecure.patch(`/applications/status/${appId}`, { status: 'rejected' });
        },
        onSuccess: () => {
            toast.success("Application rejected");
            queryClient.invalidateQueries(['applications', tuitionId]);
        },
        onError: () => toast.error("Failed to reject application")
    });

    // 3. Handle Accept - Navigate to Payment
    const handleAccept = (application) => {
        onClose();
        navigate('/dashboard/student/payment', {
            state: {
                tuitionId: tuitionId,
                applicationId: application._id,
                tutorEmail: application.tutorEmail,
                tutorName: application.tutorName,
                salary: application.expectedSalary
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <User className="w-6 h-6" /> Applicants ({applications.length})
                    </h3>
                    <button onClick={onClose} className="btn btn-circle btn-sm btn-ghost hover:bg-white/20 text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
                    {isLoading ? (
                        <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg text-indigo-600"></span></div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg">No tutors have applied yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {applications.map((app) => (
                                <div key={app._id} className="card bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="card-body p-5">
                                        {/* Tutor Info Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="avatar">
                                                <div className="w-14 h-14 rounded-full ring ring-indigo-50 ring-offset-base-100 ring-offset-2">
                                                    <img src={app.tutorPhoto || "https://i.ibb.co/tM85b03/user-placeholder.png"} alt="Tutor" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-800">{app.tutorName}</h4>
                                                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                                    <Star size={14} fill="currentColor" />
                                                    <span>4.8 (12 reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details Grid*/}
                                        <div className="space-y-2 text-sm text-gray-600 mb-6">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap size={16} className="text-indigo-500" />
                                                <span className="font-medium">Qualification:</span> {app.qualifications || "N/A"}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={16} className="text-emerald-500" />
                                                <span className="font-medium">Experience:</span> {app.experience || "N/A"}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign size={16} className="text-orange-500" />
                                                <span className="font-medium">Expected Salary:</span> <span className="font-bold text-gray-800">৳{app.expectedSalary}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="card-actions grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => rejectMutation.mutate(app._id)}
                                                disabled={app.status === 'rejected'}
                                                className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                                            >
                                                <XCircle size={16} /> {app.status === 'rejected' ? 'Rejected' : 'Reject'}
                                            </button>

                                            <button
                                                onClick={() => handleAccept(app)}
                                                className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none flex items-center gap-2"
                                            >
                                                <Check size={16} /> Accept
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationsModal;