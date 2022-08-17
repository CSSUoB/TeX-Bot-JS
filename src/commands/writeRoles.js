const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("@discordjs/builders");
require("../../config/config.js");

const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("writeroles")
    .setDescription("Populates #roles with the correct messages.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(0),
  messageArr: [
    "\nReact to this message to get pronoun roles\n🇭 - He/Him\n🇸 - She/Her\n🇹 - They/Them",
    "_ _\nReact to this message to get year group roles\n0️⃣ - Foundation Year\n1️⃣ - First Year\n2️⃣ - Second Year\n🇫 - Final Year (incl. 3rd Year MSci/MEng)\n🇮 - Year in Industry\n🇦 - Year Abroad\n🇹 - Post-Graduate Taught (Masters/MSc) \n🇷 - Post-Graduate Research (PhD) \n🅰️ - Alumnus\n🇩 - Postdoc",
    "_ _\nReact to this message to join the **opt in channels**\n💬 - Serious Talk\n🏡 - Housing\n🎮 - Gaming\n📺 - Anime\n⚽ - Sport\n💼 - Industry\n⛏️ - Minecraft\n🌐 - CSS Website\n🔖 - Archivist",
    "_ _\nReact to this message to opt in to News notifications\n🔈- Get notifications when we `@News`\n🔇- Don't get notifications when we `@News`\n_ _\n> We will still use `@everyone` messages if there is something urgent",
  ],
  async execute(interaction) {
    await interaction.deferReply();
    await wait(1000);
    let sentCount = 0;

    let channel = await interaction.guild.channels.cache.find(
      (channel) => channel.name === "roles"
    );
    this.messageArr.forEach((element) => {
      channel.send(element);
      sentCount++;
    });

    if (sentCount === this.messageArr.length) {
      await interaction.editReply({
        content: "All messages sent successfully.",
      });
    } else {
      await interaction.editReply({
        content: "There was a problem.",
      });
    }
  },
};
