import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputElement: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  daysElement: document.querySelector('span[data-days]'),
  hoursElement: document.querySelector('span[data-hours]'),
  minutesElement: document.querySelector('span[data-minutes]'),
  secondsElement: document.querySelector('span[data-seconds]'),
};

refs.startButton.disabled = true;

class Timer {
  constructor() {
    this.isActive = false;
  }

  start(unixTime) {
    if (this.isActive) {
      return;
    }

    setInterval(() => {
      updateTimerMarkup(convertMs(unixTime - Date.now()));
    }, 1000);

    this.isActive = true;
  }
}

const timer = new Timer();

let epochTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    epochTime = selectedDates[0].getTime();

    if (epochTime < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startButton.disabled = false;
  },
};

flatpickr(refs.inputElement, options);

const onStartButtonClick = () => {
  timer.start(epochTime);
};

refs.startButton.addEventListener('click', onStartButtonClick);

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function updateTimerMarkup({ days, hours, minutes, seconds }) {
  refs.daysElement.textContent = addLeadingZero(String(days));
  refs.hoursElement.textContent = addLeadingZero(String(hours));
  refs.minutesElement.textContent = addLeadingZero(String(minutes));
  refs.secondsElement.textContent = addLeadingZero(String(seconds));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
