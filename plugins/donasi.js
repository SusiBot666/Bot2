let handler = async m => m.reply(`
╭─〘Susana〙
│ • 𝑃𝑎𝑦𝑝𝑎𝑙 [paypal.me/smonterroza12]
│ • Pero con que me sigas en instagram me basta:)
│ https://www.instagram.com/susana_monterroza_/
╰────
╭─「 Mi número por cualquier cosa 」
│ > Wa.me/50377792043
│ > Wa.me/50377111111
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
