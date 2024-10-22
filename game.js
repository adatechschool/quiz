//import des questions
import { quiz_fatoumata_kebe } from './questions.js'; // Import des questions

// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0; // Commence à la première question

// Variables pour suivre le score - au début zero
let score = 0;
// Sélection des éléments HTML
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const resultElement = document.getElementById('result');

// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
  // Vider le conteneur des options
  optionsContainer.innerHTML = '';

  // Récupérer la question actuelle
  const currentQuestion = quiz_fatoumata_kebe.questions[currentQuestionIndex];

  // Injecter la question dans le HTML
  questionText.innerText = currentQuestion.text;

  // Injecter les options dans le HTML (même si on ne les utilise pas pour le moment)
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = `${index + 1}. ${option}`;
    button.setAttribute('data-option-text', option); 
    button.classList.add('option-button');
    button.addEventListener('click', () => checkAnswer(button, option)); 
    optionsContainer.appendChild(button);
  });
  resultElement.innerText = '';
  nextButton.disabled = true;
}

// Fonction pour vérifier la réponse et ajouter des bordures
function checkAnswer(button, selectedOption) {
  const currentQuestion = quiz_fatoumata_kebe.questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correct_answer;

  // Désactiver tous les boutons après le choix
  const allButtons = document.querySelectorAll('.option-button');
  allButtons.forEach(btn => {
    btn.disabled = true; // Désactiver tous les boutons après sélection
  });

  // Vérifier si la réponse est correcte ou non
  if (selectedOption.trim() === correctAnswer.trim()) {
    button.classList.add('correct-answer'); 
    score++;
  } else {
    button.classList.add('wrong-answer'); 

    // Afficher également la bonne réponse
    allButtons.forEach(btn => {
      if (btn.getAttribute('data-option-text').trim() === correctAnswer.trim()) {
        btn.classList.add('correct-answer'); // Bordure verte pour la bonne réponse
      }
    });
  }

  // Afficher le bouton "Suivant" après avoir cliqué sur une réponse
  nextButton.disabled = false;
}


// Ajouter un écouteur d'événements pour le bouton "Suivant"
nextButton.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_fatoumata_kebe.questions.length) {
    // Afficher la question suivante
    loadQuestion();
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  questionText.innerText = `Tu as obtenu ${score}/${quiz_fatoumata_kebe.questions.length}.`;

  let message = '';

  // Message personnalisé en fonction du score
  if (score === quiz_fatoumata_kebe.questions.length) {
    message = "Excellent ! Fatoumata Kébé n'a pas de secret pour toi ! 🎉";
  } else if (score >= quiz_fatoumata_kebe.questions.length / 2) {
    message = "Bien joué ! Tu connais bien Fatoumata Kébé 👍";
  } else {
    message = "Bah alors...😊";
  }

  // Afficher le message final
  optionsContainer.innerHTML = ''; // Vider les options
  resultElement.innerText = message; // Afficher le message personnalisé
  
  nextButton.style.display = 'none'; // Cacher le bouton Suivant
  replayButton.style.display = 'inline-block'; // Afficher le bouton Rejouer
}

// Fonction pour réinitialiser le quiz
replayButton.addEventListener('click', () => {
  // Réinitialiser l'index et le score
  currentQuestionIndex = 0;
  score = 0;

  // Cacher le bouton Rejouer et afficher le bouton Suivant
  replayButton.style.display = 'none';
  nextButton.style.display = 'inline-block';

  // Recharger la première question
  loadQuestion();
});
// Charger la première question au chargement de la page
loadQuestion();
