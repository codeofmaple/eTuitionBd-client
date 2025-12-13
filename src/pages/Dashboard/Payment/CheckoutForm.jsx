import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Lock, CreditCard } from 'lucide-react';
import useSecureAxios from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = ({ bookingInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useSecureAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');

    const { salary, tutorName, tutorEmail, tuitionId, applicationId } = bookingInfo;

    // 1. Payment Intent on mount
    useEffect(() => {
        if (salary > 0) {
            axiosSecure.post('/create-payment-intent', { salary })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error("Error creating payment intent:", err));
        }
    }, [axiosSecure, salary]);

    // 2. Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);
        setCardError('');

        // Step A: Create Payment Method
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            setProcessing(false);
            return;
        }

        // Step B: Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Student',
                    email: user?.email || 'unknown'
                }
            }
        });

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return;
        }

        // Step C: Payment Success -> Save to Database
        if (paymentIntent.status === 'succeeded') {
            console.log('Transaction Id:', paymentIntent.id);

            // Construct data object according to requirements
            const paymentData = {
                studentEmail: user?.email,
                studentName: user?.displayName,
                tutorEmail: tutorEmail,
                tutorName: tutorName,
                tuitionId: tuitionId,
                applicationId: applicationId,
                amount: salary,
                transactionId: paymentIntent.id,
                date: new Date().toISOString(), // ISO Date format [cite: 279]
                status: 'success'
            };

            try {
                const res = await axiosSecure.post('/payments', paymentData);

                if (res.data?.paymentResult?.insertedId) {
                    toast.success(`Success! Payment ID: ${paymentIntent.id}`);

                    // Redirect to My Tuitions or Payment History
                    navigate('/dashboard/student/your-tuitions');
                }
            } catch {
                toast.error("Payment successful but failed to save record. Contact Admin.");
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Card Information */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                        <CreditCard size={18} /> Card Details
                    </span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
            </div>

            {/* Pay Button */}
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary w-full btn-lg bg-indigo-600 hover:bg-indigo-700 border-none text-white shadow-lg shadow-indigo-500/30 transition-all"
            >
                {processing ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Lock size={18} /> Pay ৳{salary}
                    </span>
                )}
            </button>

            <p className="text-xs text-center text-gray-400 mt-4">
                Your payment is secured by Stripe. By proceeding, you agree to our terms.
            </p>
        </form>
    );
};

export default CheckoutForm;