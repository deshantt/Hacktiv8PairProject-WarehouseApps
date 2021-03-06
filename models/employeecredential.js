'use strict';
const {
  Model
} = require('sequelize');

const { hash } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class EmployeeCredential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeCredential.belongsTo(models.Employee, { foreignKey: "EmployeeId" })
    }
  };
  EmployeeCredential.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    EmployeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EmployeeCredential',
    hooks: {
      beforeCreate(instance, options) {
        let hashedPass = hash(instance.password);
        instance.password = hashedPass
      }
    }
  });
  return EmployeeCredential;
};