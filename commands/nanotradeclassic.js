module.exports = {
  name: 'nanotradeclassic',
  description: 'Invite for the NanoTrade Classic Discord server',
  async execute(interaction) {
    await interaction.reply({ content: "**UNOFFICIAL NANO TRADE CLASSIC DISCORD**\n\nhttps://bit.ly/nanotradeclassic-invite", ephemeral: true });
  },
};