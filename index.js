require('dotenv').config();

const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');
const http = require('http');


let linkConvitePermanente = null;
const NOME_DO_CANAL_CONVITE = 'geral'; 
const INTERVALO_RESPOSTAS = 3 * 60 * 60 * 1000;

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
        GatewayIntentBits.DirectMessages, 
    ],
});

const mensagensAleatorias = [
    "Não se esqueça de importar o React no topo do seu arquivo JSX, mesmo que ele não seja usado explicitamente!",
    "Dica de Hooks: Use o 'useCallback' e 'useMemo' para otimizar a performance, evitando recriações desnecessárias.",
    "Para lidar com formulários no React, tente usar componentes controlados (controlled components).",
    "Passe funções como 'props' para permitir que componentes filhos se comuniquem com o pai!",
    "Sempre use o 'map()' para renderizar listas de componentes no React, ele é o rei das iterações.",
    "O 'Redux' ou 'Zustand' são ótimos para gerenciar estados globais em aplicações grandes.",
    "Dica: Os erros mais comuns no React estão relacionados à falta do 'key' em listas ou loops infinitos no 'useEffect'.",
    "Um componente funcional é mais fácil de testar do que um componente de classe.",
    "Use 'Styled Components' ou 'Tailwind CSS' para estilizar seus componentes de forma moderna.",
    "O 'Context API' é excelente para evitar o 'prop drilling' (passar props por muitos níveis).",
    "Para carregar dados de uma API, use o 'useEffect' e não se esqueça do array de dependências vazio `[]` na primeira carga.",
    "Sempre desmonte seus efeitos no 'useEffect' para evitar vazamentos de memória (memory leaks).",
    "React Query ou SWR são ferramentas de ponta para gerenciamento de cache de dados assíncronos.",
    "Lembre-se: 'props' são imutáveis (read-only)! Para mudar algo, use o 'state'.",
    "Componentes devem ser como funções puras: dado o mesmo 'input' ('props' e 'state'), o 'output' é o mesmo.",
    "O 'Babel' é o seu tradutor de JavaScript moderno para a linguagem que o navegador entende.",
    "Quer fazer animações no React? Dê uma olhada no 'Framer Motion'!",
    "A diferença entre 'state' e 'props' é crucial: 'state' é interno, 'props' é externo.",
    "Use fragmentos (`<>...</>`) para agrupar elementos sem adicionar nós desnecessários ao DOM.",
    "Lembre-se que o 'default export' é usado para o principal componente do arquivo!",
    "Sempre use '===' em vez de '==' para evitar comparações inesperadas no JavaScript.",
    "As 'Arrow Functions' (`=>`) mantêm o contexto do `this` do escopo pai. Isso é muito importante!",
    "Use 'async/await' para deixar seu código assíncrono muito mais limpo e legível.",
    "Dica: O operador 'spread' (`...`) é ótimo para clonar arrays e objetos rapidamente.",
    "O método 'filter()' é perfeito para criar um novo array com apenas os itens que você precisa.",
    "O 'reduce()' é a função mais versátil: ele pode fazer o trabalho do 'map' e do 'filter'!",
    "Use 'template literals' (crases!) para criar strings multilinhas e inserir variáveis.",
    "Entenda o 'escopo' (`scope`) das suas variáveis. Isso é fundamental para evitar bugs.",
    "O conceito de 'closure' (fechamento) é o que faz o JavaScript ser tão poderoso.",
    "Nunca pare de estudar: o ecossistema JavaScript está sempre evoluindo!",
    "Use o `Array.isArray()` para garantir que uma variável é realmente um array.",
    "Não use o `for...in` para iterar arrays, use `for...of` ou os métodos de array (`map`, `forEach`).",
    "Dica: Configure o ESLint e Prettier para manter a qualidade e o estilo do seu código.",
    "Os módulos ES6 (`import`/`export`) são a forma moderna e padrão de organizar seu código.",
    "Aprenda sobre 'Promises' e como elas simplificam o gerenciamento de código assíncrono.",
    "O operador 'optional chaining' (`?.`) evita erros chatos com objetos nulos ou indefinidos.",
    "Tente manter suas funções pequenas e focadas em uma única tarefa. Princípio S.O.L.I.D.!",
    "Use `try...catch` para lidar de forma segura com exceções e erros no código.",
    "Dica de Node.js: Mantenha as suas dependências atualizadas, mas com cuidado para não quebrar o projeto.",
    "Aprender a usar o Git (versionamento) é tão importante quanto saber programar.",
    "Curiosidade: O JavaScript foi criado em apenas 10 dias por Brendan Eich!",
    "A programação é 10% escrever código e 90% entender o porquê dele não funcionar.",
    "A melhor forma de resolver um problema é explicá-lo em voz alta para si mesmo (ou para um patinho de borracha!).",
    "Não existe código perfeito, apenas código que funciona e é fácil de manter.",
    "Sempre documente as partes mais complexas do seu código para o seu 'eu' do futuro!",
    "O termo 'bug' nasceu de um inseto real que causou um problema em um computador antigo.",
    "Lembre-se: todo grande desenvolvedor já foi um iniciante. Não desista!",
    "Tentar debugar por horas e resolver o problema com uma linha de código: a melhor sensação do mundo.",
    "Mantenha a calma e continue codificando. Os bugs são apenas desafios disfarçados.",
    "A sintaxe do JavaScript foi inspirada em Java, mas a sua funcionalidade veio de Scheme e Self.",
    "Curiosidade: O nome de código inicial do JavaScript foi 'Mocha', depois 'LiveScript'.",
    "O 'Stack Overflow' é a biblioteca de todo programador. Use-o com sabedoria.",
    "A prática leva à perfeição. Tente construir algo pequeno todos os dias.",
    "Dica: Use sempre o modo 'Dark' no seu editor de código. Seus olhos agradecem! 🕶️",
    "Não tenha medo de refatorar (reorganizar) um código antigo para melhorá-lo.",
    "O 'front-end' é a arte de criar experiências incríveis para o usuário.",
    "Curiosidade: O Google usou o React no seu novo recurso de 'Web Vitals'!",
    "A chave para ser um bom programador é a curiosidade incessante.",
    "O conceito de 'SPA' (Single Page Application) popularizado pelo React mudou a web.",
    "Se você está aprendendo, você está vencendo. Mantenha o foco!",
    "Use o `key` em listas para evitar o aviso no console e otimizar a performance.",
    "Para testes unitários, o Jest e o React Testing Library são as ferramentas mais populares.",
    "O `useReducer` é uma alternativa poderosa ao `useState` para estados mais complexos.",
    "Sempre trate os avisos (warnings) do React como se fossem erros!",
    "O `fetch()` ou o `axios` são usados para fazer requisições HTTP (chamar APIs).",
    "Lembre-se de fazer 'deploy' do seu código depois de grandes mudanças!",
    "Use 'prop-types' ou 'TypeScript' para validar os dados que chegam no seu componente.",
    "Aprenda a inspecionar o código do site. O DevTools do navegador é uma arma secreta.",
    "Dica: O `async/await` é açúcar sintático para Promises, mas é muito mais bonito.",
    "Mantenha os componentes o mais 'burros' (dumb) possível, focando só na interface.",
    "A 'composição' de componentes é mais importante que a 'herança' no React.",
    "Crie uma boa pasta de 'Utilities' para funções que você usa em todo o projeto.",
    "O que são 'side effects'? Qualquer coisa que acontece fora do escopo da sua função (ex: APIs, timers).",
    "Evite usar 'index' como `key` em listas que mudam de ordem. Isso gera bugs.",
    "O 'memo' é como uma 'cache' para o seu componente. Se as 'props' não mudarem, ele não renderiza.",
    "Curiosidade: O TypeScript é a linguagem que mais cresce na área de front-end!",
    "Não misture lógica de negócios com a lógica de interface. Separe as responsabilidades!",
    "Sempre inicialize o 'state' com um valor padrão (ex: `null`, `[]`, ou `0`).",
    "Aprenda a ler a documentação do React, é o recurso mais valioso que existe.",
    "Para gerenciar rotas, o 'BrowserRouter' é o mais comum no React Router.",
    "Não hesite em perguntar! A comunidade está aqui para ajudar uns aos outros.",
    "Se está funcionando, mas você não sabe o porquê, a gente tem um problema! 😅",
    "A melhor forma de aprender é ensinando. Tente ajudar alguém no chat!",
    "Curiosidade: O React Native permite que você use o React para criar apps móveis!",
    "Lembre-se de agradecer quem te ajudou a resolver um bug. É um bom hábito!",
    "Seu código é o seu legado. Escreva-o com clareza e elegância.",
    "Onde está o erro? No último lugar que você olhou! Continue tentando.",
    "Não se prenda a uma única tecnologia. Mantenha a mente aberta para aprender novas.",
    "O seu editor de código é o seu melhor amigo. Aprenda a usá-lo com maestria.",
    "Parabéns por estar construindo algo! O código é a nova forma de magia.",
    "Dica de comunidade: Seja sempre respeitoso e paciente com os colegas.",
    "O 'npm' (Node Package Manager) é um universo de bibliotecas. Use o poder dele!",
    "O próximo passo de aprendizado é sempre o mais recompensador. Continue avançando!",
    "Se você conseguir explicar o seu código para um leigo, ele é bom o suficiente.",
    "A 'clean code' é o caminho para a felicidade do desenvolvedor.",
    "O React é uma biblioteca, não um framework completo. Ele te dá mais liberdade.",
    "Não tenha medo de deletar código que não é mais usado. Código limpo é código menor.",
    "Cada erro resolvido é uma habilidade a mais na sua caixa de ferramentas.",
    "O futuro é promissor para quem domina o JavaScript e o React. Avance!",
    "Continue codificando, e um dia você vai olhar para trás e se orgulhar do que fez."
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

client.on('clientReady', async () => {
    console.log(`Opa, ${client.user.tag} tá online!`);
    
    
    try {
        const canalConvite = client.channels.cache.find(c => c.name === NOME_DO_CANAL_CONVITE);
        
        if (canalConvite) {
            
            const invite = await canalConvite.createInvite({
                maxUses: 0,   
                maxAge: 0,    
                reason: 'Link de convite permanente para comando !convite'
            });
            
            linkConvitePermanente = invite.url;
            console.log(`[CONVITE] Link permanente gerado com sucesso: ${linkConvitePermanente}`);
        } else {
            console.error(`[CONVITE] Canal "${NOME_DO_CANAL_CONVITE}" não encontrado.`);
        }
    } catch (error) {
        if (error.code === 50013) {
             console.error("[CONVITE] ERRO: Permissão 'Criar Convites' não encontrada para o bot!");
        } else {
            console.error('[CONVITE] Erro ao criar o link permanente (Pode ser que um já exista):', error);
        }
    }
    
    
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
    }, INTERVALO_RESPOSTAS); 
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
        message.reply(`Olá! Eu sou o ReactBot, seu assistente no servidor. 

dê uma olhada nos canais abaixo:
- Convites: Digite /convite ou !convite (somente admins) para obter o link permanente.
- Geral: Onde você pode interagir comigo e outros membros.
- Fundamentos: Aqui você pode revisar todo o conteúdo do curso.
-Música: para ouvir música basta digitar: m!play (nome da música)
*Obs: precisa estar no canal de voz geral para funcionar!   
`);
        return;
    }
    
 
    if (mensagemMinuscula === '!convite' || mensagemMinuscula === '/convite') {
        
        if (message.guild && message.member) {
            
           
            const temPermissao = message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) || message.member.id === message.guild.ownerId;
            
            if (!temPermissao) {
                return message.reply('Desculpe, este comando é restrito a administradores e ao dono do servidor por motivos de segurança.');
            }
        } else {
            
            return message.reply('Você só pode usar o comando de convite dentro do servidor!');
        }
        
        
        if (linkConvitePermanente) {
            message.reply(`Aqui está o link permanente para o nosso servidor (uso exclusivo de admins): ${linkConvitePermanente}`);
        } else {
            message.reply('Desculpe, o link de convite permanente ainda não foi gerado ou houve um erro. Tente novamente em um minuto.');
        }
        return;
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