const Discord = require('discord.js')

const intents = new Discord.Intents(32767)

const { Client, Intents } = require('discord.js')

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]
    ,partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'GUILD_MEMBER', 'USER']
})


    //client = new Discord.Client({
        //fetchAllMembers: true,
        //partials: ['MESSAGE', 'REACTION']
    //}),
    config = require('./config.json'),
    fs = require('fs')

client.on("ready", () => console.log("Bot is online"))



  


//const host = 'localhost';
//const port = 3000;

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

client.listen(port, host, function() {
    console.log("Server started.......");
  });







client.login(process.env.TOKEN)
client.commands = new Discord.Collection()
client.db = require('./db.json')

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(files => {
        if (!files.endsWith('.js')) return
        const command = require(`./commands/${files}`)
        client.commands.set(command.name, command)
    })
})

client.on('messageCreate', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Tu peux seulement utiliser cette commande dans un serveur.')
    command.run(message, args, client)
})



client.on('guildMemberAdd', member => {

    // member.send('Pour envoyer en dm')
    const aeroportChannel = "797232012888768533"
    const embed = (new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. **Nous sommes désormais ${member.guild.memberCount} !** 🎉`)
        .setColor('#62D5E1'))

    const channel = member.guild.channels.cache.get(aeroportChannel)
        channel.send({embeds: [embed]})

        member.roles.add(["874283271490523176"])

    //member.roles.get(config.greeting.role)
    //member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
});


//const otherIntents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MEMBER_REMOVES]);

client.on('guildMemberRemove', member => {

    const aeroportChannel = "797232012888768533"
    const embed = (new Discord.MessageEmbed()
        .setDescription(`${member.user.username} a quitté le serveur... 😭`)
        .setColor('#E16262'))

        const channel = member.guild.channels.cache.get(aeroportChannel)
        channel.send({embeds: [embed]})
})



client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(emoji.roles)
    else reaction.users.remove(user)
})




client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(emoji.roles)
})

client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.size} serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`,
        () => `RocketLeague (Gros Champion SuperGras)`
    ]
    let i = 0

    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'PLAYING'}, 1e4)
        i = ++i % statuses.length
    }, 1e4)

    setInterval(() => {
            const [bots,humans] = client.guilds.cache.first().members.cache.partition(member => member.user.bot)
            client.channels.cache.get(config.serverStats.humans).setName(`🧍 Humains : ${humans.size}`)
            client.channels.cache.get(config.serverStats.bots).setName(`🤖 Bots : ${bots.size}`)
            client.channels.cache.get(config.serverStats.total).setName(`🌍 Population : ${client.guilds.cache.first().memberCount}`)
    }, 3e4)
})

// Reglement

client.on('messageReactionAdd', (reaction, user) => {

})



client.on('messageReactionRemove', (reaction, user) => {

})


// Levels

const levels = require("./levels.json")

function Savelevels() {
    fs.writeFileSync('./levels.json', JSON.stringify(levels, null, 4))
}

function addRandomInt(member) {
    levels["coinsUser"][member.id] = levels["coinsUser"][member.id] + Math.floor(Math.random() * (4 - 1) + 1)
    Savelevels()
}

