import React from 'react';
import { useLocation, Navigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Initialize Stripe with your Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const location = useLocation();

    // Data passed from the ApplicationsModal via navigate state
    const { tuitionId, applicationId, tutorEmail, tutorName, salary } = location.state || {};

    // Prevent direct access without data (redirect back if someone types URL manually)
    if (!tuitionId || !salary) {
        return <Navigate to="/dashboard/my-tuitions" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Complete <span className="text-indigo-600">Payment</span>
                    </h1>
                    <p className="mt-2 text-gray-600">
                        You are hiring <span className="font-bold text-gray-800">{tutorName}</span>
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    {/* Order Summary Header */}
                    <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                        <span className="font-medium text-indigo-100 uppercase tracking-wider text-sm">Amount to Pay</span>
                        <span className="text-3xl font-bold">৳{salary}</span>
                    </div>

                    <div className="p-8">
                        {/* Stripe Elements Wrapper */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                bookingInfo={{ tuitionId, applicationId, tutorEmail, tutorName, salary }}
                            />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;