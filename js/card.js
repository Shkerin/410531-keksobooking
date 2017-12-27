'use strict';

/**
 * Модуль для отрисовки информации о выбранном пине на карточке
 */

(function () {
  var PIN_TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var SIZE_PICTURE = {
    'width': '50px',
    'height': '50px'
  };

  var updateCard = function (elem, pin) {
    var offer = pin.offer;

    elem.querySelector('.popup__avatar').setAttribute('src', pin.avatar);
    elem.querySelector('h3').textContent = offer.title;
    elem.querySelector('p > small').textContent = offer.address;
    elem.querySelector('.popup__price').innerHTML = offer.price + '&#x20bd;/ночь';
    elem.querySelector('ul + p').textContent = offer.description;
    elem.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
    elem.querySelector('h4 + p').textContent =
      offer.rooms + ' для ' + offer.guests + ' гостей';
    elem.querySelector('h4 + p + p').textContent =
      'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    // Заполнение типа жилья
    elem.querySelector('h4').textContent = PIN_TYPES[offer.type];

    // Заполнение удобств
    var featuresElem = elem.querySelector('.popup__features');
    while (featuresElem.children.length) {
      featuresElem.removeChild(featuresElem.lastElementChild);
    }
    offer.features.forEach(function (value) {
      var featureElem = document.createElement('li');
      featureElem.className = 'feature feature--' + value;
      featuresElem.appendChild(featureElem);
    });

    // Заполнение изображений
    var pictureElem = elem.querySelector('.popup__pictures');
    while (pictureElem.children.length) {
      pictureElem.removeChild(pictureElem.lastElementChild);
    }
    offer.photos.forEach(function (value) {
      var imgElem = document.createElement('img');
      imgElem.setAttribute('src', value);
      imgElem.setAttribute('width', SIZE_PICTURE.width);
      imgElem.setAttribute('height', SIZE_PICTURE.height);
      pictureElem.appendChild(imgElem);
    });
  };

  var renderCard = function (pin) {
    var popupTemplate = document.querySelector('template');
    var popup = popupTemplate.content.cloneNode(true);

    updateCard(popup, pin);

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(popup, mapFiltersContainer);
  };

  window.card = {
    render: renderCard,
    update: updateCard
  };
})();
