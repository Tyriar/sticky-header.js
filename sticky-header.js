/*
* sticky-header.js
* MIT licensed
*
* Created by Daniel Imms, http://www.growingwiththeweb.com
*/

(function() {
  'use strict';

  var tables = [];

  // Polyfills
  if (!window.getComputedStyle) {
    window.getComputedStyle = function(el) {
      this.el = el;
      this.getPropertyValue = function(prop) {
        return el.currentStyle[prop] || null;
      };
      return this;
    };
  }

  function getOffset(element) {
    var x = 0;
    var y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      x += element.offsetLeft - element.scrollLeft;
      y += element.offsetTop - element.scrollTop;
      element = element.offsetParent;
    }
    return { top: y, left: x };
  }

  function getScrollTop() {
    if (typeof window.pageYOffset !== 'undefined') {
      return window.pageYOffset;
    }
    var docElement = document.documentElement;
    if (!docElement.clientHeight) {
      docElement = document.body;
    }
    return docElement.scrollTop;
  }

  function listen(e, elem, func) {
    if (elem.addEventListener) {
      elem.addEventListener(e, func, false);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + e, func);
    }
  }

  function Table(element) {
    this.element = element;
    this.originalHeader = element.getElementsByTagName('thead')[0];
    this.floatingHeader = this.originalHeader.cloneNode(true);
    this.top = 0;
    this.bottom = 0;
    this.originalThs = this.originalHeader.getElementsByTagName('th');
    this.floatingThs = this.floatingHeader.getElementsByTagName('th');

    if (!this.element.style.position) {
      this.element.style.position = 'relative';
    }
    this.floatingHeader.setAttribute('aria-hidden', 'true');
    this.floatingHeader.style.position = 'absolute';
    this.floatingHeader.style.top = '0';

    this.refreshHeaderSize();
    this.attachFloatHeader();
  }

  Table.prototype.refreshHeaderSize = function () {
    var offset = getOffset(this.element);
    var trs = this.element.getElementsByTagName('tr');
    var padding;
    this.top = offset.top;
    this.bottom = this.element.offsetHeight - trs[trs.length - 1].offsetHeight;
    for (var i = 0; i < this.originalThs.length; i++) {
      var th = this.originalThs[i];
      var style = window.getComputedStyle(th, null);
      var paddingLeft = style.getPropertyValue('padding-left')
          .replace('px', '');
      var paddingRight = style.getPropertyValue('padding-right')
          .replace('px', '');
      padding = parseFloat(paddingLeft, 10) + parseFloat(paddingRight, 10);
      this.floatingThs[i].style.width = (th.offsetWidth - padding) + 'px';
      this.floatingThs[i].style.height = (th.offsetHeight - padding) + 'px';
    }
  };

  Table.prototype.attachFloatHeader = function () {
    this.element.insertBefore(this.floatingHeader, this.element.firstChild);
  };

  function init() {
    var matches = document.querySelectorAll('table.sticky-header');
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].tagName === 'TABLE') {
        tables[i] = new Table(matches[i]);
      }
    }
  }

  function windowScroll() {
    for (var i = 0; i < tables.length; i++) {
      var windowTop = getScrollTop();
      if (windowTop > tables[i].top) {
        tables[i].floatingHeader.style.top =
            Math.min(windowTop - tables[i].top, tables[i].bottom) + 'px';
      } else {
        tables[i].floatingHeader.style.top = '0';
      }
    }
  }

  function refreshHeaderSizes() {
    for (var i = 0; i < tables.length; i++) {
      tables[i].refreshHeaderSize();
    }
  }

  listen('load', window, function () {
    init();
    window.onscroll = windowScroll;
    window.onresize = refreshHeaderSizes;
  });
}());
