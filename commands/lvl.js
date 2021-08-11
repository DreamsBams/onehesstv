// Activation/désactivation du système de levels
const { Permissions } = require('discord.js')
const fs = require('fs')
const levels = require("../levels.json")

module.exports = {
    run: async (message, args, client) => {

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send('T\'as pas le droit d\'utiliser cette commande.')

        if (levels["statutLevel"] == true) {
            levels["statutLevel"] = false
            fs.writeFileSync('./levels.json', JSON.stringify(levels))
            return message.channel.send('Tu viens d\'arrêter le système de level !')}

        else { levels["statutLevel"] = true
            fs.writeFileSync('./levels.json', JSON.stringify(levels))
            return message.channel.send('Tu viens d\'allumer le système de level !')
        }
        
    },

        name: 'lvl',
        guildOnly: true
}