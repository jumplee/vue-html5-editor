/**
 * Vue-html5-editor 1.1.0
 * https://github.com/PeakTai/vue-html5-editor
 * build at Fri Dec 01 2017 16:53:57 GMT+0800 (CST)
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueHtml5Editor = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

var polyfill = function () {
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function value(searchElement, fromIndex) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined')
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If len is 0, return false.
                if (len === 0) {
                    return false
                }

                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;

                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(searchElement, elementK) is true, return true.
                    // c. Increase k by 1.
                    // NOTE: === provides the correct "SameValueZero" comparison needed here.
                    if (o[k] === searchElement) {
                        return true
                    }
                    k++;
                }

                // 8. Return false
                return false
            }
        });
    }
    // text.contains()
    if (!Text.prototype.contains) {
        Text.prototype.contains = function contains(node) {
            return this === node
        };
    }
};

var template = "<div> <button type=\"button\" @click=\"$parent.execCommand('justifyLeft')\"> {{$parent.locale[\"left justify\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('justifyCenter')\"> {{$parent.locale[\"center justify\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('justifyRight')\"> {{$parent.locale[\"right justify\"]}} </button> </div>";

var dashboard = {
    template: template
};

/**
 * text align
 * Created by peak on 16/8/18.
 */
var align = {
    name: 'align',
    icon: 'fa fa-align-center',
    i18n: 'align',
    dashboard: dashboard
};

var template$1 = "<div> <div> <label> <input type=\"radio\" value=\"foreColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"fore color\"]}} </label> <label> <input type=\"radio\" value=\"backColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"background color\"]}} </label> </div> <div> <div v-for=\"color in colors\" :style=\"{'background-color':color}\" class=\"color-card\" @click=\"changeColor(color)\"> </div> <div style=\"clear: both\"></div> </div> </div> ";

__$styleInject(".vue-html5-editor .color-card{margin:2px;width:30px;height:30px;float:left;cursor:pointer}",undefined);

var dashboard$1 = {
    template: template$1,
    data: function data(){
        return {
            // foreColor,backColor
            command: 'foreColor',
            colors: [
                '#000000', '#000033', '#000066', '#000099', '#003300', '#003333', '#003366',
                '#003399', '#006600', '#006633', '#009900', '#330000', '#330033', '#330066',
                '#333300', '#333366', '#660000', '#660033', '#663300', '#666600', '#666633',
                '#666666', '#666699', '#990000', '#990033', '#9900CC', '#996600', '#FFCC00',
                '#FFCCCC', '#FFCC99', '#FFFF00', '#FF9900', '#CCFFCC', '#CCFFFF', '#CCFF99'
            ]
        }
    },
    methods: {
        changeColor: function changeColor(color){
            this.$parent.execCommand(this.command, color);
        }
    }
};

var color = {
    name: 'color',
    icon: 'fa fa-paint-brush',
    i18n: 'color',
    dashboard: dashboard$1
};

/**
 * remove format of selection
 * Created by peak on 16/8/18.
 */
var eraser = {
    name: 'eraser',
    icon: 'fa fa-eraser',
    i18n: 'eraser',
    handler: function handler(editor) {
        editor.execCommand('removeFormat');
    }
};

var template$2 = "<div class=\"dashboard-font\" style=\"line-height: 36px\"> <div> <label>{{$parent.locale[\"heading\"]}}:</label> <button v-for=\"h in 6\" type=\"button\" @click=\"setHeading(h)\">H{{h}}</button> </div> <!-- <div>\n        <label>\n            {{$parent.locale[\"font name\"]}}:\n        </label>\n        <button v-for=\"name in nameList\" type=\"button\" @click=\"setFontName(name)\">{{name}}</button>\n    </div> --> <div> <label> {{$parent.locale[\"font size\"]}}: </label> <button v-for=\"size in fontSizeList\" type=\"button\" @click=\"setFontSize(size)\">{{size}}</button> </div> <div> <label> {{$parent.locale[\"line height\"]}}: </label> <button v-for=\"lh in lineHeightList\" type=\"button\" @click=\"setLineHeight(lh)\"> {{lh}} </button> </div> </div>";

/**
 * Created by peak on 2017/2/14.
 */
var Command = {
    JUSTIFY_LEFT: 'justifyLeft',
    JUSTIFY_CENTER: 'justifyCenter',
    JUSTIFY_RIGHT: 'justifyRight',
    FORE_COLOR: 'foreColor',
    BACK_COLOR: 'backColor',
    REMOVE_FORMAT: 'removeFormat',
    FONT_NAME: 'fontName',
    FONT_SIZE: 'fontSize',
    FORMAT_BLOCK: 'formatBlock',
    LINE_HEIGHT: 'lineHeight',
    INSERT_HORIZONTAL_RULE: 'insertHorizontalRule',
    INSERT_IMAGE: 'insertImage',
    CREATE_LINK: 'createLink',
    INSERT_ORDERED_LIST: 'insertOrderedList',
    INSERT_UNORDERED_LIST: 'insertUnorderedList',
    INSERT_HTML: 'insertHTML',
    BOLD: 'bold',
    ITALIC: 'italic',
    UNDERLINE: 'underline',
    STRIKE_THROUGH: 'strikeThrough',
    SUBSCRIPT: 'subscript',
    SUPERSCRIPT: 'superscript',
    UNDO: 'undo',
    UNLINK: 'unlink',
    INDENT: 'indent'
};

var dashboard$2 = {
    template: template$2,
    data: function data(){
        return {
            nameList: [
                'Microsoft YaHei',
                'Helvetica Neue',
                'Helvetica',
                'Arial',
                'sans-serif',
                'Verdana',
                'Georgia',
                'Times New Roman',
                'Trebuchet MS',
                'Microsoft JhengHei',
                'Courier New',
                'Impact',
                'Comic Sans MS',
                'Consolas'
            ],
            lineHeightList: [
                '1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'
            ],
            fontSizeList: [
                '12px', '14px', '16px', '18px', '20px', '22px', '24px'
            ]
        }
    },
    methods: {
        setFontName: function setFontName(name){
            this.$parent.execCommand('fontName', name);
        },
        setFontSize: function setFontSize(size){
            this.$parent.execCommand('fontSize', size);
        },
        setHeading: function setHeading(heading){
            this.$parent.execCommand('formatBlock', ("h" + heading));
        },
        setLineHeight: function setLineHeight(lh){
            this.$parent.execCommand(Command.LINE_HEIGHT, lh);
        }
    },
    created: function created(){
        var config = this.$options.module.config;
        // font name
        if (!config) {
            return
        }
        if (Array.isArray(config.fontNames)) {
            this.nameList = config.fontNames;
        }
    }
};

var font = {
    name: 'font',
    icon: 'fa fa-font',
    i18n: 'font',
    dashboard: dashboard$2
};

/**
 * toggle full screen mode
 * Created by peak on 16/8/18.
 */
var fullScreen$1 = {
    name: 'full-screen',
    icon: 'fa fa-arrows-alt',
    i18n: 'full screen',
    handler: function handler(editor) {
        editor.toggleFullScreen();
    }
};

/**
 * hr
 * Created by peak on 16/8/20.
 */
var hr = {
    name: 'hr',
    icon: 'fa fa-minus',
    i18n: 'hr',
    handler: function handler(editor) {
        editor.execCommand('insertHorizontalRule');
    }
    // init (editor) {
    //
    // },
    // destroyed(editor){
    //
    // },
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var vueUploader = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		{ module.exports = factory(); }
	else if(typeof undefined === 'function' && undefined.amd)
		{ undefined([], factory); }
	else if(typeof exports === 'object')
		{ exports["VueUploader"] = factory(); }
	else
		{ root["VueUploader"] = factory(); }
})(commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABLCAIAAAB7tddWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Q0VBNzA0MjEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Q0VBNzA0MzEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkY1MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkY2MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K6izdgAAAvpJREFUeNrsnFmPqkAQhWmX667gEp9c/v+/MkSDG+4LrvdcSYgRbw/0ALZQ9WBUJOn+uqvqHGCG3e93hUJRUoSAQBAIAkEgCASBIBAE4neRicEcII51Xb/dbnjPGOt0OqlUKok7ApN3jIKwY6DUIBAEgkAQCALho/X47TeXy8U0TcuyrtdrZKPs9/v2m8FgINYgf9QX/gTV+Xw2DCNKBJKmxmKxsAVc0kEcDgfyGq8CNp/Pa5qWy+WiHG6v13v7/XPt6Ha7Al5D3HQ1Go1sNkvtU8lkMsmtESSoCASBSFqEW/DQ0tbr9W63O51OKK6FQkFV1XQ6nSwQ0OOTyQSvjknZbDaA0mq1QCQafSFFasxmM4eCE1Do0+lUQrcSFggsPhzq20NgsVqtkpIax+MxMs+C/aXruvMxaonND75J9W5hUWWxuYAVdRfTg8EplUphGJywQPAFuBd5Dlhw/aDwwgVtCDgCdzph1QisG+dosVjkn44WYxjGC4XnvBuNRtvt9gtA2Hv47SGsZKVS4ef8eDzG4vMVCrpSgEU3xPbZbDar1erLl1AQ7XabU8xAAXvB3XffBnIHwkR2QcUYq9fr5XIZOxkTg6BEkeNLKdQF7AWPFBy1AoUmu8RG/HmE91nxM+J/ORIr07VcLvf7feCt+stAQGIBRNJtOJolDAhdj/hXGj5+u+TzIKAF+MbkK00XFta2BhDRUE0/9gv8Elogbu4TBW8+nyPhHSeuaVqtVuNQC6TzyQUCXsg0TbfyAxfIKogr9ynP1GJyYQZ57qbg7AuIRfclKZwSlDqWBQSmxM9zFALYh+fFBwJJSkNgqeFxSrAPw+EQ9QJew7Is2Sj8FgSW2nu1gylYPkKRMsRTA+4IcjA2fxsnDkLOq/IfACFP54uP1yAQBIJAEIh4gWCPkHk+GJ7AjU/fICJ+qlIghEfoDwQMtRjvyLYDRih4rsDT+bBM9tP5kuhrzN++e6SqqvCdYUb/SIO6BoEgEASCQBAIAkEgCEQg8VeAAQAB1bbO2qoeewAAAABJRU5ErkJggg==";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 文件上传状态
var isDebug = true;

var counter = 0;

module.exports = {
  UPLOAD_STATUS: {
    WAIT: 0,
    UPLOAD_ING: 1,
    SUCESS: 2,
    FAILED: 3
  },
  log: function log(info) {
    if (isDebug) {
      console.log(info);
    }
  },
  uuid: function uuid() {
    var uuid = 'file-' + counter;
    counter++;
    return uuid;
  },
  queryIndex: function queryIndex(key, value, list) {
    for (var i = 0; i < list.length; i++) {
      if (typeof value === 'function') {
        if (value(list[i])) {
          return i;
        }
      } else {
        if (list[i][key] === value) {
          return i;
        }
      }
    }
  },
  createObjectURL: function createObjectURL() {
    return window.URL.createObjectURL.apply(this, arguments);
  },
  where: function where(key, value, list) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (typeof value === 'function') {
        if (value(list[i])) {
          arr.push(list[i]);
        }
      } else {
        if (list[i][key] === value) {
          arr.push(list[i]);
        }
      }
    }
    return arr;
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  accept: {
    type: Array,
    default: function _default() {
      return ['jpg', 'png', 'gif', 'bmp', 'jpeg'];
    }
  },
  fileAccept: {
    default: 'image/jpg,image/jpeg,image/png,image/gif'
  },
  show: {
    default: false,
    type: Boolean
  },
  url: {
    type: String,
    required: true
  },
  showProgress: {
    default: false,
    type: Boolean
  },
  zIndex: {
    default: 999,
    type: Number
  },
  uploadConfig: {
    default: function _default() {
      return {
        timeout: 20
      };
    },
    type: Object
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

var _ctrl = __webpack_require__(13);

var _ctrl2 = _interopRequireDefault(_ctrl);

var _func = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } }

/**
 * @version 0.1.1 上传组件
 */
