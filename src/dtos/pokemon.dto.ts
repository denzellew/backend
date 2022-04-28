import { IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;
}
