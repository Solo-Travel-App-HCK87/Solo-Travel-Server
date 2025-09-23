'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TravelPackage.hasMany(models.Transaction, {foreignKey : 'TravelPackageId'})
    }
  }
  TravelPackage.init({
    destination_name: DataTypes.STRING,
    location: DataTypes.STRING,
    duration_days: DataTypes.INTEGER,
    original_price: DataTypes.INTEGER,
    current_price: DataTypes.INTEGER,
    discount_percentage: DataTypes.INTEGER,
    available_slots: DataTypes.INTEGER,
    departure_date: DataTypes.DATE,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    categories: DataTypes.STRING,
    inclusions: DataTypes.STRING,
    itinerary: DataTypes.TEXT,
    preparation_docs: DataTypes.STRING,
    preparation_clothing: DataTypes.STRING,
    preparation_essentials: DataTypes.STRING,
    preparation_electronics: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TravelPackage',
  });
  return TravelPackage;
};