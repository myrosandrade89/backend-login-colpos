'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaNacimiento: {
        type: Sequelize.DATE
      },
      ocupacion: {
        type: Sequelize.STRING
      },
      numeroTelefonico: {
        type: Sequelize.BIGINT
      },
      idUbicacion: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ubicacions',
          key: 'id'
        }
      },
      idPersona: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Personas',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuarios');
  }
};