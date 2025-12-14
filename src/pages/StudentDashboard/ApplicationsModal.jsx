import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { X, Check, XCircle, User, GraduationCap, Briefcase, DollarSign, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'


export default function ApplicationsModal({ tuitionId, onClose }) {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // fetch
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['applications', tuitionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/for-my-tuition/${tuitionId}`)
            return res.data
        },
        enabled: !!tuitionId,
    })

    // reject
    const rejectMutation = useMutation({
        mutationFn: async (appId) => axiosSecure.patch(`/applications/status/${appId}`, { status: 'rejected' }),
        onSuccess: () => {
            toast.success('Application rejected')
            queryClient.invalidateQueries(['applications', tuitionId])
        },
        onError: () => toast.error('Failed to reject application'),
    })

    const handleAccept = (application) => {
        onClose()
        navigate('/dashboard/student/payment', {
            state: {
                tuitionId: tuitionId,
                applicationId: application._id,
                tutorEmail: application.tutorEmail,
                tutorName: application.tutorName,
                salary: application.expectedSalary,
            },
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            aria-modal="true"
            role="dialog"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <motion.div
                initial={{ y: 8, scale: 0.995 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white/95 ring-1 ring-black/5"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-emerald-500 to-indigo-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/10 p-2">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight">Applicants <span className="text-sm text-white/90">({applications.length})</span></h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/12 hover:bg-white/20 transition"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[72vh] overflow-y-auto bg-white">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 animate-pulse">
                                    <div className="w-14 h-14 rounded-full bg-gray-200" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/5 bg-gray-200 rounded" />
                                        <div className="h-3 w-1/2 bg-gray-200 rounded" />
                                    </div>
                                    <div className="w-28 h-8 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            <p className="text-lg">No tutors have applied yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {applications.map((app) => (
                                <motion.div
                                    key={app._id}
                                    layout
                                    whileHover={{ y: -3 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                                    className="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-sm ring-1 ring-black/3"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-black/5">
                                            <img
                                                src={app.tutorPhoto || 'https://i.ibb.co/tM85b03/user-placeholder.png'}
                                                alt={app.tutorName}
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.currentTarget.src = 'https://i.ibb.co/tM85b03/user-placeholder.png')}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-800">{app.tutorName}</h4>
                                                    <p className="text-xs text-gray-500 mt-0.5">{app.tutorEmail}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-yellow-500">
                                                    <Star size={14} />
                                                    <span className="text-xs text-gray-600">4.8</span>
                                                </div>
                                            </div>

                                            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap size={14} className="text-emerald-500" />
                                                    <span className="truncate">{app.qualifications || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Briefcase size={14} className="text-indigo-500" />
                                                    <span>{app.experience || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={14} className="text-emerald-600" />
                                                    <span className="font-medium">৳{app.expectedSalary ?? app.salary ?? '—'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 justify-end">
                                        <button
                                            onClick={() => rejectMutation.mutate(app._id)}
                                            disabled={app.status === 'rejected' || rejectMutation.isLoading}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-red-100 text-red-600 hover:bg-red-50 transition disabled:opacity-60"
                                            aria-pressed={app.status === 'rejected'}
                                        >
                                            <XCircle size={16} />
                                            <span>{app.status === 'rejected' ? 'Rejected' : 'Reject'}</span>
                                        </button>

                                        <button
                                            onClick={() => handleAccept(app)}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
                                        >
                                            <Check size={16} />
                                            <span>Accept</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}
