let handler = async (m, { conn, command, args }) => {
  let chats
  if (/group|gc/i.test(args[0])) chats = conn.chats.array.filter(v => v.jid.endsWith('g.us') && !v.pin).map(v => v.jid)
  else if (/chat|private/i.test(args[0])) chats = conn.chats.array.filter(v => v.jid.endsWith('.net') && !v.pin).map(v => v.jid)
  else if (/all/i.test(args[0])) chats = conn.chats.array.filter(v => v.jid && !v.pin).map(v => v.jid)
  else chats = [m.chat]
  let isDelete = /^(delete)/i.test(command)
  let isClear = /^(clear)/i.test(command)
  for (let id of chats) {
    if (isDelete || isClear) await conn.modifyChat(id, (isDelete ? 'delete' : 'clear'), {
      includeStarred: false
    }).catch(console.log)
    else await conn.modifyChat(id, 'mute', -Math.floor(new Date / 1e3) * 1e3 - 1e3).catch(console.log)
  }
  conn.reply(m.chat, chats.length + ` chat ${args[0] ? args[0] : ''} ha estado en` + ((isDelete || isClear) ? 'limpiar' : 'llenar para siempre'), m)
}
handler.help = [
  'clearchat', 
  'clearchat group',  
  'deletechat',
  'deletechat group',  
  'mutechat',
  'mutechat group',
]
handler.tags = ['owner']
handler.command = /^(clear|delete|mute)chat$/i
handler.owner = true

module.exports = handler
