import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;
let TIMERDEDLINE = 0;

datetimePicker.flatpickr({
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Будь ласка, виберіть дату у майбутньому');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
    TIMERDEDLINE = selectedDates[0];
  },
});

startButton.addEventListener('click', () => {
  if (!countdownInterval) {
    countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = TIMERDEDLINE - currentDate;

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        updateCountdown(0);
        Notiflix.Notify.success('Час вийшов!');
        return;
      }

      updateCountdown(timeDifference);
    }, 1000);
  }
});

function updateCountdown(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
