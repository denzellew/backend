import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import PokemonRoute from '@routes/pokemon.route';

validateEnv();

const app = new App([new IndexRoute(), new PokemonRoute()]);

app.listen();
