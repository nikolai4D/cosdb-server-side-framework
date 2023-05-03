const ObjectConfig = require("../models/objectConfig.js");
const DefinitionConfig = require("../models/definitionConfig.js");

const objectConfigResolver = {
  Query: {
    objectConfigs: async (_, { parentUuid }) => {
      const whereClause = parentUuid ? { parent: parentUuid } : {};
      const objectConfigs = await ObjectConfig.findAll({
        where: whereClause,
        include: DefinitionConfig,
      });
      return objectConfigs;
    },
    objectConfig: async (_, { uuid }) => {
      const objectConfig = await ObjectConfig.findByPk(uuid);
      return objectConfig;
    },
  },
  Mutation: {
    createObjectConfig: async (_, { title, description }) => {
      const objectConfig = await ObjectConfig.create({
        title,
        description,
      });
      return objectConfig;
    },
    updateObjectConfig: async (_, { uuid, title, description }) => {
      const [updated] = await ObjectConfig.update(
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
        const updatedObjectConfig = await ObjectConfig.findByPk(uuid);
        return updatedObjectConfig;
      }

      throw new Error("ObjectConfig not found");
    },
    deleteObjectConfig: async (_, { uuid }) => {
      const deleted = await ObjectConfig.destroy({
        where: {
          uuid,
        },
      });

      if (deleted) {
        return true;
      }

      throw new Error("ObjectConfig not found");
    },
  },
  ObjectConfig: {
    parent: async (objectConfig) => {
      const parent = await objectConfig.getParent();
      return parent;
    },
  },
};

module.exports = objectConfigResolver;
