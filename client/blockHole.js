

const tetrisManager = new TetrisManager(document);
const tetrisLocal = tetrisManager.createPlayer();
tetrisLocal.element.classList.add('local');
tetrisLocal.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://localhost:9000');


const keyListener = (event) =>{ 
    [
        [65, 68, 81, 69, 83],
    ].forEach((key, index) => {
        const player = tetrisLocal.player;
        if(event.type === 'keydown'){
            if(event.keyCode === key[0]){//A ou H
                player.move(-1);
            } else if(event.keyCode === key[1]){//D ou K
                player.move(1);
            }else if(event.keyCode === key[2]){//Q ou Y
                player.rotate(-1);
            }else if(event.keyCode === key[3]){//W ou I
                player.rotate(1);
            }
        }

        if(event.keyCode === key[4]){//S ou J
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


