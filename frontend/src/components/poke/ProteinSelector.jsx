
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import usePokeStore from "../../store/usePokeStore";

export function ProteinSelector() {
    const [selected, setSelected] = useState([])
    const { proteins, updatedraftPoke, draftPoke } = usePokeStore()

    useEffect(() => {
        setSelected(draftPoke.proteins)
    }, [])

    function onSelect(prot, isSelected) {
        if (isSelected) {
            // need to add
            const newS = [...selected, prot]
            setSelected(newS)
            updatedraftPoke('proteins', newS)
        } else {
            const newSS = selected.filter((el) => el.id != prot.id)
            setSelected(newSS)
            updatedraftPoke('proteins', newSS)
        }
    }
    return (
        <ScrollArea className="h-32 rounded-md border p-4">
            <div className="space-y-4">
                <h4 className="font-medium">Select Proteins</h4>
                <div className="grid grid-cols-2 gap-2">
                    {proteins?.map((prot) => {
                        const isSelected = selected.some(i => i.id === prot.id);
                        return (
                            <div key={prot.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`protein-${prot.id}`}
                                    checked={isSelected}
                                    onCheckedChange={() => onSelect(prot, !isSelected)}
                                />
                                <Label
                                    htmlFor={`protein-${prot.id}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {prot.name}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ScrollArea>
    );
}