// Data
const songs = [
    {
        path: 'audio1.mp4',
        name: '11 de marzo',
        artist: 'By Hermes',
        cover: '1.png',
        lyrics: `La conocí al final del verano, ahora por Discord siempre nos curamos.
Siempre vocea cuando nos peleamos, la mando pal diablo y de una nos calmamos.

Sé que tú sabes quién es, siempre sonríes al ver
cada ocurrencia nueva que a mí me da por hacer.
Yo sé que tú eres feliz y lo tienes que admitir, yeeehh (porque...)

Esto es pa' que perrees a todo volumen cuando estés limpiando,
que de camino al ITLA siempre la estés escuchando,
por si algún día de estos ya no terminamos hablando (no, no terminamos hablando, sí).

¿Y qué tú quieres? ¿Que te compre Gucci y también Ferragamo?
Mentira, yo no tengo cuartos, eso era relajando.
El viajecito a Italia lo estaré esperando (siempre lo estaré esperando porque...).

Porque te quiero, tú sabes siempre soy sincero.
Esta canción es corta porque esto es lo que siento,
que de mi corazón ya tú tienes tu porciento,
aunque me digas que las historias siempre me las invento.

... siempre que duermes yo te despierto de nuevo,
siendo tan pendeja te gustan las movies de miedo, yeh (te gustan las movies de miedo).

Nanananananan, jajaj.

(*la canción dura lo mismo que mides en cm*)`
    },
    {
        path: 'audio2.mp3',
        name: 'Mi cama', 
        artist: 'By Hermes (tu marido😉)', 
        cover: '2.jpg',
        lyrics: `(Hermes voice)

Pero mi amor, ¿por qué cerraste la llamada? Yo te llamé porque quería dormir contigo, pero ok… buenas noches… descansa.

(Karen voice)

Tenías que decírmelo desde un principio mi amor, pero… ¿qué hacemos ? ¿Vamos a dormir juntos sí o no?

Y es que yo (yo yoo) te quiero aquí en mi cama, baby yo sé que tú me amas, por eso no me aguanto las ganas.

Yo (yo yoo) te quiero aquí en mi cama, por eso cada vez que me llamas me duele que no estés en mi cama.

Me duele que no estés en mi cama cuando me levanto por la mañana, por eso cada vez que me llamas escuchar tu voz me prende llamas.

Y es que baby yo sé que te pasa lo mismo conmigo, y es que no puedo olvidar el tono de tu voz y el de tus gemidos.

Solo quiero amarte, haría lo que fuera por abrazarte, mami yo te amo, solo déjame cuidarte y no te preocupes que no voy a maltratarte… bueno si tú quieres🫣

Y es que yo (yo yoo) te quiero aquí en mi cama, baby yo sé que tú me amas, por eso no me aguanto las ganas.

Yo (yo yoo) te quiero aquí en mi cama, por eso cada vez que me llamas me duele que no estés en mi cama.`
    }
];

let currentMusic = 0;

// Elements
const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');

// View Containers
const loginView = document.getElementById('login-view');
const libraryView = document.getElementById('library-view');
const playerView = document.getElementById('player-view');
const modal = document.getElementById('lyrics-modal');

// Functions

function checkPassword() {
    const passInput = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('login-error');
    if (passInput === 'piedrita') {
        loginView.classList.add('hidden');
        loginView.classList.remove('active');
        libraryView.classList.remove('hidden');
        libraryView.classList.add('active');
    } else {
        errorMsg.classList.remove('hidden');
    }
}

// Add enter key listener for password
document.getElementById('password-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function openPlayer(index) {
    libraryView.classList.add('hidden');
    libraryView.classList.remove('active');
    playerView.classList.remove('hidden');
    playerView.classList.add('active');
    setMusic(index);
    playMusic();
}

function closePlayer() {
    playerView.classList.add('hidden');
    playerView.classList.remove('active');
    libraryView.classList.remove('hidden');
    libraryView.classList.add('active');
    pauseMusic();
}

function setMusic(i) {
    currentMusic = i;
    let song = songs[i];
    
    seekBar.value = 0;
    music.src = song.path;
    
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    // Update Modal Content
    document.getElementById('modal-title').innerText = song.name;
    document.getElementById('modal-lyrics-text').innerText = song.lyrics;
}

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) min = `0${min}`;
    let sec = Math.floor(time % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
};

function playMusic() {
    music.play();
    playBtn.classList.add('pause');
    disk.classList.add('play');
}

function pauseMusic() {
    music.pause();
    playBtn.classList.remove('pause');
    disk.classList.remove('play');
}

playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains('pause')) {
        pauseMusic();
    } else {
        playMusic();
    }
});

setInterval(() => {
    if(music.duration && !isNaN(music.duration)) {
        seekBar.value = music.currentTime;
        currentTime.innerHTML = formatTime(music.currentTime);
    }
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

function nextMusic() {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
}

function prevMusic() {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
}

// Modal logic
function openLyrics() {
    modal.style.display = 'block';
}

function closeLyrics() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Ensure audio resets duration initially once loaded (for the first song init if manually called, though openPlayer does it)
music.addEventListener('loadedmetadata', () => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
});
