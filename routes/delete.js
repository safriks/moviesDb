const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/Movies");

router.get("/delete", (req,res)=>{
    var objectId = mongoose.Types.ObjectId(req.query.id);
    console.log(req.query.id)
    Movie.deleteOne({_id: objectId}, (err)=>{
        if(err) console.log("here comes error to bring you terror")
        else res.redirect("/");
    })
})

module.exports = router;

/*
const Delete = require("../routes/delete");
*/