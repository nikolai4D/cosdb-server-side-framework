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
    tableName: "DefinitionConfig",
    timestamps: false,
  }
);

module.exports = DefinitionConfig;

const DefinitionConfigExternalRel = require("./definitionConfigExternalRel.js");
const DefinitionConfigInternalRel = require("./definitionConfigInternalRel.js");

DefinitionConfig.hasMany(DefinitionConfigExternalRel, {
  foreignKey: "source",
  as: "externalRelsAsSource",
});
DefinitionConfig.hasMany(DefinitionConfigExternalRel, {
  foreignKey: "target",
  as: "externalRelsAsTarget",
});
DefinitionConfig.hasMany(DefinitionConfigInternalRel, {
  foreignKey: "source",
  as: "internalRelsAsSource",
});
DefinitionConfig.hasMany(DefinitionConfigInternalRel, {
  foreignKey: "target",
  as: "internalRelsAsTarget",
});
