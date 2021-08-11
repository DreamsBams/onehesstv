// Pas terminé

Discord = require('discord.js');

module.exports = {
    run: (message, args, client) => {

    message.delete()
    const replies = [`Je crois bien que ${message.author.tag} a demandé un GIF !`, "Un gif aléatoire a été commandé je crois !"]
    message.replytext = Math.floor((Math.random() * replies.length) + 0);
    message.channel.send(replies[message.replytext]);
    message.channel.send(`https://bungeefield.uk/gif/`)

},
    name: 'gifs'
}