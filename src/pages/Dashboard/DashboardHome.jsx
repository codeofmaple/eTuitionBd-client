// DashboardHome.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useRole from '../../hooks/useRole';

const DashboardHome = () => {
    const [role, isRoleLoading] = useRole();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isRoleLoading) {
            if (role === 'admin') {
                navigate('/dashboard/admin/manage-users');
            } else if (role === 'tutor') {
                navigate('/dashboard/tutor/my-applications');
            } else if (role === 'student') {
                navigate('/dashboard/student/your-tuitions');
            }
        }
    }, [role, isRoleLoading, navigate]);

    return <LoadingSpinner />;
};

export default DashboardHome;