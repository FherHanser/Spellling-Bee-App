// Función para reproducir los audios de las letras
function playVowel(vowel) {
  const vowelAudio = document.getElementById('vowel_audio_' + vowel);
  vowelAudio.play();
}

function showPronunciation(word) {
  const pronunciationDiv = document.getElementById('pronunciation');
  const pronunciationAudio = document.getElementById('pronunciation_audio');
  const syllablesDiv = document.getElementById('syllables');
  const syllablesAudio = document.getElementById('syllables_audio');
  const selectedWordParagraph = document.getElementById('selected_word');

  // Lógica para obtener los archivos de audio correspondientes
  const pronunciationAudioSrc = `audios/${word}_pronunciation.mp3`;
  const syllablesAudioSrc = `audios/${word}_syllables.mp3`;

  // Cargar los archivos de audio
  pronunciationAudio.src = pronunciationAudioSrc;
  syllablesAudio.src = syllablesAudioSrc;

  // Mostrar la palabra seleccionada
  selectedWordParagraph.textContent = `${word}`;

  // Detener la reproducción de ambos audios antes de iniciar uno nuevo
  pronunciationAudio.pause();
  syllablesAudio.pause();

  // Reproducir los archivos de audio
  pronunciationAudio.play();
}

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('modal');
  var modalWord = document.getElementById('modal-word');
  var closeButton = document.getElementsByClassName('close')[0];
  var showRandomWordButton = document.getElementById('show-random-word-button');
  var wordList = document.getElementById('word-list').getElementsByTagName('li');

// Variable global para el tiempo restante del contador
var remainingTime = 20;
var elapsedTime = 0; // Tiempo transcurrido en el contador cuando se cierra antes

// Función para mostrar el modal
function showModal(word) {
  modalWord.textContent = word;
  modal.style.display = 'block';
  
  // Eliminar la cuenta regresiva anterior si existe
  var previousCountdown = document.getElementById('countdown');
  if (previousCountdown) {
    previousCountdown.parentNode.removeChild(previousCountdown);
  }

  elapsedTime = 0; // Restablecer el tiempo transcurrido a 0

  // Mostrar el contador
  var countdownDuration = remainingTime;
  var countdownElement = document.createElement('div');
  countdownElement.id = 'countdown';
  countdownElement.textContent = countdownDuration + "s";
  modal.getElementsByClassName('modal-content')[0].appendChild(countdownElement);

  // Función para actualizar el contador cada segundo
  var countdownInterval = setInterval(function() {
    countdownDuration--;
    countdownElement.textContent = countdownDuration + "s";
    elapsedTime++; // Incrementar el tiempo transcurrido

    if (countdownDuration <= 0) {
      clearInterval(countdownInterval); // Detener el contador
      modal.style.display = "none"; // Ocultar el modal
    }
  }, 1000); // Intervalo de actualización (cada segundo)
}



  // Función para cerrar el modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Evento para cerrar el modal al hacer clic en la X
  closeButton.addEventListener('click', closeModal);

  // Evento para cerrar el modal al hacer clic fuera del modal
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Evento para mostrar una palabra aleatoria al hacer clic en el botón
  showRandomWordButton.addEventListener('click', function () {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var randomWord = wordList[randomIndex].textContent;
    showModal(randomWord);
  });
});


document.getElementById("show-random-word-button").addEventListener("click", function () {
  var audio = document.getElementById("audio");
  audio.play();
});
