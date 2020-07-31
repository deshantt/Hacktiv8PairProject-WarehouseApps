'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('EmployeeCredentials', 'EmployeeId', Sequelize.INTEGER);
 },

 down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('EmployeeCredentials', 'EmployeeId');
 }
};
