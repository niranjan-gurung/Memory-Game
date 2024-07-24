import { useEffect, useState } from 'react';
import Card from './Card';
import '../../public/styles/App.css';

export default function App() {
  // difficulty settings:
  // make this adjustable??
  let POKEMON_LIMIT = 12;
 
  return (
    <div>
      <Header />
      <Game getPokemonLimit={POKEMON_LIMIT} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div>
        <h1>Pokemon Memory Game</h1>
        <p>
          Earn points by clicking the cards! Each cards can only be clicked once
          If the same card is clicked more than once, its game over!
        </p>
      </div>
    </header>
  );
}

function Game({ getPokemonLimit }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonsClicked, setPokemonsClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

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
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${getPokemonLimit}`)
    .then(res => res.json())
    .then(data => {
      const { results } = data;
      getPokemon(results);
    });
  }, []);

  return (
    <>
      <div>
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {highScore}</p>
        <h2>{currentScore == getPokemonLimit ? "Congratz, you won!" : ""}</h2>
      </div>
      <Card 
        pokemons={pokemonList} 
        setPokemonList={setPokemonList} 
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        highScore={highScore}
        setHighScore={setHighScore}
        pokemonsClicked={pokemonsClicked} 
        setPokemonsClicked={setPokemonsClicked} />
    </>
  );
}