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
    await interaction.deferReply({ ephemeral: true });
    await wait(1000);

    let channel = interaction.guild.channels.cache.find(
      (c) => c.name === interaction.options.getString("channel")
    );

    console.log(interaction.options.getString("text").includes("\\n"));
    console.log(interaction.options.getString("text"));

    let rebuilt = "";

    if (interaction.options.getString("text").includes("\\n")) {
      split = interaction.options.getString("text").split("\\n");
      console.log(split);
      for (let section of split) {
        /*if (section === split[0]) {
          rebuilt += section;
        } else {
          rebuilt += "\r\n" + section;
        }*/
        rebuilt += "\n" + section;
      }
    } else {
      rebuilt = interaction.options.getString("text");
    }

    console.log(rebuilt);

    //console.log(channel);
    //channel.send(rebuilt);

    let pre = await channel.messages.fetch(
      interaction.options.getString("message")
    );

    //console.log(pre);

    await pre.edit(rebuilt).then(
      (suc) => {
        console.log(
          `Warning: ${interaction.commandName} has successfully edited a message.`
        );
        return interaction.editReply({
          content: "Message successfully edited!",
        });
      },
      (err) => {
        console.log(
          `Warning: ${interaction.commandName} has encountered an error editing a message.`
        );
        return interaction.editReply({
          content: "There was a problem.",
        });
      }
    );
  },
};
