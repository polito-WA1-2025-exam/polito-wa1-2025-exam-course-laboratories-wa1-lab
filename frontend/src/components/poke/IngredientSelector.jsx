
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import usePokeStore from "../../store/usePokeStore";

export function IngredientSelector() {
    const [selected, setSelected] = useState([])
    const { ingredients, updatedraftPoke, draftPoke } = usePokeStore()
    useEffect(() => {
        setSelected(draftPoke.ingredients)
    }, [])
    function onSelect(ingredient, isSelected) {
        if (isSelected) {
            // need to add
            const newS = [...selected, ingredient]
            setSelected(newS)
            updatedraftPoke('ingredients', newS)
        } else {
            const newSS = selected.filter((el) => el.id != ingredient.id)
            setSelected(newSS)
            updatedraftPoke('ingredients', newSS)
        }
    }
    return (
        <ScrollArea className="h-72 rounded-md border p-4">
            <div className="space-y-4">
                <h4 className="font-medium">Select Ingredients</h4>
                <div className="grid grid-cols-2 gap-2">
                    {ingredients.map((ingredient) => {
                        const isSelected = selected.some(i => i.id === ingredient.id);
                        return (
                            <div key={ingredient.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`ingredient-${ingredient.id}`}
                                    checked={isSelected}
                                    onCheckedChange={() => onSelect(ingredient, !isSelected)}
                                />
                                <Label
                                    htmlFor={`ingredient-${ingredient.id}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {ingredient.name}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ScrollArea>
    );
}