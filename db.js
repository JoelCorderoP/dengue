const TelegramBot = require('node-telegram-bot-api');

// Sustituye 'TU_TOKEN' con el token proporcionado por el BotFather en Telegram
const token = '6581191454:AAGND36PxG56PO4iitOT3q0nbVxbfNNRC5U';

// Crea una instancia del bot
const bot = new TelegramBot(token, { polling: true });

// Definir las consultas disponibles y sus respuestas correspondientes
const consultasRespuestas = {
  '¿Qué es el Dengue?':
   'El dengue es una enfermedad <b>viral</b> transmitida por mosquitos, causada por el virus del dengue. Los mosquitos <i>Aedes aegypti</i> son los principales vectores que propagan el virus. Cuando un mosquito infectado pica a una persona, esta puede contraer la enfermedad. \nEs común en regiones tropicales y subtropicales como Centroamérica, Sudamérica y lugares donde se estanca el agua.',
  '¿Cuál es el riesgo de contraer Dengue?': 
  'En casos graves, el dengue puede complicarse convirtiéndose en dengue hemorrágico, cuando se presentan sangrados tanto internos como externos. O en shock hemorrágico, cuando la sangre no fluye a los órganos principales del cuerpo, lo que puede causar la muerte.',
  'Medidas para prevenir infectarse con Dengue': 
  '<b>Algunas de las medidas que podemos tomar para evitar infectarnos de dengue son las siguinetes</b>:\n\t• Usa ropa que cubra la mayor parte de tu cuerpo\n\t• No te expongas a la picadura de los moscos\n\t• Usa repelente contra mosquitos\n\t• Usa un pabellón o tela que cubra tu cama por completo\n\t• Instala mosquiteros en puertas y ventanas\n\t• Evita que se acumule basura\n\t• No dejes recipientes donde se acumule agua\n\t• Lava constantemente contenedores de agua, así como tinacos y cisternas\n\t• Utiliza larvicidas en contenedores para eliminar larvas de mosco\n\t• Usa insecticidas especiales para eliminar el mosco en su fase adulta',
  '¿Qué síntomas se presentan al contraer Dengue?': 
  'Los síntomas del dengue, conocido comúnmente como “<i>trancazo</i>” o “<i>fiebre quebrantahuesos</i>”, aparecen después de un periodo de 4 a 7 días. \n <b>Los sintomas más comunes son los siguientes:</b> \n\t• Fiebre\n\t• Dolor de huesos\n\t• Dolor de cabeza intenso (en la frente)\n\t• Dolor de ojos (que se incrementa al moverlos)\n\t• Erupción en la piel (parecida al sarampión)\n\t• Náuseas\n\t• Vómito\n\t• Insomnio\n\t• Prurito (comezón)\n\t• Falta de apetito\n\t• Dolor abdominal ',
  '¿Qué tratamiento tomar en caso de infectarse?': 
  'No existe un tratamiento específico para el dengue.\nEl tratamiento se centra en aliviar los síntomas, mantenerse bien hidratado y descansar. En casos graves, se requiere atención médica.',
  '¿Qué medidas tomar para evitar contagiar a otros?': 
  'El dengue no se transmite de una persona a otra y <b>actualmente no hay vacuna para combatirlo</b>.\n Sin embargo, es importante evitar que los mosquitos piquen y mantener una buena higiene personal.',
  '¿Crees que tienes dengue?':
  'Si crees que tienes dengue manten la calma y acude a tu clinica más cercana para que un experto de la salud realice una valoración.\nA continuacion te comparto algunas paginas que podrian ayudarte con el proceso.\n\t <a href="https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/vigencia">Vigencia de derechos IMSS</a>\n\t<a href="http://www.imss.gob.mx/tramites/imss02008">Localizacion de NSS</a>',
  'Más información - OMS' :
  '<a href="https://www.who.int/es/news-room/fact-sheets/detail/dengue-and-severe-dengue">Dengue - OMS</a>',
  'Más información - IMSS' :
  '<a href="http://www.imss.gob.mx/salud-en-linea/dengue">Dengue - IMSS</a>'
};

// Función para enviar un mensaje de bienvenida
function sendWelcomeMessage(chatId) {
  const message = 'Bienvenido soy Denguebot!';
  const options = {
    reply_markup: {
      keyboard: Object.keys(consultasRespuestas).map((consulta) => [consulta]),
      resize_keyboard: true,
    },
  };
  bot.sendMessage(chatId, message);
  setTimeout(() => {
    bot.sendMessage(chatId, 'Conmigo podrás obtener información relevante y precisa sobre la enfermedad del dengue.\nPor favor, selecciona una pregunta del menú:', options);
  }, 1000);
}

// Función para enviar respuestas divididas en varios mensajes
async function sendMultiPartResponse(chatId, text) {
  const maxMessageLength = 4096; // Longitud máxima de un mensaje en Telegram

  while (text.length > 0) {
    const messagePart = text.slice(0, maxMessageLength);
    text = text.slice(maxMessageLength);

    await bot.sendMessage(chatId, messagePart, { parse_mode: 'HTML' });
  }
}

// Manejar comandos
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sendWelcomeMessage(chatId);
});

// Manejar respuestas a las consultas
Object.keys(consultasRespuestas).forEach((consulta) => {
  bot.onText(new RegExp(consulta), async (msg) => {
    const chatId = msg.chat.id;
    const respuesta = consultasRespuestas[consulta];
    await sendMultiPartResponse(chatId, respuesta);
  });
});

// Manejar cualquier otro mensaje
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (!Object.keys(consultasRespuestas).some((consulta) => msg.text.includes(consulta))) {
    bot.sendMessage(chatId, 'No entiendo esa consulta. Por favor, elige una de las opciones proporcionadas.');
  }
});

// Manejar errores
bot.on('polling_error', (error) => {
  console.error(error);
});

console.log('El bot está funcionando...');
