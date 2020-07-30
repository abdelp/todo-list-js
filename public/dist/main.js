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

/***/ "./node_modules/pubsub-js/src/pubsub.js":
/*!**********************************************!*\
  !*** ./node_modules/pubsub-js/src/pubsub.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {/**\n * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk\n * License: MIT - http://mrgnrdrck.mit-license.org\n *\n * https://github.com/mroderick/PubSubJS\n */\n\n(function (root, factory){\n    'use strict';\n\n    var PubSub = {};\n    root.PubSub = PubSub;\n\n    var define = root.define;\n\n    factory(PubSub);\n\n    // AMD support\n    if (typeof define === 'function' && define.amd){\n        define(function() { return PubSub; });\n\n        // CommonJS and Node.js module support\n    } else if (true){\n        if (module !== undefined && module.exports) {\n            exports = module.exports = PubSub; // Node.js specific `module.exports`\n        }\n        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec\n        module.exports = exports = PubSub; // CommonJS\n    }\n\n}(( typeof window === 'object' && window ) || this, function (PubSub){\n    'use strict';\n\n    var messages = {},\n        lastUid = -1;\n\n    function hasKeys(obj){\n        var key;\n\n        for (key in obj){\n            if ( obj.hasOwnProperty(key) ){\n                return true;\n            }\n        }\n        return false;\n    }\n\n    /**\n     * Returns a function that throws the passed exception, for use as argument for setTimeout\n     * @alias throwException\n     * @function\n     * @param { Object } ex An Error object\n     */\n    function throwException( ex ){\n        return function reThrowException(){\n            throw ex;\n        };\n    }\n\n    function callSubscriberWithDelayedExceptions( subscriber, message, data ){\n        try {\n            subscriber( message, data );\n        } catch( ex ){\n            setTimeout( throwException( ex ), 0);\n        }\n    }\n\n    function callSubscriberWithImmediateExceptions( subscriber, message, data ){\n        subscriber( message, data );\n    }\n\n    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){\n        var subscribers = messages[matchedMessage],\n            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,\n            s;\n\n        if ( !messages.hasOwnProperty( matchedMessage ) ) {\n            return;\n        }\n\n        for (s in subscribers){\n            if ( subscribers.hasOwnProperty(s)){\n                callSubscriber( subscribers[s], originalMessage, data );\n            }\n        }\n    }\n\n    function createDeliveryFunction( message, data, immediateExceptions ){\n        return function deliverNamespaced(){\n            var topic = String( message ),\n                position = topic.lastIndexOf( '.' );\n\n            // deliver the message as it is now\n            deliverMessage(message, message, data, immediateExceptions);\n\n            // trim the hierarchy and deliver message to each level\n            while( position !== -1 ){\n                topic = topic.substr( 0, position );\n                position = topic.lastIndexOf('.');\n                deliverMessage( message, topic, data, immediateExceptions );\n            }\n        };\n    }\n\n    function messageHasSubscribers( message ){\n        var topic = String( message ),\n            found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),\n            position = topic.lastIndexOf( '.' );\n\n        while ( !found && position !== -1 ){\n            topic = topic.substr( 0, position );\n            position = topic.lastIndexOf( '.' );\n            found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));\n        }\n\n        return found;\n    }\n\n    function publish( message, data, sync, immediateExceptions ){\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        var deliver = createDeliveryFunction( message, data, immediateExceptions ),\n            hasSubscribers = messageHasSubscribers( message );\n\n        if ( !hasSubscribers ){\n            return false;\n        }\n\n        if ( sync === true ){\n            deliver();\n        } else {\n            setTimeout( deliver, 0 );\n        }\n        return true;\n    }\n\n    /**\n     * Publishes the message, passing the data to it's subscribers\n     * @function\n     * @alias publish\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publish = function( message, data ){\n        return publish( message, data, false, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Publishes the message synchronously, passing the data to it's subscribers\n     * @function\n     * @alias publishSync\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publishSync = function( message, data ){\n        return publish( message, data, true, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe\n     * @function\n     * @alias subscribe\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { String }\n     */\n    PubSub.subscribe = function( message, func ){\n        if ( typeof func !== 'function'){\n            return false;\n        }\n\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        // message is not registered yet\n        if ( !messages.hasOwnProperty( message ) ){\n            messages[message] = {};\n        }\n\n        // forcing token as String, to allow for future expansions without breaking usage\n        // and allow for easy use as key names for the 'messages' object\n        var token = 'uid_' + String(++lastUid);\n        messages[message][token] = func;\n        \n        // return token for unsubscribing\n        return token;\n    };\n\n    /**\n     * Subscribes the passed function to the passed message once\n     * @function\n     * @alias subscribeOnce\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { PubSub }\n     */\n    PubSub.subscribeOnce = function( message, func ){\n        var token = PubSub.subscribe( message, function(){\n            // before func apply, unsubscribe message\n            PubSub.unsubscribe( token );\n            func.apply( this, arguments );\n        });\n        return PubSub;\n    };\n\n    /**\n     * Clears all subscriptions\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     */\n    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){\n        messages = {};\n    };\n\n    /**\n     * Clear subscriptions by the topic\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     * @return { int }\n     */\n    PubSub.clearSubscriptions = function clearSubscriptions(topic){\n        var m;\n        for (m in messages){\n            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){\n                delete messages[m];\n            }\n        }\n    };\n\n    /** \n       Count subscriptions by the topic\n     * @function\n     * @public\n     * @alias countSubscriptions\n     * @return { Array }\n    */\n    PubSub.countSubscriptions = function countSubscriptions(topic){\n        var m;\n        var count = 0;\n        for (m in messages){\n            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){\n                count++;\n            }\n        }\n        return count;\n    };\n\n    \n    /** \n       Gets subscriptions by the topic\n     * @function\n     * @public\n     * @alias getSubscriptions\n    */\n    PubSub.getSubscriptions = function getSubscriptions(topic){\n        var m;\n        var list = [];\n        for (m in messages){\n            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){\n                list.push(m);\n            }\n        }\n        return list;\n    };\n\n    /**\n     * Removes subscriptions\n     *\n     * - When passed a token, removes a specific subscription.\n     *\n\t * - When passed a function, removes all subscriptions for that function\n     *\n\t * - When passed a topic, removes all subscriptions for that topic (hierarchy)\n     * @function\n     * @public\n     * @alias subscribeOnce\n     * @param { String | Function } value A token, function or topic to unsubscribe from\n     * @example // Unsubscribing with a token\n     * var token = PubSub.subscribe('mytopic', myFunc);\n     * PubSub.unsubscribe(token);\n     * @example // Unsubscribing with a function\n     * PubSub.unsubscribe(myFunc);\n     * @example // Unsubscribing from a topic\n     * PubSub.unsubscribe('mytopic');\n     */\n    PubSub.unsubscribe = function(value){\n        var descendantTopicExists = function(topic) {\n                var m;\n                for ( m in messages ){\n                    if ( messages.hasOwnProperty(m) && m.indexOf(topic) === 0 ){\n                        // a descendant of the topic exists:\n                        return true;\n                    }\n                }\n\n                return false;\n            },\n            isTopic    = typeof value === 'string' && ( messages.hasOwnProperty(value) || descendantTopicExists(value) ),\n            isToken    = !isTopic && typeof value === 'string',\n            isFunction = typeof value === 'function',\n            result = false,\n            m, message, t;\n\n        if (isTopic){\n            PubSub.clearSubscriptions(value);\n            return;\n        }\n\n        for ( m in messages ){\n            if ( messages.hasOwnProperty( m ) ){\n                message = messages[m];\n\n                if ( isToken && message[value] ){\n                    delete message[value];\n                    result = value;\n                    // tokens are unique, so we can just stop here\n                    break;\n                }\n\n                if (isFunction) {\n                    for ( t in message ){\n                        if (message.hasOwnProperty(t) && message[t] === value){\n                            delete message[t];\n                            result = true;\n                        }\n                    }\n                }\n            }\n        }\n\n        return result;\n    };\n}));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/pubsub-js/src/pubsub.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./public/src/index.js":
/*!*****************************!*\
  !*** ./public/src/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_doman__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/doman */ \"./public/src/modules/doman.js\");\n/* harmony import */ var _modules_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/database */ \"./public/src/modules/database.js\");\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/todo */ \"./public/src/models/todo.js\");\n/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/project */ \"./public/src/models/project.js\");\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/user */ \"./public/src/models/user.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nconst addProject = () => {\n  const formId = 'project-form';\n  const data = _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"getFormValues\"](formId);\n  const userId = _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"getUserId\"]();\n  data.userId = userId;\n  _models_project__WEBPACK_IMPORTED_MODULE_3__[\"create\"](data);\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"cleanForm\"](formId);\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"hideModal\"]('project-modal');\n  pubsub_js__WEBPACK_IMPORTED_MODULE_5___default.a.publish('LOAD PROJECTS');\n};\n\nlet addProjectBtn = document.getElementById('add-project');\naddProjectBtn.onclick = addProject;\n\nconst addTodo = () => {\n  const data = _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"getFormValues\"]('todo-form');\n  const currentProject = _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"getCurrentProject\"]();\n  _models_todo__WEBPACK_IMPORTED_MODULE_2__[\"create\"](currentProject, data);\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"cleanForm\"]('todo-form');\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"hideModal\"]('todo-modal');\n  pubsub_js__WEBPACK_IMPORTED_MODULE_5___default.a.publish('LOAD TODOS',currentProject);\n};\n\nlet addTodoBtn = document.getElementById('add-todo');\naddTodoBtn.onclick = addTodo;\n\nconst userId = _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"getUserId\"]();\n\nif (!userId) {\n  _models_user__WEBPACK_IMPORTED_MODULE_4__[\"create\"]({ userName: 'test' })\n    .then(user => {\n      const data = { title: \"Default\", description: \"This is the default project for your application\", userId: user.id };\n      _models_project__WEBPACK_IMPORTED_MODULE_3__[\"create\"](data)\n        .then(project => {\n          _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"setCurrentProject\"](project.id);\n          _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"setTitle\"](data.title);\n          loadProjects();\n        })\n        .catch(error => {\n          console.log(error);\n        });\n    });\n} else {\n  _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"getDoc\"]('projects', { doc: _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"getCurrentProject\"]() })\n    .then(doc => {\n      _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"setTitle\"](doc[0].title);\n      loadTodos('',doc[0].id)\n    })\n    .catch(error => {\n      console.log(error);\n    });\n}\n\nconst loadProjects = () => {\n  const userId = _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"getUserId\"]();\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"cleanElement\"]('projects-list');\n  _models_project__WEBPACK_IMPORTED_MODULE_3__[\"allProjects\"](userId)\n    .then(result => {\n      const onclickHandler = async function () {\n        _modules_database__WEBPACK_IMPORTED_MODULE_1__[\"setCurrentProject\"](this.id);\n        _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"setTitle\"](this.innerHTML);\n        loadTodos('', this.id);\n      };\n\n      const projectsButtons = result.map(item => _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"createButton\"]({id: item.id, innerText: item.title, onclick: onclickHandler }));\n      const list = _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"createList\"](projectsButtons);\n      _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"addChild\"]('projects-list', list);\n    });\n}\n\nconst loadTodos = async (msg,projectId) => {\n  const todos = await _models_todo__WEBPACK_IMPORTED_MODULE_2__[\"allTodos\"](projectId);\n  let todoCollapses = [];\n\n  todos.forEach(todo => {\n    const todoCollapse = _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"createCollapse\"]({id: todo.id,bodyId:`${todo.id}-body`,innerText: todo.title });\n    todoCollapses.push(todoCollapse);\n  });\n\n  const todoList = _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"createList\"](todosCollapses, 'list-group-item');\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"cleanElement\"]('todo-list');\n  _modules_doman__WEBPACK_IMPORTED_MODULE_0__[\"addChild\"]('todo-list', todoList);\n}\n\nconst projectToken = pubsub_js__WEBPACK_IMPORTED_MODULE_5___default.a.subscribe('LOAD PROJECTS', loadProjects);\nconst todoToken = pubsub_js__WEBPACK_IMPORTED_MODULE_5___default.a.subscribe('LOAD TODOS', loadTodos);\n\nloadProjects();\n\n//# sourceURL=webpack:///./public/src/index.js?");

/***/ }),

