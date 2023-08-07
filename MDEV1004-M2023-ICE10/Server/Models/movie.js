"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Movie Schema - defines the structure of a movie using the Movie Interface
var movieSchema = new mongoose_1.Schema({
    movieID: String,
    title: String,
    studio: String,
    genres: [String],
    directors: [String],
    writers: [String],
    actors: [String],
    year: Number,
    length: Number,
    shortDescription: String,
    mpaRating: String,
    criticsRating: Number
});
var Movie = (0, mongoose_1.model)('Movie', movieSchema);
exports.default = Movie;
