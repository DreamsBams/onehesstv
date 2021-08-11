const Discord = require('discord.js')
    replies = ['Oui', 'Non', 'Peut-être', 'Evidemment']

module.exports = {
    run: (message, args) => {
            const question = args.join(' ')
            if (!question) return message.channel.send('Pose une question')
            const embed = (new Discord.MessageEmbed()
                .setTitle(question)
                .setDescription(replies[Math.floor(Math.random() * replies.length)]));
message.channel.send({embeds: [embed]})
    },
    name: '8ball'
}