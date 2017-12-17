'use strict';

/**
 * Модуль для отрисовки элемента на карточке
 */

(function () {
  var utils = window.utils;
  var mapPinActive;

  var escKeydownPopupHandler = function (evt) {
    utils.isEscEvent(evt, hidePopup);
  };

  var hidePopup = function () {
    utils.addClass('.popup', 'hidden');

    document.removeEventListener('keydown', escKeydownPopupHandler);
  };

  var updatePopup = function (elem, pin) {
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
    var pinTypes = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом'
    };
    elem.querySelector('h4').textContent = pinTypes[offer.type];

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

  var renderPopup = function (pin) {
    var popupTemplate = document.querySelector('template');
    var popup = popupTemplate.content.cloneNode(true);

    updatePopup(popup, pin);

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(popup, mapFiltersContainer);

    var popupCloseElem = document.querySelector('.popup__close');
    popupCloseElem.addEventListener('click', function () {
      hidePopup();
      if (mapPinActive) {
        utils.removeClass(mapPinActive, 'map__pin--active');
      }
    });
  };

  window.card = {
    showPopup: function (elem, mapPins) {
      var data = elem.dataset;
      if (mapPinActive) {
        var popup = document.querySelector('.popup');
        updatePopup(popup, mapPins[data.uid]);
        utils.removeClass(popup, 'hidden');
        utils.removeClass(mapPinActive, 'map__pin--active');
      } else {
        renderPopup(mapPins[data.uid]);
      }
      utils.addClass(elem, 'map__pin--active');
      mapPinActive = elem;

      document.addEventListener('keydown', escKeydownPopupHandler);
    }
  };
})();
