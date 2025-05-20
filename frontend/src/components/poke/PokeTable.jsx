import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import usePokeStore from "@/store/usePokeStore";

export function PokeTable({ pokes }) {
    const {
        bases,
        ingredients,
        proteins,
        portions
    } = usePokeStore();
    const basesMap = []
    bases.forEach((base) => basesMap[base.id] = base.name);
    const ingredientsMap = []
    ingredients.forEach((ingredient) => ingredientsMap[ingredient.id] = ingredient.name);
    const proteinsMap = [];
    proteins.forEach((protein) => proteinsMap[protein.id] = protein.name);
    const portionsMap = [];
    portions.forEach((portion) => portionsMap[portion.id] = portion.name);

    if (!pokes || pokes.length === 0) {
        return <div className="text-center py-8 text-gray-500">No orders there</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Poke ID</TableHead>
                    <TableHead>Base</TableHead>
                    <TableHead>Portion</TableHead>
                    <TableHead>Proteins</TableHead>
                    <TableHead>Ingredients</TableHead>
                    <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pokes.map((poke, key) => (
                    <TableRow key={"poke_table" + key + poke.id}>
                        <TableCell className="font-medium">{poke.id}</TableCell>
                        <TableCell>{basesMap[poke.base_id]}</TableCell>
                        <TableCell>{portionsMap[poke.portion_id]}</TableCell>
                        <TableCell>
                            {poke?.protein_ids?.map((ing, key) => (
                                <Badge key={poke.id + "-protein-" + ing + key} variant="outline" className="mr-1">
                                    {proteinsMap[ing]}
                                </Badge>
                            ))}
                        </TableCell>
                        <TableCell>
                            {poke?.ingredient_ids?.map((ing, key) => (
                                <Badge key={poke.id + "-ing-" + ing + key} variant="outline" className="mr-1">
                                    {ingredientsMap[ing]}
                                </Badge>
                            ))}
                        </TableCell>
                        <TableCell>{poke.price} €</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
