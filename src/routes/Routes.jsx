import { createBrowserRouter, Outlet } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import DashboardLayout from '../layouts/DashboardLayout'
import PrivateRoute from './PrivateRoute'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import PostNewTuition from '../pages/PostNewTuition/PostNewTuition'
import StudentTuitions from '../pages/StudentDashboard/StudentTuitions'
import ManageUsers from '../pages/Dashboard/ManageUsers'
import ManageTuitions from '../pages/Dashboard/ManageTuitions'
import AdminStats from '../pages/Dashboard/AdminStats'
import AllTuitions from '../pages/AllTuitions/AllTuitions'
import TuitionDetails from '../pages/AllTuitions/TuitionDetails'
import MyApplications from '../pages/Dashboard/Tutor/MyApplications'
import OngoingTuitions from '../pages/Dashboard/Tutor/OngoingTuitions'
import Payment from '../pages/Dashboard/Payment/Payment'
import PaymentHistory from '../pages/StudentDashboard/PaymentHistory'
import Profile from '../pages/Dashboard/Profile/Profile'
import AllTutors from '../pages/Tutor/AllTutors'
import TutorProfile from '../pages/Tutor/TutorProfile'
import RevenueHistory from '../pages/Dashboard/Tutor/RevenueHistory'
import StudentRoute from './StudentRoute'
import TutorRoute from './TutorRoute'
import DashboardHome from '../pages/Dashboard/DashboardHome'
import AdminRoute from './AdminRoute'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/tuitions',
                element: <AllTuitions />,
            },
            {
                path: '/tuition/:id',
                element: <TuitionDetails />,
            },
            {
                path: '/tutors',
                element: <AllTutors />,
            },
            {
                path: '/tutor/:id',
                element: <TutorProfile />,
            },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // Dashboard Home - Redirects based on role
            {
                index: true,
                element: <DashboardHome />,
            },

            // === STUDENT ROUTES ===
            {
                path: 'student',
                element: <StudentRoute><Outlet /></StudentRoute>,
                children: [
                    {
                        path: 'add-new-tuition',
                        element: <PostNewTuition />,
                    },
                    {
                        path: 'your-tuitions',
                        element: <StudentTuitions />,
                    },
                    {
                        path: 'payment',
                        element: <Payment />,
                    },
                    {
                        path: 'payment-history',
                        element: <PaymentHistory />,
                    },
                ]
            },

            // === TUTOR ROUTES ===
            {
                path: 'tutor',
                element: <TutorRoute><Outlet /></TutorRoute>,
                children: [
                    {
                        path: 'my-applications',
                        element: <MyApplications />,
                    },
                    {
                        path: 'ongoing-tuitions',
                        element: <OngoingTuitions />,
                    },
                    {
                        path: 'revenue-history',
                        element: <RevenueHistory />,
                    },
                ]
            },

            // === ADMIN ROUTES ===
            {
                path: 'admin',
                element: <AdminRoute><Outlet /></AdminRoute>,
                children: [
                    {
                        path: 'manage-users',
                        element: <ManageUsers />,
                    },
                    {
                        path: 'manage-tuitions',
                        element: <ManageTuitions />,
                    },
                    {
                        path: 'stats',
                        element: <AdminStats />,
                    },
                ]
            },

            // === COMMON ROUTES (All roles) ===
            {
                path: 'profile',
                element: <Profile />,
            },
        ],
    }
])