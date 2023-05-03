const DefinitionConfig = require("../models/definitionConfig.js");

const definitionConfigResolver = {
  Query: {
    definitionConfigs: async () => {
      const definitionConfigs = await DefinitionConfig.findAll();
      return definitionConfigs;
    },
    definitionConfig: async (_, { uuid }) => {
      const definitionConfig = await DefinitionConfig.findByPk(uuid);
      return definitionConfig;
    },
  },
  Mutation: {
    createDefinitionConfig: async (_, { title, description }) => {
      const definitionConfig = await DefinitionConfig.create({
        title,
        description,
      });
      return definitionConfig;
    },
    updateDefinitionConfig: async (_, { uuid, title, description }) => {
      const [updated] = await DefinitionConfig.update(
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
        const updatedDefinitionConfig = await DefinitionConfig.findByPk(uuid);
        return updatedDefinitionConfig;
      }

      throw new Error("DefinitionConfig not found");
    },
    deleteDefinitionConfig: async (_, { uuid }) => {
      const deleted = await DefinitionConfig.destroy({
        where: {
          uuid,
        },
      });

      if (deleted) {
        return true;
      }

      throw new Error("DefinitionConfig not found");
    },
  },
};

module.exports = definitionConfigResolver;
