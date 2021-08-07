module.exports = {
  name: 'sponsor',
  description: '❤ Sponsor the development of this bot',
  async execute(interaction) {
    await interaction.reply('Thanks a lot! https://github.com/sponsors/BitDesert');
  },
};