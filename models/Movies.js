const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String },
    year: { type: String },
    director: {type: String },
    duration: {type: String},
    genre: {type: Array},
    cast: [{type: mongoose.Schema.Types.ObjectId, ref:"celebrities"}]

  })

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;

/*
const Movie = require("../models/Movies");
*/