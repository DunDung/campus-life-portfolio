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
const githubToken = "ghp_FbhzB9Og" + "MN5DRClr70I" + "vPULcMwdc" + "JR2MXiOb";
loadComments(githubToken);
registerComment(githubToken);

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
        sendMail($nickname.value, $commentInput.value);
        $nickname.value = "";
        $commentInput.value = "";
      });
    }
  });
}

function sendMail(nickname, comment) {
  let templateParams = {
    nickname: nickname,
    comment: comment,
  };
  emailjs
    .send("service_2syktss", "template_4nk0rnw", templateParams)
    .then(() => window.location.reload());
}
let $time = document.getElementById("time");
let $date = document.getElementById("date");

function getTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  $date.innerText = year + "-" + month + "-" + date;

  let hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  let amOrPm = (hour < 12) ? "오전" : "오후";
  hour = (hour === 12) ? hour : hour % 12;
  $time.innerText = amOrPm + " " + hour + ":" + minute + ":" + second;
}
setInterval(getTime, 1000);

