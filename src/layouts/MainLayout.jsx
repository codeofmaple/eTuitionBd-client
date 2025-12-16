import { Outlet } from 'react-router'
import Footer from '../components/Shared/Footer/Footer'
import Navbar from '../components/Shared/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen
        bg-gray-50
        '>
            <Navbar />
            <div className='flex-1 my-container'>
                <Outlet />
            </div>
            <Footer />

            <Toaster position="top-right" />
        </div>
    )
}

export default MainLayout