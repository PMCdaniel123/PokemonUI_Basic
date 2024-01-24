export interface Pokemon {
  id: number;
  name: string;
  // thuộc tính này là để lấy ra avatar của pokemon
  sprites: {
    front_default: string;
  };
}

export interface Detail {
  id: number;
  isOpen: boolean;
}

export interface PokemonDetail extends Pokemon {
  abilities?: {
    ability: string;
    name: string;
  }[];
}
