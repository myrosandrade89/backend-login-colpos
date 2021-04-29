'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    fechaNacimiento: DataTypes.DATE,
    ocupacion: DataTypes.STRING,
    numeroTelefonico: DataTypes.BIGINT,
    idUbicacion: DataTypes.INTEGER,
    idPersona: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  Usuario.associate = function(models) {
    Usuario.belongsTo(models.Persona, {foreignKey: 'id'})
    Usuario.belongsTo(models.Ubicacion, {foreignKey: 'id'})
  };
  return Usuario;
};