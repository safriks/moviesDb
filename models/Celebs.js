const mongoose = require("mongoose");

const celebSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    birth_year: {type: String },
    profession: {type: String},
    worst_deed: {type: Array},
    seen_in: [{type: mongoose.Schema.Types.ObjectId, ref:"movies"}]
  })

const Celeb = mongoose.model('Celebrities', celebSchema);

module.exports = Celeb;

/*
const Movie = require("../models/Celebs");
*/
