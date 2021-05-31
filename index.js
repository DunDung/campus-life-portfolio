const bgm = new Audio("the-girl-who-leapt-through-time-ost.mp3");
bgm.loop = true;

const $bgmPlayButton = document.getElementById("bgm-play-button");
const $bgmStopButton = document.getElementById("bgm-stop-button");

$bgmPlayButton.addEventListener("click",  () => {
  bgm.play();
  $bgmPlayButton.style.display = "none";
  $bgmStopButton.style.display = "block";
});

$bgmStopButton.addEventListener("click",  () => {
  bgm.pause();
  $bgmStopButton.style.display = "none";
  $bgmPlayButton.style.display = "block";
});

const likeKey = "like-count";
const disLikeKey = "dis-like-count";
let $likeTable = document.getElementById("like-table");
let $likeImage = $likeTable.getElementsByTagName("img")[0];
let $likeCount = $likeTable.getElementsByTagName("h5")[0];
let $disLikeTable = document.getElementById("dis-like-table");
let $disLikeImage = $disLikeTable.getElementsByTagName("img")[0];
let $disLikeCount = $disLikeTable.getElementsByTagName("h5")[0];


initCount(likeKey, $likeCount);
initCount(disLikeKey, $disLikeCount);
addEventIncreaseCount(likeKey, $likeImage, $likeCount);
addEventIncreaseCount(disLikeKey, $disLikeImage, $disLikeCount);

function initCount(localStorageKey, $count) {
  let item = localStorage.getItem(localStorageKey);
  if (!item) {
    $count.innerText = "7"
    localStorage.setItem(localStorageKey, "7");
  } else {
    $count.innerText = item;
  }
}

function addEventIncreaseCount(localStorageKey, $image, $count) {
  $image.addEventListener("click", () => {
    let increasedCount = eval($count.innerText + "+ 1");
    $count.innerText = increasedCount;
    localStorage.setItem(localStorageKey, increasedCount);
  });
}
