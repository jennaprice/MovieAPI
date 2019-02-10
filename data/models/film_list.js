/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('film_list', {
    FID: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '4.99'
    },
    length: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true
    },
    rating: {
      type: DataTypes.ENUM('G','PG','PG-13','R','NC-17'),
      allowNull: true,
      defaultValue: 'G'
    },
    actors: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'film_list'
  });
};
