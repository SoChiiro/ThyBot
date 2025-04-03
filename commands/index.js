const fs = require("fs");
const path = require("path");

const commands = new Map();

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js" && file.endsWith(".js")) {
    const command = require(path.join(__dirname, file));

    if (typeof command === "object") {
      Object.values(command).forEach((cmd) => {
        if (cmd.name && cmd.execute) {
          commands.set(cmd.name, cmd);
        }
      });
    }
    commands.set(command.name, command);
  }
});

module.exports = commands;
