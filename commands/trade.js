const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const constants =  require('../constants')

module.exports = {
  name: 'trade',
  description: 'Discord server for trade talk',
  async execute(interaction) {

    const embed = new MessageEmbed()
      .setColor(0xFF0000)
      .setDescription('For trade talk please visit the following server:')
      .addField('NanoTrade', '[Join server](https://bit.ly/nanotrade-discord)', true)
      .setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())

    await interaction.reply({ embeds: [embed] });
  },
};