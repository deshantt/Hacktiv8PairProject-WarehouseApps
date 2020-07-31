'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stock.belongsTo(models.Warehouse, {foreignKey: "WarehouseId", targetKey: "id"});
      Stock.belongsTo(models.Product, {foreignKey: "WarehouseId", targetKey: "id"});
    }
  };
  Stock.init({
    WarehouseId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Stock : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};