(function () {
    var root = this;
    var previousBackbone = root.Backbone;
    var Backbone;
    if (typeof exports !== 'undefined') {
        Backbone = exports;
    } else {
        Backbone = root.Backbone = {};
    }
    Backbone.VERSION = '0.5.3';
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore')._;
    var $ = root.jQuery || root.Zepto;
    Backbone.noConflict = function () {
        root.Backbone = previousBackbone;
        return this;
    };
    Backbone.emulateHTTP = false;
    Backbone.emulateJSON = false;
    Backbone.Events = {
        bind: function (ev, callback, context) {
            var calls = this._callbacks || (this._callbacks = {});
            var list = calls[ev] || (calls[ev] = []);
            list.push([callback, context]);
            return this;
        }, unbind: function (ev, callback) {
            var calls;
            if (!ev) {
                this._callbacks = {};
            } else if (calls = this._callbacks) {
                if (!callback) {
                    calls[ev] = [];
                } else {
                    var list = calls[ev];
                    if (!list) return this;
                    for (var i = 0, l = list.length; i < l; i++) {
                        if (list[i] && callback === list[i][0]) {
                            list[i] = null;
                            break;
                        }
                    }
                }
            }
            return this;
        }, trigger: function (eventName) {
            var list, calls, ev, callback, args;
            var both = 2;
            if (!(calls = this._callbacks)) return this;
            while (both--) {
                ev = both ? eventName : 'all';
                if (list = calls[ev]) {
                    for (var i = 0, l = list.length; i < l; i++) {
                        if (!(callback = list[i])) {
                            list.splice(i, 1);
                            i--;
                            l--;
                        } else {
                            args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
                            callback[0].apply(callback[1] || this, args);
                        }
                    }
                }
            }
            return this;
        }
    };
    Backbone.Model = function (attributes, options) {
        var defaults;
        attributes || (attributes = {});
        if (defaults = this.defaults) {
            if (_.isFunction(defaults)) defaults = defaults.call(this);
            attributes = _.extend({}, defaults, attributes);
        }
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = _.uniqueId('c');
        this.set(attributes, {silent: true});
        this._changed = false;
        this._previousAttributes = _.clone(this.attributes);
        if (options && options.collection) this.collection = options.collection;
        this.initialize(attributes, options);
    };
    Backbone.Collection = function (models, options) {
        options || (options = {});
        if (options.comparator) this.comparator = options.comparator;
        _.bindAll(this, '_onModelEvent', '_removeReference');
        this._reset();
        if (models) this.reset(models, {silent: true});
        this.initialize.apply(this, arguments);
    };

    var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex', 'toArray', 'size', 'first', 'rest', 'last', 'without', 'indexOf', 'lastIndexOf', 'isEmpty', 'groupBy'];
    Backbone.Router = function (options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };
    var namedParam = /:([\w\d]+)/g;
    var splatParam = /\*([\w\d]+)/g;
    var escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;
    Backbone.History = function () {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');
    };
    var hashStrip = /^#*/;
    var isExplorer = /msie [\w.]+/;
    var historyStarted = false;
    _.extend(Backbone.History.prototype, {
        interval: 50, getFragment: function (fragment, forcePushState) {
            if (fragment == null) {
                if (this._hasPushState || forcePushState) {
                    fragment = window.location.pathname;
                    var search = window.location.search;
                    if (search) fragment += search;
                    if (fragment.indexOf(this.options.root) == 0) fragment = fragment.substr(this.options.root.length);
                } else {
                    fragment = window.location.hash;
                }
            }
            return decodeURIComponent(fragment.replace(hashStrip, ''));
        }, start: function (options) {
            if (historyStarted) throw new Error("Backbone.history has already been started");
            this.options = _.extend({}, {root: '/'}, this.options, options);
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            var fragment = this.getFragment();
            var docMode = document.documentMode;
            var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
            if (oldIE) {
                this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
                this.navigate(fragment);
            }
            if (this._hasPushState) {
                $(window).bind('popstate', this.checkUrl);
            } else if ('onhashchange' in window && !oldIE) {
                $(window).bind('hashchange', this.checkUrl);
            } else {
                setInterval(this.checkUrl, this.interval);
            }
            this.fragment = fragment;
            historyStarted = true;
            var loc = window.location;
            var atRoot = loc.pathname == this.options.root;
            if (this._wantsPushState && !this._hasPushState && !atRoot) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + '#' + this.fragment);
                return true;
            } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
                this.fragment = loc.hash.replace(hashStrip, '');
                window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
            }
            if (!this.options.silent) {
                return this.loadUrl();
            }
        }, route: function (route, callback) {
            this.handlers.unshift({route: route, callback: callback});
        }, checkUrl: function (e) {
            var current = this.getFragment();
            if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
            if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl() || this.loadUrl(window.location.hash);
        }, loadUrl: function (fragmentOverride) {
            var fragment = this.fragment = this.getFragment(fragmentOverride);
            var matched = _.any(this.handlers, function (handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
            return matched;
        }, navigate: function (fragment, triggerRoute) {
            var frag = (fragment || '').replace(hashStrip, '');
            if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;
            if (this._hasPushState) {
                var loc = window.location;
                if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
                this.fragment = frag;
                window.history.pushState({}, document.title, loc.protocol + '//' + loc.host + frag);
            } else {
                window.location.hash = this.fragment = frag;
                if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
                    this.iframe.document.open().close();
                    this.iframe.location.hash = frag;
                }
            }
            if (triggerRoute) this.loadUrl(fragment);
        }
    });
    Backbone.View = function (options) {
        this.cid = _.uniqueId('view');
        this._configure(options || {});
        this._ensureElement();
        this.delegateEvents();
        this.initialize.apply(this, arguments);
    };
    var selectorDelegate = function (selector) {
        return $(selector, this.el);
    };
    var eventSplitter = /^(\S+)\s*(.*)$/;
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];
    _.extend(Backbone.View.prototype, Backbone.Events, {
        tagName: 'div', $: selectorDelegate, initialize: function () {
        }, render: function () {
            return this;
        }, remove: function () {
            $(this.el).remove();
            return this;
        }, make: function (tagName, attributes, content) {
            var el = document.createElement(tagName);
            if (attributes) $(el).attr(attributes);
            if (content) $(el).html(content);
            return el;
        }, delegateEvents: function (events) {
            if (!(events || (events = this.events))) return;
            if (_.isFunction(events)) events = events.call(this);
            $(this.el).unbind('.delegateEvents' + this.cid);
            for (var key in events) {
                var method = this[events[key]];
                if (!method) throw new Error('Event "' + events[key] + '" does not exist');
                var match = key.match(eventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    $(this.el).bind(eventName, method);
                } else {
                    $(this.el).delegate(selector, eventName, method);
                }
            }
        }, _configure: function (options) {
            if (this.options) options = _.extend({}, this.options, options);
            for (var i = 0, l = viewOptions.length; i < l; i++) {
                var attr = viewOptions[i];
                if (options[attr]) this[attr] = options[attr];
            }
            this.options = options;
        }, _ensureElement: function () {
            if (!this.el) {
                var attrs = this.attributes || {};
                if (this.id) attrs.id = this.id;
                if (this.className) attrs['class'] = this.className;
                this.el = this.make(this.tagName, attrs);
            } else if (_.isString(this.el)) {
                this.el = $(this.el).get(0);
            }
        }
    });
    var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };
    Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = extend;
    var methodMap = {'create': 'POST', 'update': 'PUT', 'delete': 'DELETE', 'read': 'GET'};
    Backbone.sync = function (method, model, options) {
        var type = methodMap[method];
        var params = _.extend({type: type, dataType: 'json'}, options);
        if (!params.url) {
            params.url = getUrl(model) || urlError();
        }
        if (!params.data && model && (method == 'create' || method == 'update')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(model.toJSON());
        }
        if (Backbone.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {model: params.data} : {};
        }
        if (Backbone.emulateHTTP) {
            if (type === 'PUT' || type === 'DELETE') {
                if (Backbone.emulateJSON) params.data._method = type;
                params.type = 'POST';
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', type);
                };
            }
        }
        if (params.type !== 'GET' && !Backbone.emulateJSON) {
            params.processData = false;
        }
        return $.ajax(params);
    };
    var ctor = function () {
    };
    var inherits = function (parent, protoProps, staticProps) {
        var child;
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        _.extend(child, parent);
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        if (protoProps) _.extend(child.prototype, protoProps);
        if (staticProps) _.extend(child, staticProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };
    var getUrl = function (object) {
        if (!(object && object.url)) return null;
        return _.isFunction(object.url) ? object.url() : object.url;
    };
    var urlError = function () {
        throw new Error('A "url" property or function must be specified');
    };
    var wrapError = function (onError, model, options) {
        return function (resp) {
            if (onError) {
                onError(model, resp, options);
            } else {
                model.trigger('error', model, resp, options);
            }
        };
    };
    var escapeHTML = function (string) {
        return string.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
    };
}).call(this);
;var Froogaloop = function () {
    function e(a) {
        return new e.fn.init(a)
    }

    function h(a, c, b) {
        if (!b.contentWindow.postMessage) return !1;
        var f = b.getAttribute("src").split("?")[0], a = JSON.stringify({method: a, value: c});
        "//" === f.substr(0, 2) && (f = window.location.protocol + f);
        b.contentWindow.postMessage(a, f)
    }

    function j(a) {
        var c, b;
        try {
            c = JSON.parse(a.data), b = c.event || c.method
        } catch (f) {
        }
        "ready" == b && !i && (i = !0);
        if (a.origin != k) return !1;
        var a = c.value, e = c.data, g = "" === g ? null : c.player_id;
        c = g ? d[g][b] : d[b];
        b = [];
        if (!c) return !1;
        void 0 !== a && b.push(a);
        e && b.push(e);
        g && b.push(g);
        return 0 < b.length ? c.apply(null, b) : c.call()
    }

    function l(a, c, b) {
        b ? (d[b] || (d[b] = {}), d[b][a] = c) : d[a] = c
    }

    var d = {}, i = !1, k = "";
    e.fn = e.prototype = {
        element: null, init: function (a) {
            "string" === typeof a && (a = document.getElementById(a));
            this.element = a;
            a = this.element.getAttribute("src");
            "//" === a.substr(0, 2) && (a = window.location.protocol + a);
            for (var a = a.split("/"), c = "", b = 0, f = a.length; b < f; b++) {
                if (3 > b) c += a[b]; else break;
                2 > b && (c += "/")
            }
            k = c;
            return this
        }, api: function (a, c) {
            if (!this.element || !a) return !1;
            var b = this.element, f = "" !== b.id ? b.id : null,
                d = !c || !c.constructor || !c.call || !c.apply ? c : null,
                e = c && c.constructor && c.call && c.apply ? c : null;
            e && l(a, e, f);
            h(a, d, b);
            return this
        }, addEvent: function (a, c) {
            if (!this.element) return !1;
            var b = this.element, d = "" !== b.id ? b.id : null;
            l(a, c, d);
            "ready" != a ? h("addEventListener", a, b) : "ready" == a && i && c.call(null, d);
            return this
        }, removeEvent: function (a) {
            if (!this.element) return !1;
            var c = this.element, b;
            a:{
                if ((b = "" !== c.id ? c.id : null) && d[b]) {
                    if (!d[b][a]) {
                        b = !1;
                        break a
                    }
                    d[b][a] = null
                } else {
                    if (!d[a]) {
                        b = !1;
                        break a
                    }
                    d[a] = null
                }
                b = !0
            }
            "ready" != a && b && h("removeEventListener", a, c)
        }
    };
    e.fn.init.prototype = e.fn;
    window.addEventListener ? window.addEventListener("message", j, !1) : window.attachEvent("onmessage", j);
    return window.Froogaloop = window.$f = e
}();
;
;(function ($) {
    $.flexslider = function (el, options) {
        var slider = $(el), vars = $.extend({}, $.flexslider.defaults, options), namespace = vars.namespace,
            touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
            eventType = (touch) ? "touchend" : "click", vertical = vars.direction === "vertical",
            reverse = vars.reverse, carousel = (vars.itemWidth > 0), fade = vars.animation === "fade",
            asNav = vars.asNavFor !== "", methods = {};
        $.data(el, "flexslider", slider);
        methods = {
            init: function () {
                slider.animating = false;
                slider.currentSlide = vars.startAt;
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = vars.selector.substr(0, vars.selector.search(' '));
                slider.slides = $(vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                slider.syncExists = $(vars.sync).length > 0;
                if (vars.animation === "slide") vars.animation = "swing";
                slider.prop = (vertical) ? "top" : "marginLeft";
                slider.args = {};
                slider.manualPause = false;
                slider.transitions = !vars.video && !fade && vars.useCSS && (function () {
                    var obj = document.createElement('div'),
                        props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    for (var i in props) {
                        if (obj.style[props[i]] !== undefined) {
                            slider.pfx = props[i].replace('Perspective', '').toLowerCase();
                            slider.prop = "-" + slider.pfx + "-transform";
                            return true;
                        }
                    }
                    return false;
                }());
                if (vars.controlsContainer !== "") slider.controlsContainer = $(vars.controlsContainer).length > 0 && $(vars.controlsContainer);
                if (vars.manualControls !== "") slider.manualControls = $(vars.manualControls).length > 0 && $(vars.manualControls);
                if (vars.randomize) {
                    slider.slides.sort(function () {
                        return (Math.round(Math.random()) - 0.5);
                    });
                    slider.container.empty().append(slider.slides);
                }
                slider.doMath();
                if (asNav) methods.asNav.setup();
                slider.setup("init");
                if (vars.controlNav) methods.controlNav.setup();
                if (vars.directionNav) methods.directionNav.setup();
                if (vars.keyboard && ($(slider.containerSelector).length === 1 || vars.multipleKeyboard)) {
                    $(document).bind('keyup', function (event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            var target = (keycode === 39) ? slider.getTarget('next') : (keycode === 37) ? slider.getTarget('prev') : false;
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                }
                if (vars.mousewheel) {
                    slider.bind('mousewheel', function (event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, vars.pauseOnAction);
                    });
                }
                if (vars.pausePlay) methods.pausePlay.setup();
                if (vars.slideshow) {
                    if (vars.pauseOnHover) {
                        slider.hover(function () {
                            if (!slider.manualPlay && !slider.manualPause) slider.pause();
                        }, function () {
                            if (!slider.manualPause && !slider.manualPlay) slider.play();
                        });
                    }
                    (vars.initDelay > 0) ? setTimeout(slider.play, vars.initDelay) : slider.play();
                }
                if (touch && vars.touch) methods.touch();
                if (!fade || (fade && vars.smoothHeight)) $(window).bind("resize focus", methods.resize);
                setTimeout(function () {
                    vars.start(slider);
                }, 200);
            }, asNav: {
                setup: function () {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    slider.slides.click(function (e) {
                        e.preventDefault();
                        var $slide = $(this), target = $slide.index();
                        if (!$(vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                            slider.direction = (slider.currentItem < target) ? "next" : "prev";
                            slider.flexAnimate(target, vars.pauseOnAction, false, true, true);
                        }
                    });
                }
            }, controlNav: {
                setup: function () {
                    if (!slider.manualControls) {
                        methods.controlNav.setupPaging();
                    } else {
                        methods.controlNav.setupManual();
                    }
                }, setupPaging: function () {
                    var type = (vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging', j = 1, item;
                    slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');
                    if (slider.pagingCount > 1) {
                        for (var i = 0; i < slider.pagingCount; i++) {
                            item = (vars.controlNav === "thumbnails") ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a>' + j + '</a>';
                            slider.controlNavScaffold.append('<li>' + item + '</li>');
                            j++;
                        }
                    }
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();
                    methods.controlNav.active();
                    slider.controlNavScaffold.delegate('a, img', eventType, function (event) {
                        event.preventDefault();
                        var $this = $(this), target = slider.controlNav.index($this);
                        if (!$this.hasClass(namespace + 'active')) {
                            slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                    if (touch) {
                        slider.controlNavScaffold.delegate('a', "click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                }, setupManual: function () {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();
                    slider.controlNav.live(eventType, function (event) {
                        event.preventDefault();
                        var $this = $(this), target = slider.controlNav.index($this);
                        if (!$this.hasClass(namespace + 'active')) {
                            (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                    if (touch) {
                        slider.controlNav.live("click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                }, set: function () {
                    var selector = (vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                }, active: function () {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                }, update: function (action, pos) {
                    if (slider.pagingCount > 1 && action === "add") {
                        slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
                    } else if (slider.pagingCount === 1) {
                        slider.controlNavScaffold.find('li').remove();
                    } else {
                        slider.controlNav.eq(pos).closest('li').remove();
                    }
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }
            }, directionNav: {
                setup: function () {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + vars.nextText + '</a></li></ul>');
                    if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }
                    methods.directionNav.update();
                    slider.directionNav.bind(eventType, function (event) {
                        event.preventDefault();
                        var target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, vars.pauseOnAction);
                    });
                    if (touch) {
                        slider.directionNav.bind("click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                }, update: function () {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) {
                        slider.directionNav.addClass(disabledClass);
                    } else if (!vars.animationLoop) {
                        if (slider.animatingTo === 0) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass);
                        } else if (slider.animatingTo === slider.last) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass);
                        } else {
                            slider.directionNav.removeClass(disabledClass);
                        }
                    } else {
                        slider.directionNav.removeClass(disabledClass);
                    }
                }
            }, pausePlay: {
                setup: function () {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }
                    methods.pausePlay.update((vars.slideshow) ? namespace + 'pause' : namespace + 'play');
                    slider.pausePlay.bind(eventType, function (event) {
                        event.preventDefault();
                        if ($(this).hasClass(namespace + 'pause')) {
                            slider.manualPause = true;
                            slider.manualPlay = false;
                            slider.pause();
                        } else {
                            slider.manualPause = false;
                            slider.manualPlay = true;
                            slider.play();
                        }
                    });
                    if (touch) {
                        slider.pausePlay.bind("click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                }, update: function (state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').text(vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').text(vars.pauseText);
                }
            }, touch: function () {
                var startX, startY, offset, cwidth, dx, startT, scrolling = false;
                el.addEventListener('touchstart', onTouchStart, false);

                function onTouchStart(e) {
                    if (slider.animating) {
                        e.preventDefault();
                    } else if (e.touches.length === 1) {
                        slider.pause();
                        cwidth = (vertical) ? slider.h : slider.w;
                        startT = Number(new Date());
                        offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 : (carousel && reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) : (carousel && slider.currentSlide === slider.last) ? slider.limit : (carousel) ? ((slider.itemW + vars.itemMargin) * slider.move) * slider.currentSlide : (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        startX = (vertical) ? e.touches[0].pageY : e.touches[0].pageX;
                        startY = (vertical) ? e.touches[0].pageX : e.touches[0].pageY;
                        el.addEventListener('touchmove', onTouchMove, false);
                        el.addEventListener('touchend', onTouchEnd, false);
                    }
                }

                function onTouchMove(e) {
                    dx = (vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
                    scrolling = (vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));
                    if (!scrolling || Number(new Date()) - startT > 500) {
                        e.preventDefault();
                        if (!fade && slider.transitions) {
                            if (!vars.animationLoop) {
                                dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                            }
                            slider.setProps(offset + dx, "setTouch");
                        }
                    }
                }

                function onTouchEnd(e) {
                    el.removeEventListener('touchmove', onTouchMove, false);
                    if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                        var updateDx = (reverse) ? -dx : dx,
                            target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                            slider.flexAnimate(target, vars.pauseOnAction);
                        } else {
                            if (!fade) slider.flexAnimate(slider.currentSlide, vars.pauseOnAction, true);
                        }
                    }
                    el.removeEventListener('touchend', onTouchEnd, false);
                    startX = null;
                    startY = null;
                    dx = null;
                    offset = null;
                }
            }, resize: function () {
                if (!slider.animating && slider.is(':visible')) {
                    if (!carousel) slider.doMath();
                    if (fade) {
                        methods.smoothHeight();
                    } else if (carousel) {
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    } else if (vertical) {
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        if (vars.smoothHeight) methods.smoothHeight();
                        slider.newSlides.width(slider.computedW);
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            }, smoothHeight: function (dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
                }
            }, sync: function (action) {
                var $obj = $(vars.sync).data("flexslider"), target = slider.animatingTo;
                switch (action) {
                    case"animate":
                        $obj.flexAnimate(target, vars.pauseOnAction, false, true);
                        break;
                    case"play":
                        if (!$obj.playing && !$obj.asNav) {
                            $obj.play();
                        }
                        break;
                    case"pause":
                        $obj.pause();
                        break;
                }
            }
        }
        slider.flexAnimate = function (target, pause, override, withSync, fromNav) {
            if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";
            if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(vars.asNavFor).data('flexslider');
                    slider.atEnd = target === 0 || target === slider.count - 1;
                    master.flexAnimate(target, true, false, true, fromNav);
                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                    master.direction = slider.direction;
                    if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        target = Math.floor(target / slider.visible);
                    } else {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        return false;
                    }
                }
                slider.animating = true;
                slider.animatingTo = target;
                vars.before(slider);
                if (pause) slider.pause();
                if (slider.syncExists && !fromNav) methods.sync("animate");
                if (vars.controlNav) methods.controlNav.active();
                if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
                slider.atEnd = target === 0 || target === slider.last;
                if (vars.directionNav) methods.directionNav.update();
                if (target === slider.last) {
                    vars.end(slider);
                    if (!vars.animationLoop) slider.pause();
                }
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW, margin,
                        slideString, calcNext;
                    if (carousel) {
                        margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
                        slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
                        slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    } else {
                        slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                    }
                    slider.setProps(slideString, "", vars.animationSpeed);
                    if (slider.transitions) {
                        if (!vars.animationLoop || !slider.atEnd) {
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }
                        slider.container.unbind("webkitTransitionEnd transitionend");
                        slider.container.bind("webkitTransitionEnd transitionend", function () {
                            slider.wrapup(dimension);
                        });
                    } else {
                        slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function () {
                            slider.wrapup(dimension);
                        });
                    }
                } else {
                    if (!touch) {
                        slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
                        slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
                    } else {
                        slider.slides.eq(slider.currentSlide).css({"opacity": 0, "zIndex": 1});
                        slider.slides.eq(target).css({"opacity": 1, "zIndex": 2});
                        slider.slides.unbind("webkitTransitionEnd transitionend");
                        slider.slides.eq(slider.currentSlide).bind("webkitTransitionEnd transitionend", function () {
                            vars.after(slider);
                        });
                        slider.animating = false;
                        slider.currentSlide = slider.animatingTo;
                    }
                }
                if (vars.smoothHeight) methods.smoothHeight(vars.animationSpeed);
            }
        }
        slider.wrapup = function (dimension) {
            if (!fade && !carousel) {
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && vars.animationLoop) {
                    slider.setProps(dimension, "jumpEnd");
                } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && vars.animationLoop) {
                    slider.setProps(dimension, "jumpStart");
                }
            }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            vars.after(slider);
        }
        slider.animateSlides = function () {
            if (!slider.animating) slider.flexAnimate(slider.getTarget("next"));
        }
        slider.pause = function () {
            clearInterval(slider.animatedSlides);
            slider.playing = false;
            if (vars.pausePlay) methods.pausePlay.update("play");
            if (slider.syncExists) methods.sync("pause");
        }
        slider.play = function () {
            slider.animatedSlides = setInterval(slider.animateSlides, vars.slideshowSpeed);
            slider.playing = true;
            if (vars.pausePlay) methods.pausePlay.update("pause");
            if (slider.syncExists) methods.sync("play");
        }
        slider.canAdvance = function (target, fromNav) {
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true : (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true : (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false : (target === slider.currentSlide && !asNav) ? false : (vars.animationLoop) ? true : (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false : (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false : true;
        }
        slider.getTarget = function (dir) {
            slider.direction = dir;
            if (dir === "next") {
                return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            } else {
                return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
            }
        }
        slider.setProps = function (pos, special, dur) {
            var target = (function () {
                var posCheck = (pos) ? pos : ((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo,
                    posCalc = (function () {
                        if (carousel) {
                            return (special === "setTouch") ? pos : (reverse && slider.animatingTo === slider.last) ? 0 : (reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) : (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                        } else {
                            switch (special) {
                                case"setTotal":
                                    return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                                case"setTouch":
                                    return (reverse) ? pos : pos;
                                case"jumpEnd":
                                    return (reverse) ? pos : slider.count * pos;
                                case"jumpStart":
                                    return (reverse) ? slider.count * pos : pos;
                                default:
                                    return pos;
                            }
                        }
                    }());
                return (posCalc * -1) + "px";
            }());
            if (slider.transitions) {
                target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
                dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
            }
            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined) slider.container.css(slider.args);
        }
        slider.setup = function (type) {
            if (!fade) {
                var sliderOffset, arr;
                if (type === "init") {
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
                        "overflow": "hidden",
                        "position": "relative"
                    }).appendTo(slider).append(slider.container);
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                if (vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    if (type !== "init") slider.container.find('.clone').remove();
                    slider.container.append(slider.slides.first().clone().addClass('clone')).prepend(slider.slides.last().clone().addClass('clone'));
                }
                slider.newSlides = $(vars.selector, slider);
                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function () {
                        slider.newSlides.css({"display": "block"});
                        slider.doMath();
                        slider.viewport.height(slider.h);
                        slider.setProps(sliderOffset * slider.h, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function () {
                        slider.doMath();
                        slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
                        if (vars.smoothHeight) methods.smoothHeight();
                    }, (type === "init") ? 100 : 0);
                }
            } else {
                slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
                if (type === "init") {
                    if (!touch) {
                        slider.slides.eq(slider.currentSlide).fadeIn(vars.animationSpeed, vars.easing);
                    } else {
                        slider.slides.css({
                            "opacity": 0,
                            "display": "block",
                            "webkitTransition": "opacity " + vars.animationSpeed / 1000 + "s ease",
                            "zIndex": 1
                        }).eq(slider.currentSlide).css({"opacity": 1, "zIndex": 2});
                    }
                }
                if (vars.smoothHeight) methods.smoothHeight();
            }
            if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
        }
        slider.doMath = function () {
            var slide = slider.slides.first(), slideMargin = vars.itemMargin, minItems = vars.minItems,
                maxItems = vars.maxItems;
            slider.w = slider.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();
            if (carousel) {
                slider.itemT = vars.itemWidth + slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? maxItems * slider.itemT : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * minItems)) / minItems : (slider.maxW < slider.w) ? (slider.w - (slideMargin * maxItems)) / maxItems : (vars.itemWidth > slider.w) ? slider.w : vars.itemWidth;
                slider.visible = Math.floor(slider.w / (slider.itemW + slideMargin));
                slider.move = (vars.move > 0 && vars.move < slider.visible) ? vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
                slider.last = slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 : (vars.itemWidth > slider.w) ? ((slider.itemW + (slideMargin * 2)) * slider.count) - slider.w - slideMargin : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW - slider.boxPadding;
        }
        slider.update = function (pos, action) {
            slider.doMath();
            if (!carousel) {
                if (pos < slider.currentSlide) {
                    slider.currentSlide += 1;
                } else if (pos <= slider.currentSlide && pos !== 0) {
                    slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }
            if (vars.controlNav && !slider.manualControls) {
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                    methods.controlNav.update("add");
                } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                    if (carousel && slider.currentSlide > slider.last) {
                        slider.currentSlide -= 1;
                        slider.animatingTo -= 1;
                    }
                    methods.controlNav.update("remove", slider.last);
                }
            }
            if (vars.directionNav) methods.directionNav.update();
        }
        slider.addSlide = function (obj, pos) {
            var $obj = $(obj);
            slider.count += 1;
            slider.last = slider.count - 1;
            if (vertical && reverse) {
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            } else {
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            }
            slider.update(pos, "add");
            slider.slides = $(vars.selector + ':not(.clone)', slider);
            slider.setup();
            vars.added(slider);
        }
        slider.removeSlide = function (obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;
            slider.count -= 1;
            slider.last = slider.count - 1;
            if (isNaN(obj)) {
                $(obj, slider.slides).remove();
            } else {
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            }
            slider.doMath();
            slider.update(pos, "remove");
            slider.slides = $(vars.selector + ':not(.clone)', slider);
            slider.setup();
            vars.removed(slider);
        }
        methods.init();
    }
    $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: false,
        animationLoop: true,
        smoothHeight: false,
        startAt: 0,
        slideshow: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
        pauseOnAction: true,
        pauseOnHover: false,
        useCSS: true,
        touch: true,
        video: false,
        controlNav: true,
        directionNav: true,
        prevText: "Previous",
        nextText: "Next",
        keyboard: true,
        multipleKeyboard: false,
        mousewheel: false,
        pausePlay: false,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 0,
        maxItems: 0,
        move: 0,
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        },
        added: function () {
        },
        removed: function () {
        }
    }
    $.fn.flexslider = function (options) {
        if (options === undefined) options = {};
        if (typeof options === "object") {
            return this.each(function () {
                var $this = $(this), selector = (options.selector) ? options.selector : ".slides > li",
                    $slides = $this.find(selector);
                if ($slides.length === 1) {
                    $slides.fadeIn(400);
                    if (options.start) options.start($this);
                } else if ($this.data('flexslider') == undefined) {
                    new $.flexslider(this, options);
                }
            });
        } else {
            var $slider = $(this).data('flexslider');
            switch (options) {
                case"play":
                    $slider.play();
                    break;
                case"pause":
                    $slider.pause();
                    break;
                case"next":
                    $slider.flexAnimate($slider.getTarget("next"), true);
                    break;
                case"prev":
                case"previous":
                    $slider.flexAnimate($slider.getTarget("prev"), true);
                    break;
                default:
                    if (typeof options === "number") $slider.flexAnimate(options, true);
            }
        }
    }
})(jQuery);
;
;(function ($) {
    $.fn.unveil = function (threshold, callback) {
        var $w = $(window), th = threshold || 0, retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src", images = this, loaded;
        this.one("unveil", function () {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this), wt = $w.scrollTop(), wb = wt + $w.height(), et = $e.offset().top,
                    eb = et + $e.height();
                return eb >= wt - th && et <= wb + th;
            });
            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.scroll(unveil);
        $w.resize(unveil);
        unveil();
        return this;
    };
})(window.jQuery || window.Zepto);
;/*! Riloadr.js 1.5.3 (c) 2014 Tubal Martin - MIT license */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : window.Riloadr = a(jQuery)
}(function (a) {
    "use strict";

    function hb(b) {
        function qb() {
            bb = nb(), _ = ib(k, bb, M), db = D in _ && kb(k, _[D]), eb = eb || G && jb(k), hb = H && lb(_, eb)
        }

        function rb() {
            var b, a = 0;
            if ((V || G) && zb(T, u, X), V && (zb(T, s, W), ab && (gb = T[L], zb(T, P, Y)), B)) for (; b = B[a];) zb(U[N](b), s, W), a++
        }

        function sb() {
            var b, a = 0;
            if (!G && (Ab(T, u, X), V)) {
                if (Ab(T, s, W), B) for (; b = B[a];) Ab(U[N](b), s, W), a++;
                ab && Ab(T, P, Y)
            }
        }

        function tb(a, b) {
            a[y] = 0, a[D] = h, a[v] = wb, a[w] = a[x] = Db, a[d] = ob(a, g, _), Z.splice(b, 1)
        }

        function wb() {
            var c, e, a = this;
            "naturalWidth" in a ? e = a.naturalWidth + a.naturalHeight : (c = new Image, c[d] = a[d], e = c[o] + c[q], c = j), +e > 0 && (a[v] = a[w] = a[x] = j, a[C] && (a[E] = a[E].replace(n, "$1$2")), V && (a.style.visibility = "visible"), v in b && b[v][l](a), Eb())
        }

        function Db() {
            var f, a = this, c = function (b) {
                var c = new Image;
                c[v] = function () {
                    a[d] = c[d], wb[l](a)
                }, c[w] = c[x] = function () {
                    Db[l](a)
                }, c[d] = b
            };
            a[v] = a[w] = a[x] = j, w in b && b[w][l](a), a[y] < O ? (a[y]++, f = ob(a, g, a[D] ? db : _, e), c(f)) : D in _ && !a[D] && db ? (a[y] = 0, a[D] = e, f = ob(a, g, db), c(f)) : Eb()
        }

        function Eb() {
            $--, 0 === $ && (sb(), I in b && b[I]())
        }

        var _, cb, db, eb, hb, c = this, g = b.base || p, k = b.breakpoints || yb('"breakpoints" not defined.'),
            m = b.name || "responsive", n = new RegExp("(^|\\s)" + m + "(\\s|$)"),
            t = b.defer && ("string" == typeof b.defer ? {
                mode: b.defer,
                threshold: b.foldDistance,
                overflownElemsIds: []
            } : b.defer), z = t && t.mode.toLowerCase(), A = t && t.threshold || 100, B = t && t.overflownElemsIds,
            F = b.watchViewportWidth, G = !!F, H = "wider" == F, J = "*" == F, M = b.ignoreLowBandwidth || h,
            O = b[y] || 0, Q = b.root || j, V = ("invisible" == z || "belowfold" == z) && !fb, W = ub(function () {
                c[K]()
            }, i), X = vb(function () {
                G && qb(), c[K](G)
            }, i), Y = vb(function () {
                T[L] !== gb && (gb = T[L], c[K]())
            }, i), Z = [], $ = 0;
        c[K] = function (b) {
            xb(function (c, d) {
                if (Z[r] && b !== e || (b && rb(), a("img." + m, Q).each(function (a, c) {
                    c && !c[C] && ((!G || G && (b === e || !cb || H && mb(_, cb) || J && !lb(_, cb))) && (Z.push(c), $++), (!G || hb) && (c[C] = e))
                }), G && (hb && (G = h), cb = _)), Z[r]) for (d = 0; c = Z[d];) c && (!V || V && pb(c, A)) && (tb(c, d), d--), d++;
                c = j
            })
        }, Bb(function () {
            R = a(T), S = U[f], Q = Q && a("#" + Q) || S, qb(), rb(), !z || V ? c[K]() : Cb(c[K])
        })
    }

    function ib(a, b, c) {
        for (var g, h, i, j, d = b, e = 0, f = {}; g = a[e];) h = g[z], i = g[A], j = g[Q], b > 0 ? (h && i && b >= h && i >= b || h && !i && b >= h || i && !h && i >= b) && (!j || j && db >= j && (c || !c && !eb)) && (f = g) : (0 >= d || d > h || d > i) && (d = h || i || d, f = g), e++;
        return f
    }

    function jb(a) {
        for (var d, b = 0, c = {}; d = a[b];) mb(d, c) && (c = d), b++;
        return c
    }

    function kb(a, b) {
        for (var d, c = 0; d = a[c];) {
            if (d.name == b) return d;
            c++
        }
    }

    function lb(a, b) {
        return a.name === b.name && a[z] === b[z] && a[A] === b[A] && a[Q] === b[Q] && a[F] === b[F]
    }

    function mb(a, b) {
        var c = +a[Q] || 1, d = +b[Q] || 1;
        return a = Math.max(+a[z] || 0, +a[A] || 0) * (db >= c ? c : 1), b = Math.max(+b[z] || 0, +b[A] || 0) * (db >= d ? d : 1), a > b
    }

    function nb() {
        for (var d, a = Math, b = [T.innerWidth, V.clientWidth, V.offsetWidth, S.clientWidth], c = 0; c < b[r]; c++) isNaN(b[c]) && (b.splice(c, 1), c--);
        return b[r] && (d = a.max[m](a, b), isNaN(cb) || (d = a.min(cb, d))), d || cb || 0
    }

    function ob(a, b, c, d) {
        var e = (a.getAttribute("data-base") || b) + (a.getAttribute("data-src") || a.getAttribute("data-src-" + c.name) || p);
        return c[F] && (e = e.split("."), e.pop(), e = e.join(".") + "." + c[F]), d && (e += ($.test(e) ? "&" : "?") + "riloadrts=" + (new Date).getTime()), e.replace(_, c.name)
    }

    function eb() {
        var a = T.navigator,
            b = a.connection || a.mozConnection || a.webkitConnection || a.oConnection || a.msConnection || {},
            c = b.type || "unknown", d = +b.bandwidth || 1 / 0;
        return d > 0 && .1 > d || /^[23]g|3|4$/.test(c + p)
    }

    function pb(b, c) {
        var d = a(b);
        return !(qb(d, c) || rb(d, c) || sb(d, c) || tb(d, c))
    }

    function qb(a, b) {
        return R[q]() + R[H]() <= a[t]()[c] - b
    }

    function rb(a, b) {
        return R[H]() >= a[t]()[c] + b + a[q]()
    }

    function sb(a, b) {
        return R[o]() + R[J]() <= a[t]()[g] - b
    }

    function tb(a, b) {
        return R[J]() >= a[t]()[g] + b + a[o]()
    }

    function ub(a, b) {
        function h() {
            g = new Date, f = j, a[m](e, c)
        }

        var c, d, e, f, g = 0;
        return function () {
            var i = new Date, j = b - (i - g);
            return c = arguments, e = this, 0 >= j ? (g = i, d = a[m](e, c)) : f || (f = wb(h, j)), d
        }
    }

    function vb(a, b, c) {
        function h() {
            g = j, c || a[m](f, d)
        }

        var d, e, f, g;
        return function () {
            var i = c && !g;
            return d = arguments, f = this, clearTimeout(g), g = wb(h, b), i && (e = a[m](f, d)), e
        }
    }

    function wb(a, b) {
        var c = Array[G].slice[l](arguments, 2);
        return T.setTimeout(function () {
            return a[m](j, c)
        }, b)
    }

    function xb(a) {
        return wb[m](j, [a, 1].concat(Array[G].slice[l](arguments, 1)))
    }

    function yb(a) {
        throw new Error("Riloadr: " + a)
    }

    function zb(a, b, c) {
        a[Y](X + b, c, h)
    }

    function Ab(a, b, c) {
        a[Z](X + b, c, h)
    }

    function Bb(b) {
        a(b)
    }

    function Cb(a) {
        if (U.readyState === B) a(); else {
            var b = function () {
                Ab(T, k, b), a()
            };
            zb(T, k, b)
        }
    }

    var R, S, bb, gb, b = "on", c = "top", d = "src", e = !0, f = "body", g = "left", h = !1, i = 250, j = null,
        k = "load", l = "call", m = "apply", n = "error", o = "width", p = "", q = "height", r = "length", s = "scroll",
        t = "offset", u = "resize", v = b + k, w = b + n, x = b + "abort", y = "retries", z = "minWidth",
        A = "maxWidth", B = "complete", C = "riloaded", D = "fallback", E = "className", F = "imgFormat",
        G = "prototype", H = s + "Top", I = b + B, J = s + "Left", K = k + "Images", L = "orientation",
        M = "EventListener", N = "getElementById", O = "add" + M, P = L + "change", Q = "minDevicePixelRatio",
        T = window, U = T.document, V = U.documentElement, W = O in U, X = W ? p : b, Y = W ? O : "attachEvent",
        Z = W ? "remove" + M : "detachEvent", $ = /\?/, _ = /{breakpoint-name}/gi, ab = L in T && b + P in T,
        cb = T.screen[o], db = T.devicePixelRatio || 1, eb = eb(),
        fb = "[object OperaMini]" === Object[G].toString[l](T.operamini);
    return V[E] = V[E].replace(/(^|\s)no-js(\s|$)/, "$1$2"), hb.version = "1.5.3", hb[G].riload = function () {
        this[K](e)
    }, hb
});
;$.expr[':'].active = function (obj) {
    return $(obj).css('display') !== 'none';
};
$.expr[':'].inactive = function (obj) {
    return $(obj).css('display') === 'none';
};
;!function ($, _) {
    'use strict';
    var FacetedTile = function (element, deferred, options) {
        this.init(element, deferred, options);
    };
    FacetedTile.prototype = {
        constructor: FacetedTile, init: function (element, deferred, options) {
            var that = this;
            var $doc = $(document);
            this.options = options || {};
            this.meta = this.options.meta || undefined;
            this.$el = $(element);
            this.$metas = this.$el.find('[data-meta-field]');
            this.$tileImage = this.$el.find('.trip-tile-image');
            this.$banner = this.$tileImage.find('.trip-tile-banner');
            this.$map = this.$tileImage.find('.trip-tile-map');
            this.images = {map: this.$map, banner: this.$banner};
            this.initCountryPopovers();
            this.initMetaPopovers();
            $doc.click(function (evt) {
                that.hidePopovers();
            });
            this.initUnveil(this.options.currentView);
            deferred.resolve();
        }, initUnveil: function (imageType) {
            var $img = this.images[imageType];
            if (!$img.data('unveiled')) {
                $img.find('img').unveil(this.options.lazyLoadThreshold, null, $(".snap-content").get()[0]);
                $img.data('unveiled', true);
            }
        }, initMetaPopovers: function () {
            var that = this;
            if (!this.meta) {
                return;
            }
            this.$metas.each(function () {
                var $this = $(this);
                var data = $this.data();
                if (data.metaField && data.metaValue) {
                    var metaFieldData = that.meta[data.metaField];
                    if (_.isNumber(data.metaValue)) {
                        data.metaValue = data.metaValue.toString();
                    }
                    if (metaFieldData) {
                        var meta = _.find(metaFieldData, {'name': data.metaValue});
                        var placement = data.place || $.fn.facetedTile.popoverDefaults.placement;
                        if (meta) {
                            if (data.place) {
                                placement = data.place;
                            }
                            $this.css('cursor', 'pointer');
                            $this.popover(_.extend({}, $.fn.facetedTile.popoverDefaults, {
                                placement: placement,
                                title: data.metaValue,
                                content: meta.description
                            })).click($.proxy(that.showPopover, that));
                        } else {
                            $this.click(function () {
                                return false;
                            });
                        }
                    }
                }
            });
        }, initCountryPopovers: function () {
            var that = this;
            $('.countries-visited').each(function () {
                var $info = $(this).children('a.info').first();
                if ($info.length > 0) {
                    var countryData = $(this).data('countriesVisited');
                    var countries = JSON.parse(countryData.replace(/\'/g, '"'));
                    if (countries) {
                        $info.each(function () {
                            that.$el.find(this).popover(_.extend($.fn.facetedTile.popoverDefaults, {
                                placement: "top",
                                content: countries.join(', ')
                            })).click($.proxy(that.showPopover, that));
                        });
                    }
                }
            });
        }, showPopover: function (evt) {
            var $el = $(evt.target);
            var visible = $el.hasClass('popover-visible');
            evt.stopPropagation();
            evt.preventDefault();
            this.hidePopovers();
            if (!visible) {
                $el.popover('show');
                $el.addClass('popover-visible');
            }
            return false;
        }, hidePopovers: function () {
            var $popovers = $('.popover-visible');
            $popovers.each(function (evt) {
                $(this).removeClass('popover-visible');
                $(this).popover('hide');
            });
        }
    };
    $.fn.facetedTile = function (option) {
        var dfd = $.Deferred();
        this.each(function () {
            var $this = $(this);
            var data = $this.data('facetedTile');
            var options = typeof option == 'object' && option;
            if (!data) {
                $this.data('facetedTile', (data = new FacetedTile(this, dfd, options)));
            } else {
                dfd.resolve();
            }
        });
        return dfd.promise();
    };
    $.fn.facetedTile.Constructor = FacetedTile;
    $.fn.facetedTile.popoverDefaults = {container: 'body', html: true, trigger: 'manual', placement: 'left'};
}(window.jQuery, window._);
;var riloadr = null;
$(function () {
    riloadr = new Riloadr({
        root: 'container',
        name: 'responsive',
        defer: {mode: 'belowfold'},
        ignoreLowBandwidth: false,
        oncomplete: function () {
        },
        onerror: function () {
        },
        retries: 1,
        breakpoints: [{name: 'small', maxWidth: 340}, {
            name: 'medium',
            minWidth: 340,
            maxWidth: 657,
            minDevicePixelRatio: 2
        }, {name: 'medium', minWidth: 341, maxWidth: 959}, {
            name: 'large',
            minWidth: 658,
            maxWidth: 959,
            minDevicePixelRatio: 2
        }, {name: 'large', minWidth: 960, maxWidth: 1400}, {
            name: 'xlarge',
            minWidth: 960,
            minDevicePixelRatio: 2
        }, {name: 'xlarge', minWidth: 1401}],
        watchViewportWidth: '*'
    });
});
;
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var videoPlayers = document.querySelectorAll("iframe.video-player");
var player;
var playerId;

function onYouTubeIframeAPIReady() {
    for (var i = 0; i < videoPlayers.length; i++) {
        playerId = videoPlayers[i].getAttribute("id");
        if (playerId) {
            player = new YT.Player(playerId, {events: {'onStateChange': onPlayerStateChange}});
        }
    }
}

function onPlayerStateChange(newState) {
    if (typeof heap !== "undefined") {
        if (newState.data == YT.PlayerState.PLAYING) {
            heap.track('Video Playing');
        } else if (newState.data == YT.PlayerState.ENDED) {
            heap.track('Video Finished');
        } else if (newState.data == YT.PlayerState.PAUSED) {
            heap.track('Video Paused');
        } else if (newState.data == YT.PlayerState.BUFFERING) {
            heap.track('Video Buffering');
        } else if (newState.data == YT.PlayerState.CUED) {
            heap.track('Video Cued');
        }
    }
};(function ($) {
    jQuery.fn.fancySlider = function (arg) {
        var options = $.extend({}, $.fn.fancySlider.defaults, arg);
        var $elem, $projects, $mainWrapper, $projectList, $nav, $projectNav, previewWidth, listItemWidth,
            totalListWidth, slideInt, isMobile, innerProjectCounter = 0, startX = 0, tempX = 0, projectShowing = false,
            currentProjectItem = null, currentProject = null, currentListPosX = 0, containingProjects = [];

        function _init(elem) {
            $elem = $(elem);
            $projects = $elem.children('div').remove();
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
            options.screenButton = !options.screenButton ? false : !options.infiniteSlide;
            $elem.addClass('fps-container').css({
                width: options.width,
                height: options.height
            }).append('<div class="fps-main-wrapper"></div>').children('.fps-main-wrapper').append('<ul class="fps-project-list"></ul>').append('<div class="fps-project-navigation fps-clearfix"><span class="fps-close-project"></span></div>');
            previewWidth = $elem.width() < 480 ? $elem.width() : $elem.width() / options.numOfPreviews;
            totalListWidth = previewWidth * $projects.length;
            $mainWrapper = $elem.children('.fps-main-wrapper');
            $projectList = $mainWrapper.children('.fps-project-list');
            $nav = $mainWrapper.children('.fps-navigation');
            $projectNav = $mainWrapper.children('.fps-project-navigation');
            if (options.enableDragging) {
                $projectList.addClass('fps-drag-active');
            }
            $projects.each(function (i, item) {
                var $item = $(item),
                    $lastItem = $projectList.append('<li style="width: ' + previewWidth + 'px; left: ' + (previewWidth * i) + 'px;" data-index="' + i + '"><div class="fps-media-container"></div><div class="fps-list-overlay" style="background-color: ' + options.overlayColor + ';"></div><h1 style="color: ' + options.titleColor + ';">' + item.title + '</h1><div class="fps-project-description" style="width: ' + options.descriptionWidth + 'px; height: ' + options.descriptionHeight + 'px;"></div><div class="fps-video-play"></div><div class="fps-preloader"></div></li>').children('li:last');
                _addMedia($lastItem, $item.data('media'), $item.data('image'));
                if ($elem.width() < 480) {
                    $lastItem.children('.fps-project-description').html($item.children('blockquote').html());
                }
                $lastItem.hammer({prevent_default: true, drag_vertical: false}).on('tap', function () {
                    if (projectShowing || $projectList.is(':animated') || $elem.width() < 480) {
                        return false;
                    }
                    _stopInterval();
                    var $this = $(this), $project = $($projects.get(parseInt($this.data('index'))));
                    currentProjectItem = $this;

                    function getCopy() {
                        containingProjects.push({
                            media: $project.data('media'),
                            image: $project.data('image'),
                            title: $project.attr('title'),
                            description: $project.children('blockquote').html(),
                            textAlignment: $project.data('textalignment'),
                            link: $project.data('link'),
                            type: _getFileType($project.data('media')),
                            useOneTitle: $project.data('useonetitle'),
                            useOneDescription: $project.data('useonedescription')
                        });
                        currentProject = containingProjects[0];
                    }

                    projectShowing = true;
                    currentListPosX = $projectList.position().left;
                    getCopy();
                    $nav.animate({left: options.arrows ? -($nav.children(':first').width() * 2) : 0}, 300);
                    currentProjectItem.addClass('fps-active-project').css('z-index', 1).animate({width: '100%'}, 500).children('.fps-media-container').children('img').animate({left: 0}, 500);
                    currentProjectItem.children('.fps-list-overlay').hide();
                    $projectList.removeClass('fps-drag-active').animate({left: -(currentProjectItem.position().left)}, 500, function () {
                        $projectNav.animate({top: 0}, 300);
                    });
                    _setProjectText(currentProjectItem, currentProject.title, currentProject.description, currentProject.textAlignment, currentProject.link);
                }).hover(function () {
                    if (!projectShowing) {
                        $(this).children('.fps-list-overlay').stop().fadeTo(500, 0);
                    }
                }, function () {
                    if (!projectShowing) {
                        $(this).children('.fps-list-overlay').stop().fadeTo(200, 0.5);
                    }
                }).children('.fps-list-overlay').fadeTo(0, 0.5);
            });
            options.onCoverflowReady.call();
            $projectNav.children('.fps-close-project').click(function () {
                var $mediaContainer = currentProjectItem.children('.fps-media-container');
                $projectNav.animate({top: -60}, 200).children('.fps-subproject-counter').hide();
                $mediaContainer.animate({left: 0}, innerProjectCounter === 0 ? 0 : 300, function () {
                    currentProjectItem.removeClass('fps-active-project').animate({width: previewWidth}, 300);
                    $mediaContainer.css('left', 0).children('img:first').animate({left: $mediaContainer.children('img:first').data('leftpos')}, 300);
                    $nav.animate({left: 0}, 300);
                    currentProjectItem.children('h1').text(containingProjects[0].title).animate({
                        'marginLeft': 0,
                        left: 0,
                        width: '100%'
                    }, 300);
                    currentProjectItem.children('.fps-list-overlay').css('z-index', 0).fadeTo(300, 0.5);
                    currentProjectItem.children('.fps-project-description').animate({bottom: -(currentProjectItem.children('.fps-project-description').outerHeight())}, 300, function () {
                        $(this).hide();
                    });
                    if ($projectList.position().left < $elem.width() - totalListWidth && !options.infiniteSlide) {
                        currentListPosX = $elem.width() - totalListWidth;
                    }
                    $projectList.animate({left: currentListPosX}, 300, function () {
                        currentProjectItem.children('.fps-media-container').children('img:not(:first)').remove();
                        currentProjectItem.css('z-index', 0);
                        if (options.enableDragging) {
                            $projectList.addClass('fps-drag-active');
                        }
                        currentProjectItem = null;
                        projectShowing = false;
                        containingProjects = [];
                        innerProjectCounter = 0;
                        _startInterval();
                    });
                });
            });
            $(window).bind('resize', function (evt) {
                if (currentProjectItem) {
                    var $mediaContainer = currentProjectItem.children('.fps-media-container'),
                        $title = currentProjectItem.children('h1'),
                        $description = currentProjectItem.children('.fps-project-description');
                    $mediaContainer.css('left', -(innerProjectCounter * $elem.width())).children('img').each(function (i, item) {
                        $(item).css('left', (i * $elem.width()));
                    });
                    if ($title.data('alignment') == 'right') {
                        var textDimension = $.textMetrics($title.get(0));
                        $title.css('left', $elem.width() - (options.textOffsetToBorder + textDimension.width));
                    }
                    if ($description.data('alignment') == 'right') {
                        var descriptionWidth = options.descriptionWidth + parseInt($description.css('paddingLeft')) + parseInt($description.css('paddingRight'));
                        $description.css('left', $elem.width() - (options.textOffsetToBorder + descriptionWidth));
                    }
                }
                if (!projectShowing) {
                    if ($projectList.position().left < $elem.width() - totalListWidth) {
                        $projectList.css('left', $elem.width() - totalListWidth);
                    }
                }
            });
            if (totalListWidth > $elem.width()) {
                $projectList.hammer({
                    prevent_default: true,
                    hold_timeout: 0,
                    drag_vertical: false
                }).on('dragstart', function (evt) {
                    if (projectShowing || !options.enableDragging) {
                        return false;
                    }
                    startX = $projectList.position().left;
                }).on("drag", function (evt) {
                    if (projectShowing || !options.enableDragging) {
                        return false;
                    }
                    var moveX = 0, gesture = evt.gesture;
                    if (gesture.direction == 'left') {
                        moveX = 0 - gesture.distance;
                    } else if (gesture.direction == 'right') {
                        moveX = gesture.distance;
                    }
                    moveX = moveX + startX;
                    if (!options.infiniteSlide) {
                        if (moveX > 100) {
                            moveX = 100;
                        } else if (moveX < -(totalListWidth - $elem.width() + 100)) {
                            moveX = -(totalListWidth - $elem.width() + 100);
                        }
                    }
                    var slideDirectionInt = Math.ceil(moveX / previewWidth);
                    if (tempX != slideDirectionInt) {
                        if (tempX > slideDirectionInt) {
                            _infiniteChaining(true);
                        } else {
                            _infiniteChaining(false);
                        }
                        tempX = slideDirectionInt;
                    }
                    $projectList.css({left: moveX});
                }).on('release', function (evt) {
                    if (projectShowing || !options.enableDragging) {
                        return false;
                    }
                    _dock();
                });
                if (options.arrows) {
                    $nav.prepend('<span class="fps-previous-button"></span><span class="fps-next-button"></span>').children('.fps-previous-button, .fps-next-button').click(function () {
                        _stopInterval();
                        _startInterval();
                        $(this).hasClass('fps-previous-button') ? _slide('right') : _slide('left');
                    });
                }
            }
            if (options.screenButton && !isMobile && !/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                $(document).bind('fullscreenchange mozfullscreenchange webkitfullscreenchange', function (evt) {
                    var $screenBtn = $nav.children('.fps-screen-button');
                    if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                        $elem.addClass('fps-fullscreen-mode');
                        $screenBtn.removeClass('fps-fullscreen').addClass('fps-normalscreen');
                    } else {
                        $elem.removeClass('fps-fullscreen-mode');
                        $screenBtn.removeClass('fps-normalscreen').addClass('fps-fullscreen');
                    }
                });
            }
            if ($elem.width() < 480) {
            }
        }

        function _slide(direction) {
            if ($projectList.is(':animated')) {
                return false;
            }
            var listLength = $projectList.children('li').size();
            if (typeof (direction) === 'undefined') direction = 'left';
            if (direction == 'left') {
                if (Math.abs($projectList.position().left) < totalListWidth - $elem.width() || options.infiniteSlide) {
                    $projectList.animate({left: '-=' + previewWidth}, 500, function () {
                        _infiniteChaining(true);
                    });
                }
            } else {
                if ($projectList.position().left !== 0 || options.infiniteSlide) {
                    _infiniteChaining(false);
                    $projectList.animate({left: '+=' + previewWidth}, 500);
                }
            }
        }

        function _dock() {
            if ($projectList.position().left < $elem.width() - totalListWidth && !options.infiniteSlide) {
                $projectList.animate({left: $elem.width() - totalListWidth});
            } else {
                var index = Math.round($projectList.position().left / previewWidth);
                $projectList.animate({left: index * previewWidth});
            }
        }

        function _startInterval() {
            if (options.slideTime && slideInt === undefined && !projectShowing) {
                slideInt = setInterval(_slide, options.slideTime);
            }
        }

        function _stopInterval() {
            if (options.slideTime && slideInt !== undefined) {
                clearInterval(slideInt);
                slideInt = undefined;
            }
        }

        function _infiniteChaining(append) {
            if (!options.infiniteSlide) {
                return false;
            }
            if (append) {
                var newLeftPos = $projectList.children('li:last').position().left;
                $projectList.children('li:last').after($projectList.children('li:first').css('left', newLeftPos + previewWidth));
            } else {
                var newLeftPos = $projectList.children('li:first').position().left;
                $projectList.children('li:first').before($projectList.children('li:last').css('left', newLeftPos - previewWidth));
            }
        }

        function _addMedia(listItem, mediaSrc, imageSrc) {
            var $mediaContainer = listItem.children('.fps-media-container'), fileType = _getFileType(mediaSrc);
            listItem.children('.fps-preloader').fadeIn(100);
            if (fileType == 'image') {
                _loadImage(mediaSrc, $mediaContainer);
            } else if (imageSrc && imageSrc.length > 0) {
                _loadImage(imageSrc, $mediaContainer);
            }
        }

        function _loadImage(source, mediaContainer) {
            var imgSize = mediaContainer.children('img').size();
            var loadImg = document.createElement("img");
            loadImg.style.left = imgSize * $elem.width() + 'px';
            loadImg.style.display = imgSize === 0 ? 'none' : 'inline';
            loadImg.src = source;
            loadImg.onload = function () {
                mediaContainer.append(loadImg);
                if (mediaContainer.children('img').size() == 1) {
                    var $img = mediaContainer.children('img:first'),
                        leftPos = $img <= previewWidth ? 0 : -($img.width() * 0.5 - previewWidth * 0.5);
                    mediaContainer.children('img:first').css('left', leftPos).fadeIn(500).data('leftpos', leftPos);
                } else {
                    _setProjectText(currentProjectItem, currentProject.title, currentProject.description, currentProject.textAlignment, currentProject.link);
                    $projectNav.children('.fps-subproject-counter').text((innerProjectCounter + 1) + '/' + containingProjects.length);
                    mediaContainer.animate({left: '-=' + $elem.width()}, 500, _checkForVideo);
                    mediaContainer.parent().children('.fps-list-overlay').fadeOut(0);
                }
                mediaContainer.parent().children('.fps-preloader').hide();
            };
        }

        function _setProjectText($pi, title, description, textAlignment, link) {
            if (title && title.length > 0 && (innerProjectCounter === 0 || !containingProjects[0].useOneTitle)) {
                var $title = $pi.children('h1').text(title), textDimension = $.textMetrics($title.get(0));
                $title.data('alignment', textAlignment).css('width', 'auto');
                if (textAlignment == 'right') {
                    $title.animate({
                        left: $elem.width() - (options.textOffsetToBorder + textDimension.width),
                        'marginLeft': 0,
                        top: options.textOffsetToBorder
                    }, 300);
                } else if (textAlignment == 'center') {
                    $title.animate({
                        left: '50%',
                        'marginLeft': -(textDimension.width * 0.5),
                        top: options.textOffsetToBorder
                    }, 300);
                } else {
                    $title.animate({
                        left: options.textOffsetToBorder,
                        'marginLeft': 0,
                        top: options.textOffsetToBorder
                    }, 300);
                }
            }
            $description = $pi.children('.fps-project-description');
            if (description && description.length > 0 && (innerProjectCounter === 0 || !containingProjects[0].useOneDescription)) {
                $description.data('alignment', textAlignment).html(description).show();
                var descriptionWidth = options.descriptionWidth + parseInt($description.css('paddingLeft')) + parseInt($description.css('paddingRight'));
                if (textAlignment == 'right') {
                    $description.animate({
                        left: $elem.width() - (options.textOffsetToBorder + descriptionWidth),
                        'marginLeft': 0,
                        bottom: 0
                    }, 300);
                } else if (textAlignment == 'center') {
                    $description.animate({left: '50%', 'marginLeft': -(descriptionWidth * 0.5), bottom: 0}, 300);
                } else {
                    $description.animate({left: options.textOffsetToBorder, 'marginLeft': 0, bottom: 0}, 300);
                }
            } else if (!containingProjects[0].useOneDescription) {
                $description.animate({bottom: -($description.outerHeight())}, 300);
            }
        }

        function _getFileType(media) {
            if (media.match(/youtube\.com\/watch/i) || media.match(/youtu\.be/i)) {
                return 'youtube';
            } else if (media.match(/\.(gif|jpg|jpeg|png)$/i)) {
                return 'image';
            }
        }

        function _getParam(url, key) {
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + key + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            return (results === null) ? "" : results[1];
        }

        return this.each(function () {
            _init(this);
        });
    };
    $.fn.fancySlider.defaults = {
        width: 940,
        height: 600,
        numOfPreviews: 7,
        textOffsetToBorder: 60,
        descriptionWidth: 400,
        descriptionHeight: "auto",
        slideTime: 0,
        overlayColor: '#000000',
        titleColor: '#ffffff',
        scrollbarBackground: '#ffffff',
        scrollbarCursorColor: '#333333',
        screenButton: true,
        infiniteSlide: false,
        enableDragging: true,
        arrows: true,
        mp4Parameters: {enableKeyboard: true, skin: 'yellow'},
        onCoverflowReady: function () {
        },
        onProjectShow: function () {
        }
    };
})(jQuery);
(function ($) {
    $.textMetrics = function (el) {
        var h = 0, w = 0;
        var div = document.createElement('div');
        document.body.appendChild(div);
        $(div).css({position: 'absolute', left: -1000, top: -1000, display: 'none'});
        $(div).html($(el).html());
        var styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        $(styles).each(function () {
            var s = this.toString();
            $(div).css(s, $(el).css(s));
        });
        h = $(div).outerHeight();
        w = $(div).outerWidth();
        $(div).remove();
        var ret = {height: h, width: w};
        return ret;
    };
})(jQuery);/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
(function (t, e) {
    "use strict";

    function n() {
        if (!i.READY) {
            i.event.determineEventTypes();
            for (var t in i.gestures) i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
            i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect), i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect), i.READY = !0
        }
    }

    var i = function (t, e) {
        return new i.Instance(t, e || {})
    };
    i.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    }, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, i.HAS_TOUCHEVENTS = "ontouchstart" in t, i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN = "down", i.DIRECTION_LEFT = "left", i.DIRECTION_UP = "up", i.DIRECTION_RIGHT = "right", i.POINTER_MOUSE = "mouse", i.POINTER_TOUCH = "touch", i.POINTER_PEN = "pen", i.EVENT_START = "start", i.EVENT_MOVE = "move", i.EVENT_END = "end", i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance = function (t, e) {
        var r = this;
        return n(), this.element = t, this.enabled = !0, this.options = i.utils.extend(i.utils.extend({}, i.defaults), e || {}), this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), i.event.onTouch(t, i.EVENT_START, function (t) {
            r.enabled && i.detection.startDetect(r, t)
        }), this
    }, i.Instance.prototype = {
        on: function (t, e) {
            for (var n = t.split(" "), i = 0; n.length > i; i++) this.element.addEventListener(n[i], e, !1);
            return this
        }, off: function (t, e) {
            for (var n = t.split(" "), i = 0; n.length > i; i++) this.element.removeEventListener(n[i], e, !1);
            return this
        }, trigger: function (t, e) {
            var n = i.DOCUMENT.createEvent("Event");
            n.initEvent(t, !0, !0), n.gesture = e;
            var r = this.element;
            return i.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(n), this
        }, enable: function (t) {
            return this.enabled = t, this
        }
    };
    var r = null, o = !1, s = !1;
    i.event = {
        bindDom: function (t, e, n) {
            for (var i = e.split(" "), r = 0; i.length > r; r++) t.addEventListener(i[r], n, !1)
        }, onTouch: function (t, e, n) {
            var a = this;
            this.bindDom(t, i.EVENT_TYPES[e], function (c) {
                var u = c.type.toLowerCase();
                if (!u.match(/mouse/) || !s) {
                    (u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which) && (o = !0), u.match(/touch|pointer/) && (s = !0);
                    var h = 0;
                    o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length : s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE : h || (e = i.EVENT_END), h || null === r ? r = c : c = r, n.call(i.detection, a.collectEventData(t, e, c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))), h || (r = null, o = !1, s = !1, i.PointerEvent.reset())
                }
            })
        }, determineEventTypes: function () {
            var t;
            t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] = t[2]
        }, getTouchList: function (t) {
            return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches : [{
                identifier: 1,
                pageX: t.pageX,
                pageY: t.pageY,
                target: t.target
            }]
        }, collectEventData: function (t, e, n) {
            var r = this.getTouchList(n, e), o = i.POINTER_TOUCH;
            return (n.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {
                center: i.utils.getCenter(r),
                timeStamp: (new Date).getTime(),
                target: n.target,
                touches: r,
                eventType: e,
                pointerType: o,
                srcEvent: n,
                preventDefault: function () {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function () {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function () {
                    return i.detection.stopDetect()
                }
            }
        }
    }, i.PointerEvent = {
        pointers: {}, getTouchList: function () {
            var t = this, e = [];
            return Object.keys(t.pointers).sort().forEach(function (n) {
                e.push(t.pointers[n])
            }), e
        }, updatePointer: function (t, e) {
            return t == i.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length
        }, matchType: function (t, e) {
            if (!e.pointerType) return !1;
            var n = {};
            return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN, n[t]
        }, getEvents: function () {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        }, reset: function () {
            this.pointers = {}
        }
    }, i.utils = {
        extend: function (t, n, i) {
            for (var r in n) t[r] !== e && i || (t[r] = n[r]);
            return t
        }, hasParent: function (t, e) {
            for (; t;) {
                if (t == e) return !0;
                t = t.parentNode
            }
            return !1
        }, getCenter: function (t) {
            for (var e = [], n = [], i = 0, r = t.length; r > i; i++) e.push(t[i].pageX), n.push(t[i].pageY);
            return {
                pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
                pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
            }
        }, getVelocity: function (t, e, n) {
            return {x: Math.abs(e / t) || 0, y: Math.abs(n / t) || 0}
        }, getAngle: function (t, e) {
            var n = e.pageY - t.pageY, i = e.pageX - t.pageX;
            return 180 * Math.atan2(n, i) / Math.PI
        }, getDirection: function (t, e) {
            var n = Math.abs(t.pageX - e.pageX), r = Math.abs(t.pageY - e.pageY);
            return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN
        }, getDistance: function (t, e) {
            var n = e.pageX - t.pageX, i = e.pageY - t.pageY;
            return Math.sqrt(n * n + i * i)
        }, getScale: function (t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
        }, getRotation: function (t, e) {
            return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
        }, isVertical: function (t) {
            return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
        }, stopDefaultBrowserBehavior: function (t, e) {
            var n, i = ["webkit", "khtml", "moz", "ms", "o", ""];
            if (e && t.style) {
                for (var r = 0; i.length > r; r++) for (var o in e) e.hasOwnProperty(o) && (n = o, i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
                "none" == e.userSelect && (t.onselectstart = function () {
                    return !1
                })
            }
        }
    }, i.detection = {
        gestures: [], current: null, previous: null, stopped: !1, startDetect: function (t, e) {
            this.current || (this.stopped = !1, this.current = {
                inst: t,
                startEvent: i.utils.extend({}, e),
                lastEvent: !1,
                name: ""
            }, this.detect(e))
        }, detect: function (t) {
            if (this.current && !this.stopped) {
                t = this.extendEventData(t);
                for (var e = this.current.inst.options, n = 0, r = this.gestures.length; r > n; n++) {
                    var o = this.gestures[n];
                    if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
                        this.stopDetect();
                        break
                    }
                }
                return this.current && (this.current.lastEvent = t), t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
            }
        }, stopDetect: function () {
            this.previous = i.utils.extend({}, this.current), this.current = null, this.stopped = !0
        }, extendEventData: function (t) {
            var e = this.current.startEvent;
            if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
                e.touches = [];
                for (var n = 0, r = t.touches.length; r > n; n++) e.touches.push(i.utils.extend({}, t.touches[n]))
            }
            var o = t.timeStamp - e.timeStamp, s = t.center.pageX - e.center.pageX, a = t.center.pageY - e.center.pageY,
                c = i.utils.getVelocity(o, s, a);
            return i.utils.extend(t, {
                deltaTime: o,
                deltaX: s,
                deltaY: a,
                velocityX: c.x,
                velocityY: c.y,
                distance: i.utils.getDistance(e.center, t.center),
                angle: i.utils.getAngle(e.center, t.center),
                direction: i.utils.getDirection(e.center, t.center),
                scale: i.utils.getScale(e.touches, t.touches),
                rotation: i.utils.getRotation(e.touches, t.touches),
                startEvent: e
            }), t
        }, register: function (t) {
            var n = t.defaults || {};
            return n[t.name] === e && (n[t.name] = !0), i.utils.extend(i.defaults, n, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function (t, e) {
                return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
            }), this.gestures
        }
    }, i.gestures = i.gestures || {}, i.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {hold_timeout: 500, hold_threshold: 1},
        timer: null,
        handler: function (t, e) {
            switch (t.eventType) {
                case i.EVENT_START:
                    clearTimeout(this.timer), i.detection.current.name = this.name, this.timer = setTimeout(function () {
                        "hold" == i.detection.current.name && e.trigger("hold", t)
                    }, e.options.hold_timeout);
                    break;
                case i.EVENT_MOVE:
                    t.distance > e.options.hold_threshold && clearTimeout(this.timer);
                    break;
                case i.EVENT_END:
                    clearTimeout(this.timer)
            }
        }
    }, i.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function (t, e) {
            if (t.eventType == i.EVENT_END) {
                var n = i.detection.previous, r = !1;
                if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance) return;
                n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0), (!r || e.options.tap_always) && (i.detection.current.name = "tap", e.trigger(i.detection.current.name, t))
            }
        }
    }, i.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {swipe_max_touches: 1, swipe_velocity: .7},
        handler: function (t, e) {
            if (t.eventType == i.EVENT_END) {
                if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches) return;
                (t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t))
            }
        }
    }, i.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function (t, n) {
            if (i.detection.current.name != this.name && this.triggered) return n.trigger(this.name + "end", t), this.triggered = !1, e;
            if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches)) switch (t.eventType) {
                case i.EVENT_START:
                    this.triggered = !1;
                    break;
                case i.EVENT_MOVE:
                    if (t.distance < n.options.drag_min_distance && i.detection.current.name != this.name) return;
                    i.detection.current.name = this.name, (i.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
                    var r = i.detection.current.lastEvent.direction;
                    t.drag_locked_to_axis && r !== t.direction && (t.direction = i.utils.isVertical(r) ? 0 > t.deltaY ? i.DIRECTION_UP : i.DIRECTION_DOWN : 0 > t.deltaX ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && i.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
                    break;
                case i.EVENT_END:
                    this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
            }
        }
    }, i.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {transform_min_scale: .01, transform_min_rotation: 1, transform_always_block: !1},
        triggered: !1,
        handler: function (t, n) {
            if (i.detection.current.name != this.name && this.triggered) return n.trigger(this.name + "end", t), this.triggered = !1, e;
            if (!(2 > t.touches.length)) switch (n.options.transform_always_block && t.preventDefault(), t.eventType) {
                case i.EVENT_START:
                    this.triggered = !1;
                    break;
                case i.EVENT_MOVE:
                    var r = Math.abs(1 - t.scale), o = Math.abs(t.rotation);
                    if (n.options.transform_min_scale > r && n.options.transform_min_rotation > o) return;
                    i.detection.current.name = this.name, this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), o > n.options.transform_min_rotation && n.trigger("rotate", t), r > n.options.transform_min_scale && (n.trigger("pinch", t), n.trigger("pinch" + (1 > t.scale ? "in" : "out"), t));
                    break;
                case i.EVENT_END:
                    this.triggered && n.trigger(this.name + "end", t), this.triggered = !1
            }
        }
    }, i.gestures.Touch = {
        name: "touch",
        index: -1 / 0,
        defaults: {prevent_default: !1, prevent_mouseevents: !1},
        handler: function (t, n) {
            return n.options.prevent_mouseevents && t.pointerType == i.POINTER_MOUSE ? (t.stopDetect(), e) : (n.options.prevent_default && t.preventDefault(), t.eventType == i.EVENT_START && n.trigger(this.name, t), e)
        }
    }, i.gestures.Release = {
        name: "release", index: 1 / 0, handler: function (t, e) {
            t.eventType == i.EVENT_END && e.trigger(this.name, t)
        }
    }, "object" == typeof module && "object" == typeof module.exports ? module.exports = i : (t.Hammer = i, "function" == typeof t.define && t.define.amd && t.define("hammer", [], function () {
        return i
    }))
})(this), function (t, e) {
    "use strict";
    t !== e && (Hammer.event.bindDom = function (n, i, r) {
        t(n).on(i, function (t) {
            var n = t.originalEvent || t;
            n.pageX === e && (n.pageX = t.pageX, n.pageY = t.pageY), n.target || (n.target = t.target), n.which === e && (n.which = n.button), n.preventDefault || (n.preventDefault = t.preventDefault), n.stopPropagation || (n.stopPropagation = t.stopPropagation), r.call(this, n)
        })
    }, Hammer.Instance.prototype.on = function (e, n) {
        return t(this.element).on(e, n)
    }, Hammer.Instance.prototype.off = function (e, n) {
        return t(this.element).off(e, n)
    }, Hammer.Instance.prototype.trigger = function (e, n) {
        var i = t(this.element);
        return i.has(n.target).length && (i = t(n.target)), i.trigger({type: e, gesture: n})
    }, t.fn.hammer = function (e) {
        return this.each(function () {
            var n = t(this), i = n.data("hammer");
            i ? i && e && Hammer.utils.extend(i.options, e) : n.data("hammer", new Hammer(this, e || {}))
        })
    })
}(window.jQuery || window.Zepto);
;