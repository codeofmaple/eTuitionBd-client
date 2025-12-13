import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AllTutors = () => {
    const { user } = useAuth();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/tutors')
            .then(res => {
                setTutors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Meet Our Tutors</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.map(tutor => (
                    <div key={tutor._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <figure className="px-10 pt-10">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt={tutor.name} />
                                </div>
                            </div>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{tutor.name}</h2>
                            <p className="text-gray-500">{tutor.email}</p>

                            {/* Placeholder for fields if you add them to DB later */}
                            <div className="flex gap-2 mt-2">
                                <div className="badge badge-outline">Mathematics</div>
                                <div className="badge badge-outline">Physics</div>
                            </div>

                            <div className="card-actions mt-4">
                                <Link to={`/tutor/${tutor._id}`}>
                                    <button className="btn btn-primary btn-sm">View Profile</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTutors;