'use strict';

(function () {
  var utils = window.utils;
  var card = window.card;

  var mapPinActive;

  var escKeydownPopupHandler = function (evt) {
    utils.isEscEvent(evt, hideCard);
  };

  var clickPopupCloseHandler = function () {
    hideCard();
    if (mapPinActive) {
      utils.removeClass(mapPinActive, 'map__pin--active');
    }
  };

  var showCard = function (elem, mapPins) {
    var data = elem.dataset;
    if (mapPinActive) {
      var popup = document.querySelector('.popup');
      card.updateCard(popup, mapPins[data.uid]);
      utils.removeClass(popup, 'hidden');
      utils.removeClass(mapPinActive, 'map__pin--active');
    } else {
      card.renderCard(mapPins[data.uid]);
    }
    utils.addClass(elem, 'map__pin--active');
    mapPinActive = elem;

    var popupCloseElem = document.querySelector('.popup__close');

    document.addEventListener('keydown', escKeydownPopupHandler);
    popupCloseElem.addEventListener('click', clickPopupCloseHandler);
  };

  var hideCard = function () {
    utils.addClass('.popup', 'hidden');

    var popupCloseElem = document.querySelector('.popup__close');

    document.removeEventListener('keydown', escKeydownPopupHandler);
    popupCloseElem.removeEventListener('click', clickPopupCloseHandler);
  };

  window.showCard = showCard;
})();
