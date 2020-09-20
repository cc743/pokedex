//modified pokemonList to be an array with  objects created inside said array
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,  //note: height is in m(meters)
      types: ['grass', 'poison']
    },

    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying']
    },

    {
      name: 'Psyduck',
      height: 0.8,
      types: ['water']
    },

    {
      name: 'Pidgeot',
      height: 1.5,
      types: ['flying', 'normal']
    }
  ]

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //returning an object with the public functions *getAll* and *add* as the object keys
  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());  //check it in console

//defining strings for use in for loop
let string1 = ' (height:';
let string2 = ')';

let pokRepoVar = pokemonRepository.getAll();  //this variable is the list of Pokemon, for easier readability in the next line of code

//repurposing original for() loop into forEach() loop
pokRepoVar.forEach(function(pokemon) {
  document.write(pokemon.name + string1 + pokemon.height + string2);
  if (pokemon.height > 0.9)
    document.write(" -- This pokemon is tall.");

  document.write("<br />"); //inclusion of a line break for the website
})

//old code - will remove in next task
// for (let i = 0; i < pokemonList.length; i++){
//   document.write(pokemonList[i].name + string1 + pokemonList[i].height + string2);
//   if (pokemonList[i].height > 0.9)
//   document.write(" -- This pokemon is tall.")
//
//   document.write("<br />");  //inclusion of a line break for the website
// }
