const axios = require("axios");
const { cmd } = require("../command");
const { sleep } = require('../lib/functions');

// Quoted contact for newsletter context
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "CRIMINAL XMD VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: CRIMINAL VERIFIED ✅\nORG: CRIMINAL XMD BOT;\nTEL;type=CELL;type=VOICE;waid=254744444447:+2557444444444\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "screenshot",
  react: "📸",
  alias: ["ss", "ssweb"],
  desc: "Capture a full-page screenshot of a website.",
  category: "utility",
  use: ".screenshot <url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const url = args[0];
    if (!url) return reply("❌ Please provide a URL\nExample: .screenshot https://google.com");
    if (!url.startsWith("http")) return reply("❌ URL must start with http:// or https://");

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363351653122969@newsletter",
        newsletterName: "CRIMINAL XMD",
        serverMessageId: 33
      }
    };

    await reply("🔄 Taking screenshot... Please wait", { quoted: quotedContact });

    await sleep(1500);

    const caption = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🖼️ *Screenshot Generated*
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ >  open the link 
┗━━━━━━━━━━━━━━━━━━━━━━━`;

    await conn.sendMessage(from, {
      image: { url: `https://image.thum.io/get/fullpage/${url}` },
      caption,
      contextInfo
    }, { quoted: quotedContact });

  } catch (error) {
    console.error("Screenshot Error:", error);

    const captionError = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ❌ *Failed to capture screenshot*
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ ✦ Please try again later
┗━━━━━━━━━━━━━━━━━━━━━━━`;

    await conn.sendMessage(from, {
      text: captionError,
      contextInfo
    }, { quoted: quotedContact });
  }
});
