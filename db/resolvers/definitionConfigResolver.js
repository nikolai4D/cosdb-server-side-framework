const definitionConfigResolver = {
  Query: {
    definitionConfigs: async (_, __, { models }) => {
      const definitionConfigs = await models.DefinitionConfig.findAll();
      return definitionConfigs;
    },
    definitionConfig: async (_, { uuid }, { models }) => {
      const definitionConfig = await models.DefinitionConfig.findByPk(uuid);
      return definitionConfig;
    },
  },
  Mutation: {
    createDefinitionConfig: async (_, { title, description }, { models }) => {
      const definitionConfig = await models.DefinitionConfig.create({
        title,
        description,
      });
      return definitionConfig;
    },
    updateDefinitionConfig: async (
      _,
      { uuid, title, description },
      { models }
    ) => {
      const [updated] = await models.DefinitionConfig.update(
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
        const updatedDefinitionConfig = await models.DefinitionConfig.findByPk(
          uuid
        );
        return updatedDefinitionConfig;
      }

      throw new Error("DefinitionConfig not found");
    },
    deleteDefinitionConfig: async (_, { uuid }, { models }) => {
      const deleted = await models.DefinitionConfig.destroy({
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
