/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    country_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'country'
  });
};
