'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Warehouse.belongsToMany(models.Product, { through: models.Stock, foreignKey: "WarehouseId" })
      Warehouse.hasMany(models.Employee, { foreignKey: "WarehouseId" })
    }

    getWarehouseName(){
      return `${this.city} - ${this.address}`
    }
  };
  Warehouse.init({
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    leaseExpiryDate: DataTypes.DATEONLY
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.city = `Warehouse ${instance.city}`
      }
    },
    sequelize,
    modelName: 'Warehouse',
  });
  return Warehouse;
};