# ShoePlexRelay

A Chrome extension that relays messages from Telegram Web to Discord using webhooks.

## 🌟 Features

- Real-time message forwarding from Telegram Web to Discord
- Customizable Discord webhook integration
- Preserves sender information and channel context
- Clean and professional message formatting in Discord
- Easy to set up and configure

## 📋 Prerequisites

- Google Chrome browser
- Discord server with webhook permissions
- Access to Telegram Web (web.telegram.org)

## 🔧 Installation

1. Clone this repository:
```bash
git clone https://github.com/wes109/shoePlexRelay.git
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. Configure your Discord webhook URL in the extension popup

## ⚙️ Configuration

1. Create a webhook in your Discord server:
   - Go to Server Settings > Integrations > Webhooks
   - Click "New Webhook"
   - Copy the webhook URL

2. Click the extension icon in Chrome
3. Paste your Discord webhook URL
4. Save the configuration

## 🚀 Usage

1. Open [Telegram Web](https://web.telegram.org)
2. Navigate to any chat or channel
3. Messages will automatically be forwarded to your configured Discord channel

## 🔍 How It Works

The extension monitors Telegram Web for new messages using a content script. When a new message is detected, it:

1. Captures the message content
2. Extracts the sender and channel information
3. Formats the data into a Discord-compatible embed
4. Sends the message to Discord via webhook

## 🛡️ Privacy & Security

- The extension only activates on web.telegram.org
- No message data is stored permanently
- Webhook URLs are stored securely in Chrome's storage sync
- All communication is done directly between Telegram Web and Discord

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ by [wes109](https://github.com/wes109) 