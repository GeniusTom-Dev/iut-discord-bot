const config = require('./config.json')


module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const infoChannel = await client.channels.cache.get(config.renameChannel);

        const embedRename = new client.discord.EmbedBuilder()
            .setColor(config.colorEmbed)
            .setTitle(`Se renommer sur le discord !`)
            .setThumbnail(config.logo)
            .setDescription("Merci de vous renommer avec ce nouveau système sous peine de perdre vos rôle / être exclu du server.")
            .setFooter({text:`${config.serverName}`, iconURL: config.logo})

        const openRenameForm = new client.discord.ActionRowBuilder()
            .addComponents(
                new client.discord.ButtonBuilder()
                    .setCustomId('rename-user')
                    .setLabel('Se renommer')
                    .setEmoji('🙎‍♂️')
                    .setStyle(client.discord.ButtonStyle.Success)
            );


        let message

        infoChannel.messages.fetch({ limit: 1 }).then(async messages => {
            if(messages.size < 1){
                message = await infoChannel.send({embeds: [embedRename], components: [openRenameForm]})
            }
        })


    }
}

