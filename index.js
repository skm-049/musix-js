//imports
import Data from "./data.js";

const songsList = Data.songsList;
const songsListEl = (document.getElementById("songs-list"));
let isRepeat = false;
let isShuffle = false;
let songCount = 0;
const audioElement = new Audio(songsList[songCount].url);
// console.log(songsList);


//rendering songs list from songsList array

songsList.forEach((song, i) => {
    let listItem = document.createElement("li");
    listItem.classList.add("song");
    listItem.id = i;
    let title = document.createElement("span");
    title.classList.add("song-title");
    title.innerText = song.title;
    let artist = document.createElement("span");
    artist.classList.add("song-artist");
    artist.innerText = song.artist;
    let duration = document.createElement("span");
    duration.classList.add("song-duration");
    duration.innerText = song.duration;
    let playbtn = document.createElement("span");
    playbtn.classList.add("material-symbols-outlined");
    playbtn.classList.add("play-this-song");
    playbtn.innerText = "play_arrow";
    songsListEl.appendChild(listItem);
    listItem.appendChild(title);
    listItem.appendChild(artist);
    listItem.appendChild(duration);
    listItem.appendChild(playbtn);
})



//dom-elements
const playThisSong = Array.from(document.getElementsByClassName("play-this-song")); //
const beatVideo = document.getElementById("beat"); //
const shuffleBtn = document.getElementById("shuffle-btn"); //
const previousBtn = document.getElementById("previous-btn"); //
const masterPlay = document.getElementById("master-play"); //
const nextBtn = document.getElementById("next-btn"); //
const repeatBtn = document.getElementById("repeat-btn"); //
const currentSongTime = document.getElementById("current-song-time"); //
currentSongTime.innerText = "0:00"
const currentSongDuration = document.getElementById("current-song-duration"); //
currentSongDuration.innerText = songsList[songCount].duration;
const songProgress = document.getElementById("song-progress"); //
const currentSongTitle = document.getElementById("current-song-title"); //
currentSongTitle.innerText = songsList[songCount].title;
const currentSongArtist = document.getElementById("current-song-artist"); //
currentSongArtist.innerText = songsList[songCount].artist;




//event-listeners

playThisSong.forEach((song, i) => {
    song.addEventListener("click", () => {
        if (i === songCount) {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterPlay.innerText = "pause";
                beatVideo.style.opacity = "1";
                playThisSong[songCount].innerText = "pause";
            }
            else {
                audioElement.pause();
                masterPlay.innerText = "play_arrow";
                beatVideo.style.opacity = "0";
                playThisSong[songCount].innerText = "play_arrow";

            }
        }
        else {
            playThisSong[songCount].innerText = "play_arrow";
            songCount = i;
            audioElement.src = songsList[songCount].url;
            audioElement.play();
            masterPlay.innerText = "pause";
            beatVideo.style.opacity = "1";
            playThisSong[songCount].innerText = "pause";
            currentSongTitle.innerText = songsList[songCount].title;
            currentSongArtist.innerText = songsList[songCount].artist;
            currentSongDuration.innerText = songsList[songCount].duration;
        }
    })
})

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.innerText = "pause";
        beatVideo.style.opacity = "1";
        playThisSong[songCount].innerText = "pause";
    }
    else {
        audioElement.pause();
        masterPlay.innerText = "play_arrow";
        beatVideo.style.opacity = "0";
        playThisSong[songCount].innerText = "play_arrow";

    }
})

songProgress.addEventListener("change", () => {
    audioElement.currentTime = (songProgress.value * audioElement.duration) / 100;
})


