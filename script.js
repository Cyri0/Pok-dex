let img_holder = document.getElementById('img_holder')
let name = document.getElementById('name')
let pokemon_picker = document.getElementById('pokemons')
let types = document.getElementById('types')

let loadPokemons = () => {
    all_pokemon_url = "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0"
    fetch(all_pokemon_url)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            pokemon_picker.innerHTML += `<option value="${element.url}">${element.name}</option>`
        })
    });
}

let loadPokemonData = (stats) => {
    stats.forEach(stat => {
        let attribute = document.getElementById(stat.stat.name)
        let value = stat.base_stat
        attribute.setAttribute('aria-valuenow', value)
        attribute.style.width = `${value/(300/100)}%`
        attribute.innerHTML = value
    })
}

let loadPokemonTypes = (types) => {
    types.innerHTML = ""

    types.forEach(t =>{
        console.log(t.type)
        types.innerHTML += `<li class="${t.type.name}">${t.type.name}</li>`
    })
}

let setPokemonName = (actual_name)=>{
    name.innerHTML = actual_name
}

let setPokemonImage = (image)=>{
    img_holder.innerHTML = `<img src="${image}">`
}

let loadActualPokemon = () => {
    let url = pokemon_picker.value

    fetch(url)
    .then(response => response.json())
    .then(data => {
        setPokemonImage(data.sprites.front_default)
        setPokemonName(data.name)
        loadPokemonData(data.stats)
        loatPokemonTypes(data.types)
    })
}
loadPokemons()
setTimeout(() => { loadActualPokemon() }, 500);
