const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

const commonContextInfo = (sender) => ({
    mentionedJid: [sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363351653122969@newsletter',
        newsletterName: 'CRIMINAL-XMD Updates',
        serverMessageId: 143
    }
});

cmd({
    pattern: "menu",
    desc: "Display all bot commands in a simple list format.",
    category: "menu",
    react: "🌟",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname }) => {
    try {
        let totalCommands = Object.keys(commands).length;
        let cmdList = Object.keys(commands)
            .map(cmdName => `★ .*${cmdName}*`)
            .join('\n');

        let menuText = `
┌───〔 *CRIMINAL-XMD* 〕───┐
│ 👤 Owner: ${config.OWNER_NAME}
│ 📌 Prefix: ${config.PREFIX}
│ 🛠 Version: 1.0.0
│ 📊 Total Cmds: ${totalCommands}
│ ⏳ Uptime: ${runtime(process.uptime())}
└────────────────────────┘

📜 *COMMAND LIST*
${cmdList}

「 ⚡ Powered by ${config.OWNER_NAME} 」
`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: menuText,
            contextInfo: commonContextInfo(sender)
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { text: `❌ Error:\n${e}` }, { quoted: mek });
    }
});
