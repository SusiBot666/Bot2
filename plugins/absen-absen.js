let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*No hay ausentes en este grupo.!*_\n\n*${usedPrefix}empeieza hacer ausente* - empezar ausente`

    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*Estas ausente!*'
    absen.push(m.sender)
    m.reply(`Done!`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 ABSEN 」*

Tanggal: ${date}
${conn.absen[id][2]}

┌ *El que ha estado ausente:*
│ 
│ Total: ${absen.length}
│${list}
│ 
└────

_by Susi`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['absen ᴹᵘᵉˢᵗʳᵃ ᑫᵘᶦᵉⁿᵉˢ ᵉˢᵗᵃⁿ ᵃᵘˢᵉⁿᵗᵉˢ']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i
handler.group = true
module.exports = handler
