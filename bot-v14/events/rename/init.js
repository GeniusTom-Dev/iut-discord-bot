const config = require('../../config.json')


module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const renameChannel = await client.channels.cache.get(config.renameChannelId);

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
                    .setStyle('Success')
            );


        let message

        renameChannel.messages.fetch({ limit: 1 }).then(async messages => {
            if(messages.size < 1){
                await renameChannel.send({embeds: [embedRename], components: [openRenameForm]})
            }
        })


    }
}

