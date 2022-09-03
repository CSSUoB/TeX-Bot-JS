const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    let dt = new Date().toUTCString();
    console.log(`${dt} - Warning: ${interaction.user.tag} made me pong!!s`);
    await interaction.reply("Pong!");
  },
};
