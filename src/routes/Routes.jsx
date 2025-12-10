import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Home from '../page/Home/Home'
import Login from '../page/Login/Login'
import Register from '../page/Register/Register'
import About from '../page/About/About'
import Contact from '../page/Contact/Contact'
import ErrorPage from '../page/ErrorPage/ErrorPage'

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
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },

    {
        path: '/dashboard',
        element: (
            // <PrivateRoute>
            <DashboardLayout />
            // </PrivateRoute>
        ),
        // children: [
        //     {
        //         index: true,
        //         element: (
        //             <PrivateRoute>
        //                 <Statistics />
        //             </PrivateRoute>
        //         ),
        //     },
        // ],
    },
])