/* 
 * sticky-header.js v1.0.0
 * MIT licensed
 *
 * Created by Daniel Imms, http://www.growingwiththeweb.com
 */

(function(window, document) {
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
        var x = 0,
            y = 0;
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
        var body = document.body,
            docElement = document.documentElement;
        docElement = (docElement.clientHeight) ? docElement : body;
        return docElement.scrollTop;
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
        this.floatingHeader.style.position = 'absolute';
        this.floatingHeader.style.top = '0';

        this.refreshHeaderSize();
        this.attachFloatHeader();
    }
    Table.prototype.refreshHeaderSize = function () {
        var offset = getOffset(this.element),
            trs = this.element.getElementsByTagName('tr'),
            padding,
            i;
        this.top = offset.top;
        this.bottom = this.element.offsetHeight - trs[trs.length - 1].offsetHeight;
        for (i = 0; i < this.originalThs.length; i++) {
            padding =
                parseFloat(window.getComputedStyle(this.originalThs[i], null).getPropertyValue('padding-left').replace('px', ''), 10) +
                parseFloat(window.getComputedStyle(this.originalThs[i], null).getPropertyValue('padding-right').replace('px', ''), 10);
            this.floatingThs[i].style.width = (this.originalThs[i].offsetWidth - padding) + 'px';
            this.floatingThs[i].style.height = (this.originalThs[i].offsetHeight - padding) + 'px';
        }
    };
    Table.prototype.attachFloatHeader = function () {
        this.element.insertBefore(this.floatingHeader, this.element.firstChild);
    };

    function init() {
        var matches = document.querySelectorAll('table.sticky-header'),
            i;
        for (i = 0; i < matches.length; i++) {
            if (matches[i].tagName.toUpperCase() === 'TABLE') {
                tables[i] = new Table(matches[i]);
            }
        }
    }

    function windowScroll() {
        var windowTop,
            i;
        for (i = 0; i < tables.length; i++) {
            windowTop = getScrollTop();
            if (windowTop > tables[i].top) {
                tables[i].floatingHeader.style.top =  Math.min(windowTop - tables[i].top, tables[i].bottom) + 'px';
            } else {
                tables[i].floatingHeader.style.top = '0';
            }
        }
    }

    function refreshHeaderSizes() {
        var i;
        for (i = 0; i < tables.length; i++) {
            tables[i].refreshHeaderSize();
        }
    }

    window.onload = function () {
        init();
        window.onscroll = windowScroll;
        window.onresize = refreshHeaderSizes;
    };
}(window, document));