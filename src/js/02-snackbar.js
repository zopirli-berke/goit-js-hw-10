import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createDelayedPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  form.reset(); // Formu sıfırla
});

function createDelayedPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
