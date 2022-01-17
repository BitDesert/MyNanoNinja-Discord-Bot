const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const constants =  require('../constants')

module.exports = {
  name: 'trade',
  description: 'Discord server for trade talk',
  async execute(interaction) {

    const embed = new MessageEmbed()
      .setColor(0xFF0000)
      .setTitle('No trade talk')
      .setDescription('Please visit a different server. Get the invite by using: `/xnotrade` or `/nanotrade`')
      .setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())

    await interaction.reply({ embeds: [embed] });
  },
};