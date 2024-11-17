# Discord Message Forwarder Bot

![banner](https://media.discordapp.net/attachments/1260269061821042790/1307589115365031946/New_Project_13.png?ex=673adac2&is=67398942&hm=ec35bf533da24f4c64a84ed832a73c440382528189fea4d05dd7b6dee523940a&=&format=webp&quality=lossless&width=1702&height=888)

This project uses `discord.js-selfbot-v13` to forward messages from specific Discord channels to predefined webhooks. The bot processes messages, removes certain mentions, and forwards them along with embeds, attachments, and stickers.

## Features

- **Message Forwarding**: Captures messages from specified channels and forwards them to associated webhooks.
- **Mention Replacement**: Replaces `@everyone` and `@here` mentions with a specific role mention so that you wont get spammed.
- **Content Cleanup**: Removes role mentions, channel mentions, and message links.
- **Embed Support**: Extracts and forwards embed data (titles, descriptions, images, etc.) customizable 
- **Attachment and Sticker Handling**: Includes attachments and stickers in the forwarded content.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A Discord account and a valid token its a selfbot (Discord doesn't allow the use of selfbots, use the script at your own risk)
- The `discord.js-selfbot-v13`, `axios`, and `fs` modules installed.


## Installation

1. Clone the repository or download the code.
2. Install `discord.js-selfbot-v13`, `axios`, and `fs` if not using `npm install`.
3. Fill in the `config.js` file with discord account token role ID to be mentioned during `@everyone` and `@here` ping.
4. `webhookMap.json` to be filled with CHANNEL ID and Webhook Link.

   
