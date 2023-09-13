const TelegramBot = require('node-telegram-bot-api');

const token = '6581191454:AAGND36PxG56PO4iitOT3q0nbVxbfNNRC5U';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      keyboard: [
        ['¿Qué es el Dengue?', '¿Cuál es el riesgo de contraer Dengue?'],
        ['Medidas para prevenir infectarse con Dengue', '¿Qué sintomas se presentan al contraer Dengue?'],
        ['¿Qué tratamiento tomar en caso de infectarse?','¿Qué medidas tomar para evitar contagiar a otros?'],
      ],
      one_time_keyboard: true, // Ocultar el teclado después de usarlo
    },
  };

  bot.sendMessage(chatId, 'Selecciona una opción:', options);
});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  bot.sendMessage(chatId, `Seleccionaste: ${text}`);
});

console.log('Bot is running...');