var Uploader = function (_Ctrl) {
  _inherits(Uploader, _Ctrl);

  function Uploader(options) {
    _classCallCheck(this, Uploader);

    var _this = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this));

    var self = _this;
    self._files = [];
    self._queue = [];
    self.queueIndex = 0;
    var defaultOptions = {
      uploadUrl: '',
      // 最多选择数量，默认为0不限制
      maxSize: 0,
      // 同时上传的最多数量
      uploadFileMax: 5,
      // 向后台传递的参数
      param: {},
      fileParamName: 'file',
      timeout: 60 * 5,
      // 只接受类型或者正则
      /**
       * @example
       * accept:['jpg','png','bmp','gif','jpeg']
       */
      accept: [],
      // 是否有预览图
      thumb: false,
      // 默认不压缩
      compress: false
    };
    if (!options.uploadUrl) {
      throw Error('上传地址不能为空');
    }
    // 浅拷贝，对象属性会覆盖而不是合并
    self.options = Object.assign({}, defaultOptions, options);
    return _this;
  }

  /**
     * 上传
     */


  _createClass(Uploader, [{
    key: 'upload',
    value: function upload() {
      var self = this;
      var options = self.options;

      if (self.haveUploading()) {
        (0, _func.log)('正在上传，请等待');
        return false;
      }
      var files = self._files;
      var queue = [];
      // 上传的时候将上传失败的文件设置为等待
      files.forEach(function (item) {
        if (item.status === _func.UPLOAD_STATUS.FAILED) {
          item.status = _func.UPLOAD_STATUS.WAIT;
        }
      });

      for (var _i = 0; _i < files.length; _i++) {
        var file = files[_i];
        if (file.status === _func.UPLOAD_STATUS.WAIT) {
          file.index = _i;
          queue.push(file);
        }
      }
      self._queue = queue;
      var len = Math.min(options.uploadFileMax, queue.length);
      for (var i = 0; i < len; i++) {
        self._upload();
      }
    }
  }, {
    key: '_upload',
    value: function _upload() {
      var self = this;
      var file = self._queue[self.queueIndex];
      self.queueIndex++;
      if (typeof file === 'undefined') {
        (0, _func.log)('已经上传到最后');
        return false;
      }
      var options = self.options;
      var xhr = new XMLHttpRequest();
      //超时
      xhr.timeout = options.timeout * 1000;
      var formData = new FormData();
      formData.append(options.fileParamName, file.source);
      for (var key in options.param) {
        formData.append(key, options.param[key]);
      }

      file.status = _func.UPLOAD_STATUS.UPLOAD_ING;
      xhr.onload = function () {
        if (xhr.status < 200 || xhr.status >= 300) {
          (0, _func.log)(xhr.status);
          self.onFail(file);
          // return option.onError(getError(action, option, xhr), getBody(xhr));
        }

        var json = {};
        // 不要将onSuccess或者onError包括道try中
        // 避免回调函数中报错触发catch
        try {
          json = JSON.parse(xhr.responseText);
          if (json.success) {
            self.onSuccess(file, json);
          } else {
            self.onFail(file);
          }
        } catch (e) {
          // 返回的不是json格式
          self.onFail(file);
        }
      };
      function onNetError() {
        self.onFail(file);
      }
      // 无网络等原因导致错误
      xhr.onerror = onNetError;
      // 请求超时
      xhr.ontimeout = onNetError;
      function updateProgress(event) {
        var complete = event.loaded / event.total * 100 | 0;
        file.percent = complete;
        self.trigger('progress', file);
      }
      if (options.showProgress) {
        xhr.upload.onprogress = updateProgress;
      }
      // progress事件需要注册在open之前，否则无响应
      xhr.open('post', options.uploadUrl);
      xhr.send(formData);
    }
    // 是否正在上传

  }, {
    key: 'haveUploading',
    value: function haveUploading() {
      var self = this;
      var haveUploading = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = self._files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.status === _func.UPLOAD_STATUS.UPLOAD_ING) {
            haveUploading = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return haveUploading;
    }
  }, {
    key: 'onEnd',
    value: function onEnd(file) {
      var self = this;
      self._upload();
      // 所有的文件都执行完毕，未必都成功
      if (!self.haveUploading()) {
        var _flag = true;
        self.queueIndex = 0;
        self._files.forEach(function (item) {
          if (item.status === _func.UPLOAD_STATUS.FAILED) {
            _flag = false;
            return false;
          }
        });
        self.trigger('finish', _flag);
      }
    }
  }, {
    key: 'onSuccess',
    value: function onSuccess(file, json) {
      var self = this;
      file.status = _func.UPLOAD_STATUS.SUCESS;
      file.returnJson = json;
      self.trigger('uploadSuccess', file);
      self.onEnd(file);
    }
  }, {
    key: 'onFail',
    value: function onFail(file) {
      var self = this;
      file.status = _func.UPLOAD_STATUS.FAILED;
      self.trigger('uploadFail', file);
      self.onEnd(file);
    }
  }, {
    key: 'addFile',
    value: function addFile(sourceFile) {
      var self = this;
      var options = self.options;
      var ext = sourceFile.name.split('.').pop().toLowerCase();
      if (options.accept.indexOf(ext) < 0) {
        options.onAcceptError({
          name: sourceFile.name,
          ext: ext
        });
        return false;
      }
      var file = {
        source: sourceFile,
        id: (0, _func.uuid)(),
        status: _func.UPLOAD_STATUS.WAIT,
        thumb: '',
        name: sourceFile.name,
        size: sourceFile.size
      };

      self._files.push(file);
      if (options.thumb) {
        if (options.compress) {
          self._makeThumb(file);
        } else {
          file.thumb = (0, _func.createObjectURL)(sourceFile);
        }
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file) {
      var targetIndex = -1;
      this._files.forEach(function (item, index) {
        if (item.id === file.id) {
          targetIndex = index;
        }
      });
      this._files.splice(targetIndex, 1);
    }
  }, {
    key: '_makeThumb',
    value: function _makeThumb(file) {
      this.makeThumb(file.source, function (thumbUrl) {
        file.thumb = thumbUrl;
      });
    }
  }, {
    key: 'makeThumb',
    value: function makeThumb(sourceFile, callback) {
      var thumbOptions = this.options.thumb;
      var blob_url = (0, _func.createObjectURL)(sourceFile);
      var temp_image = new Image();
      var canvas = document.createElement('canvas');
      var preview_width = thumbOptions.width;
      var preview_height = thumbOptions.height;
      temp_image.src = blob_url;
      canvas.width = preview_width;
      canvas.height = preview_height;
      var ctx = canvas.getContext('2d');
      temp_image.onload = function () {
        ctx.drawImage(temp_image, 0, 0, preview_width, preview_height);
        // 清空原来的BLOB对象，释放内存。
        window.URL.revokeObjectURL(this.src);
        // 耗时操作
        var blob_image_url = canvas.toDataURL('image/jpeg');
        callback(blob_image_url);
        // 切除引用关系
        // delete temp_image;
        // delete canvas;
        // delete ctx;
        this.src = null;
        canvas = null;
        ctx = null;
        temp_image.onload = null;
        temp_image = null;
      };
    }
  }, {
    key: 'stop',
    value: function stop() {}
  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this._files;
    }
    /**
     * 将上传队列清空
     */

  }, {
    key: 'clear',
    value: function clear() {
      //
      this._files = [];
    }
  }]);

  return Uploader;
}(_ctrl2.default);

module.exports = Uploader;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		var this$1 = this;

		if(typeof modules === "string")
			{ modules = [[null, modules, ""]]; }
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this$1[i][0];
			if(typeof id === "number")
				{ alreadyImportedModules[id] = true; }
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDJweCcgaGVpZ2h0PSc0MnB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ3JyB5PSc0MCcgd2lkdGg9JzYnIGhlaWdodD0nMjAnIHJ4PSczJyByeT0nMycgZmlsbD0nIzdkN2Q3ZCcgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzBzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMDgzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMTY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMjVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjMzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjQxNjY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjU4MzMzMzMzMzMzMzMzMzRzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjc1cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ3JyB5PSc0MCcgd2lkdGg9JzYnIGhlaWdodD0nMjAnIHJ4PSczJyByeT0nMycgZmlsbD0nIzdkN2Q3ZCcgdHJhbnNmb3JtPSdyb3RhdGUoMzAwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC44MzMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ3JyB5PSc0MCcgd2lkdGg9JzYnIGhlaWdodD0nMjAnIHJ4PSczJyByeT0nMycgZmlsbD0nIzdkN2Q3ZCcgdHJhbnNmb3JtPSdyb3RhdGUoMzMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC45MTY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PC9zdmc+";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAACIUlEQVRYR+2X8VXbMBDGv5ugMEHFBMAETTdgA6wJCBOQTkA6gegG3QCYALqBugGd4PrOuRDjSJbsCGzes/9MzrqfvtN9JxM+yUOfhBMzaOlKzYrOipZW4ND1jOMjEG7A+OstrSd5Ro3jCoRbAEdgXE8S1Di+A+HytSKM797Sw6QU3YMU2qmBBiGnBhqF3IBab+lu9NJr47ioSzB+eEurUUGN4zMQ7uvujj1jg6pPCuRZp+cyfnpLy9EUNY7XIFwlBwPj0VtajAJqHC+05ElOMH55S9VYoM8gnCZK/g9A5S39lrjioKKWTJIYhHG8qmd418N4BHDhLb1sw4qBageLzRgwTppJtsmMYwPCU6LL61K391EE1Dheqkobm1FLaSczjh9A+NZhRbW5h/4/CFQVEhUXrcVffEXHzd+SDaQTKLaJwaB7KrYztBIbx/EGSkAOaiY1alHxIuEt3ld0IjGdYzIDchCoJjYApHt398YQtUIYxx6Er3shOnXSZnqgPdVnFJCLbqxBvNx+guauRp4DOVjRQDcvVeEvgcTihW8vHYw/3lL3jG8tNLiZArCSWOwnBLsLZ8jEMSGf7VK3GKie3TSsflrklrz4ZGpMnzhsZBDkQBdVtAErn7tvb+0DzmVzA+8CGvROxrm39JyjXvERmkqq0+s2NvtT73+Ioo1jsBbr6tvl7U28W+n7qJUTO4PmqNQnZla0j1o5sbOiOSr1ifkPfFnUK5jHM9IAAAAASUVORK5CYII=";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule;
  var scriptExports = rawScriptExports = rawScriptExports || {};

  // ES6 modules interop
  var type = typeof rawScriptExports.default;
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports;
    scriptExports = rawScriptExports.default;
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports;

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render;
    options.staticRenderFns = compiledTemplate.staticRenderFns;
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context = context || (this.$vnode && this.$vnode.ssrContext);
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = injectStyles;
  }

  if (hook) {
    // inject component registration as beforeCreate hook
    var existing = options.beforeCreate;
    options.beforeCreate = existing
      ? [].concat(existing, hook)
      : [hook];
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined';

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(22);

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/};

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
var singletonElement = null;
var singletonCounter = 0;
var isProduction = false;
var noop = function () {};

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction;

  var styles = listToStyles(parentId, list);
  addStylesToDom(styles);

  return function update (newList) {
    var mayRemove = [];
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];
      domStyle.refs--;
      mayRemove.push(domStyle);
    }
    if (newList) {
      styles = listToStyles(parentId, newList);
      addStylesToDom(styles);
    } else {
      styles = [];
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i];
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]();
        }
        delete stylesInDom[domStyle.id];
      }
    }
  }
};

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    if (domStyle) {
      domStyle.refs++;
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]));
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length;
      }
    } else {
      var parts = [];
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]));
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  head.appendChild(styleElement);
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove;
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement);
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++;
    styleElement = singletonElement || (singletonElement = createStyleElement());
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement();
    update = applyToTag.bind(null, styleElement);
    remove = function () {
      styleElement.parentNode.removeChild(styleElement);
    };
  }

  update(obj);

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj);
    } else {
      remove();
    }
  }
}

var replaceText = (function () {
  var textStore = [];

  return function (index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n')
  }
})();

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css;

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = styleElement.childNodes;
    if (childNodes[index]) { styleElement.removeChild(childNodes[index]); }
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index]);
    } else {
      styleElement.appendChild(cssNode);
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    styleElement.setAttribute('media', media);
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false;
function injectStyle (ssrContext) {
  if (disposed) { return }
  __webpack_require__(21);
}
var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-dc035eee",
  /* moduleIdentifier (server only) */
  null
);
Component.options.__file = "/Users/jump/GitHub/vue-image-uploader/src/imageUploader/uploader.vue";
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.");}
if (Component.options.functional) {console.error("[vue-loader] uploader.vue: functional components are not supported with templates, they should use render functions.");}

/* hot reload */
module.exports = Component.exports;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false;
function injectStyle (ssrContext) {
  if (disposed) { return }
  __webpack_require__(20);
}
var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(18),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3a211969",
  /* moduleIdentifier (server only) */
  null
);
Component.options.__file = "/Users/jump/GitHub/vue-image-uploader/src/videoUploader/uploader.vue";
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.");}
if (Component.options.functional) {console.error("[vue-loader] uploader.vue: functional components are not supported with templates, they should use render functions.");}

/* hot reload */
module.exports = Component.exports;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uploader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uploader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__uploader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__func__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__func___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__func__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__props__);



