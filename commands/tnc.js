module.exports = {
  name: 'tnc',
  description: 'Invite for the The Nano Center Discord server',
  async execute(interaction) {
    await interaction.reply('Join the TNC Discord server at https://bit.ly/nanocenter-discord');
  },
};