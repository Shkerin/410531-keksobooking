'use strict';

/**
 * Модуль для вспомогательных функций
 */

(function () {
  var consts = window.consts;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === consts.ESC_KEYCODE) {
        action(evt);
      }
    },

    isContains: function (array, elem) {
      return array.indexOf(elem) !== -1;
    },

    isNumeric: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getRandomInt: function () {
      if (arguments.length === 1) {
        return this._getRandomIntMinMax(0, arguments[0]);
      }
      return this._getRandomIntMinMax(arguments[0], arguments[1]);
    },

    _getRandomIntMinMax: function (min, max) {
      if (!this.isNumeric(min) || !this.isNumeric(max)) {
        throw new TypeError('Exception of computing a random number: min or max is not numeric');
      } else if (min > max) {
        throw new RangeError('Exception of computing a random number: min > max');
      } else if (min === max) {
        return min;
      }

      var rand = Math.random() * (max - min + 1);
      return Math.floor(rand) + min;
    },

    addAttributeAll: function (target, attribute) {
      var elems = document.querySelectorAll(target);
      [].forEach.call(elems, function (elem) {
        elem.setAttribute(attribute, attribute);
      });
    },

    removeAttributeAll: function (target, attribute) {
      var elems = document.querySelectorAll(target);
      [].forEach.call(elems, function (elem) {
        elem.removeAttribute(attribute, attribute);
      });
    },

    createUUID: function () {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = '0123456789abcdef';
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-';

      var uuid = s.join('');
      return uuid;
    }
  };
})();
