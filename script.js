// ==========================
// RELOJ
// ==========================

function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;

    const date = now.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();


// ==========================
// CRONÓMETRO
// ==========================

let seconds = 0;
let stopwatchInterval = null;

function updateStopwatch() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    document.getElementById("stopwatch").textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(secs).padStart(2, "0")}`;
}


// INICIAR
document.getElementById("startBtn").addEventListener("click", () => {

    if (stopwatchInterval !== null) return;

    stopwatchInterval = setInterval(() => {
        seconds++;
        updateStopwatch();
    }, 1000);

});


// PAUSAR
document.getElementById("pauseBtn").addEventListener("click", () => {

    clearInterval(stopwatchInterval);
    stopwatchInterval = null;

});


// REINICIAR
document.getElementById("resetBtn").addEventListener("click", () => {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;
    seconds = 0;

    updateStopwatch();

});

updateStopwatch();


// ==========================
// DESPERTADOR
// ==========================

let alarmTime = null;
let alarmInterval = null;

// Tu música
const alarmAudio = new Audio("musica.mp3");

alarmAudio.loop = true;
alarmAudio.volume = 0.7;


// ACTIVAR ALARMA
document.getElementById("setAlarmBtn").addEventListener("click", () => {

    const selectedTime =
        document.getElementById("alarmTime").value;

    if (!selectedTime) {
        alert("Elegí una hora primero.");
        return;
    }

    alarmTime = selectedTime;

    document.getElementById("alarmStatus").textContent =
        `⏰ Alarma programada para las ${alarmTime}`;

    // Limpiamos cualquier alarma anterior
    if (alarmInterval !== null) {
        clearInterval(alarmInterval);
    }

    // Comenzamos a comprobar la hora
    alarmInterval = setInterval(checkAlarm, 1000);
});


// COMPROBAR ALARMA
function checkAlarm() {

    if (!alarmTime) return;

    const now = new Date();

    const currentHours =
        String(now.getHours()).padStart(2, "0");

    const currentMinutes =
        String(now.getMinutes()).padStart(2, "0");

    const currentTime =
        `${currentHours}:${currentMinutes}`;

    if (currentTime === alarmTime) {

        activateAlarm();

        // Desactivar alarma
        alarmTime = null;

        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}


// ACTIVAR ALARMA
function activateAlarm() {

    document.getElementById("alarmStatus").textContent =
        "🚨 ¡ALARMA! ¡ES HORA!";

    // Empezar la música
    alarmAudio.currentTime = 0;

    alarmAudio.play().catch((error) => {
        console.log("No se pudo reproducir automáticamente:", error);
    });
}


// ==========================
// MÚSICA
// ==========================

const music = document.getElementById("music");
const playMusicBtn = document.getElementById("playMusicBtn");
const pauseMusicBtn = document.getElementById("pauseMusicBtn");
const volume = document.getElementById("volume");

if (music) {

    music.volume = 0.5;

    playMusicBtn.addEventListener("click", () => {
        music.play();
    });

    pauseMusicBtn.addEventListener("click", () => {
        music.pause();
    });

    volume.addEventListener("input", () => {
        music.volume = volume.value;
    });
}