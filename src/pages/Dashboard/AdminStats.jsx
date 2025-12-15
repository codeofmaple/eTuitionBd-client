import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, } from "recharts";
import { DollarSign, Users, BookOpen, ShoppingCart, } from "lucide-react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

/*  utils  */
const toNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
};

/*  card components  */
const StatCard = ({ title, value, icon: Icon, accent }) => (
    <div className="flex items-center gap-4 p-6 bg-white border rounded-xl shadow-sm">
        <div
            className={`p-4 rounded-xl ${accent} bg-opacity-15`}
        >
            <Icon className={`w-7 h-7 ${accent}`} />
        </div>

        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

/*  Main component */
const AdminStats = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data = {},
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    });

    const stats = useMemo(
        () => ({
            revenue: toNumber(data.revenue),
            users: toNumber(data.users),
            tuitions: toNumber(data.tuitions),
            orders: toNumber(data.orders),
        }),
        [data]
    );

    const chartData = useMemo(
        () => [
            { name: "Revenue", value: stats.revenue },
            { name: "Users", value: stats.users },
            { name: "Tuitions", value: stats.tuitions },
            { name: "Orders", value: stats.orders },
        ],
        [stats]
    );

    /*  States */
    if (isLoading) {
        return (
            <LoadingSpinner></LoadingSpinner>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-red-600">
                Failed to load admin statistics.
            </div>
        );
    }


    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-semibold">Admin Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={(stats.revenue)}
                    icon={DollarSign}
                    accent="text-emerald-600"
                />
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={Users}
                    accent="text-indigo-600"
                />
                <StatCard
                    title="Total Tuitions"
                    value={stats.tuitions}
                    icon={BookOpen}
                    accent="text-orange-600"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.orders}
                    icon={ShoppingCart}
                    accent="text-rose-600"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                        Platform Metrics
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AdminStats);
