const sql = require('../data/sql');
const _ = require('lodash');
const constants = require('../util/constants');

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
      movie = await exportMovie(movie);

      exportMovies.push(movie);
    }
  } catch (error) {
    console.log(`get all movies error ${error}`);
    throw {
      status: 500,
      message: `request failed`,
      detail: `internal service error`
    };
  }
  res.json({
    status: 200,
    message: 'Success',
    detail: ' retrieval sucessful',
    exportMovies
  });
}

async function getMoviesByTitle(req, res) {
  let exportMovie;
  try {
    if (_.isNil(req.query.params)) {
      throw {
        status: 401,
        message: `no title `,
        detail: `title must be provided as a query parameter`
      };
    }

    let movies = await sql.films.findAll({
      where: { title: { $like: `%${req.query.param}$` } }
    });
  } catch (error) {
    console.log(`get all movies error ${error}`);
    throw {
      status: 500,
      message: `request failed`,
      detail: `internal service error`
    };
  }
  res.json({
    status: 200,
    message: 'Success',
    detail: ' retrieval sucessful',
    exportMovie
  });
}

async function getMoviesByAttribute() {
  try {
    res.json({
      status: 200,
      message: 'Success',
      detail: ' retrieval sucessful',
      exportData
    });
  } catch (error) {
    console.log(`get all movies error ${error}`);
    throw {
      status: 500,
      message: `request failed`,
      detail: `internal service error`
    };
  }
}

async function getMovieDetail(req, res) {
  try {
    if (_.isNull(req.params.attribute)) {
      throw {
        status: 401,
        message: `missing required attribute`,
        detail: ` missing attribute paramater for searching`
      };
    } else if (!constants.validAttributes.includes(req.params.attribute)) {
      throw {
        status: 401,
        message: ` attribute not valid`,
        detail: ` attribute paramater for searching must be on of the valid types ${
          constants.validAttributes
        }`
      };
    }

    res.json({
      status: 200,
      message: 'Success',
      detail: ' retrieval sucessful',
      exportData
    });
  } catch (error) {
    console.log(`get all movies error ${error}`);
    throw {
      status: 500,
      message: `request failed`,
      detail: `internal service error`
    };
  }
}
async function exportMovie(data) {
  delete movie.language_id;
  delete movie.original_language_id;
  return data;
}
module.exports = {
  getAllMovies,
  getMovieDetail,
  getMoviesByAttribute,
  getMoviesByTitle
};
