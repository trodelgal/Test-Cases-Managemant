'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Step, {
        foreignKey: "testId",
      });
      this.hasMany(models.Data, {
        foreignKey: "testId",
      });
      this.hasMany(models.Perequisite, {
        foreignKey: "testId",
      });
    }
  };
  Test.init({
    name: DataTypes.STRING,
    writer: DataTypes.STRING,
    description: DataTypes.STRING,
    testDate: DataTypes.STRING,
    pass: DataTypes.BOOLEAN,
    hapend: DataTypes.BOOLEAN,
    feature: DataTypes.STRING,
    appLocation: DataTypes.STRING,
    environment: DataTypes.STRING,
    automatic: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Test',
    paranoid: true,
    tableName: "Tests",
  });
  return Test;
};