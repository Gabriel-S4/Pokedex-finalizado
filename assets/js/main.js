const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 4;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="teste(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const modal = document.getElementById('modal')

function teste(number){
    console.log(number)
    document.getElementById('backgroundModal').classList.value = ""

    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then((e) => e.json())
    .then((pokemon) => {

        console.log(pokemon)

        document.getElementById("tiposPokemon").innerHTML = ''
        document.getElementById("habilidadesPokemon").innerHTML = ''

        document.getElementById("idPokemon").innerHTML = "#" + pokemon.id
        document.getElementById("nomePokemon").innerHTML = pokemon.name
        pokemon.types.map((e) => {
            document.getElementById("tiposPokemon").innerHTML += e.type.name + ' '
            document.getElementById('backgroundModal').classList.add("modal")
            document.getElementById('backgroundModal').classList.add(pokemon.types[0].type.name)
        })
        pokemon.abilities.map((e) => {
            document.getElementById("habilidadesPokemon").innerHTML += e.ability.name + ' '
            console.log(e.ability.name)
        })
        document.getElementById("imagemPokemon").src = pokemon.sprites.other.dream_world.front_default
    })

    modal.classList.remove("hidden")
    modal.classList.add("visible")
}

function showhiddenModal(){
    modal.classList.add("hidden")
    modal.classList.remove("visible")
}