class Tetris{

    constructor(element){
    
        this.element = element;
        this.canvas = element.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20,20);

        this.arena = new Arena(12,20);

        this.player = new Player(this);


        this.colors = [
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
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            this.player.update(deltaTime);


            this.desenhar();
            requestAnimationFrame(update);
        };

        update();

        this.updateScore(0);
    }

    desenhar(){//cria a arena do game
        this.context.fillStyle = '#000';
        this.context.fillRect(0,0,this.canvas.clientWidth, this.canvas.height);
        this.desenharMatrix(this.arena.matrix,{x:0,y:0});
        this.desenharMatrix(this.player.matrix,this.player.pos);
    }
    
    
    desenharMatrix(matrix, offset){//cria peça
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

    updateScore(score) {
        this.element.querySelector('.score').innerText = score;
    }
}

