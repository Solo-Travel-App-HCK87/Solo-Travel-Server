'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoomMessage.belongsTo(models.TravelPackage, {foreignKey : 'RoomId'})
      RoomMessage.belongsTo(models.User, {foreignKey : 'SenderId'})
    }
  }
  RoomMessage.init({
    SenderId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoomMessage',
  });
  return RoomMessage;
};