/**
 *  
 *  vue的图片上传组件
 * 
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  props: __WEBPACK_IMPORTED_MODULE_2__props___default.a,
  data: function data() {
    return {
      files: [],
      uploadSuccessNum: 0,
      boxWidth: 0,
      uploadFinish: true,
      showPanelMask: false,
      thumb: true
    };
  },
  created: function created() {
    var self = this;
    var uploader = new __WEBPACK_IMPORTED_MODULE_0__uploader___default.a(Object.assign({}, {
      uploadUrl: self.url,
      accept: self.accept,
      showProgress: self.showProgress,
      thumb: true,
      onAcceptError: function (e) {
        alert(e.ext + '类型文件不符合要求');
      }
    }, self.uploadConfig));
    self._uploader = uploader;
    uploader.on('finish', function (success) {
      self.files = self.files.concat();
      self.uploadFinish = true;
    });
    uploader.on('progress', function (file) {
      // let newFile=Object.assign({},file)
      self.files.splice(file.index, 1, file);
    });
  },

  watch: {
    show: function show(newVal) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__func__["log"])('show:' + newVal);
      // 当重新打开的时候
      if (newVal) {
        this.files = this._uploader.getFiles();
      }
    },
    files: function files(newVal) {
      var num = 0;
      newVal.forEach(function (item) {
        if (item.returnJson && item.returnJson.success) {
          num++;
        }
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__func__["log"])(newVal);
      this.uploadSuccessNum = num;
    }
  },

  methods: {
    selectFile: function (e) {
      var files = e.target.files;
      var self = this;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        self._uploader.addFile(file);
      }
      // 避免vue不更新
      self.files = self._uploader.getFiles();
    },
    up: function () {
      // 没有需要选择的图片
      if (this.files.length - this.uploadSuccessNum > 0) {
        if (this.uploadFinish) {
          this.uploadFinish = false;
          this._uploader.upload();
        }
      } else {
        alert('请选择图片');
      }
    },
    mask: function mask() {
      // this.showPanelMask = true
    },
    del: function (file) {
      this._uploader.removeFile(file);
      this.files = this._uploader.getFiles();
    },
    addFile: function addFile() {
      this.$refs.fileInput.value = null;
      this.$refs.fileInput.click();
    },
    close: function close(cancel) {
      var self = this;
      var files = [];
      if (!cancel) {
        self.files.forEach(function (item) {
          if (item.returnJson && item.returnJson.success) {
            files.push(item.returnJson);
          }
        });
      }
      self.$emit('finish', files);
      self.files = [];
      // 上传状态
      self.uploadFinish = true;
      self.uploadSuccessNum = 0;
      self._uploader.clear();
    },
    percentStyle: function percentStyle(file) {
      return {
        width: file.percent + '%'
      };
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uploader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uploader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__uploader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__func__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__func___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__func__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__props__);



var newProps = Object.assign({}, __WEBPACK_IMPORTED_MODULE_2__props___default.a, {
  accept: {
    type: Array,
    default: function () {
      return ['flv', 'mkv', 'avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'ogg', 'ogv', 'mov', 'wmv', 'mp4', 'webm', 'mp3', 'wav'];
    }
  },
  fileAccept: {
    default: '*'
  },
  uploadConfig: {
    default: function () {
      return {
        // 三十分钟等待
        timeout: 30 * 60
      };
    },
    type: Object
  }
});
/**
 *  
 *  vue的视频上传组件
 * 
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  props: newProps,
  data: function data() {
    return {
      files: [],
      uploadSuccessNum: 0,
      boxWidth: 0,
      uploadFinish: true,
      showPanelMask: false
    };
  },
  created: function created() {
    var self = this;
    var uploader = new __WEBPACK_IMPORTED_MODULE_0__uploader___default.a(Object.assign({}, {
      uploadUrl: self.url,
      accept: self.accept,
      showProgress: self.showProgress,
      onAcceptError: function (e) {
        alert(e.ext + '类型文件不符合要求');
      }
    }, self.uploadConfig));
    self._uploader = uploader;
    uploader.on('finish', function (success) {
      self.files = self.files.concat();
      self.uploadFinish = true;
    });
    uploader.on('progress', function (file) {
      // let newFile=Object.assign({},file)
      self.files.splice(file.index, 1, file);
    });
  },

  watch: {
    show: function show(newVal) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__func__["log"])('show:' + newVal);
      // 当重新打开的时候
      if (newVal) {
        this.files = this._uploader.getFiles();
      }
    },
    files: function files(newVal) {
      var num = 0;
      newVal.forEach(function (item) {
        if (item.returnJson && item.returnJson.success) {
          num++;
        }
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__func__["log"])('files update');
      this.uploadSuccessNum = num;
    }
  },

  methods: {
    selectFile: function (e) {
      var files = e.target.files;
      var self = this;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        self._uploader.addFile(file);
      }
      // 避免vue不更新
      self.files = self._uploader.getFiles();
    },
    up: function () {
      // 没有需要选择的图片
      if (this.files.length - this.uploadSuccessNum > 0) {
        if (this.uploadFinish) {
          this.uploadFinish = false;
          this._uploader.upload();
        }
      } else {
        alert('请选择图片');
      }
    },
    mask: function mask() {
      // this.showPanelMask = true
    },
    del: function (file) {
      this._uploader.removeFile(file);
      this.files = this._uploader.getFiles();
    },
    addFile: function addFile() {
      this.$refs.fileInput.value = null;
      this.$refs.fileInput.click();
    },
    close: function close(cancel) {
      var self = this;
      var files = [];
      if (!cancel) {
        self.files.forEach(function (item) {
          if (item.returnJson && item.returnJson.success) {
            files.push(item.returnJson);
          }
        });
      }
      self.$emit('finish', files);
      self.files = [];
      // 上传状态
      self.uploadFinish = true;
      self.uploadSuccessNum = 0;
      self._uploader.clear();
    },
    percentStyle: function percentStyle(file) {
      return {
        width: file.percent + '%'
      };
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/jeromeetienne/microevent.js
var Ctrl = function () {
  function Ctrl() {
    _classCallCheck(this, Ctrl);

    this.counter = 0;
  }

  _createClass(Ctrl, [{
    key: "on",
    value: function on(event, fct) {
      this._events = this._events || {};
      this._events[event] = this._events[event] || [];
      this._events[event].push(fct);
    }
  }, {
    key: "off",
    value: function off(event, fct) {
      this._events = this._events || {};
      if (event in this._events === false) { return; }
      this._events[event].splice(this._events[event].indexOf(fct), 1);
    }
  }, {
    key: "trigger",
    value: function trigger(event /* , args... */) {
      var arguments$1 = arguments;
      var this$1 = this;

      this._events = this._events || {};
      if (event in this._events === false) { return; }
      for (var i = 0; i < this._events[event].length; i++) {
        this$1._events[event][i].apply(this$1, Array.prototype.slice.call(arguments$1, 1));
      }
    }
  }]);

  return Ctrl;
}();

exports.default = Ctrl;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uploader = __webpack_require__(9);

var _uploader2 = _interopRequireDefault(_uploader);

var _uploader3 = __webpack_require__(10);

