const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $subjects = document.querySelector(".subjects")
const $answersContainer = document.querySelector(".answers-container")
const $life = document.querySelector(".life")
const $score = document.querySelector(".score")
const $answers = document.querySelectorAll(".answer")
const $divImage = document.getElementById("image");

let currentQuestionIndex = 0
let totalCorrect = 0
let life = 3
let counter = 0
let questions = 0

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  $life.textContent = life
  $score.textContent = totalCorrect
  questions = subject()

  if (counter === 5) {
    return finishGame()
  } else if (life === 0) {
    return finishGame()
  }

  if (counter === 0){
    $subjects.textContent = "Português"
  } else if (counter === 1){
    $subjects.textContent = "Ciências"
  } else if (counter === 2){
    $subjects.textContent = "Matemática"
  } else if (counter === 3){
    $subjects.textContent = "História"
  } else if (counter === 4){
    $subjects.textContent = "Geografia"
  }

  $questionText.textContent = questions[currentQuestionIndex=getRandomInt(1, 5)].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })

  counter++ 

  console.log(questions)

  while ($divImage.firstChild) {
    $divImage.removeChild($divImage.firstChild);
  }

  for (let i = 0; i < life; i++){
    // Crie um elemento de imagem
    var heart = document.createElement("div");
  
    // Defina o atributo src com o caminho da imagem
    heart.classList.add("heart")
  
    // Adicione a imagem ao contêiner desejado
    var $imageHeart = document.getElementById("image");
    
    $imageHeart.appendChild(heart);
  }

}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    totalCorrect++
  } else {
    life-- 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  
}

