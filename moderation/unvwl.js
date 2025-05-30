const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const wl = new db.table("Whitelist")
const wlcount = new db.table("Wlcount")
const cl = new db.table("Color")
const config = require("../config")
const footer = config.bot.footer

module.exports = {
    name: 'unvl',
    usage: 'unvl',
    category: "owner",
    description: `Permet de gérer la vocal whitelist.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (wl.get(`${message.guild.id}.${member.id}.vl`) === null) { return message.channel.send(`${member.username} n'est pas dans la whitelist vocal.`) }
                wl.subtract(`${message.guild.id}.vlcount`, 1)
                wl.delete(`${message.guild.id}.${member.id}.vl`, member.id)
                message.channel.send(`${member.username} n'est plus dans la whitelist vocal.`)


            }
        }
    }
}