var _uploader4 = _interopRequireDefault(_uploader3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  VueImageUploader: _uploader2.default, VueVideoUploader: _uploader4.default
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(true);
// imports


// module
exports.push([module.i, "\n.btn[data-v-3a211969] {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block;\n}\n.btn-disable[data-v-3a211969] {\n  background-color: #eee;\n  border-color: #eee;\n  color: black;\n}\n.mask[data-v-3a211969] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed;\n}\n.place-holder[data-v-3a211969] {\n  text-align: center;\n  margin-top: 200px;\n}\n.panel[data-v-3a211969] {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative;\n}\n.panel .close[data-v-3a211969] {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer;\n}\n.image-list[data-v-3a211969] {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0;\n}\n.image-list[data-v-3a211969]:before, .image-list[data-v-3a211969]:after {\n    content: \" \";\n    display: table;\n}\n.image-list[data-v-3a211969]:after {\n    clear: both;\n}\n.image-item[data-v-3a211969] {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top;\n}\n.image-item .title[data-v-3a211969] {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none;\n}\n.image-item .cover[data-v-3a211969] {\n    height: 100%;\n}\n.image-item .loader[data-v-3a211969] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px;\n}\n.percent[data-v-3a211969] {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n}\n.percent .percent-inner[data-v-3a211969] {\n    height: 4px;\n    background: #20a0ff;\n    width: 0;\n}\nh3[data-v-3a211969] {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative;\n}\n.bottom[data-v-3a211969] {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee;\n}\n.save-btn[data-v-3a211969] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n.panel-mask[data-v-3a211969] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1);\n  position: absolute;\n}\n.ok[data-v-3a211969] {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px;\n}\n@media (max-width: 1300px) {\n.panel[data-v-3a211969] {\n    margin-top: 50px;\n}\n}\n", "", {"version":3,"sources":["/Users/jump/GitHub/vue-image-uploader/src/uploader.scss"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,0BAA0B;EAC1B,sBAAsB;EACtB,aAAa;EACb,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,gBAAgB;EAChB,sBAAsB;CAAE;AAE1B;EACE,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;CAAE;AAEjB;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,gBAAgB;CAAE;AAEpB;EACE,mBAAmB;EACnB,kBAAkB;CAAE;AAEtB;EACE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,0BAA0B;EAC1B,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;CAAE;AAEtB;EACE,cAAc;EACd,eAAe;EACf,cAAc;EACd,iBAAiB;CAAE;AACnB;IACE,aAAa;IACb,eAAe;CAAE;AACnB;IACE,YAAY;CAAE;AAElB;EACE,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,oBAAoB;CAAE;AACtB;IACE,+BAA+B;IAC/B,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,gBAAgB;IAChB,kBAAkB;CAAE;AACtB;IACE,aAAa;CAAE;AACjB;IACE,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;CAAE;AAEzB;EACE,YAAY;EACZ,YAAY;EACZ,qCAAqC;EACrC,mBAAmB;EACnB,UAAU;EACV,QAAQ;CAAE;AACV;IACE,YAAY;IACZ,oBAAoB;IACpB,SAAS;CAAE;AAEf;EACE,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B;CAAE;AAE/B;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CAAE;AAEd;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,YAAY;CAAE;AAEhB;AACE;IACE,iBAAiB;CAAE;CAAE","file":"uploader.scss","sourcesContent":[".btn {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block; }\n\n.btn-disable {\n  background-color: #eee;\n  border-color: #eee;\n  color: black; }\n\n.mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed; }\n\n.place-holder {\n  text-align: center;\n  margin-top: 200px; }\n\n.panel {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative; }\n  .panel .close {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer; }\n\n.image-list {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0; }\n  .image-list:before, .image-list:after {\n    content: \" \";\n    display: table; }\n  .image-list:after {\n    clear: both; }\n\n.image-item {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top; }\n  .image-item .title {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .image-item .cover {\n    height: 100%; }\n  .image-item .loader {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px; }\n\n.percent {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0; }\n  .percent .percent-inner {\n    height: 4px;\n    background: #20a0ff;\n    width: 0; }\n\nh3 {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative; }\n\n.bottom {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee; }\n\n.save-btn {\n  position: absolute;\n  right: 15px;\n  top: 10px; }\n\n.panel-mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1);\n  position: absolute; }\n\n.ok {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px; }\n\n@media (max-width: 1300px) {\n  .panel {\n    margin-top: 50px; } }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(true);
// imports


// module
exports.push([module.i, "\n.btn[data-v-dc035eee] {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block;\n}\n.btn-disable[data-v-dc035eee] {\n  background-color: #eee;\n  border-color: #eee;\n  color: black;\n}\n.mask[data-v-dc035eee] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed;\n}\n.place-holder[data-v-dc035eee] {\n  text-align: center;\n  margin-top: 200px;\n}\n.panel[data-v-dc035eee] {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative;\n}\n.panel .close[data-v-dc035eee] {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer;\n}\n.image-list[data-v-dc035eee] {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0;\n}\n.image-list[data-v-dc035eee]:before, .image-list[data-v-dc035eee]:after {\n    content: \" \";\n    display: table;\n}\n.image-list[data-v-dc035eee]:after {\n    clear: both;\n}\n.image-item[data-v-dc035eee] {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top;\n}\n.image-item .title[data-v-dc035eee] {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none;\n}\n.image-item .cover[data-v-dc035eee] {\n    height: 100%;\n}\n.image-item .loader[data-v-dc035eee] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px;\n}\n.percent[data-v-dc035eee] {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n}\n.percent .percent-inner[data-v-dc035eee] {\n    height: 4px;\n    background: #20a0ff;\n    width: 0;\n}\nh3[data-v-dc035eee] {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative;\n}\n.bottom[data-v-dc035eee] {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee;\n}\n.save-btn[data-v-dc035eee] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n.panel-mask[data-v-dc035eee] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1);\n  position: absolute;\n}\n.ok[data-v-dc035eee] {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px;\n}\n@media (max-width: 1300px) {\n.panel[data-v-dc035eee] {\n    margin-top: 50px;\n}\n}\n", "", {"version":3,"sources":["/Users/jump/GitHub/vue-image-uploader/src/uploader.scss"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,0BAA0B;EAC1B,sBAAsB;EACtB,aAAa;EACb,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,gBAAgB;EAChB,sBAAsB;CAAE;AAE1B;EACE,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;CAAE;AAEjB;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,gBAAgB;CAAE;AAEpB;EACE,mBAAmB;EACnB,kBAAkB;CAAE;AAEtB;EACE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,0BAA0B;EAC1B,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;CAAE;AAEtB;EACE,cAAc;EACd,eAAe;EACf,cAAc;EACd,iBAAiB;CAAE;AACnB;IACE,aAAa;IACb,eAAe;CAAE;AACnB;IACE,YAAY;CAAE;AAElB;EACE,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,oBAAoB;CAAE;AACtB;IACE,+BAA+B;IAC/B,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,gBAAgB;IAChB,kBAAkB;CAAE;AACtB;IACE,aAAa;CAAE;AACjB;IACE,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;CAAE;AAEzB;EACE,YAAY;EACZ,YAAY;EACZ,qCAAqC;EACrC,mBAAmB;EACnB,UAAU;EACV,QAAQ;CAAE;AACV;IACE,YAAY;IACZ,oBAAoB;IACpB,SAAS;CAAE;AAEf;EACE,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B;CAAE;AAE/B;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CAAE;AAEd;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,YAAY;CAAE;AAEhB;AACE;IACE,iBAAiB;CAAE;CAAE","file":"uploader.scss","sourcesContent":[".btn {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block; }\n\n.btn-disable {\n  background-color: #eee;\n  border-color: #eee;\n  color: black; }\n\n.mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed; }\n\n.place-holder {\n  text-align: center;\n  margin-top: 200px; }\n\n.panel {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative; }\n  .panel .close {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer; }\n\n.image-list {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0; }\n  .image-list:before, .image-list:after {\n    content: \" \";\n    display: table; }\n  .image-list:after {\n    clear: both; }\n\n.image-item {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top; }\n  .image-item .title {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .image-item .cover {\n    height: 100%; }\n  .image-item .loader {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px; }\n\n.percent {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0; }\n  .percent .percent-inner {\n    height: 4px;\n    background: #20a0ff;\n    width: 0; }\n\nh3 {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative; }\n\n.bottom {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee; }\n\n.save-btn {\n  position: absolute;\n  right: 15px;\n  top: 10px; }\n\n.panel-mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1);\n  position: absolute; }\n\n.ok {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px; }\n\n@media (max-width: 1300px) {\n  .panel {\n    margin-top: 50px; } }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAIoElEQVR4Xu2df4wcZRnHv8/sHucVr7ez4Bl+RSo32xIjYjQhSOIPDP4AxAQS0aghBE293ZNAE0XxBy2okRKttrdzd0ATkhYplGKCRg3/SPyD+mfREO3MXdso/kg0u9egaWtv5zHbE2Og3sy7+7x789489++8z/d9nu/zuXlnZ9+dIehfoR2gQlevxUMBKDgECoACUHAHCl6+ngEUgII7UPDy9QygAAzGgWozvpsJ7wf4CgJdOphZ3ZqFwS8C9FLC+PHxRvD0ILK3fgbwwyNXEC/tA9Hlgyho7czBB7hUuqO9+bLjNmuyCoC/a+Ht5HUOguhcm0WsVW0G/6Y9MnQVbt9w0laNVgGoNqPfgWiTreQLocv0QKsx8U1btVoDYGw2uq6U0HO2Ei+KLjMW243At1WvNQD8ZryLCFO2Ei+SbkL4wOJk8LyNmq0BUA2jpwG6xUbSxdOkza36xMM26rYGgN+MnyXCx2wkXTRNBr7WrgffsVG3AmDDVWFNBUDYUNfkFADXOiacrwIgbKhrcgqAax0TztdNAML42wCuEfaimHKMR9qN4HEbxVv7FGAjWdWUd0ABkPfUKUUFwKl2ySerAMh76pSiAuBUu+STVQDkPXVKsWcA1s0du2C4k0wwdUpOVbzGkvU6ONWisd+iMf6PXkozAuCNM/Pj5yTJgwy6gQhv6mVCjbHjADMfZaLHFuvB/SYzZAagOhN/mJl/RKCqyQQ6drAOMPMhgndTqzHxxywzZwJg/XR0VdmjX2cR1DGr7wAz5tsYe2eWZSETAH4YHSLQO1a/NM0gswOEra3JYFva+FQAqtPx1fDwQpqQHs+bA/yXVr12YVpWqQD4YfxVAqxsR0pLTo/358DpUvnyVzZv+P1KKhkAiLYT6Ev9paLRq+EAg65v1yd+3hcA1TDeAeCu1ShA5+zTgQS3tqaCpxSAPn10NlwBcLZ1MokrADI+OquiADjbOpnEFQAZH51VUQCcbZ1M4gqAjI/OqigAzrZOJnEFQMZHZ1UUAGdbJ5O4AiDjo7MqCoCzrZNJXAGQ8dFZFQXA2dbJJC4BQCWMv+cBW2QyGqwKg2bB/DMCHWq9YWlx7FS55iG5jUBfHGwmqzbbJ1r1YP9Ks6duCHESAMZfwbi5NRUcPFvxo+GRjUPc2QvCu1etNYOZuH8AXNsQwuC/nyS+8sTkxj+t6PFWLvvj89vA+AoRvMH0Y8CzSCwBzgFA9Kn25MS+rFYvb3rl/QBdlDXGmXESALi0BDD4WLte22DaIH9uYQydziyBPmkam/PxAktAM/4+CHfnvNAz6TF4V7teu7PXXCsz8Wc95iZAo71q5CpO4gzg0hKQAPeZ/jbutQ1bt+sPFw6XTu0n4D25amYvyUgA4NgS8OV2vfZQL169NsYP43sJ6D7oyuU/gSXAoW3hzHxPu1HbLtWxSjO6kggHCPRWKc2B6kicAVxaAqQBONOsuT+v85f++QMifH6gzZOYTAGQcHFZw5+JbkRCe4hQkVO1rKQAyBp87iNH3jz8r6XHQfRBWWVLagqAHWMrYXwXMb5LhGE7MwipKgBCRp5FZnTu6KahpdPP5Pp1eAqAPQDOKD/10jnVvw1vZ+I7CUj9Ys1yNq+XVwAGY/nYzPy1JeYnAIwPZsaMs0gAUNQbQRkt/u+w0bnD5w91vF8AeJdprMXxAjeCXPouQPhGkGljqjvj9VzmX+XmeUp6BjBtYf/j188uBOUkifpXElEQOAMU+FZwry3IzSvzJM4AVV0CjDnww+gLBJoxDpQOEAFAzwDGbak25z8C4hUfzmQs2kuABAD6KcDc+UoYv88DrLzr1zCb/q8BFABDywFUwvnbPPBj5pHiEf0DUPivg3voiR/Gewj4TA+hsiESS4BeBJr1pLLjaIWGl44RMGYWaWG0BAC6BJg1xg+jnxDoRrMoa6N1CbBm7VmE/Wa8lwifHuScK84lcQbQa4D0di6/SYX3gPCh9NEDHKEA2Dd7bDa6zkvQfZPK+fZnM5xBATA0zGT4zni4WqIHc7sXoFuLAmDS0exjR6cXamVKniHC27JHrcJIBUDedL8ZbSbQDhBG5NWFFRUAOUOXP9+f3kugG+RULSspADIG+zPz1xAn3Z+QXyCjOCAVBaBPo5cfInE/GPc4+RAJBaB3ACrTR97ieZ0DOdvjZ1aQBAAu3QpOwN9YrNe+ZebS60dXwuh2D/jhGnhOQP+3gl0CgBlhuxE0egVgeVMnHibg1l41chbXPwAu3QoG+HCrXtvUSxO6r8ctedhHoEt7ic9ljMQS4BYAQMJ07WJj4peZG7KVvcp4fC8x7iOicuY4FwZKAODSEtDtCYNfbJ8cuRpbLjmR1qNqc/4SRrKXiN6bNtbR4/0vAa4BsAwBnm3Xg4+v1LRKc+FmQrLbqd/7m1NYTAD+A8ELCWPb8Ubw3P/6Vt0ZX8xlfmgNPhLubHgUF4BX3WBggRjPJ4TjBK7laLeO+f+zeUT/ALh2EWju0RqOkLgIVAAcBkQBcLh5EqkrABIuOqyhADjcPInUFQAJFx3WUAAcbp5E6gqAhIsOaygADjdPInUFQMJFhzUUAIebJ5G6AiDhosMaCoDDzZNIXQGQcNFhDQXA4eZJpK4ASLjosIYMANEDAH3dYRuKmzrTR1uNie4DrP/vX+oz7qvN+A4QHi2ui+5WfjrxNr4yddmKzy1OBWBk5vBFI+y97K4NBc2cEbUawca06lMB6Ar4YfREQTZRpvnlznHG51qNYHdawpkAGJ1++bwhOnEIhIvTBPX46jvA4J+2J4ObQMRp2WQCoCuyvJ0aT66Jd+qmueLyccaOViPYkrWEzAC8KnjmohB8PROdl3USHWfdASbGAhi7W1PBQZPZjAEwEdex+XdAAch/j6xmqABYtTf/4gpA/ntkNUMFwKq9+RdXAPLfI6sZKgBW7c2/uAKQ/x5ZzVABsGpv/sX/DbvSIr1E/hAuAAAAAElFTkSuQmCC";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "mask",
    style: ({
      zIndex: _vm.zIndex
    })
  }, [_c('div', {
    staticClass: "panel"
  }, [(_vm.showPanelMask) ? _c('div', {
    staticClass: "panel-mask"
  }) : _vm._e(), _vm._v(" "), _c('h3', [_vm._v("选择视频\n                "), _c('span', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.close(true);
      }
    }
  }, [_vm._v("×")])]), _vm._v(" "), _c('div', {
    ref: "frame",
    staticClass: "image-list"
  }, [(_vm.files.length === 0) ? [_c('div', {
    staticClass: "place-holder"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(0),
      "alt": ""
    },
    on: {
      "click": _vm.addFile
    }
  }), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "btn",
    on: {
      "click": _vm.addFile
    }
  }, [_vm._v("请添加视频")])])])] : _vm._e(), _vm._v(" "), _vm._l((_vm.files), function(file) {
    return _c('div', {
      staticClass: "image-item"
    }, [_c('div', {
      staticClass: "title"
    }, [(file.status === 2) ? [_c('span', [_vm._v("上传成功")])] : _vm._e(), _vm._v(" "), (file.status === 3) ? [_c('span', [_vm._v("上传失败")])] : _vm._e(), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "right"
      },
      on: {
        "click": function($event) {
          _vm.del(file);
        }
      }
    }, [_vm._v("删除")])], 2), _vm._v(" "), (file.status === 1) ? [_c('img', {
      staticClass: "loader",
      attrs: {
        "src": __webpack_require__(5),
        "alt": ""
      }
    })] : _vm._e(), _vm._v(" "), _c('img', {
      staticClass: "cover",
      staticStyle: {
        "height": "64px",
        "margin-top": "36px"
      },
      attrs: {
        "src": __webpack_require__(17),
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "name"
    }, [_vm._v(_vm._s(file.name))]), _vm._v(" "), (file.percent && _vm.showProgress) ? _c('div', {
      staticClass: "percent"
    }, [_c('div', {
      staticClass: "percent-inner",
      style: (_vm.percentStyle(file))
    })]) : _vm._e(), _vm._v(" "), (file.status === 2) ? _c('img', {
      staticClass: "ok",
      attrs: {
        "src": __webpack_require__(6),
        "alt": ""
      }
    }) : _vm._e()], 2)
  }), _vm._v(" "), (_vm.files.length > 0) ? _c('div', {
    staticClass: "image-item",
    on: {
      "click": _vm.addFile
    }
  }, [_c('img', {
    staticStyle: {
      "margin-top": "25px"
    },
    attrs: {
      "src": __webpack_require__(0),
      "alt": "添加视频"
    }
  })]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "bottom"
  }, [_vm._v("\n                选择" + _vm._s(_vm.files.length) + "个视频，需要上传 " + _vm._s(_vm.files.length - _vm.uploadSuccessNum) + "个\n                "), (_vm.uploadFinish) ? [_c('span', {
    staticClass: "btn",
    staticStyle: {
      "margin-left": "15px"
    },
    on: {
      "click": function($event) {
        _vm.up();
      }
    }
  }, [_vm._v("\n                        上传\n                    ")])] : _vm._e(), _vm._v(" "), (!_vm.uploadFinish) ? [_c('span', {
    staticClass: "btn btn-disable",
    staticStyle: {
      "margin-left": "15px"
    },
    on: {
      "click": function($event) {
        _vm.up();
      }
    }
  }, [_vm._v("\n                        上传中...\n                    ")])] : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "btn save-btn",
    on: {
      "click": function($event) {
        _vm.close();
      }
    }
  }, [_vm._v("确 认")]), _vm._v(" "), _c('input', {
    ref: "fileInput",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "type": "file",
      "multiple": ""
    },
    on: {
      "change": _vm.selectFile
    }
  })], 2)])])])
},staticRenderFns: []};
module.exports.render._withStripped = true;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "mask",
    style: ({
      zIndex: _vm.zIndex
    })
  }, [_c('div', {
    staticClass: "panel"
  }, [(_vm.showPanelMask) ? _c('div', {
    staticClass: "panel-mask"
  }) : _vm._e(), _vm._v(" "), _c('h3', [_vm._v("选择图片\n                "), _c('span', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.close(true);
      }
    }
  }, [_vm._v("×")])]), _vm._v(" "), _c('div', {
    ref: "frame",
    staticClass: "image-list"
  }, [(_vm.files.length === 0) ? [_c('div', {
    staticClass: "place-holder"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(0),
      "alt": ""
    },
    on: {
      "click": _vm.addFile
    }
  }), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "btn",
    on: {
      "click": _vm.addFile
    }
  }, [_vm._v("请添加图片")])])])] : _vm._e(), _vm._v(" "), _vm._l((_vm.files), function(file) {
    return _c('div', {
      staticClass: "image-item"
    }, [_c('div', {
      staticClass: "title"
    }, [(file.status === 2) ? [_c('span', [_vm._v("上传成功")])] : _vm._e(), _vm._v(" "), (file.status === 3) ? [_c('span', [_vm._v("上传失败")])] : _vm._e(), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "right"
      },
      on: {
        "click": function($event) {
          _vm.del(file);
        }
      }
    }, [_vm._v("删除")])], 2), _vm._v(" "), (file.status === 1) ? [_c('img', {
      staticClass: "loader",
      attrs: {
        "src": __webpack_require__(5),
        "alt": ""
      }
    })] : _vm._e(), _vm._v(" "), _c('img', {
      staticClass: "cover",
      attrs: {
        "src": file.thumb,
        "alt": ""
      }
    }), _vm._v(" "), (file.percent && _vm.showProgress) ? _c('div', {
      staticClass: "percent"
    }, [_c('div', {
      staticClass: "percent-inner",
      style: (_vm.percentStyle(file))
    })]) : _vm._e(), _vm._v(" "), (file.status === 2) ? _c('img', {
      staticClass: "ok",
      attrs: {
        "src": __webpack_require__(6),
        "alt": ""
      }
    }) : _vm._e()], 2)
  }), _vm._v(" "), (_vm.files.length > 0) ? _c('div', {
    staticClass: "image-item",
    on: {
      "click": _vm.addFile
    }
  }, [_c('img', {
    staticStyle: {
      "margin-top": "25px"
    },
    attrs: {
      "src": __webpack_require__(0),
      "alt": "添加视频"
    }
  })]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "bottom"
  }, [_vm._v("\n                选择" + _vm._s(_vm.files.length) + "个图片，需要上传 " + _vm._s(_vm.files.length - _vm.uploadSuccessNum) + "个\n                "), (_vm.uploadFinish) ? [_c('span', {
    staticClass: "btn",
    staticStyle: {
      "margin-left": "15px"
    },
    on: {
      "click": function($event) {
        _vm.up();
      }
    }
  }, [_vm._v("\n                        上传\n                    ")])] : _vm._e(), _vm._v(" "), (!_vm.uploadFinish) ? [_c('span', {
    staticClass: "btn btn-disable",
    staticStyle: {
      "margin-left": "15px"
    },
    on: {
      "click": function($event) {
        _vm.up();
      }
    }
  }, [_vm._v("\n                        上传中...\n                    ")])] : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "btn save-btn",
    on: {
      "click": function($event) {
        _vm.close();
      }
    }
  }, [_vm._v("确 认")]), _vm._v(" "), _c('input', {
    ref: "fileInput",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "accept": _vm.fileAccept,
      "type": "file",
      "multiple": ""
    },
    on: {
      "change": _vm.selectFile
    }
  })], 2)])])])
},staticRenderFns: []};
module.exports.render._withStripped = true;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') { content = [[module.i, content, '']]; }
if(content.locals) { module.exports = content.locals; }
// add the styles to the DOM
var update = __webpack_require__(8)("76afde56", content, false);
// Hot Module Replacement


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') { content = [[module.i, content, '']]; }
if(content.locals) { module.exports = content.locals; }
// add the styles to the DOM
var update = __webpack_require__(8)("5738d860", content, false);
// Hot Module Replacement


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles
};


