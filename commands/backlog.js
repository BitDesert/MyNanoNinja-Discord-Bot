const { MessageEmbed } = require('discord.js');
const axios = require("axios");
var moment = require('moment');

const getBlocksPerSecond =  require('../bps')
const constants =  require('../constants')
const tools = require('../tools')

module.exports = {
  name: 'backlog',
  description: 'Current Backlog',
  async execute(interaction) {
    try {
      var blocks = await axios.get('https://mynano.ninja/api/blockcount');
      var cps = await getBlocksPerSecond('cps_p75_pr');
      var bps = await getBlocksPerSecond('bps_p75_pr');
    } catch (error) {
      return console.log(error);
    }

    const cps_sum = cps.raw.reduce((a, b) => a + b, 0);
    const cps_avg = (cps_sum / cps.raw.length) || 0;
    
    const bps_sum = bps.raw.reduce((a, b) => a + b, 0);
    const bps_avg = (bps_sum / bps.raw.length) || 0;
    
    // use CPS-BPS delta for backlog clearance
    const cps_avg_delta = cps_avg - bps_avg;

    var backlog = parseInt(blocks.data.count) - parseInt(blocks.data.cemented);
    var percent_cemented = parseInt(blocks.data.cemented) / parseInt(blocks.data.count);
    var clearedin_seconds = backlog / cps_avg_delta;
    var clearedin = moment().seconds(clearedin_seconds).fromNow();

    if(percent_cemented > 0.9999){
      interaction.reply('No backlog');
      return;
    }

    const embed = new MessageEmbed()
      .setTitle('Backlog Estimation')
      .setColor(constants.nanoBlue)
      .addField('Backlog', backlog.toLocaleString('en-US'), true)
      .addField('CPS delta (avg 60 min)', tools.round(cps_avg_delta, 2).toString(), true)
      .setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())

    if(cps_avg_delta > 0){
      embed.addField('Cleared', clearedin, true)
    }

    await interaction.reply({ embeds: [embed] });
  },
};
