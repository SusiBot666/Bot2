//made by Anshul
const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
const effects = ['jail', 'gay', 'glass', 'wasted' ,'triggered']

let handler = async (m, { conn, usedPrefix, text }) => {
    let effect = text.trim().toLowerCase()
  if (!effects.includes(effect)) throw `
*Usa:* ${usedPrefix}stickmaker <nombre del efecto>
*Ejemplo:* ${usedPrefix}stickmaker jail

*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No se ha encontrado ninguna imagen'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `${mime} no es compatible`
  let img = await q.download()
  let url = await uploadImage(img)
  let apiUrl = global.API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
    avatar: url
  })
try {
    let stiker = await sticker(null, apiUrl, global.packname, global.author)
    await conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  } catch (e) {
    m.reply('Conversion to Sticker Failed, Sending as Image Instead')
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m)
  }
}

handler.help = ['stickmaker ᴸᵉ ᵖᵒⁿᵉ ᵉᶠᵉᶜᵗᵒˢ ᵃ ˡᵒˢ ˢᵗᶦᶜᵏᵉʳˢ']
handler.tags = ['sticker']
handler.command = /^(stickmaker)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler
