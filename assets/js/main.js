const pokemonLIst = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 8;
let offset = 0;

function loadPokemons(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="pokemon-${pokemon.number}" onclick="redirectToPokemonPage(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function redirectToPokemonPage(pokemonId) {
    window.location.href = `pokemon-page.html?pokemonId=${pokemonId}`;
}

function loadPokemonsGrid(offset, limit){
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(loadPokemons).join("");
            pokemonLIst.innerHTML += newHtml;
        })
}

loadMoreButton.addEventListener('click', () =>{
    offset += limit;

    const qtdRecord = offset + limit;
    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonsGrid(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else {
        loadPokemonsGrid(offset, limit);
    }
})


loadPokemonsGrid(offset, limit);

