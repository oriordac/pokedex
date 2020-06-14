export {};

//Get the pokemon's id passed from index.html
const urlParams = new URLSearchParams(window.location.search);
//Come back to this later. Value may be null causing a runtime error
const entryId: number = +urlParams.get('id')!;

//Use entryId to call the PokemonAPI
const container = document.getElementById('entry')! as HTMLElement;

interface IPokemon {
    id: number;
    name: string;
    image: string;
    type: string;
};

const getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon: any = await data.json();
    const pokemonType: string = pokemon.types
        .map( (poke: any) => poke.type.name)
        .join(', ');
    
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType
    };

    showPokemon(transformedPokemon);
};

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;

    container.innerHTML += output;   
};

getPokemon(entryId);