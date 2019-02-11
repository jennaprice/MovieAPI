const sql = require('../data/sql');
const _ = require('lodash');
const constants = require('../util/constants');
const Sequilize = require('sequelize');
const Op = Sequilize.Op;

async function getActorsByFilm(req, res) {
  let exportActors = [];
  console.log('params', req.params.id);

  try {
    let actors = await sql.film_actor.findAll({
      where: { film_id: req.params.id },
      include: [
        {
          model: sql.actor,
          attributes: ['first_name', 'last_name']
        },
        {
          model: sql.film,
          attributes: ['title']
        }
      ]
    });
    for (actor of actors) {
      actor = actor.get({ plain: true });
      delete actor.actor_id;
      exportActors.push(actor);
    }
  } catch (error) {
    console.log(`all actors for a given film ${req.params.id}: ${error}`);
    res.json({
      status: 500,
      message: 'internal error',
      detail: 'server error',
      exportActors
    });
  }
  res.json({
    status: 200,
    message: 'Success',
    detail: ' retrieval sucessful',
    exportActors
  });
}

module.exports = {
  getActorsByFilm
};
