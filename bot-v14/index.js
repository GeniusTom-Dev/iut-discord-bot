const Discord = require('discord.js');
const fs = require('fs');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents, partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],});
const {REST} = require('@discordjs/rest');
const {Routes, Collection} = require('discord.js');
const config = require('./config.json')



client.discord = Discord;

const eventFolder = fs.readdirSync("./events");

eventFolder.forEach(folder => {
    underFolder = fs.readdirSync("./events/"+folder);

    for (const file of underFolder) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args, client));
    };

});

const commandFolder = fs.readdirSync("./commands");
const commands = [];
client.commands = new Collection();



commandFolder.forEach(folder => {
    underFolder = fs.readdirSync("./commands/"+folder);

    for (const file of underFolder) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command)

    };

});

client.on('ready', () => {
    console.log(`${client.user.tag} Opérationnel`)

    const CLIENT_ID = client.user.id;

    const rest = new REST({version: '10'}).setToken(config.token);


    rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: commands
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);

        client.user.setPresence({
            activities: [{ name: `les pseudos`, type: client.discord.ActivityType.Watching }],
            status: 'online',
        });
});

client.login(config.token);