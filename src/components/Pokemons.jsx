import { useEffect, useState } from 'react';

let POKEMON_LIMIT = 10; // adjustable by player (to make it more difficult)
const SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([{}]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${POKEMON_LIMIT}`)
    .then(res => res.json())
    .then(data => {
      const { results } = data;
      setPokemonList(results);
    });
  }, []);

  return (
    <div style={{display: "flex"}}>
      {pokemonList.map((pokemon, i) => {
        const { url, name } = pokemon;
        const id = url?.split('/')[6];  // grab id
        return <div key={i} style={{outline: "white 1px solid", textAlign: "center"}}>
          <img src={SPRITE_URL+id+".png"} alt="poke img"></img>
          <p>{name}</p>
        </div>
      })}
    </div>
  );
}