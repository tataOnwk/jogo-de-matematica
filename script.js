const perguntas = [
  {
    categoria: "FASE 1 • ADIÇÃO",
    pergunta: "Quanto é 248 + 137?",
    alternativas: ["365", "375", "385", "395"],
    correta: 2,
    explicacao: "248 + 137 = 385. Somamos as unidades, as dezenas e as centenas."
  },
  {
    categoria: "FASE 2 • SUBTRAÇÃO",
    pergunta: "Uma biblioteca tinha 520 livros e emprestou 185. Quantos ficaram?",
    alternativas: ["335", "345", "355", "365"],
    correta: 0,
    explicacao: "520 − 185 = 335 livros. Subtraímos os livros emprestados do total."
  },
  {
    categoria: "FASE 3 • MULTIPLICAÇÃO",
    pergunta: "Uma caixa tem 12 lápis. Quantos lápis há em 5 caixas?",
    alternativas: ["50", "55", "60", "65"],
    correta: 2,
    explicacao: "12 × 5 = 60 lápis. Multiplicamos 12 pela quantidade de caixas."
  },
  {
    categoria: "FASE 4 • DIVISÃO",
    pergunta: "36 balas serão divididas igualmente entre 4 crianças. Quantas cada uma recebe?",
    alternativas: ["6", "8", "9", "12"],
    correta: 2,
    explicacao: "36 ÷ 4 = 9. Cada criança recebe 9 balas."
  },
  {
    categoria: "FASE 5 • FRAÇÕES",
    pergunta: "Uma pizza foi dividida em 8 pedaços iguais. João comeu 3. Qual fração representa a parte comida?",
    alternativas: ["3/8", "5/8", "3/5", "8/3"],
    correta: 0,
    explicacao: "A fração 3/8 representa 3 pedaços comidos de um total de 8."
  },
  {
    categoria: "FASE 6 • DECIMAIS",
    pergunta: "Quanto é 2,5 + 1,3?",
    alternativas: ["3,5", "3,8", "4,0", "4,2"],
    correta: 1,
    explicacao: "2,5 + 1,3 = 3,8. Alinhamos as vírgulas e somamos os números."
  },
  {
    categoria: "FASE 7 • GEOMETRIA",
    pergunta: "Quantos lados tem um hexágono?",
    alternativas: ["4", "5", "6", "8"],
    correta: 2,
    explicacao: "O hexágono é uma figura geométrica que possui 6 lados e 6 vértices."
  },
  {
    categoria: "FASE 8 • PERÍMETRO",
    pergunta: "Um quadrado tem lados de 5 cm. Qual é o seu perímetro?",
    alternativas: ["10 cm", "15 cm", "20 cm", "25 cm"],
    correta: 2,
    explicacao: "O perímetro é a soma dos lados. Como o quadrado tem 4 lados de 5 cm, fazemos 4 × 5 = 20 cm."
  },
  {
    categoria: "FASE 9 • MÚLTIPLOS",
    pergunta: "Qual número abaixo é múltiplo de 7?",
    alternativas: ["20", "28", "30", "32"],
    correta: 1,
    explicacao: "28 é múltiplo de 7 porque 7 × 4 = 28."
  },
  {
    categoria: "FASE 10 • DESAFIO FINAL",
    pergunta: "Maria comprou 3 cadernos por R$ 8 cada. Quanto pagou?",
    alternativas: ["R$ 11", "R$ 16", "R$ 21", "R$ 24"],
    correta: 3,
    explicacao: "3 × 8 = 24. Maria pagou R$ 24 pelos três cadernos."
  }
];

const inicio = document.getElementById("inicio");
const jogo = document.getElementById("jogo");
const resultado = document.getElementById("resultado");

const botaoIniciar = document.getElementById("botaoIniciar");
const botaoProximo = document.getElementById("botaoProximo");
const botaoReiniciar = document.getElementById("botaoReiniciar");

