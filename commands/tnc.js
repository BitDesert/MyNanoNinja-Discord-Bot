module.exports = {
	name: 'tnc',
	description: 'Invite for the The Nano Center Discord server',
	async execute(interaction) {
		await interaction.reply('https://discordapp.com/oauth2/authorize?client_id=' + interaction.client.user.id + '&scope=applications.commands');
	},
};