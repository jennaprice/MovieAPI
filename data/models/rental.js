/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rental', {
    rental_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    inventory_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'inventory_id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    staff_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'rental'
  });
};
