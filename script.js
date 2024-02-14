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


// Variable global para el tiempo restante del contador
var remainingTime = 20;
var elapsedTime = 0; // Tiempo transcurrido en el contador cuando se cierra antes
var countdownInterval; // Variable para almacenar el intervalo del contador
var countdownElement; // Variable para almacenar el elemento de contador
var randomWord = ''; // Variable global para almacenar la palabra obtenida aleatoriamente

// Función para iniciar la cuenta regresiva
function startCountdown() {
  var countdownDuration = remainingTime;

  // Verificar si ya hay un elemento de contador, si no, crear uno nuevo
  if (!countdownElement) {
    countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    modal.getElementsByClassName('modal-content')[0].appendChild(countdownElement);
  }

  // Actualizar el contenido del contador
  countdownElement.textContent = countdownDuration + "s";

  // Intervalo para actualizar el contador cada segundo
  countdownInterval = setInterval(function () {
    countdownDuration--;
    countdownElement.textContent = countdownDuration + "s";

    // Detener el contador cuando alcanza 0
    if (countdownDuration <= 0) {
      clearInterval(countdownInterval); // Detener el contador
      modal.style.display = "none"; // Ocultar el modal
    }
  }, 1000); // Intervalo de actualización (cada segundo)
}

// Evento que se dispara cuando el contenido del DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('modal');
  var modalWord = document.getElementById('modal-word');
  var closeButton = document.getElementsByClassName('close')[0];
  var showRandomWordButton = document.getElementById('show-random-word-button');
  var wordList = document.getElementById('word-list').getElementsByTagName('li');
  var audioCorrect = new Audio('audios/correct.mp3'); // Ruta al archivo de audio para respuestas correctas
  var audioIncorrect = new Audio('audios/incorrect.mp3'); // Ruta al archivo de audio para respuestas incorrectas

  // Función para mostrar el modal con una palabra específica
  function showModal(word) {
    // Guardar la palabra obtenida aleatoriamente en la variable global
    randomWord = word;

    modalWord.textContent = word;
    modal.style.display = 'block';
    document.getElementById('result-message').textContent = '';

    // Limpiar el contenido del input
    document.getElementById('user-input').value = '';

    // Ocultar el input inicialmente
    document.getElementById('user-input').style.display = 'none';

    // Mostrar el botón "Play" junto con el modal
    document.getElementById('play-word-button').style.display = 'inline-block';
    // Ocultar el botón "Check"
    document.getElementById('check-word-button').style.display = 'none';
  }

  // Evento que se dispara cuando se hace clic en el botón "Play"
  document.getElementById('play-word-button').addEventListener('click', function () {
    // Detener cualquier contador existente antes de iniciar uno nuevo
    clearInterval(countdownInterval);
    // Eliminar la palabra del modal
    modalWord.textContent = '';
    // Ocultar el botón "Play"
    this.style.display = 'none';
    // Mostrar el input
    document.getElementById('user-input').style.display = 'block';
    // Mostrar el botón "Check"
    document.getElementById('check-word-button').style.display = 'inline-block';
    // Iniciar un nuevo contador
    startCountdown();
  });


  // Función para cerrar el modal
  function closeModal() {
    modal.style.display = 'none';
    // Detener el contador y eliminar el elemento de contador
    clearInterval(countdownInterval);
    if (countdownElement) {
      countdownElement.parentNode.removeChild(countdownElement);
      countdownElement = null; // Restablecer la referencia al elemento de contador
    }
  }

  // Evento para cerrar el modal al hacer clic en la X
  closeButton.addEventListener('click', closeModal);

  // Evento para cerrar el modal al hacer clic fuera del modal
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Evento para mostrar una palabra aleatoria al hacer clic en el botón correspondiente
  showRandomWordButton.addEventListener('click', function () {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var randomWord = wordList[randomIndex].textContent;
    showModal(randomWord);
  });

  // Evento para reproducir un audio al hacer clic en el botón correspondiente
  document.getElementById("show-random-word-button").addEventListener("click", function () {
    var audio = document.getElementById("audio");
    audio.play();
  });

  // Evento para comparar la entrada del usuario con la palabra mostrada en el modal
  document.getElementById('check-word-button').addEventListener('click', function () {
    var userInput = document.getElementById('user-input').value.toLowerCase().trim();
    var modalWord = document.getElementById('modal-word').textContent.toLowerCase().trim();

    if (userInput === randomWord.toLowerCase().trim()) {
      document.getElementById('result-message').textContent = 'Correct!';
      audioCorrect.play(); // Reproducir audio de respuesta correcta
    } else {
      document.getElementById('result-message').textContent = 'Incorrect. Try again.';
      audioIncorrect.play(); // Reproducir audio de respuesta incorrecta
    }
  });
});