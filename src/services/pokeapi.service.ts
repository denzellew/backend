import { PokemonDto } from '@/dtos/pokemon.dto';
import { PokeApiSpeciesReponse, PokeApiSpecies, Pokemon } from '@/interfaces/pokemon.interface';
import axios, { AxiosResponse } from 'axios';

class PokeApiService {
  public async getAllPokemon(): Promise<PokemonDto[]> {
    // Get list of species (excludes mega and giga evolutions)
    const pokeRes: AxiosResponse<PokeApiSpeciesReponse> = await axios.get('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10000');

    // Iterate, parse id from url, and get name
    const data = pokeRes.data.results.map<PokemonDto>((r: PokeApiSpecies) => {
      const url = r.url.replace(/\/$/, ''); // remove trailing slash at the end
      const urlSplits = url.split('/'); // Split by slashes
      const id = urlSplits[urlSplits.length - 1]; // Id will be at the end
      return <PokemonDto>{
        id: Number(id),
        name: r.name.replace(/-/g, ' '),
      };
    });

    return data;
  }
}
