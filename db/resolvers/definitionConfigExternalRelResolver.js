const DefinitionConfigExternalRel = require("../models/definitionConfigExternalRel.js");
const DefinitionConfig = require("../models/definitionConfig.js");

const definitionConfigExternalRelResolver = {
  Query: {
    definitionConfigExternalRels: async (_, { sourceUuid, targetUuid }) => {
      const whereClause = {};

      if (sourceUuid) {
        whereClause.source = sourceUuid;
      }

      if (targetUuid) {
        whereClause.target = targetUuid;
      }
      const definitionConfigExternalRels =
        await DefinitionConfigExternalRel.findAll({
          where: whereClause,
          include: DefinitionConfig,
        });

      return definitionConfigExternalRels;
    },
    definitionConfigExternalRel: async (_, { uuid }) => {
      const definitionConfigExternalRel =
        await DefinitionConfigExternalRel.findByPk(uuid);
      return definitionConfigExternalRel;
    },
  },
  Mutation: {
    createDefinitionConfigExternalRel: async (
      _,
      { title, description, sourceUuid, targetUuid }
    ) => {
      const definitionConfigExternalRel =
        await DefinitionConfigExternalRel.create({
          title,
          description,
          source: sourceUuid,
          target: targetUuid,
        });
      return definitionConfigExternalRel;
    },
    updateDefinitionConfigExternalRel: async (
      _,
      { uuid, title, description }
    ) => {
      const [updated] = await DefinitionConfigExternalRel.update(
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
        const updatedDefinitionConfigExternalRel =
          await DefinitionConfigExternalRel.findByPk(uuid);
        return updatedDefinitionConfigExternalRel;
      }

      throw new Error("DefinitionConfigExternalRel not found");
    },
    deleteDefinitionConfigExternalRel: async (_, { uuid }) => {
      const deleted = await DefinitionConfigExternalRel.destroy({
        where: {
          uuid,
        },
      });

      if (deleted) {
        return true;
      }

      throw new Error("DefinitionConfigExternalRel not found");
    },
  },
  DefinitionConfigExternalRel: {
    source: async (definitionConfigExternalRel) => {
      const source = await DefinitionConfig.findByPk(
        definitionConfigExternalRel.source
      );
      return source;
    },
    target: async (definitionConfigExternalRel) => {
      const target = await DefinitionConfig.findByPk(
        definitionConfigExternalRel.target
      );
      return target;
    },
  },
};

module.exports = definitionConfigExternalRelResolver;
