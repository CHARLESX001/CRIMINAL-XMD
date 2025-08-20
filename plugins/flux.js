const axios = require("axios");
 const fetch = require('node-fetch')
let handler = async (m, { text,Bellah }) => {
  if (!text) {
    return m.reply('provide a text!');
  }
  try {
    m.reply('_Sending image..._');
    let apiUrl = `https://api.rynn-archive.biz.id/ai/flux-schnell?text=${encodeURIComponent(text)}`;
    let response = await fetch(apiUrl);
    let buffer = await response.buffer();
    await Bellah.sendMessage(m.chat, { image: buffer, caption: '*here are your results*' }, { quoted: m });
  } catch (error) {
    console.error('Error in flux:', error);
    m.reply('an error has occurred ');
  }
}; 
handler.help = ['flux']
handler.tags = ['txtimg']
handler.command = ['flux']


module.exports = handler;