/***/ "./public/src/models/project.js":
/*!**************************************!*\
  !*** ./public/src/models/project.js ***!
  \**************************************/
/*! exports provided: create, allProjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allProjects\", function() { return allProjects; });\n/* harmony import */ var _modules_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/database */ \"./public/src/modules/database.js\");\n\n\nconst params = ({title, description, userId, createdAt}) => {\n  return {title, description, userId, createdAt};\n};\n\nconst create = async (data) => {\n  const collection = 'projects';\n  let result;\n  data.createdAt = _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"currentTimestamp\"]();\n\n  try {\n    result = await _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"add\"](collection, params(data));\n  } catch(error) {\n    result = await error;\n  };\n\n  return result;\n};\n\nconst allProjects = async (userId) => {\n  const collection = 'projects';\n  const projects = await _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"getDoc\"](collection, {params: [{key: \"userId\", sign: \"==\", value: userId}], orderBy: {field: \"createdAt\", order: \"desc\"}});\n  return projects;\n}\n\n\n\n//# sourceURL=webpack:///./public/src/models/project.js?");

/***/ }),

/***/ "./public/src/models/todo.js":
/*!***********************************!*\
  !*** ./public/src/models/todo.js ***!
  \***********************************/
/*! exports provided: create, allTodos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allTodos\", function() { return allTodos; });\n/* harmony import */ var _modules_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/database */ \"./public/src/modules/database.js\");\n\n\nconst params = ({title, description, dueDate, priority}) => {\n  return {title, description, dueDate, priority};\n};\n\nconst create = (projectId,data) => {\n  const collection = `projects/${projectId}/todos`;\n  _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"add\"](collection, params(data))\n  .then(result => {\n    console.log(result);\n  })\n  .catch(error => {\n    console.log(error);\n  });\n};\n\nconst allTodos = async (projectId) => {\n  const collection = `projects/${projectId}/todos`;\n  const todos = await _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"getDoc\"](collection);\n  return todos;\n}\n\n\n\n//# sourceURL=webpack:///./public/src/models/todo.js?");