audioElement.addEventListener("timeupdate", () => {
    songProgress.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    currentSongTime.innerText = parseInt(audioElement.currentTime / 60) + ":" + parseInt(audioElement.currentTime % 60);
    // currentSongDuration.innerText = parseInt(audioElement.duration/60)+ ":"+ parseInt(audioElement.duration%60);
    if (audioElement.currentTime === audioElement.duration) {
        if (isRepeat === true) {
            songCount = songCount + 1 - 1;
            audioElement.src = songsList[songCount].url;
            audioElement.play();
            currentSongTitle.innerText = songsList[songCount].title;
            currentSongArtist.innerText = songsList[songCount].artist;
            masterPlay.innerText = "pause";
            beatVideo.style.opacity = "1";
            playThisSong[songCount].innerText = "pause";

        }
        else {
            if (isShuffle === true) {
                playThisSong[songCount].innerText = "play_arrow";
                songCount = Math.floor(Math.random() * songsList.length);
                audioElement.src = songsList[songCount].url;
                audioElement.play();
                currentSongTitle.innerText = songsList[songCount].title;
                currentSongArtist.innerText = songsList[songCount].artist;
                currentSongDuration.innerText = songsList[songCount].duration;
                masterPlay.innerText = "pause";
                beatVideo.style.opacity = "1";
                playThisSong[songCount].innerText = "pause";

            }
            else {
                if (songCount === (songsList.length - 1)) {
                    playThisSong[songCount].innerText = "play_arrow";
                    songCount = 0;
                    audioElement.src = songsList[songCount].url;
                    audioElement.play();
                    currentSongTitle.innerText = songsList[songCount].title;
                    currentSongArtist.innerText = songsList[songCount].artist;
                    currentSongDuration.innerText = songsList[songCount].duration;
                    masterPlay.innerText = "pause";
                    beatVideo.style.opacity = "1";
                    playThisSong[songCount].innerText = "pause";
                }
                else {
                    playThisSong[songCount].innerText = "play_arrow";
                    songCount++;
                    audioElement.src = songsList[songCount].url;
                    audioElement.play();
                    currentSongTitle.innerText = songsList[songCount].title;
                    currentSongArtist.innerText = songsList[songCount].artist;
                    currentSongDuration.innerText = songsList[songCount].duration;
                    masterPlay.innerText = "pause";
                    beatVideo.style.opacity = "1";
                    playThisSong[songCount].innerText = "pause";
                }

            }
        }
    }
})

nextBtn.addEventListener("click", () => {
    if (songCount < (songsList.length - 1)) {
        playThisSong[songCount].innerText = "play_arrow";
        songCount++;
        audioElement.src = songsList[songCount].url;
        audioElement.play();
        currentSongTitle.innerText = songsList[songCount].title;
        currentSongArtist.innerText = songsList[songCount].artist;
        currentSongDuration.innerText = songsList[songCount].duration;
        masterPlay.innerText = "pause";
        beatVideo.style.opacity = "1";
        playThisSong[songCount].innerText = "pause";

    }
    else {
        playThisSong[songCount].innerText = "play_arrow";
        songCount = 0;
        audioElement.src = songsList[songCount].url;
        audioElement.play();
        currentSongTitle.innerText = songsList[songCount].title;
        currentSongArtist.innerText = songsList[songCount].artist;
        currentSongDuration.innerText = songsList[songCount].duration;
        masterPlay.innerText = "pause";
        beatVideo.style.opacity = "1";
        playThisSong[songCount].innerText = "pause";

    }
})

previousBtn.addEventListener("click", () => {
    if (songCount <= 0) {
        playThisSong[songCount].innerText = "play_arrow";
        songCount = songsList.length - 1;
        audioElement.src = songsList[songCount].url;
        audioElement.play();
        currentSongTitle.innerText = songsList[songCount].title;
        currentSongArtist.innerText = songsList[songCount].artist;
        currentSongDuration.innerText = songsList[songCount].duration;
        masterPlay.innerText = "pause";
        beatVideo.style.opacity = "1";
        playThisSong[songCount].innerText = "pause";
    }
    else {
        playThisSong[songCount].innerText = "play_arrow";
        songCount--;
        audioElement.src = songsList[songCount].url;
        audioElement.play();
        currentSongTitle.innerText = songsList[songCount].title;
        currentSongArtist.innerText = songsList[songCount].artist;
        currentSongDuration.innerText = songsList[songCount].duration;
        masterPlay.innerText = "pause";
        beatVideo.style.opacity = "1";
        playThisSong[songCount].innerText = "pause";

    }
})

shuffleBtn.addEventListener("click", () => {
    if (isShuffle === false) {
        isShuffle = true;
        shuffleBtn.innerText = "shuffle_on";
    }
    else {
        isShuffle = false;
        shuffleBtn.innerText = "shuffle";
    }
})

repeatBtn.addEventListener("click", () => {
    if (isRepeat === false) {
        isRepeat = true;
        repeatBtn.innerText = "repeat_on";
    }
    else {
        isRepeat = false;
        repeatBtn.innerText = "repeat";
    }
})