client.on('messageCreate', (message, member) => {
   
    const levelupChannel = "800421631351586816"

    addRandomInt(message.member)
    if (!levels["coinsUser"][message.member.id]) {
        levels["coinsUser"][message.member.id] = Math.floor(Math.random() * (4 - 1) + 1)
        levels["levelsUser"][message.member.id] = 1
        Savelevels()
    }
    
    //Départ
    else if (levels["coinsUser"][message.member.id] > 50 && levels["coinsUser"][message.member.id] < 250) {
            if  (levels["levelsUser"][message.member.id] == 1) {
                levels["levelsUser"][message.member.id] = "un Saiyan"
                Savelevels()

const embed = (new Discord.MessageEmbed()
        //return message.guild.channels.cache.get(config.greeting.levelup).send(new Discord.MessageEmbed()
        .setTitle(`Salut à toi jeune Saiyan !`)
        .setDescription(`**Une nouvelle aventure commence ${message.author} ! Prépare toi à prendre de la puissance !** \n Plus tu écriras de messages, plus tu deviendras fort ! Jusqu'à où ta force pourra-t-elle aller ? `)
        .setImage('https://media1.tenor.com/images/bf4cca58514197f13d8a1cbbf4959a0e/tenor.gif?itemid=11577624')
        .setColor('#D42C26'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
    channel.send({embeds: [embed]})

        }
    }

    //Oozaru
    else if (levels["coinsUser"][message.member.id] > 250 && levels["coinsUser"][message.member.id] < 1000) {
        if  (levels["levelsUser"][message.member.id] == "un Saiyan") {
            levels["levelsUser"][message.member.id] = "un Oozaru"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Ne jamais regarder le lune !`)
        .setDescription(`**Ta puissance a été multiplié par 10 ${message.author} !**\n Les saiyans possédant une queue peuvent se transformer en **Oozaru** si ils regardent la lune.`)
        .setImage('https://i.pinimg.com/originals/05/84/e9/0584e92da933544385c0c24049e7644e.gif')
        .setColor('#4C211F'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
    channel.send({embeds: [embed]})
        }
    }
    
    //Kaïô-Ken
    else if (levels["coinsUser"][message.member.id] > 1000 && levels["coinsUser"][message.member.id] < 2000) {
        if  (levels["levelsUser"][message.member.id] == "un Oozaru") {
            levels["levelsUser"][message.member.id] = "en Kaïô-Ken"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Kaïô-Ken !`)
        .setDescription(`**${message.author} a été s'entrainer chez Maître Kaïô et maitrise désormais sa téchnique !**\nLe **Kaïô-Ken** permet de multiplier le potentiel de combat. Il nécessite cependant une grande résistance corporelle.`)
        .setImage('https://media1.tenor.com/images/9d722b44175b5e3b830435f6e5a49152/tenor.gif?itemid=13198052')
        .setColor('#E0170D'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }

    //Kaïô-Ken x4
    else if (levels["coinsUser"][message.member.id] > 2000 && levels["coinsUser"][message.member.id] < 3500) {
        if  (levels["levelsUser"][message.member.id] == "en Kaïô-Ken") {
            levels["levelsUser"][message.member.id] = "en Kaïô-Ken x4"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Kaïô-Ken x4 !`)
        .setDescription(`**Pour vaincre Vegeta, ${message.author} dépasse les limites du Kaïô-Ken malgré les avertissements de Maitre Kaïô !**\n Il multiplie sa puissance par 4 face au **Gyarikku Hō** de Vegeta !`)
        .setImage('https://media1.tenor.com/images/28339bef787686e16fc59e2aceca211e/tenor.gif?itemid=13964178')
        .setColor('#E0170D'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }

    //SSJ1
    else if (levels["coinsUser"][message.member.id] > 3500 && levels["coinsUser"][message.member.id] < 5000) {
        if  (levels["levelsUser"][message.member.id] == "en Kaïô-Ken x4") {
            levels["levelsUser"][message.member.id] = "un Supā Saiya-jin"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Sūpā Saiya-jin !`)
        .setDescription(`**${message.author} se transforme en Super Saiyan et multiplie sa puissance par 50 !**\nVa-t-il venir à bout du grand **Furîza** ?`)
        .setImage('https://i0.wp.com/comicbookdebate.com/wp-content/uploads/2019/07/GrotesqueGorgeousAmurratsnake-size_restricted.gif?resize=533%2C300&ssl=1')
        .setColor('#E9C610'))
        
const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }

    //SSJ1 2
    else if (levels["coinsUser"][message.member.id] > 5000 && levels["coinsUser"][message.member.id] < 7500) {
        if  (levels["levelsUser"][message.member.id] == "un Supā Saiya-jin") {
            levels["levelsUser"][message.member.id] = "en Sūpā Saiya-jin dai ni-dankai"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Sūpā Saiya-jin dai ni-dankai !`)
        .setDescription(`**${message.author} s'est entrainé dans la salle du temps pour développer une forme plus évolué du Super Saiyan !**\nSous cette forme, du **Ki** est concentré dans le corps pour gonfler les muscles. Elle augmente à la fois la puissance et la vitesse.`)
        .setImage('https://i.imgur.com/t6wxSZM.gif')
        .setColor('#E9C610'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }

    //SSJ1 3
    else if (levels["coinsUser"][message.member.id] > 7500 && levels["coinsUser"][message.member.id] < 10000) {
        if  (levels["levelsUser"][message.member.id] == "en Sūpā Saiya-jin dai ni-dankai") {
            levels["levelsUser"][message.member.id] = "en Sūpā Saiya-jin dai san-dankai"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Sūpā Saiya-jin dai san-dankai !`)
        .setDescription(`**${message.author} a atteint une forme supérieure au Sūpā Saiya-jin dai ni-dankai !**\nLa prise de muscle produit une plus grande prise de puissance que le **Sūpā Saiya-jin dai ni-dankai**. Cependant, il va vite comprendre comprendre que son inconvénient est une perte importante de vitesse.`)
        .setImage('https://i.pinimg.com/originals/a0/0a/d0/a00ad0fe0d8ad773c3c0f40138d9308e.gif')
        .setColor('#E9C610'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }

    //SSJ2
    else if (levels["coinsUser"][message.member.id] > 10000 && levels["coinsUser"][message.member.id] < 13000) {
        if  (levels["levelsUser"][message.member.id] == "en Sūpā Saiya-jin dai san-dankai") {
            levels["levelsUser"][message.member.id] = "en Sūpā Saiya-jin 2"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Sūpā Saiya-jin 2 !`)
        .setDescription(`**La destruction de c16 par Seru, ${message.author} se transforme en Sūpā Saiya-jin 2** et sa puissance est multiplié par 100 !`)
        .setImage('https://c.tenor.com/VDxck1mL8IEAAAAC/gohan-crying.gif')
        .setColor('#E9C610'))

const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }

    //SSJ3
    else if (levels["coinsUser"][message.member.id] > 13000 && levels["coinsUser"][message.member.id] < 15000) {
        if  (levels["levelsUser"][message.member.id] == "en Sūpā Saiya-jin 2") {
            levels["levelsUser"][message.member.id] = "en Sūpā Saiya-jin Surī"
            Savelevels()

const embed = (new Discord.MessageEmbed()
        .setTitle(`Sūpā Saiya-jin !`)
        .setDescription(`**${message.author} se transforme en Super Saiyan 3 et multiplie sa puissance par 300 !**\nAvait-il vraiment cette transformation en secret depuis tout ce temps ?`)
        .setImage('https://thumbs.gfycat.com/BabyishDistantAttwatersprairiechicken-size_restricted.gif')
        .setColor('#E9C610'))
        
const channel = message.member.guild.channels.cache.get(levelupChannel)
        channel.send({embeds: [embed]})
        }
    }
})
