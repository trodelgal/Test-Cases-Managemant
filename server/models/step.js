'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Test, {
        foreignKey: "testId",
      });
    }
  };
  Step.init({
    testId: DataTypes.INTEGER,
    details: DataTypes.STRING,
    expectedResult: DataTypes.STRING,
    actualResult: DataTypes.STRING,
    pass: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Step',
    paranoid: true,
    tableName: "Steps",
  });
  return Step;
};