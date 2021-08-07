const { MessageEmbed } = require('discord.js');
const axios = require("axios");

const constants =  require('../constants')

module.exports = {
	name: 'wallets',
	description: 'The unofficial wallet list',
	async execute(interaction) {

		const embed = new MessageEmbed()
      .setTitle('Unofficial Wallet List')
      .setColor(0xFF0000)
      .setDescription('[Open Complete List](https://nanowallets.guide)')
      .setFooter('My Nano Ninja | mynano.ninja', interaction.client.user.avatarURL())
      .addField('Nault', '_Web, Windows, Mac, Linux_\n[Visit website](https://nault.cc)', true)
      .addField('Natrium', '_Android, iOS_\n[Visit website](https://natrium.io)', true)
      .addField('Trust Wallet', '_Android, iOS_\n[Visit website](https://trustwallet.com/de/nano-wallet/)', true)
      .addField('Exodus', '_Windows, Mac, Linux, \nAndroid, iOS_\n[Visit website](https://www.exodus.io/)', true)
      .addField('Guarda', '_Windows, Mac, Linux, \nWeb, Android, iOS_\n[Visit website](https://guarda.com)', true)
      .addField('Vola', '_iOS_\n[Visit website](https://getvola.com)', true)
      .addField('Nalli', '_Android, iOS_\n[Visit website](https://nalli.app)', true)
      .addField('Nanollet', '_Windows, Mac, Linux_\n[Visit website](https://nanollet.org)', true)
      .addField('WeNano', '_iOS_\n[Visit website](https://wenano.net)', true)

		await interaction.reply({ embeds: [embed] });
	},
};