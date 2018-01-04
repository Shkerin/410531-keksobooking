'use strict';

/**
 * Модуль для создания данных
 */

(function () {
  var utils = window.utils;

  var getRandomValueFromArray = function (array) {
    if (!(array instanceof Array)) {
      throw new TypeError('Exception of computing a random value: argument function is not array');
    }

    if (!array.length) {
      return;
    }

    var idx = utils.getRandomInt(0, array.length - 1);
    var val = array[idx];
    if (array.length > 0) {
      array.splice(idx, 1);
    }

    return val;
  };

  var createPins = function (numPins) {
    var numbers = [];
    for (var i = 0; i < numPins; i++) {
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
      return types[utils.getRandomInt(0, types.length - 1)];
    };

    var getFeature = function () {
      var newFeatures = [];

      var copyFeatures = features.slice();
      var rand = utils.getRandomInt(features.length - 1);
      for (var k = 0; k < rand; k++) {
        newFeatures.push(getRandomValueFromArray(copyFeatures));
      }

      return newFeatures;
    };

    var mapPins = [];
    for (var j = 0; j < numPins; j++) {
      var locationX = utils.getRandomInt(300, 900);
      var locationY = utils.getRandomInt(100, 500);
      var rooms = utils.getRandomInt(1, 5);
      mapPins.push({
        'uid': j, // TODO replace to uid
        'author': {
          'avatar': getRandomAvatar()
        },
        'offer': {
          'title': getRandomTitle(),
          'address': locationX + ', ' + locationY,
          'price': utils.getRandomInt(1000, 1000000),
          'type': getType(),
          'rooms': rooms,
          'guests': utils.getRandomInt(rooms, rooms * 2),
          'checkin': utils.getRandomInt(12, 14) + ':00',
          'checkout': utils.getRandomInt(12, 14) + ':00',
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

  window.data = {
    create: createPins
  };
})();
