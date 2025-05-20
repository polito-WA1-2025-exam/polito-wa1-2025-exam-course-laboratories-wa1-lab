
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PokeCard({ title, poke }) {
    const { base, proteins, portion, ingredients } = poke;

    return (
        <Card className="mt-2">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h4 className="text-sm font-medium">Base</h4>
                            <p>{base?.name || "Not selected"}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Portion</h4>
                            <p className="capitalize">{portion?.name}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Price</h4>
                            <p className="capitalize">
                                {portion?.base_price + " "}
                                {poke.ingredients.length > poke.portion?.max_ingredient
                                    ? <>
                                        + {(poke.portion?.increase_percentage_ingredients * portion?.base_price) / 100}
                                    </>
                                    : <></>}
                                €
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-2">Proteins</h4>
                        {proteins?.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {proteins.map((ing) => (
                                    <Badge key={ing.id} variant="outline">
                                        {ing.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No Proteins selected</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-2">Ingredients</h4>
                        {ingredients.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {ingredients.map((ing) => (
                                    <Badge key={ing.id} variant="outline">
                                        {ing.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No ingredients selected</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

