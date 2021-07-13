let levelling = require('../lib/levelling')

let handler = m => {
  let user = global.db.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    throw `
Level *${user.level} (${user.exp - min}/${xp})*
Menos *${max - user.exp}* de nuevo!
`.trim()
  }
  let before = user.level * 1
	while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
        let role = ((user.level >= 1) && (user.level <= 10)) ? 'Principiante'
          : ((user.level >= 10) && (user.level <= 20)) ? 'Aprendiz'
          : ((user.level >= 20) && (user.level <= 30)) ? 'Noob'
          : ((user.level >= 30) && (user.level <= 40)) ? 'Graduado'
          : ((user.level >= 40) && (user.level <= 50)) ? 'Experto'
          : ((user.level >= 50) && (user.level <= 60)) ? 'Maestro'
          : ((user.level >= 60) && (user.level <= 70)) ? 'Gran Maestro'
          : ((user.level >= 70) && (user.level <= 80)) ? 'Adicto al Bot'
          : 'Leyenda'

	if (before !== user.level) {
            m.reply(`
¡Felicitaciones, has subido de nivel!
*${before}* -> *${user.level}*
use *.profile* para verificar
	`.trim())
            user.role = role
        }
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^levelup$/i

module.exports = handler
