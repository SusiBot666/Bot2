const crypto = require('crypto')

const xp_first_time = 2500
const xp_link_creator = 15000
const xp_bonus = {
    5: 40000,
   10: 100000,
   20: 250000,
   50: 1000000,
  100: 10000000,
}

let handler = async (m, { conn, usedPrefix, text }) => {
  let users = global.db.data.users
  if (text) {
    if ('ref_count' in users[m.sender]) throw '¡No se puede usar el código de referencia!'
    let link_creator = (Object.entries(users).find(([, { ref_code }]) => ref_code === text.trim()) || [])[0]
    if (!link_creator) throw 'Código de referencia no válido'
    let count = users[link_creator].ref_count++
    let extra = xp_bonus[count] || 0
    users[link_creator].exp += xp_link_creator + extra
    users[m.sender].exp += xp_first_time
    users[m.sender].ref_count = 0
    m.reply(`
¡Felicidades!
+${xp_first_time} XP
`.trim())
    m.reply(`
Alguien ha utilizado su código de referencia
+${xp_link_creator + extra} XP
`.trim(), link_creator)
  } else {
    let code = users[m.sender].ref_code = users[m.sender].ref_code || new Array(11).fill().map(() => [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'][crypto.randomInt(62)]).join('')
    users[m.sender].ref_count = users[m.sender].ref_count ? users[m.sender].ref_count : 0
    let command_text = `${usedPrefix}ref ${code}`
    let command_link = `wa.me/${conn.user.jid.split('@')[0]}?text=${encodeURIComponent(command_text)}`
    let share_text = `
Obtener ${xp_first_time} XP para aquellos que usan el enlace / código de referencia a continuación

Referal Code: *${code}*

${command_link}
`.trim()
    m.reply(`
Obtener ${xp_link_creator} XP por cada nuevo usuario que use su código de referencia
${users[m.sender].ref_count} personas han usado su código de referencia

Tu código de referencia: ${code}

Comparte el enlace con tus amigos.: ${command_link}

o envía un mensaje a un amigo wa.me/?text=${encodeURIComponent(share_text)}

${Object.entries(xp_bonus).map(([count, xp]) => `${count} Orang = Bonus ${xp} XP`).join('\n')}
`.trim())
  }
}
handler.help = ['ref ᴳᵃⁿᵃ ˣᵖ ᶜᵒⁿ ᵗᵘ ᶜᵒ́ᵈᶦᵍᵒ']
handler.tags = ['exp']

handler.command = ['ref']

handler.register = true

module.exports = handler
