module.exports = {
  name: 'xnotrade',
  description: 'Invite for the XNO Trade Discord server',
  async execute(interaction) {
    await interaction.reply({ content: "**UNOFFICIAL XNO TRADE DISCORD**\n\nhttps://bit.ly/xnotrade-invite", ephemeral: true });
  },
};