/***/ })
/******/ ]);
});
});

var vueUploader$1 = unwrapExports(vueUploader);

var template$3 = "<div> <image-uploader :show-progress=\"true\" :show=\"true\" :url=\"serverUrl\" @finish=\"onFinish\"></image-uploader> </div>";

var dashboard$3 = {
    template: template$3,
    components: {
        'image-uploader': vueUploader$1.VueImageUploader
    },
    data: function data() {
        var config = this.$options.module.config;
        return {
            imageUrl: '',
            showDialog: false,
            serverUrl: config.url
        }
    },
    methods: {
        insertImageUrl: function insertImageUrl() {
            if (!this.imageUrl) {
                return
            }
            this.insertImg(this.imageUrl);
            this.imageUrl = null;
        },
        onFinish: function onFinish(files) {
            var self = this;
            var config = self.$options.module.config;
            var returnUrl = 'path';
            if (config.returnUrl){
                returnUrl = config.returnUrl;
            }
            self.$parent.dashboard = null;
            var urlAr = [];
            files.forEach(function (item) {
                urlAr.push(item[returnUrl]);
            });

            if (urlAr.length > 0){
                this.insertImg(urlAr);
            }
        },
        insertImg: function insertImg(url) {
            this.$parent.execCommand(Command.INSERT_IMAGE, url);
        }
    }
};

var image = {
    name: 'image',
    icon: 'fa fa-file-image-o',
    i18n: 'image',
    config: {

    },
    dashboard: dashboard$3
};

var template$4 = "<div> <h3 style=\"text-align: center\">Vue-html5-editor&nbsp;{{version}}</h3> <p style=\"text-align: center\"> repository: <a href=\"https://github.com/PeakTai/vue-html5-editor\" target=\"_blank\"> https://github.com/PeakTai/vue-html5-editor </a> </p> </div> ";

var dashboard$4 = {
    template: template$4,
    data: function data(){
        return {
            version: "1.1.0"
        }
    }
};

/**
 * editor info
 * Created by peak on 16/8/18.
 */
var info = {
    name: 'info',
    icon: 'fa fa-info',
    i18n: 'info',
    // handler () {
    //
    // },
    // init (editor) {
    //
    // },
    // destroyed(editor){
    //
    // },
    dashboard: dashboard$4
};

var template$5 = "<form @submit.prevent=\"createLink\"> <input type=\"text\" :placeholder=\"$parent.locale['please enter a url']\" v-model=\"url\" maxlength=\"1024\"> <button type=\"submit\">{{$parent.locale[\"create link\"]}}</button> </form>";

var dashboard$5 = {
    template: template$5,
    data: function data(){
        return {url: null}
    },
    methods: {
        createLink: function createLink(){
            if (!this.url) {
                return
            }
            this.$parent.execCommand('createLink', this.url);
            this.url = null;
        }
    }
};

/**
 * create link
 * Created by peak on 16/8/18.
 */
var link = {
    name: 'link',
    icon: 'fa fa-chain',
    i18n: 'link',
    dashboard: dashboard$5
};

var template$6 = "<div> <button type=\"button\" @click=\"$parent.execCommand('insertOrderedList')\"> {{$parent.locale[\"ordered list\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('insertUnorderedList')\"> {{$parent.locale[\"unordered list\"]}} </button> </div>";

var dashboard$6 = {
    template: template$6
};

/**
 * list,ul,ol
 * Created by peak on 16/8/18.
 */
var list = {
    name: 'list',
    icon: 'fa fa-list',
    i18n: 'list',
    dashboard: dashboard$6
};

var template$7 = "<form @submit.prevent=\"insertTable\"> <label> {{$parent.locale[\"row count\"]}} <input type=\"number\" style=\"width: 60px\" maxlength=\"2\" min=\"2\" max=\"10\" v-model=\"rows\"> </label> <label> {{$parent.locale[\"column count\"]}} <input type=\"number\" style=\"width: 60px\" maxlength=\"2\" min=\"2\" max=\"10\" v-model=\"cols\"> </label> <button type=\"submit\">{{$parent.locale.save}}</button> </form>";

var dashboard$7 = {
    template: template$7,
    data: function data(){
        return {
            rows: 2,
            cols: 2,
            hasHead: false,
            striped: false,
            hover: false
        }
    },
    methods: {
        insertTable: function insertTable(){
            if (this.rows < 2 || this.rows > 10) {
                return
            }
            if (this.cols < 2 || this.cols > 10) {
                return
            }
            var table = '<table style="border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 100%; margin-bottom: 0px; border: 1px solid rgb(221, 221, 221); color: rgb(51, 51, 51); font-size: 14px; line-height: 20px; background-color: transparent;"><tbody>';
            for (var i = 0; i < this.rows; i++) {
                table += '<tr>';
                for (var j = 0; j < this.cols; j++) {
                    table += '<td style="padding: 8px; line-height: 1.42857; vertical-align: top; border: 1px solid rgb(221, 221, 221);">&nbsp;</td>';
                }
                table += '</tr>';
            }
            table += '</tbody></table>';
            this.$parent.execCommand('insertHTML', table);
        }
    }
};

var table = {
    // can not named table
    // dashboard.html will add to editor as a child component and named as module name
    // Do not use built-in or reserved HTML elements as component id
    name: 'tabulation',
    icon: 'fa fa-table',
    i18n: 'table',
    dashboard: dashboard$7
};

var template$8 = "<div> <button type=\"button\" @click=\"$parent.execCommand('bold')\">{{$parent.locale[\"bold\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('italic')\">{{$parent.locale[\"italic\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('underline')\">{{$parent.locale[\"underline\"]}}</button> <button type=\"button\" @click=\"$parent.execCommand('strikeThrough')\">{{$parent.locale[\"strike through\"]}} </button> <!-- <button type=\"button\" @click=\"$parent.execCommand('subscript')\">{{$parent.locale[\"subscript\"]}}</button>\n    <button type=\"button\" @click=\"$parent.execCommand('superscript')\">{{$parent.locale[\"superscript\"]}}</button> --> </div> ";

var dashboard$8 = {
    template: template$8
};

/**
 * text,set the text bold or italic or underline or with strike through or subscript or superscript
 * Created by peak on 16/8/18.
 */
var text = {
    name: 'text',
    icon: 'fa fa-pencil',
    i18n: 'text',
    dashboard: dashboard$8
};

/**
 * undo
 * Created by peak on 16/8/20.
 */
var undo = {
    name: 'undo',
    icon: 'fa-undo fa',
    i18n: 'undo',
    handler: function handler(editor) {
        editor.execCommand('undo');
    }
};

/**
 * unlink
 * Created by peak on 16/8/18.
 */
var unlink = {
    name: 'unlink',
    icon: 'fa fa-chain-broken',
    i18n: 'unlink',
    handler: function handler(editor) {
        editor.execCommand('unlink');
    }
};

var template$9 = "<div> <video-uploader :show-progress=\"true\" :show=\"true\" :url=\"serverUrl\" @finish=\"onFinish\"></video-uploader> </div>";

var dashboard$9 = {
    template: template$9,
    components: {
        'video-uploader': vueUploader$1.VueVideoUploader
    },
    data: function data() {
        var config = this.$options.module.config;
        return {
            imageUrl: '',
            showDialog: false,
            serverUrl: config.url
        }
    },
    methods: {
        insertImageUrl: function insertImageUrl() {
            if (!this.imageUrl) {
                return
            }
            this.insertImg(this.imageUrl);
            this.imageUrl = null;
        },
        onFinish: function onFinish(files) {
            var self = this;
            var config = self.$options.module.config;
            var returnUrl = 'path';
            if (config.returnUrl){
                returnUrl = config.returnUrl;
            }
            var urlAr = [];
            files.forEach(function (item) {
                urlAr.push({
                    url: item[returnUrl],
                    videoUrl: item.video_path
                });
            });

            self.$parent.dashboard = null;
            this.insertImg(urlAr);
        },
        insertImg: function insertImg(urlAr) {
            this.$parent.execCommand(Command.INSERT_VIDEO, urlAr);
        }
    }
};

var video = {
    name: 'video',
    icon: 'fa fa-file-video-o',
    i18n: 'video',
    config: {

    },
    dashboard: dashboard$9
};

