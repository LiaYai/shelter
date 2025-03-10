const slider = document.querySelector('.slider');
const sliderInner = slider.querySelector('.slider-line');
const parts = sliderInner.querySelectorAll('.slider-part');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const len = petCards.length;

let n;
let activeIndexes;
let prevIndexes;
let nextIndexes;
let direction;

// Сколько карточек в слайдере при текущей ширине
const cardNumber = () => {
  const sliderWidth = slider.clientWidth;
  let count = Math.floor(sliderWidth / 270);
  return count;
};

// Получаем индексы случайным образом для активных карточек
const getActiveIndexes = () => {
  while (activeIndexes.length !== n) {
    let index = Math.trunc(Math.random() * len);
    if (!activeIndexes.includes(index)) {activeIndexes.push(index)};
  };
};

// Функция получения индексов для невидимой части слайдера, без повторов с activeIndexes
const genIndexes = (indexes) => {
  let newIndexes =[];
  while (newIndexes.length !== n) {
    let index = Math.trunc(Math.random() * len);
    if (!indexes.includes(index) && !newIndexes.includes(index)) {newIndexes.push(index)};
  };
  return newIndexes;
};

// Функция добавления карточек в часть слайдера
const generateSliderPart = (part, indexes) => {
  part.innerHTML = '';
  indexes.forEach(i => part.append(createCard(i, openPopup)));
};

// Функция добавления карточек в слайдер
const generateSlider = (indexes) => {
  prevIndexes = genIndexes(indexes);
  nextIndexes = genIndexes(indexes);
  generateSliderPart(parts[1], indexes);
  generateSliderPart(parts[0], prevIndexes);
  generateSliderPart(parts[2], nextIndexes);
};

// Фукция заполнения слайдера новыми карточками
function getNewSlider () {
  activeIndexes = [];
  prevIndexes = [];
  nextIndexes = [];
  getActiveIndexes();
  generateSlider(activeIndexes);
};

// Обработчик получения слайдера или его обновления при изменении ширины экрана, если вмещается другое кол-во карточек
function initSlider() {
  const sliderWidth = slider.clientWidth;
  sliderInner.style.left = `-${sliderWidth + 40}px`;
  if (n !== cardNumber()) {
  n = cardNumber();
  getNewSlider();
  };
  
};

// Обработчик нажатия вправо
const moveRight = () => {
  arrowRight.removeEventListener('click', moveRight);
  arrowLeft.removeEventListener('click', moveLeft);
  sliderInner.firstElementChild.classList.add('transition-right');
  prevIndexes = activeIndexes;
  activeIndexes = nextIndexes;
  nextIndexes = genIndexes(activeIndexes);
  createDivRight(nextIndexes);
};

// Обработчик нажатия влево
const moveLeft = () => {
  arrowRight.removeEventListener('click', moveRight);
  arrowLeft.removeEventListener('click', moveLeft);
  nextIndexes = activeIndexes;
  activeIndexes = prevIndexes;
  prevIndexes = genIndexes(activeIndexes);
  createDivLeft(prevIndexes);
};

// Создает div справа
const createDivRight = (indexes) => {
  const newPart = document.createElement('div');
  newPart.classList.add('slider-part');
  generateSliderPart(newPart, indexes);
  sliderInner.append(newPart);
}

// Создает div слева
const createDivLeft = (indexes) => {
  const newPart = document.createElement('div');
  newPart.classList.add('slider-part');
  generateSliderPart(newPart, indexes);
  console.log(newPart);
  sliderInner.prepend(newPart);
  newPart.classList.add('transition-left');
}

// Слушатель на действия после окончания анимации
sliderInner.addEventListener('animationend', (animationEvent)  => {
  if (animationEvent.animationName === "move-left") {
    sliderInner.firstElementChild.classList.remove('transition-left');
    sliderInner.lastElementChild.remove();
  } else {
    sliderInner.firstElementChild.remove();
  };
  arrowRight.addEventListener('click', moveRight);
  arrowLeft.addEventListener('click', moveLeft);
});

n = cardNumber(); // количество карточек в слайдере
getNewSlider(); 
sliderInner.style.left = `-${slider.clientWidth + 40}px`;

window.onresize = initSlider; // проверка слйадера при изменении размера экрана

arrowRight.addEventListener('click', moveRight);
arrowLeft.addEventListener('click', moveLeft);
