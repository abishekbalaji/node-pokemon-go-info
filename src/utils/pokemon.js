var unirest = require("unirest");

const getPokemonInfo = (pokemon, callback) => {
  const pokemonName = pokemon[0].toUpperCase() + pokemon.slice(1).toLowerCase();

  var req = unirest(
    "GET",
    "https://pokemon-go1.p.rapidapi.com/pokemon_stats.json"
  );

  req.headers({
    "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
    "x-rapidapi-key": "355d7b0e33mshd225e566d3a640bp1dd22cjsn0146ca6d8bba"
  });

  req.end(res => {
    if (res.error) {
      callback("Can't connect to the service!", undefined);
    } else {
      const pokemons = res.body;
      const pokemonData = pokemons.find(
        pokemon => pokemon.pokemon_name === pokemonName
      );
      if (pokemonData === undefined) {
        return callback("Incorrect pokemon name entered!", undefined);
      }
      callback(undefined, pokemonData);
    }
  });
};

module.exports = getPokemonInfo;
