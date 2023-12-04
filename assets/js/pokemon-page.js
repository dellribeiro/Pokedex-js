document.addEventListener('DOMContentLoaded', () => {
    const pokemonPage = document.getElementById('Page');
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('pokemonId');

    if (pokemonId) {
        getPokemon(pokemonId, pokemonPage);
    }
});

function getSpecies(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    
    return fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            const speciesWords = pokemon.genera[7].genus.split(' ');
            return speciesWords[0];
        })
        .catch(error => {
            console.error('Erro ao obter espécie do Pokémon:', error);
            throw error;
        });
}

function getPokemon(pokemonId, pokemonPage) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            const typesHtml = pokemon.types.map(typeSlot => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`).join('');
            const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');

            if (pokemonPage) {
                getSpecies(pokemonId)
                    .then(species => {
                        pokemonPage.innerHTML = `
                    <div class="presentation ${pokemon.types[0].type.name}">
                        <a href="./index.html">
                            <img src="assets/img/left-arrow.png" alt="voltar">
                        </a>
                        <ol class="pokemons">
                            <li class="pokemon">
                                <h1 class="name">${pokemon.name}</h1>
                                <span class="number">#${pokemon.id}</span>
                                <ol class="types">${typesHtml}</ol>
                                <div class="detail">
                                    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div class="atributos">
                        <table class="key-value-table">
                            <tr class="key-value-item">
                                <td class="key">Species:</td>
                                <td class="value">${species}</td>
                            </tr>
                            <tr class="key-value-item">
                                <td class="key">Height:</td>
                                <td class="value">${pokemon.height / 10}m</td>
                            </tr>
                            <tr class="key-value-item">
                                <td class="key">Weight:</td>
                                <td class="value">${pokemon.weight / 10}kg</td>
                            </tr>
                            <tr class="key-value-item">
                                <td class="key">Abilities:</td>
                                <td class="value">${abilities}</td>
                            </tr>
                        </table>
                    </div>
                     `;
                    })

            } else {
                console.error('Elemento "Page" não encontrado');
            }
        })
        .catch(error => console.error('Erro ao buscar detalhes do Pokémon:', error));
}