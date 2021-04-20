const bgm = new Audio("the-girl-who-leapt-through-time-ost.mp3");
bgm.loop = true;

const bgmPlayButton = document.getElementById("bgm-play-button");
const bgmStopButton = document.getElementById("bgm-stop-button");

bgmPlayButton.addEventListener("click", function () {
  bgm.play();
  bgmPlayButton.style.display = "none";
  bgmStopButton.style.display = "block";
});

bgmStopButton.addEventListener("click", function () {
  bgm.pause();
  bgmStopButton.style.display = "none";
  bgmPlayButton.style.display = "block";
});
