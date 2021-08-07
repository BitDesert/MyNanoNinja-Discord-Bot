const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const nanocurrency = require("nanocurrency");

const constants =  require('../constants')

module.exports = {
	name: 'account',
	description: 'Information about an account',
	options: [{
		name: 'address',
		type: 'STRING',
		description: 'The nano_1abc... address',
		required: true,
	}],
	async execute(interaction) {
		const address = interaction.options.getString('address')

		try {
			var account = await axios.get('https://mynano.ninja/api/accounts/' + address + '/info');
		} catch (error) {
			return console.log(error);
		}
	
		const embed = new MessageEmbed()
			.setTitle(address)
			.setColor(constants.nanoBlue)
			.setDescription('[More information](https://mynano.ninja/account/' + address + ')')
			.setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())
			.addField('Balance', nanocurrency.convert(account.data.balance, { from: 'raw', to: 'NANO' }) + ' NANO', true)
			.addField('Pending', nanocurrency.convert(account.data.pending, { from: 'raw', to: 'NANO' }) + ' NANO', true)
			.addField('Confirmed Blocks', account.data.confirmation_height + ' of ' + account.data.block_count, true)

		await interaction.reply({ embeds: [embed] });
	},
};