/***/ }),

/***/ "./public/src/models/user.js":
/*!***********************************!*\
  !*** ./public/src/models/user.js ***!
  \***********************************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony import */ var _modules_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/database */ \"./public/src/modules/database.js\");\n\n\nconst params = ({userName, createdAt}) => {\n  return {userName, createdAt};\n};\n\nconst create = async (data) => {\n  const collection = 'users';\n  let result;\n  data.createdAt = _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"currentTimestamp\"]();\n\n  try {\n    result = await _modules_database__WEBPACK_IMPORTED_MODULE_0__[\"add\"](collection, params(data));\n    localStorage.setItem(\"userId\", result.id);\n  } catch(error) {\n    result = await error;\n  };\n\n  return result;\n};\n\n\n\n//# sourceURL=webpack:///./public/src/models/user.js?");

/***/ }),

/***/ "./public/src/modules/database.js":
/*!****************************************!*\
  !*** ./public/src/modules/database.js ***!
  \****************************************/
/*! exports provided: add, getDoc, getUserId, setCurrentProject, getDefaultProject, currentTimestamp, getCurrentProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDoc\", function() { return getDoc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserId\", function() { return getUserId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setCurrentProject\", function() { return setCurrentProject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDefaultProject\", function() { return getDefaultProject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentTimestamp\", function() { return currentTimestamp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCurrentProject\", function() { return getCurrentProject; });\nlet firestore = firebase.firestore();\n\nconst add = async (collection, data) => {\n  let collRef = firestore.collection(collection);\n  let result;\n\n  try {\n    result = await collRef.add(data);\n  }catch(error) {\n    result = await error;\n  };\n\n  return result;\n};\n\nconst setCurrentProject = (projectId) => {\n  localStorage.setItem('currentProject', projectId);\n};\n\nconst getCurrentProject = () => {\n  return localStorage.getItem('currentProject');\n};\n\nconst getDoc = async (collection, params = {}) => {\n  let collectionRef = firestore.collection(collection);\n\n  if(params) {\n    if(params.params) {\n      params.params.forEach(param => {\n        collectionRef = collectionRef.where(param.key, param.sign, param.value);\n      });\n    }\n    if (params.orderBy) {\n      collectionRef = collectionRef.orderBy(params.orderBy.field, params.orderBy.order);\n    }\n    if (params.doc) {\n      collectionRef.doc(params.doc);\n    }\n  }\n\n  let result = [];\n\n  try {\n    const docs = await collectionRef.get();\n\n    docs.forEach(doc => {\n      result.push({id: doc.id, ...doc.data()});\n    });\n  } catch(error) {\n    result = await error;\n  };\n\n  return result;\n};\n\nconst getDefaultProject = async (userId) => {\n  let result;\n\n  try {\n    const params = [{key: \"title\", sign: \"==\", value: \"default\"},\n                    {key: \"userId\", sign: \"==\", value: userId}];\n    result = await getDoc('projects', params);\n  } catch(error) {\n    result = await error;\n  }\n\n  return result[0];\n};\n\nconst getUserId = () => {\n  return localStorage.getItem(\"userId\");\n};\n\nconst currentTimestamp = () => {\n  console.log(firebase.firestore.FieldValue.serverTimestamp());\n  return firebase.firestore.FieldValue.serverTimestamp();\n};\n\n\n\n//# sourceURL=webpack:///./public/src/modules/database.js?");

/***/ }),

