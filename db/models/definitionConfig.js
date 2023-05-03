const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const DefinitionConfig = sequelize.define("DefinitionConfig", {
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
});

module.exports = DefinitionConfig;
