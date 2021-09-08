module.exports = {
  name: 'nanotrade',
  description: 'Invite for the NanoTrade Discord server',
  async execute(interaction) {
    await interaction.reply({ content: "**UNOFFICIAL NANO TRADE DISCORD**\n\nhttps://bit.ly/nanotrade-discord", ephemeral: true });
  },
};