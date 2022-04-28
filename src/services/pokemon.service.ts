import { PokemonDto } from '@dtos/pokemon.dto';
import { HttpException } from '@exceptions/HttpException';
import { Pokemon } from '@interfaces/pokemon.interface';
import pokemonModel from '@models/pokemon.model';
import { isEmpty } from '@utils/util';

class PokemonService {
  public pokemonModel = pokemonModel;

  public async findPokemon(query: string, limit?: number, offset?: number): Promise<PokemonDto[]> {
    console.log(query);
    const filter = isEmpty(query) || query == 'undefined' || query === '' ? {} : { name: { $regex: `${query}`, $options: 'i' } };
    limit = isEmpty(limit) ? 20 : limit;
    offset = isEmpty(offset) ? 0 : offset;
    const pokemonList: Pokemon[] = await this.pokemonModel.find(filter).limit(limit).skip(offset).sort({ _id: 'asc' }).exec();
    return pokemonList.map<PokemonDto>(d => {
      return <PokemonDto>{ id: d._id, name: d.name };
    });
  }

  public async findPokemonById(pokemonId: string): Promise<PokemonDto> {
    if (isEmpty(pokemonId)) throw new HttpException(400, 'Must have pokemonId');

    const findPokemon: Pokemon = await this.pokemonModel.findOne({ _id: pokemonId });
    if (!findPokemon) throw new HttpException(409, 'There is no pokemon with this id');

    return <PokemonDto>{ id: findPokemon._id, name: findPokemon.name };
  }

  public async createManyPokemon(pokemonDtos: PokemonDto[]): Promise<void> {
    if (isEmpty(pokemonDtos)) throw new HttpException(400, 'There are no pokemon to create');

    // Create bulk upsert operation for refresh
    const bulkOps = pokemonDtos.map(data => ({
      updateOne: {
        filter: { _id: data.id },
        update: { _id: data.id, name: data.name },
        upsert: true,
      },
    }));

    await this.pokemonModel.bulkWrite(bulkOps);
  }

  public async deletePokemon(pokemonId: number): Promise<Pokemon> {
    const deletePokemonById: Pokemon = await this.pokemonModel.findByIdAndDelete(pokemonId);
    if (!deletePokemonById) throw new HttpException(409, 'Pokemon does not exist');

    return deletePokemonById;
  }
}

export default PokemonService;
