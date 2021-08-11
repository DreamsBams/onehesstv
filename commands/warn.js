const { Permissions } = require('discord.js')
const fs = require('fs')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('T\'as pas le droit d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Qui a fait des bétises ?')
        if (member.id === message.guild.ownerID) return message.channel.send('Mon créateur ne fait jamais de bétises.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Il n\'a rien fait mskn.')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Il a fait quoi comme bétises ?')
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} a un casier judicière car : **${reason}** !`)
    },
    name: 'warn',
    guildOnly: true
}