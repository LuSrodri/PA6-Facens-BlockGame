class Client{ //Responsável por fazer a comunicação com os clientes
    constructor(conn, id){
        this.conn = conn;
        this.id = id;
        this.session = null;

        this.state = {
            arena: {
                matrix: [],
            },
            player:{
                matrix: [],
                pos: {x:0, y:0},
                score: 0,
            },
        };
    }

    broadcast(data){ //Envia uma mensagem para todos os clientes menos um
        if (!this.session){
            throw new Error('Can not broadcast without session');
        }

        data.clientId = this.id;

        [...this.session.clients]
            .filter(client => client !== this) //filtra um dos clientes
            .forEach(client => client.send(data)); //envia para o resto
    }

    send(data){ //Envia uma mensagem para um cliente específico
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.conn.send(msg, function ack(err){
            if(err){
                console.error('Message failed', msg, err);
            }
        });

    }
}

module.exports = Client;