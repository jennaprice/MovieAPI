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
    if (!/[^A-Za-z0-9]/.test(req.params.searchString))
      throw `${req.params.searchString} can only contain letters and numbers`;
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
    if (!constants.validAttributes.includes(req.query.type)) {
      throw {
        status: 404,
        message: 'invalid attribute',
        detail: `not a valid attribute, must be one of these ${
          constants.validAttributes
        }`
      };
    }

    switch (req.query.type) {
      case 'category':
        if (!constants.validCategory.includes(req.query.category)) {
          throw {
            status: 404,
            message: 'invalid category',
            detail: `not a valid category, must be one of these ${
              constants.validCategory
            }`
          };
        }

        exportMovies = await getMoviesByCategory(req.query.category);

        break;
      case 'rating':
        if (!constants.validRating.includes(req.query.rating)) {
          throw {
            status: 404,
            message: 'invalid rating',
            detail: `not a valid rating, must be one of these ${
              constants.validRating
            }`
          };
        }
        exportMovies = await getMoviesByRating(req.query.rating);
        break;
      default:
        throw {
          status: 500,
          message: `request failed`,
          detail: `searching ${req.query.type} not yet supported`
        };
    }
  } catch (error) {
    console.log(`get by attribute ${error}`);
    res.json(error);
  }
  res.json({
    status: 200,
    message: 'success',
    detail: 'retrieval sucessful',
    exportMovies
  });
}

async function getMoviesByCategory(category) {
  let data = [];
  try {
    let categoryName = await sql.category.findOne({
      where: { name: category }
    });

    moviesByCategory = await sql.film_category.findAll({
      where: { category_id: categoryName.category_id },
      include: [
        {
          model: sql.film
        }
      ]
    });

    for (movie of moviesByCategory) {
      movie = movie.get({ plain: true });
      delete movie.category_id;
      movie.category = category;
      movie = await exportData(movie);
      data.push(movie);
    }
  } catch (error) {
    throw error;
  }
  return data;
}

async function getMoviesByRating(rating) {
  let data = [];
  try {
    moviesByRating = await sql.film.findAll({
      where: { rating: rating }
    });

    for (movie of moviesByRating) {
      movie = movie.get({ plain: true });
      movie = await exportData(movie);

      data.push(movie);
    }
  } catch (error) {
    console.log(`getting movies by rating ${error}`);
    throw {
      status: 500,
      message: `server failed`,
      detail: `cannot retrieve movies by rating`
    };
  }
  return data;
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
