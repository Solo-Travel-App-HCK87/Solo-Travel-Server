'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.TravelPackage, {foreignKey : 'TravelPackageId'})
      Transaction.belongsTo(models.User, {foreignKey : 'UserId'})
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    TravelPackageId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    booking_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};