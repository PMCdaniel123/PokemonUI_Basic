import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Detail, Pokemon } from "./interface";

// lấy data từ https://pokeapi.co/

interface PokemonURL {
  name: string,
  url: string
}


// để biết này là 1 react function component
const App: React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  // tạo ra state url mới để load thêm pokemon
  const [nextUrl, setNextUrl] = useState<string>("")

  // tạo ra state loading để coi thử có đang load hay ko
  const [loading, setLoading] = useState<boolean>(true)

  const [viewDetial, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false
  })

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")

      // vì trong API có sẵn property next là url để lấy 20 con pokemon tiếp theo
      setNextUrl(res.data.next)

      // vì trong res.data khi console.log có 1 property là result
      res.data.results.forEach(async (pokemon: PokemonURL) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        // console.log(poke.data);
        setPokemons((p) => [...p, poke.data])
        setLoading(false)
      })
      // console.log(res.data);

    }
    getPokemon()
  }, [])

  const loadMore = async () => {
    setLoading(true)
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    res.data.results.forEach(async (pokemon: PokemonURL) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetial}
          setDetail={setDetail}
        />
        {!viewDetial.isOpen && (
          <div className="btn">
            <button onClick={loadMore}>{loading ? "Loading..." : "Load more"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
