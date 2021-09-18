const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');


context.scale(20,20);


const matrix = [
    [0, 0, 0],
    [1, 1, 1,],
    [0, 1, 0],
];

function collide(arena,player){//colisão do game com o chão e peças
    const [m, o] =[player.matrix,player.pos];
    for(let y = 0; y < m.length;y++){
        for(let x=0; x < m[y].length;x++){
            if(m[y][x] !== 0 && 
                (arena[y + o.y] &&
                arena[y + o.y][x + o.x])!==0){
                    return true;
                }
        }
    }
    return false;
};

function createMAtrix(w,h){
    const matrix = [];
    while (h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}
function desenhar(){//cria a arena do game
    context.fillStyle = '#000';
context.fillRect(0,0,canvas.clientWidth, canvas.height);
    desenharMatrix(arena,{x:0,y:0});
    desenharMatrix(player.matrix,player.pos);
}


function desenharMatrix(matrix, offset){//cria peça
        matrix.forEach((linha,y)=>{
            linha.forEach((valor, x)=>{
                if(valor!== 0){
                    context.fillStyle = 'red';
                    context.fillRect(x + offset.x
                                    ,y + offset.y,1,1)
                }
            });
        });
}

function merge(arena,player){
    player.matrix.forEach((linha,y)=>{
        linha.forEach((value, x)=>{
            if(value!== 0){
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}

function playerDrop(){
    player.pos.y++;
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena,player);
        player.pos.y=0;
    }
    dropCounter=0;
}

function playerMove(dir){//nao deixa passar para os lados
    player.pos.x += dir;
    if(collide(arena,player)){
        player.pos.x -= dir;
    }
}

function playerRotate(dir){//chama a funcao que ira rodar a peça, se for Q(-1) gira para a esquerda e W(1) gira para a direita
    rotate(player.matrix, dir)
}
function rotate(matrix,dir){//gira as pecas baseado na direcao
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
let dropCounter = 0;
let dropInterval = 1000;

let lastTime =0;
function update(time = 0){
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    
    if(dropCounter > dropInterval){
        playerDrop();
    }


    desenhar();
    requestAnimationFrame(update)
}

const arena = createMAtrix(12,20);
const player = {
    pos:{x:5,y:5},
    matrix:matrix,
}

document.addEventListener('keydown', event =>{//move com as setas e gira com Q e W 
if(event.keyCode === 37){//seta para a esquerda
    playerMove(-1);
} else if(event.keyCode === 39){//seta para a direita
    playerMove(1);
}else if(event.keyCode === 40){//Seta para baixo
    playerDrop();
}else if(event.keyCode === 81){//Q
playerRotate(-1);
}else if(event.keyCode === 87){//W
    playerRotate(1);
}
})

update();

