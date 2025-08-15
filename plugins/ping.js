const { cmd } = require('../command');
const moment = require('moment-timezone');
const { performance } = require('perf_hooks');

function runtime() {
  let sec = process.uptime();
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = Math.floor(sec % 60);
  return `${hrs}h ${mins}m ${secs}s`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  desc: "Stylish ping with heartbeat",
  category: "system",
  filename: __filename
}, async (Void, m, text) => {

  const start = performance.now();
  const jtime = moment.tz('Africa/Nairobi').format("HH:mm:ss");
  const jdate = moment.tz('Africa/Nairobi').format("DD/MM/YY");
  const uptime = runtime();

  // ✅ Fake verified vCard quoted message
  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PKDRILLER | PK-XMD",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER | PK-XMD\nORG:PKDRILLER;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  // 📢 Forwarded Newsletter + Thumbnail
  const contextInfo = {
    externalAdReply: {
      title: "⚡ PK-XMD • Ping Command",
      body: `🕒 ${jtime} | 📅 ${jdate}`,
      thumbnailUrl: 'https://files.catbox.moe/fgiecg.jpg',
      sourceUrl: 'https://github.com/mejjar00254/PK-XMD',
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    },
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "PK-XMD Official"
    }
  };

  const end = performance.now();
  const speed = (end - start).toFixed(2);

  // ⚡ Send Ping message
  await Void.sendMessage(m.chat, {
    text: `*⚡Ping:* ${speed}ms\n*⏱️Uptime:* ${uptime}`,
    contextInfo
  }, { quoted: fakeContact });

  // 💓 Animated Emoji Heartbeat
  const emojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'];
  const sent = await Void.sendMessage(m.chat, {
    text: emojis[0],
    contextInfo
  }, { quoted: fakeContact });

  for (let i = 1; i < emojis.length; i++) {
    await sleep(1000);
    await Void.sendMessage(m.chat, {
      text: emojis[i],
      edit: sent.key,
      contextInfo
    });
  }
});
    
