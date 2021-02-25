const video = document.getElementById("video");
const play = document.getElementById("play");
const Stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// 功能

// play /pause，這裡的paused是屬性，play是方法
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

//update timestamp and progress
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  let wholeTime = Math.floor(video.currentTime);

  if (wholeTime < 60) {
    secs = `0${wholeTime}`.slice(-2);
  } else if (wholeTime >= 60) {
    secs = `0${wholeTime % 60}`.slice(-2);
  }

  timestamp.innerText = `${mins}:${secs}`;
}

// stop
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//set video time to progress
function setVideoProgress() {
  video.currentTime = (progress.value / 100) * video.duration;
  //   console.log(video.currentTime);
}

//事件
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
Stop.addEventListener("click", stopVideo);

progress.addEventListener("click", setVideoProgress);
