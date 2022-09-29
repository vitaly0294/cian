'use strict';
const button = document.querySelector('.button');

const data = [
  {
    id: 0,
    check: true,
    appointment: 'прямой',
    date: '24.09.2022',
    operator: 'мегафон',
    region: 'новосибирская область',
    title: 'work',
    value: '',
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

const createListItem = ({
  id,
  check,
  appointment = '',
  date = '',
  operator = '',
  region = '',
  title = '',
  value = '',
}) => {
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `
    <div class="check ${check ? 'check_passed': ''}"></div>
    <div class="input-wrap">
      <label class="label top" for="input">
        <div>${getCapitalizeStr(appointment)}</div>
        <div>Актуально: ${date} г.</div>
      </label>
      <input id=${id} type="text" class="input" value=${value}>
      <label class="label bottom" for="input">
        ${operator ? getCapitalizeStr(operator) : ''}. ${region ? `(${getCapitalizeStr(region)})` : ''}
      </label>
    </div>
    <select name="select" id="select" class="select">
      <option value="work" ${title === 'work'? 'selected' : ''}>Рабочий</option>
      <option value="mobile" ${title === 'mobile'? 'selected' : ''}>Мобильный</option>
    </select>
  `;
  return li;
}

const clearList = (list) => { list.textContent = '' };

const renderList = (data) => {
  const list = document.querySelector('.list');
  clearList(list);

  if (!Array.isArray(data)) {
    const li = document.createElement('li');
    list.append(li);
    li.textContent = 'Нет информации!';
  }

  data.map((item) => {
    list.append(createListItem(item));
  });
}

const addElement = (length) => {
  const newElement = {
    id: length,
    check: true,
    appointment: 'прямой',
    date: '01.01.2022',
    operator: 'мегафон',
    region: 'новосибирская область',
    title: 'work',
    value: '',
  }

  data.push(newElement);
}

const getData = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

getData()
  .then(() => button.removeAttribute('disabled'))
  .then(() => renderList(data));

const addEventHendler = () => {
  document.addEventListener('change', e => {
    const { target } = e;

    if (target.matches('.input') && !!target.value.trim()) {
      target.value = getPhoneNumber(target.value);
      data[target.id].value = target.value;
    }
  });

  document.addEventListener('click', e => {
    e.preventDefault();
    const { target } = e;

    if (target.matches('.button') && data.length < 3) {
      addElement(data.length);
      renderList(data);

      if (data.length > 2) button.setAttribute("disabled", "disabled");
    }
  });
}

addEventHendler();
