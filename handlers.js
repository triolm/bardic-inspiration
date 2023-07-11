const { getQuoteURI, getUninspiringUrl, getUrl } = require("./images.js")
const { AttachmentBuilder } = require('discord.js');
module.exports.txtCmdHandler = async message => {
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
        const attachment = new AttachmentBuilder(buffer, {name:'quote.png'})
        await message.channel.send({files: [attachment]});
    }
}

module.exports.interactionHandler = async interaction => {
    try {
        if (!interaction.isCommand()) return;
        if (interaction.commandName == "inspire") {
            const url = await getUrl();
            await interaction.reply(url);
        }
        else if (interaction.commandName == "unspire") {
            const url = await getUninspiringUrl();
            await interaction.reply(url);
        }
        else if (interaction.commandName == "quote") {
            const buffer = await getQuoteURI(interaction.options.get("text").value)
            const attachment = new AttachmentBuilder(buffer, {name:'quote.png'})
            await interaction.reply({files:[attachment]});
        }
    } catch (e) {
        await interaction.reply("An error occurred.")
        console.log(e)
    }
}

