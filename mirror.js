const Discord = require('discord.js-selfbot-v13');
const axios = require('axios');
const fs = require('fs');


const { token, roleId } = require('./config.js');
const channelWebhookMap = require('./webhookMap.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    if (channelWebhookMap.hasOwnProperty(message.channel.id)) {
        try {
            const avatarURL = message.author.displayAvatarURL({ format: 'png', dynamic: true });
            let content = message.content;
            let embeds = [];

            content = content.replace(/@everyone/g, `<@&${roleId}>`).replace(/@here/g, `<@&${roleId}>`); // Replace @everyone and @here with role ID
            content = content.replace(/<@&\d+>/g, ''); // Remove role mentions
            content = content.replace(/<#\d+>/g, '');  // Remove channel mentions
            content = content.replace(/https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+/g, '');  // Remove Discord message links

            if (message.attachments.size > 0) {
                message.attachments.forEach(attachment => {
                    content += `\n${attachment.url}`;
                });
            }

            if (message.stickers.size > 0) {
                message.stickers.forEach(sticker => {
                    content += `\nhttps://cdn.discordapp.com/stickers/${sticker.id}.png`;
                });
            }

            if (message.embeds.length > 0) {
                embeds = message.embeds.map(embed => {
                    const embedData = {};
                    if (embed.title) embedData.title = embed.title;
                    if (embed.description) embedData.description = embed.description;
                    if (embed.url) embedData.url = embed.url;
                    if (embed.color) embedData.color = embed.color;
                    if (embed.timestamp) embedData.timestamp = new Date(embed.timestamp).toISOString();
                    if (embed.author) embedData.author = { name: embed.author.name, url: embed.author.url, icon_url: embed.author.iconURL };
                    if (embed.footer) embedData.footer = { text: embed.footer.text, icon_url: embed.footer.iconURL };
                    if (embed.image) embedData.image = { url: embed.image.url };
                    if (embed.thumbnail) embedData.thumbnail = { url: embed.thumbnail.url };
                    if (embed.fields) embedData.fields = embed.fields.map(field => ({
                        name: field.name,
                        value: field.value,
                        inline: field.inline
                    }));
                    return embedData;
                });
            }

            const payload = {
                username: message.author.username,
                avatar_url: avatarURL,
                content: content.trim() || null,  
                embeds: embeds.length > 0 ? embeds : undefined
            };

            const webhookUrl = channelWebhookMap[message.channel.id];
            await axios.post(webhookUrl, payload);
            console.log(`Message from ${message.author.username} in channel ${message.channel.id} forwarded.`);
        } catch (error) {
            console.error('Error sending message through webhook:', error);
        }
    }
});

client.login(token);
