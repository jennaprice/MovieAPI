const sql = require('../data/sql');
const _ = require('lodash');
const constants = require('../util/constants');
const Sequilize = require('sequelize');
const Op = Sequilize.Op;

async function getAllMovies(req, res) {
  let exportMovies = [];
  try {
    let movies = await sql.film.findAll({
      include: [
        {
          model: sql.language,
          as: 'originalLanguage',
          attributes: ['name']
        },
        {
          model: sql.language,
          as: 'language',
          attributes: ['name']
        }
      ]
    });

    for (movie of movies) {
      movie = movie.get({ plain: true });
      movie = await exportData(movie);

      exportMovies.push(movie);
    }
  } catch (error) {
    console.log(`get all movies error ${error}`);
    res.json({
      status: 500,
      message: 'request failed',
      detail: 'internal server'
    });
  }
  res.json({
    status: 200,
    message: 'success',
    detail: 'retrieval sucessful',
    exportMovies
  });
}

async function getMovieDetail(req, res) {
  console.log('here', req.params.id);

  let exportMovie;
  try {
    let movie = await sql.film.findOne({
      where: { film_id: req.params.id },
      include: [
        {
          model: sql.language,
          as: 'originalLanguage',
          attributes: ['name']
        },
        {
          model: sql.language,
          as: 'language',
          attributes: ['name']
        }
      ]
    });

    if (_.isNil(movie)) {
      throw `movie ${req.params.id} is not a valid id`;
    }

    movie = movie.get({ plain: true });

    let movieCategory = await sql.film_category.findOne({
      where: { film_id: req.params.id },
      include: [
        {
          model: sql.category,
          attributes: ['name']
        }
      ]
    });

    movie.category = movieCategory.get({ plain: true }).category.name;

    exportMovie = await exportData(movie);
    console.log('total', exportMovie);
  } catch (error) {
    console.log(`get movie by id error ${error}`);
    res.json({
      status: 500,
      message: 'request failed',
      detail: 'internal server'
    });
  }

  res.json({
    status: 200,
    message: 'success',
    detail: 'retrieval successful',
    exportMovie
  });
}

async function getMoviesByTitle(req, res) {
  let exportMovies = [];
  try {
    if (_.isNil(req.params.searchString)) {
      res.json({
        status: 401,
        message: `no title `,
        detail: `title must be provided as a query parameter`
      });
    }

    let movies = await sql.film.findAll({
      where: {
        title: { [Op.like]: `%${req.params.searchString}%` }
      },
      include: [
        {
          model: sql.language,
          as: 'originalLanguage',
          attributes: ['name']
        },
        {
          model: sql.language,
          as: 'language',
          attributes: ['name']
        }
      ]
    });

    for (movie of movies) {
      movie = movie.get({ plain: true });
      movie = await exportData(movie);

      exportMovies.push(movie);
    }
  } catch (error) {
    console.log(`get all movies error ${error}`);
    res.json({
      status: 500,
      message: `request failed`,
      detail: `internal service error`
    });
  }
  res.json({
    status: 200,
    message: 'Success',
    detail: 'retrieval sucessful',
    exportMovies
  });
}

async function getMoviesByAttribute(req, res) {
  let exportMovies = [];
  try {
    console.log('query', req);
  } catch (error) {
    console.log(`get by attribute ${error}`);
    res.json({
      status: 500,
      message: `request failed`,
      detail: `internal service error`
    });
  }
  res.json({
    status: 200,
    message: 'Success',
    detail: ' retrieval sucessful',
    exportMovies
  });
}

async function exportData(data) {
  delete data.language_id;
  delete data.original_language_id;
  return data;
}
module.exports = {
  getAllMovies,
  getMovieDetail,
  getMoviesByAttribute,
  getMoviesByTitle
};
