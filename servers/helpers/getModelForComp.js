const fs = require("fs");
const path = require("path");
const readModelFromParentId = require("./readModelFromParentId.js");

async function getModelForComp(compParentId) {
  const componentModel = {
    components: [],
    organisms: [],
    molecules: [],
    atoms: [],
    functions: [],
  };

  const components = await readModelFromParentId("components", compParentId);
  componentModel.components = components;
  const component = components[0];

  await processComponent(componentModel, component);

  return componentModel;
}

async function processComponent(componentModel, component) {
  const componentId = component.id;

  if (component.value.startsWith("Organism")) {
    await processOrganism(componentModel, componentId);
  }

  if (component.value.startsWith("Molecule")) {
    componentModel.molecules = await getModelTypeForComp(
      "molecules",
      componentId
    );
  }

  if (component.value.startsWith("Atom")) {
    componentModel.atoms = await processAtom(componentId);
  }

  componentModel.functions = await getModelTypeForComp(
    "functions",
    componentId
  );
}

async function processOrganism(componentModel, parentId) {
  const organisms = await getModelTypeForComp("organisms", parentId);
  componentModel.organisms.push(...organisms);

  for (const organism of organisms) {
    await processComponent(componentModel, organism);
  }
}

async function processAtom(parentId) {
  const atoms = await getModelTypeForComp("atoms", parentId);

  for (const atom of atoms) {
    const atomValues = await getModelTypeForComp("atomValues", atomId);
    const atomValue = atomValues[0].value;
    if (atomValue) {
      atom.atomValue = atomValue;
    }
  }

  return atoms;
}

async function getModelTypeForComp(modelType, parentId) {
  const modelData = await readModelFromParentId(modelType, parentId);
  return modelData.filter((model) => model.parentId === parentId);
}

module.exports = getModelForComp;
