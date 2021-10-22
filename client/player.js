class Player{ //Classe do jogador do jogo
    constructor(tetris){

        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.events = new Events();

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;
        
        this.pos = {x:0,y:0};
        this.matrix = null;
        this.score = 0;

        this.reset();
    }

    createPiece(type){ //Cria uma peça, sob o controle do jogador, dentro da arena
        if(type === 'T'){
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        } else if(type == 'O'){
            return [
                [2, 2],
                [2, 2],
            ];
        } else if(type == 'L'){
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        } else if(type == 'J'){
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        } else if(type == 'I'){
            return [
                [0, 0, 0, 0],
                [5, 5, 5, 5],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
        } else if(type == 'S'){
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        } else if(type == 'Z'){
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
        }
    
    }

    drop(){ //Executa um movimento da peça para baixo
        this.pos.y++;
        this.dropCounter = 0;
        if(this.arena.collide(this)){ //Se a peça colidir com a parte de baixo da arena ou com as peças assentadas
            this.pos.y--;
            this.arena.merge(this); //Assenta a peça na arena
            this.reset();
            this.score += this.arena.sweep(); //Checa se uma linha da arena foi preenchida pela peça
            this.events.emit('score', this.score);
            return;
        }
        this.events.emit('pos', this.pos); //Emite um evento com a alteração de posição da peça
    }

    move(dir){//nao deixa passar para os lados
        this.pos.x += dir;
        if(this.arena.collide(this)){
            this.pos.x -= dir;
        }
        this.events.emit('pos', this.pos);
    }

    reset(){ //Quando uma peça é assentada cria uma nova no topo da arena
        const pieces = 'ILJOTSZ';
        this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]); //Gera uma peça aleatória
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
                        (this.matrix[0].length / 2 | 0);
        if(this.arena.collide(this)){ //Checa se a peça recem-criada já colide com as peças assentadas. Se sim causa o fim de jogo
            this.arena.clear();
            this.score = 0;
            this.events.emit('score', this.score);
        }
        this.events.emit('pos', this.pos);
        this.events.emit('matrix', this.matrix);
    }

    rotate(dir){//chama a funcao que ira rodar a peça, se for Q(-1) gira para a esquerda e W(1) gira para a direita
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir)
        while (this.arena.collide(this)){
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length){
                this._rotateMatrix(this.matrix, -dir);
                this.pos.x=pos;
                return;
            }
        }
        this.events.emit('matrix', this.matrix);
    }

    _rotateMatrix(matrix,dir){//Gira as pecas numa direcao
        for(let y = 0; y < matrix.length; ++y){
            for(let x = 0; x<y; ++x){
                [
                    matrix[x][y],
                    matrix[y][x],
                ] =[
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }
        if(dir > 0){
            matrix.forEach(row => row.reverse());
        } else{
            matrix.reverse();
        }
    }

    

    update(deltaTime){ //A cada determinado intervalo de tempo move a peça para baixo 
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval){
            this.drop();
        }
    }

    
}