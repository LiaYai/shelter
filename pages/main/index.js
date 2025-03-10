// Константы для меню
const burgerButton = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.header__link');
const blackOut = document.querySelector('.overlay');

// Константы для попапа
const popup = document.querySelector('.popup');
const popupButton = popup.querySelector('.popup__close');
const popupImage = popup.querySelector('.popup__image');
const popupTitle = popup.querySelector('.popup__title');
const popupSubtitle = popup.querySelector('.popup__subtitle');
const popupDescription = popup.querySelector('.popup__description');
const age = popup.querySelector('.age');
const inoculations = popup.querySelector('.inoculations');
const diseases = popup.querySelector('.diseases');
const parasites = popup.querySelector('.parasites');

// Клонирование шаблона карточки
const getTemplate = () => {
  return document
    .getElementById('id-template')
    .content.querySelector('.card')
    .cloneNode(true);
};

// Функция создания карточки 
function createCard(index, openPop) {
  const card = getTemplate();
  const cardImage = card.querySelector('.card-image');
  const petName = card.querySelector('.card-name');
  cardImage.src = petCards[index].img;
  cardImage.alt = petCards[index].type + petCards[index].breed;
  petName.textContent = petCards[index].name;
  card.addEventListener('click', () => openPop(petCards[index]));
  return card;
};

// Функция открытия меню
function showMenu() {
  blackOut.classList.add('show-overlay');
  burgerButton.classList.add('active-burger');
  mobileMenu.classList.add('active-mobile-menu');
  document.addEventListener('keydown', closeEscMenu);
  burgerButton.addEventListener('click', hideMenu);
  document.addEventListener('mousedown', closeBlackout);
  document.body.classList.add('hidden');
};

// Функция закрытия меню
function hideMenu() {
  blackOut.classList.remove('show-overlay');
  burgerButton.classList.remove('active-burger');
  mobileMenu.classList.remove('active-mobile-menu');
  document.removeEventListener('keydown', closeEscMenu);
  burgerButton.removeEventListener('click', hideMenu);
  document.removeEventListener('mousedown', closeBlackout);
  document.body.classList.remove('hidden');
};

// Обработчик закрытия меню через ESC
function closeEscMenu(evt) {
  if (evt.key === 'Escape') {
    hideMenu();
  };
}

// Обработчик закрытия через клик на оверлей
function closeBlackout(evt) {
  if (evt.target === blackOut) {
    hideMenu();
  };
};

// Слушатель на кнопку бургер-меню
burgerButton.addEventListener('click', showMenu);

// Закрытие меню после нажатия на пункт меню
menuLinks.forEach((item => {
  item.addEventListener('click', hideMenu);
}));

// Скрывать меню, если изменился размер экрана
window.addEventListener("resize", hideMenu);

// Открытие попапа карточки
function openPopup(card) {
  popup.classList.add('popup_is-open');
  document.body.classList.add('hidden');
  document.addEventListener('keydown', closePopup);
  document.addEventListener('mousedown', closeOverlay);
  popupImage.src = card.img;
  popupImage.alt = card.type + card.breed;
  popupTitle.textContent = card.name;
  popupSubtitle.textContent = card.type + ' - ' + card.breed;
  popupDescription.textContent = card.description;
  age.textContent = ' ' + card.age;
  inoculations.textContent = ' ' + card.inoculations.join(', ');
  diseases.textContent = ' ' + card.diseases.join(', ');
  parasites.textContent = ' ' + card.parasites.join(', ');

};

// Слушатель на кнопку закрытия попапа
popupButton.addEventListener('click', closePopup);

// Закрытие попапа
function closePopup() {
  popup.classList.remove('popup_is-open');
  document.body.classList.remove('hidden');
};

// Обработчик закрытия попапа через ESC
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  };
};

// Обработчик закрытия попапа нажатием на оверлей
function closeOverlay(evt) {
  if (evt.target === popup) {
    closePopup();
  };
};  