/**
 * indent
 * 缩进功能
 */
var indent = {
    name: 'indent',
    icon: 'fa-indent fa',
    i18n: 'indent',
    handler: function handler(editor) {
        editor.execCommand('indent');
    }
};

/**
 * center
 * 居中功能
 */
var center = {
    name: 'justifyCenter',
    icon: 'fa-align-center fa',
    i18n: 'center justify',
    handler: function handler(editor) {
        editor.execCommand('justifyCenter');
    }
};

/**
 * justifyRight
 * 居中功能
 */
var right = {
    name: 'justifyRight',
    icon: 'fa-align-right fa',
    i18n: 'right justify',
    handler: function handler(editor) {
        editor.execCommand('justifyRight');
    }
};

/**
 * justifyLeft
 * 居中功能
 */
var left = {
    name: 'justifyLeft',
    icon: 'fa-align-left fa',
    i18n: 'left justify',
    handler: function handler(editor) {
        editor.execCommand('justifyLeft');
    }
};

var buildInModules = [
    text,
    color,
    font,
    align,
    list,
    link,
    unlink,
    table,
    image,
    indent,
    hr,
    eraser,
    undo,
    fullScreen$1,
    info,
    video,
    center,
    right,
    left
];

/**
 * Created by peak on 2017/2/15.
 */
/**
 * add every elements of extArr to sourceArr.
 * @param sourceArr
 * @param extArr
 */
var mergeArray = function (sourceArr, extArr) {
    // note: Array.prototype.push.apply(arr1,arr2) is unreliable
    extArr.forEach(function (el) {
        sourceArr.push(el);
    });
};

/**
 * find all the descendant text nodes of a element
 * 获得所有文本节点
 * @param ancestor
 */
var getDescendantTextNodes = function (ancestor) {
    if (ancestor.nodeType === Node.TEXT_NODE) {
        return [ancestor]
    }
    var textNodes = [];
    if (!ancestor.hasChildNodes()) {
        return textNodes
    }
    var childNodes = ancestor.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var node = childNodes[i];
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        }
    }
    return textNodes
};
/**
 * find all the descendant text nodes of an ancestor element that before the specify end element,
 * the ancestor element must contains the end element.
 * @param ancestor
 * @param endEl
 */
var getBeforeEndDescendantTextNodes = function (ancestor, endEl) {
    var textNodes = [];
    var endIndex = 0;
    for (var i = 0; i < ancestor.childNodes.length; i++) {
        if (ancestor.childNodes[i].contains(endEl)) {
            endIndex = i;
            break
        }
    }

    for (var i$1 = 0; i$1 <= endIndex; i$1++) {
        var node = ancestor.childNodes[i$1];
        if (node === endEl) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        } else if (i$1 === endIndex) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getBeforeEndDescendantTextNodes(node, endEl));
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        }
    }
    return textNodes
};
/**
 * find all the descendant text nodes of an ancestor element that after the specify start element,
 * the ancestor element must contains the start element.
 * @param ancestor
 * @param startEl
 */
var getAfterStartDescendantTextNodes = function (ancestor, startEl) {
    var textNodes = [];
    var startIndex = 0;
    for (var i = 0; i < ancestor.childNodes.length; i++) {
        if (ancestor.childNodes[i].contains(startEl)) {
            startIndex = i;
            break
        }
    }

    for (var i$1 = startIndex; i$1 < ancestor.childNodes.length; i$1++) {
        var node = ancestor.childNodes[i$1];
        if (node === startEl) {
            mergeArray(textNodes, getDescendantTextNodes(node));
        } else if (i$1 === startIndex) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes,
                    getAfterStartDescendantTextNodes(node, startEl));
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes,
                getDescendantTextNodes(node));
        }
    }
    return textNodes
};


/**
 * get the closest parent block node of a text node.
 * @param node
 * @return {Node}
 */
var getParentBlockNode = function (node) {
    var blockNodeNames = ['DIV', 'P', 'SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'OL', 'UL', 'LI', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TABLE', 'ARTICLE', 'HEADER', 'FOOTER'];
    var container = node;
    while (container) {
        if (blockNodeNames.includes(container.nodeName)) {
            break
        }
        container = container.parentNode;
    }
    return container
};

var isInlineElement = function (node) {
    var inlineNodeNames = ['A', 'ABBR', 'ACRONYM', 'B', 'CITE', 'CODE', 'EM', 'I',
        'FONT', 'IMG', 'S', 'SMALL', 'SPAN', 'STRIKE', 'STRONG', 'U', 'SUB', 'SUP'];
    return inlineNodeNames.includes(node.nodeName)
};
/**
 * is headline
 * @param {*} node
 */

function getSelection(){
    return window.getSelection ? window.getSelection() : document.getSelection()
}

// 封装 document.queryCommandValue


// 封装 document.queryCommandState


// 封装 document.queryCommandSupported

if (!Text.prototype.contains) {
    Text.prototype.contains = function contains(otherNode) {
        return this === otherNode
    };
}


/**
 * Created by peak on 2017/2/14.
 */
var RangeHandler = function RangeHandler(range,editor) {
    if (!range || !(range instanceof Range)) {
        throw new TypeError('cant\'t resolve range')
    }
    this.range = range;
    this.editor = editor;
    this.rootElement = editor.$refs.content;
};


/**
 * find all the text nodes in range
 */
RangeHandler.prototype.getAllTextNodesInRange = function getAllTextNodesInRange () {
    var startContainer = this.range.startContainer;
    var endContainer = this.range.endContainer;
    var rootEl = this.range.commonAncestorContainer;
    var textNodes = [];

    if (startContainer === endContainer) {
        if (startContainer.nodeType === Node.TEXT_NODE) {
            return [startContainer]
        }
        var childNodes = startContainer.childNodes;
        for (var i = this.range.startOffset; i < this.range.endOffset; i++) {
            mergeArray(textNodes, getDescendantTextNodes(childNodes[i]));
        }
        return textNodes
    }

    var startIndex = 0;
    var endIndex = 0;
    for (var i$1 = 0; i$1 < rootEl.childNodes.length; i$1++) {
        var node = rootEl.childNodes[i$1];
        if (node.contains(startContainer)) {
            startIndex = i$1;
        }
        if (node.contains(endContainer)) {
            endIndex = i$1;
        }
    }

    for (var i$2 = startIndex; i$2 <= endIndex; i$2++) {
        var node$1 = rootEl.childNodes[i$2];
        if (i$2 === startIndex) {
            if (node$1.nodeType === Node.TEXT_NODE) {
                textNodes.push(node$1);
            } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getAfterStartDescendantTextNodes(node$1, startContainer));
            }
        } else if (i$2 === endIndex) {
            if (node$1.nodeType === Node.TEXT_NODE) {
                textNodes.push(node$1);
            } else if (node$1.nodeType === Node.ELEMENT_NODE) {
                mergeArray(textNodes, getBeforeEndDescendantTextNodes(node$1, endContainer));
            }
        } else if (node$1.nodeType === Node.TEXT_NODE) {
            textNodes.push(node$1);
        } else if (node$1.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(node$1));
        }
    }
    return textNodes
};


RangeHandler.prototype.getParentNode = function getParentNode (){
    var range = this.range;
    var parentNode = getParentBlockNode(range.startContainer);
    debugger
    if (parentNode === this.rootElement){
        parentNode = range.startContainer;
    }
    return parentNode
};
/**
 * execute edit command
 * @param {String} command
 * @param arg
 */
RangeHandler.prototype.execCommand = function execCommand (command, arg) {
        var this$1 = this;

    switch (command) {

        case Command.JUSTIFY_LEFT: {
            var parentNode=this.getParentNode();
            parentNode.style.textAlign='';
            break
        }

        case Command.JUSTIFY_RIGHT: {
            var parentNode$1=this.getParentNode();
            parentNode$1.style.textAlign='right';
            break
        }

        case Command.JUSTIFY_CENTER: {
            var parentNode$2=this.getParentNode();
            parentNode$2.style.textAlign='center';
            break
        }

        case Command.FORE_COLOR: {
            document.execCommand(Command.FORE_COLOR, false, arg);
            break
        }
        case Command.BACK_COLOR: {
            document.execCommand(Command.BACK_COLOR, false, arg);
            break
        }
        case Command.REMOVE_FORMAT: {
            document.execCommand(Command.REMOVE_FORMAT, false, arg);
            break
        }
        case Command.FONT_NAME: {
            document.execCommand(Command.FONT_NAME, false, arg);
            break
        }
        case Command.INDENT: {
            var range = this.range;
            var parentNode$3 = getParentBlockNode(range.startContainer);
            if (parentNode$3 === this.rootElement){
                parentNode$3 = range.startContainer;
            }
            // h1等标签不能缩进
            if (parentNode$3.tagName === 'DIV' ||parentNode$3.tagName === 'P'){
                if (parentNode$3.style.textIndent){
                    parentNode$3.style.textIndent = '';
                } else {
                    parentNode$3.style.textIndent = '2em';
                }
            }

            break
        }
        case Command.FONT_SIZE: {
            // 重新实现，改为直接修改样式
            var textNodes = this.getAllTextNodesInRange();
            if (!textNodes.length) {
                break
            }
            if (textNodes.length === 1 && textNodes[0] === this.range.startContainer
                && textNodes[0] === this.range.endContainer) {
                var textNode = textNodes[0];
                if (this.range.startOffset === 0
                    && this.range.endOffset === textNode.textContent.length) {
                    if (textNode.parentNode.childNodes.length === 1
                        && isInlineElement(textNode.parentNode)) {
                        textNode.parentNode.style.fontSize = arg;
                        break
                    }
                    var span = document.createElement('span');
                    span.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span, textNode);
                    span.appendChild(textNode);
                    break
                }
                var span$1 = document.createElement('span');
                span$1.innerText = textNode.textContent.substring(
                    this.range.startOffset, this.range.endOffset);
                span$1.style.fontSize = arg;
                var frontPart = document.createTextNode(
                    textNode.textContent.substring(0, this.range.startOffset));
                textNode.parentNode.insertBefore(frontPart, textNode);
                textNode.parentNode.insertBefore(span$1, textNode);
                textNode.textContent = textNode.textContent.substring(this.range.endOffset);
                this.range.setStart(span$1, 0);
                this.range.setEnd(span$1, 1);
                break
            }

            textNodes.forEach(function (textNode) {
                if (textNode === this$1.range.startContainer) {
                    if (this$1.range.startOffset === 0) {
                        if (textNode.parentNode.childNodes.length === 1
                            && isInlineElement(textNode.parentNode)) {
                            textNode.parentNode.style.fontSize = arg;
                        } else {
                            var span$1 = document.createElement('span');
                            span$1.style.fontSize = arg;
                            textNode.parentNode.insertBefore(span$1, textNode);
                            span$1.appendChild(textNode);
                        }
                        return
                    }
                    var span$2 = document.createElement('span');
                    textNode.textContent = textNode.textContent.substring(
                        0, this$1.range.startOffset);
                    span$2.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span$2, textNode);
                    this$1.range.setStart(textNode, 0);
                    return
                }
                if (textNode === this$1.range.endContainer) {
                    if (this$1.range.endOffset === textNode.textContent.length) {
                        if (textNode.parentNode.childNodes.length === 1
                            && isInlineElement(textNode.parentNode)) {
                            textNode.parentNode.style.fontSize = arg;
                        } else {
                            var span$3 = document.createElement('span');
                            span$3.style.fontSize = arg;
                            textNode.parentNode.insertBefore(span$3, textNode);
                            span$3.appendChild(textNode);
                        }
                        return
                    }
                    var span$4 = document.createElement('span');
                    textNode.textContent = textNode.textContent.substring(this$1.range.endOffset);
                    span$4.style.fontSize = arg;
                    textNode.parentNode.insertBefore(span$4, textNode);
                    span$4.appendChild(textNode);
                    this$1.range.setStart(textNode, textNode.textContent.length);
                    return
                }
                if (textNode.parentNode.childNodes.length === 1
                    && isInlineElement(textNode.parentNode)) {
                    textNode.parentNode.style.fontSize = arg;
                    return
                }

                var span = document.createElement('span');
                span.style.fontSize = arg;
                textNode.parentNode.insertBefore(span, textNode);
                span.appendChild(textNode);
            });
            break
        }
        case Command.FORMAT_BLOCK: {
            if (document.execCommand(Command.FORMAT_BLOCK, false, arg)) {
                break
            }
            // hack
            var element = document.createElement(arg);
            this.range.surroundContents(element);
            break
        }
        case Command.LINE_HEIGHT: {
            var textNodes$1 = this.getAllTextNodesInRange();
            textNodes$1.forEach(function (textNode) {
                var parentBlock = getParentBlockNode(textNode);
                if (parentBlock) {
                    parentBlock.style.lineHeight = arg;
                }
            });
            break
        }
        case Command.INSERT_HORIZONTAL_RULE: {
            document.execCommand(Command.INSERT_HORIZONTAL_RULE, false);
            break
        }
        case Command.INSERT_IMAGE: {
            // const id = `img-random${Math.random()}`
            var img;
            var editor=this.editor;
            var content =this.rootElement;
            var range$1=this.range;
            var selection = getSelection();
            var fragment = document.createDocumentFragment();
            if (typeof arg === 'string'){
                img=document.createElement('img');
                img.src=arg;
                img.className='vue-editor-image';
                var div=document.createElement('p');
                div.appendChild(img);
                fragment.appendChild(div);
            }
            if (typeof arg === 'object'){
                arg.forEach(function (item) {
                    img=document.createElement('img');
                    img.src=item;
                    img.className='vue-editor-image';
                    var div=document.createElement('p');
                    div.appendChild(img);
                    fragment.appendChild(div);
                });
            }
            range$1.insertNode(fragment);
            //将光标聚焦
            range$1.collapse();
            break
        }
        case Command.INSERT_VIDEO: {
            var video = '';
            arg.forEach(function (item) {
                video += "<img data-url=\"" + (item.videoUrl) + "\" class=\"video-poster\" src=\"" + (item.url) + "\">";
            });
            document.execCommand('insertHTML', false, video);
            break
        }
        case Command.CREATE_LINK: {
            document.execCommand(Command.CREATE_LINK, false, arg);
            break
        }
        case Command.INSERT_ORDERED_LIST: {
            document.execCommand(Command.INSERT_ORDERED_LIST, false, arg);
            break
        }
        case Command.INSERT_UNORDERED_LIST: {
            document.execCommand(Command.INSERT_UNORDERED_LIST, false, arg);
            break
        }
        case Command.INSERT_HTML: {
            if (document.execCommand(Command.INSERT_HTML, false, arg)) {
                break
            }
            // hack
            var fragment$1 = document.createDocumentFragment();
            var div$1 = document.createElement('div');
            div$1.innerHTML = arg;
            if (div$1.hasChildNodes()) {
                for (var i = 0; i < div$1.childNodes.length; i++) {
                    fragment$1.appendChild(div$1.childNodes[i].cloneNode(true));
                }
            }
            this.range.deleteContents();
            this.range.insertNode(fragment$1);
            break
        }
        case Command.BOLD: {
            document.execCommand(Command.BOLD, false, arg);
            break
        }
        case Command.ITALIC: {
            document.execCommand(Command.ITALIC, false);
            break
        }
        case Command.UNDERLINE: {
            document.execCommand(Command.UNDERLINE, false);
            break
        }
        case Command.STRIKE_THROUGH: {
            document.execCommand(Command.STRIKE_THROUGH, false);
            break
        }
        case Command.SUBSCRIPT: {
            document.execCommand(Command.SUBSCRIPT, false);
            break
        }
        case Command.SUPERSCRIPT: {
            document.execCommand(Command.SUPERSCRIPT, false);
            break
        }
        case Command.UNDO: {
            document.execCommand(Command.UNDO, false);
            break
        }
        case Command.UNLINK: {
            document.execCommand(Command.UNLINK, false);
            break
        }
        default: {
            document.execCommand(command, false, arg);
            break
        }
    }
};

