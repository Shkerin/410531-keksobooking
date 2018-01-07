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
  var descriptionElem = formElem.querySelector('#description');

  var syncValues = function (element, value) {
    element.value = value;
  };

  // Синхранизация полей «время заезда» и «время выезда»
  window.synchronizeFields(timeInElem, timeOutElem, TIMES, TIMES, syncValues, true);

  // Синхронизация поля «количество комнат» с полем «количество мест»
  var capacities = [1, utils.getRandomInt(1, 2), utils.getRandomInt(1, 3), 0];
  window.synchronizeFields(roomElem, capacityElem, ROOMS, capacities, syncValues, false);

  // Сброс стилей для всех полей формы
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

  // Сброс значений у всех полей формы
  var resetFormFields = function () {
    titleElem.value = '';
    typeElem.value = 'flat';
    priceElem.value = '1000';
    timeInElem.value = '12:00';
    timeOutElem.value = '12:00';
    roomElem.value = 1;
    capacityElem.value = 3;
    descriptionElem.value = '';

    formElem.querySelector('#feature-wifi').checked = false;
    formElem.querySelector('#feature-dishwasher').checked = false;
    formElem.querySelector('#feature-parking').checked = false;
    formElem.querySelector('#feature-washer').checked = false;
    formElem.querySelector('#feature-elevator').checked = false;
    formElem.querySelector('#feature-conditioner').checked = false;

    formElem.querySelector('.notice__preview img').src = 'img/muffin.png';
    var pictures = formElem.querySelector('.form__photo-container .popup__pictures');
    if (pictures) {
      pictures.parentElement.removeChild(pictures);
    }
  };

  // Валидация полей формы
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

    if ((roomElem.selectedIndex === 0 && capacityElem.value !== '1') ||
      (roomElem.selectedIndex === 1 &&
        !(capacityElem.value === '1' || capacityElem.value === '2')) ||
      (roomElem.selectedIndex === 2 &&
        !(capacityElem.value === '1' || capacityElem.value === '2' || capacityElem.value === '3')) ||
      (roomElem.selectedIndex === 3 && capacityElem.value !== '0')) {
      setStyleError(capacityElem);
    }

    return result;
  };

  // Создание объекта пина
  var createPin = function () {
    var pattern = /\d{1,}/g;

    var getFeatures = function () {
      return ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].filter(function (value) {
        return formElem.querySelector('#feature-' + value).checked;
      });
    };

    var getPhotos = function () {
      var photos = [];

      var picturesElem = document.querySelector('.form__photo-container .popup__pictures');
      if (picturesElem) {
        var imgElems = picturesElem.querySelectorAll('img');
        [].forEach.call(imgElems, function (value) {
          photos.push(value.src);
        });
      }

      return photos;
    };

    return {
      'uid': utils.createUUID(),
      'author': {
        'avatar': formElem.querySelector('.notice__preview img').src
      },
      'offer': {
        'title': titleElem.value,
        'address': addressElem.value.match(pattern)[0] + ', ' + addressElem.value.match(pattern)[1],
        'price': priceElem.value,
        'type': typeElem.value,
        'rooms': roomElem.value,
        'guests': capacityElem.value,
        'checkin': timeInElem.value,
        'checkout': timeOutElem.value,
        'features': getFeatures(),
        'description': descriptionElem.value,
        'photos': getPhotos()
      },
      'location': {
        'x': addressElem.value.match(pattern)[0],
        'y': addressElem.value.match(pattern)[1]
      }
    };
  };

  formElem.addEventListener('submit', function (evt) {
    evt.preventDefault();

    resetStyle();

    if (validationForm()) {
      if (backend.hostReachable()) {
        backend.saveDate(new FormData(formElem), function () {
        }, window.error.show);
      } else {
        var pin = createPin();
        window.pins.add(pin);
        window.pins.render([pin]);
      }
    }
  });

  formElem.addEventListener('reset', function (evt) {
    evt.preventDefault();

    resetStyle();
    resetFormFields();
  });

  var loadImgHandler = function (aImg) {
    return function (e) {
      aImg.src = e.target.result;
    };
  };

  // Загрузка изображения аватара пользователя
  var avatarElem = formElem.querySelector('#avatar');
  avatarElem.addEventListener('change', function (evt) {
    evt.preventDefault();

    var files = evt.target.files;
    if (!files.length) {
      return;
    }

    var file = files[0];
    if (!file.type.startsWith('image/')) {
      return;
    }

    var imgElem = formElem.querySelector('.notice__preview img');
    imgElem.file = file;

    var reader = new FileReader();
    reader.addEventListener('load', loadImgHandler(imgElem));
    reader.readAsDataURL(file);
  });

  // Загрузка фотографий жилья
  var imagesElem = formElem.querySelector('#images');
  imagesElem.addEventListener('change', function (evt) {
    evt.preventDefault();

    var files = evt.target.files;
    if (!files.length) {
      return;
    }

    var picturesElem = document.querySelector('.form__photo-container .popup__pictures');
    if (!picturesElem) {
      picturesElem = document.createElement('ul');
      picturesElem.classList.add('popup__pictures');

      var uploadElem = document.querySelector('.form__photo-container .upload');
      uploadElem.appendChild(picturesElem);
    }

    [].forEach.call(files, function (file) {
      if (!file.type.startsWith('image/')) {
        return;
      }

      var imgElem = document.createElement('img');
      imgElem.file = file;

      var listElem = document.createElement('li');
      listElem.appendChild(imgElem);
      picturesElem.appendChild(listElem);

      var render = new FileReader();
      render.addEventListener('load', loadImgHandler(imgElem));
      render.readAsDataURL(file);
    });
  });
})();
