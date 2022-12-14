const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setDefaultMemberPermissions(0x10000000)
    .setName("induct")
    .setDescription(
      "Gives a user the @Guest role, then sends a message in #general saying hello."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to induct.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("silent")
        .setDescription("Triggers whether a message is sent or not.")
    ),
  async execute(interaction) {
    let dt = new Date().toUTCString();
    await interaction.deferReply({ ephemeral: true });
    await wait(1000);

    let user = interaction.options.getUser("user");
    await interaction.guild.members.fetch();
    await interaction.guild.channels.fetch();
    let guildUser = interaction.guild.members.cache.find(
      (u) => u.id === user.id
    );

    let general, roles, role;

    try {
      general = interaction.guild.channels.cache.find(
        (c) => c.name === "general"
      );
    } catch (error) {
      console.log(`${dt} - Error: #general does not exist on this guild.`);
    }

    try {
      roles = interaction.guild.channels.cache.find((c) => c.name === "roles");
    } catch (error) {
      console.log(`${dt} - Error: #roles does not exist on this guild.`);
    }

    let message = `Hey ${user}, welcome to CSS! :tada: Remember to grab your roles in ${roles} and say hello to everyone here! :wave:`;

    try {
      role = interaction.guild.roles.cache.find((r) => r.name === "Guest");
    } catch (error) {
      console.log(`${dt} - Error: @Guest does not exist on this guild.`);
    }

    if (guildUser.roles.cache.find((r) => r.name === "Guest")) {
      console.log(
        `${dt} - Warning: ${interaction.user.tag} tried to induct ${guildUser.user.tag} but they were already inducted.`
      );
      return await interaction.editReply({
        content: "User is already inducted.",
        ephemeral: true,
      });
    }

    await guildUser.roles.add(role);
    await interaction.guild.members.fetch();

    if (
      (!interaction.options.getBoolean("silent") && general.send(message)) ||
      (interaction.options.getBoolean("silent") &&
        guildUser.roles.cache.find((r) => r.name === "Guest"))
    ) {
      console.log(
        `${dt} - Warning: ${interaction.user.tag} has inducted ${guildUser.user.tag} into CSS.`
      );
      await interaction.editReply({
        content: "User inducted successfully.",
        ephemeral: true,
      });
    } else {
      console.log(
        `${dt} - Warning: An error occured during ${interaction.user.tag}'s induction of ${guildUser.user.tag}`
      );
      await interaction.editReply({
        content: "Something has gone wrong.",
        ephemeral: true,
      });
    }
  },
};
