'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TravelPackage.hasMany(models.Transaction, { foreignKey: 'TravelPackageId' });
      TravelPackage.hasMany(models.RoomMessage, { foreignKey: 'RoomId' });
    }
  }
  TravelPackage.init(
    {
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
      categories: DataTypes.JSON,
      inclusions: DataTypes.JSON,
      itinerary: DataTypes.JSON,
      preparation_docs: DataTypes.JSON,
      preparation_clothing: DataTypes.JSON,
      preparation_essentials: DataTypes.JSON,
      preparation_electronics: DataTypes.JSON,
      highlights: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'TravelPackage',
    }
  );
  return TravelPackage;
};
