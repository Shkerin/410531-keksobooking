'use strict';

(function () {
  var utils = window.utils;

  var mapElem = document.querySelector('.map');
  var formElem = document.querySelector('.notice__form');
  var headerElem = document.querySelector('.notice__header');

  var show = function (msg) {
    mapElem.classList.add('map--faded');
    formElem.classList.add('notice__form--disabled');
    headerElem.setAttribute('disabled', 'disabled');
    utils.addAttributeAll('.form__element', 'disabled');

    var divError = document.createElement('div');

    divError.classList.add('error');
    divError.innerHTML =
      '<h3>Ошибка отправки данных с сервера</h3>' +
      '<p>' + msg + '</p>';

    mapElem.appendChild(divError);
  };

  window.error = {
    show: show
  };
})();
