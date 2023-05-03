const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const DefinitionConfig = sequelize.define(
  "DefinitionConfig",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "DefinitionConfig", // Add this line to explicitly specify the table name
  }
);

module.exports = DefinitionConfig;
