require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require('moment');
var axios = require("axios")


var appCommand = process.argv[2];

var userInput = process.argv[3];

function runLiri(appCommand, userInput) {
    switch (appCommand) {
        // * `concert-this`
        case "concert-this":
            getBandsInTown(userInput);
            break;

        // * `spotify-this-song`
        case "spotify-this-song":
            getSpotify(userInput);
            break;

        // * `movie-this`
        case "movie-this":
            getOMDB(userInput);
            break;

        // * `do-what-it-says`
        case "do-what-it-says":
            getRandom(userInput);
            break;

        default:
            console.log("please enter one of the following commands: `concert-this` `spotify-this-song` `movie-this` `do-what-it-says`")
    }
};
function getSpotify(songName) {

    var spotify = new Spotify(keys.spotify);
    if (!songName) {
        songName = "My Girl";
    };

    spotify.search({ type: "track", query: songName }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        console.log("+================================+")

        console.log("Artist name: " + data.tracks.items[0].album.artists[0].name + "\r\n");

        console.log("Song Name: " + data.tracks.items[0].name + "\r\n");

        console.log("Song preview link: " + data.tracks.items[0].href + "\r\n");

        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

        var logSong = "======Begin Spotify Log Entry======" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\n Preview Link: " + data.tracks.items[0].href + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n======End Spotify Log Entry======" + "\n";

        fs.appendFile("random.txt", logSong, function (err) {
            if (err) throw err;
        });
    });
};

runLiri(appCommand, userInput);
