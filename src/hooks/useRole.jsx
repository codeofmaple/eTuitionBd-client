import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useSecureAxios from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const axiosSecure = useSecureAxios();

    useEffect(() => {
        if (loading || !user?.email) {
            return;
        }
        axiosSecure.get(`/users/${user.email}`)
            .then(res => {
                setRole(res.data?.role);
                setIsRoleLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsRoleLoading(false);
            });
    }, [user, loading, axiosSecure]);

    return [role, isRoleLoading];
};

export default useRole;