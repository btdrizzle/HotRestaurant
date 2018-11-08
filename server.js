// Dependencies
// =============================================================
const express = require("express");
const reservations = require('./hotrestaurant');
const waitList = require('./hotrestaurant');
const path = require('path');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Server Listens on this port!!
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
//HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});
app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
});
//Routes to get all data of each list
//Entire reservations list
app.get("/api/reserved", function(req, res) {
    return res.json(reservations);
});
//Entire waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});
//Search for specific reservation
//app.get("/api/", function(req,res) {

//})
//Post routes to post data
app.post('/api/reservetable', function(req,res) {
    const newTable = req.body;
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);

    //Push to either reservations or wait list
    if(reservations[4]) {
        reservations.waitList.push(newTable);
        res.json(newTable);
    }else{
        reservations.reservations.push(newTable);
        res.json(newTable);
    }
});
