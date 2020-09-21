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

  function addListItem(pokemon){
    //note: for now, first variable is named pokemonListt (2 t's) in order to avoid confusion with variable pokemonList up above in pokemonRepository
    let pokemonListt = document.querySelector(".pokemon-list"); //note: there is a dot in front of "pokemon-list" because we are referring to a class in the HTML file.  I think a class is a reference to an element in the HTML file: in our case, an unordered list
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");  //button-class - this is named after the class created in the .css file (for styling the button)
    pokemonListItem.appendChild(button);
    pokemonListt.appendChild(pokemonListItem);
    //note: this code was cut and paste from code we wrote in the forEach() loop down below
    button.addEventListener("click", showDetails);  //see 3 lines below: 'showDetails' is the event handler function created herein used as the second parameter of 'addEventListener'
  }

  function showDetails(pokemon){  //this right here is where I define the EVENT HANDLER FUNCTION 'showDetails'. It is used 3 lines above
    console.log(pokemon);  //I am not sure what data is being logged here.  I am expecting the name/height/type of the pokemon to be logged.
  }

  //returning an object with the public functions *getAll* and *add* as the object keys. ADDENDUM: added *addListItem*.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

//defining strings for use in for loop
let string1 = ' (height:';
let string2 = ')';

let pokRepoVar = pokemonRepository.getAll();  //this variable is the list of Pokemon, for easier readability in the next line of code

//repurposing original for() loop into forEach() loop
pokRepoVar.forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})
