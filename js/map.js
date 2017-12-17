'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var ESC_KEYCODE = 27;

  var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var getRandomInt = function (min, max) {
    if (!isNumeric(min) || !isNumeric(max)) {
      throw new TypeError('Exception of computing a random number: min or max is not numeric');
    } else if (min > max) {
      throw new RangeError('Exception of computing a random number: min > max');
    } else if (min === max) {
      return min;
    }

    var rand = Math.random() * (max - min + 1);
    return Math.floor(rand) + min;
  };

  var getRandomValueFromArray = function (array) {
    if (!(array instanceof Array)) {
      throw new TypeError('Exception of computing a random value: argument function is not array');
    }

    var idx = getRandomInt(0, array.length - 1);
    var val = array[idx];
    if (array.length > 0) {
      array.splice(idx, 1);
    }

    return val;
  };

  var addClass = function (target, className) {
    if (target instanceof HTMLElement) {
      target.classList.add(className);
    } else if (typeof target === 'string') {
      var elem = document.querySelector(target);
      if (elem !== null) {
        elem.classList.add(className);
      }
    } else {
      throw new TypeError('Exception add class: target is not valid type');
    }
  };

  var removeClass = function (target, className) {
    if (target instanceof HTMLElement) {
      target.classList.remove(className);
    } else if (typeof target === 'string') {
      var elem = document.querySelector(target);
      if (elem !== null) {
        elem.classList.remove(className);
      }
    } else {
      throw new TypeError('Exception add class: target is not valid type');
    }
  };

  var removeAttribute = function (selector, attribute) {
    var elem = document.querySelector(selector);
    if (elem) {
      elem.removeAttribute(attribute);
    }
  };

  var removeAttributeAll = function (selector, attribute) {
    var elems = document.querySelectorAll(selector);
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeAttribute(attribute);
    }
  };

  var contains = function (arr, elem) {
    return arr.indexOf(elem) !== -1;
  };

  var createMapPins = function (announMax) {
    var numbers = [];
    for (var i = 0; i < announMax; i++) {
      numbers.push(i + 1);
    }

    var titles = [
      'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
      'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
    ];

    var types = [
      'flat', 'house', 'bungalo'
    ];

    var features = [
      'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
    ];

    var getRandomAvatar = function () {
      return 'img/avatars/user0' + getRandomValueFromArray(numbers) + '.png';
    };

    var getRandomTitle = function () {
      return getRandomValueFromArray(titles);
    };

    var getType = function () {
      return types[getRandomInt(0, types.length - 1)];
    };

    var getFeature = function () {
      var arr = [];

      var featuresCopy = features.slice();
      var rand = getRandomInt(0, features.length - 1);
      for (var k = 0; k < rand; k++) {
        arr.push(getRandomValueFromArray(featuresCopy));
      }

      return arr;
    };

    var mapPins = [];
    for (var j = 0; j < announMax; j++) {
      var locationX = getRandomInt(300, 900);
      var locationY = getRandomInt(100, 500);
      var rooms = getRandomInt(1, 5);
      mapPins.push({
        'uid': j, // TODO replace to uid
        'author': {
          'avatar': getRandomAvatar()
        },
        'offer': {
          'title': getRandomTitle(),
          'address': locationX + ', ' + locationY,
          'price': getRandomInt(1000, 1000000),
          'type': getType(),
          'rooms': rooms,
          'guests': getRandomInt(rooms, rooms * 2),
          'checkin': getRandomInt(12, 14) + ':00',
          'checkout': getRandomInt(12, 14) + ':00',
          'features': getFeature(),
          'description': '',
          'photos': []
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
    }

    return mapPins;
  };

  var renderMapPins = function (mapPins) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < mapPins.length; i++) {
      var pin = mapPins[i];
      var locationX = pin.location.x - 46 / 2;
      var locationY = pin.location.y - 64;
      var avatar = pin.author.avatar;

      var pinElem = document.createElement('div');
      pinElem.innerHTML =
        '<button style="left: ' + locationX + 'px; top: ' + locationY + 'px;" class="map__pin" data-uid=' + pin.uid + '>' +
        '<img src="' + avatar + '" width="40" height="40" draggable="false">' +
        '</button>';

      frag.appendChild(pinElem);

      pinElem.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          showPopup(evt.target);
        }
      });
    }

    document.querySelector('.map__pins').appendChild(frag);
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
        removeClass(mapPinActive, 'map__pin--active');
      }
    });
  };

  var escKeydownPopupHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hidePopup();
    }
  };

  var showPopup = function (elem) {
    document.addEventListener('keydown', escKeydownPopupHandler);

    var data = elem.dataset;
    if (mapPinActive) {
      var popup = document.querySelector('.popup');
      updatePopup(popup, mapPins[data.uid]);
      removeClass(popup, 'hidden');
      removeClass(mapPinActive, 'map__pin--active');
    } else {
      renderPopup(mapPins[data.uid]);
    }
    addClass(elem, 'map__pin--active');

    mapPinActive = elem;
  };

  var hidePopup = function () {
    document.removeEventListener('keydown', escKeydownPopupHandler);

    addClass('.popup', 'hidden');
  };

  var mapPinActive;
  var mapPins = createMapPins(8);

  var mapPinMainElem = document.querySelector('.map__pin--main');
  mapPinMainElem.addEventListener('mouseup', function () {
    removeClass('.map', 'map--faded');
    removeClass('.notice__form', 'notice__form--disabled');
    removeAttribute('.notice__header', 'disabled');
    removeAttributeAll('.form__element', 'disabled');

    renderMapPins(mapPins);
  });

  document.addEventListener('click', function () {
    var elem = document.activeElement;
    if (elem instanceof HTMLElement &&
      elem.classList.contains('map__pin') &&
      !elem.classList.contains('map__pin--main')) {
      showPopup(elem);
    }
  });

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
        capacityElem.selectedIndex = getRandomInt(1, 2);
        break;
      case 2:
        capacityElem.selectedIndex = getRandomInt(0, 2);
        break;
      case 3:
        capacityElem.selectedIndex = 3;
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
      (roomNumberElem.selectedIndex === 1 && !contains([1, 2], capacityElem.selectedIndex)) ||
      (roomNumberElem.selectedIndex === 2 && !contains([0, 1, 2], capacityElem.selectedIndex)) ||
      (roomNumberElem.selectedIndex === 3 && capacityElem.selectedIndex !== 3)) {
      cancelSubmit(roomNumberElem, capacityElem);
    }
  });
})();
