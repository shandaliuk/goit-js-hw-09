import Notiflix from 'notiflix';

const refs = {
  formElement: document.querySelector('.form'),
};

const onFormSubmit = event => {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 1, j = delayValue; i <= amountValue; i += 1, j += stepValue) {
    createPromise(i, j)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
};

refs.formElement.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
