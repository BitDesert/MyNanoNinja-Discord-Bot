const { MessageEmbed } = require('discord.js');
const axios = require("axios");
var moment = require('moment');

const tools = require('../tools')
const constants =  require('../constants')

module.exports = {
  name: 'representative',
  description: 'Information about a representative',
  options: [{
    name: 'address',
    type: 'STRING',
    description: 'The nano_1abc... address',
    required: true,
  }],
  async execute(interaction) {
    const address = interaction.options.getString('address')

    try {
      var account = await axios.get('https://mynano.ninja/api/accounts/' + address);
    } catch (error) {
      return console.log(error);
    }

    console.log(account.data.votingweight, tools.variableRound(tools.rawtoNANO(account.data.votingweight)));

    const embed = new MessageEmbed()
      .setTitle(address)
      .setColor(constants.nanoBlue)
      .setDescription('[More information](https://mynano.ninja/account/' + address + ')')
      .setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())
      .addField('Voting Weight', tools.toLocaleString(tools.variableRound(tools.rawtoNANO(account.data.votingweight))) + ' NANO', true)
      .addField('Uptime', tools.round(account.data.uptime, 3) + ' %', true)
      .addField('Last voted', moment(account.data.lastVoted).fromNow(), true)

    await interaction.reply({ embeds: [embed] });
  },
};