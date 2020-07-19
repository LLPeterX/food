function modal() {
const modalTriggers = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal');

  // функции скрытия и показа модального  окна
  function closeModalWindow() {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
  }
  function showModalWindow() {
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // вешаем обработчики собыйтий открытия окна
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', showModalWindow);
  });

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
      closeModalWindow();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains('show')) {
      closeModalWindow();
    }
  });

  function showModalWindowOnScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModalWindow();
      window.removeEventListener('scroll', showModalWindowOnScroll);
    }
  }
  window.addEventListener('scroll', showModalWindowOnScroll);

 
}

module.exports = modal;