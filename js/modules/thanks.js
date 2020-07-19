const modal = require('./modalWindow');
function thanks() {
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    // скрываем предыдущий контент
    prevModalDialog.classList.remove('show');
    prevModalDialog.classList.add('hide');
    modal.showModalWindow();
    // вручную создаем новый div
    const thanksModal = document.createElement('div');
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
  <div class="modal__content">
    <div data-close class="modal__close">&times;</div>
    <div class="modal__title">${message}</div>
  </div>
  `;
    const parent = document.querySelector('.modal');
    parent.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      modal.closeModalWindow();
    }, 4000);
  } // end thanksModal
}

module.exports = thanks;