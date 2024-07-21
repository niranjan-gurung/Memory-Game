import '../../public/styles/App.css';
import PokemonList from './Pokemons';

export default function App() {
  return (
    <div>
      <h1>Pokemon Memory Game</h1>
      <p>Earn points by clicking the cards! Each cards can only be clicked once</p>
      <p>If the same card is clicked more than once, its game over!</p>
      <PokemonList />
    </div>
  );
}