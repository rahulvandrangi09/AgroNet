window.addEventListener('DOMContentLoaded', () => {
    const chatbotFrame = document.getElementById('chatbot-frame');
    const baseUrl = "https://www.chatbase.co/chatbot-iframe/AgVHlK7rZz7MHmHuK1dwU";
    const timestamp = new Date().getTime(); // forces refresh
    chatbotFrame.src = `${baseUrl}?t=${timestamp}`;
  });

  
  