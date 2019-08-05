require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:

// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`