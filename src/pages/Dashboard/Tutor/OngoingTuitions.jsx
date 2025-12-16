/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useSecureAxios from '../../../hooks/useAxiosSecure';

const OngoingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useSecureAxios();

    const { data = [], isLoading } = useQuery({
        queryKey: ['ongoing-tuitions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/my-applications/${user.email}`);
            return res.data.filter(app => app.status === 'approved');
        }
    });

    return (
        <div className="min-h-screen">
            <title>Ongoing Tuitions - eTuitionBd</title>

            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
                Ongoing Tuitions
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-40 bg-white rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : data.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                    You don't have any ongoing tuitions yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {data.map(item => (
                        <motion.div
                            key={item._id}
                            whileHover={{ y: -6 }}
                            transition={{ type: 'spring', stiffness: 220 }}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                    <FaUserGraduate />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                        {item.tuitionDetails?.subject}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Student: {item.tuitionDetails?.studentName}
                                    </p>

                                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-indigo-400" />
                                            {item.tuitionDetails?.location}
                                        </span>
                                        <span className="font-semibold text-emerald-600">
                                            ৳{item.expectedSalary}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                                    Approved
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OngoingTuitions;
