const definitionConfigResolver = {
  Query: {
    definitionConfigs: async (_, __, context) => {
      console.log("Context models:", context.models);
      console.log("DefinitionConfig model:", context.models.DefinitionConfig);
      const definitionConfigs = await context.models.DefinitionConfig.findAll();

      return definitionConfigs;
    },
    definitionConfig: async (_, { uuid }, context) => {
      const definitionConfig = await context.models.DefinitionConfig.findByPk(
        uuid
      );
      return definitionConfig;
    },
  },
  Mutation: {
    createDefinitionConfig: async (_, { title, description }, context) => {
      const definitionConfig = await context.models.DefinitionConfig.create({
        title,
        description,
      });
      return definitionConfig;
    },
    updateDefinitionConfig: async (
      _,
      { uuid, title, description },
      context
    ) => {
      const [updated] = await context.models.DefinitionConfig.update(
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
        const updatedDefinitionConfig =
          await context.models.DefinitionConfig.findByPk(uuid);
        return updatedDefinitionConfig;
      }

      throw new Error("DefinitionConfig not found");
    },
    deleteDefinitionConfig: async (_, { uuid }, context) => {
      const deleted = await context.models.DefinitionConfig.destroy({
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
