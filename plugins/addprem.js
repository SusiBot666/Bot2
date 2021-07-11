let handler = async (m, { conn, text }) => {

    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw `tag orangnya!`
    if (global.prems.includes(who.split`@`[0])) throw 'el es premium!'
    global.prems.push(`${who.split`@`[0]}`)
    conn.reply(m.chat, `@${who.split`@`[0]} ahora eres premium!`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })

}
handler.help = ['addprem ˢᵒˡᵒ ˡᵃ ᵈᵘᵉⁿ̃ᵃ ᵈᵉˡ ᵇᵒᵗ ᵗᵉ ᵖᵘᵉᵈᵉ ʰᵃᶜᵉʳ ᵖʳᵉᵐᶦᵘᵐ']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)prem$/i

handler.rowner = true

module.exports = handler
