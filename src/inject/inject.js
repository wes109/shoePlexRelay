console.log("Starting Content Script..")
console.log("====== INITIALIZING ======")

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

var lastMessage;
var textMessage;
var embedMessage;
var theMessage;
var webhookUrl;

// Load webhook URL from storage
chrome.storage.sync.get(['webhookUrl'], function(result) {
    if (result.webhookUrl) {
        webhookUrl = result.webhookUrl;
    }
});

// Listen for changes to webhook URL
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.webhookUrl) {
        webhookUrl = changes.webhookUrl.newValue;
    }
});

function sendMessage(theMessage, channelTitle, lastMessageSender) {
    if (!webhookUrl) {
        console.log("No webhook URL configured. Please set it in the extension popup.");
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Format message for Discord
    var raw = JSON.stringify({
        "username": `${lastMessageSender} from ${channelTitle}`,
        "avatar_url": "https://i.imgur.com/2m85X7u.png",
        "embeds": [{
            "description": theMessage,
            "color": 5814783, // Discord Blurple color
            "footer": {
                "text": `Sent from ${channelTitle}`
            },
            "timestamp": new Date().toISOString()
        }]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(webhookUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(result => console.log("Message sent successfully"))
        .catch(error => console.log('Error sending message:', error));
}

async function checkStatus() {
    if (!document.querySelector('div[id*="message-"]')) {
        // console.log("No messages found yet");
        return;
    }

    var allMessages = document.querySelectorAll('div[id*="message-"]');
    if (allMessages.length === 0) return;

    var lastMessageElement = allMessages[allMessages.length - 1];
    var theMessage = lastMessageElement.textContent;
    
    // Get channel title from the chat header, default to "Telegram Channel" if not found
    var channelTitle = "Telegram Channel";
    var channelElement = document.querySelector('div[class="ChatInfo"] div[class*="title "]');
    if (channelElement) {
        channelTitle = channelElement.textContent.trim();
    }
    
    // Get sender name if available, default to "User" if not found
    var lastMessageSender = "User";
    var senderElement = lastMessageElement.querySelector('.sender-title');
    if (senderElement) {
        lastMessageSender = senderElement.textContent.trim();
    }

    // Check if message has changed
    if (theMessage === lastMessage) {
        // console.log("No new messages");
        return;
    }

    // Only send if we have a valid message
    if (theMessage && theMessage.trim() !== '') {
        lastMessage = theMessage;
        sendMessage(theMessage, channelTitle, lastMessageSender);
    }
}

window.setInterval(async function() {
    if (window.location.href.includes('web.telegram.org')) {
        checkStatus();
    }
}, 100);