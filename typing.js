let ctx = document.querySelector("#canvas").getContext("2d");
ctx.canvas.width = 1000;
ctx.canvas.height = 500;
var wpm = 0;
var wpmCounterStart = 0;
var wpmCounterEnd = 0;
let player = {
  width: 60,
  height: 30,
  x: 100,
  y: 250,
  score: 0,
  shot: false,
};
let pbullet = {
  width: 10,
  height: 5,
  x: -100,
  y: 260,
};
let word = {
  width: 150,
  height: 40,
  x: 900,
  y: 280,
};
//possilbe words
let wordList = [
  "he",
  "she",
  "we",
  "dog",
  "play",
  "cat",
  "see",
  "bed",
  "said",
  "car",
  "tolerant",
  "houseplant",
  "cottage",
];
//the word that is displayed
let currentWord =
  wordList[Math.floor(Math.random() * wordList.length - 1)]; //wordList[Math.floor(Math.random()*wordList.length)];
//wordList of currentWord word stored
let allwordLists = [];
//typing
let typing = currentWord.split("");
allwordLists.push(currentWord);

function pressed(e) {
  var hit = String.fromCharCode(e.which);
  hit = hit.toLowerCase(hit);
  if (hit == typing[0]) {
    typing.shift();
    player.shot = true;
    pbullet.x = player.x + player.width;
  }
}

function newwordList() {
  wpmCounterEnd = Date.now();
  wpm = Math.round(60 / ((wpmCounterEnd - wpmCounterStart) / 1000));
  let currentWord = wordList[Math.floor(Math.random() * wordList.length)]; //wordList[Math.floor(Math.random()*wordList.length)];
  typing = currentWord.split("");
  allwordLists = [];
  allwordLists.push(currentWord);
}

function update() {
  if (typing.length == 0) {
    //start another word
    newwordList();
    //timer
    wpmCounterStart = Date.now();
    player.score += wpm;
    word.x = 900;
  }
  //word movement
  if (word.x + word.radius <= player.x) {
    word.x += 2;
  }
  //move words towards player
  if (word.x >= player.x + player.width) {
    word.x -= 5;
  }
  //move projectile
  if (player.shot == true) {
    pbullet.x += 40;
  }
  //projectile hits words
  if (pbullet.x > word.x) {
    pbullet.x = -100;
    player.shot = false;
  }
  if (word.x < player.x + player.width) {
    player.score = 0;
  }
  //fill things on canvas
  //background
  ctx.fillStyle = "#323232";
  ctx.fillRect(0, 0, 1000, 500);
  //player position
  ctx.fillStyle = "#0aacff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  //projectile
  ctx.fillStyle = "#ff2700";
  ctx.fillRect(pbullet.x, pbullet.y, pbullet.width, pbullet.height);
  //words
  ctx.fillStyle = "#ffffff";
  //moving words
  ctx.font = "40px arial";
  ctx.fillText(typing.join(""), word.x, word.y);
  //stats
  ctx.font = "50px arial";
  ctx.fillText("WPM: " + wpm, 400, 100);
  ctx.font = "25px arial";
  ctx.fillText("SCORE: " + player.score, 800, 490);
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
window.addEventListener("keydown", pressed);
