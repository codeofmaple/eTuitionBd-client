import { createBrowserRouter } from 'react-router'
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
            // {
            //     path: '/loading',
            //     element: <LoadingSpinner />,
            // },

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
            {
                index: true,
                element: <h1>Dashboard Home</h1>,
            },
        ],
    }

    // {
    //     path: '/dashboard',
    // element: (
    //     // <PrivateRoute>
    //     <DashboardLayout />
    //     // </PrivateRoute>
    // ),
    //     // children: [
    //     //     {
    //     //         index: true,
    //     //         element: (
    //     //             <PrivateRoute>
    //     //                 <Statistics />
    //     //             </PrivateRoute>
    //     //         ),
    //     //     },
    //     // ],
    // },
])