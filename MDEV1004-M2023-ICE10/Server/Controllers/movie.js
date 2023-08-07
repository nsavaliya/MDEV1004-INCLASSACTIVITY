"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateMovie = exports.AddMovie = exports.DisplayMovieByID = exports.DisplayMovieList = void 0;
var movie_1 = require("../Models/movie");
/**
 * This function sanitizes the array of strings
 *
 * @param {string[]} unsanitizedArray
 * @returns {string[]}
 */
function SanitizeArray(unsanitizedArray) {
    var sanitizedArray = Array();
    for (var _i = 0, unsanitizedArray_1 = unsanitizedArray; _i < unsanitizedArray_1.length; _i++) {
        var unsanitizedString = unsanitizedArray_1[_i];
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}
/* API Functions */
/**
 * This function displays the Movie List
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function DisplayMovieList(req, res, next) {
    // Find all Movies in the Movie collection
    movie_1.default.find({})
        .then(function (data) {
        res.status(200).json({ success: true, msg: "Movie List Retrieved and Displayed", data: data });
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
/**
 * This function displays a single movie by the provided ID
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function DisplayMovieByID(req, res, next) {
    try {
        // Get the id from the url
        var id = req.params.id;
        // Find the Movie by id
        movie_1.default.findById({ _id: id })
            .then(function (data) {
            res.status(200).json({ success: true, msg: "Move Retrieved by ID", data: data });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch (_a) {
        res.json({ success: false, msg: "No Data to Display" });
    }
}
exports.DisplayMovieByID = DisplayMovieByID;
/**
 * This function adds a new movie to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function AddMovie(req, res, next) {
    try {
        // Sanitize the array
        var genres = SanitizeArray(req.body.genres.split(","));
        var directors = SanitizeArray(req.body.directors.split(","));
        var writers = SanitizeArray(req.body.writers.split(","));
        var actors = SanitizeArray(req.body.actors.split(","));
        // Instantiate a new Movie
        var movie_2 = new movie_1.default({
            movieID: req.body.movieID,
            title: req.body.title,
            studio: req.body.studio,
            genres: genres,
            directors: directors,
            writers: writers,
            actors: actors,
            length: req.body.length,
            year: req.body.year,
            shortDescription: req.body.shortDescription,
            mpaRating: req.body.mpaRating,
            criticsRating: req.body.criticsRating
        });
        // Create a new movie and pass it to the db
        movie_1.default.create(movie_2)
            .then(function () {
            res.status(200).json({ success: true, msg: "Movie Added Successfully", data: movie_2 });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch (_a) {
        res.json({ success: false, msg: "No Data to Add" });
    }
}
exports.AddMovie = AddMovie;
/**
 * This function removes a movie from the database by the provided ID
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function UpdateMovie(req, res, next) {
    try {
        // Get the id from the url  
        var id = req.params.id;
        // Sanitize the array
        var genres = SanitizeArray(req.body.genres.split(","));
        var directors = SanitizeArray(req.body.directors.split(","));
        var writers = SanitizeArray(req.body.writers.split(","));
        var actors = SanitizeArray(req.body.actors.split(","));
        // Instantiate a new Movie Object
        var movieToUpdate_1 = new movie_1.default({
            _id: id,
            movieID: req.body.movieID,
            title: req.body.title,
            studio: req.body.studio,
            genres: genres,
            directors: directors,
            writers: writers,
            actors: actors,
            length: req.body.length,
            year: req.body.year,
            shortDescription: req.body.shortDescription,
            mpaRating: req.body.mpaRating,
            criticsRating: req.body.criticsRating
        });
        // Find the Movie by id and then update
        movie_1.default.updateOne({ _id: id }, movieToUpdate_1)
            .then(function () {
            res.status(200).json({ success: true, msg: "Movie Updated Successfully", data: movieToUpdate_1 });
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch (_a) {
        res.json({ success: false, msg: "No Data to Update" });
    }
}
exports.UpdateMovie = UpdateMovie;
/**
 * This function removes a movie from the database by the provided ID
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function DeleteMovie(req, res, next) {
    try {
        // Get the id from the url
        var id_1 = req.params.id;
        // Find the Movie by id and then delete
        movie_1.default.deleteOne({ _id: id_1 })
            .then(function () {
            res.json(id_1);
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    catch (_a) {
        res.json({ success: false, msg: "No Data to Delete" });
    }
}
exports.DeleteMovie = DeleteMovie;
