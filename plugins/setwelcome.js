let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    if (isROwner) global.conn.welcome = text
    else if (isOwner) conn.welcome = text
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('Bienvenida arreglada con éxito\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)')
  } else throw 'Teksnya mana?'
}
handler.help = ['setwelcome ᴹᵒᵈᶦᶠᶦᶜᵃ ˡᵃ ᵇᶦᵉⁿᵛᵉⁿᶦᵈᵃ']
handler.tags = ['owner', 'group']

handler.command = /^setwelcome$/i
module.exports = handler

