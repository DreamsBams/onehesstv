const moment = require('moment')
const { Permissions } = require('discord.js');
    Discord = require('discord.js')

moment.locale('fr')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('T\'as pas le droit d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Tu veux voir le casier judicière à qui ?')
        if (!client.db.warns[member.id]) return message.channel.send('Il est trop gentil pour avoir un casier judicière.')
        const embed = (new Discord.MessageEmbed()
            .setDescription(`**Total de bétises :** ${client.db.warns[member.id].length}\n\n__**10 dernières bétises**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
            .setColor('#ff0000')
            .setThumbnail('https://assets.stickpng.com/images/593007103919fe0ee3614d9e.png'))
        message.channel.send({embeds: [embed]})
    },
    name: 'infractions',
    guildOnly: true
}