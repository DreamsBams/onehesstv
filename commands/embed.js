//Modifier en v13 et trouver une utilité

const Discord = require('discord.js')

module.exports =  {
    run: message => {
const embed = (new Discord.MessageEmbed()
                .setTitle('『Voici les règles à respecter pour le bien du serveur』')
                .setDescription(`\n😄1. Avoir un langage approprié. \n\n🤬2. Les insultes ne sont pas tolérées sauf si jugées comme second degré. \n\n📨3. Interdiction de spam. \n\n📢4. Pas d'auto-proclamation ni de pub. \n\n🎤5. Si vous souhaitez jouer avec @Les HessStreamers pendant qu'ils stream, un micro correct est exigé. \n\n🤕6. Pas de harcèlement, d'abus ou d'intimidation \n\n🗯️6. Aucun contenu raciste, sexiste ou homophobe ne sera toléré. \n\n🏛️7. Aucune publication à caractère politique ou religieux. \n\n🚨8. Aucun piratage ou contenu suspect. \n\n🔕9. Ne pas mentionner @everyone, @les Hessstreamers, les admins et les modo. \n\n👍10. Une fois le règlement lu, nous vous invitons à cocher la réaction "✅" en dessous de ce post.\n\n**Une fois cette réaction cochée, nous jugerons toute infraction au règlement comme un avertissement. 3 avertissements mèneront à un ban du membre.**\n\n ꧁ Ces règles peuvent être soumises à des évolutions au cours du temps. ꧂`)
                .setColor('#67DC54'))
            message.channel.send({embeds: [embed]}).then(embedMessage => {
                embedMessage.react("✅")})
            },
    name: 'embed'

}