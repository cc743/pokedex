//modified pokemonList to be an array with  objects created inside said array
let pokemonRepository = (function() {
  //start of an IIFE (immediately invoked function expression)

  let pokemonList = []; //empty array
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; //the URL of the Pokemon API

  function add(pokemon) {
    pokemonList.push(pokemon); //add a new pokemon item to the array
  }

  function getAll() {
    return pokemonList; //returns the pokemonList array
  }

  function addListItem(pokemon) {
    //note: for now, first variable is named pokemonListt (2 t's) in order to avoid confusion with variable pokemonList up above in pokemonRepository
    let pokemonListt = $('.pokemon-list'); //selecting the "pokemon-list" unordered list via jQuery means;
    let pokemonListItem = $('<li></li>');
    let button = $('<button>' + pokemon.name + '</button>');
    button.addClass('btn-primary');
    button.attr('data-toggle', 'modal'); //this works with Bootstrap to open the modal when pokemon name is clicked
    button.attr('data-target', '#pokemonModal');
    pokemonListItem.append(button);
    pokemonListt.append(pokemonListItem);

    //this listens for the user to click on a pokemon button on the site, then runs the showDetails() function
    button.on('click', e => {
      //this concept is called a callback function. (e) is a shorthand reference for event
      showDetails(pokemon);
    }); //see 3 lines below: 'showDetails' is the event handler function created herein used as the second parameter of 'addEventListener'
  }

  //this right here is where I define the EVENT HANDLER FUNCTION 'showDetails'. It is used 3 lines above
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon); //another function is called to run the modal in the browser, inspired by recent student submission (Trevor A.) and the lesson's video on Bootstrap modals
    });
  }

  function loadList() {
    //loadList function
    return fetch(apiUrl)
      .then(function(response) {
        //fetches data from apiUrl (defined above)...
        return response.json(); //...then, returns the response/data in json format
      })
      .then(function(json) {
        //...then, executes this function
        json.results.forEach(function(item) {
          //for each loop which takes in an item parameter
          let pokemon = {
            //creates an object for the pokemon
            name: item.name, //name key is given the value of the pokemon item's name
            detailsUrl: item.url //detailsUrl key is given the value of the url of the pokemon item (abilities, base points, etc.)
          };
          add(pokemon); //adds in the pokemon
        });
      })
      .catch(function(e) {
        //checks if the data is not in json format (i think)
        console.error(e); //logs an error message
      });
  }

  function loadDetails(item) {
    //loadDetails function, parameter=item
    let url = item.detailsUrl; //item = detailsUrl of the item here
    return fetch(url)
      .then(function(response) {
        //fetches url (detailsUrl)...
        return response.json(); //...then, returns the response in json format
      })
      .then(function(details) {
        //...then, executes this function
        //Now we add the details to the item
        item.imageUrl = details.sprites.front_default; //image url.  within the details, there is a sprite image here
        item.height = details.height; //height
        item.types = details.types; //types
      })
      .catch(function(e) {
        //checks for errors
        console.error(e); //logs an error message
      });
  }

  //returning an object with the public functions *getAll* and *add* as the object keys. ADDENDUM: added *addListItem*. ADDENDUM: added *loadList* and *loadDetails*
  return {
    add: add,
    getAll: getAll,
    showModal: showModal,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
})(); //note the end of this function })() -- this indicates an IIFE

pokemonRepository.loadList().then(function() {
  //from the IIFE(pokemonRepository), executes loadList, then executes this function...
  pokemonRepository.getAll().forEach(function(pokemon) {
    //Now the data is loaded! (comment from Lesson 1.7)
    pokemonRepository.addListItem(pokemon);
  });
});
//////////////////////////////////////////////////////////////////////
//showModal() function defined here...thanks to hoisting and scoping//
function showModal(pokemon) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $('<h1>' + pokemon.name + '</h1>');

  let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

  let imageElement = $('<img class=\'modal-img\' style=\'width:50%\'>');
  imageElement.attr('src', pokemon.imageUrl);

  //appends the children to their parent containers
  modalTitle.append(nameElement);
  modalBody.append(heightElement);
  modalBody.append(imageElement);
}
