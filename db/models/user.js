'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserBio, {
        foreignKey: {
          name: 'uid',
          allowNull: false
        }
      })
      
      this.hasMany(models.UserHistory, {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      })
    }

    static encrypt = (password) => {
      return bcrypt.hashSync(password, 10)
    }

    static register = ({username, password}) => {
      const encryptedPassword = this.encrypt(password)
      return this.create({
        username,
        password: encryptedPassword
      })
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username }})
        if (!user) {
          return Promise.reject("User not found!");
        }
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) {
          return Promise.reject("Wrong password")
        }
        return Promise.resolve(user)
      } catch(err) {
        return Promise.reject(err.message)
      }
    }

    generateToken = () => {
      const payLoad = {
        id: this.id,
        username: this.username
      }

      const secretKey = 'strong-secret';

      const token = jwt.sign(payLoad, secretKey, { expiresIn: '24h' });
      return token;
    }
  };

  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqe: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user_game'
  });
  return User;
}
