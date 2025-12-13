import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useSecureAxios from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useSecureAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });


    // Handle Make Admin/Tutor
    const handleMakeRole = (user, role) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Success!', `${user.name} is now a ${role}!`, 'success');
                }
            });
    };

    // Handle Delete User
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full p-6">
            <h2 className="text-3xl font-semibold my-4">Manage Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Head */}
                    <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="uppercase font-bold">{user.role}</td>
                                <td className="flex gap-2">
                                    {user.role !== 'admin' &&
                                        <button
                                            onClick={() => handleMakeRole(user, 'admin')}
                                            className="btn btn-xs btn-primary">
                                            Make Admin
                                        </button>
                                    }
                                    {/* Feature: Modify user roles [cite: 378] */}
                                    <select
                                        onChange={(e) => handleMakeRole(user, e.target.value)}
                                        className="select select-bordered select-xs w-full max-w-xs"
                                        defaultValue={user.role}
                                    >
                                        <option disabled>Change Role</option>
                                        <option value="student">Student</option>
                                        <option value="tutor">Tutor</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-xs btn-error text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;