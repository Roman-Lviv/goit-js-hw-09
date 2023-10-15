const form = document.querySelector('.form');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  let delay = Number(this.querySelector('[name="delay"]').value);
  const step = Number(this.querySelector('[name="step"]').value);
  const amount = Number(this.querySelector('[name="amount"]').value);

  for (let position = 1; position <= amount; position++) {
    try {
      const result = await createPromise(position, delay);
      console.log(
        `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
      );
    } catch (error) {
      console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }

    delay += step;
  }
});
