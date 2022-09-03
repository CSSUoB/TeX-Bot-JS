module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.execute(interaction);
    } catch (err) {
      console.error(`${dt} - ${err}`);
      interaction.replsy({
        content: "There was an errour while executing this command.",
        ephemeral: true,
      });
    }
  },
};
