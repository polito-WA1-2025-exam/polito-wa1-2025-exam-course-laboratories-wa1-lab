import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserProfile({ user }) {
    if (!user) {
        return <div className="text-center py-8">Loading user profile...</div>;
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                    <div className="text-center p-2 bg-gray-100 rounded-md">
                        <span className="text-sm text-gray-500">Member since</span>
                        <p className="font-medium">{new Date(user.joinedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-100 rounded-md">
                        <span className="text-sm text-gray-500">Orders</span>
                        <p className="font-medium">{user.totalOrders || 0}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
