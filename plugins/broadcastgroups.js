let handler  = async (m, { conn, text }) => {
  let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message && !v.announce).map(v => v.jid)
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Enviar un mensaje de difusión a ${groups.length} grupos_`, m)
  for (let id of groups) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks + '\n' + readMore + '「 All Group Broadcast 」\n' + randomID(32)), true).catch(_=>_)
  m.reply('Listo, Transmitir todo el grupo :)')
}
handler.help = ['broadcastgroup'].map(v => v + ' ᴹᵉⁿˢᵃʲᵉ ᵈᵉ ᵈᶦᶠᵘˢᶦᵒⁿ ᵃ ᵗᵒᵈᵒˢ ˡᵒˢ ᵍʳᵘᵖᵒˢ')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
