import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const TutorProfile = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/tutors/${id}`)
            .then(res => {
                setTutor(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;

    if (!tutor) return <div className="text-center mt-20 text-xl">Tutor not found</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-5xl mx-auto border border-gray-200">

                {/* Left Side: Image & Contact */}
                <figure className="lg:w-1/3 bg-base-200 p-8 flex flex-col justify-center items-center">
                    <div className="avatar mb-4">
                        <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || 'https://i.ibb.co/L8G8X0F/default-avatar.png'} alt={tutor.name} />

                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center">{tutor.name}</h2>
                    <p className="badge badge-primary mt-2 uppercase">{tutor.role}</p>

                    <div className="mt-6 w-full space-y-2">
                        <div className="flex items-center gap-2 justify-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            <span>{tutor.email}</span>
                        </div>
                        {tutor.phone && (
                            <div className="flex items-center gap-2 justify-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                <span>{tutor.phone}</span>
                            </div>
                        )}
                    </div>
                </figure>

                {/* Right Side: Details */}
                <div className="card-body lg:w-2/3">
                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">About</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Location</h4>
                            <p className="text-gray-600">{tutor.location || "Dhaka, Bangladesh"}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Experience</h4>
                            <p className="text-gray-600">3 Years (Sample Data)</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Qualification</h4>
                            <p className="text-gray-600">B.Sc in Computer Science (Sample Data)</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-primary">Preferred Class</h4>
                            <p className="text-gray-600">Class 9-10</p>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div>
                        <h4 className="font-semibold text-lg text-primary mb-2">Bio / Description</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {tutor.description || "This tutor has not added a bio yet. However, they are a verified tutor on our platform ready to help students achieve their academic goals."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfile;