Discord = require('discord.js')

module.exports = {
    run: async (message) => {

        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size
        let totalbots = message.guild.cache.filter(member => member.user.tag).length
        let test = onlines - totalbots

        console.log(test)
    },
    name: 'test'
}