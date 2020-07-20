import * as axios from 'axios';

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

const getResource = async (url) =>  {
  return axios.get(url);
};

export { postData };
export { getResource };