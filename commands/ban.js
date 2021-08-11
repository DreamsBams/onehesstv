const { Permissions } = require('discord.js');

module.exports = {
    run: async (message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send('T\'as pas le droit d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Tu veux ban qui ?')
        if (member.id === message.guild.ownerID) return message.channel.send('Tu peux pas ban mon créateur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Tu peux pas le ban.')
        if (!member.bannable) return message.channel.send('LeSapologue a autre chose à faire.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} a été ban !`)
    },
    name: 'ban',
    guildOnly: true
}