class Personagem {
  constructor(x, y, tam) {
    this.x = x;
    this.y = y;
    this.tam = tam;
    this.direcao = 0;
  }

  cima() {
    this.setDirecao(180);
  }

  baixo() {
    this.setDirecao(0);
  }

  direita() {
    this.setDirecao(270);
  }

  esquerda() {
    this.setDirecao(90);
  }

  setDirecao(dir) {
    this.direcao = dir;
  }

  mostrar() {
    push();
    fill(0);
    translate(this.x, this.y);
    rotate(radians(this.direcao));
    let x = -this.tam / 2,
      y = -this.tam / 2;
    square(x, y, this.tam);

    let lado = this.tam / 3;
    let x1 = x + lado;
    let x2 = x + 2 * lado;
    let x3 = x + lado + lado / 2;
    let y1 = y + lado;
    let y2 = y + lado;
    let y3 = y + 2 * lado;
    fill(255);

    triangle(x1, y1, x2, y2, x3, y3);

    pop();
  }
}
