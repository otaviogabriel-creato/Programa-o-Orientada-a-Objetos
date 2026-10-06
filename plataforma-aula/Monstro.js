class Monstro {
  constructor(x, y, vx, vy, largura, altura, animacao) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.largura = largura;
    this.altura = altura;
    this.animacao = animacao;
    this.olhandoDireita = false;

    this.xInicial = x;
    this.yInicial = y;
    this.amplitude = 50;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.xInicial || this.x > this.xInicial + this.amplitude) {
      this.vx = -this.vx;
      this.olhandoDireita = !this.olhandoDireita;
    }

    if (this.y < this.yInicial || this.y > this.yInicial + this.amplitude) {
      this.vy = -this.vy;
    }
  }

  moverDireita() {
    this.x += 5;
    this.xInicial += 5;
  }

  moverEsquerda() {
    this.x -= 5;
    this.xInicial -= 5;
  }

  desenhar() {
    this.animacao.avancarFrame();
    this.animacao.desenhar(
      this.x,
      this.y,
      this.largura,
      this.altura,
      this.olhandoDireita,
    );
  }
}
