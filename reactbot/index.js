
require('dotenv').config();


const { Client, GatewayIntentBits } = require('discord.js');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers, 
  ],
});


const mensagensAleatorias = [
  "Olá! Posso ajudar?",
  'Para revisar conteúdos acesse o nosso canal "fundamentos"!',
  "Sabia que o React é a biblioteca JavaScript mais usada no mundo?",
  "Dica do dia: usem 'For' e 'While' com cuidado para evitar loops infinitos!",
  "Curiosidade: a Netflix, Airbnb e o Dropbox usam React em seus produtos!",
  "Dica: a sintaxe JSX parece HTML, mas é JavaScript! Fiquem de olho nas diferenças.",
  "Lembrem-se: o console.log é seu melhor amigo para depurar o código! 😉",
  "Dica: um bom nome de variável pode salvar horas de dor de cabeça!",
  "Não entendam o erro como um problema, mas sim como uma pista! 🔍",
  "Não desistam, a curva de aprendizado vale a pena!",
  "Dica de produtividade: usem atalhos no VS Code! Salva muito tempo.",
  "Curiosidade: a primeira versão do React foi lançada em 2013!",
];


client.on('clientReady', () => {
  console.log(`Opa, ${client.user.tag} tá online!`);
  
 
  setInterval(() => {
    const canal = client.channels.cache.find(c => c.name === 'geral');
    if (canal) {
      const mensagem = mensagensAleatorias[Math.floor(Math.random() * mensagensAleatorias.length)];
      canal.send(mensagem);
    }
  }, 300000); 
});

client.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'geral'); 
  if (welcomeChannel) {
    welcomeChannel.send(`E aí, ${member}! Bem-vindo ao servidor. Dá uma olhada no canal #módulos-do-curso pra começar!`);
  }
});


const botToken = process.env.TOKEN;
client.login(botToken);