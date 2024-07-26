import { useEffect, useState } from 'react';
import Card from './Card';
import '../../public/styles/App.css';

export default function App() {
  return (
    <div>
      <Header />
      <Game />
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

function Game() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonsClicked, setPokemonsClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonAmount, setPokemonAmount] = useState(12);

  const POKEMON_LIMIT = 36;

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

  // set new highscore..
  // reset currentscore
  // reset pokemonsClicked[] list
  function resetGameState() {
    if (currentScore > highScore) 
      setHighScore(currentScore);
    currentScore > 0 && setCurrentScore(0);
    setPokemonsClicked(list => list = []);
  }

  function clearPokemonList() {
    setPokemonList(list => list = []);
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetGameState();

    const inputValue = e.target[0].value;

    if (inputValue > POKEMON_LIMIT) {
      console.error(`Error. Pokemon limit is ${POKEMON_LIMIT}`);
    } else {
      setPokemonAmount(inputValue);
    }
  }
  
  useEffect(() => {
    clearPokemonList();

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonAmount}`)
    .then(res => res.json())
    .then(data => {
      const { results } = data;
      getPokemon(results);
    });
  }, [pokemonAmount]);

  return (
    <>
      <div>
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {highScore}</p>
        <h2>{currentScore == pokemonAmount && "Congratz, you won!"}</h2>
        <form method="post" onSubmit={handleSubmit}>
          <input 
            name="myInput" type="text" size="1"
            defaultValue={pokemonAmount} />
          <button type="submit">submit</button>
        </form>
      </div>
      <Card 
        pokemons={pokemonList} 
        setPokemonList={setPokemonList} 
        pokemonsClicked={pokemonsClicked} 
        setPokemonsClicked={setPokemonsClicked}
        setCurrentScore={setCurrentScore}
        resetGameState={resetGameState} />
    </>
  );
}