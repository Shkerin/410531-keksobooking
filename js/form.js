'use strict';

/**
 * Модуль для работы с формой объявления
 */

(function () {
  var utils = window.utils;
  var backend = window.backend;

  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var PRICES = [1000, 0, 5000, 10000];

  var formElem = document.querySelector('.notice__form');

  // Синхранизация полей «время заезда» и «время выезда»
  var timeInElem = formElem.querySelector('#timein');
  var timeOutElem = formElem.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeInElem, timeOutElem, TIMES, TIMES, syncValues);

  // Синхронизация поля «тип жилья» с минимальной ценой поля «цена за ночь»
  var typeElem = formElem.querySelector('#type');
  var priceElem = formElem.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Односторонняя синхронизация значения первого поля с минимальным значением второго
  window.synchronizeFields(typeElem, priceElem, TYPES, PRICES, syncValueWithMin);

  // Синхронизация поля «количество комнат» с полем «количество мест»
  var roomElem = formElem.querySelector('#room_number');
  var capacityElem = formElem.querySelector('#capacity');

  var rooms = [utils.getRandomInt(1, 3), utils.getRandomInt(1, 2), 1, 100];
  var capacities = [1, utils.getRandomInt(1, 2), utils.getRandomInt(1, 3), 0];
  window.synchronizeFields(roomElem, capacityElem, rooms, capacities, syncValues);

  // Валидация полей
  var validationForm = function () {
    var result = true;
    var validationError = function () {
      [].forEach.call(arguments, function (elem) {
        elem.style = 'border-color: red';
      });
      result = false;
    };

    var titleElem = formElem.querySelector('#title');
    if (titleElem.value.length < 30 || titleElem.value.length > 100) {
      validationError(titleElem.style);
    }

    var addressElem = formElem.querySelector('#address');
    if (addressElem.value === '') {
      validationError(addressElem);
    }

    if ((typeElem.selectedIndex === 0 && priceElem.value < PRICES[0]) ||
      (typeElem.selectedIndex === 1 && priceElem.value < PRICES[1]) ||
      (typeElem.selectedIndex === 2 && priceElem.value < PRICES[2]) ||
      (typeElem.selectedIndex === 3 && priceElem.value < PRICES[3])) {
      validationError(typeElem, priceElem);
    }

    if (timeInElem.selectedIndex !== timeOutElem.selectedIndex) {
      validationError(timeInElem, timeOutElem);
    }

    if ((roomElem.selectedIndex === 0 && capacityElem.selectedIndex !== 2) ||
      (roomElem.selectedIndex === 1 && !utils.isContains([1, 2], capacityElem.selectedIndex)) ||
      (roomElem.selectedIndex === 2 && !utils.isContains([0, 1, 2], capacityElem.selectedIndex)) ||
      (roomElem.selectedIndex === 3 && capacityElem.selectedIndex !== 3)) {
      validationError(roomElem, capacityElem);
    }

    return result;
  };

  // Отправка данных на сервер
  var loadHandler = function () {
    formElem.querySelector('#title').value = '';
    formElem.querySelector('#address').value = '';
    formElem.querySelector('#type').value = 'flat';
    formElem.querySelector('#price').value = '1000';
    formElem.querySelector('#timein').value = '12:00';
    formElem.querySelector('#timeout').value = '12:00';
    formElem.querySelector('#room_number').value = 1;
    formElem.querySelector('#capacity').value = 3;
    formElem.querySelector('#description').value = '';

    formElem.querySelector('#feature-wifi').checked = false;
    formElem.querySelector('#feature-dishwasher').checked = false;
    formElem.querySelector('#feature-parking').checked = false;
    formElem.querySelector('#feature-washer').checked = false;
    formElem.querySelector('#feature-elevator').checked = false;
    formElem.querySelector('#feature-conditioner').checked = false;
  };

  formElem.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (validationForm()) {
      backend.savePin(new FormData(formElem), loadHandler, window.error.show);
    }
  });
})();
