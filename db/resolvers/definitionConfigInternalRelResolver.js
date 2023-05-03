const DefinitionConfigInternalRel = require("../models/definitionConfigInternalRel.js");
const DefinitionConfig = require("../models/definitionConfig.js");
const { where } = require("sequelize");

const definitionConfigInternalRelResolver = {
  Query: {
    definitionConfigInternalRels: async (_, { sourceUuid, targetUuid }) => {
      const whereClause = {};

      if (sourceUuid) {
        whereClause.source = sourceUuid;
      }

      if (targetUuid) {
        whereClause.target = targetUuid;
      }
      const definitionConfigInternalRels =
        await DefinitionConfigInternalRel.findAll({
          where: whereClause,
          include: DefinitionConfig,
        });

      return definitionConfigInternalRels;
    },
    definitionConfigInternalRel: async (_, { uuid }) => {
      const definitionConfigInternalRel =
        await DefinitionConfigInternalRel.findByPk(uuid);
      return definitionConfigInternalRel;
    },
  },
  Mutation: {
    createDefinitionConfigInternalRel: async (
      _,
      { title, description, sourceUuid, targetUuid }
    ) => {
      const definitionConfigInternalRel =
        await DefinitionConfigInternalRel.create({
          title,
          description,
          source: sourceUuid,
          target: targetUuid,
        });
      return definitionConfigInternalRel;
    },
    updateDefinitionConfigInternalRel: async (
      _,
      { uuid, title, description }
    ) => {
      const [updated] = await DefinitionConfigInternalRel.update(
        {
          title,
          description,
        },
        {
          where: {
            uuid,
          },
        }
      );

      if (updated) {
        const updatedDefinitionConfigInternalRel =
          await DefinitionConfigInternalRel.findByPk(uuid);
        return updatedDefinitionConfigInternalRel;
      }

      throw new Error("DefinitionConfigInternalRel not found");
    },
    deleteDefinitionConfigInternalRel: async (_, { uuid }) => {
      const deleted = await DefinitionConfigInternalRel.destroy({
        where: {
          uuid,
        },
      });

      if (deleted) {
        return true;
      }

      throw new Error("DefinitionConfigInternalRel not found");
    },
  },
  DefinitionConfigInternalRel: {
    source: async (definitionConfigInternalRel) => {
      const source = await definitionConfigInternalRel.getDefinitionConfig();
      return source;
    },
    target: async (definitionConfigInternalRel) => {
      const target = await definitionConfigInternalRel.getDefinitionConfig();
      return target;
    },
  },
};

module.exports = definitionConfigInternalRelResolver;