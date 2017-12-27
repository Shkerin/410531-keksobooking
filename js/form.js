'use strict';

/**
 * Модуль для работы с формой объявления
 */

(function () {
  var utils = window.utils;
  var backend = window.backend;

  var TIMES = ['12:00', '13:00', '14:00'];
  var ROOMS = [1, 2, 3, 100];
  var PRICE_MAX = 1000000;
  var BORDER_VALID_STYLE = 'border: 1px solid #d9d9d3';
  var BORDER_ERROR_STYLE = 'border: 1px solid red';
  var TITLE_LIMITS = {
    'min': 30,
    'max': 100
  };

  var formElem = document.querySelector('.notice__form');
  var titleElem = formElem.querySelector('#title');
  var addressElem = formElem.querySelector('#address');
  var typeElem = formElem.querySelector('#type');
  var priceElem = formElem.querySelector('#price');
  var timeInElem = formElem.querySelector('#timein');
  var timeOutElem = formElem.querySelector('#timeout');
  var roomElem = formElem.querySelector('#room_number');
  var capacityElem = formElem.querySelector('#capacity');

  var syncValues = function (element, value) {
    element.value = value;
  };

  // Синхранизация полей «время заезда» и «время выезда»
  window.synchronizeFields(timeInElem, timeOutElem, TIMES, TIMES, syncValues, true);

  // Синхронизация поля «количество комнат» с полем «количество мест»
  var capacities = [1, utils.getRandomInt(1, 2), utils.getRandomInt(1, 3), 0];
  window.synchronizeFields(roomElem, capacityElem, ROOMS, capacities, syncValues, false);

  // Сбросить стили для всех полей
  var resetStyle = function () {
    titleElem.style = BORDER_VALID_STYLE;
    addressElem.style = BORDER_VALID_STYLE;
    typeElem.style = BORDER_VALID_STYLE;
    priceElem.style = BORDER_VALID_STYLE;
    timeInElem.style = BORDER_VALID_STYLE;
    timeOutElem.style = BORDER_VALID_STYLE;
    roomElem.style = BORDER_VALID_STYLE;
    capacityElem.style = BORDER_VALID_STYLE;
  };

  // Валидация полей
  var validationForm = function () {
    var result = true;

    // Установить стиль для поля с ошибкой валидации
    var setStyleError = function () {
      [].forEach.call(arguments, function (elem) {
        elem.style = BORDER_ERROR_STYLE;
      });
      result = false;
    };

    if (titleElem.value.length > TITLE_LIMITS.max || titleElem.value.length < TITLE_LIMITS.min) {
      setStyleError(titleElem);
    }

    if (priceElem.value > PRICE_MAX) {
      setStyleError(priceElem);
    }

    if ((typeElem.selectedIndex === 0 && priceElem.value < 1000) ||
      (typeElem.selectedIndex === 1 && priceElem.value < 0) ||
      (typeElem.selectedIndex === 2 && priceElem.value < 5000) ||
      (typeElem.selectedIndex === 3 && priceElem.value < 10000)) {
      setStyleError(priceElem);
    }

    if (addressElem.value === '') {
      setStyleError(addressElem);
    }

    if (roomElem.selectedIndex === 0 && capacityElem.value !== '1' ||
      (roomElem.selectedIndex === 1 &&
        !(capacityElem.value === '1' || capacityElem.value === '2')) ||
      (roomElem.selectedIndex === 2 &&
        !(capacityElem.value === '1' || capacityElem.value === '2' || capacityElem.value === '3')) ||
        (roomElem.selectedIndex === 3 && capacityElem.value !== '0')) {
      setStyleError(capacityElem);
    }

    return result;
  };

  // Обработчик сброса значений полей формы после отправки данных на сервер
  var resetHandler = function () {
    formElem.querySelector('#title').value = '';
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

    resetStyle();

    if (validationForm()) {
      backend.savePin(new FormData(formElem), function () {}, window.error.show);
    }
  });

  formElem.addEventListener('reset', function (evt) {
    evt.preventDefault();

    resetStyle();
    resetHandler();
  });
})();
