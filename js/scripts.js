let bulbasaur = {
  name: 'Bulbasaur',
  height: 0.7,  //note: height is in m(meters)
  types: ['grass', 'poison']
};

let charizard = {
  name: 'Charizard',
  height: 1.7,
  types: ['fire', 'flying']
};

let psyduck = {
  name: 'Psyduck',
  height: 0.8,
  types: ['water']
}

let pidgeot = {
  name: 'Pidgeot',
  height: 1.5,
  types: ['flying', 'normal']
}

let pokemonList = [bulbasaur, charizard, psyduck, pidgeot];
let string1 = ' (height:'
let string2 = ')'

for (let i = 0; i < pokemonList.length; i++){
  document.write(pokemonList[i].name + string1 + pokemonList[i].height + string2);
  if (pokemonList[i].height > 0.9)
  document.write(" -- This pokemon is tall.")

  document.write("<br />");
}
