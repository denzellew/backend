export interface Pokemon {
  _id: Number;
  name: string;
}

export interface PokeApiSpecies {
  name: string;
  url: string;
}

export interface PokeApiSpeciesReponse {
  count: number;
  results: PokeApiSpecies[];
}
