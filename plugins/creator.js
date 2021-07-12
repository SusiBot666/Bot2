function handler(m) {
  // Ini cuma contoh, jgn di uncomment -_-
  // F this.sendContact(m.chat, '62815158600891', 'Nurutomo', m)
  this.sendContact(m.chat, '50377111111', 'Susi.li', m)
}
handler.help = ['owner ᴺᵘᵐᵉʳᵒ ᵈᵉ ˡᵃ ᶜʳᵉᵃᵈᵒʳᵃ ᵈᵉˡ ᵇᵒᵗ', 'creator ᴺᵘᵐᵉʳᵒ ᵈᵉ ˡᵃ ᶜʳᵉᵃᵈᵒʳᵃ ᵈᵉˡ ᵇᵒᵗ']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
