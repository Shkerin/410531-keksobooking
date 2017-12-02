'use strict';

(function () {
  var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var getRandomInt = function (min, max) {
    if (!isNumeric(min) || !isNumeric(max)) {
      throw new TypeError('Exception of computing a random number: min or max is not numeric')
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
      throw new TypeError('Exception of computing a random value: argument function is not array')
    }

    var idx = getRandomInt(0, array.length - 1);
    var num = array[idx];
    if (array.length > 0) {
      array.splice(idx, 1);
    }

    return num;
  };

  var createAnnouncements = function (announMax) {
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

      var rand = getRandomInt(0, features.length - 1);
      for (var i = 0; i < rand; i++) {
        arr.push(features[getRandomInt(0, features.length - 1)]);
      }

      return arr;
    };

    var announcements = [];
    for (var i = 0; i < announMax; i++) {
      var locationX = getRandomInt(300, 900);
      var locationY = getRandomInt(100, 500);
      var rooms = getRandomInt(1, 5);
      announcements.push({
        'author': {
          'avatar': getRandomAvatar()
        },
        'offer': {
          'title': getRandomTitle(),
          'address': locationX + ' ' + locationY,
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

    return announcements;
  };

  console.log(createAnnouncements(8));
})();
