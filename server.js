var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

//Arbitrary ID manager since we don't use a database
var index = 5;

// Initializing Destinations Array.. It will behave like a dummy database 
var destinations = [{
    "id": 1,
    "city": "Eldoret",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "country" : "Kenya"
}, {
    "id": 2,
    "city": "Lagos",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "country" : "Nigeria"
}, {
    "id": 3,
    "city": "Washington DC",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "country" : "USA"
}, {
    "id": 4,
    "city": "Nairobi",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "country" : "Kenya"
}, {
    "id": 5,
    "city": "Tokyo",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "country" : "Japan"
}, {
    "id": 6,
    "city": "London",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "country" : "England"
}]

// A promo message to user 
var message = "Black Friday! Get 50% cachback on saving your first spot.";

app.get('/messages', function (req, res) {
    res.end(JSON.stringify(message));
})

// Get the list of destinations, convert it to JSON and send it back to client 
app.get('/destination', function (req, res) {
    var count = req.query.count != undefined ? req.query.count : req.query.count = 100;
    if(req.query.country){
        var countrySpots = destinations.filter(function(destination) {
            return destination.country == req.query.country
        });
        res.end(JSON.stringify(countrySpots.slice(0, count)));
    }
    
    res.end(JSON.stringify(destinations.slice(0, count)));
})

// Get one particular Destination using ID 
app.get('/destination/:id', function (req, res) {
    for (var i = 0; i < destinations.length; i++) {
        if(destinations[i].id == req.params.id){
            res.end(JSON.stringify(destinations[i]));
        }
    }
})

// Create a new Destination and add it to existing Destinations list 
app.post('/destination', function (req, res) {
    var newDestination = {
        "city": req.body.city,
        "description": req.body.description,
        "country" : req.body.country,
        "id": index + 1
    }

    index++;

    destinations.push(newDestination);
    res.status(201).end(JSON.stringify(newDestination));
})

// Update a Destination 
app.put('/destination/:id', function (req, res) {
    var destination;
    for (var i = 0; i < destinations.length; i++) {
        if(destinations[i].id == req.params.id){
            destinations[i].city = req.body.city;
            destinations[i].country = req.body.country;
            destinations[i].description = req.body.description;
            destination = destinations[i];
        }
    }

    res.end(JSON.stringify(destination));
})

// Delete a Destination 
app.delete('/destination/:id', function (req, res) {
    for (var i = 0; i < destinations.length; i++) {
        if(destinations[i].id == req.params.id){
            destinations.splice(i, 1);
            res.status(204).end(JSON.stringify(destinations[i]));
        }
    }
});

// Home Page 
app.get('/', (req, res) => res.send('Welcome! You are all set to go!'))

// Configure server 
var server = app.listen(9000, '127.0.0.1', function (req, res) {

    var host = server.address().address
    var port = server.address().port

    console.log(`Server running at http://${host}:${port}/`);
})