const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

class ColorSwitcher {
  constructor() {
    this.interval_time = 1000;
    this.intervalId = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, this.interval_time);

    this.isActive = true;
  }

  stop() {
    clearInterval(this.intervalId);

    this.isActive = false;
  }
}

const timer = new ColorSwitcher();

const onStartButtonClick = () => {
  timer.start();
  refs.startButton.disabled = true;
};

const onStopButtonClick = () => {
  timer.stop();
  refs.startButton.disabled = false;
};

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
