const { SlashCommandBuilder } = require("@discordjs/builders");

const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("editmessage")
    .setDescription("Edits a message sent by TeX to the message supplied.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(0)
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("The ID of the channel the message is in.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The ID of the message you wish to edit.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text you want the message to say.")
        .setRequired(true)
    ),
  async execute(interaction) {
    let dt = new Date().toUTCString();
    await interaction.deferReply({ ephemeral: true });
    await wait(1000);

    let channel = interaction.guild.channels.cache.find(
      (c) => c.name === interaction.options.getString("channel")
    );

    let rebuilt = "";

    if (interaction.options.getString("text").includes("\\n")) {
      split = interaction.options.getString("text").split("\\n");
      for (let section of split) {
        rebuilt += "\n" + section;
      }
    } else {
      rebuilt = interaction.options.getString("text");
    }

    let pre = await channel.messages.fetch(
      interaction.options.getString("message")
    );

    await pre.edit(rebuilt).then(
      (suc) => {
        console.log(
          `${dt} - Warning: ${interaction.commandName} has successfully edited a message.`
        );
        return interaction.editReply({
          content: "Message successfully edited!",
        });
      },
      (err) => {
        console.log(
          `${dt} - Warning: ${interaction.commandName} has encountered an error editing a message.`
        );
        return interaction.editReply({
          content: "There was a problem.",
        });
      }
    );
  },
};
