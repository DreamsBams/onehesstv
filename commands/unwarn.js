const { Permissions } = require('discord.js')
const fs = require('fs')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('T\'as pas le droit d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('De quel membre veux-tu oublié une bétise ?')
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a pas fait de bétises.')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Quelle est le numéro de la bétise ?')
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member} s\'est fait pardonné : **${reason}** `)
    },
    name: 'unwarn',
    guildOnly: true
}