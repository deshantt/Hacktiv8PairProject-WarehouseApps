'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn('Stocks', 'Stock', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Stocks', 'Stock');
  }
};
