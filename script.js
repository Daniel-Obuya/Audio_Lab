const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volume = document.getElementById("volume");
const timeDisplay = document.getElementById("time");
const durationDisplay = document.getElementById("duration");
const progress = document.getElementById("progress");
const skipBackBtn = document.getElementById("skipBackBtn");
const skipFwdBtn = document.getElementById("skipFwdBtn");
const muteBtn = document.getElementById("muteBtn");
const repeatBtn = document.getElementById("repeatBtn");
let isLooping = false;

// Repeat/Loop
repeatBtn.addEventListener("click", () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    repeatBtn.style.opacity = isLooping ? "1" : "0.6";
});

// Play/Pause toggle
playBtn.addEventListener("click", () => {
    audio.play();
});
pauseBtn.addEventListener("click", () => {
    audio.pause();
});
audio.addEventListener("play", () => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
});
audio.addEventListener("pause", () => {
    playBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
});

// Volume
audio.volume = volume.value;
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Mute/Unmute
muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔈" : "🔊";
});

// Progress bar update and seeking
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        timeDisplay.textContent = formatTime(audio.currentTime);
    }
});
audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
});
progress.addEventListener("input", () => {
    if (!isNaN(audio.duration)) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

// Keyboard Controls
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        audio.paused ? audio.play() : audio.pause();
    } else if (e.code === "ArrowRight") {
        if (!isNaN(audio.duration)) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        }
    } else if (e.code === "ArrowLeft") {
        if (!isNaN(audio.duration)) {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        }
    } else if (e.key.toLowerCase() === "m") {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? "🔈" : "🔊";
    }
});

// Skip Forward/Backward 10 seconds
skipBackBtn.addEventListener("click", () => {
    if (!isNaN(audio.duration)) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
});
skipFwdBtn.addEventListener("click", () => {
    if (!isNaN(audio.duration)) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
});

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}
