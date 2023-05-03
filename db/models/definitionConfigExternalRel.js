const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

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
});
DefinitionConfigExternalRel.belongsTo(DefinitionConfig, {
  foreignKey: "target",
});

module.exports = DefinitionConfigExternalRel;
