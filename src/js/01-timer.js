import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();

    if (selectedDates[0] <= now) {
      iziToast.error({
        title: 'Geçersiz Tarih',
        message: 'Lütfen ileri bir tarih seçin!',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      selectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer(0); // Tüm sayacı sıfırla

      iziToast.success({
        title: 'Süre Doldu',
        message: 'Geri sayım tamamlandı!',
        position: 'topRight',
      });

      return;
    }

    updateTimer(diff); // Süreyi güncelle
  }, 1000);
});

function updateTimer(ms) {
  const { days: d, hours: h, minutes: m, seconds: s } = convertMs(ms);

  days.textContent = addLeadingZero(d);
  hours.textContent = addLeadingZero(h);
  minutes.textContent = addLeadingZero(m);
  seconds.textContent = addLeadingZero(s);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
