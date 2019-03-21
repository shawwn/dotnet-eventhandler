'use strict';
/*
Copyright (c) 2019 Shawn Presser

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const applyOptions = (object, options = {}) => {
};


class EventHandlerClass {
	constructor(options) {
		return eventHandlerFactory(options);
	}
}


const eventHandlerFactory = options => {
	const eventHandler = {handlers: []};
	applyOptions(eventHandler, options);

	eventHandler.send = (sender, args) => eventHandlerTag(eventHandler.send, sender, args);

	Object.setPrototypeOf(eventHandler, EventHandler.prototype);
	Object.setPrototypeOf(eventHandler.send, eventHandler);

	eventHandler.send.constructor = () => {
		throw new Error('`eventHandler.constructor()` is deprecated. Use `new eventHandler.Instance()` instead.');
	};

	eventHandler.send.Instance = EventHandlerClass;

	return eventHandler.send;
};

function EventHandler(options) {
	return eventHandlerFactory(options);
}

EventHandler.prototype["+="] = function Add(f) {
  this.handlers.push(f);
  return this;
}

EventHandler.prototype["-="] = function Rem(f) {
  let idx = this.handlers.lastIndexOf(f);
  if (f >= 0) {
    this.handlers.splice(idx, 1);
  }
  return this;
}

function eventHandlerTag(me, sender, args) {
  //console.log('eventHandlerTag', me, sender, args);
  for (let f of me.handlers) {
    f(sender, args);
  }
}

if (typeof module !== 'undefined') {
  module.exports = EventHandler;
}
if (typeof window !== 'undefined') {
  window.EventHandler = EventHandler;
}