function finishGame() {
  
  let message = ""

  if (totalCorrect >= 3){
    message = "Parabéns! Você passou para a próxima fase :)"
  } else {
    message = "Reprovado! Faça novamente o teste :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      <span>${message}</span>
      <br>
      Você acertou ${totalCorrect} de 5 questões!
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

function subject(){
  if (counter === 0){
    questions = [
      {
        question: "1) 'O consumo da água TRIPLICOU em 1950'. A palavra destacada significa:",
        answers: [
          { text: "a) Aumentou 3 vezes", correct: true },
          { text: "b) Diminuiu", correct: false },
          { text: "c) Aumentou", correct: false },
          { text: "d) Aumentou 30 vezes", correct: false }
        ]
      },
      {
        question: "1) Em 'o jardineiro REBATEU', a palavra destacada tem o mesmo sentido de:",
        answers: [
          { text: "a) Recomendar", correct: false },
          { text: "b) Perguntar", correct: false },
          { text: "c) Discordar", correct: true },
          { text: "d) Aprovar", correct: false }
        ]
      },
      {
        question: '1) A graça dessa piada está no fato de:',
        answers: [
          { text: "a) Zezinho não ter feito a lição de casa", correct: false },
          { text: "b) Zezinho achar que está livre do castigo", correct: false },
          { text: "c) Zezinho não ser castigado porque a professora é boazinha", correct: false },
          { text: "d) Zezinho ter sido esperto ao fazer a pergunta para a professora", correct: true }
        ]
      },
      {
        question: '1) “Meu padrasto, sandro, disse que o nome só poderia ser miguel se eu cortasse o cabelo igual ao dele – claro que aceitei o desafio.” disse a menina depois. Qual outra forma de escrever a fala do padrasto mantendo o mesmo sentido?',
        answers: [
          { text: "a) O padrasto disse à menina: – o nome só poderá ser miguel se você cortar o cabelo igual ao meu.", correct: true },
          { text: "b) Sandro disse ao padrasto: – o nome só poderá ser miguel se você cortar o cabelo igual ao dele", correct: false },
          { text: "c) A menina disse a sandro: – o nome só poderá ser miguel se você cortar o cabelo igual ao meu.", correct: false },
          { text: "d) O padrasto disse a miguel: – o nome só poderá ser miguel se você cortar o cabelo igual ao dele.", correct: false }
        ]
      },
      {
        question: '1) No período “Já pensou se tivesse de trabalhar nesse lugar?”, a conjunção subordinativa “se” aponta para um fato:',
        answers: [
          { text: 'a) Certo', correct: false },
          { text: 'b) Concluído', correct: false },
          { text: 'c) Hipotético', correct: true },
          { text: 'd) Previsível', correct: false }
        ]
      },
    ]
  } else if (counter === 1){
    questions = [
      {
        question: "2) Quais os 3 Estados fisicos da água? ",
        answers: [
          { text: "a) Condensação, solidificação, evaporização", correct: false },
          { text: "b) Sólido, liquido e gasoso", correct: true },
          { text: "c) Solidificado, liquifação, sublimação ", correct: false },
          { text: "d) Liquido, gasoso, fusão", correct: false }
        ]
      },
      {
        question: '2) Por meio de que processo a planta obtém seu alimento?',
        answers: [
          { text: 'a) Autofagia', correct: false },
          { text: 'b) Decomposição', correct: false },
          { text: 'c) Geotropismo', correct: false },
          { text: "d) Fotossíntese", correct: true }
        ]
      },
      {
        question: '2) Xilema é um tecido...',
        answers: [
          { text: 'a) Vegetal', correct: true },
          { text: 'b) Muscular', correct: false },
          { text: 'c) Nervoso', correct: false },
          { text: "d) Conjuntivo", correct: false }
        ]
      },
      {
        question: ' 2) Qual o maior órgão do corpo humano?',
        answers: [
          { text: 'a) Coração', correct: false },
          { text: 'b) Intestino', correct: false },
          { text: 'c) Cérebro', correct: false },
          { text: "d) Pele", correct: true }
        ]
      },
      {
        question: ' 2) Onde começa o processo de digestão do alimento?',
        answers: [
          { text: 'a) Boca', correct: true },
          { text: 'b) Estômago', correct: false },
          { text: 'c) Intestino', correct: false },
          { text: "d) Fígado", correct: false }
        ]
      },
    ]
  } else if (counter === 2){
    questions = [
      {
        question: "3) Leandro tem 40 balas chupou 12 e deu 10 para sua irmã. Com quantas balas ele ficou?",
        answers: [
          { text: "a) 14", correct: false },
          { text: "b) 18", correct: true },
          { text: "c) 15", correct: false },
          { text: "d) 16", correct: false }
        ]
      },
      {
        question: '3) Quanto é 13+10x3?',
        answers: [
          { text: 'a) 69', correct: false },
          { text: 'b) 43', correct: true },
          { text: 'c) 39', correct: false },
          { text: "d) 56", correct: false }
        ]
      },
      {
        question: '3) Qual é o nome da linha que divide um círculo em duas partes iguais?',
        answers: [
          { text: 'a) Corda', correct: false },
          { text: 'b) Diâmetro', correct: true },
          { text: 'c) Raio', correct: false },
          { text: "d) Diagonal", correct: false }
        ]
      },
      {
        question: ' 43) Qual numero está faltando na sequência: 1,4,9,16,__?',
        answers: [
          { text: 'a) 18', correct: false },
          { text: 'b) 22', correct: false },
          { text: 'c) 25', correct: true },
          { text: "d) 28", correct: false }
        ]
      },
      {
        question: ' 3) Quanto é 2x8+7^2?',
        answers: [
          { text: 'a) 65', correct: true },
          { text: 'b) 68', correct: false },
          { text: 'c) 70', correct: false },
          { text: "d) 62", correct: false }
        ]
      },
    ]
  } else if (counter === 3){
    questions = [
      {
        question: "4) Como era a sociedade na Idade Antiga?",
        answers: [
          { text: "a) Os camponeses em sua grande maioria  viviam de pesca e jogos ", correct: false },
          { text: "b) Os camponeses em sua grande maioria viviam de pesca e cultivo de alimentos ", correct: true },
          { text: "c) Os camponeses em sua grande maioria viviam de cultivo de alimentos e música ", correct: false },
          { text: "d) Os camponeses em sua grande maioria viviam de corrida e desenhos ", correct: false }
        ]
      },
      {
        question: '4) Sobre o absolutismo:',
        answers: [
          { text: 'a) As pessoas que eram contra o rei não  sofriam nenhum tipo de violência ', correct: false },
          { text: 'b) Os monarcas precisavam seguir e ser regulares com as leis e religiões', correct: false },
          { text: 'c) O monarca não tinha poder nenhum sobre o povo', correct: false },
          { text: "d) Concentração total do poder na mão do monarca ", correct: true }
        ]
      },
      {
        question: '4) Sobre o Feudalismo,marque a INCORRETA:',
        answers: [
          { text: 'a) Era divididos em feudos e a economia era baseada na agricultura ', correct: false },
          { text: 'b) Havia o sistema servil de produção, ou seja, o trabalhador rural era servo do grande proprietário.', correct: false },
          { text: 'c) Os vassalos eram servos dos suseranos.', correct: false },
          { text: "d) Os suseranos eram servos dos vassalos.", correct: true }
        ]
      },
      {
        question: ' 4) Na Revolução Francesa a sociedade era dividida em classes sociais,conhecidas como Estado:',
        answers: [
          { text: 'a) Primeiro Estado:clero, Segundo Estado: nobreza, Terceiro Estado: o povo ', correct: true },
          { text: 'b) Primeiro Estado: Nobreza,Segundo Estado: povo,Terceiro Estado: clero ', correct: false },
          { text: 'c) Primeiro Estado: povo,Segundo Estado: clero,Terceiro Estado: nobreza ', correct: false },
          { text: "d) Tinha apenas dois Estados,em que o Primeiro era o clero e o Segundo a Nobreza ", correct: false }
        ]
      },
      {
        question: ' 4) O Diário de Anne Frank é um dos registros mais conhecidos da Segunda Guerra Mundial. Esse registro mostra a rotina de uma jovem judia e de sua família no esconderijo em que eles viviam, em:',
        answers: [
          { text: 'a) Berlim', correct: false },
          { text: 'b) Amsterdã', correct: true },
          { text: 'c) Nuremberg', correct: false },
          { text: "d) Munique", correct: false }
        ]
      },
    ]
  } else if (counter === 4){
    // GEOGRAFIA
    questions = [
      {
        question: "5) Qual é o maior continente do mundo?",
        answers: [
          { text: "a) África", correct: false },
          { text: "b) América do Sul", correct: false },
          { text: "c) Europa", correct: false },
          { text: "d) Ásia", correct: true },
          { text: "e) Oceania", correct: false }
        ]
      },
      {
        question: '5) Qual é o principal elemento que compõe a atmosfera da Terra?',
        answers: [
          { text: 'a) Oxigênio', correct: false },
          { text: 'b) Hidrogênio', correct: false },
          { text: 'c) Nitrogênio', correct: true },
          { text: "d) Dióxido de Carbono", correct: false },
          { text: "e) Argônio", correct: false }
        ]
      },
      {
        question: '5) O rio Amazonas está localizado em qual continente?',
        answers: [
          { text: 'a) América do Sul', correct: true },
          { text: 'b) África', correct: false },
          { text: 'c) Ásia', correct: false },
          { text: 'd) América do Norte', correct: false },
          { text: "e) Europa", correct: false }
        ]
      },
      {
        question: ' 5) Qual é o nome do movimento da crosta terrestre que causa terremotos?',
        answers: [
          { text: 'a) Erosão', correct: false },
          { text: 'b) Vulcânico', correct: false },
          { text: 'c) Tectônico', correct: false },
          { text: "d) Sísmico", correct: true },
          { text: "e) Glacial", correct: false }
        ]
      },
      {
        question: ' 5) Qual é o ponto mais alto da Terra?',
        answers: [
          { text: 'a) Monte Everest', correct: true },
          { text: 'b) Montanha Denali', correct: false },
          { text: 'c) Monte Kilimanjaro', correct: false },
          { text: "d) Monte Fuji", correct: false },
          { text: "e) Montanha K2", correct: false }
        ]
      },
    ]
  }
  return questions;
}