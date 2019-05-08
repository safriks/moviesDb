const express = require("express")
const router = express.Router();
const Celebs = require("../models/Celebs");
const Movie = require("../models/Movies");


router.get("/celebrities", (req, res)=> {
    Celebs
    .find({}, (err, result)=> {
        console.log("CHECK[0](of all celebs.seen_in[0])", result[0].first_name, result[0].seen_in[0])})
    .populate("seen_in")
    .then((result)=>
        res.render("celebrities", {celebrities: result}))
    .catch((err)=>{
        console.log("error in router.get/celebrities; err:"+err)})

});
/*/------------------------ 
router.get("/celebrities/connect_random", (req, res)=> {
    var upd = 0;
    Celebs.find({}, (err, celebs)=> {
        Movie.find({}, (err, movies)=>{
            for (let i=0; i<movies.length; i++){
                newcast = celebs[Math.floor(Math.random()*celebs.length)]._id;
                Movie.update(
                    {_id: movies[i]._id },
                    {$push:{cast: newcast}}
                )
                Celebs.update(
                    {id: newcast},
                    {$push:{seen_in: movies[i]._id}}
                )
                upd++;
            }
        })
    })
    console.log("connecting random..."+upd+"cast id's");
    res.render("randomconnected", {});

});
//----------------------/*/
router.get("/celebrities/connect_random", (req, res)=> {
    var upd = 0;
    Celebs.find({})
    .then((celebs)=> {
        Movie.find({})
        .then((movies)=>{
            for (let i=0; i<movies.length; i++){
                newcast = celebs[Math.floor(Math.random()*celebs.length)]._id;
                newfilm = movies[i]._id;
                if (connectBothAndCheckItTooJustToBeAbsolutelySure(newfilm,newcast)) upd++;
            }
            console.log("connecting random..."+upd+"cast id's");
            res.render("randomconnected", {});        
        })
    })
    .catch((err)=>{
        console.log("an error while adding connections. message:"+err);
    })
});
//-----------------------
function connectBothAndCheckItTooJustToBeAbsolutelySure (movID, celID){
    Movie.updateOne(
        {_id: movID },
        {$push:{cast: celID}}
    ).then(()=>{
        Movie.find({_id: movID}, (err, result)=> {
            if (!result[0].cast.includes(celID)){
                throw new Error("failed to add cel id in mov")
            }
        }) 
    })
    .catch((err)=>{console.log(err)})
    Celebs.updateOne(
        {_id: celID},
        {$push:{seen_in: movID}}
    ).then(()=>{
        Celebs.find({_id: celID}, (err, result)=> {
            if (!result[0].seen_in.includes(movID)){
                throw new Error("failed to add mov id in cel")
            }
        }) 
    })
    .catch((err)=>{console.log(err)})
}

module.exports = router;
