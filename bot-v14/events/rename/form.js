module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        if (interaction.customId === "rename-user") {
            const modal = new client.discord.ModalBuilder()
                .setCustomId('rename-modal')
                .setTitle('Se renommer sémentiquement');

            const name = new client.discord.TextInputBuilder()
                .setCustomId('name')
                .setLabel("Quel est ton Nom ?")
                .setPlaceholder('Nom')
                .setStyle(client.discord.TextInputStyle.Short)
                .setRequired(true);

            const surname = new client.discord.TextInputBuilder()
                .setCustomId('surname')
                .setLabel("Quel est ton Prénom ?")
                .setPlaceholder('Prénom')
                .setStyle(client.discord.TextInputStyle.Short)
                .setRequired(true);

            const years = new client.discord.TextInputBuilder()
                .setCustomId('years')
                .setLabel("Quel est ta période scolaire ?")
                .setPlaceholder('[2022-2025]')
                .setStyle(client.discord.TextInputStyle.Short)
                .setMinLength(11)
                .setMaxLength(11)
                .setRequired(true);

            const firstActionRow = new client.discord.ActionRowBuilder().addComponents(name);
            const secondActionRow = new client.discord.ActionRowBuilder().addComponents(surname);
            const thirdActionRow = new client.discord.ActionRowBuilder().addComponents(years);

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

            await interaction.showModal(modal);

        }
    }
}