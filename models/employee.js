'use strict';
const {
  Model
} = require('sequelize');
const EmployeeController = require('../controllers/EmployeeController');
const calc = require('../helpers/moneyFormat')
const firstToCaps = require('../helpers/changetoCapitalize')

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
      let gender = this.gender.toLowerCase()
      let output = ''
      if ( gender === 'female'){
        output += 'Mrs. '
      } else if (gender === 'male'){
        output += 'Mr. '
      }
      output += `${firstToCaps(this.firstName)} ${firstToCaps(this.lastName)}`
      return output
    }

    getGender(){
      return firstToCaps(this.gender)
    }

    getPosition(){
      return firstToCaps(this.position)
    }

    getSalaryFormat(){
      return calc(this.salary)
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