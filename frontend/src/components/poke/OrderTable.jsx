import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { PokeTable } from "./PokeTable"

export function OrderTable({ orders }) {

    if (!orders || orders.length === 0) {
        return <div className="text-center py-8 text-gray-500">No orders yet</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pokes</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order, key) => (
                    <TableRow key={"order_table" + key + order.id}>
                        <TableCell className="font-medium">{order.order_id}</TableCell>
                        <TableCell>
                            <PokeTable pokes={order.poke} />
                        </TableCell>
                        <TableCell>{order.total_price} €</TableCell>
                        <TableCell>{format(Date.now(), 'MMM dd, yyyy')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
