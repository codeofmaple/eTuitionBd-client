import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const TutorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();

    if (loading || isRoleLoading) {
        return <LoadingSpinner />;
    }

    if (!user || role !== 'tutor') {
        return <Navigate to="/" />;
        // return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default TutorRoute;