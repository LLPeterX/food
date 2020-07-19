const thanks = require('./thanks');
function form() {
const forms = document.querySelectorAll('form');
  // массив, в котором данные  ходе выполнени запроса:
  let message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы с вами свяжемся.",
    failure: "Извините, произошла ошибка"
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  // функция отправки фопрмы обратной сваязи на сервер.
  // @param url - URL запроса
  // @param data - данные формы
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: data
    });
    return await res.json(); // ответ - promise!
  };

  // функция обработки и отправки данных формы обратной связи
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // div для сообщения о результате в нижней части формы
      const statusMessage = document.createElement('div');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = "display: 'block'; margin: 0 auto;";
      setTimeout(() => statusMessage.remove(), 5000);
      form.insertAdjacentElement('afterend', statusMessage); // всё равно не работает

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(response => {
          console.log('SERVER RESP:', response);
          thanks.showThanksModal(message.success); // Окно "спасибо", закроется через 4 сек.
          statusMessage.remove(); // удаляем спиннер со статусом под формой
        })
        .catch(() => {
          thanks.showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

    }); // event listener
  } // bindPostData()
}

module.exports = form;