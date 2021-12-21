const constants = require("./../utility/constants");
const handleError = require("./../utility/handleError");

const { drive, folder, text, zip, content } = constants;

class Entity {
  constructor(type, name, parent) {
    try {
      if (!Object.keys(content).includes(type))
        throw new Error("Illegal file type exception.");

      this.type = type;
      this.name = name;

      if (type == text) {
        this.content = "Some sample text.";
      }

      if (!this.validParent(type, parent))
        throw new Error("Illegal parent child relationship.");

      if (parent != null) this.parent = this.findParent(parent);
      if (type != text) this.children = [];
      if (type != drive) {
        if (this.parent.children.includes(this))
          throw new Error("Entity already exists");
        this.parent.children.push(this);
      }
    } catch (error) {
      handleError("constructor", error);
    }
  }

  validParent = (type, parent) => {
    if (type == drive && parent != null) return false;
    if (type != drive && parent == null) return false;
    return true;
  };

  findParent = (parent) => {
    try {
      for (let space of Object.keys(content)) {
        for (let item of content[space]) {
          if (item.name == parent) return item;
        }
      }
      throw new Error(`Parent ${parent} not found.`);
    } catch (error) {
      handleError("findParent", error);
    }
  };

  getSize = () => {
    switch (this.type) {
      case text:
        return this.content.length;
      case drive:
        if (this.children.length)
          return this.children.reduce((total, child) => {
            return total + child.getSize();
          }, 0);
        else return 0;
      case folder:
        if (this.children.length)
          return this.children.reduce((total, child) => {
            return total + child.getSize();
          }, 0);
        else return 0;
      case zip:
        if (this.children.length)
          return (
            0.5 *
            this.children.reduce((total, child) => {
              return total + child.getSize();
            }, 0)
          );
        else return 0;
    }
  };

  getPath = () => {
    let path;
    if (this.parent) path = this.parent.path + "/" + this.name;
    else path = "/" + this.name;
    return path;
  };
}

module.exports = Entity;
