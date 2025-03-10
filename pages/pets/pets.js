const len = petCards.length;
const gallery = document.querySelector('.main-pets');
const sliderWrapper = gallery.querySelector('.pets-list-slider');
const sliderPets = gallery.querySelector('.pets-list');
const prevButton = gallery.querySelector('.previous');
const backButton = gallery.querySelector('.back');
const forwardButton = gallery.querySelector('.forward');
const nextButton = gallery.querySelector('.next');
const numberButton = gallery.querySelector('.number');

let sliderWidth = sliderWrapper.clientWidth;
let indexesSlider = [];
let number = 0;

// Получаем индексы случайным образом
const getIndexes = () => {
  let indexes = [];
  while (indexes.length !== len / 2) {
    let index = Math.trunc(Math.random() * len / 2);
    if (!indexes.includes(index)) {indexes.push(index)};
  };
  while (indexes.length !== len) {
    let index = Math.trunc(Math.random() * (len / 2) + (len / 2));
    if (!indexes.includes(index)) {indexes.push(index)};
  };
  return indexes;
};

// Функция добавления карточек в слайдер
const generateSlider = (part, indexes) => {
  part.innerHTML = '';
  indexes.forEach(i => part.append(createCard(i, openPopup)));
};

// Заполняем слайдер шестью наборами карточек
for (let i = 0; i < 6; i += 1) {
  indexesSlider = indexesSlider.concat(getIndexes());
}

// Убираем интерактивность кнопок пагианции
function deactiveButton(direction) {
  switch(direction) {
  case ('left'):
    prevButton.classList.add('no-active-pagination');
    backButton.classList.add('no-active-pagination');
    break;
  case ('right'):
    nextButton.classList.add('no-active-pagination');
    forwardButton.classList.add('no-active-pagination');
    break;
  }
}

// Возвращаем интерактивность кнопок пагинации
function activeButton(direction) {
  switch(direction) {
  case ('left'):
    prevButton.classList.remove('no-active-pagination');
    backButton.classList.remove('no-active-pagination');
    break;
  case ('right'):
    nextButton.classList.remove('no-active-pagination');
    forwardButton.classList.remove('no-active-pagination');
    break;
  }
}

// Обработчик нажатия вправо
function rightMove() {
  activeButton('left');
  let left = sliderPets.style.left.slice(0, -2) - sliderWrapper.clientWidth - 40;
  sliderPets.style.left = `${left}px`;
  if (Math.abs(+sliderPets.style.left.slice(0, -2) - sliderWrapper.clientWidth - 40) >= sliderPets.scrollWidth) {
    deactiveButton('right');
  };
  setNumber();
}

// Обработчик нажатия влево
function leftMove() {
  activeButton('right');
  let right = +sliderPets.style.left.slice(0, -2) + sliderWrapper.clientWidth + 40;
  if (right === 0) {
    startMove();
  } else {
  sliderPets.style.left = `${right}px`;
  setNumber();
  };
}

// Обработчик нажатия в конец и для конечной позиции
function endMove() {
  activeButton('left');
  deactiveButton('right');
  sliderPets.style.left = `-${sliderPets.scrollWidth - sliderWrapper.clientWidth}px`;
  number = Math.trunc(Math.abs((sliderPets.scrollWidth + 40)/(sliderWrapper.clientWidth + 40)));
  numberButton.textContent = number;
}

// Обработчик нажатия в начало и для начальной позиции
function startMove() {
  activeButton('right');
  deactiveButton('left');
  sliderPets.style.left = '0';
  numberButton.textContent = '1';
}

// Номер страницы
function setNumber() {
  number = Math.trunc(Math.abs(+sliderPets.style.left.slice(0, -2) / (sliderWidth + 40)) + 1);
  numberButton.textContent = number;
}

// Обработчик изменений при смене размера экрана
function changePaginationState() {
  sliderWidth = sliderWrapper.clientWidth;
  if (Math.abs(+sliderPets.style.left.slice(0, -2) - sliderWidth - 40) >= sliderPets.scrollWidth) {
    endMove();
  } else if (+sliderPets.style.left.slice(0, -2) === 0) {
    startMove();
  } else {
    activeButton('right');
    setNumber();
    sliderPets.style.left = `-${(sliderWidth + 40) * (number - 1)}px`;
  }
  
}

deactiveButton('left');
generateSlider(sliderPets, indexesSlider);

window.onresize = changePaginationState;

nextButton.addEventListener('click', rightMove);
backButton.addEventListener('click', leftMove);
forwardButton.addEventListener('click', endMove);
prevButton.addEventListener('click', startMove);