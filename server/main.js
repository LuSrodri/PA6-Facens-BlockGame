//Arquivo principal do servidor do Block Hole
//É necessários ser executado com o node.js antes de ser aberto o index.html
const WebSocketServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

const server = new WebSocketServer({port:9000}); //Cria um servidor websocket na porta 9000

const sessions = new Map;




function createId(len = 6, chars = 'abcdefghjkmnopqrstvwxyz0123456789'){ //Cria um id aleatório para um cliente ou uma sessão
    let id = '';
    while (len--){
        id += chars[Math.random()*chars.length | 0];
    }
    return id;
}

function createClient(conn, id = createId()){ //Cria um novo cliente com sua própria conexão e id
    return new Client(conn, id);
}

function createSession(id = createId()){ //Cria uma sessão
    if (sessions.has(id)){
        throw new Error('Session', id, 'already exists');
    }

    const session = new Session(id);
    console.log('Creating session', session);

    sessions.set(id, session);

    return session;
}

function getSession(id){ //Retorna uma sessão com o id específico
    return sessions.get(id);
}

function broadcastSession(session){ //Envia uma mensagem para todos os clientes
    const clients = [...session.clients];
    clients.forEach(client =>{
        client.send({
            type: 'session-broadcast',
            peers: {
                you: client.id,
                clients: clients.map(client => {
                    return{
                        id: client.id,
                        state: client.state,
                    }
                }),
            },
        });
    })
}

server.on('connection', conn =>{ //Quando a conexão for estabelecida
    console.log('Conexão estabelecida');
    const client = createClient(conn);

    conn.on('message', msg =>{ //Recebe uma mensagem do cliente dessa nova conexão
        console.log('Message received', msg.toString());
        const data = JSON.parse(msg);

        if (data.type.toString() === 'create-session'){ //Se a mensagem do cliente for para criar uma nova sessão
            const session = createSession(); //Cria uma sessão nova
            session.join(client);

            client.state = data.state;
            client.send({ //E envia mensagem de confirmação da criação da sessão
                type: 'session-created',
                id: session.id,
            });
            
        } else if (data.type === 'join-session'){ //Se o cliente deseja entrar em uma sessão que já foi criada
            const session = getSession(data.id) || createSession(data.id);
            session.join(client); //O cliente é colocado na sessão

            client.state = data.state;
            broadcastSession(session); //Uma mensagem é enviada para todos os clientes avisando que um novo jogador entrou na sessão
        } else if (data.type === 'state-update'){ //Se a mensagem avisa mudança de movimento em alguma peça ou algo da arena
            const [key, value] = data.state;
            client.state[data.fragment][key] = value;
            client.broadcast(data); //Envia essas mudanças para os outros clientes
        }
    });

    conn.on('close', () =>{ //Se uma conexão for fechada
        console.log('Conexão fechada');
        const session = client.session;
        if(session){
            session.leave(client); //Remove o cliente da sessão
            if(session.clients.size === 0){ //Se não existir mais jogadores na sessão
                sessions.delete(session.id); //Deleta a sessão
            }
        }

        broadcastSession(session); //Envia aos clientes uma mensagem que diz que um cliente saiu da sessão

        console.log(sessions);
    });
});