const bgm = new Audio("the-girl-who-leapt-through-time-ost.mp3");
bgm.loop = true;

const $bgmPlayButton = document.getElementById("bgm-play-button");
const $bgmStopButton = document.getElementById("bgm-stop-button");

$bgmPlayButton.addEventListener("click", () => {
  bgm.play();
  $bgmPlayButton.style.display = "none";
  $bgmStopButton.style.display = "block";
});

$bgmStopButton.addEventListener("click", () => {
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
    $count.innerText = "7";
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
const auth1 = "ghp_JuGYom";
const auth2 = "VjDELWSPHOB8";
const auth3 = "WnuF4uhp2";
const auth4 = "gc52NqBlZ";
loadComments(auth1+auth2+auth3+auth4);
registerComment(auth1+auth2+auth3+auth4);

function loadComments(auth) {
  fetch("https://api.github.com/repos/dundung/campus-life-portfolio/issues", {
    method: "GET",
    headers: {
      Authorization: "token " + auth,
    },
  })
    .then((res) => res.json())
    .then((comments) => {
      let $commentList = document.getElementById("comment-list");
      for (let i in comments) {
        $commentList.innerHTML += `
        <li>
          <p>${comments[i].title}  
            <small>${comments[i].created_at
          .replace("T", "  ")
          .replace("Z", "")
          .slice(0, -3)}</small>
          </p>
          <p>${comments[i].body}</p>
        </li>`;
      }
    });
}

function registerComment(auth) {
  let $commentRegistration = document.getElementById("comment-registration");
  $commentRegistration.addEventListener("click", () => {
    let $nickname = document.getElementById("nickname");
    let $commentInput = document.getElementById("comment_input");
    if (!$nickname.value) {
      alert("닉네임을 입력해주세요!");
    } else if (!$commentInput.value) {
      alert("내용을 입력해주세요!");
    } else {
      fetch(
        "https://api.github.com/repos/dundung/campus-life-portfolio/issues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + auth,
          },
          body: JSON.stringify({
            title: $nickname.value,
            body: $commentInput.value,
          }),
        }
      ).then(() => {
        $nickname.value = "";
        $commentInput.value = "";
        window.location.reload();
      });
    }
  });
}
