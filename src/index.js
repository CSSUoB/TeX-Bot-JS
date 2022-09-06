const fs = require("fs");
const path = require("path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("../config/config.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

const contextMenuPath = path.join(__dirname, "contextmenu");
const contextMenuFiles = fs
  .readdirSync(contextMenuPath)
  .filter((file) => file.endsWith(".js"));

for (const file of contextMenuFiles) {
  const filePath = path.join(contextMenuPath, file);
  const contextMenuCommand = require(filePath);
  client.commands.set(contextMenuCommand.data.name, contextMenuCommand);
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

console.log(client.commands);

client.login();
