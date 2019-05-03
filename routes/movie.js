const express = require("express")
const router = express.Router();
const Movie = require("../models/Movies");


router.get("/movie", (req, res)=> {
    res.render("addmovie")
})

router.post("/movie", (req, res)=> {

    let newMovie = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    }
    console.log(newMovie)
    Movie.create(newMovie, (err)=> {
        if(err) res.send("ERROR")
        else res.redirect(`/?search=${req.body.title}`)
    })
})

module.exports = router;
/*
const Movie = require("../routes/movie");
*/