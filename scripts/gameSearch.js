const ENDPOINT = 'https://www.cheapshark.com/api/1.0/'

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

async function fetchGameByName(name) {
  const response = await fetch(ENDPOINT + `games?title=${name}`);
  const json = await response.json();
  return json;
};

async function fetchGameByID(id) {
  const response = await fetch(ENDPOINT + `games?title=${id}`);
  const json = await response.json();
  return json;
};

async function insertGames(games) {
  games.forEach((game) => {
    // const gameElement = document.createElement('li');
    console.log(game.gameID);

  });
}

window.onload = async () => {
  const query = window.location.search.substring(1);
  const {title} = parse_query_string(query);
  const games = await fetchGameByName(title)
  insertGames(games);
};