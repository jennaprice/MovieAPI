/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('film_text', {
    film_id: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'film_text'
  });
};
