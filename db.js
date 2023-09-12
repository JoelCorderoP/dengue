const TelegramBot = require('node-telegram-bot-api');

// Reemplaza 'TU_TOKEN' con el token proporcionado por el BotFather en Telegram
const token = '6581191454:AAGND36PxG56PO4iitOT3q0nbVxbfNNRC5U';

// Crea una instancia del bot
const bot = new TelegramBot(token, { polling: true });

// Definir las consultas disponibles y sus respuestas correspondientes
const consultasRespuestas = {
  '¿Qué es el Dengue?':
   'El dengue es una enfermedad viral transmitida por mosquitos, causada por el virus del dengue. Los mosquitos Aedes aegypti son los principales vectores que propagan el virus. Cuando un mosquito infectado pica a una persona, esta puede contraer la enfermedad. \nEs común en regiones tropicales y subtropicales como Centroamérica, Sudamérica y lugares donde se estanca el agua.',
  '¿Cuál es el riesgo de contraer Dengue?': 
  'En casos graves, el dengue puede complicarse convirtiéndose en dengue hemorrágico, cuando se presentan sangrados tanto internos como externos. O en shock hemorrágico, cuando la sangre no fluye a los órganos principales del cuerpo, lo que puede causar la muerte.',
  'Medidas para prevenir infectarse con Dengue': 
  'Algunas de las medidas que podemos tomar para evitar infectarnos de dengue son las siguinetes:\n*Usa ropa que cubra la mayor parte de tu cuerpo\n*No te expongas a la picadura de los moscos\n*Usa repelente contra mosquitos\n*Usa un pabellón o tela que cubra tu cama por completo\n*Instala mosquiteros en puertas y ventanas\n*Evita que se acumule basura\n*No dejes recipientes donde se acumule agua\n*Lava constantemente contenedores de agua, así como tinacos y cisternas\n*Utiliza larvicidas en contenedores para eliminar larvas de mosco\n*Usa insecticidas especiales para eliminar el mosco en su fase adulta',
  '¿Qué síntomas se presentan al contraer Dengue?': 
  'Los síntomas del dengue, conocido comúnmente como “trancazo” o “fiebre quebrantahuesos”, aparecen después de un periodo de 4 a 7 días. \n <b>Los sintomas más comunes son los siguientes:</b> \n*Fiebre\n*Dolor de huesos\n*Dolor de cabeza intenso (en la frente)\n*Dolor de ojos (que se incrementa al moverlos)\n*Erupción en la piel (parecida al sarampión)\n*Náuseas\n*Vómito\n*Insomnio\n*Prurito (comezón)\n*Falta de apetito\n*Dolor abdominal ',
  '¿Qué tratamiento tomar en caso de infectarse?': 
  'No existe un tratamiento específico para el dengue.\nEl tratamiento se centra en aliviar los síntomas, mantenerse bien hidratado y descansar. En casos graves, se requiere atención médica.',
  '¿Qué medidas tomar para evitar contagiar a otros?': 
  'El dengue no se transmite de una persona a otra y actualmente no hay vacuna para combatirlo.\n Sin embargo, es importante evitar que los mosquitos piquen y mantener una buena higiene personal.',
};

// Manejar comandos
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      keyboard: Object.keys(consultasRespuestas).map((consulta) => [consulta]),
      resize_keyboard: true,
    },
  };

  bot.sendMessage(chatId, '¡Hola! Elige una consulta sobre el Dengue:', options);
});

// Manejar respuestas a las consultas
Object.keys(consultasRespuestas).forEach((consulta) => {
  bot.onText(new RegExp(consulta), (msg) => {
    const chatId = msg.chat.id;
    const respuesta = consultasRespuestas[consulta];
    bot.sendMessage(chatId, respuesta);
  });
});

// Manejar cualquier otro mensaje
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Verificar si el mensaje no coincide con ninguna consulta
  if (!Object.keys(consultasRespuestas).some((consulta) => msg.text.includes(consulta))) {
    bot.sendMessage(chatId, 'No entiendo esa consulta. Por favor, elige una de las opciones proporcionadas.');
  }
});

// Manejar errores
bot.on('polling_error', (error) => {
  console.error(error);
});

console.log('El bot está funcionando...');
