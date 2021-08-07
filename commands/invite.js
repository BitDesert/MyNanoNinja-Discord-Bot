module.exports = {
  name: 'invite',
  description: 'Displays the invite link for this bot',
  async execute(interaction) {
    await interaction.reply('https://discordapp.com/oauth2/authorize?client_id=' + interaction.client.user.id + '&scope=applications.commands');
  },
};