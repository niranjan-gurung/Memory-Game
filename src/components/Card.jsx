function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Card({ pokemons, setPokemonList }) {
  function setNewPokemonList() {
    let temp = pokemons.slice();
    shuffleArray(temp);
    setPokemonList(temp);
  }

  return (
    <div style={
      {
        display: "flex", 
        justifyContent: "center", 
        flexWrap: "wrap",
        // border: "2px red solid",
        maxWidth: "1500px",
        margin: "50px auto",
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
              setNewPokemonList(); 
            }}>
            <img src={imgUrl} alt="poke img" width="200px" height="200px"></img>
            <p>{name}</p>
          </button>
        );
      })}
    </div>
  );
}