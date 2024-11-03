console.log("Начало прокрутки страницы...");

function startButtonClicking() {
  let elements = document.querySelectorAll("#card-front-contents");
  let secondButtons = [];

  elements.forEach((element) => {
    let buttons = element.querySelectorAll("button");
    if (buttons.length >= 2) {
      secondButtons.push(buttons[1]);
    }
  });

  let currentIndex = 0;

  let interval = setInterval(() => {
    const divElement = document.querySelector("#headlessui-popover-button-\\:rc\\:");
    const spanElement = divElement ? divElement.querySelector("span.ml-1") : null;

    if (spanElement && parseInt(spanElement.title) < 10) {
      console.log("Закончились капли");
      scrollToTop();
      clearInterval(interval);
      return;
    }

    if (currentIndex >= secondButtons.length) {
      clearInterval(interval);
      console.log("All Secured");
      scrollToTop();
      return;
    }

    secondButtons[currentIndex].click();
    console.log(`Secured ${currentIndex + 1} / ${secondButtons.length}`);
    currentIndex++;
  }, 2000);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function startCountdown() {
  let countdown = 3;
  
  let countdownInterval = setInterval(() => {
    console.log(`Жмаем через ${countdown} сек...`);
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      console.log("Секьюрим их полностью...");
      startButtonClicking();
    }
  }, 1000);
}

async function scrollToBottom() {
  let previousHeight = 0;

  while (true) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Крутим...");

    const currentHeight = document.body.scrollHeight;
    if (currentHeight === previousHeight) {
      break;
    }
    previousHeight = currentHeight;
  }

  console.log("Прокрутка завершена.");
  startCountdown();
}

scrollToBottom();