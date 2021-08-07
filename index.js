// Extract the required classes from the discord.js module
const { Client, Intents, Collection } = require('discord.js');

// Create an instance of a Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// read commands
const fs = require('fs');
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

var tools = require('./tools');
var presence = require('./presence');

var sendAddressInfo = require('./handler/account');
var sendBlockInfo = require('./handler/block');

// client init

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  presence.updatePresence(client);
  setInterval(() => {presence.updatePresence(client)}, 30 * 1000)
});

client.on('messageCreate', msg => {
  // Do not react to own messages
  if (msg.author.id == client.user.id) {
    return;
  }

  if (tools.hasAddress(msg.content) || tools.hasBlockHash(msg.content)) {
    const emoji = '🔎';
    msg.react(emoji);
    const filter = (reaction, user) => reaction.emoji.name === emoji && user.id !== client.user.id;
    const collector = msg.createReactionCollector(filter, { time: 60 * 60 * 1000 });
    collector.on('collect', handleReaction);

  }
});

async function handleReaction(reaction, user){
  console.log(`Collected ${reaction.emoji.name}`, reaction.message.content)

  if(tools.hasAddress(reaction.message.content)){
    const address = tools.getAddress(reaction.message.content)[1];
    sendAddressInfo(client, user, address);
  } else if(tools.hasBlockHash(reaction.message.content)){
    const blockhash = tools.getBlockHash(reaction.message.content)[1];
    sendBlockInfo(client, user, blockhash);
  }
}

client.on('messageCreate', async message => {
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content.toLowerCase() === '.deploy' && message.author.id === client.application?.owner.id) {
    const commands = await client.guilds.cache.get(message.guildId)?.commands.set(client.commands);
    console.log(commands.size);

    message.reply('Deployed ' + commands.size + ' commands.')
  }
});

// dynamic commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (!client.commands.has(interaction.commandName)) return;

  try {
    await client.commands.get(interaction.commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(process.env.TOKEN);
