'use strict';

/**
 * Модуль для работы с формой объявления
 */

(function () {
  var utils = window.utils;

  // Синхранизация полей «время заезда» и «время выезда»
  var timeInElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var timeArray = ['12:00', '13:00', '14:00'];
  window.synchronizeFields(timeInElem, timeOutElem, timeArray, timeArray, syncValues);

  // Синхронизация поля «тип жилья» с минимальной ценой поля «цена за ночь»
  var typeElem = document.querySelector('#type');
  var priceElem = document.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Односторонняя синхронизация значения первого поля с минимальным значением второго
  var typeArray = ['flat', 'bungalo', 'house', 'palace'];
  var priceArray = [1000, 0, 5000, 10000];
  window.synchronizeFields(typeElem, priceElem, typeArray, priceArray, syncValueWithMin);

  // Синхронизация поля «количество комнат» с полем «количество мест»
  var roomNumElem = document.querySelector('#room_number');
  var capacityElem = document.querySelector('#capacity');

  var roomNumArray = [utils.getRandomInt(1, 3), utils.getRandomInt(1, 2), 1, 100];
  var capacityArray = [1, utils.getRandomInt(1, 2), utils.getRandomInt(1, 3), 0];
  window.synchronizeFields(roomNumElem, capacityElem, roomNumArray, capacityArray, syncValues);

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
    if (addressElem.value === '') {
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

    if ((roomNumElem.selectedIndex === 0 && capacityElem.selectedIndex !== 2) ||
      (roomNumElem.selectedIndex === 1 && !utils.isContains([1, 2], capacityElem.selectedIndex)) ||
      (roomNumElem.selectedIndex === 2 && !utils.isContains([0, 1, 2], capacityElem.selectedIndex)) ||
      (roomNumElem.selectedIndex === 3 && capacityElem.selectedIndex !== 3)) {
      cancelSubmit(roomNumElem, capacityElem);
    }
  });
})();
