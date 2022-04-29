import { IsNumber, IsString } from 'class-validator';

export class PokemonDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;
}

export class PokemonQueryDto {
  public count: number;
  public data: PokemonDto[];
}
