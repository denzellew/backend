import { model, Schema, Document } from 'mongoose';
import { Pokemon } from '@interfaces/pokemon.interface';

const pokemonSchema: Schema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
});

const pokemonModel = model<Pokemon & Document>('Pokemon', pokemonSchema);

export default pokemonModel;
