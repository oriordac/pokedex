export {};

const urlParams = new URLSearchParams(window.location.search);
//Come back to this later. Value may be null causing a runtime error
const entryId: number = +urlParams.get('id')!;
const entryName: string = urlParams.get('name')!.toLowerCase();

const container = document.getElementById('entry')! as HTMLElement;

interface IPokemon {
    id: number;
    name: string;
    image: string;
    shiny: string;
    type: string;
    ability: string;
    weight: number;
    height: number;
    flavor: string;
};

const getPokemon = async (param: number | string): Promise<void> => {
    //param can either be the nationaldex id or the pokemon's name for this API
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`);
    const pokemon: any = await data.json();
    const pokemonHeight: number = pokemon.height;
    const pokemonWeight: number = pokemon.weight;
    const pokemonType: string = pokemon.types
        .map( (poke: any) => poke.type.name)
        .join(', ');
    const pokemonAbility: string = pokemon.abilities
        .map( (poke: any) => poke.ability.name)
        .join(', ');

    const data2: Response = await fetch(`${pokemon.species.url}`);
    const flavor: any = await data2.json();
    const pokemonFlavor: string = flavor.flavor_text_entries[0].flavor_text
        .replace(/\s+/g, ' ')
        .trim();
    
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        shiny: `${pokemon.sprites.front_shiny}`,
        type: pokemonType,
        ability: pokemonAbility,
        weight: pokemonWeight,
        height: pokemonHeight,
        flavor: pokemonFlavor
    };
    
    showPokemon(transformedPokemon);
};

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
        <div class="card">
            <span class="return" onclick="returnHome()">Return</span>
            <span class="card--id">#${pokemon.id}</span>
            <h1 class="card--name">${pokemon.name}</h1>  
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <img class="card--image" src=${pokemon.shiny} />
            <hr>
            <div class="container">
                <div class="left--half">
                    <div class="entry--details"><span style="color:white;">Type:</span> ${pokemon.type}</div>
                    <div class="entry--details"><span style="color:white;">Abilities:</span> ${pokemon.ability}</div>
                    <div class="entry--details"><span style="color:white;">Height:</span> ${pokemon.height} dm</div>
                    <div class="entry--details"><span style="color:white;">Weight:</span> ${pokemon.weight} gm</div>
                </div>
                <div class="right--half">
                    <div class="entry--details">${pokemon.flavor}</div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += output;   
};

//Use one of the two parameters to call the PokeAPI
if(entryId) {
    getPokemon(entryId);
} else {
    getPokemon(entryName);
}


const returnHome = ( ) => {
    window.location.href = `./index.html`;
}