/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory', {
    inventory_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    film_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      references: {
        model: 'film',
        key: 'film_id'
      }
    },
    store_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      references: {
        model: 'store',
        key: 'store_id'
      }
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'inventory'
  });
};
