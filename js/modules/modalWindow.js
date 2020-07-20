export function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide');
  document.body.style.overflow = '';
}
export function showModalWindow(modalSelector, timerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('hide');
  modalWindow.classList.add('show');
  document.body.style.overflow = 'hidden';
  if(timerId) {
    clearInterval(timerId);
  }
}


function modal(triggerSelector, modalSelector,timerId) {
const modalTriggers = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector);

  // функции скрытия и показа модального  окна
  // вешаем обработчики собыйтий открытия окна
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => showModalWindow(modalSelector,timerId));
  });

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
      closeModalWindow(modalSelector);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains('show')) {
      closeModalWindow(modalSelector);
    }
  });

  function showModalWindowOnScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModalWindow(modalSelector,timerId);
      window.removeEventListener('scroll', showModalWindowOnScroll);
    }
  }
  window.addEventListener('scroll', showModalWindowOnScroll);

 
}

export default  modal;