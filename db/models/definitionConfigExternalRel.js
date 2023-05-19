const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const DefinitionConfig = require("./definitionConfig.js");

const DefinitionConfigExternalRel = sequelize.define(
  "DefinitionConfigExternalRel",
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
    tableName: "DefinitionConfigExternalRel",
    timestamps: false,
  }
);

DefinitionConfigExternalRel.belongsTo(DefinitionConfig, {
  foreignKey: "source",
  as: "sourceDefinitionConfig",
});
DefinitionConfigExternalRel.belongsTo(DefinitionConfig, {
  foreignKey: "target",
  as: "targetDefinitionConfig",
});

module.exports = DefinitionConfigExternalRel;
