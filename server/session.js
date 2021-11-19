class Session{ //Classe da sessão
    constructor(id){
        this.id = id;
        this.clients = new Set;
        this.score = {};
    }

    join(client){ //Adiciona um cliente dentro da sessão
        if(client.session){
            throw new Error('Client already in session');
        }
        this.clients.add(client);
        client.session = this;
        this.score[client.id] = 0;
    }
    
    leave(client){ //Remove um cliente de dentro da sessão
        if(client.session!==this){
            throw new Error('Client not in session');
        }
        this.clients.delete(client);
        client.session = null;
        delete this.score[client.id];
    }
}

module.exports = Session;
