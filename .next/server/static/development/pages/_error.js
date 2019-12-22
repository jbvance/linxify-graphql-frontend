module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/CreateLink.js":
/*!**********************************!*\
  !*** ./components/CreateLink.js ***!
  \**********************************/
/*! exports provided: CREATE_LINK_MUTATION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_LINK_MUTATION", function() { return CREATE_LINK_MUTATION; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "D:\\projects\\linxify\\linxify-graphql-frontend\\components\\CreateLink.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CREATE_LINK_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default.a`
    mutation CREATE_LINK_MUTATION ($url: String!, $title: String, $favIcon: String, $note: String, $category: String) {
    createLink (url: $url, title: $title, favIcon: $favIcon, note: $note, category: $category) {
        id
        url
        title
        favIcon	  
        note    
        category {
        id
        name
        }
  }
}
`;

const CreateLink = () => {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: undefined
  });
};

/* harmony default export */ __webpack_exports__["default"] = (CreateLink);

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! exports provided: validateUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateUrl", function() { return validateUrl; });
/* harmony import */ var url_regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url-regex */ "url-regex");
/* harmony import */ var url_regex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url_regex__WEBPACK_IMPORTED_MODULE_0__);

function validateUrl(url) {
  // return false if not a valid url
  console.log('URL', url);
  return url_regex__WEBPACK_IMPORTED_MODULE_0___default()({
    exact: true
  }).test(url);
}
;

/***/ }),

/***/ "./pages/_error.js":
/*!*************************!*\
  !*** ./pages/_error.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/react-hooks */ "@apollo/react-hooks");
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils */ "./lib/utils.js");
/* harmony import */ var _components_CreateLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/CreateLink */ "./components/CreateLink.js");
var _jsxFileName = "D:\\projects\\linxify\\linxify-graphql-frontend\\pages\\_error.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






function CustomError({
  statusCode,
  urlToSave,
  cookie
}) {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  let tmpUrl = '';
  let url = [];
  let category;
  let token;
  const [createLink, {
    data,
    loading,
    error
  }] = Object(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_2__["useMutation"])(_components_CreateLink__WEBPACK_IMPORTED_MODULE_4__["CREATE_LINK_MUTATION"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (cookie && cookie.includes('token=')) {
      // Assume user is logged in because cookie is present
      token = cookie.split('token=')[1]; //console.log('TOKEN', token);
    }

    if (urlToSave) {
      tmpUrl = urlToSave.replace(/^\/|\/$/g, ''); // check and see if a category was entered (i.e., url is preceded by '--')
      //console.log('URL TO SAVE', tmpUrl);

      if (tmpUrl.includes('--')) {
        url = tmpUrl.split('--')[1];
        category = tmpUrl.split('--')[0];
      } else {
        url = tmpUrl;
      } //console.log('URL and Cat', url, category); 


      createLink({
        variables: {
          url,
          category
        }
      });
    }
  }, []);
  if (data) console.log("DATA", data);
  console.log(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["validateUrl"])(urlToSave.replace(/^\/|\/$/g, '')));
  return __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, "Sorry, there was an error - ", statusCode);
}

const getInitialProps = ctx => {
  let statusCode;
  let urlToSave;
  let cookie; // If the res variable is defined it means nextjs
  // is in server side 

  if (ctx.res) {
    statusCode = ctx.res.statusCode; // A 404 status code could mean that a user entered  linxify.net in front
    // of a url they were at and pressed enter. To  handle this, we need to
    // check and see if the route can be parsed to detect a valid url

    if (statusCode === 404) {
      // this will get passed on to the client when the component
      // mounts, at which point we will check the url and run
      // a mutation to add the link if the url is valid
      urlToSave = ctx.req.url;
      cookie = ctx.req.headers.cookie;
    } // if (statusCode === 404) {
    //   console.log(`CANNOT FIND URL ${req.url}`)
    //   console.log("COOKIES", req.headers.cookie.split('=')[1]);
    //   res.writeHead(302, {
    //     Location: '/'
    //   });
    //   res.end();
    // }

  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode;
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null;
    next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/');
  }

  return {
    statusCode,
    urlToSave,
    cookie
  };
};

CustomError.getInitialProps = getInitialProps;
/* harmony default export */ __webpack_exports__["default"] = (CustomError);

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/_error.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\projects\linxify\linxify-graphql-frontend\pages\_error.js */"./pages/_error.js");


/***/ }),

/***/ "@apollo/react-hooks":
/*!**************************************!*\
  !*** external "@apollo/react-hooks" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/react-hooks");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "url-regex":
/*!****************************!*\
  !*** external "url-regex" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-regex");

/***/ })

/******/ });
//# sourceMappingURL=_error.js.map