import { ClipboardList, LogOut, SquarePlus } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SiBookmyshow } from "react-icons/si";
import { FaChartBar, FaGraduationCap, FaUser, FaUsers } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { CgUserList } from "react-icons/cg";
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import toast, { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
    const [role, isRoleLoading] = useRole();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully");
        navigate('/');
    };

    // Show loading spinner while checking role
    if (isRoleLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 px-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold">Dashboard</h1>
                                <p className="text-sm text-gray-600">
                                    Role: <span className="font-semibold capitalize">{role}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2">
                                <div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <img src={user?.photoURL || "https://i.ibb.co.com/5KqH0yT/default-avatar.png"} alt={user?.displayName} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{user?.displayName}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Page content here */}
                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar Header */}
                    <div className="p-4 w-full border-b border-base-300">
                        <h2 className="text-xl font-bold is-drawer-close:hidden">Menu</h2>
                        <div className="flex items-center gap-2 is-drawer-close:hidden">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || "https://i.ibb.co.com/5KqH0yT/default-avatar.png"} alt={user?.displayName} />
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">{user?.displayName}</p>
                                <p className="text-xs text-gray-500 capitalize">{role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar content here */}
                    <ul className="menu w-full grow p-2">
                        {/* Common Links - Visible to all roles */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                                <FaUser className='size-4 my-1' />
                                <span className="is-drawer-close:hidden">Profile Settings</span>
                            </Link>
                        </li>

                        {/* ================== STUDENT DASHBOARD LINKS ================== */}
                        {role === 'student' && (
                            <>
                                <li className="menu-title is-drawer-close:hidden mt-4">
                                    <span>Student Dashboard</span>
                                </li>
                                <li>
                                    <Link to="/dashboard/student/add-new-tuition"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Add New Tuition">
                                        <SquarePlus className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">Post New Tuition</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/student/your-tuitions"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Your Tuitions">
                                        <ClipboardList className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">My Tuitions</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/student/payment-history"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Payment History">
                                        <MdOutlinePayment className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* ================== TUTOR DASHBOARD LINKS ================== */}
                        {role === 'tutor' && (
                            <>
                                <li className="menu-title is-drawer-close:hidden mt-4">
                                    <span>Tutor Dashboard</span>
                                </li>
                                <li>
                                    <Link to="/dashboard/tutor/my-applications"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="My Applications">
                                        <SiBookmyshow className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/tutor/ongoing-tuitions"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Ongoing Tuitions">
                                        <GiSpellBook className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/tutor/revenue-history"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Revenue History">
                                        <MdOutlinePayment className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">Revenue History</span>
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* ================== ADMIN DASHBOARD LINKS ================== */}
                        {role === 'admin' && (
                            <>
                                <li className="menu-title is-drawer-close:hidden mt-4">
                                    <span>Admin Dashboard</span>
                                </li>
                                <li>
                                    <Link to="/dashboard/admin/manage-users"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Manage Users">
                                        <FaUsers className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">User Management</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/admin/manage-tuitions"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Manage Tuitions">
                                        <FaGraduationCap className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">Tuition Management</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/admin/stats"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Statistics">
                                        <FaChartBar className='size-4 my-1' />
                                        <span className="is-drawer-close:hidden">Reports & Analytics</span>
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Logout Button */}
                        <li className="mt-auto pt-4 border-t border-base-300">
                            <button
                                onClick={handleLogout}
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-red-600 hover:text-red-700 hover:bg-red-50"
                                data-tip="Logout">
                                <LogOut className='size-4 my-1' />
                                <span className="is-drawer-close:hidden">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


            <Toaster position="top-right" />
        </div>
    );
};

export default DashboardLayout;