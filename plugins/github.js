const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: "git",
  desc: "Fetch detailed GitHub user profile including profile picture.",
  category: "github",
  react: "🫂",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const username = args[0];
    if (!username) {
      return reply("Please provide a GitHub username.");
    }

    const apiUrl = `https://api.github.com/users/${username}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    let userInfo = `👤 *Username*: ${data.name || data.login}
🔗 *Github Url*: (${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}
> © charles`;

    await conn.sendMessage(from, {
      image: { url: data.avatar_url },
      caption: userInfo,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363351653122969@newsletter",
          newsletterName: "CRIMINAL XMD",
          serverMessageId: 1
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    reply(`❌ Error: ${e.response ? e.response.data.message : e.message}`);
  }
});
