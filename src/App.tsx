import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// lấy data từ https://pokeapi.co/

interface Pokemons {
  name: string,
  url: string
}

interface Pokemon {
  id: number,
  name: string,
  // thuộc tính này là để lấy ra avatar của pokemon
  sprites: {
    front_default: string
  }
}

// để biết này là 1 react function component
const App: React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
      // vì trong res.data khi console.log có 1 property là result
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        console.log(poke.data);
        setPokemons((p) => [...p, poke.data])
      })
      // console.log(res.data);

    }
    getPokemon()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
      </div>
    </div>
  );
}

export default App;
