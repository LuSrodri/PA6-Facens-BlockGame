class Events{ //Classe de eventos
    constructor(){
        this._listeners = new Set;
    }

    listen(name, callback){
        this._listeners.add({ //Ouvi eventos recebidos pelo cliente
            name,
            callback,
        });
    }

    emit(name, ...data){
        this._listeners.forEach(listener =>{ //Transforma um evento em uma mensagem
            if (listener.name === name){
                listener.callback(...data);
            }
        });
    }
}