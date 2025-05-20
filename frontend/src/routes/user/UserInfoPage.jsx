import { useEffect } from "react";
import { UserProfile } from "@/components/user/UserProfile";
import { OrderHistory } from "@/components/user/OrderHistory";
import useUserStore from "@/store/useUserStore";
import { useUserService } from "@/services/useUserService";

export function UserInfoPage() {
    const { user, userOrders } = useUserStore();
    const { fetchUserProfile, fetchUserOrders, loading, error } = useUserService();

    useEffect(() => {
        fetchUserProfile();
        fetchUserOrders();
    }, [fetchUserProfile, fetchUserOrders]);

    if (loading) {
        return <div className="container mx-auto py-8 text-center">Loading user data...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 text-center text-red-500">
                Error loading user data: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">User Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <UserProfile user={user} />
                </div>

                <div className="md:col-span-2">
                    <OrderHistory orders={userOrders} />
                </div>
            </div>
        </div>
    );
}