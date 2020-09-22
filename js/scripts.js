//modified pokemonList to be an array with  objects created inside said array
let pokemonRepository = (function () {
  let pokemonList = [];  //empty array
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  //the URL of the Pokemon API

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
    //note: this code above was cut and paste from code we wrote in the forEach() loop down below
    button.addEventListener("click", (e) => {   //this concept is called a callback function
      showDetails(pokemon);
    })  //see 3 lines below: 'showDetails' is the event handler function created herein used as the second parameter of 'addEventListener'
  }

  //this right here is where I define the EVENT HANDLER FUNCTION 'showDetails'. It is used 3 lines above
  function showDetails(pokemon){
    loadDetails(pokemon).then(function (){  // you can use existing showDetails() function to execute loadDetails().
      console.log(pokemon);  //logs the pokemon object
    });
  }

  function loadList(){  //loadList function
    return fetch(apiUrl).then(function (response){
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch (function (e){
      console.error(e);
    })
  }

  function loadDetails(item) {  //loadDetails function
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      //Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
    });
  }

  //returning an object with the public functions *getAll* and *add* as the object keys. ADDENDUM: added *addListItem*. ADDENDUM: added *loadList* and *loadDetails*
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
})();

pokemonRepository.loadList().then(function(){
  //Now the data is loaded! (comment from Lesson 1.7)
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//let pokRepoVar = pokemonRepository.getAll();  //this variable is the list of Pokemon, for easier readability in the next line of code

//repurposing original for() loop into forEach() loop
// pokRepoVar.forEach(function(pokemon){
//   pokemonRepository.addListItem(pokemon);
// })
