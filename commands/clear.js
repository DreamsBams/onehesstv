const { Permissions } = require('discord.js');

module.exports = {
    run: async (message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('T\'as pas le droit d\'utiliser cette commande.')
        const count = args[0]
        if(!/\d+/.test(count)) return message.channel.send('Tu veux effacer combien de messages bg ?')
        if (count < 1 || count > 99) return message.channel.send('Je peux seulement effacer entre 1 et 99 messages bg.')
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(`${size - 1} messages ont été supprimés.`)
        setTimeout(() => {
            message.channel.bulkDelete(1)
        }, 5000);
    },
    name: 'clear',
    guildOnly: true
}