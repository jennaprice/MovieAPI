const express = require('express');
const router = express.Router();

const movieController = require('../controllers/manageMovies');
const actorController = require('../controllers/manageActors');

router.get('/', (req, res) => res.send('you are ready to use the api'));

router.get('/movies', movieController.getAllMovies);

router.get('/movies/attribute', movieController.getMoviesByAttribute);

router.get('/movies/:id', movieController.getMovieDetail);

router.get('/movies/:id/actors', actorController.getActorsByFilm);

router.get('/movies/title/:searchString', movieController.getMoviesByTitle);

module.exports = router;