__$styleInject(".vue-html5-editor,.vue-html5-editor *{box-sizing:border-box}.vue-html5-editor{font-size:14px;background-color:#fff;color:#333;border:1px solid #ddd;text-align:left;border-radius:5px;overflow:hidden;position:relative}.vue-html5-editor.full-screen{position:fixed!important;top:0!important;left:0!important;bottom:0!important;right:0!important;border-radius:0}.vue-html5-editor>.toolbar{position:relative;background-color:inherit}.vue-html5-editor>.toolbar>ul{list-style:none;padding:0;margin:0;border-bottom:1px solid #ddd}.vue-html5-editor>.toolbar>ul>li{display:inline-block;cursor:pointer;text-align:center;padding:8px 10px}.vue-html5-editor>.toolbar>ul>li .icon{height:16px;width:16px;display:inline-block;vertical-align:middle}.vue-html5-editor>.toolbar>.dashboard{background-color:inherit;border-bottom:1px solid #ddd;padding:10px;position:absolute;top:100%;left:0;right:0;overflow:auto}.vue-html5-editor>.toolbar>.dashboard input[type=text],.vue-html5-editor>.toolbar>.dashboard input[type=number],.vue-html5-editor>.toolbar>.dashboard select{padding:6px 12px;color:inherit;background-color:transparent;border:1px solid #ddd;border-radius:5px}.vue-html5-editor>.toolbar>.dashboard input[type=text]:hover,.vue-html5-editor>.toolbar>.dashboard input[type=number]:hover,.vue-html5-editor>.toolbar>.dashboard select:hover{border-color:#bebebe}.vue-html5-editor>.toolbar>.dashboard input[type=text][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=text][readonly],.vue-html5-editor>.toolbar>.dashboard input[type=number][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=number][readonly],.vue-html5-editor>.toolbar>.dashboard select[disabled],.vue-html5-editor>.toolbar>.dashboard select[readonly]{background-color:#eee;opacity:1}.vue-html5-editor>.toolbar>.dashboard input[type=text][disabled],.vue-html5-editor>.toolbar>.dashboard input[type=number][disabled],.vue-html5-editor>.toolbar>.dashboard select[disabled]{cursor:not-allowed}.vue-html5-editor>.toolbar>.dashboard button{color:inherit;background-color:inherit;padding:6px 12px;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid #ddd;border-radius:5px;margin-right:4px;margin-bottom:4px}.vue-html5-editor>.toolbar>.dashboard button:hover{border-color:#bebebe}.vue-html5-editor>.toolbar>.dashboard button[disabled]{cursor:not-allowed;opacity:.68}.vue-html5-editor>.toolbar>.dashboard button:last-child{margin-right:0}.vue-html5-editor>.toolbar>.dashboard label{font-weight:bolder}.vue-html5-editor>.content{overflow:auto;padding:15px 25px}.vue-html5-editor>.content:focus{outline:0}.vue-html5-editor .plugins{position:absolute;bottom:0;left:0;width:100%}.vue-html5-editor .draft__dialog{background:#fff8ba;padding:10px 15px;border-top:1px solid #fdf184}.vue-html5-editor .draft_btn{color:#00f;margin:0 5px;cursor:pointer}.vue-html5-editor .draft__no{color:#505050}",undefined);

var template$10 = "<div class=\"vue-html5-editor\" :class=\"{'full-screen':fullScreen}\" :style=\"{'z-index':zIndex}\"> <div class=\"toolbar\" :style=\"{'z-index':zIndex+1}\" ref=\"toolbar\"> <ul> <template v-for=\"module in modules\"> <li :title=\"locale[module.i18n]\" @click=\"activeModule(module)\"> <span class=\"icon\" :class=\"module.icon\"></span> <template v-if=\"showModuleName === undefined ? defaultShowModuleName : showModuleName\"> &nbsp;{{locale[module.i18n]}} </template> </li> </template> </ul> <div class=\"dashboard\" v-show=\"dashboard\" ref=\"dashboard\"> <keep-alive> <div v-show=\"dashboard\" :is=\"dashboard\"></div> </keep-alive> </div> </div> <div class=\"content\" ref=\"content\" :style=\"contentStyle\" contenteditable @click=\"toggleDashboard(dashboard)\"> </div> <div class=\"plugins\" :style=\"{'z-index':zIndex+1}\" ref=\"plugin\"> <plugin-draft v-if=\"showDraft\"></plugin-draft> </div> </div>";

function onPaste(e){
    e.preventDefault();
    //判断一下是否是粘贴截图图片

    var clipboard;
    var text = '';
    if (window.clipboardData && window.clipboardData.setData) {
        // IE
        clipboard=window.clipboardData;
        text = clipboard.getData('text');
    } else {
        clipboard=(e.originalEvent || e).clipboardData;
        text = clipboard.getData('text/plain');
    }
    // clipboard.
    var textRange;
    if (document.body.createTextRange) {
        if (document.selection) {
            textRange = document.selection.createRange();
        } else if (window.getSelection) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            // 创建临时元素，使得TextRange可以移动到正确的位置
            var tempEl = document.createElement('span');
            tempEl.innerHTML = '&#FEFF;';
            range.deleteContents();
            range.insertNode(tempEl);
            textRange = document.body.createTextRange();
            textRange.moveToElementText(tempEl);
            tempEl.parentNode.removeChild(tempEl);
        }
        textRange.text = text;
        textRange.collapse(false);
        textRange.select();
    } else {
        // Chrome之类浏览器
        document.execCommand('insertText', false, text);
    }
}

var isDebug = true;

function log$1(info) {
    if (isDebug) {
        console.log(info);
    }

}

var p;
var storeKey = 'vue_editor_draft';
var draftIndex = {
    stop: function stop(){
        localStorage.setItem(storeKey,'');
        this.uninstall();
    },
    uninstall: function uninstall(){
        if (p){
            clearInterval(p);
        }
    },
    install: function install(editor){
        if (editor.draft){
            var draft = localStorage.getItem(storeKey);
            if (draft){
                editor.showDraft = true;
            } else {
                editor.showDraft = false;
                p = setInterval(function () {
                    localStorage.setItem(storeKey,editor.getContent());
                },2000);
            }
        }
    }
};

var plugins = {
    draft: draftIndex
};

var draft = plugins.draft;
/**
 * Created by peak on 2017/2/9.
 */
