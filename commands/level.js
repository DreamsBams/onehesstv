// Level actuel

const fs = require('fs')
const levels = require("../levels.json")

module.exports = {
    run: async (message, args, client) => {

       if (!levels["statutLevel"] == false) {
            if (levels["coinsUser"][message.member.id] < 50) {
                return message.channel.send('Tu n\'as pas encore assez de levels pour commencer l\'aventure !')
            } else {
                return message.channel.send(`Tu as ${levels["coinsUser"][message.member.id]} points !\nEt tu es ${levels["levelsUser"][message.member.id]} !`)
            }
       }
        
    },

        name: 'level',
        guildOnly: true
}