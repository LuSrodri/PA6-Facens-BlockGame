class Tetris{ //Construção do tetris (o conjunto inteiro de arena, jogador e outras caracteríticas importantes)

    constructor(element){
    
        this.element = element;
        this.canvas = element.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20,20);

        this.arena = new Arena(12,20);

        this.player = new Player(this);

        this.player.events.listen('score', score =>{
            this.updateScore(score);
        });

        
        


        this.colors = [ //Cores das peças de tetris
            null,
            'red',
            'blue',
            'green',
            'yellow',
            'orange',
            'violet',
            'cyan',
        ];

        let lastTime =0;
        this._update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            this.player.update(deltaTime);


            this.desenhar();
            requestAnimationFrame(this._update);
        };


        this.updateScore(0);
    }

    desenhar(){//Desenha a arena do jogo
        this.context.fillStyle = '#000';
        this.context.fillRect(0,0,this.canvas.clientWidth, this.canvas.height);
        this.desenharMatrix(this.arena.matrix,{x:0,y:0});
        this.desenharMatrix(this.player.matrix,this.player.pos);
    }
    
    
    desenharMatrix(matrix, offset){//Cria a peça sob o comando do jogador
            matrix.forEach((linha,y)=>{
                linha.forEach((valor, x)=>{
                    if(valor!== 0){
                        this.context.fillStyle = this.colors[valor];
                        this.context.fillRect(x + offset.x
                                        ,y + offset.y,
                                        1,1)
                    }
                });
            });
    }

    run(){ //Executa um ciclo do jogo (move as peças e altera a arena)
        this._update();
    }

    serialize(){ //Tranforma dados em um JSON para ser enviado 
        return{
            arena:{
                matrix:this.arena.matrix,  
            },
            player: {
                matrix: this.player.matrix,
                pos: this.player.pos,
                score: this.player.score,
            },
        };

    }

    unserialize(state){ //Extrai dados de JSON recebida pelo cliente
        this.arena = Object.assign(state.arena);
        this.player = Object.assign(state.player);
        this.updateScore(this.player.score);
        this.desenhar();
    }

    updateScore(score) { //Atualiza contador de pontos
        this.element.querySelector('.score').innerText = score;
        if(score >=10 )
        {
           window.location.href = './end.html'; 
        }
    }
    
}

