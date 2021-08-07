module.exports = {
	name: 'invite',
	description: 'Displays the invite link for this bot',
	async execute(interaction) {
		await interaction.reply('Join the TNC Discord server at https://bit.ly/nanocenter-discord');
	},
};