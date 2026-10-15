const perguntas = [
  {
    categoria: "Operações básicas",
    pergunta: "Quanto é 248 + 137?",
    alternativas: ["365", "375", "385", "395"],
    correta: 2,
    explicacao: "248 + 137 = 385. Primeiro, somamos as unidades, depois as dezenas e as centenas."
  },
  {
    categoria: "Subtração",
    pergunta: "Uma biblioteca tinha 520 livros e emprestou 185. Quantos livros ficaram?",
    alternativas: ["335", "345", "355", "365"],
    correta: 0,
    explicacao: "520 − 185 = 335. Subtraímos a quantidade de livros emprestados do total."
  },
  {
    categoria: "Multiplicação",
    pergunta: "Uma caixa tem 12 lápis. Quantos lápis há em 5 caixas iguais?",
    alternativas: ["50", "55", "60", "65"],
    correta: 2,
    explicacao: "12 × 5 = 60. A multiplicação representa a soma de 12 lápis cinco vezes."
  },
  {
    categoria: "Divisão",
    pergunta: "36 balas serão divididas igualmente entre 4 crianças. Quantas cada uma receberá?",
    alternativas: ["6", "8", "9", "12"],
    correta: 2,
    explicacao: "36 ÷ 4 = 9. Cada criança receberá 9 balas."
  },
  {
    categoria: "Frações",
    pergunta: "Uma pizza foi dividida em 8 pedaços iguais. João comeu 3. Qual fração representa a parte comida?",
    alternativas: ["3/8", "5/8", "3/5", "8/3"],
    correta: 0,
    explicacao: "A fração é 3/8: o número 3 representa os pedaços comidos e o 8 representa o total de pedaços."
  },
  {
    categoria: "Números decimais",
    pergunta: "Quanto é 2,5 + 1,3?",
    alternativas: ["3,5", "3,8", "4,0", "4,2"],
    correta: 1,
    explicacao: "2,5 + 1,3 = 3,8. Alinhamos as vírgulas e somamos as partes correspondentes."
  },
  {
    categoria: "Geometria",
    pergunta: "Quantos lados tem um hexágono?",
    alternativas: ["4", "5", "6", "8"],
    correta: 2,
    explicacao: "Um hexágono é um polígono que possui 6 lados e 6 vértices."
  },
  {
    categoria: "Perímetro",
    pergunta: "Um quadrado tem lados de 5 cm. Qual é o seu perímetro?",
    alternativas: ["10 cm", "15 cm", "20 cm", "25 cm"],
    correta: 2,
    explicacao: "O perímetro é a soma de todos os lados. Como são 4 lados de 5 cm: 4 × 5 = 20 cm."
  },
  {
    categoria: "Múltiplos",
    pergunta: "Qual dos números abaixo é múltiplo de 7?",
    alternativas: ["20", "28", "30", "32"],
    correta: 1,
    explicacao: "28 é múltiplo de 7 porque 7 × 4 = 28."
  },
  {
    categoria: "Problemas matemáticos",
    pergunta: "Maria comprou 3 cadernos por R$ 8 cada. Quanto ela pagou no total?",
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
const progresso = document.getElementById("progresso");
const categoria = document.getElementById("categoria");
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

  inicio.classList.add("escondido");
  resultado.classList.add("escondido");
  jogo.classList.remove("escondido");

  mostrarPergunta();
}

function mostrarPergunta() {
  respondeu = false;

  const atual = perguntas[indiceAtual];

  numeroPergunta.textContent =
    `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

  pontuacao.textContent = pontos;
  progresso.style.width =
    `${(indiceAtual / perguntas.length) * 100}%`;

  categoria.textContent = atual.categoria;
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
    botao.addEventListener("click", () => verificarResposta(indice));

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
    tituloFeedback.textContent = "🎉 Muito bem! Você acertou!";
  } else {
    tituloFeedback.textContent = "💡 Não foi dessa vez! Vamos aprender.";
  }

  pontuacao.textContent = pontos;
  explicacao.textContent = atual.explicacao;

  feedback.classList.remove("escondido");

  botaoProximo.textContent =
    indiceAtual === perguntas.length - 1
      ? "Ver resultado 🏆"
      : "Próxima pergunta →";

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
  pontuacaoFinal.textContent = `${pontos}/${perguntas.length}`;

  if (pontos === 10) {
    tituloResultado.textContent = "Incrível! 🏆";
    mensagemResultado.textContent =
      "Você acertou todas as perguntas! Parabéns pelo seu ótimo desempenho.";
  } else if (pontos >= 7) {
    tituloResultado.textContent = "Muito bem! 🌟";
    mensagemResultado.textContent =
      "Você foi muito bem! Continue praticando para aprender ainda mais.";
  } else if (pontos >= 4) {
    tituloResultado.textContent = "Bom trabalho! 💜";
    mensagemResultado.textContent =
      "Você está aprendendo! Revise as explicações e tente novamente.";
  } else {
    tituloResultado.textContent = "Continue tentando! ✏️";
    mensagemResultado.textContent =
      "Cada pergunta é uma oportunidade de aprender. Pratique e jogue outra vez!";
  }
}
