const DefinitionConfig = require("../models/definitionConfig.js");
const DefinitionConfigExternalRel = require("../models/definitionConfigExternalRel.js");
const DefinitionConfigInternalRel = require("../models/definitionConfigInternalRel.js");

const definitionConfigResolver = {
  Query: {
    definitionConfigs: async () => {
      const definitionConfigs = await DefinitionConfig.findAll({
        include: [
          { model: DefinitionConfigExternalRel, as: "externalRelsAsSource" },
          { model: DefinitionConfigExternalRel, as: "externalRelsAsTarget" },
          { model: DefinitionConfigInternalRel, as: "internalRelsAsSource" },
          { model: DefinitionConfigInternalRel, as: "internalRelsAsTarget" },
        ],
      });

      return definitionConfigs;
    },
    definitionConfig: async (_, { uuid }) => {
      const definitionConfig = await DefinitionConfig.findByPk(uuid, {
        include: [
          { model: DefinitionConfigExternalRel, as: "externalRelsAsSource" },
          { model: DefinitionConfigExternalRel, as: "externalRelsAsTarget" },
          { model: DefinitionConfigInternalRel, as: "internalRelsAsSource" },
          { model: DefinitionConfigInternalRel, as: "internalRelsAsTarget" },
        ],
      });

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
  DefinitionConfig: {
    internalRelsAsSource: async (definitionConfig) => {
      const internalRelsAsSource =
        await definitionConfig.getInternalRelsAsSource();
      return internalRelsAsSource;
    },
    internalRelsAsTarget: async (definitionConfig) => {
      const internalRelsAsTarget =
        await definitionConfig.getInternalRelsAsTarget();
      return internalRelsAsTarget;
    },
    externalRelsAsSource: async (definitionConfig) => {
      const externalRelsAsSource =
        await definitionConfig.getExternalRelsAsSource();
      return externalRelsAsSource;
    },
    externalRelsAsTarget: async (definitionConfig) => {
      const externalRelsAsTarget =
        await definitionConfig.getExternalRelsAsTarget();
      return externalRelsAsTarget;
    },
  },
};

module.exports = definitionConfigResolver;
