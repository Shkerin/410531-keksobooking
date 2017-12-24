'use strict';

/**
 * Модуль для отрисовки информации о выбранном пине на карточке
 */

(function () {
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
    var PIN_TYPE = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом'
    };
    elem.querySelector('h4').textContent = PIN_TYPE[offer.type];

    // Заполнение удобств в квартире
    var featuresElem = elem.querySelector('.popup__features');
    while (featuresElem.children.length) {
      featuresElem.removeChild(featuresElem.lastElementChild);
    }
    for (var i = 0; i < offer.features.length; i++) {
      var featureElem = document.createElement('li');
      featureElem.className = 'feature feature--' + offer.features[i];
      featuresElem.appendChild(featureElem);
    }
  };

  var renderCard = function (pin) {
    var popupTemplate = document.querySelector('template');
    var popup = popupTemplate.content.cloneNode(true);

    updateCard(popup, pin);

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(popup, mapFiltersContainer);
  };

  window.card = {
    updateCard: updateCard,
    renderCard: renderCard
  };
})();
