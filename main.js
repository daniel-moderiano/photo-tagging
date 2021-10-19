/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/character.js":
/*!**********************************!*\
  !*** ./src/scripts/character.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Use a factory function to generate character objects with data about their location, whether they have yet been found, and methods to determine when/if they are clicked/found
function character(name, top, left, width, height) {
  var found = false;

  var isFound = function isFound() {
    return found;
  };

  var toggleFound = function toggleFound() {
    if (found) {
      found = false;
    } else {
      found = true;
    }
  };

  var minTop = top;
  var minLeft = left;
  var maxTop = minTop + height;
  var maxLeft = minLeft + width; // Check, given a top and left mouse coordinate within warp core img, whether those coordinates are within the bounds of this character

  var isWithinBounds = function isWithinBounds(clickTop, clickLeft) {
    if (clickTop <= minTop || clickTop >= maxTop) {
      return false;
    }

    if (clickLeft <= left || clickLeft >= maxLeft) {
      return false;
    }

    return true;
  };

  return {
    name: name,
    minTop: minTop,
    maxTop: maxTop,
    minLeft: minLeft,
    maxLeft: maxLeft,
    isWithinBounds: isWithinBounds,
    isFound: isFound,
    toggleFound: toggleFound
  };
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (character);

/***/ }),

/***/ "./src/scripts/controller.js":
/*!***********************************!*\
  !*** ./src/scripts/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/scripts/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/scripts/view.js");



var Timer = __webpack_require__(/*! tiny-timer */ "./node_modules/tiny-timer/dist/tiny-timer.module.js");

var timer = new Timer({
  interval: 1000,
  stopwatch: true
});
var img = document.querySelector('.img__warp-core');
var popupMenu = document.querySelector('.popup__list');
var coordinates = {};

var getClickCoordinates = function getClickCoordinates(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.

  var y = e.clientY - rect.top; //y position within the element.

  return {
    top: y,
    left: x
  };
}; // Checks for ANY non-found character at location of user's click (coordinates) but does not modify found value


var checkForCharClick = function checkForCharClick(clickCoordinates) {
  var charClicked = [];
  _model__WEBPACK_IMPORTED_MODULE_0__.characters.forEach(function (character) {
    if (character.isWithinBounds(clickCoordinates.top, clickCoordinates.left)) {
      console.log("".concat(character.name, " clicked"));

      if (!character.isFound()) {
        charClicked.push(character.name);
      }
    }
  });
  return charClicked;
}; // Will return true if there are any characters that remain to be found. Use to control timer and other 'game-ending' features


var anyCharsRemaining = function anyCharsRemaining() {
  return _model__WEBPACK_IMPORTED_MODULE_0__.characters.some(function (char) {
    return !char.isFound();
  });
}; // Event propagation on popup ul element to catch user clicking on list item


popupMenu.addEventListener('click', function (e) {
  var charClicked = checkForCharClick(coordinates);

  if (e.target.classList.contains('popup__list-item')) {
    if (charClicked.length > 0) {
      if (e.target.dataset.name === charClicked[0]) {
        console.log("Found ".concat(e.target.dataset.name, "!"));
        var charFound = _model__WEBPACK_IMPORTED_MODULE_0__.characters.filter(function (char) {
          return char.name === charClicked[0];
        });
        charFound[0].toggleFound(); // Toggle UI on popup menu itself

        e.target.style.textDecoration = 'line-through';
        e.target.style.color = '#646464';
        console.log(anyCharsRemaining());
      } else {
        console.log('Miss');
      }
    } else {
      console.log('Miss');
    }

    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateHeaderCards)();
  }
});
window.addEventListener('click', function (e) {
  // All image-related functions should only be fired when the user actually clicks within the image boundaries.
  if (e.target === img) {
    coordinates = getClickCoordinates(e);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayReticleAtCursor)(coordinates);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayPopupMenuAtCursor)(coordinates);
  } else {
    // Remove reticle when clicking outside image, or clicking on the same spot twice
    document.querySelector('.popup__menu').style.display = 'none';
    document.querySelector('.popup__reticle').style.display = 'none';
  }
});

/***/ }),

/***/ "./src/scripts/model.js":
/*!******************************!*\
  !*** ./src/scripts/model.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "characters": () => (/* binding */ characters)
/* harmony export */ });
/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./character */ "./src/scripts/character.js");
 // Define the preset characters for the warp core img

var waldo = (0,_character__WEBPACK_IMPORTED_MODULE_0__["default"])('Waldo', 1135, 1026, 78, 120);
var yoda = (0,_character__WEBPACK_IMPORTED_MODULE_0__["default"])('Yoda', 1370, 720, 74, 110);
var walle = (0,_character__WEBPACK_IMPORTED_MODULE_0__["default"])('Wall·E', 438, 1033, 95, 95);
var groot = (0,_character__WEBPACK_IMPORTED_MODULE_0__["default"])('Baby Groot', 1300, 300, 58, 68);
var robocop = (0,_character__WEBPACK_IMPORTED_MODULE_0__["default"])('Robocop', 580, 422, 40, 40);
var characters = [waldo, yoda, walle, groot, robocop];