var editor = {
    template: template$10,
    components: {
        'draft-panel': {
            template: 'hhh'
        }
    },
    props: {
        plainTextPaste: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            required: true,
            default: ''
        },
        height: {
            type: Number,
            default: 300,
            validator: function validator(val) {
                return val >= 100
            }
        },
        zIndex: {
            type: Number,
            default: 1000
        },
        autoHeight: {
            type: Boolean,
            default: true
        },
        showModuleName: {
            type: Boolean,
            default: false
        },
        toolbars: {
            type: Array,
            default: function default$1() {
                return []
            }
        },
        draft: {
            type: Boolean,
            default: false
        },
        draftTime: {
            type: Number,
            default: 2000
        }
    },
    data: function data() {
        return {
            // defaultShowModuleName:false
            // locale: {},
            // modules:{},
            fullScreen: false,
            dashboard: null,
            showDraft: false
        }
    },
    watch: {
        /**
         * 监听外部改变了content
         * @param {string} val
         */
        content: function content(val) {
            this.setContent(val);
        },
        fullScreen: function fullScreen(val) {
            var component = this;
            if (val) {
                component.parentEl = component.$el.parentNode;
                component.nextEl = component.$el.nextSibling;
                document.body.appendChild(component.$el);
                return
            }
            if (component.nextEl) {
                component.parentEl.insertBefore(component.$el, component.nextEl);
                return
            }
            component.parentEl.appendChild(component.$el);
        }
    },
    computed: {
        contentStyle: function contentStyle() {
            var style = {};
            if (this.fullScreen) {
                style.height = (window.innerHeight - this.$refs.toolbar.clientHeight - 1) + "px";
                return style
            }
            if (!this.autoHeight) {
                style.height = (this.height) + "px";
                return style
            }
            style['min-height'] = (this.height) + "px";
            return style
        }
    },
    methods: {
        // updateContent(val) {
        //     const content = this.$refs.content.innerHTML
        //     const convertVal = this.convertToInnerHtml(val)
        //     if (convertVal !== content) {
        //         this.$refs.content.innerHTML = convertVal
        //     }
        // },
        stopDraft: function stopDraft(){
            draft.stop();
        },
        toggleFullScreen: function toggleFullScreen() {
            this.fullScreen = !this.fullScreen;
        },
        enableFullScreen: function enableFullScreen() {
            this.fullScreen = true;
        },
        exitFullScreen: function exitFullScreen() {
            this.fullScreen = false;
        },
        focus: function focus() {
            this.$refs.content.focus();
        },
        toggleDashboard: function toggleDashboard(dashboard) {
            this.dashboard = this.dashboard === dashboard ? null : dashboard;
        },
        execCommand: function execCommand(command) {
            var arg = [], len = arguments.length - 1;
            while ( len-- > 0 ) arg[ len ] = arguments[ len + 1 ];

            this.restoreSelection();
            if (this.range) {
                var handler = new RangeHandler(this.range, this);
                handler.execCommand.apply(handler, [ command ].concat( arg ));
            }
            this.toggleDashboard();
            var newConent = this.convertToContent(this.$refs.content.innerHTML);
            this.$emit('change', newConent);
        },
        getCurrentRange: function getCurrentRange() {
            return this.range
        },
        /**
         * 获取当前的光标对象并赋值给this.range
         */
        saveCurrentRange: function saveCurrentRange() {
            var this$1 = this;

            var selection = getSelection();
            if (!selection.rangeCount) {
                return
            }
            var content = this.$refs.content;
            for (var i = 0; i < selection.rangeCount; i++) {
                var range = selection.getRangeAt(0);
                var start = range.startContainer;
                var end = range.endContainer;
                // for IE11 : node.contains(textNode) always return false
                start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start;
                end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end;
                if (content.contains(start) && content.contains(end)) {
                    this$1.range = range;
                    break
                }
            }
        },
        getContent: function getContent(){
            var newConent = this.convertToContent(this.$refs.content.innerHTML);
            return newConent
        },
        setContent: function setContent(val){
            var content = this.$refs.content.innerHTML;
            var convertVal = this.convertToInnerHtml(val);
            if (convertVal !== content) {
                this.$refs.content.innerHTML = convertVal;
            }
        },
        restoreSelection: function restoreSelection() {
            var selection = getSelection();
            selection.removeAllRanges();
            if (this.range) {
                selection.addRange(this.range);
            } else {
                var content = this.$refs.content;
                var div = document.createElement('p');
                var range = document.createRange();
                content.appendChild(div);
                range.setStart(div, 0);
                range.setEnd(div, 0);
                selection.removeAllRanges();
                selection.addRange(range);
                this.range = range;
            }
        },
        activeModule: function activeModule(module) {
            if (typeof module.handler === 'function') {
                module.handler(this);
                return
            }
            if (module.hasDashboard) {
                this.toggleDashboard(("dashboard-" + (module.name)));
            }
        },
        convertToInnerHtml: function convertToInnerHtml(content) {
            // 为空返回一个br保证所有的文字都在div中
            if (content === '') {
                return '<p><br/></p>'
            }
            // 当是纯文本的时候包括在div中
            if (content.indexOf('<') === -1) {
                return ("<p>" + content + "</p>")
            }
            var str = content.replace(/<video .*?poster="(.*?)".*?src="(.*?)".*?>.*?<\/video>/ig, function ($0, $1, $2) { return ("<img data-url=\"" + $2 + "\" class=\"video-poster\" src=\"" + $1 + "\">"); });
            return str
        },
        convertToContent: function convertToContent(html) {
            var ar = html.match(/<img .*?>/ig);
            var videoPreviewArray = [];
            if (ar) {
                ar.forEach(function (item) {
                    if (item.indexOf('class="video-poster"') >= 0) {
                        var str = item.replace(/<img .*?data-url="(.*?)".*?class="video-poster".*?src="(.*?)">/ig, function ($0, $1, $2) { return ("<video poster=\"" + $2 + "\" src=\"" + $1 + "\" controls></video>"); });
                        videoPreviewArray.push({
                            replaceStr: item,
                            newStr: str
                        });
                    }
                });
                var returnStr = '';
                videoPreviewArray.forEach(function (item) {
                    if (returnStr) {
                        returnStr = returnStr.replace(item.replaceStr, item.newStr);
                    } else {
                        returnStr = html.replace(item.replaceStr, item.newStr);
                    }
                });
                if (returnStr){
                    html = returnStr;
                }
            }
            return html
        }
    },
    created: function created() {
        var this$1 = this;

        var newModules = [];
        var toolbars = this.toolbars;
        var editor = this;
        var editorDom = editor.$refs.content;
        if (toolbars.length > 0) {
            this.modules.forEach(function (item) {
                var index = toolbars.indexOf(item.name);
                if (index > -1) {
                    newModules[index] = item;
                }
            });
            this.modules = newModules;
        }

        this.modules.forEach(function (module) {
            if (typeof module.init === 'function') {
                module.init(this$1);
            }
        });
    },
    mounted: function mounted() {
        var this$1 = this;

        var editor = this;
        var content = this.$refs.content;
        content.innerHTML = this.convertToInnerHtml(this.content);
        content.addEventListener('mouseup', function () {
            editor.saveCurrentRange();
        }, false);
        content.addEventListener('keyup', function (e) {
            var key = e.which;
            editor.$emit('change', this$1.convertToContent(content.innerHTML));
            // 需要在前面执行
            editor.saveCurrentRange();
            var startContainer = this$1.range.startContainer;
            var endContainer = this$1.range.endContainer;
            var pNode = getParentBlockNode(startContainer);
            if (key === 9) {
                log$1('tab');
                e.preventDefault();
            }
            // 回车
            if (key === 13) {
                // console.log('enter')
                // editor.execCommand('insertHTML','<p></p>')
                // e.preventDefault()
            }
            // 删除键
            if (key === 8) {
                if (content.innerHTML === '' || content.innerHTML === '<br>') {
                    content.innerHTML = '<p><br></p>';
                } else {
                    // if(startContainer==endContainer && startContainer.length===0){

                    //     pNode.parentNode.removeChild(pNode)
                    // }
                }
            }
        },false);
        content.addEventListener('mouseout', function (e) {
            if (e.target === content) {
                this$1.saveCurrentRange();
            }
        }, false);
        content.addEventListener('paste', function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            // const e = args[0]
            // 注册paste方法，粘贴的都是纯文本
            // 代码来自http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
            if (editor.plainTextPaste) {
                onPaste.apply(this$1, args);
            }
            // } else {
            //      // 阻止默认的粘贴行为
            //     e.preventDefault()
            //     // 过滤script等安全问题代码
            //     let text = ''
            //     if (window.clipboardData && window.clipboardData.setData) {
            //         // IE
            //         text = window.clipboardData.getData('text/html')
            //     } else {
            //         text = (e.originalEvent || e).clipboardData.getData('text/html')
            //     }

            //     editor.execCommand(Command.INSERT_HTML,false,editor.safeHtml(text))
            // }
        });


        // 执行插件安装
        draft.install(editor);
    },
    // /**
    // * 将不安全的标签去除
    //  * @param text
    //  * @returns {*}
    //  */
    // safeHtml(text){
    // 	// 还不是很完整，待续
    // 	if (text){
    // 		return	text.replace(/<script.*>.*<\/script>/ig,'')
    // 			.replace(/<style.*>.*<\/style>/ig,'')
    // 	}
    //         return text
    // },
    updated: function updated() {
        // update dashboard style
        if (this.$refs.dashboard) {
            this.$refs.dashboard.style.maxHeight = (this.$refs.content.clientHeight) + "px";
        }
    },
    beforeDestroy: function beforeDestroy() {
        var this$1 = this;

        this.modules.forEach(function (module) {
            if (typeof module.destroyed === 'function') {
                module.destroyed(this$1);
            }
        });
        // 卸载插件
        draft.uninstall(this);
    }
};

var i18nZhCn = {
    align: '对齐方式',
    image: '图片',
    images: '图片',
    indent: '缩进',
    list: '列表',
    link: '链接',
    unlink: '去除链接',
    table: '表格',
    font: '文字',
    'full screen': '全屏',
    text: '排版',
    eraser: '格式清除',
    info: '关于',
    color: '颜色',
    'please enter a url': '请输入地址',
    'create link': '创建链接',
    bold: '加粗',
    italic: '倾斜',
    underline: '下划线',
    'strike through': '删除线',
    subscript: '上标',
    superscript: '下标',
    heading: '标题',
    'font name': '字体',
    'font size': '文字大小',
    'left justify': '左对齐',
    'center justify': '居中',
    'right justify': '右对齐',
    'ordered list': '有序列表',
    'unordered list': '无序列表',
    'fore color': '前景色',
    'background color': '背景色',
    'row count': '行数',
    'column count': '列数',
    save: '确定',
    upload: '上传',
    progress: '进度',
    unknown: '未知',
    'please wait': '请稍等',
    error: '错误',
    abort: '中断',
    reset: '重置',
    hr: '分隔线',
    undo: '撤消',

    'line height': '行高',
    'exceed size limit': '超出大小限制'
};

var i18nEnUs = {
    align: 'align',
    image: 'image',
    indent: 'indent',
    list: 'list',
    link: 'link',
    unlink: 'unlink',
    table: 'table',
    font: 'font',
    'full screen': 'full screen',
    text: 'text',
    eraser: 'remove format',
    info: 'info',
    color: 'color',
    'please enter a url': 'please enter a url',
    'create link': 'create link',
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    'strike through': 'strike through',
    subscript: 'subscript',
    superscript: 'superscript',
    heading: 'heading',
    'font name': 'font name',
    'font size': 'font size',
    'left justify': 'left justify',
    'center justify': 'center justify',
    'right justify': 'right justify',
    'ordered list': 'ordered list',
    'unordered list': 'unordered list',
    'fore color': 'fore color',
    'background color': 'background color',
    'row count': 'row count',
    'column count': 'column count',
    save: 'save',
    upload: 'upload',
    progress: 'progress',
    unknown: 'unknown',
    'please wait': 'please wait',
    error: 'error',
    abort: 'abort',
    reset: 'reset',
    hr: 'horizontal rule',
    undo: 'undo',
    'line height': 'line height',
    'exceed size limit': 'exceed size limit'
};

/**
 * Created by peak on 2017/2/24.
 */
/**
 * shadow clone
 *
 * @param source    source object
 * @param ext       extended object
 */
function mixin(source, ext) {
    if ( source === void 0 ) source = {};
    if ( ext === void 0 ) ext = {};

    Object.keys(ext).forEach(function (k) {
        // for data function
        if (k === 'data') {
            var dataSrc = source[k];
            var dataDesc = ext[k];
            if (typeof dataDesc === 'function') {
                if (typeof dataSrc !== 'function') {
                    source[k] = dataDesc;
                } else {
                    source[k] = function () { return mixin(dataSrc(), dataDesc()); };
                }
            }
        } else {
            source[k] = ext[k];
        }
    });
    return source
}

var template$11 = "<div class=\"draft__dialog\"> 草稿箱不为空，是否从草稿加载? <span class=\"draft_btn\" @click=\"onOk\">是</span><span class=\"draft_btn draft__no\" @click=\"onCancel\">否</span> </div>";

var draft$1 = {
    name: 'draft-name',
    template: template$11,
    methods: {
        onOk: function onOk() {
            var editor = this.$parent;
            editor.setContent(localStorage.getItem(storeKey));
            this.run(editor);
        },
        onCancel: function onCancel() {
            var editor = this.$parent;
            this.run(editor);
        },
        run: function run(editor) {
            localStorage.setItem(storeKey,'');
            draftIndex.install(editor);
        }
    }
};

polyfill();
/**
 * Vue html5 Editor
 * @param Vue   {Vue}
 * @param options {Object}
 */
var VueHtml5Editor = function VueHtml5Editor(options) {
    if ( options === void 0 ) options = {};

    var modules = [].concat( buildInModules );
    var components = {};

    // extended modules
    if (Array.isArray(options.modules)) {
        options.modules.forEach(function (module) {
            if (module.name) {
                modules.push(module);
            }
        });
    }
    // hidden modules
    if (Array.isArray(options.hiddenModules)) {
        modules = (function () {
            var arr = [];
            modules.forEach(function (m) {
                if (!options.hiddenModules.includes(m.name)) {
                    arr.push(m);
                }
            });
            return arr
        })();
    }
    // visible modules
    if (Array.isArray(options.visibleModules)) {
        modules = (function () {
            var arr = [];
            modules.forEach(function (module) {
                if (options.visibleModules.includes(module.name)) {
                    arr.push(module);
                }
            });
            return arr
        })();
    }


    modules.forEach(function (module) {
        // specify the config for each module in options by name
        var config = options[module.name];
        module.config = mixin(module.config, config);

        if (module.dashboard) {
            // $options.module
            module.dashboard.module = module;
            components[("dashboard-" + (module.name))] = module.dashboard;
        }
        if (options.icons && options.icons[module.name]) {
            module.icon = options.icons[module.name];
        }

        module.hasDashboard = !!module.dashboard;
        // prevent vue sync
        module.dashboard = null;
    });
    // 将插件注册到组件中
    components['plugin-draft'] = draft$1;
    // i18n
    var i18n = {'zh-cn': i18nZhCn, 'en-us': i18nEnUs};
    var customI18n = options.i18n || {};
    Object.keys(customI18n).forEach(function (key) {
        i18n[key] = i18n[key] ? mixin(i18n[key], customI18n[key]) : customI18n[key];
    });
    var language = options.language || 'en-us';
    var locale = i18n[language];

    // showModuleName
    var defaultShowModuleName = !!options.showModuleName;

    // ######################################
    var compo = mixin(editor, {
        data: function data() {
            return {modules: modules, locale: locale, defaultShowModuleName: defaultShowModuleName}
        },
        components: components
    });
    mixin(this, compo);
};

/**
 * global install
 *
 * @param Vue
 * @param options
 */
VueHtml5Editor.install = function install (Vue, options) {
        if ( options === void 0 ) options = {};

    Vue.component(options.name || 'vue-html5-editor', new VueHtml5Editor(options));
};

return VueHtml5Editor;

})));
