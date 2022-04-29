import { Router } from 'express';
import PokemonController from '@controllers/pokemon.controller';
import { Routes } from '@interfaces/routes.interface';

class PokemonRoute implements Routes {
  public path = '/pokemon';
  public router = Router();
  public pokemonController = new PokemonController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.pokemonController.getPokemon);
    this.router.post(`${this.path}/refresh`, this.pokemonController.refreshPokemon);
    this.router.delete(`${this.path}/all`, this.pokemonController.deleteAllPokemon);
    this.router.get(`${this.path}/:id`, this.pokemonController.getPokemonById);
    this.router.delete(`${this.path}/:id`, this.pokemonController.deletePokemon);
  }
}

export default PokemonRoute;
