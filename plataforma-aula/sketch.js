// http://10.12.130.53:5501/plataforma-aula/assets.zip

let imgCenario;
let x, y;
let vx, vy;
let g;
let largura;
let personagem;
let fase;

// Listas de objetos do jogo
let plataformas = [];
let itens = [];
let monstros = [];

let imgPlataformas;
let imgPersonagem;
let executando = true;
let imgMoeda;
let pontos = 0;
let mapeamento;
let mapeamentoMonstros;

let animacoes;

async function setup() {
  createCanvas(800, 600);

  imgMoeda = await loadImage("assets/moeda.png");
  imgCenario = await loadImage("assets/cenario2.png");
  mapeamentoMonstros = await loadJSON("assets/monsters.json");
  fase = await loadJSON("assets/fase1.json");
  imgCenario.resize(800, 600);
  x = width / 2;
  y = 10;
  vx = 0;
  vy = 0;
  g = 0.8;
  largura = 100;

  mapeamento = {
    run: {
      frames: [
        { x: 38, y: 60 },
        { x: 166, y: 60 },
        { x: 294, y: 60 },
        { x: 422, y: 60 },
        { x: 550, y: 60 },
        { x: 678, y: 60 },
        { x: 806, y: 60 },
        { x: 934, y: 60 },
      ],
      frameWidth: 46,
      frameHeight: 68,
    },
    jump: {
      frames: [
        { x: 36, y: 43 },
        { x: 163, y: 43 },
        { x: 291, y: 43 },
        { x: 417, y: 43 },
        { x: 545, y: 43 },
        { x: 673, y: 43 },
        { x: 803, y: 43 },
        { x: 931, y: 43 },
      ],
      frameWidth: 59,
      frameHeight: 85,
    },
    idle: {
      frames: [
        { x: 38, y: 58 },
        { x: 166, y: 58 },
        { x: 294, y: 58 },
        { x: 422, y: 58 },
        { x: 550, y: 58 },
      ],
      frameWidth: 59,
      frameHeight: 70,
    },
  };

  imgPersonagem = {
    run: await loadImage("assets/Run.png"),
    jump: await loadImage("assets/Jump.png"),
    idle: await loadImage("assets/Idle.png"),
    slime: await loadImage("assets/slime.png"),
    ghost: await loadImage("assets/ghost.png"),
  };

  animacoes = {
    run: new Animacao(mapeamento.run, imgPersonagem.run),
    jump: new Animacao(mapeamento.jump, imgPersonagem.jump),
    idle: new Animacao(mapeamento.idle, imgPersonagem.idle),
    slime: new Animacao(mapeamentoMonstros.slime, imgPersonagem.slime),
    ghost: new Animacao(mapeamentoMonstros.ghost, imgPersonagem.ghost),
  };

  personagem = new Personagem(x, y, 46 * 1.5, 68 * 1.5, animacoes);

  imgPlataformas = {
    madeira: await loadImage("assets/plataforma-madeira.png"),
    pedra: await loadImage("assets/plataforma-pedra.png"),
    terra: await loadImage("assets/plataforma-terra.png"),
  };

  plataformas.push(
    new Plataforma(0, height - 70, 40, 40, 15, imgPlataformas.terra),
    new Plataforma(500, height - 210, 40, 40, 5, imgPlataformas.pedra),
    new Plataforma(360, height - 340, 40, 40, 5, imgPlataformas.pedra),
    new Plataforma(width + 130, height - 70, 40, 40, 5, imgPlataformas.terra),
    new Plataforma(
      width + 410,
      height - 110,
      40,
      40,
      10,
      imgPlataformas.madeira,
    ),
  );

  itens.push(new Item(width + 45, height - 250, 40, 40, imgMoeda));
  itens.push(new Item(100, height - 140, 40, 40, imgMoeda));
  itens.push(new Item(150, height - 140, 40, 40, imgMoeda));
  itens.push(new Item(200, height - 140, 40, 40, imgMoeda));

  for (let m of fase.monstros) {
    monstros.push(
      new Monstro(m.x, m.y, m.vx, m.vy, m.largura, m.altura, animacoes[m.tipo]),
    );
  }
}

function draw() {
  if (executando == true) {
    desenharJogo();
  } else {
    desenharGameOver();
  }
}

function desenharGameOver() {
  imgCenario.filter(GRAY);
  image(imgCenario, 0, 0);
  fill("red");
  textSize(90);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}

function desenharPontuacao() {
  fill("#ffffff83");
  noStroke();
  rect(40, 40, 150, 60);
  image(imgMoeda, 50, 50);
  fill("black");
  textSize(30);
  text("x " + pontos, 95, 80);
}

function moverEsquerda(lista) {
  for (let i = 0; i < lista.length; i++) {
    lista[i].moverEsquerda();
  }
}

function moverDireita(lista) {
  for (let i = 0; i < lista.length; i++) {
    lista[i].moverDireita();
  }
}

function desenharJogo() {
  background(220);
  image(imgCenario, 0, 0);
  desenharPontuacao();

  for (let i = 0; i < monstros.length; i++) {
    monstros[i].mover();
  }

  if (keyIsDown(LEFT_ARROW)) {
    personagem.olharParaEsquerda();
    personagem.correr();

    moverDireita(plataformas);
    moverDireita(itens);
    moverDireita(monstros);
  } else if (keyIsDown(RIGHT_ARROW)) {
    personagem.olharParaDireita();
    personagem.correr();

    moverEsquerda(plataformas);
    moverEsquerda(itens);
    moverEsquerda(monstros);
  } else {
    personagem.parar();
  }

  // todas as atualizações
  personagem.aplicarGravidade();

  if (personagem.y > height) {
    executando = false;
  }

  for (let i = 0; i < itens.length; i++) {
    if (personagem.checarColisao(itens[i])) {
      itens.splice(i, 1);
      pontos++;
    }
  }

  for (let plataforma of plataformas) {
    if (personagem.checarColisao(plataforma) == 1) {
      personagem.pisarNoChao(plataforma);
    } else if (personagem.checarColisao(plataforma) == 2) {
      personagem.baterCabeca(plataforma);
      plataforma.setCor("#FF0000");
    }
  }

  // todos os dsenhos
  personagem.desenhar();

  // Desenha todas as plataformas
  for (let plataforma of plataformas) {
    plataforma.desenhar();
  }

  // Desenha todos os itens
  for (let item of itens) {
    item.desenhar();
  }

  for (let monstro of monstros) {
    monstro.desenhar();
  }
}

function keyPressed() {
  if (keyCode == 38) {
    personagem.pular();
  }
}
