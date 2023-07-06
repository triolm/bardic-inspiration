const { Client, Intents, Message } = require('discord.js');
const axios = require('axios');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.content.trim().toLowerCase() == "!inspire") {
        const url = await getUrl();
        await message.channel.send(url);
    }
    else if (message.content.trim().toLowerCase() == "!don't inspire") {
        const url = await getUninspiringUrl();
        await message.channel.send(url);
    }
});

getUrl = async () => {
    const res = await axios.get('https://inspirobot.me/api?generate=true');
    return await res.data;
}

getUninspiringUrl = async () => {
    const res = await axios.get('https://source.unsplash.com/random/600x600');
    return res.request.res.responseUrl
}


console.log(process.env.TOKEN); 
client.login(process.env.TOKEN);
