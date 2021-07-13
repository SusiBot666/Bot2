const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Ya te as registrado\nQuiere volver a registrarte? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Formato incorrecto\n*${usedPrefix}lista nombre.edad*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Hey como te llamas, el nombre no puede estar estar vacío (Alphanumeric)'
  if (!age) throw 'Hey Cuantos años tienes🥱'
  age = parseInt(age)
  if (age > 120) throw 'Amigo deja el wssp, y métete al asilo 😂'
  if (age < 5) throw 'Los bebés no deben tener ni celular'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
「 REGISTRO EXITOSO 」
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
⏜⏜⏜⏜⏜⏜⏜⏜
⌲  *Informacion* 
⏝⏝⏝⏝⏝⏝⏝⏝
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
------------------------------
⌬ \`\`\`Nombre: ${name}\`\`\`
⌬ \`\`\`Edad: ${age} años\`\`\`
⌬ \`\`\`SN: ${sn}\`\`\`
------------------------------
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
⏜⏜⏜⏜⏜⏜⏜⏜
⍚ *NOTA*
⚠NO VAYAS A PERDER TU *SN* POR QUE ES MUY IMPORTANTE:D
⏝⏝⏝⏝⏝⏝⏝⏝
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
`.trim())
}
handler.help = ['reg'].map(v => v + ' ⁿᵒᵐᵇʳᵉ/ᵉᵈᵃᵈ')
handler.tags = ['exp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

