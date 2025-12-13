import React from 'react';

const LoadingTuitionCard = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-pulse"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>

                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>

                        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default LoadingTuitionCard;