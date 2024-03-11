let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');

const songName = document.querySelector('.music-name');

const artistName = document.querySelector('.artist-name');

const disk = document.querySelector('.disk');

const currentTime = document.querySelector('.current-time');

const musicDuration = document.querySelector('.song-duration');

const playBtn = document.querySelector('.play-btn');

const forwardBtn = document.querySelector('.forward-btn'); // Corregido: Agregué el punto antes de 'forward-btn'

const backwardBtn = document.querySelector('.backward-btn');

// Asegúrate de tener la variable 'songs' definida en otro lugar de tu código.
const songs = [
  {
    path: 'audio1.mp4',
    name: '11 de Marzo',
    artist: 'karen desiree',
    cover: '1.jpeg',
  },
  // Agrega más objetos de canciones según tus necesidades.
];

playBtn.addEventListener('click', () => {
  if (playBtn.className.includes('pause')) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle('pause');
  disk.classList.toggle('play');
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;

  currentTime.innerHTML = '00:00';
  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
};

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`; // Corregido: Usé el operador de asignación '=' en lugar de solo la coma
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`; // Corregido: Usé el operador de asignación '=' en lugar de solo la coma
  }
  return `${min} : ${sec}`;
};

setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
}, 500);

seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
});

// Puedes llamar a setMusic con el índice de la canción que deseas reproducir inicialmente.
setMusic(0); // Cambia el índice según tus necesidades.








function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}