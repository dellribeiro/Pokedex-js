

const pokeApi = {}

function convertPokeApiToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetail) => pokemonDetail)
        .catch((error) => console.log(error))
}

pokeApi.getSinglePokemonDetail = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((pokemonDetail) => pokeApi.getPokemonDetail(pokemonDetail))
        .catch((error) => console.log(error));
}
