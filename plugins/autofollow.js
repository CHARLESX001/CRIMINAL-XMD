// In your main bot file
const AutoChannelFollowPlugin = require('./plugins/auto-channel-follow-plugin');

// Initialize plugin
const channelPlugin = new AutoChannelFollowPlugin(bot, {
    channelJid: '120363351653122969@newsletter',
    channelName: 'CRIMINAL XMD TECH',
    channelLink: 'https://whatsapp.com/channel/0029Vao2hgeChq6HJ5bmlZ3K',
    reminderInterval: 12 * 60 * 60 * 1000, // 6 hours
    autoReminders: true
});

await channelPlugin.initialize();
