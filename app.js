var music = new Audio("./music.mp3");
var score = 0;
var HighScore = 0;
var clutter = "";
for (var z = 0; z < 1225; z++) {
  clutter += `<div data-num="${2 * z}" class="square" id="s${2 * z}"></div>
  <div data-num="${2 * z + 1}" class="square2" id="s${2 * z + 1}"></div>`;
}
document.querySelector("#board").innerHTML = clutter;

function backcolor(elem, dura) {
  setTimeout(() => {
    console.log(elem.dataset.num);
    elem.style.backgroundColor = "rgb(96, 207, 255)";
  }, 1000 + dura * 1000);
}
function gameOver() {
  document.querySelector("#mainscore").textContent = `${score}`;
  document.querySelector("#gameover").style.display = "flex";
}
function snak() {
  var gameover = new Audio("./gameover.mp3");
  var move = new Audio("./move.mp3");
  var food = new Audio("./food.mp3");
  music.loop = true;
  var len = [{ x: 0 }];
  var curx = 35;
  var cury = 15;
  var velx = 0;
  var vely = 0;
  var nxtpos = 0;
  var foodx = Math.floor(Math.random() * (35.5 - 1) + 1);
  var foody = Math.floor(Math.random() * (49.5 - 1) + 1);
  document.querySelector(`#s${foodx * foody}`).style.backgroundColor = "green";
  window.addEventListener("click", (eve) => {
    console.log(eve.target);
    switch (eve.target.id) {
      case "left":
        if (velx === 0) {
          move.play();
          velx = -1;
          vely = 0;
        }
        break;
      case "up":
        if (vely === 0) {
          move.play();
          velx = 0;
          vely = -2;
        }
        break;
      case "right":
        if (velx === 0) {
          move.play();
          velx = 1;
          vely = 0;
        }
        break;
      case "down":
        if (vely != -2) {
          move.play();
          velx = 0;
          vely = 2;
        }
        break;
    }
  });
  var ispaused = false;

  var funcy = setInterval(() => {
    if (HighScore <= score) {
      HighScore = score;
    }
    if (!ispaused) {
      try {
        if (window.innerHeight < window.innerWidth) {
          document.querySelector(
            `#s${len[len.length - 1].x}`
          ).style.backgroundColor = "rgb(96, 207, 255)";
          for (var k = len.length - 1; k > 0; k--) {
            len[k].x = len[k - 1].x;
          }
          cury += vely;
          nxtpos += velx;
          document.querySelector(
            `#s${curx * cury + nxtpos}`
          ).style.backgroundColor = "rgb(99, 99, 99)";
          len[0].x = curx * cury + nxtpos;
          len.forEach((eve) => {
            document.querySelector(`#s${eve.x}`).style.backgroundColor =
              "rgb(99, 99, 99)";
          });

          document.querySelector("#score").textContent = `Score : ${score}`;
          document.querySelector(
            "#highScore"
          ).textContent = `HighScore : ${HighScore}`;
          document.querySelector(`#s${foodx * foody}`).style.backgroundColor =
            "green";
          if (len[0].x === foodx * foody) {
            food.play();
            len.push({ x: 0 });
            foodx = Math.floor(Math.random() * 35.5);
            foody = Math.floor(Math.random() * 49.5);
            score++;
          }
          if (nxtpos < -35 && velx === -1) {
            gameover.play();
            gameOver();
            throw "Game Over";
          }
          if (nxtpos > 34 && velx === 1) {
            gameover.play();
            gameOver();
            throw "Game Over";
          }
        } else {
          alert("Rotate your phone to play game !");
        }
      } catch (e) {
        gameover.play();
        clearInterval(funcy);
        gameOver();
        throw "Game Over";
      }
    }
  }, 100);
  function pausefun() {
    if (ispaused) {
      ispaused = false;
    }
  }
  window.onkeydown = function (event) {
    music.play();
    switch (event.keyCode) {
      case 32:
        ispaused = !ispaused;
        break;
      case 37:
      case 65:
      case 100:
        pausefun();
        if (velx === 0) {
          move.play();
          velx = -1;
          vely = 0;
        }
        break;
      case 38:
      case 87:
      case 104:
        pausefun();
        if (vely === 0) {
          move.play();
          velx = 0;
          vely = -2;
        }
        break;
      case 39:
      case 68:
      case 102:
        pausefun();
        if (velx === 0) {
          move.play();
          velx = 1;
          vely = 0;
        }
        break;
      case 40:
      case 83:
      case 98:
        pausefun();
        if (vely != -2) {
          move.play();
          velx = 0;
          vely = 2;
        }
        break;
    }
  };
}
snak();
document.querySelector("#restart").addEventListener("click", () => {
  music.pause();
  score = 0;
  for (var z = 0; z < 1225; z++) {
    clutter += `<div data-num="${2 * z}" class="square" id="s${2 * z}"></div>
    <div data-num="${2 * z + 1}" class="square2" id="s${2 * z + 1}"></div>`;
  }
  document.querySelector("#board").innerHTML = clutter;
  document.querySelector("#gameover").style.display = "none ";
  snak();
});
