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


