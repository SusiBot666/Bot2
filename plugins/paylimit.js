let { MessageType } = require('@adiwajshing/baileys')
let pajak = 0.02
let handler = async (m, { conn, text }) => {
    if (!text) throw 'Ingrese la cantidad de Límite que se otorgará'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Etiqueta uno'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (isNaN(txt)) throw 'sólo números'
    let poin = parseInt(txt)
    let limit = poin
    let pjk = Math.ceil(poin * pajak)
    limit += pjk
    if (limit < 1) throw 'Mínimo 1'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'Límite insuficiente para transferir'
    users[m.sender].limit -= limit
    users[who].limit += poin

    m.reply(`(${-poin} Limit) + (${-pjk} Limit (Pajak 2%)) = ( ${-limit} Limit)`)
    conn.fakeReply(m.chat, `+${poin} Limit`, who, m.text)
}
handler.help = ['paylimit @user ᴵⁿᵍʳᵉˢᵃ ˡᵃ ᶜᵃⁿᵗᶦᵈᵃᵈ']
handler.tags = ['xp']
handler.command = /^paylimit$/
handler.rowner = false

module.exports = handler

