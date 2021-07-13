// By RC047 :V

let handler = async(m, { conn, text }) => {
    if (!text) throw 'Ingrese un informe'
    if (text.length > 300) throw 'Lo siento, el texto es demasiado largo, máximo 300 textos!'
    const laporan = `*「 REPORT 」*\nNumero : wa.me/${m.sender.split`@`[0]}\nQueja : ${text}`
    for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid && v != '6281515860089@s.whatsapp.net'))
    m.reply(laporan, jid)
    m.reply(laporan, m.sender) // Mwehehehehe
    m.reply('️El problema se ha informado al propietario del robot, no se responderán los informes falsos!')
}
handler.help = ['bug'].map(v => v + ' ᴿᵉᵖᵒʳᵗᵃ ᶜᵘᵃˡᑫᵘᶦᵉʳ ᵇᵘᵍ ʳᵉᵃˡ')
handler.tags = ['info']
handler.command = /^(bug|report)$/i

module.exports = handler
