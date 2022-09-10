export class Pokemon {
    id: string;
    order: number;
    name: string;
    height: number;
    weight: number;
    imageUrl: string;
    types: PokemonType[];
}

export class PokemonType {
    name: string;
}