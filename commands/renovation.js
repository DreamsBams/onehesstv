const Discord = require('discord.js')

module.exports = {
    run: message => {
        const embed = (new Discord.MessageEmbed()
            .setTitle('🚧 **Ce salon est en rénovation ! Reviens plus tard !** 🚧')
            .setColor('#E0962A'))

        message.channel.send({embeds: [embed]})
    },
    name: 'renovation'
}