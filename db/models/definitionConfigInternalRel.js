const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const DefinitionConfigInternalRel = sequelize.define(
  "DefinitionConfigInternalRel",
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
    tableName: "DefinitionConfigInternalRel",
    timestamps: false,
  }
);

DefinitionConfigInternalRel.belongsTo(DefinitionConfig, {
  foreignKey: "source",
});
DefinitionConfigInternalRel.belongsTo(DefinitionConfig, {
  foreignKey: "target",
});

module.exports = DefinitionConfigInternalRel;
