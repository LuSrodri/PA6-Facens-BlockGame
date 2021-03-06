class Arena{ //Contrói e atualiza a arena do jogo
    constructor(w, h){
        const matrix = [];
        while (h--){
            matrix.push(new Array(w).fill(0));
        }
        this.matrix = matrix;

        this.events = new Events;
    }

    clear(){ //Esvazia a arena do jogo
        this.matrix.forEach(row => row.fill(0));
        this.events.emit('matrix', this.matrix);
    }

    collide(player){//Checa se há colisão entre a peça e algum elemento da arena
        const [m, o] =[player.matrix,player.pos];
        for(let y = 0; y < m.length;y++){
            for(let x=0; x < m[y].length;x++){
                if(m[y][x] !== 0 && 
                    (this.matrix[y + o.y] &&
                    this.matrix[y + o.y][x + o.x])!==0){
                        return true;
                    }
            }
        }
        return false;
    };

    merge(player){ //Assenta uma peça na arena
        player.matrix.forEach((linha,y)=>{
            linha.forEach((value, x)=>{
                if(value!== 0){
                    this.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
        this.events.emit('matrix', this.matrix);
    }

    sweep(){ //Apaga uma ou mais linhas da arena quando elas estão preenchidas por peças
        let rowCount = 1;
        let score = 0;
        outer: for (let y = this.matrix.length - 1; y > 0 ; --y){
            for(let x = 0; x < this.matrix[y].length; ++x){
                if(this.matrix[y][x] === 0){
                    continue outer;
                }
            }
            const row = this.matrix.splice(y,1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;
    
            score += rowCount * 10; //Adiciona pontos para o jogador
            rowCount += 1;
        }
        this.events.emit('matrix', this.matrix);
        return score;
        
    }
}