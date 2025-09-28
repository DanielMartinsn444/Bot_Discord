require('dotenv').config();

const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const http = require('http');

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

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
    "Lembre-se: useEffect é seu melhor amigo para lidar com efeitos colaterais em componentes React!",
    "Um componente limpo e reutilizável é um componente feliz. Pense na sua arquitetura!",
    "Dica de React: Use o useState para gerenciar o estado local dos seus componentes. É simples e poderoso.",
    "Você sabia que o React usa um 'Virtual DOM'? Isso é o que o torna tão rápido!",
    "A melhor forma de aprender a programar é programando. Não tenha medo de errar!",
    "Quando estiver com dificuldade, dê uma pausa, tome uma água. A solução pode estar a um descanso de distância.",
    "A comunidade React é gigante! Se precisar de ajuda, procure o canal #ajuda ou #react.",
    "Lembrem-se de fazer commits pequenos e com mensagens claras. Isso salva vidas!",
    "Componentes de função com Hooks são o futuro. Pratiquem useState e useEffect!",
    "Curiosidade: O nome 'React' vem da ideia de reagir a mudanças de dados!",
    "Para passar dados de um componente pai para um filho, use props. É a regra básica do React.",
    "Sintaxe moderna: Prefira const e let em vez de var para evitar bugs.",
    "O React Router é essencial para criar páginas diferentes na sua aplicação.",
    "Não compare seu progresso com o dos outros. Cada um tem seu próprio ritmo de aprendizado.",
    "Foque em criar componentes pequenos e com uma única responsabilidade. É o segredo da escalabilidade.",
    "Para otimizar o desempenho, use React.memo em componentes que não precisam ser renderizados de novo.",
    "Aprender JavaScript é a base para dominar o React. Mantenha os estudos em dia!",
    "O que é mais assustador que um bug? Dois bugs iguais em lugares diferentes! 👻",
    "Sempre instale as dependências com npm install ou yarn add no seu projeto.",
    "Boas-vindas ao mundo do React! Aqui, cada problema é um novo desafio para crescer.",
    "Lembre-se: o key em listas de componentes ajuda o React a otimizar a renderização.",
    "Não se preocupe em saber tudo. Programar é sobre saber procurar a resposta certa.",
    "A 'filosofia' do React é construir interfaces com componentes reutilizáveis. Pense em blocos de LEGO!",
    "Quando o código não funciona, a primeira coisa a checar é o console.log.",
    "Você pode usar as React DevTools para inspecionar seus componentes e o estado da aplicação!",
    "JSX é a sigla para JavaScript XML. É a sintaxe especial que o React usa.",
    "Dica: Mantenha seus arquivos organizados. Uma boa estrutura de pastas é fundamental.",
    "Curiosidade: O React foi criado pelo Facebook para a sua própria interface de usuário!",
    "O operador de desestruturação ({ }) torna o código mais limpo e legível. Usem e abusem!",
    "Não se sinta mal por usar a documentação. É para isso que ela existe!",
];

let frasesDisponiveis = [...mensagensAleatorias];

function pegarFraseAleatoria() {
    if (frasesDisponiveis.length === 0) {
        frasesDisponiveis = [...mensagensAleatorias];
    }
    const indice = Math.floor(Math.random() * frasesDisponiveis.length);
    const frase = frasesDisponiveis[indice];
    frasesDisponiveis.splice(indice, 1);
    return frase;
}

client.on('clientReady', () => {
    console.log(`Opa, ${client.user.tag} tá online!`);
    setInterval(() => {
        console.log('Tentando enviar uma mensagem...');
        const canal = client.channels.cache.find(c => c.name === 'geral');
        if (canal) {
            try {
                console.log('Canal "geral" encontrado! Enviando...');
                const mensagem = pegarFraseAleatoria();
                canal.send(mensagem);
            } catch (error) {
                console.log(`ERRO AO ENVIAR MENSAGEM: ${error.message}`);
            }
        } else {
            console.log('Canal "geral" não encontrado. Verifique o nome do canal.');
        }
    }, 3600000);
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'geral');
    if (welcomeChannel) {
        welcomeChannel.send(`E aí, ${member}! Bem-vindo ao servidor. Dá uma olhada no canal 'Fundamentos'!`);
    }
});

client.on('shardDisconnect', () => {
    console.log('Bot desconectado! Tentando reconectar...');
    client.login(process.env.TOKEN);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    const mensagemMinuscula = message.content.toLowerCase();
    if (mensagemMinuscula === '!ajuda' || mensagemMinuscula === '/ajuda') {
        message.reply(`Geral: Onde você pode interagir comigo e outros membros.
 Fundamentos: Aqui você pode revisar todo o conteúdo do curso.
Música: aqui você pode interagir com o bot, basta digitar "!play (nome da música)" 
Obs: precisa estar no canal de voz geral para funcionar! 
`);
    }
    if (message.channel.type === ChannelType.DM) {
        message.reply('Você pode digitar /ajuda para ver o que posso fazer!');
    }
});

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('O bot esta funcionando!');
}).listen(process.env.PORT || 3000);

const botToken = process.env.TOKEN;
client.login(botToken);