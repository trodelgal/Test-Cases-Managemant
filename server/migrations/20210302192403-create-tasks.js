'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      writer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      test_date: {
        type: Sequelize.DATE
      },
      pass: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      hapend: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      feature: {
        type: Sequelize.STRING
      },
      app_location: {
        type: Sequelize.STRING
      },
      environment: {
        type: Sequelize.STRING
      },
      automatic: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tests');
  }
};