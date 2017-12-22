'use strict';

(function () {
  var utils = window.utils;

  var showError = function (msg) {
    utils.addClass('.map', 'map--faded');
    utils.addClass('.notice__form', 'notice__form--disabled');
    utils.addAttribute('.notice__header', 'disabled');
    utils.addAttributeAll('.form__element', 'disabled');

    var divError = document.createElement('div');

    divError.classList.add('error');
    divError.innerHTML =
      '<h3>Ошибка отправки данных с сервера</h3>' +
      '<p>' + msg + '</p>';

    document.querySelector('.map').appendChild(divError);
  };

  window.error = {
    showErrorWindow: showError
  };
})();
