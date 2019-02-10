/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    city_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      references: {
        model: 'country',
        key: 'country_id'
      }
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'city'
  });
};
