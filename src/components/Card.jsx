export default function Card({ 
  pokemons, setPokemonList, 
  currentScore, setCurrentScore, 
  highScore, setHighScore,
  pokemonsClicked, setPokemonsClicked }) {

  function setNewPokemonList() {
    let temp = pokemons.slice();
    shuffleArray(temp);
    setPokemonList(temp);
  }

  function handleClick(id) {
    // shuffle card orders 
    setNewPokemonList();  

    if (pokemonsClicked.includes(id)) {
      // if card is already clicked:
      // set new highscore..
      // reset currentscore
      // reset pokemonsClicked[] list
      if (currentScore > highScore) 
        setHighScore(currentScore);
      setCurrentScore(0);
      setPokemonsClicked(list => list = []);
    } else {
      // store clicked pokemon to array (to track which ones have been clicked)
      setPokemonsClicked(list => list = [...list, id]);
      setCurrentScore(score => score + 1);
    }
  }

  return (
    <div style={{
        display: "flex", 
        justifyContent: "center", 
        flexWrap: "wrap",
        maxWidth: "1500px",
        margin: "auto",
        padding: "20px",
        gap: "10px"
      }}>
      {pokemons.map((item) => {
        const { id, name } = item;
        const imgUrl = item.sprites.other.dream_world.front_default; 
        return (
          <button key={id} 
            style={{outline: "white 1px solid"}}
            onClick={() => { 
              handleClick(id);
            }}>
            <img src={imgUrl} alt="poke img" width="200px" height="200px"></img>
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
}