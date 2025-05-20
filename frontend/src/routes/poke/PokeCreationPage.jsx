// src/pages/PokeCreationPage.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OrderTable } from "@/components/poke/OrderTable";
import { PokeCard } from "@/components/poke/PokeCard";
import { CreatePokeModal } from "@/components/poke/CreatePokeModal";
import usePokeStore from "@/store/usePokeStore";
import { usePokeService } from "@/services/usePokeService";
import { ScrollArea } from "@/components/ui/scroll-area"



export function PokeCreationPage() {
    const {
        fetchProteins,
        fetchPortions,
        fetchBases,
        fetchIngredients,
        fetchOrders,
        loading,
        error,
        createOrder
    } = usePokeService();
    const { orders, draftPoke, setCreateModalOpen, draftOrder, setDraftOrder } = usePokeStore();
    useEffect(() => {
        fetchOrders();
        fetchProteins();
        fetchPortions();
        fetchBases();
        fetchIngredients();

    }, []);

    async function submitOrder() {
        // 
        if (draftOrder.length <= 0) {
            return;
        }
        let total_price = 0;
        draftOrder.map((poke) => {
            total_price += poke.price
        })
        const body = {
            "poke_ids": draftOrder.map((poke) => poke.id ?? null).filter((el) => el != null),
            "total_price": total_price
        }
        await createOrder(body)
        setDraftOrder([])
        fetchOrders();
    }
    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Poke Bowl Creation</h1>
                <Button onClick={() => setCreateModalOpen(true)}>
                    Create New Poke Bowl
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                    {loading ? (
                        <div className="text-center py-8">Loading orders...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">
                            Error loading orders: {error}
                        </div>
                    ) : (
                        <OrderTable orders={orders} />
                    )}
                </div>

                <div>
                    <div className="flex flex-row">
                        <div className="basis-1/3">
                            <h2 className="text-xl font-semibold mb-4">Current Draft Order</h2>
                        </div>
                        <div className="basis-1/3"></div>
                        <div className="basis-1/3 content-top ">
                            <Button onClick={() => submitOrder()}>Submit Order</Button>
                        </div>
                    </div>
                    <ScrollArea className="rounded-md border p-4">
                        <PokeCard title="Current Draft Poke" poke={draftPoke} />

                        {draftOrder?.map((poke, key) => {
                            return <PokeCard key={"POKECARD" + key} title={"Poke #" + poke.id} poke={poke} />
                        })}

                    </ScrollArea>

                </div>
            </div>

            <CreatePokeModal />
        </div>
    );
}

export default PokeCreationPage;