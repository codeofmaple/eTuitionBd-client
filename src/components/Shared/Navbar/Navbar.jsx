import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Logo from '../Logo';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useAuth();

    // Navigation Links 
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/tuitions">Tuitions</NavLink></li>
            <li><NavLink to="/tutors">Tutors</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );

    const handleLogout = async (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        try {
            await logOut();
            setTimeout(() => {
                toast.success("Logged out successfully");
            }, 150);
        } catch (error) {
            toast.error(error?.message || "Logout failed");
        }
    };

    return (
        <div className="bg-base-100 shadow-lg sticky top-0 z-50">
            <div className="my-container navbar">

                {/* 1. Navbar Start */}
                <div className="navbar-start ">
                    {/* Mobile Dropdown Menu */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {/* Mobile Links */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            {navLinks}
                            {/* Mobile Auth Links */}
                            {user ? (
                                <>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Logo and Website Name  */}
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                {/* 2. Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                {/* 3. Authentication/Profile */}
                <div className="navbar-end space-x-2">
                    {user ? (
                        // Logged-in: Dashboard
                        <div className="flex items-center space-x-2">
                            <Link to="/dashboard" className="btn btn-ghost hidden md:inline-flex">
                                Dashboard
                            </Link>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    {/* Profile Picture */}
                                    <div className="w-10 rounded-full">
                                        <img alt="User Avatar" src={user?.photoURL || 'https://i.ibb.co/L8G8X0F/default-avatar.png'} />
                                    </div>
                                </div>
                                {/* Profile Dropdown Menu */}
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                    <li><Link to="/dashboard/profile">Profile Settings</Link></li>
                                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary hidden sm:inline-flex">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
