const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("Displays information about the source code of this bot."),
  async execute(interaction) {
    await interaction.reply("TeX bot is an open-source project made specifically for the CSS Discord! You can see and contribute the source code at https://github.com/CSSUoB/TeX-Bot-JS");
  },
};
