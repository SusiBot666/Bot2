let handler = m => m

let levelling = require('../lib/levelling')
handler.before = m => {
	let user = global.db.data.users[m.sender]
	if (!user.autolevelup) return !0
	let before = user.level * 1
	while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
        let role = ((user.level >= 1) && (user.level <= 10)) ? 'Principiante'
          : ((user.level >= 10) && (user.level <= 20)) ? 'Aprendiz en proceso'
          : ((user.level >= 20) && (user.level <= 30)) ? 'Noob'
          : ((user.level >= 30) && (user.level <= 40)) ? 'Adicto al Bot'
          : ((user.level >= 40) && (user.level <= 50)) ? 'Graduado'
          : ((user.level >= 50) && (user.level <= 60)) ? 'Experto'
          : ((user.level >= 60) && (user.level <= 70)) ? 'Maestro'
          : ((user.level >= 70) && (user.level <= 80)) ? 'Gran Maestro'
          : 'Leyenda'

	if (before !== user.level) {
            m.reply(`
Felicitaciones, has subido de nivel!
*${before}* -> *${user.level}*
gunakan *.profile* untuk mengecek
	`.trim())
            user.role = role
        }
}

module.exports = handler
