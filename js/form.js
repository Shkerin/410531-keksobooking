'use strict';

/**
 * Модуль для работы с формой объявления
 */

(function () {
  var utils = window.utils;
  var backend = window.backend;

  // Синхранизация полей «время заезда» и «время выезда»
  var timeInElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var TIMES = ['12:00', '13:00', '14:00'];
  window.synchronizeFields(timeInElem, timeOutElem, TIMES, TIMES, syncValues);

  // Синхронизация поля «тип жилья» с минимальной ценой поля «цена за ночь»
  var typeElem = document.querySelector('#type');
  var priceElem = document.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Односторонняя синхронизация значения первого поля с минимальным значением второго
  var TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var PRICES = [1000, 0, 5000, 10000];
  window.synchronizeFields(typeElem, priceElem, TYPES, PRICES, syncValueWithMin);

  // Синхронизация поля «количество комнат» с полем «количество мест»
  var roomElem = document.querySelector('#room_number');
  var capacityElem = document.querySelector('#capacity');

  var rooms = [utils.getRandomInt(1, 3), utils.getRandomInt(1, 2), 1, 100];
  var capacities = [1, utils.getRandomInt(1, 2), utils.getRandomInt(1, 3), 0];
  window.synchronizeFields(roomElem, capacityElem, rooms, capacities, syncValues);

  // Валидация полей
  var validationForm = function () {
    var result = true;
    var validationError = function () {
      for (var i = 0; i < arguments.length; i++) {
        arguments[i].style = 'border-color: red';
      }
      result = false;
    };

    var titleElem = document.querySelector('#title');
    if (titleElem.value.length < 30 || titleElem.value.length > 100) {
      validationError(titleElem.style);
    }

    var addressElem = document.querySelector('#address');
    if (addressElem.value === '') {
      validationError(addressElem);
    }

    if ((typeElem.selectedIndex === 0 && priceElem.value < 1000) ||
      (typeElem.selectedIndex === 1 && priceElem.value < 0) ||
      (typeElem.selectedIndex === 2 && priceElem.value < 5000) ||
      (typeElem.selectedIndex === 3 && priceElem.value < 10000)) {
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
  var noticeFormElem = document.querySelector('.notice__form');

  var loadHandler = function () {
    noticeFormElem.querySelector('#title').value = '';
    noticeFormElem.querySelector('#address').value = '';
    noticeFormElem.querySelector('#type').value = 'flat';
    noticeFormElem.querySelector('#price').value = '1000';
    noticeFormElem.querySelector('#timein').value = '12:00';
    noticeFormElem.querySelector('#timeout').value = '12:00';
    noticeFormElem.querySelector('#room_number').value = 1;
    noticeFormElem.querySelector('#capacity').value = 3;
    noticeFormElem.querySelector('#description').value = '';

    noticeFormElem.querySelector('#feature-wifi').checked = false;
    noticeFormElem.querySelector('#feature-dishwasher').checked = false;
    noticeFormElem.querySelector('#feature-parking').checked = false;
    noticeFormElem.querySelector('#feature-washer').checked = false;
    noticeFormElem.querySelector('#feature-elevator').checked = false;
    noticeFormElem.querySelector('#feature-conditioner').checked = false;
  };

  noticeFormElem.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (validationForm()) {
      backend.savePin(new FormData(noticeFormElem), loadHandler, window.error.showErrorWindow);
    }
  });
})();
