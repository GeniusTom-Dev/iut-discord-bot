const config = require('../../config.json')
const ms = require('ms')
const fs = require('fs')

module.exports = {
    name: 'ready',
    async execute(interaction, client) {
        const guild = await client.guilds.cache.get(config.guildId)
        const logsChannel = await client.channels.cache.get(config.logsChannelId);
        
        function isExempted(member){
            isExemptedUser = false
            member.roles.cache.find(r => {
                if(r.id === config.adminRoleId || r.id === config.profRoleId || r.id === config.ancienRoleId ){
                    isExemptedUser =  true
                }
            })
            return isExemptedUser
        }

        function isValid(member){
            if(!member.user.bot){
                if(!isExempted(member)){
                    userNickName = member.nickname
                    if(!userNickName) return false
                    
                    if(!userNickName.includes("[") || !userNickName.includes("]")) return false
                    
                    userNickName = userNickName.split(" ")

                    if(userNickName.length < 3) return false

                    if (!userNickName[2].length === 11 || !userNickName[2].split("-")[0].slice(1).match(/^[0-9]+$/) || !userNickName[2].split("-")[1].slice(0, -1).match(/^[0-9]+$/)) return false

                    return true
                }
                return true               
            }
            return true
        }

        function checkAllPseudo(){
            guild.members.cache.map(member => {
                if(!isValid(member)){
                    fs.readFile('warnings.json', 'utf8', (err, data) => {
                        let jsonData = JSON.parse(data);
                        let memberWarning = 1
                        
                        const foundedUser = jsonData.find(data => data.id === member.id);

                        if(foundedUser){
                            foundedUser.warning += 1
                            memberWarning = foundedUser.warning
                        }else{
                            jsonData.push({
                                id: member.id,
                                warning: 1
                            })
                        }

                        if(memberWarning < 3){
                            member.send(`Ton pseudo n'est sémentiquement pas correct, change le vite avant la sanction ! c'est ton avertissement n°${memberWarning}`)
                            logsChannel.send(`Le membre: ${member.user.username} reçois sont avertissement n°${memberWarning}`)
                        }else if(memberWarning == 3){
                            logsChannel.send(`Le membre: ${member.user.username} reçois sont avertissement n°${memberWarning}, il à donc était **kick**`)
                            member.send(`Tu as était kick car tu n'a pas changer ton pseudo malgrès tes deux avertissement ! Tu peux revenir mais si tu te renomme pas tu sera directement banni.`)
                            setTimeout(() => {member.kick({reason: "Avertissement 3 ! Ne sais jamais renommer"})}, 1000)
                            
                           
                        }else if(memberWarning > 3){
                            member.send(`Tu as était banni car tu n'a pas changer ton pseudo malgrès tes trois avertissement ! Si tu veux avoir une chance de reveni contact GeniusTom#0450 en dm.`)
                            logsChannel.send(`Le membre: ${member.user.username} reçois sont avertissement n°${memberWarning}, il à donc était **ban**`)
                            setTimeout(() => {member.ban({reason: "Avertissement 4 ! Ne sais jamais renommer"})}, 1000)
                        }

                        data = JSON.stringify(jsonData);
                        fs.writeFile('warnings.json', data, (err) => {
                            if (err) {
                              throw err;
                            }
                            console.log('Le fichier a été enregistré!');
                        });
                    })


                    
                    
                }
            });
        }

        checkAllPseudo()
        

        setInterval (function () {
            checkAllPseudo()
        }, ms('30m'));
    }
}

