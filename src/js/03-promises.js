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

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = Number(this.querySelector('[name="delay"]').value);
  const step = Number(this.querySelector('[name="step"]').value);
  const amount = Number(this.querySelector('[name="amount"]').value);

  let position = 1;

  function createPromises() {
    if (position <= amount) {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        })
        .finally(() => {
          position++;
          delay += step;
          createPromises();
        });
    }
  }

  createPromises();
});
