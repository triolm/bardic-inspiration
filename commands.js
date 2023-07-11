const { SlashCommandBuilder } = require('discord.js');

module.exports =
    [
        new SlashCommandBuilder()
            .setName('inspire')
            .setDescription('Get a random inspirational image from InspiroBot\'s API'),
        new SlashCommandBuilder()
            .setName("unspire")
            .setDescription("Get a random image (without an inspirational quote) from Unsplash's API"),
        new SlashCommandBuilder()
            .setName("quote")
            .setDescription("Create an inspirational quote image")
            .addStringOption(option => (
                option.setName("text")
                    .setDescription("inspirational quote")
                    .setRequired(true)
            ))

    ]
