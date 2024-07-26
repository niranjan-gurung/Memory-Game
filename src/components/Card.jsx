import '../../public/styles/Card.css';

export default function Card({ 
  pokemons, setPokemonList, 
  pokemonsClicked, setPokemonsClicked,
  setCurrentScore, resetGameState }) {

  function shuffleCards() {
    const newList = shuffleArray(pokemons.slice());
    setPokemonList(newList);
  }

  function handleClick(id) {
    // shuffle card orders 
    shuffleCards();  

    if (pokemonsClicked.includes(id)) {
      resetGameState();
    } else {
      // store clicked pokemon to array (to track which ones have been clicked)
      setPokemonsClicked(list => list = [...list, id]);
      setCurrentScore(score => score + 1);
    }
  }

  return (
    <div className="card-content">
      {pokemons.map((item) => {
        const { id, name } = item;
        const imgUrl = item.sprites.other.dream_world.front_default; 
        return (
          <button key={id}
            onClick={() => handleClick(id)}>
            <img src={imgUrl} alt="poke img"></img>
            <p>{name}</p>
          </button>
        );
      })}
    </div>
  );
}

// helper method:
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}