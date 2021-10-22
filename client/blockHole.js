
//Arquivo principal do cliente do projeto Block Hole
//Para o jogo ser executado, o arquivo do servidor main.js deve ser executado primeiro
//O jogo é rodado a partir do arquivo index.html
const tetrisManager = new TetrisManager(document);
const tetrisLocal = tetrisManager.createPlayer();
tetrisLocal.element.classList.add('local');
tetrisLocal.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://localhost:9000'); //Porta de conexão com o websocket


const keyListener = (event) =>{ //Lê os comandos do usuário para movimentar a peça
    [
        [65, 68, 81, 69, 83],
    ].forEach((key, index) => {
        const player = tetrisLocal.player;
        if(event.type === 'keydown'){
            if(event.keyCode === key[0]){//A, move para a esquerda
                player.move(-1);
            } else if(event.keyCode === key[1]){//D, move para adireita
                player.move(1);
            }else if(event.keyCode === key[2]){//Q, gira sentido horário
                player.rotate(-1);
            }else if(event.keyCode === key[3]){//W, gira sentido anti-horário
                player.rotate(1);
            }
        }

        if(event.keyCode === key[4]){//S, move para baixo
            if(event.type === 'keydown'){
                if(player.dropInterval !== player.DROP_FAST){
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            }else{
                player.dropInterval = player.DROP_SLOW;
            }
        }
        
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);


