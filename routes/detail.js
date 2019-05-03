const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/Movies");

router.get("/detail", (req, res)=> {
    
    var objectId = mongoose.Types.ObjectId(req.query.id);
    console.log(req.query.id)
    Movie.find({_id: objectId}, (err, result)=> {
        console.log("detail to be displayed________:"+result)
        
        res.render("detail", {movies: result[0]})
    })
})

router.post("/detail", (req, res)=>{
    var updObj = {
        _id: req.body._id,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    }
    Movie.updateOne({_id: updObj._id}, updObj, (err)=>{
        if(err) console.log("here comes error to bring you terror")
        else console.log("updated");
    })
})


module.exports = router;
/*
const Detail = require("../routes/detail");
*/