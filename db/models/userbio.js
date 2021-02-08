'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBio = sequelize.define('UserBio', {
      uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'UserBio',
      tableName: 'user_game_biodata'
    }
  )

  UserBio.associate = (models) => {
    UserBio.belongsTo(models.User, {
      foreignKey: 'uid'
    })
  }
  return UserBio;
}
