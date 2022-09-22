const fs = require("fs");
const path = require("path");
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("../config/config.js");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  console.log(command);
  commands.push(command.data.toJSON());
}

const contextMenuPath = path.join(__dirname, "contextmenu");
const contextMenuFiles = fs
  .readdirSync(contextMenuPath)
  .filter((file) => file.endsWith(".js"));

for (const file of contextMenuFiles) {
  const filePath = path.join(contextMenuPath, file);
  const contextMenuCommand = require(filePath);
  console.log(contextMenuCommand);
  commands.push(contextMenuCommand.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