/***/ }),

/***/ "./src/scripts/view.js":
/*!*****************************!*\
  !*** ./src/scripts/view.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateHeaderCards": () => (/* binding */ updateHeaderCards),
/* harmony export */   "displayPopupMenuAtCursor": () => (/* binding */ displayPopupMenuAtCursor),
/* harmony export */   "displayReticleAtCursor": () => (/* binding */ displayReticleAtCursor)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/scripts/model.js");
 // Reducing opacity of image in header character cards visually indicates that they have been found.

var updateHeaderCards = function updateHeaderCards() {
  _model__WEBPACK_IMPORTED_MODULE_0__.characters.forEach(function (char) {
    if (char.isFound()) {
      document.querySelector("[data-name='".concat(char.name, "']")).style.opacity = '10%';
    }

    console.log(char.name, char.isFound());
  });
}; // TODO: function to alter the popopMenu perhaps with a strikethrough for characters that have been found?
// Sets reticle element to the user's position. 


var displayReticleAtCursor = function displayReticleAtCursor(coordinates) {
  var reticle = document.querySelector('.popup__reticle');
  reticle.style.display = 'grid'; // 25px is used because the reticle element has height/width of 50px. If this size is changed, this function should be changed to 1/2 of the new dimensions. As should popupMenu func.

  reticle.style.top = "".concat(coordinates.top - 25, "px");
  reticle.style.left = "".concat(coordinates.left - 25, "px");
}; // Sets popup menu to the user's cursor position, but with reticle placement in mind


var displayPopupMenuAtCursor = function displayPopupMenuAtCursor(coordinates) {
  var popupMenu = document.querySelector('.popup__menu');
  popupMenu.style.display = 'block';
  popupMenu.style.top = "".concat(coordinates.top + 25, "px");
  popupMenu.style.left = "".concat(coordinates.left - 25, "px");
};



/***/ }),

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mitt/dist/mitt.es.js":
/*!*******************************************!*\
  !*** ./node_modules/mitt/dist/mitt.es.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n){return{all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e])},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1)},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e)}),(n.get("*")||[]).slice().map(function(n){n(t,e)})}}}
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "./node_modules/tiny-timer/dist/tiny-timer.module.js":
/*!***********************************************************!*\
  !*** ./node_modules/tiny-timer/dist/tiny-timer.module.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.es.js");


class Timer {
  constructor({
    interval = 1000,
    stopwatch = false
  } = {}) {
    this._duration = 0;
    this._endTime = 0;
    this._pauseTime = 0;
    this._status = 'stopped';
    this._emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_0__["default"])();

    this.tick = () => {
      if (this.status === 'paused') return;

      if (Date.now() >= this._endTime) {
        this.stop();

        this._emitter.emit('tick', this._stopwatch ? this._duration : 0);

        this._emitter.emit('done');
      } else {
        this._emitter.emit('tick', this.time);
      }
    };

    this._interval = interval;
    this._stopwatch = stopwatch;
  }

  start(duration, interval) {
    if (this.status !== 'stopped') return;

    if (duration == null) {
      throw new TypeError('Must provide duration parameter');
    }

    this._duration = duration;
    this._endTime = Date.now() + duration;

    this._changeStatus('running');

    this._emitter.emit('tick', this._stopwatch ? 0 : this._duration);

    this._timeoutID = setInterval(this.tick, interval || this._interval);
  }

  stop() {
    if (this._timeoutID) clearInterval(this._timeoutID);

    this._changeStatus('stopped');
  }

  pause() {
    if (this.status !== 'running') return;
    this._pauseTime = Date.now();

    this._changeStatus('paused');
  }

  resume() {
    if (this.status !== 'paused') return;
    this._endTime += Date.now() - this._pauseTime;
    this._pauseTime = 0;

    this._changeStatus('running');
  }

  _changeStatus(status) {
    this._status = status;

    this._emitter.emit('statusChanged', this.status);
  }

  get time() {
    if (this.status === 'stopped') return 0;
    const time = this.status === 'paused' ? this._pauseTime : Date.now();
    const left = this._endTime - time;
    return this._stopwatch ? this._duration - left : left;
  }

  get duration() {
    return this._duration;
  }

  get status() {
    return this._status;
  }

  on(eventName, handler) {
    this._emitter.on(eventName, handler);
  }

  off(eventName, handler) {
    this._emitter.off(eventName, handler);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);
//# sourceMappingURL=tiny-timer.module.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./src/styles/style.scss");
/* harmony import */ var _scripts_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/controller */ "./src/scripts/controller.js");


})();

/******/ })()
;
//# sourceMappingURL=main.js.map