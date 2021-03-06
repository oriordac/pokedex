var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlParams = new URLSearchParams(window.location.search);
//Come back to this later. Value may be null causing a runtime error
const entryId = +urlParams.get('id');
const entryName = urlParams.get('name').toLowerCase();
const container = document.getElementById('entry');
;
const getPokemon = (param) => __awaiter(void 0, void 0, void 0, function* () {
    //param can either be the nationaldex id or the pokemon's name for this API
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${param}`);
    const pokemon = yield data.json();
    const pokemonHeight = pokemon.height;
    const pokemonWeight = pokemon.weight;
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(', ');
    const pokemonAbility = pokemon.abilities
        .map((poke) => poke.ability.name)
        .join(', ');
    const data2 = yield fetch(`${pokemon.species.url}`);
    const flavor = yield data2.json();
    //Pass flavor.flavor_text_entries to englishFlavor function. Get the index of the first English flavor text
    const flavorIndex = englishFlavor(flavor.flavor_text_entries);
    const pokemonFlavor = flavor.flavor_text_entries[flavorIndex].flavor_text
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
});
const englishFlavor = (flavor) => {
    return flavor.findIndex((entry) => entry.language.name == "en");
};
const showPokemon = (pokemon) => {
    let output = `
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
if (entryId) {
    getPokemon(entryId);
}
else {
    getPokemon(entryName);
}
const returnHome = () => {
    window.location.href = `./index.html`;
};
