const express = require('express');
const router = express.Router();

const movieController = require('../controllers/manageMovies');

router.get('/', (req, res) => res.send('you are ready to use the api'));

router.get('/movie/detail/:id', movieController.getMovieDetail);

router.get('/movies', movieController.getAllMovies);

router.get('/movies/attribute', movieController.getMoviesByAttribute);

router.get('/movies/title/:searchString', movieController.getMoviesByTitle);

module.exports = router;
