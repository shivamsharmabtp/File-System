const Entity = require("../model/Entity");
const { content } = require("../utility/constants");

const updateSizesOfEntities = () => {
  for (let space of Object.keys(content)) {
    for (let item in content[space]) {
      content[space][item].size = content[space][item].getSize();
    }
  }
};

const updatePathsOfEntities = (entity) => {
  if (entity == undefined) {
    for (let item of content.drive) {
      item.path = "/" + item.name;
      updatePathsOfEntities(item);
    }
  } else {
    if (entity.children) {
      for (child of entity.children) {
        child.path = child.getPath();
        updatePathsOfEntities(child);
      }
    }
  }
};

const deleteEntity = (path) => {
  for (let space of Object.keys(content)) {
    for (let i in content[space]) {
      let item = content[space][i];
      if (item.path == path) {
        let children = item.children;
        content[space].splice(i, 1);
        if (children && children.length) {
          for (child of children) {
            deleteEntity(child.path);
          }
        }
      }
    }
  }
};

const createEntity = (type, name, parent) => {
  const entity = new Entity(type, name, parent);
  if (
    entity &&
    !content[type].filter((e) => e.path == entity.getPath()).length
  ) {
    content[type].push(entity);
    updateSizesOfEntities();
    updatePathsOfEntities();
    return true;
  } else return false;
};

const moveEntity = (source, destination) => {
  let destinationParentPath =
    "/" +
    destination
      .split("/")
      .splice(destination.split("/").length - 3, 2)
      .join("/");
  let newParent;

  for (let space of Object.keys(content)) {
    for (let item of content[space]) {
      if (item.path == destinationParentPath) newParent = item;
    }
  }

  for (let space of Object.keys(content)) {
    for (let item of content[space]) {
      if (item.path == source) {
        item.path = destination;
        let oldParent = item.parent;
        item.parent = newParent;
        updatePathsOfEntities();

        if (oldParent) {
          for (i in oldParent.children) {
            if (oldParent.children[i].path == source) {
              oldParent.children.splice(i, 1);
            }
          }
        }
      }
      //newParent.children.push(item);
    }
  }
};

const writeToFile = (path, value) => {
  for (item of content.text) {
    if (item.path == path) item.content = value;
    item.size = item.content.length;
  }
  updateSizesOfEntities();
};

const deleteAllContent = () => {
  for (let space of Object.keys(content)) {
    content[space] = [];
  }
};
module.exports = {
  createEntity,
  updateSizesOfEntities,
  updatePathsOfEntities,
  deleteAllContent,
  deleteEntity,
  moveEntity,
  writeToFile,
};
