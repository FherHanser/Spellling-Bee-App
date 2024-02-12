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
  
  // Función para mostrar el modal
  function showModal(word) {
    modalWord.textContent = word;
    modal.style.display = 'block';
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



