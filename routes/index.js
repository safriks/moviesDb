const express = require("express")
const router = express.Router();
const Movie = require("../models/Movies");


router.get("/", (req, res)=> {
    let searchQuery = req.query.search
    console.log("the search query is:"+searchQuery)
    if (searchQuery){  
        Movie.find({title: searchQuery}, (err, result)=> {
            console.log("CHECK[0]", result[0])
            res.render("index", {movies: result})
        })
    }
    else{
        Movie.find({}, (err, result)=> {
            console.log("CHECK[0](of all movies)", result[0])
            res.render("index", {movies: result})
        })
    }
})

module.exports = router;
/*
const Index = require("../routes/index");
*/