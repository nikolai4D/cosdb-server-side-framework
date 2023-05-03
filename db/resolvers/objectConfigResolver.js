const objectConfigResolver = {
  Query: {
    objectConfigs: async (_, __, context) => {
      console.log("Context models:", context.models);
      console.log("objectConfig model:", context.models.objectConfig);
      const objectConfigs = await context.models.objectConfig.findAll();

      return objectConfigs;
    },
    objectConfig: async (_, { uuid }, context) => {
      const objectConfig = await context.models.objectConfig.findByPk(uuid);
      return objectConfig;
    },
  },
  Mutation: {
    createobjectConfig: async (_, { title, description }, context) => {
      const objectConfig = await context.models.objectConfig.create({
        title,
        description,
      });
      return objectConfig;
    },
    updateobjectConfig: async (_, { uuid, title, description }, context) => {
      const [updated] = await context.models.objectConfig.update(
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
        const updatedobjectConfig = await context.models.objectConfig.findByPk(
          uuid
        );
        return updatedobjectConfig;
      }

      throw new Error("objectConfig not found");
    },
    deleteobjectConfig: async (_, { uuid }, context) => {
      const deleted = await context.models.objectConfig.destroy({
        where: {
          uuid,
        },
      });

      if (deleted) {
        return true;
      }

      throw new Error("objectConfig not found");
    },
  },
};

module.exports = objectConfigResolver;
