

<h1 style="text-align: center;">Block Game</h1>



<h3 style="margin-left:20px;">Descrição</h3>

​	Nosso projeto tem, como objetivo, o desenvolvimento de um jogo web multiplayer inspirado no Tetris, onde até 4 pessoas pode jogar de forma simultânea. Tetris é jogo eletrônico muito popular onde consiste em empilhar tetraminós que descem a tela de forma que completem linhas horizontais. Quando uma linha se forma, ela se desintegra, as camadas superiores descem, e o jogador ganha pontos. Quando a pilha de peças chega ao topo da tela, a partida se encerra e o jogador perde. Além de ser divertido, é uma ótima maneira de instigar uma competição entre seus jogadores.



<h3 style="margin-left:20px;">Instalação</h3>

​	Para a instalação do projeto, é necessário o Git instalado no computador:

- No Git bash executar o comando " git clone https://github.com/LuSrodri/PA6-Facens-BlockGame.git ".

​	Com esses passos, o jogo estará pronto para jogar. Aproveite :)



<h3 style="margin-left:20px;">Como jogar</h3>

​	Com a instalação executada, e com o node.js instalado no computador, seguir os passos para jogar:

<b>1º</b> - Na pasta /server executar o comando " node ./main.js " no terminal (<b>IMPORTANTE</b>: não fechar o terminal);

<b>2º</b> - Na pasta raiz do projeto, abrir o index.html manualmente.

<b>3º</b> - Clicar em PLAY;

<b>4º</b> - Clicar em JOIN A GAME;

<b>5º</b> - Com o jogo inicializado, utiliza-se as teclas A e D para posicionar as peças;

<b>6º </b>- Utiliza-se a tecla S para descer a peça rapidamente;

<b>7º</b> - Utiliza-se as teclas Q e E para rotacionar as peças.

​	O jogo só acaba quando as peças atingirem o topo, para pontuar é necessário formar uma linha horizontal completa.

​	Com o link gerado quando entra em um jogo, é possível abrir em outra aba para inicializar outra arena, permitindo múltiplos jogadores.



<h3 style="margin-left:20px;">O que falta fazer</h3>

 - Sincronizar o jogo entre os múltiplos jogadores, para que o jogo seja reiniciado quando um novo jogador entra na sala;
 - Colocar uma condição para Ganhar o jogo, para que o jogo "não dure para sempre";
 - Colocar uma tela de fim de jogo para aparecer quando o jogador perde ou ganha;
 - Adaptar a tela do jogo para o uso no Liquid Galaxy, deixando somente uma arena por aba, e só mostrar as pontuações do jogador.



<h3 style="margin-left:20px;">Tecnologias utilizadas</h3>

- Para o <b>Front-end</b> foi utilizado HTML, para estruturar o site, e CSS, para estilizar o site.
- Para a parte do <b>Jogo</b> foi utilizado JavaScript para a lógica, HTML para estruturar e CSS para estilizar. 
- Para a parte de <b>Servidor</b> foi utilizado o node.js e WebSocket, para permitir vários jogadores simultâneos.



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
