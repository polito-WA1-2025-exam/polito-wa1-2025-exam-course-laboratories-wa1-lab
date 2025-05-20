
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IngredientSelector } from "./IngredientSelector";
import { ProteinSelector } from "./ProteinSelector";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePokeStore from "@/store/usePokeStore";
import { usePokeService } from "@/services/usePokeService";

export function CreatePokeModal() {
    const {
        bases,
        portions,
        isCreateModalOpen,
        setCreateModalOpen,
        draftPoke,
        updatedraftPoke,
        resetdraftPoke,
        draftOrder,
        setDraftOrder
    } = usePokeStore();
    const { createPoke } = usePokeService();

    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSubmit = async () => {
        if (!draftPoke.base || !draftPoke.proteins) {
            return; // Validation failed
        }

        setIsSubmitting(true);
        const body = {
            "base_id": draftPoke.base.id,
            "portion_id": draftPoke.portion.id,
            "price": draftPoke.portion.base_price,
            "ingredient_ids": draftPoke.ingredients.map((el) => el.id),
            "protein_ids": draftPoke.proteins.map((el) => el.id),
        }
        const newPoke = await createPoke(body)
        setDraftOrder([...draftOrder, { id: newPoke.id, price: draftPoke.portion.base_price, ...draftPoke }]);
        setCreateModalOpen(false);
        resetdraftPoke();
        setIsSubmitting(false);
    };

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Your Poke Bowl</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Select Portion Size</Label>
                            <RadioGroup
                                value={draftPoke.portion?.id}
                                onValueChange={(value) => updatedraftPoke('portion', portions.find((el) => el.id == value))}
                                className="flex space-x-4"
                            >
                                {portions.map((portion) => {
                                    return <div key={"portion" + portion.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={portion.id} id={"portion-" + portion.id} />
                                        <Label htmlFor={"portion-" + portion.id}>{portion.name}</Label>
                                    </div>
                                })}
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label>Details</Label>
                            <p className={draftPoke.ingredients.length > draftPoke.portion?.base_price
                                ? "bg-yellow-400 rounded-xl p-1 ps-3" : ""}>
                                Base price: {draftPoke.portion?.base_price}
                            </p>
                            <p className={draftPoke.ingredients.length > draftPoke.portion?.amount_ingredients
                                ? "bg-yellow-400 rounded-xl p-1 ps-3" : ""}>
                                Ingredients count: {draftPoke.portion?.amount_ingredients}
                            </p>
                            <p className={draftPoke.proteins.length > draftPoke.portion?.amount_proteins
                                ? "bg-yellow-400 rounded-xl p-1 ps-3" : ""}>
                                Proteins count: {draftPoke.portion?.amount_proteins}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="base">Select Base</Label>
                            <Select
                                value={draftPoke.base.id}
                                onValueChange={(value) => updatedraftPoke('base', bases.find(e => e.id === value))}
                            >
                                <SelectTrigger id="base">
                                    <SelectValue placeholder="Choose a base" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bases.map((base) => (
                                        <SelectItem key={"base" + base.id} value={base.id}>{base.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <ProteinSelector />
                    <IngredientSelector />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!draftPoke.base || !draftPoke.proteins || isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Poke Bowl"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}