'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, {
        foreignKey: 'player1ID'
      })
    }
  };
  Room.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    player1ID: DataTypes.UUID,
    player2ID: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Room',
    tableName: "game_room"
  });
  return Room;
};