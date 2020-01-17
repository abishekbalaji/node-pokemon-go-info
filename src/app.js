const path = require("path");
const express = require("express");
const hbs = require("hbs");
const unirest = require("unirest");
const getPokemonInfo = require("./utils/pokemon");

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

//Setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/pokemon_info", (req, res) => {
  const pokemon = req.query.pokemon;
  if (!pokemon) {
    return res.send({ error: "Enter a pokemon name!" });
  }
  getPokemonInfo(
    pokemon,
    (
      error,
      { pokemon_name, pokemon_id, base_attack, base_defense, base_stamina } = {}
    ) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        name: pokemon_name,
        id: pokemon_id,
        base_attack,
        base_defense,
        base_stamina
      });
    }
  );
});

app.get("*", (req, res) => {
  res.send("404 Page not found");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
