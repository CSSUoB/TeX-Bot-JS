const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const cheerio = require("cheerio");
const tough = require("tough-cookie");
const fs = require("fs");
const crypto = require("crypto");
require("../../config/config.js");

const cookie = new tough.Cookie({
  key: ".ASPXAUTH",
  value: process.env.UNION_COOKIE,
  domain: "www.guildofstudents.com",
});

const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("makemember")
    .setDescription(
      "Gives you the Member role when supplied with an appropriate Student ID."
    )
    .addStringOption((option) =>
      option
        .setName("studentid")
        .setDescription("Your UoB Student ID")
        .setRequired(true)
    ),
  usedIDs: [],
  async execute(interaction) {
    let dt = new Date().toUTCString();
    await interaction.deferReply({ ephemeral: true });
    await wait(1000);

    this.usedIDs = this.readMemberFile().ids ? this.readMemberFile().ids : [];

    let hash = crypto.createHash("sha256");
    const memberArray = await this.getMembers();

    hash.update(interaction.options.getString("studentid"));
    const enc = hash.digest("hex");

    if (interaction.member.roles.cache.find((r) => r.name === "Member")) {
      console.log(
        `${dt} - Warning: ${interaction.user.tag} is already a member`
      );
      return await interaction.editReply({
        content: "You're already a member - why are you trying this again?",
      });
    } else if (this.usedIDs.includes(enc)) {
      console.log(
        `Warning: ${dt} - ${interaction.user.tag} tried using an ID that has already been used.`
      );
      return await interaction.editReply({
        content:
          "This id has already been used. Please contact a Committee member if this is an error.",
      });
    }

    if (
      (await memberArray).includes(interaction.options.getString("studentid"))
    ) {
      this.usedIDs.push(enc);
      this.updateJSON();

      const role = interaction.guild.roles.cache.find(
        (r) => r.name === "Member"
      );
      await interaction.member.roles.add(role).catch(console.error);

      console.log(
        `${dt} - Warning: ${interaction.user.tag} has been made a member.`
      );

      await interaction.editReply({
        content: "Made you a Member!",
        ephemeral: true,
      });
    } else {
      console.log(
        `${dt} - Warning: ${interaction.user.tag} used an invalid ID.`
      );
      await interaction.editReply({
        content:
          "Invalid Student ID supplied. Please contact a Committee member.",
        ephemeral: true,
      });
    }
  },
  async getMembers() {
    const result = await axios({
      method: "get",
      url: process.env.UNION_URL,
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
        Cookie: cookie,
      },
      withCredentials: true,
    });

    if (!result) {
      console.log("req err");
      return;
    }

    const memberArray = [];

    const $ = cheerio.load(result.data);
    $("#ctl00_Main_gvMembers > tbody > tr > td:nth-child(2)").each(
      (index, element) => {
        memberArray[index] = $(element).text();
      }
    );

    return memberArray;
  },
  updateJSON() {
    let obj = {
      ids: this.usedIDs,
    };
    let json = JSON.stringify(obj);
    fs.writeFile("../local/member.json", json, function (err) {
      if (err) {
        console.error(err);
      }
    });
  },
  readMemberFile() {
    let rawData = fs.readFileSync("../local/member.json");
    return JSON.parse(rawData);
  },
};
