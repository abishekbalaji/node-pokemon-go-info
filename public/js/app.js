const name = $("#name");
const id = $("#pokemon_id");
const attack = $("#attack");
const defence = $("#defence");
const stamina = $("#stamina");

$("form").on("submit", e => {
  e.preventDefault();
  name.text("Loading...");
  id.text("");
  attack.text("");
  defence.text("");
  stamina.text("");
  const pokemon = $("input").val();
  const url = "/pokemon_info?pokemon=" + encodeURIComponent(pokemon);
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        name.text(data.error);
      } else {
        name.text(data.name);
        id.text("ID: " + data.id);
        attack.text("Base attack: " + data.base_attack);
        defence.text("Base defence: " + data.base_defense);
        stamina.text("Base stamina: " + data.base_stamina);
      }
    });
  });
});
