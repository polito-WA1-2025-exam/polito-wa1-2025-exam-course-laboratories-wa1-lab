
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function OrderHistory({ orders }) {
    if (!orders || orders.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-500">No orders found</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                                <div className="font-medium">Order #{order.id}</div>
                                <Badge variant={order.status === "completed" ? "success" : "secondary"}>
                                    {order.status}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div>
                                    <span className="text-gray-500">Date: </span>
                                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                                </div>
                                <div>
                                    <span className="text-gray-500">Total: </span>
                                    ${order.total.toFixed(2)}
                                </div>
                                <div>
                                    <span className="text-gray-500">Base: </span>
                                    {order.base}
                                </div>
                                <div>
                                    <span className="text-gray-500">Protein: </span>
                                    {order.protein}
                                </div>
                            </div>

                            <div className="mt-2">
                                <span className="text-gray-500 text-sm">Ingredients: </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {order.ingredients.map((ing) => (
                                        <Badge key={ing.id} variant="outline" className="text-xs">
                                            {ing.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}