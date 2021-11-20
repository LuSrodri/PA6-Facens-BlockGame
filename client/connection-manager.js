class ConnectionManager{ //Gerenciador de conexão do cliente com o servidor
    constructor(tetrisManager){
        this.conn = null;
        this.peers = new Map;

        this.tetrisManager = tetrisManager;
        this.localTetris = this.tetrisManager.instances[0];
    }

    connect(address){ //Conecta o cliente com o servidor e imprime erros e mensagens do servidor
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open', ()=>{
            console.log('Conexão estabelecida');
            this.initSession();
            this.watchEvents();
        });

        this.conn.addEventListener('message', event => {
            console.log('Received message', event.data);
            this.receive(event.data);
        });
    }

    initSession(){ //Cria ou entra em uma sessão do block hole 
        const sessionId = window.location.hash.split('#')[1];//O id da sessão que o block hole irá criar/entrar começa na url com '#'. Se não tiver id no url, será gerado um aleatório
        const state = this.localTetris.serialize();
        if(sessionId){ //Se existir uma sessão com esse id o jogo irá se juntar a essa sessão.
            this.send({ //Envia ao servidor uma requisição de conexão à sessão com o id especificado
                type: 'join-session',
                id: sessionId,
                state,
            });
        } else { //Senão será criado uma sessão com o id da url
            this.send({ //Envia ao servidor a requisição de inicio de uma sessão
                type: 'create-session',
                state,
            });
        }
    }

    watchEvents(){ //Observa eventos de movimento da peça ou alteração da arena do tetris
        const local = this.tetrisManager.instances[0];

        const player = local.player;

        ['pos', 'matrix', 'score'].forEach(key => { //Envia todas as alterações de movimento da peça para o servidor
            player.events.listen(key, () => {
                this.send({
                    type: 'state-update',
                    fragment: 'player',
                    state: [key, player[key]],
                });
            });
        });

        const arena = local.arena;

        ['matrix'].forEach(key => { //envia todas as alterações da arena para o servidor
            arena.events.listen(key, value => {
                this.send({
                    type: 'state-update',
                    fragment: 'arena',
                    state: [key, arena[key]],
                });
            });
        });
    }

    updateManager(peers){ //Recebe alterações na quantidade de jogadores dentro da sessão
        const me = peers.you;
        //const clients = peers.clients.filter(client => me !== client.id);
        //clients.forEach(client =>{
        //    if (!this.peers.has(client.id)){ //Se entrou um jogador novo na sessão
        //        const tetris = this.tetrisManager.createPlayer();
        //        tetris.unserialize(client.state);
        //        this.peers.set(client.id, tetris);
        //    }
        //});

        //[...this.peers.entries()].forEach(([id,tetris]) => { //Se um dos jogadores saírem da sessão
        //    if(!clients.some(client => client.id === id)){
        //        this.tetrisManager.removePlayer(tetris);
        //        this.peers.delete(id);
        //    }
        //});

        //const local = this.tetrisManager.instances[0];
        //const sorted = peers.clients.map(client => this.peers.get(client.id) || local);
        //this.tetrisManager.sortPlayers(sorted); //Ordena posição das arenas dos jogadores baseados na ordem de entrada na sessão
    }

    updatePeer(id, fragment, [key, value]){ //Houve alteração de movimento e arena dos outros jogadores
        //if(!this.peers.has(id)){
        //    throw new Error('Client does not exist', id);
        //}

        //const tetris = this.peers.get(id);
        //tetris[fragment][key] = value;

        //if(key === 'score'){
        //    tetris.updateScore(value);
        //} else {
        //    tetris.desenhar();
        //}
    }

    receive(msg){ //Recebe mensagens do servidor e executa comandos baseados no tipo de mensagem
        const data = JSON.parse(msg);
        if(data.type === 'session-created'){
            window.location.hash = data.id;
        } else if (data.type ==='session-broadcast'){
            //this.updateManager(data.peers);
        } else if (data.type === 'state-update'){
            //this.updatePeer(data.clientId, data.fragment, data.state);
        } else if (data.type ==='end-game'){
            //console.log(data.peers.score);
            this.endGame(data.peers.score);
        }
    }

    send(data){ //Envia dados para o servidor
        const msg = JSON.stringify(data);
        console.log('sending message', msg);
        this.conn.send(msg);
    }

    endGame(scoreDict){ //Vai para a tela de pontuação
        let score = [];
        for(var key in scoreDict){
            score.push(scoreDict[key]);
        }
        //console.log(score.toString());
        window.location.href = './end.html?' + score.toString();
    }
}