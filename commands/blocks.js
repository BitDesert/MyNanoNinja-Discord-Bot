const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const constants =  require('../constants')

module.exports = {
	name: 'blocks',
	description: 'Display the current block counts',
	async execute(interaction) {
		try {
			var blocks = await axios.get('https://mynano.ninja/api/blockcount');
		} catch (error) {
			return console.log(error);
		}

		const embed = new MessageEmbed()
			.setTitle('Block Counts')
			.setColor(constants.nanoBlue)
			.addField('Checked', parseInt(blocks.data.count).toLocaleString('en-US'), true)
			.addField('Unchecked', parseInt(blocks.data.unchecked).toLocaleString('en-US'), true)
			.addField('Cemented', parseInt(blocks.data.cemented).toLocaleString('en-US'), true)
			.addField('Backlog', (parseInt(blocks.data.count) - parseInt(blocks.data.cemented)).toLocaleString('en-US'), true)
			.setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())

		await interaction.reply({ embeds: [embed] });
	},
};