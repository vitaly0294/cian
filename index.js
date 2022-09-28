'use strict';
const button = document.querySelector('.button');

const data = [
  {
    id: 0,
    check: true,
    appointment: 'прямой',
    date: '24.09.2022',
    operator: 'Мегафон. (Новосибирская область)',
    title: 'work',
  }
];

const getCapitalizeStr = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getPhoneNumber = (str) => {
  let newStr = '';
  for (let char of str) {
    newStr += char.replace(/[^0-9]/, '');
  }
  return newStr;
}

const createElement = (item) => {
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `
    <div class="check ${item.check ? 'check_passed': ''}"></div>
    <div class="input-wrap">
      <label class="label top" for="input">
        <div>${getCapitalizeStr(item.appointment)}</div>
        <div>Актуально: ${item.date} г.</div>
      </label>
      <input id="input" type="text" class="input">
      <label class="label bottom" for="input">${item.operator}</label>
    </div>
    <select name="select" id="select" class="select">
      <option value="work" ${item.title === 'work'? 'selected' : ''}>Рабочий</option>
      <option value="mobile" ${item.title === 'mobile'? 'selected' : ''}>Мобильный</option>
    </select>
  `;
  return li;
}

const clearList = (list) => list.textContent = '';

const renderList = (data) => {
  const list = document.querySelector('.list');
  clearList(list);

  if (!Array.isArray(data)) {
    const li = document.createElement('li');
    list.append(li);
    li.textContent = 'Нет информации!'
  }

  data.map((item) => {
    list.append(createElement(item));
  });
}

const addElement = (length) => {
  const newElement = {
    id: length,
    check: true,
    appointment: 'прямой',
    date: '01.01.2022',
    operator: 'Мегафон. (Новосибирская область)',
    title: 'work',
  }

  data.push(newElement);
}

const getData = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

getData()
  .then(() => button.removeAttribute('disabled'))
  .then(() => renderList(data));

const addEventHendler = () => {
  document.addEventListener('change', e => {
    const event = e.target;

    if (event.matches('.input') && event.value.trim() !== '') {
      event.value = getPhoneNumber(event.value);
    }
    
  });

  document.addEventListener('click', e => {
    e.preventDefault();
    const event = e.target;

    if (event.matches('.button') && data.length < 3) {
      addElement(data.length);
      renderList(data);

      if (data.length > 2) {
        button.setAttribute("disabled", "disabled");
      }
    }
  });
}

addEventHendler();
