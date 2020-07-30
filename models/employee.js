'use strict';
const {
  Model
} = require('sequelize');
const EmployeeController = require('../controllers/EmployeeController');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.Warehouse, { foreignKey: "WarehouseId" })
      Employee.hasOne(models.EmployeeCredential, { foreignKey: "EmployeeId" })
    }

    // INSTANCE FULL NAME OF EMPLOYEE
    getFullname(){
      if (this.gender.toLowerCase() === 'female'){
        return `Mrs. ${this.firstName} ${this.lastName}`
      } else if (this.gender.toLowerCase() === 'male'){
        return `Mr. ${this.firstName} ${this.lastName}`
      }
    }
  };
  Employee.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    position: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    WarehouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};