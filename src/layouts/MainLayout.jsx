import { Outlet } from 'react-router'
import Footer from '../components/Shared/Footer/Footer'
import Navbar from '../components/Shared/Navbar/Navbar'
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            {/* <div className='pt-24 min-h-[calc(100vh-68px)]'> */}
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout