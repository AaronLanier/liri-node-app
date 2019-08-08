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

        fs.appendFile("log.txt", logSong, function (err) {
            if (err) throw err;
        });
    });
};

function getOMDB(movie) {
   
    if (!movie) {
        movie = "Mr. Nobody";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    axios.request(movieQueryUrl).then(
        function (response) {
           
            console.log("=============================");
            console.log("* Title: " + response.data.Title + "\r\n");
            console.log("* Year Released: " + response.data.Year + "\r\n");
            console.log("* IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
            console.log("* Country Where Produced: " + response.data.Country + "\r\n");
            console.log("* Language: " + response.data.Language + "\r\n");
            console.log("* Plot: " + response.data.Plot + "\r\n");
            console.log("* Actors: " + response.data.Actors + "\r\n");
            
            
            var logMovie = "======Begin Movie Log Entry======" + "\nMovie title: " + response.data.Title + "\nYear released: " + response.data.Year + "\nIMDB rating: " + response.data.imdbRating + "\nRotten Tomatoes rating: " + response.data.Ratings[1].Value + "\nCountry where produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n======End Movie Log Entry======" + "\n";

            fs.appendFile("log.txt", logMovie, function (err) {
                if (err) throw err;
            });
            // console.log(response.data)
        });
};

function getBandsInTown(artist) {

    var artist = userInput;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandQueryURL).then(
        function (response) {
            console.log("=============================");
            console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");

            var logConcert = "======Begin Concert Log Entry======" + "\nName of the musician: " + artist + "\nName of the venue: " + response.data[0].venue.name + "\nVenue location: " + response.data[0].venue.city + "\n Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n======End Concert Log Entry======" + "\n";

            fs.appendFile("log.txt", logConcert, function (err) {
                if (err) throw err;
            })
            
            logResults(response.data)
            // console.log(response)
        })
        .catch
        (err=>{ console.log(err); });
};

function getRandom() {
    fs.readFile("log.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);

        } else {
            console.log(data);

            var randomData = data.split(",");
            runLiri(randomData[0], randomData[1]);
        }
        

    });
};


function logResults(data) {
fs.appendFile("log.txt", data, function (err) {
    if (err) throw err;
});
};
runLiri(appCommand, userInput);
