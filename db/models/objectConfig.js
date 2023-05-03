const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const DefinitionConfig = require("./DefinitionConfig.js");

const ObjectConfig = sequelize.define(
  "ObjectConfig",
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
    tableName: "ObjectConfig",
    timestamps: false,
  }
);

ObjectConfig.belongsTo(DefinitionConfig, { foreignKey: "parent" });

module.exports = ObjectConfig;
