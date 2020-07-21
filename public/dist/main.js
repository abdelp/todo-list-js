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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/src/index.js":
/*!*****************************!*\
  !*** ./public/src/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_doman__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/doman */ \"./public/src/modules/doman.js\");\n/* harmony import */ var _modules_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/database */ \"./public/src/modules/database.js\");\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/todo */ \"./public/src/models/todo.js\");\n\r\n\r\n\r\n\r\nconst addTodo = () => {\r\n  const data = _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"getFormValues\"]('todo-form');\r\n  _models_todo__WEBPACK_IMPORTED_MODULE_2__[\"create\"]('todo', data);\r\n};\r\n\r\nlet addTodoBtn = document.getElementById('add-todo');\r\naddTodoBtn.onclick = addTodo;\n\n//# sourceURL=webpack:///./public/src/index.js?");

/***/ }),

/***/ "./public/src/models/todo.js":
/*!***********************************!*\
  !*** ./public/src/models/todo.js ***!
  \***********************************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony import */ var _modules_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/database */ \"./public/src/modules/database.js\");\n\r\n\r\nconst params = ({title, desc, dueDate, priority}) => {\r\n  return {title, desc, dueDate, priority};\r\n};\r\n\r\nconst create = (collection, data) => {\r\n  document.body.innerHTML = JSON.stringify(params(data));\r\n  _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"add\"](collection, params(data))\r\n  .then(result => {\r\n    console.log(result);\r\n  })\r\n  .catch(error => {\r\n    console.log(error);\r\n  });\r\n};\r\n\r\nconst Todo = (data) => {\r\n\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./public/src/models/todo.js?");

/***/ }),

/***/ "./public/src/modules/database.js":
/*!****************************************!*\
  !*** ./public/src/modules/database.js ***!
  \****************************************/
/*! exports provided: add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\nlet firestore = firebase.firestore();\r\n\r\nconst add = async (collection, data) => {\r\n  let collRef = firestore.collection(collection);\r\n  let result;\r\n\r\n  try {\r\n    result = await collRef.add(data);\r\n  }catch(error) {\r\n    result = await error;\r\n  };\r\n\r\n  return result;\r\n};\r\n\r\nconst getUserData = async () => {\r\n  let collRef = firestore.collection(collection);\r\n  let result;\r\n\r\n  try {\r\n    result = await collRef.add(data);\r\n  }catch(error) {\r\n    result = await error;\r\n  };\r\n\r\n  return result;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./public/src/modules/database.js?");

/***/ }),

/***/ "./public/src/modules/doman.js":
/*!*************************************!*\
  !*** ./public/src/modules/doman.js ***!
  \*************************************/
/*! exports provided: getFormValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFormValues\", function() { return getFormValues; });\nconst getFormValues = formId => {\r\n  const elements = document.getElementById(formId).elements;\r\n  let obj = {};\r\n  for(let i = 0; i < elements.length; i++) {\r\n    const item = elements.item(i);\r\n    obj[item.name] = item.value;\r\n  }\r\n\r\n  return obj;\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./public/src/modules/doman.js?");

/***/ })

/******/ });