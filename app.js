let gameStarted = false;
const colors = ["red", "orange", "green", "blue"];
let index = 0;
const sequenceRandomlySelectedColor = [];

const addAnimationToSelectedColor = (selectedButton) => {
  selectedButton.classList.add("elementToFadeInAndOut");
  setTimeout(() => {
    selectedButton.classList.remove("elementToFadeInAndOut");
  }, 400);
};

const generateRandomColor = () => {
  const NUMBER_COLORS = 4;
  const indexRandomlySelectedColor = Math.floor(Math.random() * NUMBER_COLORS);
  const randomlySelectedColor = colors[indexRandomlySelectedColor];
  const selectedButton = document.getElementById(randomlySelectedColor);
  sequenceRandomlySelectedColor.push(randomlySelectedColor);
  addAnimationToSelectedColor(selectedButton);
  console.log(selectedButton);
};

const startTheGame = () => {
  gameStarted = true;
  const header = document.getElementsByTagName("h1")[0];
  header.textContent = "Let the game begin, Level 1";
  generateRandomColor();
};

const userWonTheLevel = (newLevelNumber) => {
  const header = document.getElementsByTagName("h1")[0];
  header.textContent = `Let the game begin, Level ${newLevelNumber}`;
  generateRandomColor();
};

const userLostTheGame = () => {
  let audio = new Audio("sounds/wrong.mp3");
  audio.play();
  const header = document.getElementsByTagName("h1")[0];
  header.textContent = "YOU LOST :(";
  [...document.getElementsByTagName("button")].forEach((button) => {
    button.disabled = true;
  });
};

document.addEventListener("keypress", () => {
  if (!gameStarted) {
    startTheGame();
  }
});

[...document.getElementsByTagName("button")].forEach((button) => {
  button.addEventListener("click", () => {
    if (gameStarted) {
      const selectedColorByUser = button.id;
      if (selectedColorByUser === sequenceRandomlySelectedColor[index]) {
        new Audio(`sounds/${selectedColorByUser}.mp3`).play();
        index += 1;
        if (index === sequenceRandomlySelectedColor.length) {
          userWonTheLevel(index + 1);
          index = 0;
        }
      } else {
        userLostTheGame();
      }
    }
  });
})();
