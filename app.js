const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require('hbs');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("super secret"));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/imdb', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected to movies db")
    else console.log("ERROR:", err)
})

// mongoose.connect('mongodb://localhost/famousPeeps', {useNewUrlParser: true}, (err)=> {
//     if(!err)console.log("connected to celebs db")
//     else console.log("ERROR:", err)
// })

const deleteRoute = require("./routes/delete");
const indexRoute = require("./routes/index");
const detailRoute = require("./routes/detail");
const movieRoute = require("./routes/movie");
const celebritiesRoute = require("./routes/celebrities");
const userRoute = require("./routes/user");


app.use("/", indexRoute);
app.use("/", userRoute);
app.use("/",bouncer, deleteRoute);
app.use("/",bouncer, detailRoute);
app.use("/",bouncer, movieRoute);
app.use("/",bouncer, celebritiesRoute);

function bouncer(req, res, next) {
    if(req.signedCookies.loggedIn === "true") next()
    else res.send(`<a href="/">Who are you? Go away!<button>Go Home</button></a>`)
}


const port = 3001;
app.listen(port, ()=> {
    console.log(`listeneing on port ${port}.....`)
})