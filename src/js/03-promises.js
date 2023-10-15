import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  let currentDelay = Number(this.querySelector('[name="delay"]').value);
  const step = Number(this.querySelector('[name="step"]').value);
  const amount = Number(this.querySelector('[name="amount"]').value);

  for (let position = 1; position <= amount; position++) {
    try {
      const result = await createPromise(position, currentDelay);
      notiflix.Notify.Success(
        `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
      );
    } catch (error) {
      notiflix.Notify.Failure(
        `❌ Rejected promise ${error.position} in ${error.delay}ms`
      );
    }

    currentDelay += step;
  }
});
