'use strict';

/**
 * Модуль для работы с формой объявления
 */

(function () {
  var utils = window.utils;

  // Синхранизация полей «время заезда» и «время выезда»
  var timeInElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');

  var changeTimeHandler = function (evt) {
    var target = evt.target;
    if (target === timeInElem) {
      timeOutElem.selectedIndex = target.selectedIndex;
    } else if (evt.target === timeOutElem) {
      timeInElem.selectedIndex = target.selectedIndex;
    }
  };

  timeInElem.addEventListener('change', changeTimeHandler);
  timeOutElem.addEventListener('change', changeTimeHandler);

  // Синхронизация поля «тип жилья» с минимальной ценой поля «цена за ночь»
  var typeElem = document.querySelector('#type');
  var priceElem = document.querySelector('#price');

  var changeTypeHandler = function (evt) {
    var target = evt.target;
    switch (target.selectedIndex) {
      case 0: // квартира
        priceElem.setAttribute('min', '1000');
        break;
      case 1: // лачуга
        priceElem.setAttribute('min', '0');
        break;
      case 2: // дом
        priceElem.setAttribute('min', '5000');
        break;
      case 3: // дворец
        priceElem.setAttribute('min', '10000');
        break;
    }
  };

  typeElem.addEventListener('change', changeTypeHandler);

  // Синхронизация поля «количество комнат» с полем «количество мест»
  var roomNumberElem = document.querySelector('#room_number');
  var capacityElem = document.querySelector('#capacity');

  var changeRoomNumberHandler = function (evt) {
    var target = evt.target;
    switch (target.selectedIndex) {
      case 0:
        capacityElem.selectedIndex = 2;
        break;
      case 1:
        capacityElem.selectedIndex = utils.getRandomInt(1, 2);
        break;
      case 2:
        capacityElem.selectedIndex = utils.getRandomInt(2);
        break;
      case 3:
        capacityElem.selectedIndex = 3;
        break;
    }
  };

  roomNumberElem.addEventListener('change', changeRoomNumberHandler);

  // Валидация полей
  var noticeFormElem = document.querySelector('.notice__form');
  noticeFormElem.addEventListener('submit', function (evt) {
    var cancelSubmit = function () {
      for (var i = 0; i < arguments.length; i++) {
        arguments[i].style = 'border-color: red';
      }
      evt.preventDefault();
      return false;
    };

    var titleElem = document.querySelector('#title');
    if (titleElem.value.length < 30 || titleElem.value.length > 100) {
      cancelSubmit(titleElem.style);
    }

    var addressElem = document.querySelector('#address');
    if (addressElem.value.isEmpty) {
      cancelSubmit(addressElem);
    }

    if ((typeElem.selectedIndex === 0 && priceElem.value < 1000) ||
      (typeElem.selectedIndex === 1 && priceElem.value < 0) ||
      (typeElem.selectedIndex === 2 && priceElem.value < 5000) ||
      (typeElem.selectedIndex === 3 && priceElem.value < 10000)) {
      cancelSubmit(typeElem, priceElem);
    }

    if (timeInElem.selectedIndex !== timeOutElem.selectedIndex) {
      cancelSubmit(timeInElem, timeOutElem);
    }

    if ((roomNumberElem.selectedIndex === 0 && capacityElem.selectedIndex !== 2) ||
      (roomNumberElem.selectedIndex === 1 && !utils.isContains([1, 2], capacityElem.selectedIndex)) ||
      (roomNumberElem.selectedIndex === 2 && !utils.isContains([0, 1, 2], capacityElem.selectedIndex)) ||
      (roomNumberElem.selectedIndex === 3 && capacityElem.selectedIndex !== 3)) {
      cancelSubmit(roomNumberElem, capacityElem);
    }
  });
})();
