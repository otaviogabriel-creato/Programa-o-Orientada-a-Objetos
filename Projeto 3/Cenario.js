class Cenario {
  constructor(tam, arqCenario) {
    this.tam = tam;
    this.posx = width / 2;
    this.posy = height / 2;
    this.xInicial = this.posx;
    this.yInicial = this.posy;
    this.mundo = arqCenario.mundo;
  }

  mostrar() {
    const qtdLinhas = this.mundo.cenario.length;
    const qtdColunas = this.mundo.cenario[0].length;
    const tam = this.tam;
    noStroke();

    push();
    translate(this.posx, this.posy);

    for (let lin = 0; lin < qtdLinhas; lin++) {
      for (let col = 0; col < qtdColunas; col++) {
        const valor = this.mundo.cenario[lin][col];

        fill(this.mundo.cores[valor]);
        square(col * tam, lin * tam, tam);
      }
    }
    pop();
  }

  getPosicao() {
    const coluna = (this.xInicial - this.posx) / this.tam;
    const linha = (this.yInicial - this.posy) / this.tam;

    return {
      linha,
      coluna,
    };
  }

  executarAcao() {
    const posicao = this.getPosicao();

    print(this.mundo.acoes[posicao.linha][posicao.coluna]);
  }

  mover(x, y) {
    const coluna = (this.xInicial - x) / this.tam;
    const linha = (this.yInicial - y) / this.tam;
    print(`x=${x} y=${y} tam=${this.tam} linha=${linha} coluna=${coluna}`);
    const qtdLinhas = this.mundo.cenario.length;
    const qtdColunas = this.mundo.cenario[0].length;

    if (
      linha >= 0 &&
      coluna >= 0 &&
      linha < qtdLinhas &&
      coluna < qtdColunas &&
      this.mundo.colisoes[linha][coluna] == 0
    ) {
      this.posx = x;
      this.posy = y;
    }
  }

  esquerda() {
    this.mover(this.posx + this.tam, this.posy);
  }

  direita() {
    this.mover(this.posx - this.tam, this.posy);
  }

  cima() {
    this.mover(this.posx, this.posy + this.tam);
  }

  baixo() {
    this.mover(this.posx, this.posy - this.tam);
  }
}
