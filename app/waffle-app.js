var touchEvent = ('ontouchstart' in document) ? 'touchend' : 'click'
var dragging   = false;

var startX = 0;
var startY = 0;

var checkX = 'clientX';
var checkY = 'clientY';

if (touchEvent === 'touchend') {

    document.addEventListener('touchstart', function (evt) {

        console.log('touchstart');
        startX = event.changedTouches[0][checkX];
        startY = event.changedTouches[0][checkY];

    });

    document.addEventListener('touchmove', function (evt) {

        if (Math.abs(event.changedTouches[0][checkX] - startX) > 20 || Math.abs(event.changedTouches[0][checkY] - startY) > 20) {

            dragging = true;

        }

    });

    document.addEventListener('touchend', function (evt) {

        dragging = false;    

    });

}


exports.Button = function (element) {

    var that = this;
    this.elm = element;
    
	element.addEventListener(touchEvent, function (event) {

	    if (dragging) {

    	    return;

	    }
	    
	    that.ontap();
	
	}, false);

}
exports.views      = {};
var activeView;


function hide(elm) {
	elm.className = 'view';
}

function show(elm) {
	elm.className = 'view active';
}

exports.switchView = function (viewname, data) {

	hide(activeView.elm);
	activeView = exports.views[viewname]

	window.scrollTo(0, 0)

	if (typeof activeView.beforeload === 'function') {

		if (exports.views.spinner) {
			show(exports.views.spinner.elm);
		}

		activeView.beforeload(data, function () {

			hide(exports.views.spinner.elm);
			show(activeView.elm);

		});

	} else {

		window.scrollTo(0, 0)
		show(activeView.elm);

	}
	
};

exports.addView = function (name, elm, active) {

	exports.views[name] = {
		elm: elm,
		onload: null,
		onsetup: null,
		onleave: null,
		buttons: {},
		inputs: {},
		vars: {},
		getInput: function (inputName) {
			return exports.views[name].inputs[inputName].value;
		},
		setVar: function (varName, value) {
			exports.views[name].vars[varName].textContent = value
		},
		makeActive: function () {
			activeView = exports.views[name]
			show(elm);
		}
	};

	var buttons = elm.querySelectorAll('[data-button]');

	for (var i = 0, l = buttons.length; i < l; i++) {

		var btn = buttons[i];
		exports.views[name].buttons[btn.dataset.button] = new exports.Button(btn);

	}

	var inputs = elm.querySelectorAll('input');

	for (i = 0, l = inputs.length; i < l; i++) {

		var input = inputs[i];
		exports.views[name].inputs[input.name] = input;

	}

	var vars = elm.querySelectorAll('var');

	for (i = 0, l = vars.length; i < l; i++) {

		var v = vars[i];
		exports.views[name].vars[v.getAttribute('name')] = v;

	}


	if (active) {
		activeView = exports.views[name];
		elm.className = elm.className + ' active';
	}

	return exports.views[name];

};

!function(r){"use strict";function t(){}function n(n,e){if(i)return e.indexOf(n);for(var t=e.length;t--;)if(e[t]===n)return t;return-1}var e=t.prototype,i=Array.prototype.indexOf?!0:!1;e._getEvents=function(){return this._events||(this._events={})},e.getListeners=function(n){var r,e,t=this._getEvents();if("object"==typeof n){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(i,r){var e,t=this.getListenersAsObject(i);for(e in t)t.hasOwnProperty(e)&&-1===n(r,t[e])&&t[e].push(r);return this},e.on=e.addListener,e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(i,s){var r,e,t=this.getListenersAsObject(i);for(e in t)t.hasOwnProperty(e)&&(r=n(s,t[e]),-1!==r&&t[e].splice(r,1));return this},e.off=e.removeListener,e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(n){var e,r=typeof n,t=this._getEvents();if("string"===r)delete t[n];else if("object"===r)for(e in t)t.hasOwnProperty(e)&&n.test(e)&&delete t[e];else delete this._events;return this},e.emitEvent=function(r,i){var n,e,s,t=this.getListenersAsObject(r);for(e in t)if(t.hasOwnProperty(e))for(n=t[e].length;n--;)s=i?t[e][n].apply(null,i):t[e][n](),s===!0&&this.removeListener(r,t[e][n]);return this},e.trigger=e.emitEvent,e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},"function"==typeof define&&define.amd?define(function(){return t}):r.EventEmitter=t}(this);
exports.channel = new this.EventEmitter();

exports.addModule = function (name, require) {

	exports[name] = require;

}

function executeFunction(functions, index, cb) {

	if (index >= functions.length) {
		return cb();
	}

	functions[index](function () {

		executeFunction(functions, ++index, cb);

	});

}

exports.hideLoader = function () {
	document.getElementById('loader').style.display = 'none';
}

exports.showApp = function () {
	document.getElementById('app').style.display = 'block';
}

exports.setup = function (cb) {

	var viewFunctions = [];
	var initFunctions = [];

	//Check if we need to setup components.
	for (var m in exports) {

		if (exports.hasOwnProperty(m)) {

			var module = exports[m];

			if (typeof module.setup === 'function') {

				initFunctions.push(module.setup);

			}
			
		}

	}

	//Setup the views.
	for (var v in exports.views) {

		if (exports.views.hasOwnProperty(v)) {
			var view = exports.views[v];

			if (typeof view.onsetup === 'function') {

				viewFunctions.push(view.onsetup);

			}

		}

	}

	executeFunction(initFunctions, 0, function () {

		executeFunction(viewFunctions, 0, function () {

			exports.channel.emit('core:setup');

		});

	});

}
