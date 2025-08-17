const config = require('../config')
const { cmd } = require('../command')
const os = require("os")
const { runtime, sleep } = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Show the bot's GitHub repository",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/CHARLESX001/CRIMINAL-XMD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await axios.get(`https://api.github.com/repos/CHARLESX001/CRIMINAL-XMD`);
        const repoData = response.data;

        const formattedInfo = `
╭─〔 *CRIMINAL-XMD REPOSITORY* 〕
│
├─ *📌 Repo Name:* ${repoData.name}
├─ *👤 Owner:* ${repoData.owner.login}
├─ *⭐ Stars:* ${repoData.stargazers_count}
├─ *⑂ Forks:* ${repoData.forks_count}
├─ *📄 Description:* ${repoData.description || 'Powerful WhatsApp Multi-Device Bot by charles'}
│
├─ *🔗 GitHub Link:*
│   ${repoData.html_url}
│
├─ *🌍 Channel:*
│   https://whatsapp.com/channel/0029Vao2hgeChq6HJ5bmlZ3K
│
╰─ *🚀 Powered by charles*
`.trim();

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/o4of0n.jpg` }, // you can change image
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363351653122969@newsletter',
                    newsletterName: 'CRIMINAL-XMD UPDATES',
                    serverMessageId: 110
                }
            }
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "CRIMINAL-XMD VERIFIED",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN: CRIMINAL-XMD;BOT;;;\nFN: CRIMINAL-XMD\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    } catch (error) {
        console.error("❌ Error fetching repo:", error);
        reply("❌ Failed to fetch repository info. Please try again later.");
    }
});
