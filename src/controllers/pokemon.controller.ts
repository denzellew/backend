import { NextFunction, Request, Response } from 'express';
import { PokemonDto } from '@dtos/pokemon.dto';
import { Pokemon } from '@interfaces/pokemon.interface';
import PokemonService from '@services/pokemon.service';
import PokeApiService from '@services/pokeapi.service';

class PokemonController {
  public pokemonService = new PokemonService();
  public pokeApiService = new PokeApiService();

  public refreshPokemon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllPokemonData: PokemonDto[] = await this.pokeApiService.getAllPokemon();
      await this.pokemonService.createManyPokemon(getAllPokemonData);

      res.status(200).json({ message: 'got em all' });
    } catch (error) {
      next(error);
    }
  };

  public getPokemon = async (req: Request, res: Response, next: NextFunction) => {
    const nameQuery = String(req.query.name) ?? '';
    const limit = Number(req.query.limit ?? 20);
    const offset = Number(req.query.offset ?? 0);

    try {
      const findManyPokemon: PokemonDto[] = await this.pokemonService.findPokemon(nameQuery, limit, offset);
      res.status(200).json({ data: findManyPokemon, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getPokemonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pokemonId: string = req.params.id;
      const findOnePokemonData: PokemonDto = await this.pokemonService.findPokemonById(pokemonId);

      res.status(200).json({ data: findOnePokemonData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public deletePokemon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pokemonId = Number(req.params.id);
      const deletePokemonData: Pokemon = await this.pokemonService.deletePokemon(pokemonId);

      res.status(200).json({ data: deletePokemonData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PokemonController;