'use strict';

/**
 * Модуль для взаимодействия с удалённым севером через XHR
 */

(function () {
  var consts = window.consts;

  var load = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = consts.RESPONSE_TYPE;
    xhr.timeout = consts.TIMEOUT;

    xhr.addEventListener('load', function () {
      loadHandler(xhr.response);
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', consts.URL_LOAD);
    xhr.send();
  };

  var upload = function (data, loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = consts.RESPONSE_TYPE;
    xhr.timeout = consts.TIMEOUT;

    xhr.addEventListener('load', function () {
      loadHandler(xhr.response);
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка при отправке данных');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', consts.URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    loadPins: load,
    savePin: upload
  };
})();