const numeroPergunta = document.getElementById("numeroPergunta");
const pontuacao = document.getElementById("pontuacao");
const moedasTopo = document.getElementById("moedasTopo");
const progresso = document.getElementById("progresso");
const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");

const feedback = document.getElementById("feedback");
const tituloFeedback = document.getElementById("tituloFeedback");
const explicacao = document.getElementById("explicacao");

const tituloResultado = document.getElementById("tituloResultado");
const mensagemResultado = document.getElementById("mensagemResultado");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

let indiceAtual = 0;
let pontos = 0;
let respondeu = false;

botaoIniciar.addEventListener("click", iniciarJogo);
botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  indiceAtual = 0;
  pontos = 0;
  respondeu = false;

  atualizarPontos();

  inicio.classList.add("escondido");
  resultado.classList.add("escondido");
  jogo.classList.remove("escondido");

  mostrarPergunta();
}

function atualizarPontos() {
  pontuacao.textContent = pontos;
  moedasTopo.textContent = pontos;
}

function mostrarPergunta() {
  respondeu = false;

  const atual = perguntas[indiceAtual];

  numeroPergunta.textContent =
    `FASE ${indiceAtual + 1} / ${perguntas.length}`;

  progresso.style.width =
    `${(indiceAtual / perguntas.length) * 100}%`;

  document.querySelector(".etiqueta-fase").textContent =
    atual.categoria;

  pergunta.textContent = atual.pergunta;

  alternativas.innerHTML = "";
  feedback.classList.add("escondido");
  botaoProximo.classList.add("escondido");

  atual.alternativas.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "alternativa";

    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = String.fromCharCode(65 + indice);

    const resposta = document.createElement("span");
    resposta.textContent = texto;

    botao.append(letra, resposta);

    botao.addEventListener("click", () => {
      verificarResposta(indice);
    });

    alternativas.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido) {
  if (respondeu) return;

  respondeu = true;

  const atual = perguntas[indiceAtual];
  const botoes = alternativas.querySelectorAll(".alternativa");
  const acertou = indiceEscolhido === atual.correta;

  botoes.forEach((botao, indice) => {
    botao.disabled = true;

    if (indice === atual.correta) {
      botao.classList.add("correta");
    }

    if (indice === indiceEscolhido && !acertou) {
      botao.classList.add("errada");
    }
  });

  if (acertou) {
    pontos++;
    tituloFeedback.textContent = "🪙 +1 MOEDA! Você acertou!";
  } else {
    tituloFeedback.textContent = "💡 Quase! Vamos aprender juntos.";
  }

  atualizarPontos();
  explicacao.textContent = atual.explicacao;
  feedback.classList.remove("escondido");

  botaoProximo.textContent =
    indiceAtual === perguntas.length - 1
      ? "VER RESULTADO 🏆"
      : "PRÓXIMA FASE ▶";

  botaoProximo.classList.remove("escondido");
}

function proximaPergunta() {
  if (!respondeu) return;

  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  jogo.classList.add("escondido");
  resultado.classList.remove("escondido");

  progresso.style.width = "100%";
  pontuacaoFinal.textContent = `${pontos}/10`;

  if (pontos === 10) {
    tituloResultado.textContent = "Lenda da matemática! 🏆";
    mensagemResultado.textContent =
      "Incrível! Você conquistou todas as moedas e acertou as 10 perguntas!";
  } else if (pontos >= 7) {
    tituloResultado.textContent = "Aventura concluída! ⭐";
    mensagemResultado.textContent =
      "Você mandou muito bem! Continue praticando para dominar ainda mais desafios.";
  } else if (pontos >= 4) {
    tituloResultado.textContent = "Bom trabalho! 🍄";
    mensagemResultado.textContent =
      "Você está evoluindo! Revise as explicações e tente conquistar mais moedas.";
  } else {
    tituloResultado.textContent = "Continue a aventura! 💜";
    mensagemResultado.textContent =
      "Todo jogador aprende praticando. Tente novamente e descubra o que consegue melhorar!";
  }
}



    





 


 




   
