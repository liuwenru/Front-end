/**
 * @file ScrollView组件
 */

const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');

class ScrollView {
  constructor(config) {
    this[PROPERTY_SYMBOL] = Object.create(null);
    this[ATTRIBUTE_SYMBOL] = Object.create(null);
    this[EVENT_SYMBOL] = Object.create(null);
    this[STATE_SYMBOL] = Object.create(null);

    this[PROPERTY_SYMBOL].children = [];

    this.created();
  }
  appendTo(element) {
    element.appendChild(this[PROPERTY_SYMBOL].root);
    this.mounted();
  }
  created () {
    this[PROPERTY_SYMBOL].root = document.createElement('div');
    this[PROPERTY_SYMBOL].root.addEventListener("touchmove", function(e){
      e.cancelBubble = true;
      e.stopImmediatePropagation();
    }, {passive:false});
    this[STATE_SYMBOL].h = 0;
  }
  mounted () {
  }
  unmount() {
  }
  update () {
  }
  appendChild(child) {
    this.children.push(child);
    child.appendTo(this[PROPERTY_SYMBOL].root);
  }
  get children() {
    return this[PROPERTY_SYMBOL].children;
  }
  getAttribute(name) {
    if (name === 'style') {
      return this[PROPERTY_SYMBOL].root.getAttribute('style');
    }
    return this[ATTRIBUTE_SYMBOL][name];
  }
  setAttribute(name, value) {
    // hook
    if (name === 'style') {
      this[PROPERTY_SYMBOL].root.setAttribute('style', value);
    }
    return this[ATTRIBUTE_SYMBOL][name] = value;
  }
  setStyle(name, value) {
    this[PROPERTY_SYMBOL].root.style[name] = value;
  }
  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      this[EVENT_SYMBOL][type] = new Set();
    }
    this[EVENT_SYMBOL][type].add(listener);
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type]) {
      return;
    }
    this[EVENT_SYMBOL][type].delete(listener);
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL].type) {
      return;
    }
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this);
    }
  }
}

export default ScrollView;