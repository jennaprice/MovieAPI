const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(module.filename);

const sequelize = new Sequelize('sakila', 'sakila', 'sakila', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false, // disable aliases
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const db = {};

const models = path.join(__dirname, 'models');

fs.readdirSync(models)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file.endsWith('.js');
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(models, file));
    db[model.name] = model;
  });

db.film.belongsTo(db.language, {
  as: 'language',
  foreignKey: 'language_id',
  targetKey: 'language_id'
});

db.film.belongsTo(db.language, {
  as: 'originalLanguage',
  foreignKey: 'original_language_id',
  targetKey: 'language_id'
});

db.film_category.belongsTo(db.category, {
  foreignKey: 'category_id',
  targetKey: 'category_id'
});

db.category.hasMany(db.film_category, {
  foreignKey: 'category_id',
  targetKey: 'category_id'
});

db.film_category.hasOne(db.film, {
  foreignKey: 'film_id',
  targetKey: 'film_id'
});
db.film.belongsTo(db.film_category, {
  foreignKey: 'film_id',
  targetKey: 'film_id'
});

db.film_actor.hasMany(db.actor);

db.payment.belongsTo(db.customer);
db.customer.hasOne(db.payment);
db.customer.hasOne(db.staff);
db.customer.hasOne(db.rental);

db.rental.belongsTo(db.inventory);
db.inventory.hasMany(db.rental);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
