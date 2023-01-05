const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('badge')
        .setDescription('get badge'),


    async execute(interaction, client) {
        console.log("coucou");
        interaction.reply({content: `Commande executer`})
    }
}