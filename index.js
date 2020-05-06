const Discord = require('discord.js');
const bot = new Discord.Client();

const PREFIX = '$';
const ms = require('ms');

var version = '1.0.0';

bot.on('ready', () => {
    console.log('This bot is online!')
    bot.user.setActivity('NoobBeast')
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");

    if (!channel) return;

    channel.send(`Welcome to the server, ${member} don\'t forget to read the rules!`);

});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            message.channel.send('pong!')
            break;
        case 'info':
            if (args[1] === 'version') {
                message.channel.send('Version ' + version);
            } else {
                message.channel.send('Invalid Args')
            }
            break;
        case 'purge':
            if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions to run that command!')
                .then(message => message.delete(5000));
            if (!args[1]) return message.reply('Error please define second argument')
            message.channel.bulkDelete(args[1]);
            break;

        case 'kick':
            if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions to run that command!')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('You were kicked for trolling!').then(() => {
                        message.reply(`${user.tag} has been kicked`);
                    }).catch(err => {
                        message.reply('i was unable to kick the member');
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn\'t in this server")
                }
            } else {
                message.reply('You need to specify a person!');
            }
            break;

        case 'ban':
            if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions to run that command!')

            const userToBan = message.mentions.users.first();

            if (userToBan) {
                const member = message.guild.member(userToBan);

                if (member) {
                    member.ban({
                        ression: 'You were bad!'
                    }).then(() => {
                        message.reply(`The user has been banned. ${userToBan.tag}`)
                    })
                } else {
                    message.reply("That user isn\'t in this server")
                }
            } else {
                message.reply('You need to specify a person!');
            }
            break;

        case 'mute':
            if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions to run that command!')    
        let GuildMember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
            if (!GuildMember) return message.reply("That User doesn\'t exist!");

            let mainrole = message.guild.roles.cache.find(role => role.name === "NoobBeasties")
            let muterole = message.guild.roles.cache.find(role => role.name === "Muted");

            if (!muterole) return message.reply("Couldn't find the mute role.")

            let time = args[2];

            if (!time) {
                return message.reply("You didn't specify a time!");
            }

            GuildMember.roles.remove(mainrole.id);
            GuildMember.roles.add(muterole.id);

            message.channel.send(`@${GuildMember.user.tag} has now been muted for ${ms(ms(time))}`);

            setTimeout(function () {
                GuildMember.roles.add(mainrole.id);
                GuildMember.roles.remove(muterole.id);
                message.channel.send(`@${GuildMember.user.tag} has been unmuted!`)
            }, ms(time));

            break;

            case 'creator':
            message.channel.send('SadCat#9999')

            break;

            case 'kys':
            message.channel.send('**no u**')

            break;

            case 'sms':
            message.channel.send('Number is out of use try another number.  Dont get a message after 3 minutes? go to next number. You have to add the number at amazon.sg.')
            
            break;
            case 'commands':
                const embed = new Discord.MessageEmbed()
                .setTitle('Commands')
                .addField('info version', ('Gives you info about the bot version.'))
                .addField('kys', ('Nice kys command.'))
                .addField('Mute (Time)', ('A classic mute command.'))
                .addField('ban', ('A classic ban command.'))
                .addField('kick', (' A classic kick command.'))
                .addField('creator', ('Gives you info about the creator.'))
                .addField('ping', ('This is a normal ping pong command.'))
                .addField('purge (amount)', ('deletes the given amount of messages'))
                .setColor(0xF300FF)
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter('Bot made by SadCat')
            message.channel.send(embed);

                break;
    

    }

});



bot.login(process.env.token);