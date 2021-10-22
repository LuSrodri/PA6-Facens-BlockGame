class Session{ //Classe da sessão
    constructor(id){
        this.id = id;
        this.clients = new Set;
    }

    join(client){ //Adiciona um cliente dentro da sessão
        if(client.session){
            throw new Error('Client already in session');
        }
        this.clients.add(client);
        client.session = this;
    }
    
    leave(client){ //Remove um cliente de dentro da sessão
        if(client.session!==this){
            throw new Error('Client not in session');
        }
        this.clients.delete(client);
        client.session = null;
    }
}

module.exports = Session;
