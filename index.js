const {
  createEntity,
  deleteAllContent,
  deleteEntity,
  moveEntity,
  writeToFile,
} = require("./services/entityService");
const constants = require("./utility/constants");
const log = require("./utility/log");

const { drive, folder, zip, text, content } = constants;

function main() {
  // Create drive Studies
  createEntity(drive, "Studies", null);

  // Creating folder Semester 1
  createEntity(folder, "Semester1", "Studies");
  createEntity(folder, "Algorithm Design", "Semester1");
  createEntity(text, "Intro To Algo Design", "Algorithm Design");

  // Creating folder Semester 2
  createEntity(folder, "Semester2", "Studies");
  createEntity(folder, "Web Development", "Semester2");
  createEntity(text, "Intro to ReactJS", "Web Development");
  createEntity(folder, "Information Security", "Semester2");
  createEntity(text, "AES Encryption", "Information Security");
  createEntity(zip, "Term Project", "Information Security");
  createEntity(text, "Final Report", "Term Project");

  // Logging complete content
  log(content);

  // Deleting folder Web Development from Semester2
  deleteEntity("/Studies/Semester2/Web Development");

  // Logging complete content
  log(content);

  // Moving entity
  moveEntity(
    "/Studies/Semester2/Information Security",
    "/Studies/Semester1/Information Security"
  );

  // Logging complete content
  log(content);

  // Write to file
  writeToFile(
    "/Studies/Semester1/Information Security/AES Encryption",
    "Hello world!"
  );

  // Logging complete content
  log(content);
}

main();
