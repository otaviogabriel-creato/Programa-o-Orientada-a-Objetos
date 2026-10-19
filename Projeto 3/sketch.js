let cenario, personagem;
let mundo;

async function setup() {
  createCanvas(400, 400);
  mundo = await loadJSON("mundo1.json");
  cenario = new Cenario(35, mundo);
  personagem = new Personagem(width / 2 + 35 / 2, height / 2 + 35 / 2, 35);
}

function draw() {
  background(220);
  cenario.mostrar();
  personagem.mostrar();

  let taxa = 5;

  if (frameCount % taxa == 0) {
    mover();
  }
}

function mover() {
  if (keyIsDown(UP_ARROW)) {
    personagem.cima();
    cenario.cima();
  } else if (keyIsDown(DOWN_ARROW)) {
    personagem.baixo();
    cenario.baixo();
  } else if (keyIsDown(LEFT_ARROW)) {
    personagem.esquerda();
    cenario.esquerda();
  } else if (keyIsDown(RIGHT_ARROW)) {
    personagem.direita();
    cenario.direita();
  }
}

function keyReleased() {
  if (keyCode == 32) {
    cenario.executarAcao();
  }
}
