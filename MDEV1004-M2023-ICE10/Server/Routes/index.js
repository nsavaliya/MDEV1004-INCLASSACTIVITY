"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
/* Get the movie Controller */
var movie_1 = require("../Controllers/movie");
var stripe_1 = require("../Controllers/stripe");
/* GET /api/movies - display the movie list */
router.get('/', function (req, res, next) {
    (0, movie_1.DisplayMovieList)(req, res, next);
});
/* GET /api/movies/:id - display a movie by id */
router.get('/:id', function (req, res, next) {
    (0, movie_1.DisplayMovieByID)(req, res, next);
});
/* POST /api/movies - add a new movie */
router.post('/', function (req, res, next) {
    (0, movie_1.AddMovie)(req, res, next);
});
/* PUT /api/movies/:id - update a movie by id */
router.put('/:id', function (req, res, next) {
    (0, movie_1.UpdateMovie)(req, res, next);
});
/* GET /api/movies/:id - delete a movie by id */
router.delete('/:id', function (req, res, next) {
    (0, movie_1.DeleteMovie)(req, res, next);
});
/* POST /api/payment - process payment */
router.post('/payment', function (req, res, next) {
    (0, stripe_1.CreatePaymentIntent)(req, res, next);
});
exports.default = router;
