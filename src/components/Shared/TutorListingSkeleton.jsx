import React from 'react';

const TutorListingSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-pulse"
                >
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                            <div className="flex-1">
                                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between mb-4">
                            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                        </div>

                        {/* Subjects */}
                        <div className="flex gap-2 mb-6">
                            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                        </div>

                        {/* Button */}
                        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TutorListingSkeleton;