(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueHtml5Editor = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var template = "<div> <button type=\"button\" @click=\"$parent.execCommand('justifyLeft')\"> {{$parent.locale[\"left justify\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('justifyCenter')\"> {{$parent.locale[\"center justify\"]}} </button> <button type=\"button\" @click=\"$parent.execCommand('justifyRight')\"> {{$parent.locale[\"right justify\"]}} </button> </div>";

  /**
   * Created by peak on 2017/2/10.
   */

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

  var template$1 = "<div> <div class=\"colors-tabs\"> <label> <input type=\"radio\" value=\"foreColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"fore color\"]}} </label> <label> <input type=\"radio\" value=\"backColor\" v-model=\"command\">&nbsp; {{$parent.locale[\"background color\"]}} </label> </div> <div class=\"colors-tab-panels\"> <div class=\"colors-tab-fore-color\" v-if=\"command=='foreColor'\"> <div v-for=\"color in foreColors\" :style=\"{'background-color':color}\" class=\"color-card\" @click=\"changeColor(color)\"> </div> <div style=\"clear: both\"></div> </div> <div class=\"colors-tab-background-color\" v-if=\"command=='backColor'\"> <div v-for=\"color in backColors\" :style=\"{'background-color':color}\" class=\"color-card\" @click=\"changeColor(color)\"> </div> <div style=\"clear: both\"></div> </div> </div> </div> ";

  /**
   * Created by peak on 2017/2/10.
   */

  var dashboard$1 = {
    template: template$1,
    data: function data() {
      return {
        // foreColor,backColor
        command: 'foreColor',
        foreColors: ['#000000', '#000033', '#000066', '#000099', '#003300', '#003333', '#003366', '#003399', '#006600', '#006633', '#009900', '#330000', '#330033', '#330066', '#333300', '#333366', '#660000', '#660033', '#663300', '#666600', '#666633', '#666666', '#666699', '#990000', '#990033', '#9900CC', '#996600', '#FFCC00', '#FFCCCC', '#FFCC99', '#FFFF00', '#FF9900', '#CCFFCC', '#CCFFFF', '#CCFF99'],
        backColors: ['#ffffff', '#eeeeee', '#FFCCCC', '#FFFF00', '#CCFF99', '#ccffff', '#003399', '#006600', '#006633', '#009900', '#330000', '#330033', '#330066', '#333300', '#333366', '#660000', '#660033', '#663300', '#666600', '#666633', '#666666', '#666699', '#990000', '#990033', '#9900CC', '#996600', '#FFCC00', '#FFCCCC', '#FFCC99', '#FFFF00', '#FF9900', '#CCFFCC', '#CCFFFF', '#CCFF99']
      };
    },
    methods: {
      changeColor: function changeColor(color) {
        this.$parent.execCommand(this.command, color);
      }
    }
  };

  /**
   * fore color and back color
   * Created by peak on 16/8/18.
   */

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

  var template$2 = "<div class=\"dashboard-font\" style=\"line-height: 36px;\"> <div> <label>{{$parent.locale[\"heading\"]}}:</label> <button v-for=\"h in 6\" type=\"button\" @click=\"setHeading(h)\">H{{h}}</button> </div> <!-- <div>\n        <label>\n            {{$parent.locale[\"font name\"]}}:\n        </label>\n        <button v-for=\"name in nameList\" type=\"button\" @click=\"setFontName(name)\">{{name}}</button>\n    </div> --> <div> <label> {{$parent.locale[\"font size\"]}}: </label> <button v-for=\"size in fontSizeList\" type=\"button\" @click=\"setFontSize(size)\">{{size}}</button> </div> <div> <label> {{$parent.locale[\"line height\"]}}: </label> <button v-for=\"lh in lineHeightList\" type=\"button\" @click=\"setLineHeight(lh)\"> {{lh}} </button> </div> </div>";

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
    INDENT: 'indent',
    INSERT_SPACE: 'insertSpace'
  };

  /**
   * Created by peak on 2017/2/10.
   */

  var dashboard$2 = {
    template: template$2,
    data: function data() {
      return {
        nameList: ['Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif', 'Verdana', 'Georgia', 'Times New Roman', 'Trebuchet MS', 'Microsoft JhengHei', 'Courier New', 'Impact', 'Comic Sans MS', 'Consolas'],
        lineHeightList: ['1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'],
        fontSizeList: ['12px', '14px', '16px', '18px', '20px', '22px', '24px']
      };
    },
    methods: {
      setFontName: function setFontName(name) {
        this.$parent.execCommand('fontName', name);
      },
      setFontSize: function setFontSize(size) {
        this.$parent.execCommand('fontSize', size);
      },
      setHeading: function setHeading(heading) {
        this.$parent.execCommand('formatBlock', "h".concat(heading));
      },
      setLineHeight: function setLineHeight(lh) {
        this.$parent.execCommand(Command.LINE_HEIGHT, lh);
      }
    },
    created: function created() {
      var config = this.$options.module.config; // font name

      if (!config) {
        return;
      }

      if (Array.isArray(config.fontNames)) {
        this.nameList = config.fontNames;
      }
    }
  };

  /**
   * font name and font size
   * Created by peak on 16/8/18.
   */

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
  var fullScreen = {
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
    } // init (editor) {
    //
    // },
    // destroyed(editor){
    //
    // },

  };

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var vueUploader = createCommonjsModule(function (module) {
  module.exports =
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
  /******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
  /******/ })
  /************************************************************************/
  /******/ ({

  /***/ "./node_modules/babel-loader/lib/index.js!./src/imageUploader/main.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/babel-loader/lib!./src/imageUploader/main.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _uploader = __webpack_require__(/*! ../uploader */ "./src/uploader.js");

  var _uploader2 = _interopRequireDefault(_uploader);

  var _baseViewCtrl = __webpack_require__(/*! ../baseViewCtrl */ "./src/baseViewCtrl.js");

  var _baseViewCtrl2 = _interopRequireDefault(_baseViewCtrl);

  var _props = __webpack_require__(/*! ../props */ "./src/props.js");

  var _props2 = _interopRequireDefault(_props);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   *  
   *  vue的图片上传组件
   * 
   */

  exports.default = Object.assign({}, _baseViewCtrl2.default, {
    props: _props2.default,

    created: function created() {
      var self = this;
      var uploader = new _uploader2.default(Object.assign({}, {
        uploadUrl: self.url,
        accept: self.accept,
        showProgress: self.showProgress,
        thumb: true,
        onAcceptError: function onAcceptError(e) {
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
    }
  });

  /***/ }),

  /***/ "./node_modules/babel-loader/lib/index.js!./src/videoUploader/main.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/babel-loader/lib!./src/videoUploader/main.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _uploader = __webpack_require__(/*! ../uploader */ "./src/uploader.js");

  var _uploader2 = _interopRequireDefault(_uploader);

  var _baseViewCtrl = __webpack_require__(/*! ../baseViewCtrl */ "./src/baseViewCtrl.js");

  var _baseViewCtrl2 = _interopRequireDefault(_baseViewCtrl);

  var _props = __webpack_require__(/*! ../props */ "./src/props.js");

  var _props2 = _interopRequireDefault(_props);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var newProps = Object.assign({}, _props2.default, {
    accept: {
      type: Array,
      default: function _default() {
        return ['flv', 'mkv', 'avi', 'rm', 'rmvb', 'mpeg', 'mpg', 'ogg', 'ogv', 'mov', 'wmv', 'mp4', 'webm', 'mp3', 'wav'];
      }
    },
    fileAccept: {
      default: '*'
    },
    uploadConfig: {
      default: function _default() {
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
   *  视频上传组件
   * 
   */

  exports.default = Object.assign({}, _baseViewCtrl2.default, {
    props: newProps,
    data: function data() {
      return {
        files: [],
        uploadSuccessNum: 0,
        boxWidth: 0,
        uploadFinish: true,
        maskText: '',
        showPanelMask: false
      };
    },
    created: function created() {
      var self = this;
      var uploader = new _uploader2.default(Object.assign({}, {
        uploadUrl: self.url,
        accept: self.accept,
        showProgress: self.showProgress,
        onAcceptError: function onAcceptError(e) {
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
    }
  });

  /***/ }),

  /***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-05e646cd\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss":
  /*!****************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/css-loader?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-05e646cd","scoped":true,"sourceMap":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss ***!
    \****************************************************************************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
  // imports


  // module
  exports.push([module.i, "\n.btn[data-v-05e646cd] {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block;\n}\n.btn-disable[data-v-05e646cd] {\n  background-color: #eee;\n  border-color: #eee;\n  color: black;\n}\n.mask[data-v-05e646cd] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  overflow: auto;\n}\n.place-holder[data-v-05e646cd] {\n  text-align: center;\n  margin-top: 200px;\n}\n.panel[data-v-05e646cd] {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative;\n}\n.panel .close[data-v-05e646cd] {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer;\n}\n.image-list[data-v-05e646cd] {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0;\n}\n.image-list[data-v-05e646cd]:before, .image-list[data-v-05e646cd]:after {\n    content: \" \";\n    display: table;\n}\n.image-list[data-v-05e646cd]:after {\n    clear: both;\n}\n.image-item[data-v-05e646cd] {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top;\n}\n.image-item .title[data-v-05e646cd] {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none;\n}\n.image-item .cover[data-v-05e646cd] {\n    height: 100%;\n}\n.image-item .loader[data-v-05e646cd] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px;\n}\n.percent[data-v-05e646cd] {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n}\n.percent .percent-inner[data-v-05e646cd] {\n    height: 4px;\n    background: #20a0ff;\n    width: 0;\n}\nh3[data-v-05e646cd] {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative;\n}\n.bottom[data-v-05e646cd] {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee;\n}\n.save-btn[data-v-05e646cd] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n.panel-mask[data-v-05e646cd] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  z-index: 99;\n}\n.panel-dialog[data-v-05e646cd] {\n  background: white;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  left: 50%;\n  margin-top: -150px;\n  margin-left: -120px;\n  width: 240px;\n  border-radius: 3px;\n  box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.3);\n}\n.panel-dialog-text[data-v-05e646cd] {\n  margin-top: 25px;\n  margin-bottom: 25px;\n}\n.ok[data-v-05e646cd] {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px;\n}\n.btn-ios[data-v-05e646cd] {\n  color: #0087ec;\n  border-width: 0;\n  border-top: 1px solid #eee;\n  text-align: center;\n  padding: 8px;\n  cursor: pointer;\n}\n@media (max-width: 1300px) {\n.panel[data-v-05e646cd] {\n    margin-top: 20px;\n}\n}\n", "", {"version":3,"sources":["/Users/jump/GitHub/vue-image-uploader/src/uploader.scss"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,0BAA0B;EAC1B,sBAAsB;EACtB,aAAa;EACb,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,gBAAgB;EAChB,sBAAsB;CAAE;AAE1B;EACE,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;CAAE;AAEjB;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,gBAAgB;EAChB,eAAe;CAAE;AAEnB;EACE,mBAAmB;EACnB,kBAAkB;CAAE;AAEtB;EACE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,0BAA0B;EAC1B,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;CAAE;AAEtB;EACE,cAAc;EACd,eAAe;EACf,cAAc;EACd,iBAAiB;CAAE;AACnB;IACE,aAAa;IACb,eAAe;CAAE;AACnB;IACE,YAAY;CAAE;AAElB;EACE,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,oBAAoB;CAAE;AACtB;IACE,+BAA+B;IAC/B,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,gBAAgB;IAChB,kBAAkB;CAAE;AACtB;IACE,aAAa;CAAE;AACjB;IACE,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;CAAE;AAEzB;EACE,YAAY;EACZ,YAAY;EACZ,qCAAqC;EACrC,mBAAmB;EACnB,UAAU;EACV,QAAQ;CAAE;AACV;IACE,YAAY;IACZ,oBAAoB;IACpB,SAAS;CAAE;AAEf;EACE,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B;CAAE;AAE/B;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CAAE;AAEd;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,mBAAmB;EACnB,YAAY;CAAE;AAEhB;EACE,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,aAAa;EACb,mBAAmB;EACnB,4CAA4C;CAAE;AAEhD;EACE,iBAAiB;EACjB,oBAAoB;CAAE;AAExB;EACE,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,YAAY;CAAE;AAEhB;EACE,eAAe;EACf,gBAAgB;EAChB,2BAA2B;EAC3B,mBAAmB;EACnB,aAAa;EACb,gBAAgB;CAAE;AAEpB;AACE;IACE,iBAAiB;CAAE;CAAE","file":"uploader.scss","sourcesContent":[".btn {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block; }\n\n.btn-disable {\n  background-color: #eee;\n  border-color: #eee;\n  color: black; }\n\n.mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  overflow: auto; }\n\n.place-holder {\n  text-align: center;\n  margin-top: 200px; }\n\n.panel {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative; }\n  .panel .close {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer; }\n\n.image-list {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0; }\n  .image-list:before, .image-list:after {\n    content: \" \";\n    display: table; }\n  .image-list:after {\n    clear: both; }\n\n.image-item {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top; }\n  .image-item .title {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .image-item .cover {\n    height: 100%; }\n  .image-item .loader {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px; }\n\n.percent {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0; }\n  .percent .percent-inner {\n    height: 4px;\n    background: #20a0ff;\n    width: 0; }\n\nh3 {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative; }\n\n.bottom {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee; }\n\n.save-btn {\n  position: absolute;\n  right: 15px;\n  top: 10px; }\n\n.panel-mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  z-index: 99; }\n\n.panel-dialog {\n  background: white;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  left: 50%;\n  margin-top: -150px;\n  margin-left: -120px;\n  width: 240px;\n  border-radius: 3px;\n  box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.3); }\n\n.panel-dialog-text {\n  margin-top: 25px;\n  margin-bottom: 25px; }\n\n.ok {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px; }\n\n.btn-ios {\n  color: #0087ec;\n  border-width: 0;\n  border-top: 1px solid #eee;\n  text-align: center;\n  padding: 8px;\n  cursor: pointer; }\n\n@media (max-width: 1300px) {\n  .panel {\n    margin-top: 20px; } }\n"],"sourceRoot":""}]);

  // exports


  /***/ }),

  /***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5dc37ded\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss":
  /*!****************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/css-loader?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-5dc37ded","scoped":true,"sourceMap":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss ***!
    \****************************************************************************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
  // imports


  // module
  exports.push([module.i, "\n.btn[data-v-5dc37ded] {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block;\n}\n.btn-disable[data-v-5dc37ded] {\n  background-color: #eee;\n  border-color: #eee;\n  color: black;\n}\n.mask[data-v-5dc37ded] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  overflow: auto;\n}\n.place-holder[data-v-5dc37ded] {\n  text-align: center;\n  margin-top: 200px;\n}\n.panel[data-v-5dc37ded] {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative;\n}\n.panel .close[data-v-5dc37ded] {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer;\n}\n.image-list[data-v-5dc37ded] {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0;\n}\n.image-list[data-v-5dc37ded]:before, .image-list[data-v-5dc37ded]:after {\n    content: \" \";\n    display: table;\n}\n.image-list[data-v-5dc37ded]:after {\n    clear: both;\n}\n.image-item[data-v-5dc37ded] {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top;\n}\n.image-item .title[data-v-5dc37ded] {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none;\n}\n.image-item .cover[data-v-5dc37ded] {\n    height: 100%;\n}\n.image-item .loader[data-v-5dc37ded] {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px;\n}\n.percent[data-v-5dc37ded] {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n}\n.percent .percent-inner[data-v-5dc37ded] {\n    height: 4px;\n    background: #20a0ff;\n    width: 0;\n}\nh3[data-v-5dc37ded] {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative;\n}\n.bottom[data-v-5dc37ded] {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee;\n}\n.save-btn[data-v-5dc37ded] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n.panel-mask[data-v-5dc37ded] {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  z-index: 99;\n}\n.panel-dialog[data-v-5dc37ded] {\n  background: white;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  left: 50%;\n  margin-top: -150px;\n  margin-left: -120px;\n  width: 240px;\n  border-radius: 3px;\n  box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.3);\n}\n.panel-dialog-text[data-v-5dc37ded] {\n  margin-top: 25px;\n  margin-bottom: 25px;\n}\n.ok[data-v-5dc37ded] {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px;\n}\n.btn-ios[data-v-5dc37ded] {\n  color: #0087ec;\n  border-width: 0;\n  border-top: 1px solid #eee;\n  text-align: center;\n  padding: 8px;\n  cursor: pointer;\n}\n@media (max-width: 1300px) {\n.panel[data-v-5dc37ded] {\n    margin-top: 20px;\n}\n}\n", "", {"version":3,"sources":["/Users/jump/GitHub/vue-image-uploader/src/uploader.scss"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,0BAA0B;EAC1B,sBAAsB;EACtB,aAAa;EACb,cAAc;EACd,UAAU;EACV,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,gBAAgB;EAChB,sBAAsB;CAAE;AAE1B;EACE,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;CAAE;AAEjB;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,gBAAgB;EAChB,eAAe;CAAE;AAEnB;EACE,mBAAmB;EACnB,kBAAkB;CAAE;AAEtB;EACE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,0BAA0B;EAC1B,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;CAAE;AAEtB;EACE,cAAc;EACd,eAAe;EACf,cAAc;EACd,iBAAiB;CAAE;AACnB;IACE,aAAa;IACb,eAAe;CAAE;AACnB;IACE,YAAY;CAAE;AAElB;EACE,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,oBAAoB;CAAE;AACtB;IACE,+BAA+B;IAC/B,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,gBAAgB;IAChB,kBAAkB;CAAE;AACtB;IACE,aAAa;CAAE;AACjB;IACE,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;CAAE;AAEzB;EACE,YAAY;EACZ,YAAY;EACZ,qCAAqC;EACrC,mBAAmB;EACnB,UAAU;EACV,QAAQ;CAAE;AACV;IACE,YAAY;IACZ,oBAAoB;IACpB,SAAS;CAAE;AAEf;EACE,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B;CAAE;AAE/B;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CAAE;AAEd;EACE,OAAO;EACP,UAAU;EACV,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,mBAAmB;EACnB,YAAY;CAAE;AAEhB;EACE,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,aAAa;EACb,mBAAmB;EACnB,4CAA4C;CAAE;AAEhD;EACE,iBAAiB;EACjB,oBAAoB;CAAE;AAExB;EACE,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,YAAY;CAAE;AAEhB;EACE,eAAe;EACf,gBAAgB;EAChB,2BAA2B;EAC3B,mBAAmB;EACnB,aAAa;EACb,gBAAgB;CAAE;AAEpB;AACE;IACE,iBAAiB;CAAE;CAAE","file":"uploader.scss","sourcesContent":[".btn {\n  color: #fff;\n  background-color: #20a0ff;\n  border-color: #20a0ff;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block; }\n\n.btn-disable {\n  background-color: #eee;\n  border-color: #eee;\n  color: black; }\n\n.mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  overflow: auto; }\n\n.place-holder {\n  text-align: center;\n  margin-top: 200px; }\n\n.panel {\n  width: 750px;\n  background: white;\n  color: #333;\n  margin: 100px auto 0 auto;\n  position: relative; }\n  .panel .close {\n    position: absolute;\n    padding: 1px 15px;\n    right: 0;\n    top: 0;\n    font-size: 28px;\n    color: gray;\n    cursor: pointer; }\n\n.image-list {\n  height: 500px;\n  overflow: auto;\n  padding: 15px;\n  padding-right: 0; }\n  .image-list:before, .image-list:after {\n    content: \" \";\n    display: table; }\n  .image-list:after {\n    clear: both; }\n\n.image-item {\n  float: left;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  border: 1px solid #eee;\n  box-sizing: border-box;\n  width: 140px;\n  height: 140px;\n  margin: 1px 1px 1px 0;\n  vertical-align: top; }\n  .image-item .title {\n    background: rgba(0, 0, 0, 0.8);\n    color: white;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    font-size: 14px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .image-item .cover {\n    height: 100%; }\n  .image-item .loader {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 44px;\n    margin-top: -24px;\n    margin-left: -22px; }\n\n.percent {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  bottom: 0;\n  left: 0; }\n  .percent .percent-inner {\n    height: 4px;\n    background: #20a0ff;\n    width: 0; }\n\nh3 {\n  padding: 10px 15px;\n  border: 1px solid #eee;\n  margin: 0;\n  position: relative; }\n\n.bottom {\n  position: relative;\n  padding: 10px 15px;\n  border-top: 1px solid #eee; }\n\n.save-btn {\n  position: absolute;\n  right: 15px;\n  top: 10px; }\n\n.panel-mask {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  z-index: 99; }\n\n.panel-dialog {\n  background: white;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  left: 50%;\n  margin-top: -150px;\n  margin-left: -120px;\n  width: 240px;\n  border-radius: 3px;\n  box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.3); }\n\n.panel-dialog-text {\n  margin-top: 25px;\n  margin-bottom: 25px; }\n\n.ok {\n  position: absolute;\n  bottom: 3px;\n  right: 5px;\n  width: 32px; }\n\n.btn-ios {\n  color: #0087ec;\n  border-width: 0;\n  border-top: 1px solid #eee;\n  text-align: center;\n  padding: 8px;\n  cursor: pointer; }\n\n@media (max-width: 1300px) {\n  .panel {\n    margin-top: 20px; } }\n"],"sourceRoot":""}]);

  // exports


  /***/ }),

  /***/ "./node_modules/css-loader/lib/css-base.js":
  /*!*************************************************!*\
    !*** ./node_modules/css-loader/lib/css-base.js ***!
    \*************************************************/
  /*! no static exports found */
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
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
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

  /***/ "./node_modules/vue-loader/lib/runtime/component-normalizer.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/vue-loader/lib/runtime/component-normalizer.js ***!
    \*********************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
  /* globals __VUE_SSR_CONTEXT__ */

  // IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
  // This module is a runtime utility for cleaner component module output and will
  // be included in the final webpack user bundle.

  function normalizeComponent (
    scriptExports,
    render,
    staticRenderFns,
    functionalTemplate,
    injectStyles,
    scopeId,
    moduleIdentifier, /* server only */
    shadowMode /* vue-cli only */
  ) {
    scriptExports = scriptExports || {};

    // ES6 modules interop
    var type = typeof scriptExports.default;
    if (type === 'object' || type === 'function') {
      scriptExports = scriptExports.default;
    }

    // Vue.extend constructor export interop
    var options = typeof scriptExports === 'function'
      ? scriptExports.options
      : scriptExports;

    // render functions
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }

    // functional template
    if (functionalTemplate) {
      options.functional = true;
    }

    // scopedId
    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;
    if (moduleIdentifier) { // server build
      hook = function (context) {
        // 2.3 injection
        context =
          context || // cached call
          (this.$vnode && this.$vnode.ssrContext) || // stateful
          (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
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
      hook = shadowMode
        ? function () { injectStyles.call(this, this.$root.$options.shadowRoot); }
        : injectStyles;
    }

    if (hook) {
      if (options.functional) {
        // for template-only hot-reload because in that case the render fn doesn't
        // go through the normalizer
        options._injectStyles = hook;
        // register for functioal component in vue file
        var originalRender = options.render;
        options.render = function renderWithStyleInjection (h, context) {
          hook.call(context);
          return originalRender(h, context)
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing
          ? [].concat(existing, hook)
          : [hook];
      }
    }

    return {
      exports: scriptExports,
      options: options
    }
  }


  /***/ }),

  /***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-05e646cd\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./src/videoUploader/index.html":
  /*!**************************************************************************************************************************************************************************!*\
    !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-05e646cd","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./src/videoUploader/index.html ***!
    \**************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.show,
              expression: "show"
            }
          ],
          staticClass: "mask",
          style: { zIndex: _vm.zIndex }
        },
        [
          _c("div", { staticClass: "panel" }, [
            _vm.showPanelMask
              ? _c("div", { staticClass: "panel-mask" }, [
                  _vm.maskText
                    ? _c("div", { staticClass: "panel-dialog" }, [
                        _c("div", { staticClass: "panel-dialog-text" }, [
                          _vm._v(_vm._s(_vm.maskText))
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "btn-ios",
                            on: { click: _vm.closeDialog }
                          },
                          [_vm._v("确 定")]
                        )
                      ])
                    : _vm._e()
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("h3", [
              _vm._v("选择视频\n                "),
              _c(
                "span",
                {
                  staticClass: "close",
                  on: {
                    click: function($event) {
                      return _vm.close(true)
                    }
                  }
                },
                [_vm._v("×")]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { ref: "frame", staticClass: "image-list" },
              [
                _vm.files.length === 0
                  ? [
                      _c("div", { staticClass: "place-holder" }, [
                        _c("img", {
                          attrs: { src: __webpack_require__(/*! ../images/add.png */ "./src/images/add.png"), alt: "" },
                          on: { click: _vm.addFile }
                        }),
                        _vm._v(" "),
                        _c("div", [
                          _c(
                            "span",
                            { staticClass: "btn", on: { click: _vm.addFile } },
                            [_vm._v("请添加视频")]
                          )
                        ])
                      ])
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm._l(_vm.files, function(file) {
                  return _c(
                    "div",
                    { staticClass: "image-item" },
                    [
                      _c(
                        "div",
                        { staticClass: "title" },
                        [
                          file.status === 2
                            ? [_c("span", [_vm._v("上传成功")])]
                            : _vm._e(),
                          _vm._v(" "),
                          file.status === 3
                            ? [_c("span", [_vm._v("上传失败")])]
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticStyle: { float: "right" },
                              on: {
                                click: function($event) {
                                  return _vm.del(file)
                                }
                              }
                            },
                            [_vm._v("删除")]
                          )
                        ],
                        2
                      ),
                      _vm._v(" "),
                      file.status === 1
                        ? [
                            _c("img", {
                              staticClass: "loader",
                              attrs: {
                                src: __webpack_require__(/*! ../images/loader.svg */ "./src/images/loader.svg"),
                                alt: ""
                              }
                            })
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _c("img", {
                        staticClass: "cover",
                        staticStyle: { height: "64px", "margin-top": "36px" },
                        attrs: { src: __webpack_require__(/*! ../images/video.png */ "./src/images/video.png"), alt: "" }
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "name" }, [
                        _vm._v(_vm._s(file.name))
                      ]),
                      _vm._v(" "),
                      file.percent && _vm.showProgress
                        ? _c("div", { staticClass: "percent" }, [
                            _c("div", {
                              staticClass: "percent-inner",
                              style: _vm.percentStyle(file)
                            })
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      file.status === 2
                        ? _c("img", {
                            staticClass: "ok",
                            attrs: { src: __webpack_require__(/*! ../images/ok.png */ "./src/images/ok.png"), alt: "" }
                          })
                        : _vm._e()
                    ],
                    2
                  )
                }),
                _vm._v(" "),
                _vm.files.length > 0
                  ? _c(
                      "div",
                      { staticClass: "image-item", on: { click: _vm.addFile } },
                      [
                        _c("img", {
                          staticStyle: { "margin-top": "25px" },
                          attrs: {
                            src: __webpack_require__(/*! ../images/add.png */ "./src/images/add.png"),
                            alt: "添加视频"
                          }
                        })
                      ]
                    )
                  : _vm._e()
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "bottom" },
              [
                _vm._v(
                  "\n                选择" +
                    _vm._s(_vm.files.length) +
                    "个视频，需要上传 " +
                    _vm._s(_vm.files.length - _vm.uploadSuccessNum) +
                    "个\n                "
                ),
                _vm.uploadFinish
                  ? [
                      _c(
                        "span",
                        {
                          staticClass: "btn",
                          staticStyle: { "margin-left": "15px" },
                          on: {
                            click: function($event) {
                              return _vm.up()
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        上传\n                    "
                          )
                        ]
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                !_vm.uploadFinish
                  ? [
                      _c(
                        "span",
                        {
                          staticClass: "btn btn-disable",
                          staticStyle: { "margin-left": "15px" },
                          on: {
                            click: function($event) {
                              return _vm.up()
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        上传中...\n                    "
                          )
                        ]
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "btn save-btn",
                    on: {
                      click: function($event) {
                        return _vm.close()
                      }
                    }
                  },
                  [_vm._v("确 定")]
                ),
                _vm._v(" "),
                _c("input", {
                  ref: "fileInput",
                  staticStyle: { display: "none" },
                  attrs: { type: "file", multiple: "" },
                  on: { change: _vm.selectFile }
                })
              ],
              2
            )
          ])
        ]
      )
    ])
  };
  var staticRenderFns = [];
  render._withStripped = true;

  /***/ }),

  /***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5dc37ded\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./src/imageUploader/index.html":
  /*!**************************************************************************************************************************************************************************!*\
    !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5dc37ded","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./src/imageUploader/index.html ***!
    \**************************************************************************************************************************************************************************/
  /*! exports provided: render, staticRenderFns */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.show,
              expression: "show"
            }
          ],
          staticClass: "mask",
          style: { zIndex: _vm.zIndex }
        },
        [
          _c("div", { staticClass: "panel" }, [
            _vm.showPanelMask
              ? _c("div", { staticClass: "panel-mask" }, [
                  _vm.maskText
                    ? _c("div", { staticClass: "panel-dialog" }, [
                        _c("div", { staticClass: "panel-dialog-text" }, [
                          _vm._v(_vm._s(_vm.maskText))
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "btn-ios",
                            on: { click: _vm.closeDialog }
                          },
                          [_vm._v("确 定")]
                        )
                      ])
                    : _vm._e()
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("h3", [
              _vm._v("选择图片\n                "),
              _c(
                "span",
                {
                  staticClass: "close",
                  on: {
                    click: function($event) {
                      return _vm.close(true)
                    }
                  }
                },
                [_vm._v("×")]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { ref: "frame", staticClass: "image-list" },
              [
                _vm.files.length === 0
                  ? [
                      _c("div", { staticClass: "place-holder" }, [
                        _c("img", {
                          attrs: { src: __webpack_require__(/*! ../images/add.png */ "./src/images/add.png"), alt: "" },
                          on: { click: _vm.addFile }
                        }),
                        _vm._v(" "),
                        _c("div", [
                          _c(
                            "span",
                            { staticClass: "btn", on: { click: _vm.addFile } },
                            [_vm._v("请添加图片")]
                          )
                        ])
                      ])
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm._l(_vm.files, function(file) {
                  return _c(
                    "div",
                    { staticClass: "image-item" },
                    [
                      _c(
                        "div",
                        { staticClass: "title" },
                        [
                          file.status === 2
                            ? [_c("span", [_vm._v("上传成功")])]
                            : _vm._e(),
                          _vm._v(" "),
                          file.status === 3
                            ? [_c("span", [_vm._v("上传失败")])]
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticStyle: { float: "right" },
                              on: {
                                click: function($event) {
                                  return _vm.del(file)
                                }
                              }
                            },
                            [_vm._v("删除")]
                          )
                        ],
                        2
                      ),
                      _vm._v(" "),
                      file.status === 1
                        ? [
                            _c("img", {
                              staticClass: "loader",
                              attrs: {
                                src: __webpack_require__(/*! ../images/loader.svg */ "./src/images/loader.svg"),
                                alt: ""
                              }
                            })
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _c("img", {
                        staticClass: "cover",
                        attrs: { src: file.thumb, alt: "" }
                      }),
                      _vm._v(" "),
                      file.percent && _vm.showProgress
                        ? _c("div", { staticClass: "percent" }, [
                            _c("div", {
                              staticClass: "percent-inner",
                              style: _vm.percentStyle(file)
                            })
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      file.status === 2
                        ? _c("img", {
                            staticClass: "ok",
                            attrs: { src: __webpack_require__(/*! ../images/ok.png */ "./src/images/ok.png"), alt: "" }
                          })
                        : _vm._e()
                    ],
                    2
                  )
                }),
                _vm._v(" "),
                _vm.files.length > 0
                  ? _c(
                      "div",
                      { staticClass: "image-item", on: { click: _vm.addFile } },
                      [
                        _c("img", {
                          staticStyle: { "margin-top": "25px" },
                          attrs: {
                            src: __webpack_require__(/*! ../images/add.png */ "./src/images/add.png"),
                            alt: "添加视频"
                          }
                        })
                      ]
                    )
                  : _vm._e()
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "bottom" },
              [
                _vm._v(
                  "\n                选择" +
                    _vm._s(_vm.files.length) +
                    "个图片，需要上传 " +
                    _vm._s(_vm.files.length - _vm.uploadSuccessNum) +
                    "个\n                "
                ),
                _vm.uploadFinish
                  ? [
                      _c(
                        "span",
                        {
                          staticClass: "btn",
                          staticStyle: { "margin-left": "15px" },
                          on: {
                            click: function($event) {
                              return _vm.up()
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        上传\n                    "
                          )
                        ]
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                !_vm.uploadFinish
                  ? [
                      _c(
                        "span",
                        {
                          staticClass: "btn btn-disable",
                          staticStyle: { "margin-left": "15px" },
                          on: {
                            click: function($event) {
                              return _vm.up()
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        上传中...\n                    "
                          )
                        ]
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "btn save-btn",
                    on: {
                      click: function($event) {
                        return _vm.close()
                      }
                    }
                  },
                  [_vm._v("确 定")]
                ),
                _vm._v(" "),
                _c("input", {
                  ref: "fileInput",
                  staticStyle: { display: "none" },
                  attrs: { accept: _vm.fileAccept, type: "file", multiple: "" },
                  on: { change: _vm.selectFile }
                })
              ],
              2
            )
          ])
        ]
      )
    ])
  };
  var staticRenderFns = [];
  render._withStripped = true;

  /***/ }),

  /***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-05e646cd\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss":
  /*!************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/vue-style-loader!./node_modules/css-loader?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-05e646cd","scoped":true,"sourceMap":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss ***!
    \************************************************************************************************************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // style-loader: Adds some css to the DOM by adding a <style> tag

  // load the styles
  var content = __webpack_require__(/*! !../node_modules/css-loader?sourceMap!../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-05e646cd","scoped":true,"sourceMap":true}!../node_modules/sass-loader/lib/loader.js!./uploader.scss */ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-05e646cd\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss");
  if(typeof content === 'string') content = [[module.i, content, '']];
  if(content.locals) module.exports = content.locals;
  // add the styles to the DOM
  var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default;
  var update = add("24efd7d8", content, false, {});

  /***/ }),

  /***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5dc37ded\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss":
  /*!************************************************************************************************************************************************************************************************************************************************************************!*\
    !*** ./node_modules/vue-style-loader!./node_modules/css-loader?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-5dc37ded","scoped":true,"sourceMap":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss ***!
    \************************************************************************************************************************************************************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  // style-loader: Adds some css to the DOM by adding a <style> tag

  // load the styles
  var content = __webpack_require__(/*! !../node_modules/css-loader?sourceMap!../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"id":"data-v-5dc37ded","scoped":true,"sourceMap":true}!../node_modules/sass-loader/lib/loader.js!./uploader.scss */ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5dc37ded\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss");
  if(typeof content === 'string') content = [[module.i, content, '']];
  if(content.locals) module.exports = content.locals;
  // add the styles to the DOM
  var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default;
  var update = add("3deb3d6a", content, false, {});

  /***/ }),

  /***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
  /*!**************************************************************!*\
    !*** ./node_modules/vue-style-loader/lib/addStylesClient.js ***!
    \**************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
  /* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listToStyles */ "./node_modules/vue-style-loader/lib/listToStyles.js");
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
  var options = null;
  var ssrIdKey = 'data-vue-ssr-id';

  // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

  function addStylesClient (parentId, list, _isProduction, _options) {
    isProduction = _isProduction;

    options = _options || {};

    var styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, list);
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
        styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, newList);
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
  }

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
    var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]');

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
      if (childNodes[index]) styleElement.removeChild(childNodes[index]);
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
    if (options.ssrId) {
      styleElement.setAttribute(ssrIdKey, obj.id);
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

  /***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
  /*!***********************************************************!*\
    !*** ./node_modules/vue-style-loader/lib/listToStyles.js ***!
    \***********************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listToStyles; });
  /**
   * Translates the list format produced by css-loader into something
   * easier to manipulate.
   */
  function listToStyles (parentId, list) {
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
  }


  /***/ }),

  /***/ "./src/baseViewCtrl.js":
  /*!*****************************!*\
    !*** ./src/baseViewCtrl.js ***!
    \*****************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
      value: true
  });

  var _func = __webpack_require__(/*! ./func */ "./src/func.js");

  exports.default = {
      data: function data() {
          return {
              files: [],
              uploadSuccessNum: 0,
              boxWidth: 0,
              uploadFinish: true,
              showPanelMask: false,
              maskText: '',
              thumb: true
          };
      },

      watch: {
          show: function show(newVal) {

              // 当打开的时候
              if (newVal) {
                  //禁止body滚动
                  document.body.style.overflow = 'hidden';
                  this.files = this._uploader.getFiles();

                  document.addEventListener('keydown', this.onEsc, false);
              } else {
                  document.removeEventListener('keydown', this.onEsc, false);
              }
          },
          files: function files(newVal) {
              var num = 0;
              newVal.forEach(function (item) {
                  if (item.returnJson && item.returnJson.success) {
                      num++;
                  }
              });
              (0, _func.log)('files update');
              this.uploadSuccessNum = num;
          }
      },

      methods: {
          onEsc: function onEsc(e) {
              if (e.keyCode === 27) {
                  this.close();
              }
          },

          selectFile: function selectFile(e) {
              var files = e.target.files;
              var self = this;
              for (var i = 0; i < files.length; i++) {
                  var file = files[i];
                  self._uploader.addFile(file);
              }
              // 避免vue不更新
              self.files = self._uploader.getFiles();
          },
          up: function up() {
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
          mask: function mask(text) {
              this.showPanelMask = true;
              if (text) {
                  this.maskText = text;
              }
          },

          del: function del(file) {
              this._uploader.removeFile(file);
              this.files = this._uploader.getFiles();
          },
          addFile: function addFile() {
              this.$refs.fileInput.value = null;
              this.$refs.fileInput.click();
          },
          closeDialog: function closeDialog() {
              this.showPanelMask = false;
              this.maskText = '';
          },
          close: function close(cancel) {
              var me = this;
              var files = [];
              var isAllFinish = true;
              if (!cancel) {
                  me.files.forEach(function (item) {
                      if (item.returnJson && item.returnJson.success) {
                          files.push(item.returnJson);
                      } else {
                          isAllFinish = false;
                          return false;
                      }
                  });
              }
              if (!isAllFinish) {
                  me.mask('有未上传文件');
                  return false;
              }

              //不再禁止滚动
              document.body.style.overflow = '';
              me.$emit('finish', files);
              me.files = [];
              // 上传状态
              me.uploadFinish = true;
              me.uploadSuccessNum = 0;
              me._uploader.clear();
          },
          percentStyle: function percentStyle(file) {
              return {
                  width: file.percent + '%'
              };
          }
      }
  };

  /***/ }),

  /***/ "./src/ctrl.js":
  /*!*********************!*\
    !*** ./src/ctrl.js ***!
    \*********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        if (event in this._events === false) return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
      }
    }, {
      key: "trigger",
      value: function trigger(event /* , args... */) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        for (var i = 0; i < this._events[event].length; i++) {
          this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      }
    }]);

    return Ctrl;
  }();

  exports.default = Ctrl;

  /***/ }),

  /***/ "./src/func.js":
  /*!*********************!*\
    !*** ./src/func.js ***!
    \*********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  var counter = 0;

  module.exports = {
    UPLOAD_STATUS: {
      WAIT: 0,
      UPLOAD_ING: 1,
      SUCESS: 2,
      FAILED: 3
    },
    log: function log(info) {
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

  /***/ "./src/imageUploader/uploader.vue":
  /*!****************************************!*\
    !*** ./src/imageUploader/uploader.vue ***!
    \****************************************/
  /*! no static exports found */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!./main.js */ "./node_modules/babel-loader/lib/index.js!./src/imageUploader/main.js");
  /* harmony import */ var _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__[key]; }); }(__WEBPACK_IMPORT_KEY__));
  /* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_5dc37ded_hasScoped_true_optionsId_0_buble_transforms_index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/template-compiler/index?{"id":"data-v-5dc37ded","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./index.html */ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5dc37ded\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./src/imageUploader/index.html");
  /* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/component-normalizer */ "./node_modules/vue-loader/lib/runtime/component-normalizer.js");
  function injectStyle (context) {
    __webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index?{"optionsId":"0","vue":true,"id":"data-v-5dc37ded","scoped":true,"sourceMap":true}!sass-loader!../uploader.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5dc37ded\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss");
  }
  /* script */

  /* template */

  /* template functional */
  var __vue_template_functional__ = false;
  /* styles */
  var __vue_styles__ = injectStyle;
  /* scopeId */
  var __vue_scopeId__ = "data-v-5dc37ded";
  /* moduleIdentifier (server only) */
  var __vue_module_identifier__ = null;

  var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__["default"])(
    _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0___default.a,
    _node_modules_vue_loader_lib_template_compiler_index_id_data_v_5dc37ded_hasScoped_true_optionsId_0_buble_transforms_index_html__WEBPACK_IMPORTED_MODULE_1__["render"],
    _node_modules_vue_loader_lib_template_compiler_index_id_data_v_5dc37ded_hasScoped_true_optionsId_0_buble_transforms_index_html__WEBPACK_IMPORTED_MODULE_1__["staticRenderFns"],
    __vue_template_functional__,
    __vue_styles__,
    __vue_scopeId__,
    __vue_module_identifier__
  );
  Component.options.__file = "src/imageUploader/uploader.vue";

  /* harmony default export */ __webpack_exports__["default"] = (Component.exports);


  /***/ }),

  /***/ "./src/images/add.png":
  /*!****************************!*\
    !*** ./src/images/add.png ***!
    \****************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABLCAIAAAB7tddWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Q0VBNzA0MjEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Q0VBNzA0MzEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkY1MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkY2MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K6izdgAAAvpJREFUeNrsnFmPqkAQhWmX667gEp9c/v+/MkSDG+4LrvdcSYgRbw/0ALZQ9WBUJOn+uqvqHGCG3e93hUJRUoSAQBAIAkEgCASBIBAE4neRicEcII51Xb/dbnjPGOt0OqlUKok7ApN3jIKwY6DUIBAEgkAQCALho/X47TeXy8U0TcuyrtdrZKPs9/v2m8FgINYgf9QX/gTV+Xw2DCNKBJKmxmKxsAVc0kEcDgfyGq8CNp/Pa5qWy+WiHG6v13v7/XPt6Ha7Al5D3HQ1Go1sNkvtU8lkMsmtESSoCASBSFqEW/DQ0tbr9W63O51OKK6FQkFV1XQ6nSwQ0OOTyQSvjknZbDaA0mq1QCQafSFFasxmM4eCE1Do0+lUQrcSFggsPhzq20NgsVqtkpIax+MxMs+C/aXruvMxaonND75J9W5hUWWxuYAVdRfTg8EplUphGJywQPAFuBd5Dlhw/aDwwgVtCDgCdzph1QisG+dosVjkn44WYxjGC4XnvBuNRtvt9gtA2Hv47SGsZKVS4ef8eDzG4vMVCrpSgEU3xPbZbDar1erLl1AQ7XabU8xAAXvB3XffBnIHwkR2QcUYq9fr5XIZOxkTg6BEkeNLKdQF7AWPFBy1AoUmu8RG/HmE91nxM+J/ORIr07VcLvf7feCt+stAQGIBRNJtOJolDAhdj/hXGj5+u+TzIKAF+MbkK00XFta2BhDRUE0/9gv8Elogbu4TBW8+nyPhHSeuaVqtVuNQC6TzyQUCXsg0TbfyAxfIKogr9ynP1GJyYQZ57qbg7AuIRfclKZwSlDqWBQSmxM9zFALYh+fFBwJJSkNgqeFxSrAPw+EQ9QJew7Is2Sj8FgSW2nu1gylYPkKRMsRTA+4IcjA2fxsnDkLOq/IfACFP54uP1yAQBIJAEIh4gWCPkHk+GJ7AjU/fICJ+qlIghEfoDwQMtRjvyLYDRih4rsDT+bBM9tP5kuhrzN++e6SqqvCdYUb/SIO6BoEgEASCQBAIAkEgCEQg8VeAAQAB1bbO2qoeewAAAABJRU5ErkJggg==";

  /***/ }),

  /***/ "./src/images/loader.svg":
  /*!*******************************!*\
    !*** ./src/images/loader.svg ***!
    \*******************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDJweCcgaGVpZ2h0PSc0MnB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ3JyB5PSc0MCcgd2lkdGg9JzYnIGhlaWdodD0nMjAnIHJ4PSczJyByeT0nMycgZmlsbD0nIzdkN2Q3ZCcgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzBzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMDgzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMTY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMjVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjMzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjQxNjY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjU4MzMzMzMzMzMzMzMzMzRzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDcnIHk9JzQwJyB3aWR0aD0nNicgaGVpZ2h0PScyMCcgcng9JzMnIHJ5PSczJyBmaWxsPScjN2Q3ZDdkJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjc1cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ3JyB5PSc0MCcgd2lkdGg9JzYnIGhlaWdodD0nMjAnIHJ4PSczJyByeT0nMycgZmlsbD0nIzdkN2Q3ZCcgdHJhbnNmb3JtPSdyb3RhdGUoMzAwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC44MzMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ3JyB5PSc0MCcgd2lkdGg9JzYnIGhlaWdodD0nMjAnIHJ4PSczJyByeT0nMycgZmlsbD0nIzdkN2Q3ZCcgdHJhbnNmb3JtPSdyb3RhdGUoMzMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC45MTY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PC9zdmc+";

  /***/ }),

  /***/ "./src/images/ok.png":
  /*!***************************!*\
    !*** ./src/images/ok.png ***!
    \***************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAACIUlEQVRYR+2X8VXbMBDGv5ugMEHFBMAETTdgA6wJCBOQTkA6gegG3QCYALqBugGd4PrOuRDjSJbsCGzes/9MzrqfvtN9JxM+yUOfhBMzaOlKzYrOipZW4ND1jOMjEG7A+OstrSd5Ro3jCoRbAEdgXE8S1Di+A+HytSKM797Sw6QU3YMU2qmBBiGnBhqF3IBab+lu9NJr47ioSzB+eEurUUGN4zMQ7uvujj1jg6pPCuRZp+cyfnpLy9EUNY7XIFwlBwPj0VtajAJqHC+05ElOMH55S9VYoM8gnCZK/g9A5S39lrjioKKWTJIYhHG8qmd418N4BHDhLb1sw4qBageLzRgwTppJtsmMYwPCU6LL61K391EE1Dheqkobm1FLaSczjh9A+NZhRbW5h/4/CFQVEhUXrcVffEXHzd+SDaQTKLaJwaB7KrYztBIbx/EGSkAOaiY1alHxIuEt3ld0IjGdYzIDchCoJjYApHt398YQtUIYxx6Er3shOnXSZnqgPdVnFJCLbqxBvNx+guauRp4DOVjRQDcvVeEvgcTihW8vHYw/3lL3jG8tNLiZArCSWOwnBLsLZ8jEMSGf7VK3GKie3TSsflrklrz4ZGpMnzhsZBDkQBdVtAErn7tvb+0DzmVzA+8CGvROxrm39JyjXvERmkqq0+s2NvtT73+Ioo1jsBbr6tvl7U28W+n7qJUTO4PmqNQnZla0j1o5sbOiOSr1ifkPfFnUK5jHM9IAAAAASUVORK5CYII=";

  /***/ }),

  /***/ "./src/images/video.png":
  /*!******************************!*\
    !*** ./src/images/video.png ***!
    \******************************/
  /*! no static exports found */
  /***/ (function(module, exports) {

  module.exports = "data:image/png;base64,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";

  /***/ }),

  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _uploader = __webpack_require__(/*! ./imageUploader/uploader.vue */ "./src/imageUploader/uploader.vue");

  var _uploader2 = _interopRequireDefault(_uploader);

  var _uploader3 = __webpack_require__(/*! ./videoUploader/uploader.vue */ "./src/videoUploader/uploader.vue");

  var _uploader4 = _interopRequireDefault(_uploader3);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = {
    VueImageUploader: _uploader2.default, VueVideoUploader: _uploader4.default
  };

  /***/ }),

  /***/ "./src/props.js":
  /*!**********************!*\
    !*** ./src/props.js ***!
    \**********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


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
          timeout: 120
        };
      },
      type: Object
    }
  };

  /***/ }),

  /***/ "./src/uploader.js":
  /*!*************************!*\
    !*** ./src/uploader.js ***!
    \*************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {


  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _ctrl = __webpack_require__(/*! ./ctrl */ "./src/ctrl.js");

  var _ctrl2 = _interopRequireDefault(_ctrl);

  var _func = __webpack_require__(/*! ./func */ "./src/func.js");

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        // 超时
        console.log(options.timeout);
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
            if (options.onError) {
              return option.onError(xhr);
            } else {
              return false;
            }
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
        xhr.onabort = onNetError;
        // 无网络等原因导致错误
        xhr.onerror = onNetError;
        // 请求超时
        xhr.ontimeout = onNetError;
        function updateProgress(event) {
          console.log(event.loaded);
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

  /***/ "./src/videoUploader/uploader.vue":
  /*!****************************************!*\
    !*** ./src/videoUploader/uploader.vue ***!
    \****************************************/
  /*! no static exports found */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!./main.js */ "./node_modules/babel-loader/lib/index.js!./src/videoUploader/main.js");
  /* harmony import */ var _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0__[key]; }); }(__WEBPACK_IMPORT_KEY__));
  /* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_05e646cd_hasScoped_true_optionsId_0_buble_transforms_index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/template-compiler/index?{"id":"data-v-05e646cd","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./index.html */ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-05e646cd\",\"hasScoped\":true,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./src/videoUploader/index.html");
  /* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/component-normalizer */ "./node_modules/vue-loader/lib/runtime/component-normalizer.js");
  function injectStyle (context) {
    __webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index?{"optionsId":"0","vue":true,"id":"data-v-05e646cd","scoped":true,"sourceMap":true}!sass-loader!../uploader.scss */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-05e646cd\",\"scoped\":true,\"sourceMap\":true}!./node_modules/sass-loader/lib/loader.js!./src/uploader.scss");
  }
  /* script */

  /* template */

  /* template functional */
  var __vue_template_functional__ = false;
  /* styles */
  var __vue_styles__ = injectStyle;
  /* scopeId */
  var __vue_scopeId__ = "data-v-05e646cd";
  /* moduleIdentifier (server only) */
  var __vue_module_identifier__ = null;

  var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__["default"])(
    _babel_loader_main_js__WEBPACK_IMPORTED_MODULE_0___default.a,
    _node_modules_vue_loader_lib_template_compiler_index_id_data_v_05e646cd_hasScoped_true_optionsId_0_buble_transforms_index_html__WEBPACK_IMPORTED_MODULE_1__["render"],
    _node_modules_vue_loader_lib_template_compiler_index_id_data_v_05e646cd_hasScoped_true_optionsId_0_buble_transforms_index_html__WEBPACK_IMPORTED_MODULE_1__["staticRenderFns"],
    __vue_template_functional__,
    __vue_styles__,
    __vue_scopeId__,
    __vue_module_identifier__
  );
  Component.options.__file = "src/videoUploader/uploader.vue";

  /* harmony default export */ __webpack_exports__["default"] = (Component.exports);


  /***/ })

  /******/ });
  //# sourceMappingURL=vueUploader.js.map
  });

  var vueUploader$1 = unwrapExports(vueUploader);

  var template$3 = "<div> <image-uploader :z-index=\"9000\" :show-progress=\"true\" :show=\"true\" :url=\"serverUrl\" @finish=\"onFinish\"></image-uploader> </div>";

  console.log(vueUploader$1);
  /**
   * Created by peak on 2017/2/10.
   */

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
      };
    },
    methods: {
      insertImageUrl: function insertImageUrl() {
        if (!this.imageUrl) {
          return;
        }

        this.insertImg(this.imageUrl);
        this.imageUrl = null;
      },
      onFinish: function onFinish(files) {
        var self = this;
        var config = self.$options.module.config;
        var returnUrl = 'path';

        if (config.returnUrl) {
          returnUrl = config.returnUrl;
        }

        self.$parent.dashboard = null;
        var urlAr = [];
        files.forEach(function (item) {
          urlAr.push(item[returnUrl]);
        });

        if (urlAr.length > 0) {
          this.insertImg(urlAr);
        }
      },
      insertImg: function insertImg(url) {
        this.$parent.execCommand(Command.INSERT_IMAGE, url);
      }
    }
  };

  /**
   * insert image
   * Created by peak on 16/8/18.
   */

  var image = {
    name: 'image',
    icon: 'fa fa-file-image-o',
    i18n: 'image',
    config: {},
    dashboard: dashboard$3
  };

  var template$4 = "<div> <h3 style=\"text-align: center\">Vue-html5-editor&nbsp;{{version}}</h3> <p style=\"text-align: center\"> repository: <a href=\"https://github.com/PeakTai/vue-html5-editor\" target=\"_blank\"> https://github.com/PeakTai/vue-html5-editor </a> </p> </div> ";

  /**
   * Created by peak on 2017/2/10.
   */

  var dashboard$4 = {
    template: template$4,
    data: function data() {
      return {
        version: VERSION
      };
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

  var template$5 = "<form @submit.prevent=\"createLink\"> <input type=\"text\" class=\"search-input\" :placeholder=\"$parent.locale['please enter a url']\" v-model=\"url\" maxlength=\"1024\"> <input type=\"text\" class=\"search-title\" v-model=\"title\" placeholder=\"输入标题\"> <button type=\"submit\">{{$parent.locale[\"create link\"]}}</button> </form>";

  var dashboard$5 = {
    template: template$5,
    data: function data() {
      return {
        url: null,
        title: ''
      };
    },
    methods: {
      createLink: function createLink() {
        if (!this.url || !this.title) {
          return;
        }

        var str = ' <div>&nbsp;</div>' + '<a href="' + this.url + '" style="display: block;margin: 10px 0;color: #333;' + 'background: #f4f4f4;' + 'text-decoration: none!important;' + 'text-decoration-color: #f4f4f4;' + 'padding: 5px;' + 'overflow: hidden;' + 'border-radius: 8px;' + 'border: 1px solid #f0f0f0;' + 'line-height: 28px;">' + '<div style=" color: #157EFB;"><i class="icon-link2"></i>网页链接:</div>' + this.title + '</a>' + '<div>&nbsp;</div>';
        this.$parent.execCommand(Command.CREATE_LINK, str);
        this.url = null;
        this.title = null;
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

  /**
   * Created by peak on 2017/2/10.
   */

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

  /**
   * Created by peak on 2017/2/10.
   */

  var dashboard$7 = {
    template: template$7,
    data: function data() {
      return {
        rows: 2,
        cols: 2,
        hasHead: false,
        striped: false,
        hover: false
      };
    },
    methods: {
      insertTable: function insertTable() {
        if (this.rows < 2 || this.rows > 10) {
          return;
        }

        if (this.cols < 2 || this.cols > 10) {
          return;
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

  /**
   * insert table
   * Created by peak on 16/8/18.
   */

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

  var template$9 = "<div> <video-uploader :upload-config=\"uploadConfig\" :z-index=\"9000\" :show-progress=\"true\" :show=\"true\" :url=\"serverUrl\" @finish=\"onFinish\"></video-uploader> </div>";

  /**
   * Created by peak on 2017/2/10.
   */

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
        serverUrl: config.url,
        uploadConfig: config.uploadConfig
      };
    },
    methods: {
      insertImageUrl: function insertImageUrl() {
        if (!this.imageUrl) {
          return;
        }

        this.insertImg(this.imageUrl);
        this.imageUrl = null;
      },
      onFinish: function onFinish(files) {
        var self = this;
        var config = self.$options.module.config;
        var returnUrl = 'path';

        if (config.returnUrl) {
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

  /**
   * insert video
   */

  var video = {
    name: 'video',
    icon: 'fa fa-file-video-o',
    i18n: 'video',
    config: {},
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

  /**
   * build-in moduls
   * Created by peak on 2016/11/1.
   */

  var buildInModules = [text, color, font, align, list, link, unlink, table, image, indent, hr, eraser, undo, fullScreen, info, video, center, right, left];

  /**
   * Created by peak on 2017/2/15.
   */

  /**
   * add every elements of extArr to sourceArr.
   * @param sourceArr
   * @param extArr
   */
  var mergeArray = function mergeArray(sourceArr, extArr) {
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

  var getDescendantTextNodes = function getDescendantTextNodes(ancestor) {
    if (ancestor.nodeType === Node.TEXT_NODE) {
      return [ancestor];
    }

    var textNodes = [];

    if (!ancestor.hasChildNodes()) {
      return textNodes;
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

    return textNodes;
  };
  /**
   * find all the descendant text nodes of an ancestor element that before the specify end element,
   * the ancestor element must contains the end element.
   * @param ancestor
   * @param endEl
   */

  var getBeforeEndDescendantTextNodes = function getBeforeEndDescendantTextNodes(ancestor, endEl) {
    var textNodes = [];
    var endIndex = 0;

    for (var i = 0; i < ancestor.childNodes.length; i++) {
      if (ancestor.childNodes[i].contains(endEl)) {
        endIndex = i;
        break;
      }
    }

    for (var _i = 0; _i <= endIndex; _i++) {
      var node = ancestor.childNodes[_i];

      if (node === endEl) {
        mergeArray(textNodes, getDescendantTextNodes(node));
      } else if (_i === endIndex) {
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

    return textNodes;
  };
  /**
   * find all the descendant text nodes of an ancestor element that after the specify start element,
   * the ancestor element must contains the start element.
   * @param ancestor
   * @param startEl
   */

  var getAfterStartDescendantTextNodes = function getAfterStartDescendantTextNodes(ancestor, startEl) {
    var textNodes = [];
    var startIndex = 0;

    for (var i = 0; i < ancestor.childNodes.length; i++) {
      if (ancestor.childNodes[i].contains(startEl)) {
        startIndex = i;
        break;
      }
    }

    for (var _i2 = startIndex; _i2 < ancestor.childNodes.length; _i2++) {
      var node = ancestor.childNodes[_i2];

      if (node === startEl) {
        mergeArray(textNodes, getDescendantTextNodes(node));
      } else if (_i2 === startIndex) {
        if (node.nodeType === Node.TEXT_NODE) {
          textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          mergeArray(textNodes, getAfterStartDescendantTextNodes(node, startEl));
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        mergeArray(textNodes, getDescendantTextNodes(node));
      }
    }

    return textNodes;
  };
  /**
   * get the closest parent block node of a text node.
   * @param node
   * @return {Node}
   */

  var getParentBlockNode = function getParentBlockNode(node) {
    var blockNodeNames = ['DIV', 'P', 'SECTION', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'OL', 'UL', 'LI', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TABLE', 'ARTICLE', 'HEADER', 'FOOTER'];
    var container = node;

    while (container) {
      if (blockNodeNames.includes(container.nodeName)) {
        break;
      }

      container = container.parentNode;
    }

    return container;
  };
  var isInlineElement = function isInlineElement(node) {
    var inlineNodeNames = ['A', 'ABBR', 'ACRONYM', 'B', 'CITE', 'CODE', 'EM', 'I', 'FONT', 'IMG', 'S', 'SMALL', 'SPAN', 'STRIKE', 'STRONG', 'U', 'SUB', 'SUP'];
    return inlineNodeNames.includes(node.nodeName);
  };
  function getSelection() {
    return window.getSelection ? window.getSelection() : document.getSelection();
  } // 封装 document.queryCommandValue

  if (!Text.prototype.contains) {
    Text.prototype.contains = function contains(otherNode) {
      return this === otherNode;
    };
  }
  /**
   * Created by peak on 2017/2/14.
   */


  var RangeHandler =
  /*#__PURE__*/
  function () {
    /**
     * build range handler
     * @param {Range} range
     */
    function RangeHandler(range, editor) {
      _classCallCheck(this, RangeHandler);

      if (!range || !(range instanceof Range)) {
        throw new TypeError('cant\'t resolve range');
      }

      this.range = range;
      this.editor = editor;
      this.rootElement = editor.$refs.content;
    }
    /**
     * find all the text nodes in range
     */


    _createClass(RangeHandler, [{
      key: "getAllTextNodesInRange",
      value: function getAllTextNodesInRange() {
        var startContainer = this.range.startContainer;
        var endContainer = this.range.endContainer;
        var rootEl = this.range.commonAncestorContainer;
        var textNodes = [];

        if (startContainer === endContainer) {
          if (startContainer.nodeType === Node.TEXT_NODE) {
            return [startContainer];
          }

          var childNodes = startContainer.childNodes;

          for (var i = this.range.startOffset; i < this.range.endOffset; i++) {
            mergeArray(textNodes, getDescendantTextNodes(childNodes[i]));
          }

          return textNodes;
        }

        var startIndex = 0;
        var endIndex = 0;

        for (var _i = 0; _i < rootEl.childNodes.length; _i++) {
          var node = rootEl.childNodes[_i];

          if (node.contains(startContainer)) {
            startIndex = _i;
          }

          if (node.contains(endContainer)) {
            endIndex = _i;
          }
        }

        for (var _i2 = startIndex; _i2 <= endIndex; _i2++) {
          var _node = rootEl.childNodes[_i2];

          if (_i2 === startIndex) {
            if (_node.nodeType === Node.TEXT_NODE) {
              textNodes.push(_node);
            } else if (_node.nodeType === Node.ELEMENT_NODE) {
              mergeArray(textNodes, getAfterStartDescendantTextNodes(_node, startContainer));
            }
          } else if (_i2 === endIndex) {
            if (_node.nodeType === Node.TEXT_NODE) {
              textNodes.push(_node);
            } else if (_node.nodeType === Node.ELEMENT_NODE) {
              mergeArray(textNodes, getBeforeEndDescendantTextNodes(_node, endContainer));
            }
          } else if (_node.nodeType === Node.TEXT_NODE) {
            textNodes.push(_node);
          } else if (_node.nodeType === Node.ELEMENT_NODE) {
            mergeArray(textNodes, getDescendantTextNodes(_node));
          }
        }

        return textNodes;
      }
    }, {
      key: "getParentNode",
      value: function getParentNode() {
        var range = this.range;
        var parentNode = getParentBlockNode(range.startContainer);

        if (parentNode === this.rootElement) {
          parentNode = range.startContainer;
        }

        return parentNode;
      }
      /**
       * execute edit command
       * @param {String} command
       * @param arg
       */

    }, {
      key: "execCommand",
      value: function execCommand(command, arg) {
        var _this = this;

        switch (command) {
          case Command.JUSTIFY_LEFT:
            {
              var parentNode = this.getParentNode();
              parentNode.style.textAlign = '';
              break;
            }

          case Command.JUSTIFY_RIGHT:
            {
              var _parentNode = this.getParentNode();

              _parentNode.style.textAlign = 'right';
              break;
            }

          case Command.JUSTIFY_CENTER:
            {
              var _parentNode2 = this.getParentNode();

              _parentNode2.style.textAlign = 'center';
              break;
            }

          case Command.FORE_COLOR:
            {
              document.execCommand(Command.FORE_COLOR, false, arg);
              break;
            }

          case Command.BACK_COLOR:
            {
              document.execCommand(Command.BACK_COLOR, false, arg);
              break;
            }

          case Command.REMOVE_FORMAT:
            {
              document.execCommand(Command.REMOVE_FORMAT, false, arg);
              break;
            }

          case Command.FONT_NAME:
            {
              document.execCommand(Command.FONT_NAME, false, arg);
              break;
            }

          case Command.INDENT:
            {
              var range = this.range;

              var _parentNode3 = getParentBlockNode(range.startContainer);

              if (_parentNode3 === this.rootElement) {
                _parentNode3 = range.startContainer;
              } // h1等标签不能缩进


              if (_parentNode3.tagName === 'DIV' || _parentNode3.tagName === 'P') {
                if (_parentNode3.style.textIndent) {
                  _parentNode3.style.textIndent = '';
                } else {
                  _parentNode3.style.textIndent = '2em';
                }
              }

              break;
            }

          case Command.FONT_SIZE:
            {
              // 重新实现，改为直接修改样式
              var textNodes = this.getAllTextNodesInRange();

              if (!textNodes.length) {
                break;
              }

              if (textNodes.length === 1 && textNodes[0] === this.range.startContainer && textNodes[0] === this.range.endContainer) {
                var textNode = textNodes[0];

                if (this.range.startOffset === 0 && this.range.endOffset === textNode.textContent.length) {
                  if (textNode.parentNode.childNodes.length === 1 && isInlineElement(textNode.parentNode)) {
                    textNode.parentNode.style.fontSize = arg;
                    break;
                  }

                  var _span = document.createElement('span');

                  _span.style.fontSize = arg;
                  textNode.parentNode.insertBefore(_span, textNode);

                  _span.appendChild(textNode);

                  break;
                }

                var span = document.createElement('span');
                span.innerText = textNode.textContent.substring(this.range.startOffset, this.range.endOffset);
                span.style.fontSize = arg;
                var frontPart = document.createTextNode(textNode.textContent.substring(0, this.range.startOffset));
                textNode.parentNode.insertBefore(frontPart, textNode);
                textNode.parentNode.insertBefore(span, textNode);
                textNode.textContent = textNode.textContent.substring(this.range.endOffset);
                this.range.setStart(span, 0);
                this.range.setEnd(span, 1);
                break;
              }

              textNodes.forEach(function (textNode) {
                if (textNode === _this.range.startContainer) {
                  if (_this.range.startOffset === 0) {
                    if (textNode.parentNode.childNodes.length === 1 && isInlineElement(textNode.parentNode)) {
                      textNode.parentNode.style.fontSize = arg;
                    } else {
                      var _span3 = document.createElement('span');

                      _span3.style.fontSize = arg;
                      textNode.parentNode.insertBefore(_span3, textNode);

                      _span3.appendChild(textNode);
                    }

                    return;
                  }

                  var _span2 = document.createElement('span');

                  textNode.textContent = textNode.textContent.substring(0, _this.range.startOffset);
                  _span2.style.fontSize = arg;
                  textNode.parentNode.insertBefore(_span2, textNode);

                  _this.range.setStart(textNode, 0);

                  return;
                }

                if (textNode === _this.range.endContainer) {
                  if (_this.range.endOffset === textNode.textContent.length) {
                    if (textNode.parentNode.childNodes.length === 1 && isInlineElement(textNode.parentNode)) {
                      textNode.parentNode.style.fontSize = arg;
                    } else {
                      var _span5 = document.createElement('span');

                      _span5.style.fontSize = arg;
                      textNode.parentNode.insertBefore(_span5, textNode);

                      _span5.appendChild(textNode);
                    }

                    return;
                  }

                  var _span4 = document.createElement('span');

                  textNode.textContent = textNode.textContent.substring(_this.range.endOffset);
                  _span4.style.fontSize = arg;
                  textNode.parentNode.insertBefore(_span4, textNode);

                  _span4.appendChild(textNode);

                  _this.range.setStart(textNode, textNode.textContent.length);

                  return;
                }

                if (textNode.parentNode.childNodes.length === 1 && isInlineElement(textNode.parentNode)) {
                  textNode.parentNode.style.fontSize = arg;
                  return;
                }

                var span = document.createElement('span');
                span.style.fontSize = arg;
                textNode.parentNode.insertBefore(span, textNode);
                span.appendChild(textNode);
              });
              break;
            }

          case Command.FORMAT_BLOCK:
            {
              if (document.execCommand(Command.FORMAT_BLOCK, false, arg)) {
                break;
              } // hack


              var element = document.createElement(arg);
              this.range.surroundContents(element);
              break;
            }

          case Command.LINE_HEIGHT:
            {
              var _textNodes = this.getAllTextNodesInRange();

              _textNodes.forEach(function (textNode) {
                var parentBlock = getParentBlockNode(textNode);

                if (parentBlock) {
                  parentBlock.style.lineHeight = arg;
                }
              });

              break;
            }

          case Command.INSERT_HORIZONTAL_RULE:
            {
              document.execCommand(Command.INSERT_HORIZONTAL_RULE, false);
              break;
            }

          case Command.INSERT_IMAGE:
            {
              // const id = `img-random${Math.random()}`
              var img;
              var editor = this.editor;
              var content = this.rootElement;
              var _range = this.range;
              var selection = getSelection();
              var fragment = document.createDocumentFragment();

              if (typeof arg === 'string') {
                img = document.createElement('img');
                img.src = arg;
                img.className = 'vue-editor-image';
                var div = document.createElement('p');
                div.appendChild(img);
                fragment.appendChild(div);
              }

              if (_typeof(arg) === 'object') {
                arg.forEach(function (item) {
                  img = document.createElement('img');
                  img.src = item;
                  img.className = 'vue-editor-image';
                  var div = document.createElement('p');
                  div.appendChild(img);
                  fragment.appendChild(div);
                });
              }

              _range.insertNode(fragment); // 将光标聚焦


              _range.collapse();

              break;
            }

          case Command.INSERT_VIDEO:
            {
              var video = '';
              arg.forEach(function (item) {
                video += "<img data-url=\"".concat(item.videoUrl, "\" class=\"video-poster\" src=\"").concat(item.url, "\">");
              });
              document.execCommand('insertHTML', false, video);
              break;
            }

          case Command.CREATE_LINK:
            {
              // 将光标聚焦
              this.range.collapse(); // 用exeCommand text-decoration 无法加上

              var _fragment = document.createDocumentFragment();

              var _div = document.createElement('div');

              _div.innerHTML = arg;

              if (_div.hasChildNodes()) {
                for (var i = 0; i < _div.childNodes.length; i++) {
                  _fragment.appendChild(_div.childNodes[i].cloneNode(true));
                }
              }

              this.range.deleteContents();
              this.range.insertNode(_fragment); // 将光标聚焦

              this.range.collapse();
              break;
            }

          case Command.INSERT_ORDERED_LIST:
            {
              document.execCommand(Command.INSERT_ORDERED_LIST, false, arg);
              break;
            }

          case Command.INSERT_UNORDERED_LIST:
            {
              document.execCommand(Command.INSERT_UNORDERED_LIST, false, arg);
              break;
            }

          case Command.INSERT_HTML:
            {
              var _div2 = document.createElement('div');

              _div2.innerHTML = arg;
              this.range.deleteContents();
              this.range.insertNode(_div2); // 移动到插入标签的外面，避免标签嵌套

              this.range.setStartAfter(_div2);
              this.range.collapse();
              break;
            }

          case Command.INSERT_SPACE:
            {
              var _span6 = document.createElement('div');

              _span6.style.display = 'inline-block';
              _span6.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
              this.range.deleteContents();
              this.range.insertNode(_span6);
              this.range.setStartAfter(_span6);
              this.range.collapse();
              break;
            }

          case Command.BOLD:
            {
              document.execCommand(Command.BOLD, false, arg);
              break;
            }

          case Command.ITALIC:
            {
              document.execCommand(Command.ITALIC, false);
              break;
            }

          case Command.UNDERLINE:
            {
              document.execCommand(Command.UNDERLINE, false);
              break;
            }

          case Command.STRIKE_THROUGH:
            {
              document.execCommand(Command.STRIKE_THROUGH, false);
              break;
            }

          case Command.SUBSCRIPT:
            {
              document.execCommand(Command.SUBSCRIPT, false);
              break;
            }

          case Command.SUPERSCRIPT:
            {
              document.execCommand(Command.SUPERSCRIPT, false);
              break;
            }

          case Command.UNDO:
            {
              document.execCommand(Command.UNDO, false);
              break;
            }

          case Command.UNLINK:
            {
              document.execCommand(Command.UNLINK, false);
              break;
            }

          default:
            {
              document.execCommand(command, false, arg);
              break;
            }
        }
      }
    }]);

    return RangeHandler;
  }();

  var template$a = "<div class=\"vue-html5-editor\" :class=\"{'full-screen':fullScreen}\" :style=\"{'z-index':zIndex}\"> <div class=\"toolbar\" :style=\"{'z-index':zIndex+1}\" ref=\"toolbar\"> <ul> <template v-for=\"module in modules\"> <li :title=\"locale[module.i18n]\" @click=\"activeModule(module)\"> <span class=\"icon\" :class=\"module.icon\"></span> <template v-if=\"showModuleName === undefined ? defaultShowModuleName : showModuleName\"> &nbsp;{{locale[module.i18n]}} </template> </li> </template> </ul> </div> <div class=\"dashboard\" v-show=\"dashboard\" ref=\"dashboard\"> <keep-alive> <div v-show=\"dashboard\" :is=\"dashboard\"></div> </keep-alive> </div> <div class=\"content\" ref=\"content\" :style=\"contentStyle\" contenteditable @click=\"toggleDashboard(dashboard)\"> </div> <div class=\"plugins\" :style=\"{'z-index':zIndex+1}\" ref=\"plugin\"> <plugin-draft v-if=\"showDraft\"></plugin-draft> </div> </div>";

  function onPaste(e) {
    e.preventDefault(); // 判断一下是否是粘贴截图图片

    var clipboard;
    var text = '';
    var items;

    if (window.clipboardData && window.clipboardData.setData) {
      // IE
      clipboard = window.clipboardData; // 有文件传输

      if (clipboard.items) {
        items = clipboard.items;
      } else {
        // 文本粘贴
        text = clipboard.getData('text');
      }
    } else {
      clipboard = (e.oriinalEvent || e).clipboardData;
      text = clipboard.getData('text/plain');
    } // clipboard.


    var textRange;

    if (document.body.createTextRange) {
      if (document.selection) {
        textRange = document.selection.createRange();
      } else if (window.getSelection) {
        var sel = window.getSelection();
        var range = sel.getRangeAt(0); // 创建临时元素，使得TextRange可以移动到正确的位置

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

  function onKeydown(editor, content, e) {
    var key = e.which;

    if (key === 9) {
      e.preventDefault();
      editor.execCommand(Command.INSERT_SPACE);
      return true;
    } // 回车
    // editor.execCommand('insertHTML','<p></p>')
    // e.preventDefault()
    // 删除键


    if (key === 8) {
      if (content.innerHTML === '' || content.innerHTML === '<br>') {
        content.innerHTML = '<p><br></p>';
      }
    } // ctrl + s 禁用默认事件，激发保存事件，


    if (key === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      editor.$emit('key_save');
    }

    return false;
  }

  function docOnKeydown(e) {
    var key = e.which;

    if (key === 9) {
      e.preventDefault();
    } // ctrl + s 禁用默认事件


    if (key === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
    }
  }

  function installKeyBind() {
    document.addEventListener('keydown', docOnKeydown);
  }
  function uninstallKeyBind() {
    document.removeEventListener('keyup', docOnKeydown);
  }

  var p; //

  var storeKey = 'vue_editor_draft';
  var draftIndex = {
    stop: function stop() {
      localStorage.setItem(storeKey, '');
      this.uninstall();
    },
    uninstall: function uninstall() {
      if (p) {
        clearInterval(p);
      }
    },
    install: function install(editor) {
      if (editor.draft) {
        if (editor.draftStoreKey) {
          storeKey = "vue_editor_draft_".concat(editor.draftStoreKey);
        }

        if (editor.draftTime < 100) {
          throw new Error('draft setInterval can not smaller than 100ms');
        }

        var draft = localStorage.getItem(storeKey);

        if (draft && draft !== '<p><br></p>') {
          editor.showDraft = true;
        } else {
          editor.showDraft = false;
          p = setInterval(function () {
            localStorage.setItem(storeKey, editor.getContent());
          }, editor.draftTime);
        }
      }
    }
  };

  function upload(url, file, params, callback, failCallback, option) {
    var defaultOption = {
      fileName: 'file'
    };
    var opt = Object.assign({}, defaultOption, option);
    var formData = new FormData();
    formData.append(opt.fileName, file);

    if (params) {
      Object.keys(params).forEach(function (key, param) {
        formData.append('key', param);
      });
    } // 其他些参数，例如用户id
    // ajax上传


    var xhr = new XMLHttpRequest(); // 上传结束

    xhr.onload = function (event) {};

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json = JSON.parse(xhr.responseText); // ... 这里处理返回的json数据

          if (typeof callback === 'function') {
            callback(json);
          }
        } else if (typeof failCallback === 'function') {
          failCallback(xhr);
        }
      }
    };

    xhr.open('POST', url, true);
    xhr.send(formData);
  }

  function uuid() {
    return new Date().getTime().toString() + Math.ceil(Math.random() * 1000);
  }

  var loadingPath = 'data:image/gif;base64,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';

  var pasteUpload = {
    uninstall: function uninstall() {
      // 移除适合
      document.removeEventListener('paste', this.pasteListener);
      document.removeEventListener('dragleave', this.dragleaveListener);
      document.removeEventListener('drop', this.dropListener);
      document.removeEventListener('dragenter', this.dragenterListener);
      document.removeEventListener('dragover', this.dragoverListener);
      document.removeEventListener('paste', this.pasteListener);
    },
    insertHolder: function insertHolder() {
      var uid = "temp_img_".concat(uuid());
      this.editor.execCommand(Command.INSERT_HTML, "\n                    <p id=\"".concat(uid, "\" class=\"img-holder contenteditable=\"false\"\"> \n                    <img style=\"border: none;margin: 0 auto;width:40px;\" src=\"").concat(loadingPath, "\" alt=\"\">\n</p>\n                "));
      return uid;
    },
    insertError: function insertError(msg) {
      var uid = "temp_img_".concat(uuid());
      this.editor.execCommand(Command.INSERT_HTML, "\n                    <p id=\"".concat(uid, "\" class=\"img-holder\"  contenteditable=\"false\">\n                    \u4E0A\u4F20\u5931\u8D25\uFF1A").concat(msg, ",<span id=\"").concat(uid, "_cancel\" class=\"img-btn-cancel\">\u53D6\u6D88</span>\n</p>\n                "));

      document.getElementById("".concat(uid, "_cancel")).onclick = function () {
        document.getElementById(uid).remove();
      };

      return uid;
    },
    install: function install(editor) {
      var me = this;
      me.editor = editor; // 粘贴上传

      this.pasteListener = function (event) {
        var items = event.clipboardData && event.clipboardData.items;
        var images = [];

        if (items && items.length) {
          // 检索剪切板items
          for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              images.push(items[i].getAsFile());
              break;
            }
          }
        } // 如果是图片，禁用默认操作，否则执行默认操作


        if (images.length > 0) {
          // 浏览器右键复制图片粘贴会出现乱码，禁用默认操作
          event.preventDefault();
        } // 此时file就是剪切板中的图片文件


        images.forEach(function (file) {
          var uid = me.insertHolder();
          upload(editor.uploadUrl, file, {}, function (json) {
            document.getElementById(uid).remove();
            editor.execCommand(Command.INSERT_IMAGE, json.path);
          });
        });
      };

      this.dragleaveListener = function (e) {
        e.preventDefault();
      };

      this.dropListener = function (e) {
        e.preventDefault();
      };

      this.dragenterListener = function (e) {
        e.preventDefault();
      };

      this.dragoverListener = function (e) {
        e.preventDefault();
      };

      this.editorDropListener = function (e) {
        e.preventDefault(); // 取消默认浏览器拖拽效果

        var fileList = e.dataTransfer.files; // 获取文件对象
        // 检测是否是拖拽文件到页面的操作

        if (fileList.length === 0) {
          return;
        }

        var images = [];

        for (var i = 0; i < fileList.length; i++) {
          var file = fileList.item(i);

          if (file.type.indexOf('image') !== -1) {
            images.push(file);
          }
        }

        images.forEach(function (file) {
          var uid = me.insertHolder();
          upload(editor.uploadUrl, file, {}, function (json) {
            document.getElementById(uid).remove();

            if (json.success) {
              editor.execCommand(Command.INSERT_IMAGE, json.path);
            } else {
              me.insertError(json.errMsg);
            }
          }, function (xhr) {
            document.getElementById(uid).remove();
            me.insertError(xhr.responseText);
          });
        });
      };

      if (editor.uploadUrl) {
        document.addEventListener('paste', this.pasteListener);
        document.addEventListener('dragleave', this.dragleaveListener);
        document.addEventListener('drop', this.dropListener);
        document.addEventListener('dragenter', this.dragenterListener);
        document.addEventListener('dragover', this.dragoverListener);
        editor.$el.addEventListener('drop', this.editorDropListener);
      }
    }
  };

  var plugins = {
    draft: draftIndex,
    pasteUpload: pasteUpload
  };

  var draft = plugins.draft,
      pasteUpload$1 = plugins.pasteUpload;
  /**
   * Created by peak on 2017/2/9.
   */

  var editor = {
    template: template$a,
    components: {
      'draft-panel': {
        template: ''
      }
    },
    props: {
      plainTextPaste: {
        type: Boolean,
        "default": false
      },
      content: {
        type: String,
        required: true,
        "default": ''
      },
      height: {
        type: Number,
        "default": 300,
        validator: function validator(val) {
          return val >= 100;
        }
      },
      zIndex: {
        type: Number,
        "default": 1000
      },
      autoHeight: {
        type: Boolean,
        "default": true
      },
      showModuleName: {
        type: Boolean,
        "default": false
      },
      toolbars: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      draft: {
        type: Boolean,
        "default": false
      },
      draftTime: {
        type: Number,
        "default": 2000
      },
      // 草稿箱自定义字段，可以让多个编辑器同时使用不同的草稿
      draftStoreKey: {
        type: String,
        "default": ''
      },
      uploadUrl: {
        type: String,
        "default": ''
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
      };
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
          return;
        }

        if (component.nextEl) {
          component.parentEl.insertBefore(component.$el, component.nextEl);
          return;
        }

        component.parentEl.appendChild(component.$el);
      }
    },
    computed: {
      contentStyle: function contentStyle() {
        var style = {};

        if (this.fullScreen) {
          style.height = "".concat(window.innerHeight - this.$refs.toolbar.clientHeight - 1, "px");
          return style;
        }

        if (!this.autoHeight) {
          style.height = "".concat(this.height, "px");
          return style;
        }

        style['min-height'] = "".concat(this.height, "px");
        return style;
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
      stopDraft: function stopDraft() {
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
        this.restoreSelection();

        if (this.range) {
          var handler = new RangeHandler(this.range, this);

          for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arg[_key - 1] = arguments[_key];
          }

          handler.execCommand.apply(handler, [command].concat(arg));
        }

        this.toggleDashboard();
        var newConent = this.convertToContent(this.$refs.content.innerHTML);
        this.$emit('change', newConent);
      },
      getCurrentRange: function getCurrentRange() {
        return this.range;
      },

      /**
       * 获取当前的光标对象并赋值给this.range
       */
      saveCurrentRange: function saveCurrentRange() {
        var selection = getSelection();

        if (!selection.rangeCount) {
          return;
        }

        var content = this.$refs.content;

        for (var i = 0; i < selection.rangeCount; i++) {
          var range = selection.getRangeAt(0);
          var start = range.startContainer;
          var end = range.endContainer; // for IE11 : node.contains(textNode) always return false

          start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start;
          end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end;

          if (content.contains(start) && content.contains(end)) {
            this.range = range;
            break;
          }
        }
      },
      getContent: function getContent() {
        var newContent = this.convertToContent(this.$refs.content.innerHTML);
        return newContent;
      },
      setContent: function setContent(val) {
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
          return;
        }

        if (module.hasDashboard) {
          this.toggleDashboard("dashboard-".concat(module.name));
        }
      },
      convertToInnerHtml: function convertToInnerHtml(content) {
        // 为空返回一个br保证所有的文字都在div中
        if (content === '') {
          return '<p><br/></p>';
        } // 当是纯文本的时候包括在div中


        if (content.indexOf('<') === -1) {
          return "<p>".concat(content, "</p>");
        }

        var str = content.replace(/<video .*?poster="(.*?)".*?src="(.*?)".*?>.*?<\/video>/ig, function ($0, $1, $2) {
          return "<img data-url=\"".concat($2, "\" class=\"video-poster\" src=\"").concat($1, "\">");
        });
        return str;
      },
      convertToContent: function convertToContent(html) {
        var ar = html.match(/<img .*?>/ig);
        var videoPreviewArray = [];

        if (ar) {
          ar.forEach(function (item) {
            if (item.indexOf('class="video-poster"') >= 0) {
              var str = item.replace(/<img .*?data-url="(.*?)".*?class="video-poster".*?src="(.*?)">/ig, function ($0, $1, $2) {
                return "<video poster=\"".concat($2, "\" src=\"").concat($1, "\" controls></video>");
              });
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

          if (returnStr) {
            html = returnStr;
          }
        }

        return html;
      }
    },
    created: function created() {
      var _this = this;

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
          module.init(_this);
        }
      });
    },
    mounted: function mounted() {
      var _this2 = this;

      var editor = this;
      var content = this.$refs.content;
      content.innerHTML = this.convertToInnerHtml(this.content);
      content.addEventListener('mouseup', function () {
        editor.saveCurrentRange();
      }, false);
      installKeyBind();
      content.addEventListener('keyup', function (e) {
        editor.$emit('change', _this2.convertToContent(content.innerHTML)); // 需要在前面执行

        editor.saveCurrentRange();
        var startContainer = _this2.range.startContainer;
        var endContainer = _this2.range.endContainer;
        var pNode = getParentBlockNode(startContainer);
      }, false);
      content.addEventListener('keydown', function (e) {
        onKeydown.apply(_this2, [editor, content, e]);
      }, false);
      content.addEventListener('mouseout', function (e) {
        if (e.target === content) {
          _this2.saveCurrentRange();
        }
      }, false);
      content.addEventListener('paste', function () {
        // const e = args[0]
        // 注册paste方法，粘贴的都是纯文本
        // 代码来自http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
        if (editor.plainTextPaste) {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          onPaste.apply(_this2, args);
        } // } else {
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

      }); // 执行插件安装

      draft.install(editor);
      pasteUpload$1.install(editor);
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
        this.$refs.dashboard.style.maxHeight = "".concat(this.$refs.content.clientHeight, "px");
      }
    },
    beforeDestroy: function beforeDestroy() {
      var _this3 = this;

      this.modules.forEach(function (module) {
        if (typeof module.destroyed === 'function') {
          module.destroyed(_this3);
        }
      });
      uninstallKeyBind(); // 卸载插件

      draft.uninstall(this);
      pasteUpload$1.uninstall(this);
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
  function mixin() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(ext).forEach(function (k) {
      // for data function
      if (k === 'data') {
        var dataSrc = source[k];
        var dataDesc = ext[k];

        if (typeof dataDesc === 'function') {
          if (typeof dataSrc !== 'function') {
            source[k] = dataDesc;
          } else {
            source[k] = function () {
              return mixin(dataSrc(), dataDesc());
            };
          }
        }
      } else {
        source[k] = ext[k];
      }
    });
    return source;
  }

  var template$b = "<div class=\"draft__dialog\"> 草稿箱不为空，是否从草稿加载? <span class=\"draft_btn\" @click=\"onOk\">是</span><span class=\"draft_btn draft__no\" @click=\"onCancel\">否</span> </div>";

  var draft$1 = {
    name: 'draft-name',
    template: template$b,
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
        localStorage.setItem(storeKey, '');
        draftIndex.install(editor);
      }
    }
  };

  /**
   * Vue html5 Editor
   * @param Vue   {Vue}
   * @param options {Object}
   */

  var VueHtml5Editor =
  /*#__PURE__*/
  function () {
    /**
     * build an editor component
     */
    function VueHtml5Editor() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, VueHtml5Editor);

      var modules = _toConsumableArray(buildInModules);

      var components = {}; // extended modules

      if (Array.isArray(options.modules)) {
        options.modules.forEach(function (module) {
          if (module.name) {
            modules.push(module);
          }
        });
      } // hidden modules


      if (Array.isArray(options.hiddenModules)) {
        modules = function () {
          var arr = [];
          modules.forEach(function (m) {
            if (!options.hiddenModules.includes(m.name)) {
              arr.push(m);
            }
          });
          return arr;
        }();
      } // visible modules


      if (Array.isArray(options.visibleModules)) {
        modules = function () {
          var arr = [];
          modules.forEach(function (module) {
            if (options.visibleModules.includes(module.name)) {
              arr.push(module);
            }
          });
          return arr;
        }();
      }

      modules.forEach(function (module) {
        // specify the config for each module in options by name
        var config = options[module.name];
        module.config = mixin(module.config, config);

        if (module.dashboard) {
          // $options.module
          module.dashboard.module = module;
          components["dashboard-".concat(module.name)] = module.dashboard;
        }

        if (options.icons && options.icons[module.name]) {
          module.icon = options.icons[module.name];
        }

        module.hasDashboard = !!module.dashboard; // prevent vue sync

        module.dashboard = null;
      }); // 将插件注册到组件中

      components['plugin-draft'] = draft$1; // i18n

      var i18n = {
        'zh-cn': i18nZhCn,
        'en-us': i18nEnUs
      };
      var customI18n = options.i18n || {};
      Object.keys(customI18n).forEach(function (key) {
        i18n[key] = i18n[key] ? mixin(i18n[key], customI18n[key]) : customI18n[key];
      });
      var language = options.language || 'en-us';
      var locale = i18n[language]; // showModuleName

      var defaultShowModuleName = !!options.showModuleName; // ######################################

      var compo = mixin(editor, {
        data: function data() {
          return {
            modules: modules,
            locale: locale,
            defaultShowModuleName: defaultShowModuleName
          };
        },
        components: components
      });
      mixin(this, compo);
    }
    /**
     * global install
     *
     * @param Vue
     * @param options
     */


    _createClass(VueHtml5Editor, null, [{
      key: "install",
      value: function install(Vue) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        Vue.component(options.name || 'vue-html5-editor', new VueHtml5Editor(options));
      }
    }]);

    return VueHtml5Editor;
  }();

  return VueHtml5Editor;

}));
