const { Client, Intents, MessageAttachment } = require('discord.js');
const axios = require('axios');
const { getCanvasImage, registerFont, UltimateTextToImage } = require("ultimate-text-to-image");



const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    const msg = message.content.trim().toLowerCase()
    if (msg == "!inspire") {
        const url = await getUrl();
        await message.channel.send(url);
    }
    else if (msg == "!don't inspire") {
        const url = await getUninspiringUrl();
        await message.channel.send(url);
    }
    else if (msg.startsWith("!quote")) {
        const buffer = await getQuoteURI(msg.substring(6).trim())
        const attachment = new MessageAttachment(buffer, 'quote.png')
        await message.channel.send(attachment);
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


getQuoteURI = async (quote) => {
    const url = await getUninspiringUrl();
    const canvas = await getCanvasImage({ url })

    registerFont("./impact.ttf", { family: "Impact", weight: 100 });


    const img = new UltimateTextToImage(quote,
        {
            width: 600,
            height: 600,
            valign: "middle",
            align: "center",
            bold: "bold",
            fontFamily: "Impact",
            fontSize: 72,
            fontColor: "#FFFFFF",
            strokeSize: 2,
            strokeColor: "#000000",
            backgroundColor: "#FFFFFF00",
            images: [
                {
                    canvasImage: canvas,
                    layer: -1, repeat: "fit"
                },
            ]
        }
    );
    rendered = img.render().toBuffer();
    return rendered
}


console.log(process.env.TOKEN);
client.login(process.env.TOKEN);
