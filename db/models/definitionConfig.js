const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const DefinitionConfigExternalRel = require("./definitionConfigExternalRel.js");
const DefinitionConfigInternalRel = require("./definitionConfigInternalRel.js");

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

// In DefinitionConfig model
DefinitionConfig.hasMany(DefinitionConfigExternalRel, {
  foreignKey: "source",
  as: "sourceRel",
});
DefinitionConfig.hasMany(DefinitionConfigExternalRel, {
  foreignKey: "target",
  as: "targetRel",
});
DefinitionConfig.hasMany(DefinitionConfigInternalRel, {
  foreignKey: "source",
  as: "sourceRel",
});
DefinitionConfig.hasMany(DefinitionConfigInternalRel, {
  foreignKey: "target",
  as: "targetRel",
});

module.exports = DefinitionConfig;
