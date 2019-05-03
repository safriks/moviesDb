const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require('hbs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/imdb', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected to movies db")
    else console.log("ERROR:", err)
})

const deleteRoute = require("./routes/delete");
const indexRoute = require("./routes/index");
const detailRoute = require("./routes/detail");
const movieRoute = require("./routes/movie");

app.use("/", indexRoute);
app.use("/", deleteRoute);
app.use("/", detailRoute);
app.use("/", movieRoute);



app.listen(3001, ()=> {
    console.log("   !!!!!")
})