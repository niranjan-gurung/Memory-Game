import { useEffect, useState } from 'react';
import Card from './Card';

let POKEMON_LIMIT = 12; // adjustable by player (to make it more difficult)

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  function getPokemon(pokemons) {
    pokemons.map(async (item) => {
      const pokemonData = await fetch(item.url)
      .then(res => res.json())
      .then(data => { return data });

      setPokemonList(oldList => {
        oldList = [...oldList, pokemonData];
        oldList.sort((a, b) => a.id > b.id ? 1 : -1);
        return oldList;
      });
    });
  }
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_LIMIT}`)
    .then(res => res.json())
    .then(data => {
      const { results } = data;
      getPokemon(results);
    });
  }, []);
  
  return (
    <Card pokemons={pokemonList} setPokemonList={setPokemonList} />
  );
}