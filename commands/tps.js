const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const constants =  require('../constants')

module.exports = {
	name: 'tps',
	description: 'Current TPS/BPS/CPS',
	async execute(interaction) {
		try {
			var stats = await axios.get('https://nanoticker.info/json/stats.json');
		} catch (error) {
			return console.log(error);
		}
	
		const embed = new MessageEmbed()
			.setTitle('Current Blocks per Second')
			.setColor(constants.nanoBlue)
			.setDescription('**Pro Tip:** The current CPS/BPS are always available live in the bots activity!')
			.addField('CPS', tools.formatTPS(stats.data.CPSMedian_pr), true)
			.addField('BPS', tools.formatTPS(stats.data.BPSMedian_pr), true)
			.setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())

		await interaction.reply({ embeds: [embed] });
	},
};