const { Client, Routes, GatewayIntentBits, REST } = require('discord.js');
const commands = require("./commands.js");
const { txtCmdHandler, interactionHandler } = require('./handlers.js');
process.noDeprecation = true;


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', txtCmdHandler);

client.on('interactionCreate', interactionHandler)

client.login(process.env.TOKEN);


const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENTID),
            { body: commands },
        );
        console.log('Successfully reloaded application commands.');
    } catch (error) {
        console.error(error);
    }
})();