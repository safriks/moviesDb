const User = require("../models/Users");

const express = require("express")
const router = express()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
//-----------Copypasted below-------------
router.get("/user/signup", (req, res)=> {
    res.render("signup")
})

router.post("/user/signup", (req, res)=> {
    let newUser = {
        username: req.body.username,
        email: req.body.email,
    }
    debugger
    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0) {
                res.send("user already exists")
            } else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    debugger
                    if(err) throw new Error("hashing error")
                    else {
                        newUser.password = hash
                        User.create(newUser)
                        .then((user)=> {
                            res.send(`<a href="/user/login">User created!  <button>Go To Login</button></a>`)
                        })
                    }
                  });
            }
        })
        .catch((err)=> {
            res.status(500).send("An error occured")
        })

})

router.get("/user/login", (req, res)=> {
    res.render("login")
})

router.get("/user/logout", (req, res)=> {
    res.clearCookie("loggedIn")
    res.redirect("/user/login")
})

router.post("/user/login", (req, res)=> {
    debugger
    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password, function(err, equal) {
                    // res == true
                    debugger
                    if(equal) {
                        res.cookie("loggedIn", "true", {signed: true})
                        res.send("logged in")
                    }
                    else {
                        res.send("Invalid credentials")
                    }
                })
            } else {
                res.send("Invalid credentials")
            }

        })
        .catch((err)=> {
            res.status(500).send("an error occured")
        })
})
module.exports = router;
/*
const User = require("../routes/user");
*/