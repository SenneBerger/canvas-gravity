/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
/*
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}
*/
// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
/*
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})
*/
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects


function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: (Math.random() - 0.5) * 25,
    y: 3
  };
  this.friction = 0.8;
  this.gravity = 1;
}

Star.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = 'rgba(255, 255, 255, 1)';
  c.fill();
  c.closePath();
  c.shadowColor = 'white';
  c.shadowBlur = 10;
};

Star.prototype.update = function () {
  this.draw();

  //bounce off bottom
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction;
    this.shatter();
  } else {
    this.velocity.y += this.gravity;
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;

  if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
    this.velocity.x = -this.velocity.x;
  }

  this.x += this.velocity.x;
};

Star.prototype.shatter = function () {
  this.radius -= 2;
  for (var i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 2));
  }
  console.log(miniStars);
};

function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: _utils2.default.randomIntFromRange(-10, 10),
    y: _utils2.default.randomIntFromRange(-32, 32)
  };
  this.friction = 0.8;
  this.gravity = 1;
  this.live = 100;
  this.opac = 1;
}
MiniStar.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = 'rgba(255, 255, 255, ' + this.opac + ')';
  c.fill();
  c.closePath();
  c.shadowColor = 'white';
  c.shadowBlur = 15;
};

MiniStar.prototype.update = function () {
  this.draw();

  //bounce off bottom
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.live -= 1;
  this.opac -= 1 / this.live;
};
// Implementation
var stars = void 0;
var miniStars = void 0;
var moonStar = void 0;
var backStars = void 0;

function init() {
  stars = [];
  miniStars = [];
  moonStar = [];
  backStars = [];
  var x = Math.random() * canvas.width;
  for (var i = 0; i < 8; i++) {
    var y = Math.random() * -850;
    stars.push(new Star(x, y, 16, 'red'));
  }
  for (var _i = 0; _i < 1; _i++) {
    var _x = 20;
    var _y = 50;
    var radius = Math.PI * 50;
    c.shadowColor = 'white';
    c.shadowBlur = 100;
    moonStar.push(new Star(_x, _y, radius, 'white'));
  }
  for (var _i2 = 0; _i2 < 250; _i2++) {
    var _x2 = Math.random() * canvas.width;
    var _y2 = Math.random() * canvas.height;
    var _radius = Math.random() * 2;
    var color = 'rgba(255, 255, 0, 0.3)';
    c.shadowColor = 'white';
    c.shadowBlur = 15;
    backStars.push(new Star(_x2, _y2, _radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(function (star, index) {
    star.update();
    if (star.radius == 0) {
      stars.splice(index, 1);
    }
  });

  miniStars.forEach(function (miniStar, index) {
    miniStar.update();
    if (miniStar.live == 0) {
      miniStars.splice(index, 1);
    }
  });

  moonStar.forEach(function (moonStar) {
    moonStar.draw();
  });
  backStars.forEach(function (backStars, index) {
    backStars.draw();
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map