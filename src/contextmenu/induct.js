const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setDMPermission(false)
    .setDefaultMemberPermissions(0x10000000)
    .setName("Induct User")
    .setType(ApplicationCommandType.User),
  silent: true,
  async execute(interaction) {
    let dt = new Date().toUTCString();
    await interaction.deferReply({ ephemeral: true });
    await wait(1000);

    await interaction.guild.members.fetch();
    await interaction.guild.channels.fetch();
    let user = await interaction.guild.members.fetch(interaction.targetId);

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

    if (user.roles.cache.find((r) => r.name === "Guest")) {
      console.log(
        `${dt} - Warning: ${interaction.user.tag} tried to induct ${user.user.tag} but they were already inducted.`
      );
      return await interaction.editReply({
        content: "User is already inducted.",
        ephemeral: true,
      });
    }

    await user.roles.add(role);
    await interaction.guild.members.fetch();

    if (
      (!this.silent && general.send(message)) ||
      (this.silent && user.roles.cache.find((r) => r.name === "Guest"))
    ) {
      console.log(
        `${dt} - Warning: ${interaction.user.tag} has inducted ${user.user.tag} into CSS.`
      );
      await interaction.editReply({
        content: "User inducted successfully.",
        ephemeral: true,
      });
    } else {
      console.log(
        `${dt} - Warning: An error occured during ${interaction.user.tag}'s induction of ${user.user.tag}`
      );
      await interaction.editReply({
        content: "Something has gone wrong.",
        ephemeral: true,
      });
    }
  },
};
