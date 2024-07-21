export default function Card({ pokemons }) {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      {pokemons.map((item) => {
        const { id, name } = item;
        const imgUrl = item.sprites.other.dream_world.front_default; 
        return (
          <div key={id} style={{outline: "white 1px solid", textAlign: "center"}}>
            <img src={imgUrl} alt="poke img" width="150px" height="150px"></img>
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
}