/***/ "./public/src/modules/doman.js":
/*!*************************************!*\
  !*** ./public/src/modules/doman.js ***!
  \*************************************/
/*! exports provided: getFormValues, cleanForm, hideModal, createList, addChild, displayTodo, cleanElement, setTitle, createButton, createCollapse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getFormValues\", function() { return getFormValues; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cleanForm\", function() { return cleanForm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hideModal\", function() { return hideModal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createList\", function() { return createList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addChild\", function() { return addChild; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayTodo\", function() { return displayTodo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cleanElement\", function() { return cleanElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTitle\", function() { return setTitle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createButton\", function() { return createButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCollapse\", function() { return createCollapse; });\nconst getFormValues = formId => {\n  const elements = document.getElementById(formId).elements;\n  let obj = {};\n  for(let i = 0; i < elements.length; i++) {\n    const item = elements.item(i);\n    obj[item.name] = item.value;\n  }\n\n  return obj;\n};\n\nconst cleanForm = formId => {\n  let form = document.getElementById(formId);\n  form.reset();\n};\n\nconst hideModal = modalId => {\n  $(`#${modalId}`).modal('hide');\n};\n\nconst createList = (list) => {\n  let ul = document.createElement('ul');\n  ul.className = 'list-group mt-3';\n  list.forEach(item => {\n    let li = document.createElement('li');\n    li.className = 'list-group-item border-0';\n    li.id = item.id;\n    li.appendChild(item);\n    ul.appendChild(li);\n  });\n\n  return ul;\n};\n\nconst setTitle = (title) => {\n  const elem = document.getElementById('project-name');\n  elem.innerHTML = title ;\n};\n\nconst displayTodo = () => {\n  const todos = document.getElementById('todo-list');\n  todos.innerHTML = '';\n};\n\nconst cleanElement = (containerId) => {\n  let container = document.getElementById(containerId);\n  container.innerHTML = '';\n};\n\nconst addChild = (containerId, element) => {\n  let container = document.getElementById(containerId);\n  container.appendChild(element);\n};\n\nconst createButton = (params) => {\n  let btn = document.createElement('button');\n  btn.id = params.id;\n  btn.className = 'btn btn-info w-100';\n  btn.innerText = params.innerText;\n  btn.onclick = params.onclick;\n  btn.type = 'button';\n  return btn;\n};\n\nconst createCollapse = (element,innerElement) => {\n  let container = document.createElement('div');\n  let collapseBtn = document.createElement('button');\n  collapseBtn.className = 'btn btn-secondary w-100 mt-2';\n  collapseBtn.type = 'button';\n  collapseBtn.setAttribute('data-toggle','collapse');\n  collapseBtn.setAttribute('data-target',element.id);\n  collapseBtn.setAttribute('aria-expanded','false');\n  collapseBtn.setAttribute('aria-controls',element.id)\n  collapseBtn.innerText = element.innerText;\n\n  let collapse = document.createElement('div');\n  collapse.className = 'collapse';\n  let collapseBody = document.createElement('div');\n  collapseBody.id  = element.bodyId;\n  collapseBody.className = \"card card-body\";\n  collapseBody.appendChild(innerElement);\n  collapse.appendChild(collapseBody);\n\n  container.appendChild(collapseBtn);\n  container.appendChild(collapse);\n  \n  return container;\n};\n\n\n\n\n//# sourceURL=webpack:///./public/src/modules/doman.js?");

/***/ })

/******/ });