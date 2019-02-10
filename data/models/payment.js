/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    payment_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    },
    rental_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'rental',
        key: 'rental_id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'payment'
  });
};
