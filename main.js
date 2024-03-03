const audio = document.querySelector(".audio");
const source = audio.src;
const playbtn = document.querySelector(".play");
const control = document.querySelector("#control");
const prgbar = document.querySelector("#scrlbar");
const menuBtn = document.querySelector(".menuBtn");
const menu = document.querySelector(".songMenu");
const cross = document.querySelector(".cross");
const songList = document.querySelector("songList");
const songName = document.querySelector(".songName");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");
const songInfo = document.querySelector(".songInfo");
const image = document.querySelector(".img");

let songs = [
  "Adernaline",
  "Distant",
  "Drift Away",
  "One Last Time",
  "We Made It",
  "Without You",
];
let currentIndex = 0;
songInfo.innerText = songs[currentIndex];

let playing = false;
let play = () => {
  audio.play();
  playing = true;
  updateControlIcon();
};
let pause = () => {
  audio.pause();
  playing = false;
  updateControlIcon();
};

playbtn.addEventListener("click", () => {
  if (playing) {
    pause();
  } else {
    play();
  }
});

function updateControlIcon() {
  if (playing) {
    control.classList.remove("fa-play");
    control.classList.add("fa-pause");
    image.classList.add("rotate");
  } else {
    control.classList.add("fa-play");
    control.classList.remove("fa-pause");
    image.classList.remove("rotate");
  }
}
audio.onloadedmetadata = function () {
  prgbar.max = audio.duration;
  prgbar.value = audio.currentTime;
};

if (audio.play()) {
  setInterval(() => {
    prgbar.value = audio.currentTime;
  }, 500);
}

prgbar.addEventListener("input", () => {
  audio.currentTime = prgbar.value;
  if (playing) {
    play();
  }
});

menuBtn.addEventListener("click", () => {
  menu.style.visibility = "visible";
});
cross.addEventListener("click", () => {
  menu.style.visibility = "hidden";
});

function createList(array) {
  var ul = document.createElement("ul");

  array.forEach(function (item) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = item;
    button.className = "songName";
    li.appendChild(button);
    ul.appendChild(li);
  });

  return ul;
}
var myDiv = document.querySelector(".songList");

myDiv.appendChild(createList(songs));

myDiv.addEventListener("click", function (event) {
  var clickedButton = event.target.closest(".songName");

  if (clickedButton) {
    // Get the index of the clicked button among its siblings
    var buttons = Array.from(this.querySelectorAll(".songName"));
    currentIndex = buttons.indexOf(clickedButton);

    // Now 'currentIndex' holds the index of the clicked button
    console.log("Clicked button index:", currentIndex);
  }
  if (event.target.classList.contains("songName")) {
    audio.src = "/Music/" + event.target.innerText + ".mp3";
  }
  songInfo.innerText = songs[currentIndex];
  showImage();
  play();
});

forward.addEventListener("click", () => {
  if (currentIndex == songs.length - 1) {
    audio.src = "/Music/" + songs[0] + ".mp3";
    play();

    currentIndex = 0;
    songInfo.innerText = songs[currentIndex];
    showImage();
  } else {
    currentIndex = currentIndex + 1;

    audio.src = "/Music/" + songs[currentIndex] + ".mp3";
    songInfo.innerText = songs[currentIndex];
    showImage();
    play();
  }
});

backward.addEventListener("click", () => {
  if (currentIndex == 0) {
    audio.src = "/Music/" + songs[songs.length - 1] + ".mp3";
    play();

    currentIndex = songs.length - 1;
    songInfo.innerText = songs[currentIndex];
    showImage();
  } else {
    currentIndex = currentIndex - 1;

    audio.src = "/Music/" + songs[currentIndex] + ".mp3";
    songInfo.innerText = songs[currentIndex];
    showImage();
    play();
  }
});
songInfo.innerText = songs[currentIndex];

function showImage() {
  image.src = "/Img/" + songs[currentIndex] + ".jpeg";
}
