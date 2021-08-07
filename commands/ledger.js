module.exports = {
  name: 'ledger',
  description: 'Download link to the current Nano ledger',
  async execute(interaction) {
    await interaction.reply('Use this link to download the official ledger from Yandex Disk: https://mynano.ninja/api/ledger/download\n' +
    '```bash\n' +
    'wget "https://mynano.ninja/api/ledger/download" -O ledger.7z' +
    '```');
  },
};