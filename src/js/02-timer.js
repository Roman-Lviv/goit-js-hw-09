import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

datetimePicker.flatpickr({
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.selectedDates[0]);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    return;
  }

  countdownInterval = setInterval(() => {
    const time = convertMs(timeDifference);
    daysValue.textContent = addLeadingZero(time.days);
    hoursValue.textContent = addLeadingZero(time.hours);
    minutesValue.textContent = addLeadingZero(time.minutes);
    secondsValue.textContent = addLeadingZero(time.seconds);

    timeDifference -= 1000;

    if (timeDifference < 0) {
      clearInterval(countdownInterval);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
    }
  }, 1000);
});

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
