import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <ErrorPage />,
        // children: [
        //     {
        //         path: '/',
        //         element: <Home />,
        //     },
        //     { path: '/login', element: <Login /> },
        //     { path: '/signup', element: <SignUp /> },
        // ],
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