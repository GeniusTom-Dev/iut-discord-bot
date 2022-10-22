module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;

        const name = interaction.fields.getTextInputValue('name');
        const surname = interaction.fields.getTextInputValue('surname');
        const years = interaction.fields.getTextInputValue('years');

        const member = interaction.guild.members.cache.get(interaction.user.id);

        member.setNickname(`${name} ${surname} ${years}`)

        await interaction.deferUpdate();
    }
}