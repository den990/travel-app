!function n(t, e, o) {
    function i(u, f) {
        if (!e[u]) {
            if (!t[u]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(u, !0);
                if (r) return r(u, !0);
                var s = new Error("Cannot find module '" + u + "'");
                throw s.code = "MODULE_NOT_FOUND", s
            }
            var a = e[u] = {exports: {}};
            t[u][0].call(a.exports, function (n) {
                var e = t[u][1][n];
                return i(e ? e : n)
            }, a, a.exports, n, t, e, o)
        }
        return e[u].exports
    }

    for (var r = "function" == typeof require && require, u = 0; u < o.length; u++) i(o[u]);
    return i
}({
    1: [function (n, t) {
        function e() {
        }

        var o = t.exports = {};
        o.nextTick = function () {
            var n = "undefined" != typeof window && window.setImmediate,
                t = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (n) return function (n) {
                return window.setImmediate(n)
            };
            if (t) {
                var e = [];
                return window.addEventListener("message", function (n) {
                    var t = n.source;
                    if ((t === window || null === t) && "process-tick" === n.data && (n.stopPropagation(), e.length > 0)) {
                        var o = e.shift();
                        o()
                    }
                }, !0), function (n) {
                    e.push(n), window.postMessage("process-tick", "*")
                }
            }
            return function (n) {
                setTimeout(n, 0)
            }
        }(), o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.on = e, o.addListener = e, o.once = e, o.off = e, o.removeListener = e, o.removeAllListeners = e, o.emit = e, o.binding = function () {
            throw new Error("process.binding is not supported")
        }, o.cwd = function () {
            return "/"
        }, o.chdir = function () {
            throw new Error("process.chdir is not supported")
        }
    }, {}], 2: [function (n, t) {
        "use strict";

        function e(n) {
            function t(n) {
                return null === c ? void a.push(n) : void r(function () {
                    var t = c ? n.onFulfilled : n.onRejected;
                    if (null === t) return void (c ? n.resolve : n.reject)(s);
                    var e;
                    try {
                        e = t(s)
                    } catch (o) {
                        return void n.reject(o)
                    }
                    n.resolve(e)
                })
            }

            function e(n) {
                try {
                    if (n === l) throw new TypeError("A promise cannot be resolved with itself.");
                    if (n && ("object" == typeof n || "function" == typeof n)) {
                        var t = n.then;
                        if ("function" == typeof t) return void i(t.bind(n), e, u)
                    }
                    c = !0, s = n, f()
                } catch (o) {
                    u(o)
                }
            }

            function u(n) {
                c = !1, s = n, f()
            }

            function f() {
                for (var n = 0, e = a.length; e > n; n++) t(a[n]);
                a = null
            }

            if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof n) throw new TypeError("not a function");
            var c = null, s = null, a = [], l = this;
            this.then = function (n, e) {
                return new l.constructor(function (i, r) {
                    t(new o(n, e, i, r))
                })
            }, i(n, e, u)
        }

        function o(n, t, e, o) {
            this.onFulfilled = "function" == typeof n ? n : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = e, this.reject = o
        }

        function i(n, t, e) {
            var o = !1;
            try {
                n(function (n) {
                    o || (o = !0, t(n))
                }, function (n) {
                    o || (o = !0, e(n))
                })
            } catch (i) {
                if (o) return;
                o = !0, e(i)
            }
        }

        var r = n("asap");
        t.exports = e
    }, {asap: 4}], 3: [function (n, t) {
        "use strict";

        function e(n) {
            this.then = function (t) {
                return "function" != typeof t ? this : new o(function (e, o) {
                    i(function () {
                        try {
                            e(t(n))
                        } catch (i) {
                            o(i)
                        }
                    })
                })
            }
        }

        var o = n("./core.js"), i = n("asap");
        t.exports = o, e.prototype = o.prototype;
        var r = new e(!0), u = new e(!1), f = new e(null), c = new e(void 0), s = new e(0), a = new e("");
        o.resolve = function (n) {
            if (n instanceof o) return n;
            if (null === n) return f;
            if (void 0 === n) return c;
            if (n === !0) return r;
            if (n === !1) return u;
            if (0 === n) return s;
            if ("" === n) return a;
            if ("object" == typeof n || "function" == typeof n) try {
                var t = n.then;
                if ("function" == typeof t) return new o(t.bind(n))
            } catch (i) {
                return new o(function (n, t) {
                    t(i)
                })
            }
            return new e(n)
        }, o.all = function (n) {
            var t = Array.prototype.slice.call(n);
            return new o(function (n, e) {
                function o(r, u) {
                    try {
                        if (u && ("object" == typeof u || "function" == typeof u)) {
                            var f = u.then;
                            if ("function" == typeof f) return void f.call(u, function (n) {
                                o(r, n)
                            }, e)
                        }
                        t[r] = u, 0 === --i && n(t)
                    } catch (c) {
                        e(c)
                    }
                }

                if (0 === t.length) return n([]);
                for (var i = t.length, r = 0; r < t.length; r++) o(r, t[r])
            })
        }, o.reject = function (n) {
            return new o(function (t, e) {
                e(n)
            })
        }, o.race = function (n) {
            return new o(function (t, e) {
                n.forEach(function (n) {
                    o.resolve(n).then(t, e)
                })
            })
        }, o.prototype["catch"] = function (n) {
            return this.then(null, n)
        }
    }, {"./core.js": 2, asap: 4}], 4: [function (n, t) {
        (function (n) {
            function e() {
                for (; i.next;) {
                    i = i.next;
                    var n = i.task;
                    i.task = void 0;
                    var t = i.domain;
                    t && (i.domain = void 0, t.enter());
                    try {
                        n()
                    } catch (o) {
                        if (c) throw t && t.exit(), setTimeout(e, 0), t && t.enter(), o;
                        setTimeout(function () {
                            throw o
                        }, 0)
                    }
                    t && t.exit()
                }
                u = !1
            }

            function o(t) {
                r = r.next = {task: t, domain: c && n.domain, next: null}, u || (u = !0, f())
            }

            var i = {task: void 0, next: null}, r = i, u = !1, f = void 0, c = !1;
            if ("undefined" != typeof n && n.nextTick) c = !0, f = function () {
                n.nextTick(e)
            }; else if ("function" == typeof setImmediate) f = "undefined" != typeof window ? setImmediate.bind(window, e) : function () {
                setImmediate(e)
            }; else if ("undefined" != typeof MessageChannel) {
                var s = new MessageChannel;
                s.port1.onmessage = e, f = function () {
                    s.port2.postMessage(0)
                }
            } else f = function () {
                setTimeout(e, 0)
            };
            t.exports = o
        }).call(this, n("_process"))
    }, {_process: 1}], 5: [function () {
        "function" != typeof Promise.prototype.done && (Promise.prototype.done = function () {
            var n = arguments.length ? this.then.apply(this, arguments) : this;
            n.then(null, function (n) {
                setTimeout(function () {
                    throw n
                }, 0)
            })
        })
    }, {}], 6: [function (n) {
        n("asap");
        "undefined" == typeof Promise && (Promise = n("./lib/core.js"), n("./lib/es6-extensions.js")), n("./polyfill-done.js")
    }, {"./lib/core.js": 2, "./lib/es6-extensions.js": 3, "./polyfill-done.js": 5, asap: 4}]
}, {}, [6]);
;
;window.Modernizr = function (a, b, c) {
    function x(a) {
        j.cssText = a
    }

    function y(a, b) {
        return x(n.join(a + ";") + (b || ""))
    }

    function z(a, b) {
        return typeof a === b
    }

    function A(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function B(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : z(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function C() {
        e.input = function (c) {
            for (var d = 0, e = c.length; d < e; d++) q[c[d]] = c[d] in k;
            return q.list && (q.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), q
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), p[a[d]] = !!e;
            return p
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }

    var d = "2.7.1", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style,
        k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "), o = {},
        p = {}, q = {}, r = [], s = r.slice, t, u = function (a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
            if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
        }, v = {}.hasOwnProperty, w;
    !z(v, "undefined") && !z(v.call, "undefined") ? w = function (a, b) {
        return v.call(a, b)
    } : w = function (a, b) {
        return b in a && z(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = s.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var a = function () {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(s.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(s.call(arguments)))
        };
        return e
    }), o.touch = function () {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : u(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
            c = a.offsetTop === 9
        }), c
    };
    for (var D in o) w(o, D) && (t = D.toLowerCase(), e[t] = o[D](), r.push((e[t] ? "" : "no-") + t));
    return e.input || C(), e.addTest = function (a, b) {
        if (typeof a == "object") for (var d in a) w(a, d) && e.addTest(d, a[d]); else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, x(""), i = k = null, e._version = d, e._prefixes = n, e.testStyles = u, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + r.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {
    }

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function () {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function () {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }

        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {load: j, i: 0}, a
    }

    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [],
        q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) {
            return "[object Array]" == o.call(a)
        }, x = [], y = {}, z = {
            timeout: function (a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        }, A, B;
    B = function (a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c, origUrl: c, prefixes: a}, e, f,
                g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () {
                        var b = 0, c;
                        for (c in a) a.hasOwnProperty(c) && b++;
                        return b
                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    } : j[n] = function (a) {
                        return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l()
                        }
                    }(k[n])), g(a[n], j, b, n, h))
                } else !c && l()
            }

            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }

        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l)
    }, B.addPrefix = function (a, b) {
        z[a] = b
    }, B.addFilter = function (a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function () {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
;/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty,
        k = "".trim, l = {}, m = "1.11.0", n = function (a, b) {
            return new n.fn.init(a, b)
        }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function (a, b) {
            return b.toUpperCase()
        };
    n.fn = n.prototype = {
        jquery: m, constructor: n, selector: "", length: 0, toArray: function () {
            return d.call(this)
        }, get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        }, pushStack: function (a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        }, each: function (a, b) {
            return n.each(this, a, b)
        }, map: function (a) {
            return this.pushStack(n.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(d.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: f, sort: c.sort, splice: c.splice
    }, n.extend = n.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw new Error(a)
        }, noop: function () {
        }, isFunction: function (a) {
            return "function" === n.type(a)
        }, isArray: Array.isArray || function (a) {
            return "array" === n.type(a)
        }, isWindow: function (a) {
            return null != a && a == a.window
        }, isNumeric: function (a) {
            return a - parseFloat(a) >= 0
        }, isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        }, isPlainObject: function (a) {
            var b;
            if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (c) {
                return !1
            }
            if (l.ownLast) for (b in a) return j.call(a, b);
            for (b in a) ;
            return void 0 === b || j.call(a, b)
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        }, globalEval: function (b) {
            b && n.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        }, camelCase: function (a) {
            return a.replace(p, "ms-").replace(q, r)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function (a, b, c) {
            var d, e = 0, f = a.length, g = s(a);
            if (c) {
                if (g) {
                    for (; f > e; e++) if (d = b.apply(a[e], c), d === !1) break
                } else for (e in a) if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break
            } else for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a
        }, trim: k && !k.call("\ufeff\xa0") ? function (a) {
            return null == a ? "" : k.call(a)
        } : function (a) {
            return null == a ? "" : (a + "").replace(o, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        }, inArray: function (a, b, c) {
            var d;
            if (b) {
                if (g) return g.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c
            }
            return -1
        }, merge: function (a, b) {
            var c = +b.length, d = 0, e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a
        }, grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        }, map: function (a, b, c) {
            var d, f = 0, g = a.length, h = s(a), i = [];
            if (h) for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d); else for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        }, guid: 1, proxy: function (a, b) {
            var c, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = d.call(arguments, 2), e = function () {
                return a.apply(b || this, c.concat(d.call(arguments)))
            }, e.guid = a.guid = a.guid || n.guid++, e) : void 0
        }, now: function () {
            return +new Date
        }, support: l
    }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function s(a) {
        var b = a.length, c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    var t = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = "sizzle" + -new Date, t = a.document, u = 0, v = 0,
            w = eb(), x = eb(), y = eb(), z = function (a, b) {
                return a === b && (j = !0), 0
            }, A = "undefined", B = 1 << 31, C = {}.hasOwnProperty, D = [], E = D.pop, F = D.push, G = D.push, H = D.slice,
            I = D.indexOf || function (a) {
                for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
                return -1
            },
            J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            K = "[\\x20\\t\\r\\n\\f]", L = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", M = L.replace("w", "w#"),
            N = "\\[" + K + "*(" + L + ")" + K + "*(?:([*^$|!~]?=)" + K + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + M + ")|)|)" + K + "*\\]",
            O = ":(" + L + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + N.replace(3, 8) + ")*)|.*)\\)|)",
            P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
            Q = new RegExp("^" + K + "*," + K + "*"), R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
            S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"), T = new RegExp(O),
            U = new RegExp("^" + M + "$"), V = {
                ID: new RegExp("^#(" + L + ")"),
                CLASS: new RegExp("^\\.(" + L + ")"),
                TAG: new RegExp("^(" + L.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + N),
                PSEUDO: new RegExp("^" + O),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + J + ")$", "i"),
                needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
            }, W = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/, _ = /'|\\/g,
            ab = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"), bb = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
        try {
            G.apply(D = H.call(t.childNodes), t.childNodes), D[t.childNodes.length].nodeType
        } catch (cb) {
            G = {
                apply: D.length ? function (a, b) {
                    F.apply(a, H.call(b))
                } : function (a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]) ;
                    a.length = c - 1
                }
            }
        }

        function db(a, b, d, e) {
            var f, g, h, i, j, m, p, q, u, v;
            if ((b ? b.ownerDocument || b : t) !== l && k(b), b = b || l, d = d || [], !a || "string" != typeof a) return d;
            if (1 !== (i = b.nodeType) && 9 !== i) return [];
            if (n && !e) {
                if (f = Z.exec(a)) if (h = f[1]) {
                    if (9 === i) {
                        if (g = b.getElementById(h), !g || !g.parentNode) return d;
                        if (g.id === h) return d.push(g), d
                    } else if (b.ownerDocument && (g = b.ownerDocument.getElementById(h)) && r(b, g) && g.id === h) return d.push(g), d
                } else {
                    if (f[2]) return G.apply(d, b.getElementsByTagName(a)), d;
                    if ((h = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(h)), d
                }
                if (c.qsa && (!o || !o.test(a))) {
                    if (q = p = s, u = b, v = 9 === i && a, 1 === i && "object" !== b.nodeName.toLowerCase()) {
                        m = ob(a), (p = b.getAttribute("id")) ? q = p.replace(_, "\\$&") : b.setAttribute("id", q), q = "[id='" + q + "'] ", j = m.length;
                        while (j--) m[j] = q + pb(m[j]);
                        u = $.test(a) && mb(b.parentNode) || b, v = m.join(",")
                    }
                    if (v) try {
                        return G.apply(d, u.querySelectorAll(v)), d
                    } catch (w) {
                    } finally {
                        p || b.removeAttribute("id")
                    }
                }
            }
            return xb(a.replace(P, "$1"), b, d, e)
        }

        function eb() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }

            return b
        }

        function fb(a) {
            return a[s] = !0, a
        }

        function gb(a) {
            var b = l.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function hb(a, b) {
            var c = a.split("|"), e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function ib(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || B) - (~a.sourceIndex || B);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1
        }

        function jb(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function kb(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function lb(a) {
            return fb(function (b) {
                return b = +b, fb(function (c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function mb(a) {
            return a && typeof a.getElementsByTagName !== A && a
        }

        c = db.support = {}, f = db.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, k = db.setDocument = function (a) {
            var b, e = a ? a.ownerDocument || a : t, g = e.defaultView;
            return e !== l && 9 === e.nodeType && e.documentElement ? (l = e, m = e.documentElement, n = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function () {
                k()
            }, !1) : g.attachEvent && g.attachEvent("onunload", function () {
                k()
            })), c.attributes = gb(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = gb(function (a) {
                return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = Y.test(e.getElementsByClassName) && gb(function (a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), c.getById = gb(function (a) {
                return m.appendChild(a).id = s, !e.getElementsByName || !e.getElementsByName(s).length
            }), c.getById ? (d.find.ID = function (a, b) {
                if (typeof b.getElementById !== A && n) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function (a) {
                var b = a.replace(ab, bb);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function (a) {
                var b = a.replace(ab, bb);
                return function (a) {
                    var c = typeof a.getAttributeNode !== A && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return typeof b.getElementsByTagName !== A ? b.getElementsByTagName(a) : void 0
            } : function (a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                return typeof b.getElementsByClassName !== A && n ? b.getElementsByClassName(a) : void 0
            }, p = [], o = [], (c.qsa = Y.test(e.querySelectorAll)) && (gb(function (a) {
                a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && o.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || o.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll(":checked").length || o.push(":checked")
            }), gb(function (a) {
                var b = e.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && o.push("name" + K + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), o.push(",.*:")
            })), (c.matchesSelector = Y.test(q = m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && gb(function (a) {
                c.disconnectedMatch = q.call(a, "div"), q.call(a, "[s!='']:x"), p.push("!=", O)
            }), o = o.length && new RegExp(o.join("|")), p = p.length && new RegExp(p.join("|")), b = Y.test(m.compareDocumentPosition), r = b || Y.test(m.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1
            }, z = b ? function (a, b) {
                if (a === b) return j = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === t && r(t, a) ? -1 : b === e || b.ownerDocument === t && r(t, b) ? 1 : i ? I.call(i, a) - I.call(i, b) : 0 : 4 & d ? -1 : 1)
            } : function (a, b) {
                if (a === b) return j = !0, 0;
                var c, d = 0, f = a.parentNode, g = b.parentNode, h = [a], k = [b];
                if (!f || !g) return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : i ? I.call(i, a) - I.call(i, b) : 0;
                if (f === g) return ib(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) k.unshift(c);
                while (h[d] === k[d]) d++;
                return d ? ib(h[d], k[d]) : h[d] === t ? -1 : k[d] === t ? 1 : 0
            }, e) : l
        }, db.matches = function (a, b) {
            return db(a, null, null, b)
        }, db.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== l && k(a), b = b.replace(S, "='$1']"), !(!c.matchesSelector || !n || p && p.test(b) || o && o.test(b))) try {
                var d = q.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {
            }
            return db(b, l, null, [a]).length > 0
        }, db.contains = function (a, b) {
            return (a.ownerDocument || a) !== l && k(a), r(a, b)
        }, db.attr = function (a, b) {
            (a.ownerDocument || a) !== l && k(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !n) : void 0;
            return void 0 !== f ? f : c.attributes || !n ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, db.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, db.uniqueSort = function (a) {
            var b, d = [], e = 0, f = 0;
            if (j = !c.detectDuplicates, i = !c.sortStable && a.slice(0), a.sort(z), j) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return i = null, a
        }, e = db.getText = function (a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else while (b = a[d++]) c += e(b);
            return c
        }, d = db.selectors = {
            cacheLength: 50,
            createPseudo: fb,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(ab, bb), a[3] = (a[4] || a[5] || "").replace(ab, bb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || db.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && db.error(a[0]), a
                }, PSEUDO: function (a) {
                    var b, c = !a[5] && a[2];
                    return V.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && T.test(c) && (b = ob(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(ab, bb).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                }, CLASS: function (a) {
                    var b = w[a + " "];
                    return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && w(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== A && a.getAttribute("class") || "")
                    })
                }, ATTR: function (a, b, c) {
                    return function (d) {
                        var e = db.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                }, CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(), t = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && t) {
                                k = q[s] || (q[s] = {}), j = k[a] || [], n = j[0] === u && j[1], m = j[0] === u && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [u, n, m];
                                    break
                                }
                            } else if (t && (j = (b[s] || (b[s] = {}))[a]) && j[0] === u) m = j[1]; else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (t && ((l[s] || (l[s] = {}))[a] = [u, m]), l === b)) break;
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                }, PSEUDO: function (a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || db.error("unsupported pseudo: " + a);
                    return e[s] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? fb(function (a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--) d = I.call(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function (a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: fb(function (a) {
                    var b = [], c = [], d = g(a.replace(P, "$1"));
                    return d[s] ? fb(function (a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }), has: fb(function (a) {
                    return function (b) {
                        return db(a, b).length > 0
                    }
                }), contains: fb(function (a) {
                    return function (b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }), lang: fb(function (a) {
                    return U.test(a || "") || db.error("unsupported lang: " + a), a = a.replace(ab, bb).toLowerCase(), function (b) {
                        var c;
                        do if (c = n ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }), target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                }, root: function (a) {
                    return a === m
                }, focus: function (a) {
                    return a === l.activeElement && (!l.hasFocus || l.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                }, enabled: function (a) {
                    return a.disabled === !1
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0
                }, parent: function (a) {
                    return !d.pseudos.empty(a)
                }, header: function (a) {
                    return X.test(a.nodeName)
                }, input: function (a) {
                    return W.test(a.nodeName)
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                }, text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                }, first: lb(function () {
                    return [0]
                }), last: lb(function (a, b) {
                    return [b - 1]
                }), eq: lb(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }), even: lb(function (a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }), odd: lb(function (a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }), lt: lb(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }), gt: lb(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) d.pseudos[b] = jb(b);
        for (b in {submit: !0, reset: !0}) d.pseudos[b] = kb(b);

        function nb() {
        }

        nb.prototype = d.filters = d.pseudos, d.setFilters = new nb;

        function ob(a, b) {
            var c, e, f, g, h, i, j, k = x[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = Q.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(P, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? db.error(a) : x(a, i).slice(0)
        }

        function pb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function qb(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = v++;
            return b.first ? function (b, c, f) {
                while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f)
            } : function (b, c, g) {
                var h, i, j = [u, f];
                if (g) {
                    while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else while (b = b[d]) if (1 === b.nodeType || e) {
                    if (i = b[s] || (b[s] = {}), (h = i[d]) && h[0] === u && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return !0
                }
            }
        }

        function rb(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function sb(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function tb(a, b, c, d, e, f) {
            return d && !d[s] && (d = tb(d)), e && !e[s] && (e = tb(e, f)), fb(function (f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || wb(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : sb(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = sb(r, n), d(j, [], h, i), k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? I.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = sb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r)
            })
        }

        function ub(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], i = g || d.relative[" "], j = g ? 1 : 0, k = qb(function (a) {
                return a === b
            }, i, !0), l = qb(function (a) {
                return I.call(b, a) > -1
            }, i, !0), m = [function (a, c, d) {
                return !g && (d || c !== h) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
            }]; f > j; j++) if (c = d.relative[a[j].type]) m = [qb(rb(m), c)]; else {
                if (c = d.filter[a[j].type].apply(null, a[j].matches), c[s]) {
                    for (e = ++j; f > e; e++) if (d.relative[a[e].type]) break;
                    return tb(j > 1 && rb(m), j > 1 && pb(a.slice(0, j - 1).concat({value: " " === a[j - 2].type ? "*" : ""})).replace(P, "$1"), c, e > j && ub(a.slice(j, e)), f > e && ub(a = a.slice(e)), f > e && pb(a))
                }
                m.push(c)
            }
            return rb(m)
        }

        function vb(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function (f, g, i, j, k) {
                var m, n, o, p = 0, q = "0", r = f && [], s = [], t = h, v = f || e && d.find.TAG("*", k),
                    w = u += null == t ? 1 : Math.random() || .1, x = v.length;
                for (k && (h = g !== l && g); q !== x && null != (m = v[q]); q++) {
                    if (e && m) {
                        n = 0;
                        while (o = a[n++]) if (o(m, g, i)) {
                            j.push(m);
                            break
                        }
                        k && (u = w)
                    }
                    c && ((m = !o && m) && p--, f && r.push(m))
                }
                if (p += q, c && q !== p) {
                    n = 0;
                    while (o = b[n++]) o(r, s, g, i);
                    if (f) {
                        if (p > 0) while (q--) r[q] || s[q] || (s[q] = E.call(j));
                        s = sb(s)
                    }
                    G.apply(j, s), k && !f && s.length > 0 && p + b.length > 1 && db.uniqueSort(j)
                }
                return k && (u = w, h = t), r
            };
            return c ? fb(f) : f
        }

        g = db.compile = function (a, b) {
            var c, d = [], e = [], f = y[a + " "];
            if (!f) {
                b || (b = ob(a)), c = b.length;
                while (c--) f = ub(b[c]), f[s] ? d.push(f) : e.push(f);
                f = y(a, vb(e, d))
            }
            return f
        };

        function wb(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) db(a, b[d], c);
            return c
        }

        function xb(a, b, e, f) {
            var h, i, j, k, l, m = ob(a);
            if (!f && 1 === m.length) {
                if (i = m[0] = m[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && c.getById && 9 === b.nodeType && n && d.relative[i[1].type]) {
                    if (b = (d.find.ID(j.matches[0].replace(ab, bb), b) || [])[0], !b) return e;
                    a = a.slice(i.shift().value.length)
                }
                h = V.needsContext.test(a) ? 0 : i.length;
                while (h--) {
                    if (j = i[h], d.relative[k = j.type]) break;
                    if ((l = d.find[k]) && (f = l(j.matches[0].replace(ab, bb), $.test(i[0].type) && mb(b.parentNode) || b))) {
                        if (i.splice(h, 1), a = f.length && pb(i), !a) return G.apply(e, f), e;
                        break
                    }
                }
            }
            return g(a, m)(f, b, !n, e, $.test(a) && mb(b.parentNode) || b), e
        }

        return c.sortStable = s.split("").sort(z).join("") === s, c.detectDuplicates = !!j, k(), c.sortDetached = gb(function (a) {
            return 1 & a.compareDocumentPosition(l.createElement("div"))
        }), gb(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || hb("type|href|height|width", function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && gb(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || hb("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), gb(function (a) {
            return null == a.getAttribute("disabled")
        }) || hb(J, function (a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), db
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = n.expr.match.needsContext, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^.[^:#\[\.,]*$/;

    function x(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return n.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (w.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a)
        }
        return n.grep(a, function (a) {
            return n.inArray(a, b) >= 0 !== c
        })
    }

    n.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, n.fn.extend({
        find: function (a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
                for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) n.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        }, filter: function (a) {
            return this.pushStack(x(this, a || [], !1))
        }, not: function (a) {
            return this.pushStack(x(this, a || [], !0))
        }, is: function (a) {
            return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length
        }
    });
    var y, z = a.document, A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, B = n.fn.init = function (a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : A.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : z, !0)), v.test(c[1]) && n.isPlainObject(b)) for (c in b) n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            if (d = z.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2]) return y.find(a);
                this.length = 1, this[0] = d
            }
            return this.context = z, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
    };
    B.prototype = n.fn, y = n(z);
    var C = /^(?:parents|prev(?:Until|All))/, D = {children: !0, contents: !0, next: !0, prev: !0};
    n.extend({
        dir: function (a, b, c) {
            var d = [], e = a[b];
            while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !n(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
            return d
        }, sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), n.fn.extend({
        has: function (a) {
            var b, c = n(a, this), d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0
            })
        }, closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? n.unique(f) : f)
        }, index: function (a) {
            return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(n.unique(n.merge(this.get(), n(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function E(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    n.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return n.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return n.dir(a, "parentNode", c)
        }, next: function (a) {
            return E(a, "nextSibling")
        }, prev: function (a) {
            return E(a, "previousSibling")
        }, nextAll: function (a) {
            return n.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return n.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return n.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return n.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return n.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return n.sibling(a.firstChild)
        }, contents: function (a) {
            return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes)
        }
    }, function (a, b) {
        n.fn[a] = function (c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (D[a] || (e = n.unique(e)), C.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var F = /\S+/g, G = {};

    function H(a) {
        var b = G[a] = {};
        return n.each(a.match(F) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    n.Callbacks = function (a) {
        a = "string" == typeof a ? G[a] || H(a) : n.extend({}, a);
        var b, c, d, e, f, g, h = [], i = !a.once && [], j = function (l) {
            for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                c = !1;
                break
            }
            b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
        }, k = {
            add: function () {
                if (h) {
                    var d = h.length;
                    !function f(b) {
                        n.each(b, function (b, c) {
                            var d = n.type(c);
                            "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                        })
                    }(arguments), b ? e = h.length : c && (g = d, j(c))
                }
                return this
            }, remove: function () {
                return h && n.each(arguments, function (a, c) {
                    var d;
                    while ((d = n.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                }), this
            }, has: function (a) {
                return a ? n.inArray(a, h) > -1 : !(!h || !h.length)
            }, empty: function () {
                return h = [], e = 0, this
            }, disable: function () {
                return h = i = c = void 0, this
            }, disabled: function () {
                return !h
            }, lock: function () {
                return i = void 0, c || k.disable(), this
            }, locked: function () {
                return !i
            }, fireWith: function (a, c) {
                return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
            }, fire: function () {
                return k.fireWith(this, arguments), this
            }, fired: function () {
                return !!d
            }
        };
        return k
    }, n.extend({
        Deferred: function (a) {
            var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
                c = "pending", d = {
                    state: function () {
                        return c
                    }, always: function () {
                        return e.done(arguments).fail(arguments), this
                    }, then: function () {
                        var a = arguments;
                        return n.Deferred(function (c) {
                            n.each(b, function (b, f) {
                                var g = n.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = g && g.apply(this, arguments);
                                    a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    }, promise: function (a) {
                        return null != a ? n.extend(a, d) : d
                    }
                }, e = {};
            return d.pipe = d.then, n.each(b, function (a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        }, when: function (a) {
            var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : n.Deferred(), h = function (a, b, c) {
                    return function (e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                }, i, j, k;
            if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var I;
    n.fn.ready = function (a) {
        return n.ready.promise().done(a), this
    }, n.extend({
        isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? n.readyWait++ : n.ready(!0)
        }, ready: function (a) {
            if (a === !0 ? !--n.readyWait : !n.isReady) {
                if (!z.body) return setTimeout(n.ready);
                n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(z, [n]), n.fn.trigger && n(z).trigger("ready").off("ready"))
            }
        }
    });

    function J() {
        z.addEventListener ? (z.removeEventListener("DOMContentLoaded", K, !1), a.removeEventListener("load", K, !1)) : (z.detachEvent("onreadystatechange", K), a.detachEvent("onload", K))
    }

    function K() {
        (z.addEventListener || "load" === event.type || "complete" === z.readyState) && (J(), n.ready())
    }

    n.ready.promise = function (b) {
        if (!I) if (I = n.Deferred(), "complete" === z.readyState) setTimeout(n.ready); else if (z.addEventListener) z.addEventListener("DOMContentLoaded", K, !1), a.addEventListener("load", K, !1); else {
            z.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
            var c = !1;
            try {
                c = null == a.frameElement && z.documentElement
            } catch (d) {
            }
            c && c.doScroll && !function e() {
                if (!n.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    J(), n.ready()
                }
            }()
        }
        return I.promise(b)
    };
    var L = "undefined", M;
    for (M in n(l)) break;
    l.ownLast = "0" !== M, l.inlineBlockNeedsLayout = !1, n(function () {
        var a, b, c = z.getElementsByTagName("body")[0];
        c && (a = z.createElement("div"), a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", b = z.createElement("div"), c.appendChild(a).appendChild(b), typeof b.style.zoom !== L && (b.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (l.inlineBlockNeedsLayout = 3 === b.offsetWidth) && (c.style.zoom = 1)), c.removeChild(a), a = b = null)
    }), function () {
        var a = z.createElement("div");
        if (null == l.deleteExpando) {
            l.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                l.deleteExpando = !1
            }
        }
        a = null
    }(), n.acceptData = function (a) {
        var b = n.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
    var N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;

    function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(O, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                } catch (e) {
                }
                n.data(a, b, c)
            } else c = void 0
        }
        return c
    }

    function Q(a) {
        var b;
        for (b in a) if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function R(a, b, d, e) {
        if (n.acceptData(a)) {
            var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || n.guid++ : h), j[k] || (j[k] = i ? {} : {toJSON: n.noop}), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, f
        }
    }

    function S(a, b, c) {
        if (n.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !Q(d) : !n.isEmptyObject(d)) return
                }
                (c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }

    n.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a)
        },
        data: function (a, b, c) {
            return R(a, b, c)
        },
        removeData: function (a, b) {
            return S(a, b)
        },
        _data: function (a, b, c) {
            return R(a, b, c, !0)
        },
        _removeData: function (a, b) {
            return S(a, b, !0)
        }
    }), n.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--) d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d]));
                    n._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function () {
                n.data(this, a)
            }) : arguments.length > 1 ? this.each(function () {
                n.data(this, a, b)
            }) : f ? P(f, a, n.data(f, a)) : void 0
        }, removeData: function (a) {
            return this.each(function () {
                n.removeData(this, a)
            })
        }
    }), n.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function () {
                n.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return n._data(a, c) || n._data(a, c, {
                empty: n.Callbacks("once memory").add(function () {
                    n._removeData(a, b + "queue"), n._removeData(a, c)
                })
            })
        }
    }), n.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                n.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function () {
                --d || e.resolveWith(f, [f])
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = n._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, U = ["Top", "Right", "Bottom", "Left"], V = function (a, b) {
        return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
    }, W = n.access = function (a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) n.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
            return j.call(n(a), c)
        })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, X = /^(?:checkbox|radio)$/i;
    !function () {
        var a = z.createDocumentFragment(), b = z.createElement("div"), c = z.createElement("input");
        if (b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a>", l.leadingWhitespace = 3 === b.firstChild.nodeType, l.tbody = !b.getElementsByTagName("tbody").length, l.htmlSerialize = !!b.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== z.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, a.appendChild(c), l.appendChecked = c.checked, b.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, a.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
            l.noCloneEvent = !1
        }), b.cloneNode(!0).click()), null == l.deleteExpando) {
            l.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                l.deleteExpando = !1
            }
        }
        a = b = c = null
    }(), function () {
        var b, c, d = z.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = "on" + b, (l[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), l[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }();
    var Y = /^(?:input|select|textarea)$/i, Z = /^key/, $ = /^(?:mouse|contextmenu)|click/,
        _ = /^(?:focusinfocus|focusoutblur)$/, ab = /^([^.]*)(?:\.(.+)|)$/;

    function bb() {
        return !0
    }

    function cb() {
        return !1
    }

    function db() {
        try {
            return z.activeElement
        } catch (a) {
        }
    }

    n.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                    return typeof n === L || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments)
                }, k.elem = a), b = (b || "").match(F) || [""], h = b.length;
                while (h--) f = ab.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = n.event.special[o] || {}, l = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), n.event.global[o] = !0);
                a = null
            }
        },
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(F) || [""], j = b.length;
                while (j--) if (h = ab.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                    l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;
                    while (f--) g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete k[o])
                } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"))
            }
        },
        trigger: function (b, c, d, e) {
            var f, g, h, i, k, l, m, o = [d || z], p = j.call(b, "type") ? b.type : b,
                q = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = l = d = d || z, 3 !== d.nodeType && 8 !== d.nodeType && !_.test(p + n.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[n.expando] ? b : new n.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), k = n.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !n.isWindow(d)) {
                    for (i = k.delegateType || p, _.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
                    l === (d.ownerDocument || z) && o.push(l.defaultView || l.parentWindow || a)
                }
                m = 0;
                while ((h = o[m++]) && !b.isPropagationStopped()) b.type = m > 1 ? i : k.bindType || p, f = (n._data(h, "events") || {})[b.type] && n._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && n.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && n.acceptData(d) && g && d[p] && !n.isWindow(d)) {
                    l = d[g], l && (d[g] = null), n.event.triggered = p;
                    try {
                        d[p]()
                    } catch (r) {
                    }
                    n.event.triggered = void 0, l && (d[g] = l)
                }
                return b.result
            }
        },
        dispatch: function (a) {
            a = n.event.fix(a);
            var b, c, e, f, g, h = [], i = d.call(arguments), j = (n._data(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, g = 0;
                    while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped()) (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((n.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? n(c, this).index(i) >= 0 : n.find(c, this, null, [i]).length), e[c] && e.push(d);
                e.length && g.push({elem: i, handlers: e})
            }
            return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
        },
        fix: function (a) {
            if (a[n.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = $.test(e) ? this.mouseHooks : Z.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || z), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c, d, e, f = b.button, g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || z, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== db() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === db() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (a) {
                    return n.nodeName(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = n.extend(new n.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, n.removeEvent = z.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === L && (a[d] = null), a.detachEvent(d, c))
    }, n.Event = function (a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && (a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()) ? bb : cb) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b)
    }, n.Event.prototype = {
        isDefaultPrevented: cb,
        isPropagationStopped: cb,
        isImmediatePropagationStopped: cb,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = bb, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = bb, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = bb, this.stopPropagation()
        }
    }, n.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        n.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), l.submitBubbles || (n.event.special.submit = {
        setup: function () {
            return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function (a) {
                var b = a.target, c = n.nodeName(b, "input") || n.nodeName(b, "button") ? b.form : void 0;
                c && !n._data(c, "submitBubbles") && (n.event.add(c, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), n._data(c, "submitBubbles", !0))
            })
        }, postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a, !0))
        }, teardown: function () {
            return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit")
        }
    }), l.changeBubbles || (n.event.special.change = {
        setup: function () {
            return Y.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (n.event.add(this, "propertychange._change", function (a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), n.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), n.event.simulate("change", this, a, !0)
            })), !1) : void n.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                Y.test(b.nodeName) && !n._data(b, "changeBubbles") && (n.event.add(b, "change._change", function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a, !0)
                }), n._data(b, "changeBubbles", !0))
            })
        }, handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return n.event.remove(this, "._change"), !Y.test(this.nodeName)
        }
    }), l.focusinBubbles || n.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0)
        };
        n.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, e = n._data(d, b);
                e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1)
            }, teardown: function () {
                var d = this.ownerDocument || this, e = n._data(d, b) - 1;
                e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b))
            }
        }
    }), n.fn.extend({
        on: function (a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = cb; else if (!d) return this;
            return 1 === e && (g = d, d = function (a) {
                return n().off(a), g.apply(this, arguments)
            }, d.guid = g.guid || (g.guid = n.guid++)), this.each(function () {
                n.event.add(this, a, d, c, b)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = cb), this.each(function () {
                n.event.remove(this, a, c, b)
            })
        }, trigger: function (a, b) {
            return this.each(function () {
                n.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }
    });

    function eb(a) {
        var b = fb.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }

    var fb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        gb = / jQuery\d+="(?:null|\d+)"/g, hb = new RegExp("<(?:" + fb + ")[\\s/>]", "i"), ib = /^\s+/,
        jb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, kb = /<([\w:]+)/,
        lb = /<tbody/i, mb = /<|&#?\w+;/, nb = /<(?:script|style|link)/i, ob = /checked\s*(?:[^=]|=\s*.checked.)/i,
        pb = /^$|\/(?:java|ecma)script/i, qb = /^true\/(.*)/, rb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, sb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, tb = eb(z), ub = tb.appendChild(z.createElement("div"));
    sb.optgroup = sb.option, sb.tbody = sb.tfoot = sb.colgroup = sb.caption = sb.thead, sb.th = sb.td;

    function vb(a, b) {
        var c, d, e = 0,
            f = typeof a.getElementsByTagName !== L ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== L ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, vb(d, b));
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f
    }

    function wb(a) {
        X.test(a.type) && (a.defaultChecked = a.checked)
    }

    function xb(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function yb(a) {
        return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type, a
    }

    function zb(a) {
        var b = qb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function Ab(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) n._data(c, "globalEval", !b || n._data(b[d], "globalEval"))
    }

    function Bb(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d])
            }
            g.data && (g.data = n.extend({}, g.data))
        }
    }

    function Cb(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
                e = n._data(b);
                for (d in e.events) n.removeEvent(b, d, e.handle);
                b.removeAttribute(n.expando)
            }
            "script" === c && b.text !== a.text ? (yb(b).text = a.text, zb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && X.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }

    n.extend({
        clone: function (a, b, c) {
            var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
            if (l.html5Clone || n.isXMLDoc(a) || !hb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ub.innerHTML = a.outerHTML, ub.removeChild(f = ub.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (d = vb(f), h = vb(a), g = 0; null != (e = h[g]); ++g) d[g] && Cb(e, d[g]);
            if (b) if (c) for (h = h || vb(a), d = d || vb(f), g = 0; null != (e = h[g]); g++) Bb(e, d[g]); else Bb(a, f);
            return d = vb(f, "script"), d.length > 0 && Ab(d, !i && vb(a, "script")), d = h = e = null, f
        }, buildFragment: function (a, b, c, d) {
            for (var e, f, g, h, i, j, k, m = a.length, o = eb(b), p = [], q = 0; m > q; q++) if (f = a[q], f || 0 === f) if ("object" === n.type(f)) n.merge(p, f.nodeType ? [f] : f); else if (mb.test(f)) {
                h = h || o.appendChild(b.createElement("div")), i = (kb.exec(f) || ["", ""])[1].toLowerCase(), k = sb[i] || sb._default, h.innerHTML = k[1] + f.replace(jb, "<$1></$2>") + k[2], e = k[0];
                while (e--) h = h.lastChild;
                if (!l.leadingWhitespace && ib.test(f) && p.push(b.createTextNode(ib.exec(f)[0])), !l.tbody) {
                    f = "table" !== i || lb.test(f) ? "<table>" !== k[1] || lb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                    while (e--) n.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                }
                n.merge(p, h.childNodes), h.textContent = "";
                while (h.firstChild) h.removeChild(h.firstChild);
                h = o.lastChild
            } else p.push(b.createTextNode(f));
            h && o.removeChild(h), l.appendChecked || n.grep(vb(p, "input"), wb), q = 0;
            while (f = p[q++]) if ((!d || -1 === n.inArray(f, d)) && (g = n.contains(f.ownerDocument, f), h = vb(o.appendChild(f), "script"), g && Ab(h), c)) {
                e = 0;
                while (f = h[e++]) pb.test(f.type || "") && c.push(f)
            }
            return h = null, o
        }, cleanData: function (a, b) {
            for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.deleteExpando, m = n.event.special; null != (d = a[h]); h++) if ((b || n.acceptData(d)) && (f = d[i], g = f && j[f])) {
                if (g.events) for (e in g.events) m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
                j[f] && (delete j[f], k ? delete d[i] : typeof d.removeAttribute !== L ? d.removeAttribute(i) : d[i] = null, c.push(f))
            }
        }
    }), n.fn.extend({
        text: function (a) {
            return W(this, function (a) {
                return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || z).createTextNode(a))
            }, null, a, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = xb(this, a);
                    b.appendChild(a)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = xb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, remove: function (a, b) {
            for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || n.cleanData(vb(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && Ab(vb(c, "script")), c.parentNode.removeChild(c));
            return this
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && n.cleanData(vb(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && n.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return n.clone(this, a, b)
            })
        }, html: function (a) {
            return W(this, function (a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(gb, "") : void 0;
                if (!("string" != typeof a || nb.test(a) || !l.htmlSerialize && hb.test(a) || !l.leadingWhitespace && ib.test(a) || sb[(kb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(jb, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(vb(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = arguments[0];
            return this.domManip(arguments, function (b) {
                a = this.parentNode, n.cleanData(vb(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0, k = this.length, m = this, o = k - 1, p = a[0], q = n.isFunction(p);
            if (q || k > 1 && "string" == typeof p && !l.checkClone && ob.test(p)) return this.each(function (c) {
                var d = m.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (k && (i = n.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                for (g = n.map(vb(i, "script"), yb), f = g.length; k > j; j++) d = i, j !== o && (d = n.clone(d, !0, !0), f && n.merge(g, vb(d, "script"))), b.call(this[j], d, j);
                if (f) for (h = g[g.length - 1].ownerDocument, n.map(g, zb), j = 0; f > j; j++) d = g[j], pb.test(d.type || "") && !n._data(d, "globalEval") && n.contains(h, d) && (d.src ? n._evalUrl && n._evalUrl(d.src) : n.globalEval((d.text || d.textContent || d.innerHTML || "").replace(rb, "")));
                i = c = null
            }
            return this
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        n.fn[a] = function (a) {
            for (var c, d = 0, e = [], g = n(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), n(g[d])[b](c), f.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var Db, Eb = {};

    function Fb(b, c) {
        var d = n(c.createElement(b)).appendTo(c.body),
            e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : n.css(d[0], "display");
        return d.detach(), e
    }

    function Gb(a) {
        var b = z, c = Eb[a];
        return c || (c = Fb(a, b), "none" !== c && c || (Db = (Db || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Db[0].contentWindow || Db[0].contentDocument).document, b.write(), b.close(), c = Fb(a, b), Db.detach()), Eb[a] = c), c
    }

    !function () {
        var a, b, c = z.createElement("div"),
            d = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], a.style.cssText = "float:left;opacity:.5", l.opacity = /^0.5/.test(a.style.opacity), l.cssFloat = !!a.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === c.style.backgroundClip, a = c = null, l.shrinkWrapBlocks = function () {
            var a, c, e, f;
            if (null == b) {
                if (a = z.getElementsByTagName("body")[0], !a) return;
                f = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", c = z.createElement("div"), e = z.createElement("div"), a.appendChild(c).appendChild(e), b = !1, typeof e.style.zoom !== L && (e.style.cssText = d + ";width:1px;padding:1px;zoom:1", e.innerHTML = "<div></div>", e.firstChild.style.width = "5px", b = 3 !== e.offsetWidth), a.removeChild(c), a = c = e = null
            }
            return b
        }
    }();
    var Hb = /^margin/, Ib = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"), Jb, Kb, Lb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Jb = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, Kb = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Jb(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), Ib.test(g) && Hb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : z.documentElement.currentStyle && (Jb = function (a) {
        return a.currentStyle
    }, Kb = function (a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Jb(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ib.test(g) && !Lb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    });

    function Mb(a, b) {
        return {
            get: function () {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    !function () {
        var b, c, d, e, f, g, h = z.createElement("div"),
            i = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
            j = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", b = h.getElementsByTagName("a")[0], b.style.cssText = "float:left;opacity:.5", l.opacity = /^0.5/.test(b.style.opacity), l.cssFloat = !!b.style.cssFloat, h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === h.style.backgroundClip, b = h = null, n.extend(l, {
            reliableHiddenOffsets: function () {
                if (null != c) return c;
                var a, b, d, e = z.createElement("div"), f = z.getElementsByTagName("body")[0];
                if (f) return e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = z.createElement("div"), a.style.cssText = i, f.appendChild(a).appendChild(e), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", b = e.getElementsByTagName("td"), b[0].style.cssText = "padding:0;margin:0;border:0;display:none", d = 0 === b[0].offsetHeight, b[0].style.display = "", b[1].style.display = "none", c = d && 0 === b[0].offsetHeight, f.removeChild(a), e = f = null, c
            }, boxSizing: function () {
                return null == d && k(), d
            }, boxSizingReliable: function () {
                return null == e && k(), e
            }, pixelPosition: function () {
                return null == f && k(), f
            }, reliableMarginRight: function () {
                var b, c, d, e;
                if (null == g && a.getComputedStyle) {
                    if (b = z.getElementsByTagName("body")[0], !b) return;
                    c = z.createElement("div"), d = z.createElement("div"), c.style.cssText = i, b.appendChild(c).appendChild(d), e = d.appendChild(z.createElement("div")), e.style.cssText = d.style.cssText = j, e.style.marginRight = e.style.width = "0", d.style.width = "1px", g = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), b.removeChild(c)
                }
                return g
            }
        });

        function k() {
            var b, c, h = z.getElementsByTagName("body")[0];
            h && (b = z.createElement("div"), c = z.createElement("div"), b.style.cssText = i, h.appendChild(b).appendChild(c), c.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", n.swap(h, null != h.style.zoom ? {zoom: 1} : {}, function () {
                d = 4 === c.offsetWidth
            }), e = !0, f = !1, g = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(c, null) || {}).top, e = "4px" === (a.getComputedStyle(c, null) || {width: "4px"}).width), h.removeChild(b), c = h = null)
        }
    }(), n.swap = function (a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Nb = /alpha\([^)]*\)/i, Ob = /opacity\s*=\s*([^)]*)/, Pb = /^(none|table(?!-c[ea]).+)/,
        Qb = new RegExp("^(" + T + ")(.*)$", "i"), Rb = new RegExp("^([+-])=(" + T + ")", "i"),
        Sb = {position: "absolute", visibility: "hidden", display: "block"}, Tb = {letterSpacing: 0, fontWeight: 400},
        Ub = ["Webkit", "O", "Moz", "ms"];

    function Vb(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Ub.length;
        while (e--) if (b = Ub[e] + c, b in a) return b;
        return d
    }

    function Wb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = n._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = n._data(d, "olddisplay", Gb(d.nodeName)))) : f[g] || (e = V(d), (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function Xb(a, b, c) {
        var d = Qb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Yb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + U[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
        return g
    }

    function Zb(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Jb(a),
            g = l.boxSizing() && "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Kb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ib.test(e)) return e;
            d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Yb(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    n.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Kb(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": l.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                if (b = n.cssProps[h] || (n.cssProps[h] = Vb(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = Rb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = "", i[b] = c
                } catch (j) {
                }
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Vb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Kb(a, b, d)), "normal" === f && b in Tb && (f = Tb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || n.isNumeric(e) ? e || 0 : f) : f
        }
    }), n.each(["height", "width"], function (a, b) {
        n.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? 0 === a.offsetWidth && Pb.test(n.css(a, "display")) ? n.swap(a, Sb, function () {
                    return Zb(a, b, d)
                }) : Zb(a, b, d) : void 0
            }, set: function (a, c, d) {
                var e = d && Jb(a);
                return Xb(a, c, d ? Yb(a, b, d, l.boxSizing() && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), l.opacity || (n.cssHooks.opacity = {
        get: function (a, b) {
            return Ob.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === n.trim(f.replace(Nb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Nb.test(f) ? f.replace(Nb, e) : f + " " + e)
        }
    }), n.cssHooks.marginRight = Mb(l.reliableMarginRight, function (a, b) {
        return b ? n.swap(a, {display: "inline-block"}, Kb, [a, "marginRight"]) : void 0
    }), n.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        n.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Hb.test(a) || (n.cssHooks[a + b].set = Xb)
    }), n.fn.extend({
        css: function (a, b) {
            return W(this, function (a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = Jb(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        }, show: function () {
            return Wb(this, !0)
        }, hide: function () {
            return Wb(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                V(this) ? n(this).show() : n(this).hide()
            })
        }
    });

    function $b(a, b, c, d, e) {
        return new $b.prototype.init(a, b, c, d, e)
    }

    n.Tween = $b, $b.prototype = {
        constructor: $b, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = $b.propHooks[this.prop];
            return a && a.get ? a.get(this) : $b.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = $b.propHooks[this.prop];
            return this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : $b.propHooks._default.set(this), this
        }
    }, $b.prototype.init.prototype = $b.prototype, $b.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            }, set: function (a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, $b.propHooks.scrollTop = $b.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, n.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, n.fx = $b.prototype.init, n.fx.step = {};
    var _b, ac, bc = /^(?:toggle|show|hide)$/, cc = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
        dc = /queueHooks$/, ec = [jc], fc = {
            "*": [function (a, b) {
                var c = this.createTween(a, b), d = c.cur(), e = cc.exec(b), f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
                    g = (n.cssNumber[a] || "px" !== f && +d) && cc.exec(n.css(c.elem, a)), h = 1, i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, n.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

    function gc() {
        return setTimeout(function () {
            _b = void 0
        }), _b = n.now()
    }

    function hc(a, b) {
        var c, d = {height: a}, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = U[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function ic(a, b, c) {
        for (var d, e = (fc[b] || []).concat(fc["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
    }

    function jc(a, b, c) {
        var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && V(a), r = n._data(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, m.always(function () {
            m.always(function () {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = n.css(a, "display"), k = Gb(a.nodeName), "none" === j && (j = k), "inline" === j && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== k ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", l.shrinkWrapBlocks() || m.always(function () {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
        }));
        for (d in b) if (e = b[d], bc.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d]) continue;
                q = !0
            }
            o[d] = r && r[d] || n.style(a, d)
        }
        if (!n.isEmptyObject(o)) {
            r ? "hidden" in r && (q = r.hidden) : r = n._data(a, "fxshow", {}), f && (r.hidden = !q), q ? n(a).show() : m.done(function () {
                n(a).hide()
            }), m.done(function () {
                var b;
                n._removeData(a, "fxshow");
                for (b in o) n.style(a, b, o[b])
            });
            for (d in o) g = ic(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function kc(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function lc(a, b, c) {
        var d, e, f = 0, g = ec.length, h = n.Deferred().always(function () {
            delete i.elem
        }), i = function () {
            if (e) return !1;
            for (var b = _b || gc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        }, j = h.promise({
            elem: a,
            props: n.extend({}, b),
            opts: n.extend(!0, {specialEasing: {}}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: _b || gc(),
            duration: c.duration,
            tweens: [],
            createTween: function (b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },
            stop: function (b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
            }
        }), k = j.props;
        for (kc(k, j.opts.specialEasing); g > f; f++) if (d = ec[f].call(j, a, k, j.opts)) return d;
        return n.map(k, ic, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    n.Animation = n.extend(lc, {
        tweener: function (a, b) {
            n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], fc[c] = fc[c] || [], fc[c].unshift(b)
        }, prefilter: function (a, b) {
            b ? ec.unshift(a) : ec.push(a)
        }
    }), n.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
        }, d
    }, n.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(V).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function () {
                var b = lc(this, n.extend({}, a), f);
                (e || n._data(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        }, stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0, e = null != a && a + "queueHooks", f = n.timers, g = n._data(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && dc.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                (b || !c) && n.dequeue(this, a)
            })
        }, finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b, c = n._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers,
                    g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), n.each(["toggle", "show", "hide"], function (a, b) {
        var c = n.fn[b];
        n.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(hc(b, !0), a, d, e)
        }
    }), n.each({
        slideDown: hc("show"),
        slideUp: hc("hide"),
        slideToggle: hc("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        n.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), n.timers = [], n.fx.tick = function () {
        var a, b = n.timers, c = 0;
        for (_b = n.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || n.fx.stop(), _b = void 0
    }, n.fx.timer = function (a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function () {
        ac || (ac = setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function () {
        clearInterval(ac), ac = null
    }, n.fx.speeds = {slow: 600, fast: 200, _default: 400}, n.fn.delay = function (a, b) {
        return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, function () {
        var a, b, c, d, e = z.createElement("div");
        e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = e.getElementsByTagName("a")[0], c = z.createElement("select"), d = c.appendChild(z.createElement("option")), b = e.getElementsByTagName("input")[0], a.style.cssText = "top:1px", l.getSetAttribute = "t" !== e.className, l.style = /top/.test(a.getAttribute("style")), l.hrefNormalized = "/a" === a.getAttribute("href"), l.checkOn = !!b.value, l.optSelected = d.selected, l.enctype = !!z.createElement("form").enctype, c.disabled = !0, l.optDisabled = !d.disabled, b = z.createElement("input"), b.setAttribute("value", ""), l.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), l.radioValue = "t" === b.value, a = b = c = d = e = null
    }();
    var mc = /\r/g;
    n.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
                        return null == a ? "" : a + ""
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(mc, "") : null == c ? "" : c)
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.text(a)
                }
            }, select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (l.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
                        if (b = n(c).val(), f) return b;
                        g.push(b)
                    }
                    return g
                }, set: function (a, b) {
                    var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                    while (g--) if (d = e[g], n.inArray(n.valHooks.option.get(d), f) >= 0) try {
                        d.selected = c = !0
                    } catch (h) {
                        d.scrollHeight
                    } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e
                }
            }
        }
    }), n.each(["radio", "checkbox"], function () {
        n.valHooks[this] = {
            set: function (a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0
            }
        }, l.checkOn || (n.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var nc, oc, pc = n.expr.attrHandle, qc = /^(?:checked|selected)$/i, rc = l.getSetAttribute, sc = l.input;
    n.fn.extend({
        attr: function (a, b) {
            return W(this, n.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                n.removeAttr(this, a)
            })
        }
    }), n.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === L ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? oc : nc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b))
        }, removeAttr: function (a, b) {
            var c, d, e = 0, f = b && b.match(F);
            if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) ? sc && rc || !qc.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""), a.removeAttribute(rc ? c : d)
        }, attrHooks: {
            type: {
                set: function (a, b) {
                    if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), oc = {
        set: function (a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : sc && rc || !qc.test(c) ? a.setAttribute(!rc && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = pc[b] || n.find.attr;
        pc[b] = sc && rc || !qc.test(b) ? function (a, b, d) {
            var e, f;
            return d || (f = pc[b], pc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, pc[b] = f), e
        } : function (a, b, c) {
            return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), sc && rc || (n.attrHooks.value = {
        set: function (a, b, c) {
            return n.nodeName(a, "input") ? void (a.defaultValue = b) : nc && nc.set(a, b, c)
        }
    }), rc || (nc = {
        set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    }, pc.id = pc.name = pc.coords = function (a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, n.valHooks.button = {
        get: function (a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        }, set: nc.set
    }, n.attrHooks.contenteditable = {
        set: function (a, b, c) {
            nc.set(a, "" === b ? !1 : b, c)
        }
    }, n.each(["width", "height"], function (a, b) {
        n.attrHooks[b] = {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), l.style || (n.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || void 0
        }, set: function (a, b) {
            return a.style.cssText = b + ""
        }
    });
    var tc = /^(?:input|select|textarea|button|object)$/i, uc = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function (a, b) {
            return W(this, n.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            return a = n.propFix[a] || a, this.each(function () {
                try {
                    this[a] = void 0, delete this[a]
                } catch (b) {
                }
            })
        }
    }), n.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = n.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : tc.test(a.nodeName) || uc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), l.hrefNormalized || n.each(["href", "src"], function (a, b) {
        n.propHooks[b] = {
            get: function (a) {
                return a.getAttribute(b, 4)
            }
        }
    }), l.optSelected || (n.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        n.propFix[this.toLowerCase()] = this
    }), l.enctype || (n.propFix.enctype = "encoding");
    var vc = /[\t\r\n\f]/g;
    n.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
            if (n.isFunction(a)) return this.each(function (b) {
                n(this).addClass(a.call(this, b, this.className))
            });
            if (j) for (b = (a || "").match(F) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(vc, " ") : " ")) {
                f = 0;
                while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = n.trim(d), c.className !== g && (c.className = g)
            }
            return this
        }, removeClass: function (a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
            if (n.isFunction(a)) return this.each(function (b) {
                n(this).removeClass(a.call(this, b, this.className))
            });
            if (j) for (b = (a || "").match(F) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(vc, " ") : "")) {
                f = 0;
                while (e = b[f++]) while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                g = a ? n.trim(d) : "", c.className !== g && (c.className = g)
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function (c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function () {
                if ("string" === c) {
                    var b, d = 0, e = n(this), f = a.match(F) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else (c === L || "boolean" === c) && (this.className && n._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : n._data(this, "__className__") || "")
            })
        }, hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(vc, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        n.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), n.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var wc = n.now(), xc = /\?/,
        yc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    n.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null, e = n.trim(b + "");
        return e && !n.trim(e.replace(yc, function (a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : n.error("Invalid JSON: " + b)
    }, n.parseXML = function (b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c
    };
    var zc, Ac, Bc = /#.*$/, Cc = /([?&])_=[^&]*/, Dc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ec = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Fc = /^(?:GET|HEAD)$/, Gc = /^\/\//,
        Hc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ic = {}, Jc = {}, Kc = "*/".concat("*");
    try {
        Ac = location.href
    } catch (Lc) {
        Ac = z.createElement("a"), Ac.href = "", Ac = Ac.href
    }
    zc = Hc.exec(Ac.toLowerCase()) || [];

    function Mc(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(F) || [];
            if (n.isFunction(c)) while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function Nc(a, b, c, d) {
        var e = {}, f = a === Jc;

        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }

        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function Oc(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && n.extend(!0, a, c), a
    }

    function Pc(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break
        }
        if (i[0] in c) f = i[0]; else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function Qc(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b)
            } catch (l) {
                return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
            }
        }
        return {state: "success", data: b}
    }

    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ac,
            type: "GET",
            isLocal: Ec.test(zc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Kc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (a, b) {
            return b ? Oc(Oc(a, n.ajaxSettings), b) : Oc(n.ajaxSettings, a)
        },
        ajaxPrefilter: Mc(Ic),
        ajaxTransport: Mc(Jc),
        ajax: function (a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b), l = k.context || k,
                m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event, o = n.Deferred(),
                p = n.Callbacks("once memory"), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                    readyState: 0, getResponseHeader: function (a) {
                        var b;
                        if (2 === t) {
                            if (!j) {
                                j = {};
                                while (b = Dc.exec(f)) j[b[1].toLowerCase()] = b[2]
                            }
                            b = j[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    }, getAllResponseHeaders: function () {
                        return 2 === t ? f : null
                    }, setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    }, overrideMimeType: function (a) {
                        return t || (k.mimeType = a), this
                    }, statusCode: function (a) {
                        var b;
                        if (a) if (2 > t) for (b in a) q[b] = [q[b], a[b]]; else v.always(a[v.status]);
                        return this
                    }, abort: function (a) {
                        var b = a || u;
                        return i && i.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || Ac) + "").replace(Bc, "").replace(Gc, zc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(F) || [""], null == k.crossDomain && (c = Hc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === zc[1] && c[2] === zc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (zc[3] || ("http:" === zc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), Nc(Ic, k, b, v), 2 === t) return v;
            h = k.global, h && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Fc.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (xc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Cc.test(e) ? e.replace(Cc, "$1_=" + wc++) : e + (xc.test(e) ? "&" : "?") + "_=" + wc++)), k.ifModified && (n.lastModified[e] && v.setRequestHeader("If-Modified-Since", n.lastModified[e]), n.etag[e] && v.setRequestHeader("If-None-Match", n.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Kc + "; q=0.01" : "") : k.accepts["*"]);
            for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (d in {success: 1, error: 1, complete: 1}) v[d](k[d]);
            if (i = Nc(Jc, k, b, v)) {
                v.readyState = 1, h && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, i.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, c, d) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Pc(k, v, c)), u = Qc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (n.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")))
            }

            return v
        },
        getJSON: function (a, b, c) {
            return n.get(a, b, c, "json")
        },
        getScript: function (a, b) {
            return n.get(a, void 0, b, "script")
        }
    }), n.each(["get", "post"], function (a, b) {
        n[b] = function (a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        n.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), n._evalUrl = function (a) {
        return n.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, n.fn.extend({
        wrapAll: function (a) {
            if (n.isFunction(a)) return this.each(function (b) {
                n(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return this.each(n.isFunction(a) ? function (b) {
                n(this).wrapInner(a.call(this, b))
            } : function () {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = n.isFunction(a);
            return this.each(function (c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    }), n.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !l.reliableHiddenOffsets() && "none" === (a.style && a.style.display || n.css(a, "display"))
    }, n.expr.filters.visible = function (a) {
        return !n.expr.filters.hidden(a)
    };
    var Rc = /%20/g, Sc = /\[\]$/, Tc = /\r?\n/g, Uc = /^(?:submit|button|image|reset|file)$/i,
        Vc = /^(?:input|select|textarea|keygen)/i;

    function Wc(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function (b, e) {
            c || Sc.test(a) ? d(a, e) : Wc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== n.type(b)) d(a, b); else for (e in b) Wc(a + "[" + e + "]", b[e], c, d)
    }

    n.param = function (a, b) {
        var c, d = [], e = function (a, b) {
            b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
            e(this.name, this.value)
        }); else for (c in a) Wc(c, a[c], b, e);
        return d.join("&").replace(Rc, "+")
    }, n.fn.extend({
        serialize: function () {
            return n.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && Vc.test(this.nodeName) && !Uc.test(a) && (this.checked || !X.test(a))
            }).map(function (a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
                    return {name: b.name, value: a.replace(Tc, "\r\n")}
                }) : {name: b.name, value: c.replace(Tc, "\r\n")}
            }).get()
        }
    }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && $c() || _c()
    } : $c;
    var Xc = 0, Yc = {}, Zc = n.ajaxSettings.xhr();
    a.ActiveXObject && n(a).on("unload", function () {
        for (var a in Yc) Yc[a](void 0, !0)
    }), l.cors = !!Zc && "withCredentials" in Zc, Zc = l.ajax = !!Zc, Zc && n.ajaxTransport(function (a) {
        if (!a.crossDomain || l.cors) {
            var b;
            return {
                send: function (c, d) {
                    var e, f = a.xhr(), g = ++Xc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function (c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState)) if (delete Yc[g], b = void 0, f.onreadystatechange = n.noop, e) 4 !== f.readyState && f.abort(); else {
                            j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                            try {
                                i = f.statusText
                            } catch (k) {
                                i = ""
                            }
                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                        }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Yc[g] = b : b()
                }, abort: function () {
                    b && b(void 0, !0)
                }
            }
        }
    });

    function $c() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function _c() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    n.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (a) {
                return n.globalEval(a), a
            }
        }
    }), n.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), n.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c = z.head || n("head")[0] || z.documentElement;
            return {
                send: function (d, e) {
                    b = z.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                }, abort: function () {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var ad = [], bd = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = ad.pop() || n.expando + "_" + wc++;
            return this[a] = !0, a
        }
    }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g,
            h = b.jsonp !== !1 && (bd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bd.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(bd, "$1" + e) : b.jsonp !== !1 && (b.url += (xc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || n.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ad.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), n.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || z;
        var d = v.exec(a), e = !c && [];
        return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes))
    };
    var cd = n.fn.load;
    n.fn.load = function (a, b, c) {
        if ("string" != typeof a && cd) return cd.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function (a) {
            e = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
        }).complete(c && function (a, b) {
            g.each(c, e || [a.responseText, b, a])
        }), this
    }, n.expr.filters.animated = function (a) {
        return n.grep(n.timers, function (b) {
            return a === b.elem
        }).length
    };
    var dd = a.document.documentElement;

    function ed(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    n.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, n.fn.extend({
        offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                n.offset.setOffset(this, a, b)
            });
            var b, c, d = {top: 0, left: 0}, e = this[0], f = e && e.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, e) ? (typeof e.getBoundingClientRect !== L && (d = e.getBoundingClientRect()), c = ed(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d
        }, position: function () {
            if (this[0]) {
                var a, b, c = {top: 0, left: 0}, d = this[0];
                return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (c = a.offset()), c.top += n.css(a[0], "borderTopWidth", !0), c.left += n.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - n.css(d, "marginTop", !0),
                    left: b.left - c.left - n.css(d, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || dd;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || dd
            })
        }
    }), n.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function (d) {
            return W(this, function (a, d, e) {
                var f = ed(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), n.each(["top", "left"], function (a, b) {
        n.cssHooks[b] = Mb(l.pixelPosition, function (a, c) {
            return c ? (c = Kb(a, b), Ib.test(c) ? n(a).position()[b] + "px" : c) : void 0
        })
    }), n.each({Height: "height", Width: "width"}, function (a, b) {
        n.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
            n.fn[d] = function (d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return W(this, function (b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), n.fn.size = function () {
        return this.length
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return n
    });
    var fd = a.jQuery, gd = a.$;
    return n.noConflict = function (b) {
        return a.$ === n && (a.$ = gd), b && a.jQuery === n && (a.jQuery = fd), n
    }, typeof b === L && (a.jQuery = a.$ = n), n
});
;/*! jQuery UI - v1.10.4 - 2014-01-30
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.position.js, jquery.ui.autocomplete.js, jquery.ui.menu.js, jquery.ui.tabs.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function ($, undefined) {
    var uuid = 0, runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    $.extend($.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    $.fn.extend({
        focus: (function (orig) {
            return function (delay, fn) {
                return typeof delay === "number" ? this.each(function () {
                    var elem = this;
                    setTimeout(function () {
                        $(elem).focus();
                        if (fn) {
                            fn.call(elem);
                        }
                    }, delay);
                }) : orig.apply(this, arguments);
            };
        })($.fn.focus), scrollParent: function () {
            var scrollParent;
            if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                scrollParent = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test($.css(this, "position")) && (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
                }).eq(0);
            } else {
                scrollParent = this.parents().filter(function () {
                    return (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
                }).eq(0);
            }
            return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;
        }, zIndex: function (zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }
            if (this.length) {
                var elem = $(this[0]), position, value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }
            return 0;
        }, uniqueId: function () {
            return this.each(function () {
                if (!this.id) {
                    this.id = "ui-id-" + (++uuid);
                }
            });
        }, removeUniqueId: function () {
            return this.each(function () {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });

    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : function (elem, i, match) {
            return !!$.data(elem, match[3]);
        }, focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        }, tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"), isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"], function (i, name) {
            var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], type = name.toLowerCase(), orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };

            function reduce(elem, size, border, margin) {
                $.each(side, function () {
                    size -= parseFloat($.css(elem, "padding" + this)) || 0;
                    if (border) {
                        size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
                    }
                    if (margin) {
                        size -= parseFloat($.css(elem, "margin" + this)) || 0;
                    }
                });
                return size;
            }

            $.fn["inner" + name] = function (size) {
                if (size === undefined) {
                    return orig["inner" + name].call(this);
                }
                return this.each(function () {
                    $(this).css(type, reduce(this, size) + "px");
                });
            };
            $.fn["outer" + name] = function (size, margin) {
                if (typeof size !== "number") {
                    return orig["outer" + name].call(this, size);
                }
                return this.each(function () {
                    $(this).css(type, reduce(this, size, true, margin) + "px");
                });
            };
        });
    }
    if (!$.fn.addBack) {
        $.fn.addBack = function (selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        };
    }
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function (removeData) {
            return function (key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key));
                } else {
                    return removeData.call(this);
                }
            };
        })($.fn.removeData);
    }
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    $.support.selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        disableSelection: function () {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (event) {
                event.preventDefault();
            });
        }, enableSelection: function () {
            return this.unbind(".ui-disableSelection");
        }
    });
    $.extend($.ui, {
        plugin: {
            add: function (module, option, set) {
                var i, proto = $.ui[module].prototype;
                for (i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            }, call: function (instance, name, args) {
                var i, set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
                    return;
                }
                for (i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        }, hasScroll: function (el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false;
            }
            var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop", has = false;
            if (el[scroll] > 0) {
                return true;
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has;
        }
    });
})(jQuery);
(function ($, undefined) {
    var uuid = 0, slice = Array.prototype.slice, _cleanData = $.cleanData;
    $.cleanData = function (elems) {
        for (var i = 0, elem; (elem = elems[i]) != null; i++) {
            try {
                $(elem).triggerHandler("remove");
            } catch (e) {
            }
        }
        _cleanData(elems);
    };
    $.widget = function (name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
            namespace = name.split(".")[0];
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }
        $.expr[":"][fullName.toLowerCase()] = function (elem) {
            return !!$.data(elem, fullName);
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function (options, element) {
            if (!this._createWidget) {
                return new constructor(options, element);
            }
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        });
        basePrototype = new base();
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function (prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = (function () {
                var _super = function () {
                    return base.prototype[prop].apply(this, arguments);
                }, _superApply = function (args) {
                    return base.prototype[prop].apply(this, args);
                };
                return function () {
                    var __super = this._super, __superApply = this._superApply, returnValue;
                    this._super = _super;
                    this._superApply = _superApply;
                    returnValue = value.apply(this, arguments);
                    this._super = __super;
                    this._superApply = __superApply;
                    return returnValue;
                };
            })();
        });
        constructor.prototype = $.widget.extend(basePrototype, {widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name}, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function (i, child) {
                var childPrototype = child.prototype;
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            delete existingConstructor._childConstructors;
        } else {
            base._childConstructors.push(constructor);
        }
        $.widget.bridge(name, constructor);
    };
    $.widget.extend = function (target) {
        var input = slice.call(arguments, 1), inputIndex = 0, inputLength = input.length, key, value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    };
    $.widget.bridge = function (name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function (options) {
            var isMethodCall = typeof options === "string", args = slice.call(arguments, 1), returnValue = this;
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            if (isMethodCall) {
                this.each(function () {
                    var methodValue, instance = $.data(this, fullName);
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance");
                    }
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function () {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {})._init();
                    } else {
                        $.data(this, fullName, new object(options, this));
                    }
                });
            }
            return returnValue;
        };
    };
    $.Widget = function () {
    };
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: false, create: null},
        _createWidget: function (options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument : element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function () {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: $.noop,
        widget: function () {
            return this.element;
        },
        option: function (key, value) {
            var options = key, parts, curOption, i;
            if (arguments.length === 0) {
                return $.widget.extend({}, this.options);
            }
            if (typeof key === "string") {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }
            this._setOptions(options);
            return this;
        },
        _setOptions: function (options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }
            return this;
        },
        _setOption: function (key, value) {
            this.options[key] = value;
            if (key === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus");
            }
            return this;
        },
        enable: function () {
            return this._setOption("disabled", false);
        },
        disable: function () {
            return this._setOption("disabled", true);
        },
        _on: function (suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false;
            }
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            }
            $.each(handlers, function (event, handler) {
                function handlerProxy() {
                    if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
                }

                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
                }
                var match = event.match(/^(\w+)\s*(.*)$/), eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy);
                } else {
                    element.bind(eventName, handlerProxy);
                }
            });
        },
        _off: function (element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);
        },
        _delay: function (handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
            }

            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },
        _hoverable: function (element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function (event) {
                    $(event.currentTarget).addClass("ui-state-hover");
                }, mouseleave: function (event) {
                    $(event.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function (element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function (event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                }, focusout: function (event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function (type, event, data) {
            var prop, orig, callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        }
    };
    $.each({show: "fadeIn", hide: "fadeOut"}, function (method, defaultEffect) {
        $.Widget.prototype["_" + method] = function (element, options, callback) {
            if (typeof options === "string") {
                options = {effect: options};
            }
            var hasOptions,
                effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
                options = {duration: options};
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options);
            } else if (effectName !== method && element[effectName]) {
                element[effectName](options.duration, options.easing, callback);
            } else {
                element.queue(function (next) {
                    $(this)[method]();
                    if (callback) {
                        callback.call(element[0]);
                    }
                    next();
                });
            }
        };
    });
})(jQuery);
(function ($, undefined) {
    $.ui = $.ui || {};
    var cachedScrollbarWidth, max = Math.max, abs = Math.abs, round = Math.round, rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/, roffset = /[\+\-]\d+(\.[\d]+)?%?/, rposition = /^\w+/, rpercent = /%$/,
        _position = $.fn.position;

    function getOffsets(offsets, width, height) {
        return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
    }

    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0;
    }

    function getDimensions(elem) {
        var raw = elem[0];
        if (raw.nodeType === 9) {
            return {width: elem.width(), height: elem.height(), offset: {top: 0, left: 0}};
        }
        if ($.isWindow(raw)) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {top: elem.scrollTop(), left: elem.scrollLeft()}
            };
        }
        if (raw.preventDefault) {
            return {width: 0, height: 0, offset: {top: raw.pageY, left: raw.pageX}};
        }
        return {width: elem.outerWidth(), height: elem.outerHeight(), offset: elem.offset()};
    }

    $.position = {
        scrollbarWidth: function () {
            if (cachedScrollbarWidth !== undefined) {
                return cachedScrollbarWidth;
            }
            var w1, w2,
                div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                innerDiv = div.children()[0];
            $("body").append(div);
            w1 = innerDiv.offsetWidth;
            div.css("overflow", "scroll");
            w2 = innerDiv.offsetWidth;
            if (w1 === w2) {
                w2 = div[0].clientWidth;
            }
            div.remove();
            return (cachedScrollbarWidth = w1 - w2);
        }, getScrollInfo: function (within) {
            var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"),
                overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"),
                hasOverflowX = overflowX === "scroll" || (overflowX === "auto" && within.width < within.element[0].scrollWidth),
                hasOverflowY = overflowY === "scroll" || (overflowY === "auto" && within.height < within.element[0].scrollHeight);
            return {
                width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                height: hasOverflowX ? $.position.scrollbarWidth() : 0
            };
        }, getWithinInfo: function (element) {
            var withinElement = $(element || window), isWindow = $.isWindow(withinElement[0]),
                isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
            return {
                element: withinElement,
                isWindow: isWindow,
                isDocument: isDocument,
                offset: withinElement.offset() || {left: 0, top: 0},
                scrollLeft: withinElement.scrollLeft(),
                scrollTop: withinElement.scrollTop(),
                width: isWindow ? withinElement.width() : withinElement.outerWidth(),
                height: isWindow ? withinElement.height() : withinElement.outerHeight()
            };
        }
    };
    $.fn.position = function (options) {
        if (!options || !options.of) {
            return _position.apply(this, arguments);
        }
        options = $.extend({}, options);
        var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of),
            within = $.position.getWithinInfo(options.within), scrollInfo = $.position.getScrollInfo(within),
            collision = (options.collision || "flip").split(" "), offsets = {};
        dimensions = getDimensions(target);
        if (target[0].preventDefault) {
            options.at = "left top";
        }
        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        targetOffset = dimensions.offset;
        basePosition = $.extend({}, targetOffset);
        $.each(["my", "at"], function () {
            var pos = (options[this] || "").split(" "), horizontalOffset, verticalOffset;
            if (pos.length === 1) {
                pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
            }
            pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
            horizontalOffset = roffset.exec(pos[0]);
            verticalOffset = roffset.exec(pos[1]);
            offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
            options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
        });
        if (collision.length === 1) {
            collision[1] = collision[0];
        }
        if (options.at[0] === "right") {
            basePosition.left += targetWidth;
        } else if (options.at[0] === "center") {
            basePosition.left += targetWidth / 2;
        }
        if (options.at[1] === "bottom") {
            basePosition.top += targetHeight;
        } else if (options.at[1] === "center") {
            basePosition.top += targetHeight / 2;
        }
        atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
        basePosition.left += atOffset[0];
        basePosition.top += atOffset[1];
        return this.each(function () {
            var collisionPosition, using, elem = $(this), elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(), marginLeft = parseCss(this, "marginLeft"),
                marginTop = parseCss(this, "marginTop"),
                collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
                collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
                position = $.extend({}, basePosition),
                myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
            if (options.my[0] === "right") {
                position.left -= elemWidth;
            } else if (options.my[0] === "center") {
                position.left -= elemWidth / 2;
            }
            if (options.my[1] === "bottom") {
                position.top -= elemHeight;
            } else if (options.my[1] === "center") {
                position.top -= elemHeight / 2;
            }
            position.left += myOffset[0];
            position.top += myOffset[1];
            if (!$.support.offsetFractions) {
                position.left = round(position.left);
                position.top = round(position.top);
            }
            collisionPosition = {marginLeft: marginLeft, marginTop: marginTop};
            $.each(["left", "top"], function (i, dir) {
                if ($.ui.position[collision[i]]) {
                    $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    });
                }
            });
            if (options.using) {
                using = function (props) {
                    var left = targetOffset.left - position.left, right = left + targetWidth - elemWidth,
                        top = targetOffset.top - position.top, bottom = top + targetHeight - elemHeight, feedback = {
                            target: {
                                element: target,
                                left: targetOffset.left,
                                top: targetOffset.top,
                                width: targetWidth,
                                height: targetHeight
                            },
                            element: {
                                element: elem,
                                left: position.left,
                                top: position.top,
                                width: elemWidth,
                                height: elemHeight
                            },
                            horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                            vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                        };
                    if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                        feedback.horizontal = "center";
                    }
                    if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                        feedback.vertical = "middle";
                    }
                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                        feedback.important = "horizontal";
                    } else {
                        feedback.important = "vertical";
                    }
                    options.using.call(this, props, feedback);
                };
            }
            elem.offset($.extend(position, {using: using}));
        });
    };
    $.ui.position = {
        fit: {
            left: function (position, data) {
                var within = data.within, withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                    outerWidth = within.width, collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = withinOffset - collisionPosLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset, newOverRight;
                if (data.collisionWidth > outerWidth) {
                    if (overLeft > 0 && overRight <= 0) {
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        position.left += overLeft - newOverRight;
                    } else if (overRight > 0 && overLeft <= 0) {
                        position.left = withinOffset;
                    } else {
                        if (overLeft > overRight) {
                            position.left = withinOffset + outerWidth - data.collisionWidth;
                        } else {
                            position.left = withinOffset;
                        }
                    }
                } else if (overLeft > 0) {
                    position.left += overLeft;
                } else if (overRight > 0) {
                    position.left -= overRight;
                } else {
                    position.left = max(position.left - collisionPosLeft, position.left);
                }
            }, top: function (position, data) {
                var within = data.within, withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                    outerHeight = data.within.height, collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = withinOffset - collisionPosTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset, newOverBottom;
                if (data.collisionHeight > outerHeight) {
                    if (overTop > 0 && overBottom <= 0) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom;
                    } else if (overBottom > 0 && overTop <= 0) {
                        position.top = withinOffset;
                    } else {
                        if (overTop > overBottom) {
                            position.top = withinOffset + outerHeight - data.collisionHeight;
                        } else {
                            position.top = withinOffset;
                        }
                    }
                } else if (overTop > 0) {
                    position.top += overTop;
                } else if (overBottom > 0) {
                    position.top -= overBottom;
                } else {
                    position.top = max(position.top - collisionPosTop, position.top);
                }
            }
        }, flip: {
            left: function (position, data) {
                var within = data.within, withinOffset = within.offset.left + within.scrollLeft,
                    outerWidth = within.width, offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = collisionPosLeft - offsetLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                    myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
                    atOffset = data.at[0] === "left" ? data.targetWidth : data.at[0] === "right" ? -data.targetWidth : 0,
                    offset = -2 * data.offset[0], newOverRight, newOverLeft;
                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        position.left += myOffset + atOffset + offset;
                    }
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                        position.left += myOffset + atOffset + offset;
                    }
                }
            }, top: function (position, data) {
                var within = data.within, withinOffset = within.offset.top + within.scrollTop,
                    outerHeight = within.height, offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = collisionPosTop - offsetTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                    top = data.my[1] === "top",
                    myOffset = top ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
                    atOffset = data.at[1] === "top" ? data.targetHeight : data.at[1] === "bottom" ? -data.targetHeight : 0,
                    offset = -2 * data.offset[1], newOverTop, newOverBottom;
                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                    if ((position.top + myOffset + atOffset + offset) > overTop && (newOverBottom < 0 || newOverBottom < abs(overTop))) {
                        position.top += myOffset + atOffset + offset;
                    }
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                    if ((position.top + myOffset + atOffset + offset) > overBottom && (newOverTop > 0 || abs(newOverTop) < overBottom)) {
                        position.top += myOffset + atOffset + offset;
                    }
                }
            }
        }, flipfit: {
            left: function () {
                $.ui.position.flip.left.apply(this, arguments);
                $.ui.position.fit.left.apply(this, arguments);
            }, top: function () {
                $.ui.position.flip.top.apply(this, arguments);
                $.ui.position.fit.top.apply(this, arguments);
            }
        }
    };
    (function () {
        var testElement, testElementParent, testElementStyle, offsetLeft, i,
            body = document.getElementsByTagName("body")[0], div = document.createElement("div");
        testElement = document.createElement(body ? "div" : "body");
        testElementStyle = {visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none"};
        if (body) {
            $.extend(testElementStyle, {position: "absolute", left: "-1000px", top: "-1000px"});
        }
        for (i in testElementStyle) {
            testElement.style[i] = testElementStyle[i];
        }
        testElement.appendChild(div);
        testElementParent = body || document.documentElement;
        testElementParent.insertBefore(testElement, testElementParent.firstChild);
        div.style.cssText = "position: absolute; left: 10.7432222px;";
        offsetLeft = $(div).offset().left;
        $.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;
        testElement.innerHTML = "";
        testElementParent.removeChild(testElement);
    })();
}(jQuery));
(function ($, undefined) {
    $.widget("ui.autocomplete", {
        version: "1.10.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
                nodeName = this.element[0].nodeName.toLowerCase(), isTextarea = nodeName === "textarea",
                isInput = nodeName === "input";
            this.isMultiLine = isTextarea ? true : isInput ? false : this.element.prop("isContentEditable");
            this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"];
            this.isNewMenu = true;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function (event) {
                    if (this.element.prop("readOnly")) {
                        suppressKeyPress = true;
                        suppressInput = true;
                        suppressKeyPressRepeat = true;
                        return;
                    }
                    suppressKeyPress = false;
                    suppressInput = false;
                    suppressKeyPressRepeat = false;
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                        case keyCode.PAGE_UP:
                            suppressKeyPress = true;
                            this._move("previousPage", event);
                            break;
                        case keyCode.PAGE_DOWN:
                            suppressKeyPress = true;
                            this._move("nextPage", event);
                            break;
                        case keyCode.UP:
                            suppressKeyPress = true;
                            this._keyEvent("previous", event);
                            break;
                        case keyCode.DOWN:
                            suppressKeyPress = true;
                            this._keyEvent("next", event);
                            break;
                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                            if (this.menu.active) {
                                suppressKeyPress = true;
                                event.preventDefault();
                                this.menu.select(event);
                            }
                            break;
                        case keyCode.TAB:
                            if (this.menu.active) {
                                this.menu.select(event);
                            }
                            break;
                        case keyCode.ESCAPE:
                            if (this.menu.element.is(":visible")) {
                                this._value(this.term);
                                this.close(event);
                                event.preventDefault();
                            }
                            break;
                        default:
                            suppressKeyPressRepeat = true;
                            this._searchTimeout(event);
                            break;
                    }
                }, keypress: function (event) {
                    if (suppressKeyPress) {
                        suppressKeyPress = false;
                        if (!this.isMultiLine || this.menu.element.is(":visible")) {
                            event.preventDefault();
                        }
                        return;
                    }
                    if (suppressKeyPressRepeat) {
                        return;
                    }
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                        case keyCode.PAGE_UP:
                            this._move("previousPage", event);
                            break;
                        case keyCode.PAGE_DOWN:
                            this._move("nextPage", event);
                            break;
                        case keyCode.UP:
                            this._keyEvent("previous", event);
                            break;
                        case keyCode.DOWN:
                            this._keyEvent("next", event);
                            break;
                    }
                }, input: function (event) {
                    if (suppressInput) {
                        suppressInput = false;
                        event.preventDefault();
                        return;
                    }
                    this._searchTimeout(event);
                }, focus: function () {
                    this.selectedItem = null;
                    this.previous = this._value();
                }, blur: function (event) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return;
                    }
                    clearTimeout(this.searching);
                    this.close(event);
                    this._change(event);
                }
            });
            this._initSource();
            this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role: null}).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function (event) {
                    event.preventDefault();
                    this.cancelBlur = true;
                    this._delay(function () {
                        delete this.cancelBlur;
                    });
                    var menuElement = this.menu.element[0];
                    if (!$(event.target).closest(".ui-menu-item").length) {
                        this._delay(function () {
                            var that = this;
                            this.document.one("mousedown", function (event) {
                                if (event.target !== that.element[0] && event.target !== menuElement && !$.contains(menuElement, event.target)) {
                                    that.close();
                                }
                            });
                        });
                    }
                }, menufocus: function (event, ui) {
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (event.originalEvent && /^mouse/.test(event.originalEvent.type)) {
                            this.menu.blur();
                            this.document.one("mousemove", function () {
                                $(event.target).trigger(event.originalEvent);
                            });
                            return;
                        }
                    }
                    var item = ui.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", event, {item: item})) {
                        if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
                            this._value(item.value);
                        }
                    } else {
                        this.liveRegion.text(item.value);
                    }
                }, menuselect: function (event, ui) {
                    var item = ui.item.data("ui-autocomplete-item"), previous = this.previous;
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = previous;
                        this._delay(function () {
                            this.previous = previous;
                            this.selectedItem = item;
                        });
                    }
                    if (false !== this._trigger("select", event, {item: item})) {
                        this._value(item.value);
                    }
                    this.term = this._value();
                    this.close(event);
                    this.selectedItem = item;
                }
            });
            this.liveRegion = $("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _destroy: function () {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove();
        },
        _setOption: function (key, value) {
            this._super(key, value);
            if (key === "source") {
                this._initSource();
            }
            if (key === "appendTo") {
                this.menu.element.appendTo(this._appendTo());
            }
            if (key === "disabled" && value && this.xhr) {
                this.xhr.abort();
            }
        },
        _appendTo: function () {
            var element = this.options.appendTo;
            if (element) {
                element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0);
            }
            if (!element) {
                element = this.element.closest(".ui-front");
            }
            if (!element.length) {
                element = this.document[0].body;
            }
            return element;
        },
        _initSource: function () {
            var array, url, that = this;
            if ($.isArray(this.options.source)) {
                array = this.options.source;
                this.source = function (request, response) {
                    response($.ui.autocomplete.filter(array, request.term));
                };
            } else if (typeof this.options.source === "string") {
                url = this.options.source;
                this.source = function (request, response) {
                    if (that.xhr) {
                        that.xhr.abort();
                    }
                    that.xhr = $.ajax({
                        url: url, data: request, dataType: "json", success: function (data) {
                            response(data);
                        }, error: function () {
                            response([]);
                        }
                    });
                };
            } else {
                this.source = this.options.source;
            }
        },
        _searchTimeout: function (event) {
            clearTimeout(this.searching);
            this.searching = this._delay(function () {
                if (this.term !== this._value()) {
                    this.selectedItem = null;
                    this.search(null, event);
                }
            }, this.options.delay);
        },
        search: function (value, event) {
            value = value != null ? value : this._value();
            this.term = this._value();
            if (value.length < this.options.minLength) {
                return this.close(event);
            }
            if (this._trigger("search", event) === false) {
                return;
            }
            return this._search(value);
        },
        _search: function (value) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = false;
            this.source({term: value}, this._response());
        },
        _response: function () {
            var index = ++this.requestIndex;
            return $.proxy(function (content) {
                if (index === this.requestIndex) {
                    this.__response(content);
                }
                this.pending--;
                if (!this.pending) {
                    this.element.removeClass("ui-autocomplete-loading");
                }
            }, this);
        },
        __response: function (content) {
            if (content) {
                content = this._normalize(content);
            }
            this._trigger("response", null, {content: content});
            if (!this.options.disabled && content && content.length && !this.cancelSearch) {
                this._suggest(content);
                this._trigger("open");
            } else {
                this._close();
            }
        },
        close: function (event) {
            this.cancelSearch = true;
            this._close(event);
        },
        _close: function (event) {
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.blur();
                this.isNewMenu = true;
                this._trigger("close", event);
            }
        },
        _change: function (event) {
            if (this.previous !== this._value()) {
                this._trigger("change", event, {item: this.selectedItem});
            }
        },
        _normalize: function (items) {
            if (items.length && items[0].label && items[0].value) {
                return items;
            }
            return $.map(items, function (item) {
                if (typeof item === "string") {
                    return {label: item, value: item};
                }
                return $.extend({label: item.label || item.value, value: item.value || item.label}, item);
            });
        },
        _suggest: function (items) {
            var ul = this.menu.element.empty();
            this._renderMenu(ul, items);
            this.isNewMenu = true;
            this.menu.refresh();
            ul.show();
            this._resizeMenu();
            ul.position($.extend({of: this.element}, this.options.position));
            if (this.options.autoFocus) {
                this.menu.next();
            }
        },
        _resizeMenu: function () {
            var ul = this.menu.element;
            ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
        },
        _renderMenu: function (ul, items) {
            var that = this;
            $.each(items, function (index, item) {
                that._renderItemData(ul, item);
            });
        },
        _renderItemData: function (ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        },
        _renderItem: function (ul, item) {
            return $("<li>").append($("<a>").text(item.label)).appendTo(ul);
        },
        _move: function (direction, event) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, event);
                return;
            }
            if (this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction)) {
                this._value(this.term);
                this.menu.blur();
                return;
            }
            this.menu[direction](event);
        },
        widget: function () {
            return this.menu.element;
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function (keyEvent, event) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(keyEvent, event);
                event.preventDefault();
            }
        }
    });
    $.extend($.ui.autocomplete, {
        escapeRegex: function (value) {
            return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        }, filter: function (array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function (value) {
                return matcher.test(value.label || value.value || value);
            });
        }
    });
    $.widget("ui.autocomplete", $.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.", results: function (amount) {
                    return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                }
            }
        }, __response: function (content) {
            var message;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return;
            }
            if (content && content.length) {
                message = this.options.messages.results(content.length);
            } else {
                message = this.options.messages.noResults;
            }
            this.liveRegion.text(message);
        }
    });
}(jQuery));
(function ($, undefined) {
    $.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {submenu: "ui-icon-carat-1-e"},
            menus: "ul",
            position: {my: "left top", at: "right top"},
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element;
            this.mouseHandled = false;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, $.proxy(function (event) {
                if (this.options.disabled) {
                    event.preventDefault();
                }
            }, this));
            if (this.options.disabled) {
                this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
            }
            this._on({
                "mousedown .ui-menu-item > a": function (event) {
                    event.preventDefault();
                },
                "click .ui-state-disabled > a": function (event) {
                    event.preventDefault();
                },
                "click .ui-menu-item:has(a)": function (event) {
                    var target = $(event.target).closest(".ui-menu-item");
                    if (!this.mouseHandled && target.not(".ui-state-disabled").length) {
                        this.select(event);
                        if (!event.isPropagationStopped()) {
                            this.mouseHandled = true;
                        }
                        if (target.has(".ui-menu").length) {
                            this.expand(event);
                        } else if (!this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length) {
                            this.element.trigger("focus", [true]);
                            if (this.active && this.active.parents(".ui-menu").length === 1) {
                                clearTimeout(this.timer);
                            }
                        }
                    }
                },
                "mouseenter .ui-menu-item": function (event) {
                    var target = $(event.currentTarget);
                    target.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(event, target);
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (event, keepActiveItem) {
                    var item = this.active || this.element.children(".ui-menu-item").eq(0);
                    if (!keepActiveItem) {
                        this.focus(event, item);
                    }
                },
                blur: function (event) {
                    this._delay(function () {
                        if (!$.contains(this.element[0], this.document[0].activeElement)) {
                            this.collapseAll(event);
                        }
                    });
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function (event) {
                    if (!$(event.target).closest(".ui-menu").length) {
                        this.collapseAll(event);
                    }
                    this.mouseHandled = false;
                }
            });
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var elem = $(this);
                if (elem.data("ui-menu-submenu-carat")) {
                    elem.remove();
                }
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
        },
        _keydown: function (event) {
            var match, prev, character, skip, regex, preventDefault = true;

            function escape(value) {
                return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }

            switch (event.keyCode) {
                case $.ui.keyCode.PAGE_UP:
                    this.previousPage(event);
                    break;
                case $.ui.keyCode.PAGE_DOWN:
                    this.nextPage(event);
                    break;
                case $.ui.keyCode.HOME:
                    this._move("first", "first", event);
                    break;
                case $.ui.keyCode.END:
                    this._move("last", "last", event);
                    break;
                case $.ui.keyCode.UP:
                    this.previous(event);
                    break;
                case $.ui.keyCode.DOWN:
                    this.next(event);
                    break;
                case $.ui.keyCode.LEFT:
                    this.collapse(event);
                    break;
                case $.ui.keyCode.RIGHT:
                    if (this.active && !this.active.is(".ui-state-disabled")) {
                        this.expand(event);
                    }
                    break;
                case $.ui.keyCode.ENTER:
                case $.ui.keyCode.SPACE:
                    this._activate(event);
                    break;
                case $.ui.keyCode.ESCAPE:
                    this.collapse(event);
                    break;
                default:
                    preventDefault = false;
                    prev = this.previousFilter || "";
                    character = String.fromCharCode(event.keyCode);
                    skip = false;
                    clearTimeout(this.filterTimer);
                    if (character === prev) {
                        skip = true;
                    } else {
                        character = prev + character;
                    }
                    regex = new RegExp("^" + escape(character), "i");
                    match = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return regex.test($(this).children("a").text());
                    });
                    match = skip && match.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : match;
                    if (!match.length) {
                        character = String.fromCharCode(event.keyCode);
                        regex = new RegExp("^" + escape(character), "i");
                        match = this.activeMenu.children(".ui-menu-item").filter(function () {
                            return regex.test($(this).children("a").text());
                        });
                    }
                    if (match.length) {
                        this.focus(event, match);
                        if (match.length > 1) {
                            this.previousFilter = character;
                            this.filterTimer = this._delay(function () {
                                delete this.previousFilter;
                            }, 1000);
                        } else {
                            delete this.previousFilter;
                        }
                    } else {
                        delete this.previousFilter;
                    }
            }
            if (preventDefault) {
                event.preventDefault();
            }
        },
        _activate: function (event) {
            if (!this.active.is(".ui-state-disabled")) {
                if (this.active.children("a[aria-haspopup='true']").length) {
                    this.expand(event);
                } else {
                    this.select(event);
                }
            }
        },
        refresh: function () {
            var menus, icon = this.options.icons.submenu, submenus = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
            submenus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var menu = $(this), item = menu.prev("a"),
                    submenuCarat = $("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat", true);
                item.attr("aria-haspopup", "true").prepend(submenuCarat);
                menu.attr("aria-labelledby", item.attr("id"));
            });
            menus = submenus.add(this.element);
            menus.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            menus.children(":not(.ui-menu-item)").each(function () {
                var item = $(this);
                if (!/[^\-\u2014\u2013\s]/.test(item.text())) {
                    item.addClass("ui-widget-content ui-menu-divider");
                }
            });
            menus.children(".ui-state-disabled").attr("aria-disabled", "true");
            if (this.active && !$.contains(this.element[0], this.active[0])) {
                this.blur();
            }
        },
        _itemRole: function () {
            return {menu: "menuitem", listbox: "option"}[this.options.role];
        },
        _setOption: function (key, value) {
            if (key === "icons") {
                this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu);
            }
            this._super(key, value);
        },
        focus: function (event, item) {
            var nested, focused;
            this.blur(event, event && event.type === "focus");
            this._scrollIntoView(item);
            this.active = item.first();
            focused = this.active.children("a").addClass("ui-state-focus");
            if (this.options.role) {
                this.element.attr("aria-activedescendant", focused.attr("id"));
            }
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            if (event && event.type === "keydown") {
                this._close();
            } else {
                this.timer = this._delay(function () {
                    this._close();
                }, this.delay);
            }
            nested = item.children(".ui-menu");
            if (nested.length && event && (/^mouse/.test(event.type))) {
                this._startOpening(nested);
            }
            this.activeMenu = item.parent();
            this._trigger("focus", event, {item: item});
        },
        _scrollIntoView: function (item) {
            var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
            if (this._hasScroll()) {
                borderTop = parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0;
                paddingTop = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0;
                offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
                scroll = this.activeMenu.scrollTop();
                elementHeight = this.activeMenu.height();
                itemHeight = item.height();
                if (offset < 0) {
                    this.activeMenu.scrollTop(scroll + offset);
                } else if (offset + itemHeight > elementHeight) {
                    this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight);
                }
            }
        },
        blur: function (event, fromFocus) {
            if (!fromFocus) {
                clearTimeout(this.timer);
            }
            if (!this.active) {
                return;
            }
            this.active.children("a").removeClass("ui-state-focus");
            this.active = null;
            this._trigger("blur", event, {item: this.active});
        },
        _startOpening: function (submenu) {
            clearTimeout(this.timer);
            if (submenu.attr("aria-hidden") !== "true") {
                return;
            }
            this.timer = this._delay(function () {
                this._close();
                this._open(submenu);
            }, this.delay);
        },
        _open: function (submenu) {
            var position = $.extend({of: this.active}, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position);
        },
        collapseAll: function (event, all) {
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find(".ui-menu"));
                if (!currentMenu.length) {
                    currentMenu = this.element;
                }
                this._close(currentMenu);
                this.blur(event);
                this.activeMenu = currentMenu;
            }, this.delay);
        },
        _close: function (startMenu) {
            if (!startMenu) {
                startMenu = this.active ? this.active.parent() : this.element;
            }
            startMenu.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active");
        },
        collapse: function (event) {
            var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (newItem && newItem.length) {
                this._close();
                this.focus(event, newItem);
            }
        },
        expand: function (event) {
            var newItem = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            if (newItem && newItem.length) {
                this._open(newItem.parent());
                this._delay(function () {
                    this.focus(event, newItem);
                });
            }
        },
        next: function (event) {
            this._move("next", "first", event);
        },
        previous: function (event) {
            this._move("prev", "last", event);
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function (direction, filter, event) {
            var next;
            if (this.active) {
                if (direction === "first" || direction === "last") {
                    next = this.active
                        [direction === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1);
                } else {
                    next = this.active
                        [direction + "All"](".ui-menu-item").eq(0);
                }
            }
            if (!next || !next.length || !this.active) {
                next = this.activeMenu.children(".ui-menu-item")[filter]();
            }
            this.focus(event, next);
        },
        nextPage: function (event) {
            var item, base, height;
            if (!this.active) {
                this.next(event);
                return;
            }
            if (this.isLastItem()) {
                return;
            }
            if (this._hasScroll()) {
                base = this.active.offset().top;
                height = this.element.height();
                this.active.nextAll(".ui-menu-item").each(function () {
                    item = $(this);
                    return item.offset().top - base - height < 0;
                });
                this.focus(event, item);
            } else {
                this.focus(event, this.activeMenu.children(".ui-menu-item")
                    [!this.active ? "first" : "last"]());
            }
        },
        previousPage: function (event) {
            var item, base, height;
            if (!this.active) {
                this.next(event);
                return;
            }
            if (this.isFirstItem()) {
                return;
            }
            if (this._hasScroll()) {
                base = this.active.offset().top;
                height = this.element.height();
                this.active.prevAll(".ui-menu-item").each(function () {
                    item = $(this);
                    return item.offset().top - base + height > 0;
                });
                this.focus(event, item);
            } else {
                this.focus(event, this.activeMenu.children(".ui-menu-item").first());
            }
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function (event) {
            this.active = this.active || $(event.target).closest(".ui-menu-item");
            var ui = {item: this.active};
            if (!this.active.has(".ui-menu").length) {
                this.collapseAll(event, true);
            }
            this._trigger("select", event, ui);
        }
    });
}(jQuery));
(function ($, undefined) {
    var tabId = 0, rhash = /#.*$/;

    function getNextTabId() {
        return ++tabId;
    }

    function isLocal(anchor) {
        anchor = anchor.cloneNode(false);
        return anchor.hash.length > 1 && decodeURIComponent(anchor.href.replace(rhash, "")) === decodeURIComponent(location.href.replace(rhash, ""));
    }

    $.widget("ui.tabs", {
        version: "1.10.4",
        delay: 300,
        options: {
            active: null,
            collapsible: false,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function () {
            var that = this, options = this.options;
            this.running = false;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", options.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (event) {
                if ($(this).is(".ui-state-disabled")) {
                    event.preventDefault();
                }
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                if ($(this).closest("li").is(".ui-state-disabled")) {
                    this.blur();
                }
            });
            this._processTabs();
            options.active = this._initialActive();
            if ($.isArray(options.disabled)) {
                options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"), function (li) {
                    return that.tabs.index(li);
                }))).sort();
            }
            if (this.options.active !== false && this.anchors.length) {
                this.active = this._findActive(options.active);
            } else {
                this.active = $();
            }
            this._refresh();
            if (this.active.length) {
                this.load(options.active);
            }
        },
        _initialActive: function () {
            var active = this.options.active, collapsible = this.options.collapsible,
                locationHash = location.hash.substring(1);
            if (active === null) {
                if (locationHash) {
                    this.tabs.each(function (i, tab) {
                        if ($(tab).attr("aria-controls") === locationHash) {
                            active = i;
                            return false;
                        }
                    });
                }
                if (active === null) {
                    active = this.tabs.index(this.tabs.filter(".ui-tabs-active"));
                }
                if (active === null || active === -1) {
                    active = this.tabs.length ? 0 : false;
                }
            }
            if (active !== false) {
                active = this.tabs.index(this.tabs.eq(active));
                if (active === -1) {
                    active = collapsible ? false : 0;
                }
            }
            if (!collapsible && active === false && this.anchors.length) {
                active = 0;
            }
            return active;
        },
        _getCreateEventData: function () {
            return {tab: this.active, panel: !this.active.length ? $() : this._getPanelForTab(this.active)};
        },
        _tabKeydown: function (event) {
            var focusedTab = $(this.document[0].activeElement).closest("li"),
                selectedIndex = this.tabs.index(focusedTab), goingForward = true;
            if (this._handlePageNav(event)) {
                return;
            }
            switch (event.keyCode) {
                case $.ui.keyCode.RIGHT:
                case $.ui.keyCode.DOWN:
                    selectedIndex++;
                    break;
                case $.ui.keyCode.UP:
                case $.ui.keyCode.LEFT:
                    goingForward = false;
                    selectedIndex--;
                    break;
                case $.ui.keyCode.END:
                    selectedIndex = this.anchors.length - 1;
                    break;
                case $.ui.keyCode.HOME:
                    selectedIndex = 0;
                    break;
                case $.ui.keyCode.SPACE:
                    event.preventDefault();
                    clearTimeout(this.activating);
                    this._activate(selectedIndex);
                    return;
                case $.ui.keyCode.ENTER:
                    event.preventDefault();
                    clearTimeout(this.activating);
                    this._activate(selectedIndex === this.options.active ? false : selectedIndex);
                    return;
                default:
                    return;
            }
            event.preventDefault();
            clearTimeout(this.activating);
            selectedIndex = this._focusNextTab(selectedIndex, goingForward);
            if (!event.ctrlKey) {
                focusedTab.attr("aria-selected", "false");
                this.tabs.eq(selectedIndex).attr("aria-selected", "true");
                this.activating = this._delay(function () {
                    this.option("active", selectedIndex);
                }, this.delay);
            }
        },
        _panelKeydown: function (event) {
            if (this._handlePageNav(event)) {
                return;
            }
            if (event.ctrlKey && event.keyCode === $.ui.keyCode.UP) {
                event.preventDefault();
                this.active.focus();
            }
        },
        _handlePageNav: function (event) {
            if (event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP) {
                this._activate(this._focusNextTab(this.options.active - 1, false));
                return true;
            }
            if (event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN) {
                this._activate(this._focusNextTab(this.options.active + 1, true));
                return true;
            }
        },
        _findNextTab: function (index, goingForward) {
            var lastTabIndex = this.tabs.length - 1;

            function constrain() {
                if (index > lastTabIndex) {
                    index = 0;
                }
                if (index < 0) {
                    index = lastTabIndex;
                }
                return index;
            }

            while ($.inArray(constrain(), this.options.disabled) !== -1) {
                index = goingForward ? index + 1 : index - 1;
            }
            return index;
        },
        _focusNextTab: function (index, goingForward) {
            index = this._findNextTab(index, goingForward);
            this.tabs.eq(index).focus();
            return index;
        },
        _setOption: function (key, value) {
            if (key === "active") {
                this._activate(value);
                return;
            }
            if (key === "disabled") {
                this._setupDisabled(value);
                return;
            }
            this._super(key, value);
            if (key === "collapsible") {
                this.element.toggleClass("ui-tabs-collapsible", value);
                if (!value && this.options.active === false) {
                    this._activate(0);
                }
            }
            if (key === "event") {
                this._setupEvents(value);
            }
            if (key === "heightStyle") {
                this._setupHeightStyle(value);
            }
        },
        _tabId: function (tab) {
            return tab.attr("aria-controls") || "ui-tabs-" + getNextTabId();
        },
        _sanitizeSelector: function (hash) {
            return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
        },
        refresh: function () {
            var options = this.options, lis = this.tablist.children(":has(a[href])");
            options.disabled = $.map(lis.filter(".ui-state-disabled"), function (tab) {
                return lis.index(tab);
            });
            this._processTabs();
            if (options.active === false || !this.anchors.length) {
                options.active = false;
                this.active = $();
            } else if (this.active.length && !$.contains(this.tablist[0], this.active[0])) {
                if (this.tabs.length === options.disabled.length) {
                    options.active = false;
                    this.active = $();
                } else {
                    this._activate(this._findNextTab(Math.max(0, options.active - 1), false));
                }
            } else {
                options.active = this.tabs.index(this.active);
            }
            this._refresh();
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({"aria-selected": "false", tabIndex: -1});
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            if (!this.active.length) {
                this.tabs.eq(0).attr("tabIndex", 0);
            } else {
                this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected": "true", tabIndex: 0});
                this._getPanelForTab(this.active).show().attr({"aria-expanded": "true", "aria-hidden": "false"});
            }
        },
        _processTabs: function () {
            var that = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function () {
                return $("a", this)[0];
            }).addClass("ui-tabs-anchor").attr({role: "presentation", tabIndex: -1});
            this.panels = $();
            this.anchors.each(function (i, anchor) {
                var selector, panel, panelId, anchorId = $(anchor).uniqueId().attr("id"), tab = $(anchor).closest("li"),
                    originalAriaControls = tab.attr("aria-controls");
                if (isLocal(anchor)) {
                    selector = anchor.hash;
                    panel = that.element.find(that._sanitizeSelector(selector));
                } else {
                    panelId = that._tabId(tab);
                    selector = "#" + panelId;
                    panel = that.element.find(selector);
                    if (!panel.length) {
                        panel = that._createPanel(panelId);
                        panel.insertAfter(that.panels[i - 1] || that.tablist);
                    }
                    panel.attr("aria-live", "polite");
                }
                if (panel.length) {
                    that.panels = that.panels.add(panel);
                }
                if (originalAriaControls) {
                    tab.data("ui-tabs-aria-controls", originalAriaControls);
                }
                tab.attr({"aria-controls": selector.substring(1), "aria-labelledby": anchorId});
                panel.attr("aria-labelledby", anchorId);
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel");
        },
        _getList: function () {
            return this.tablist || this.element.find("ol,ul").eq(0);
        },
        _createPanel: function (id) {
            return $("<div>").attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true);
        },
        _setupDisabled: function (disabled) {
            if ($.isArray(disabled)) {
                if (!disabled.length) {
                    disabled = false;
                } else if (disabled.length === this.anchors.length) {
                    disabled = true;
                }
            }
            for (var i = 0, li; (li = this.tabs[i]); i++) {
                if (disabled === true || $.inArray(i, disabled) !== -1) {
                    $(li).addClass("ui-state-disabled").attr("aria-disabled", "true");
                } else {
                    $(li).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                }
            }
            this.options.disabled = disabled;
        },
        _setupEvents: function (event) {
            var events = {
                click: function (event) {
                    event.preventDefault();
                }
            };
            if (event) {
                $.each(event.split(" "), function (index, eventName) {
                    events[eventName] = "_eventHandler";
                });
            }
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(this.anchors, events);
            this._on(this.tabs, {keydown: "_tabKeydown"});
            this._on(this.panels, {keydown: "_panelKeydown"});
            this._focusable(this.tabs);
            this._hoverable(this.tabs);
        },
        _setupHeightStyle: function (heightStyle) {
            var maxHeight, parent = this.element.parent();
            if (heightStyle === "fill") {
                maxHeight = parent.height();
                maxHeight -= this.element.outerHeight() - this.element.height();
                this.element.siblings(":visible").each(function () {
                    var elem = $(this), position = elem.css("position");
                    if (position === "absolute" || position === "fixed") {
                        return;
                    }
                    maxHeight -= elem.outerHeight(true);
                });
                this.element.children().not(this.panels).each(function () {
                    maxHeight -= $(this).outerHeight(true);
                });
                this.panels.each(function () {
                    $(this).height(Math.max(0, maxHeight -
                        $(this).innerHeight() + $(this).height()));
                }).css("overflow", "auto");
            } else if (heightStyle === "auto") {
                maxHeight = 0;
                this.panels.each(function () {
                    maxHeight = Math.max(maxHeight, $(this).height("").height());
                }).height(maxHeight);
            }
        },
        _eventHandler: function (event) {
            var options = this.options, active = this.active, anchor = $(event.currentTarget),
                tab = anchor.closest("li"), clickedIsActive = tab[0] === active[0],
                collapsing = clickedIsActive && options.collapsible,
                toShow = collapsing ? $() : this._getPanelForTab(tab),
                toHide = !active.length ? $() : this._getPanelForTab(active),
                eventData = {oldTab: active, oldPanel: toHide, newTab: collapsing ? $() : tab, newPanel: toShow};
            event.preventDefault();
            if (tab.hasClass("ui-state-disabled") || tab.hasClass("ui-tabs-loading") || this.running || (clickedIsActive && !options.collapsible) || (this._trigger("beforeActivate", event, eventData) === false)) {
                return;
            }
            options.active = collapsing ? false : this.tabs.index(tab);
            this.active = clickedIsActive ? $() : tab;
            if (this.xhr) {
                this.xhr.abort();
            }
            if (!toHide.length && !toShow.length) {
                $.error("jQuery UI Tabs: Mismatching fragment identifier.");
            }
            if (toShow.length) {
                this.load(this.tabs.index(tab), event);
            }
            this._toggle(event, eventData);
        },
        _toggle: function (event, eventData) {
            var that = this, toShow = eventData.newPanel, toHide = eventData.oldPanel;
            this.running = true;

            function complete() {
                that.running = false;
                that._trigger("activate", event, eventData);
            }

            function show() {
                eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                if (toShow.length && that.options.show) {
                    that._show(toShow, that.options.show, complete);
                } else {
                    toShow.show();
                    complete();
                }
            }

            if (toHide.length && this.options.hide) {
                this._hide(toHide, this.options.hide, function () {
                    eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                    show();
                });
            } else {
                eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                toHide.hide();
                show();
            }
            toHide.attr({"aria-expanded": "false", "aria-hidden": "true"});
            eventData.oldTab.attr("aria-selected", "false");
            if (toShow.length && toHide.length) {
                eventData.oldTab.attr("tabIndex", -1);
            } else if (toShow.length) {
                this.tabs.filter(function () {
                    return $(this).attr("tabIndex") === 0;
                }).attr("tabIndex", -1);
            }
            toShow.attr({"aria-expanded": "true", "aria-hidden": "false"});
            eventData.newTab.attr({"aria-selected": "true", tabIndex: 0});
        },
        _activate: function (index) {
            var anchor, active = this._findActive(index);
            if (active[0] === this.active[0]) {
                return;
            }
            if (!active.length) {
                active = this.active;
            }
            anchor = active.find(".ui-tabs-anchor")[0];
            this._eventHandler({target: anchor, currentTarget: anchor, preventDefault: $.noop});
        },
        _findActive: function (index) {
            return index === false ? $() : this.tabs.eq(index);
        },
        _getIndex: function (index) {
            if (typeof index === "string") {
                index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"));
            }
            return index;
        },
        _destroy: function () {
            if (this.xhr) {
                this.xhr.abort();
            }
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
            this.tabs.add(this.panels).each(function () {
                if ($.data(this, "ui-tabs-destroy")) {
                    $(this).remove();
                } else {
                    $(this).removeClass("ui-state-default ui-state-active ui-state-disabled " + "ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");
                }
            });
            this.tabs.each(function () {
                var li = $(this), prev = li.data("ui-tabs-aria-controls");
                if (prev) {
                    li.attr("aria-controls", prev).removeData("ui-tabs-aria-controls");
                } else {
                    li.removeAttr("aria-controls");
                }
            });
            this.panels.show();
            if (this.options.heightStyle !== "content") {
                this.panels.css("height", "");
            }
        },
        enable: function (index) {
            var disabled = this.options.disabled;
            if (disabled === false) {
                return;
            }
            if (index === undefined) {
                disabled = false;
            } else {
                index = this._getIndex(index);
                if ($.isArray(disabled)) {
                    disabled = $.map(disabled, function (num) {
                        return num !== index ? num : null;
                    });
                } else {
                    disabled = $.map(this.tabs, function (li, num) {
                        return num !== index ? num : null;
                    });
                }
            }
            this._setupDisabled(disabled);
        },
        disable: function (index) {
            var disabled = this.options.disabled;
            if (disabled === true) {
                return;
            }
            if (index === undefined) {
                disabled = true;
            } else {
                index = this._getIndex(index);
                if ($.inArray(index, disabled) !== -1) {
                    return;
                }
                if ($.isArray(disabled)) {
                    disabled = $.merge([index], disabled).sort();
                } else {
                    disabled = [index];
                }
            }
            this._setupDisabled(disabled);
        },
        load: function (index, event) {
            index = this._getIndex(index);
            var that = this, tab = this.tabs.eq(index), anchor = tab.find(".ui-tabs-anchor"),
                panel = this._getPanelForTab(tab), eventData = {tab: tab, panel: panel};
            if (isLocal(anchor[0])) {
                return;
            }
            this.xhr = $.ajax(this._ajaxSettings(anchor, event, eventData));
            if (this.xhr && this.xhr.statusText !== "canceled") {
                tab.addClass("ui-tabs-loading");
                panel.attr("aria-busy", "true");
                this.xhr.success(function (response) {
                    setTimeout(function () {
                        panel.html(response);
                        that._trigger("load", event, eventData);
                    }, 1);
                }).complete(function (jqXHR, status) {
                    setTimeout(function () {
                        if (status === "abort") {
                            that.panels.stop(false, true);
                        }
                        tab.removeClass("ui-tabs-loading");
                        panel.removeAttr("aria-busy");
                        if (jqXHR === that.xhr) {
                            delete that.xhr;
                        }
                    }, 1);
                });
            }
        },
        _ajaxSettings: function (anchor, event, eventData) {
            var that = this;
            return {
                url: anchor.attr("href"), beforeSend: function (jqXHR, settings) {
                    return that._trigger("beforeLoad", event, $.extend({
                        jqXHR: jqXHR,
                        ajaxSettings: settings
                    }, eventData));
                }
            };
        },
        _getPanelForTab: function (tab) {
            var id = $(tab).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + id));
        }
    });
})(jQuery);
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.stickybits = factory());
}(this, (function () {
    'use strict';

    function Stickybits(target) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$noStyles = _ref.noStyles, noStyles = _ref$noStyles === undefined ? false : _ref$noStyles,
            _ref$stickyBitStickyO = _ref.stickyBitStickyOffset,
            stickyBitStickyOffset = _ref$stickyBitStickyO === undefined ? 0 : _ref$stickyBitStickyO,
            _ref$parentClass = _ref.parentClass,
            parentClass = _ref$parentClass === undefined ? 'js-stickybit-parent' : _ref$parentClass,
            _ref$scrollEl = _ref.scrollEl, scrollEl = _ref$scrollEl === undefined ? window : _ref$scrollEl,
            _ref$stickyClass = _ref.stickyClass,
            stickyClass = _ref$stickyClass === undefined ? 'js-is-sticky' : _ref$stickyClass,
            _ref$stuckClass = _ref.stuckClass,
            stuckClass = _ref$stuckClass === undefined ? 'js-is-stuck' : _ref$stuckClass,
            _ref$useStickyClasses = _ref.useStickyClasses,
            useStickyClasses = _ref$useStickyClasses === undefined ? false : _ref$useStickyClasses,
            _ref$verticalPosition = _ref.verticalPosition,
            verticalPosition = _ref$verticalPosition === undefined ? 'top' : _ref$verticalPosition;
        this.version = '2.0.0';
        this.userAgent = window.navigator.userAgent;
        this.props = {
            noStyles: noStyles,
            stickyBitStickyOffset: stickyBitStickyOffset,
            parentClass: parentClass,
            scrollEl: scrollEl,
            stickyClass: stickyClass,
            stuckClass: stuckClass,
            useStickyClasses: useStickyClasses,
            verticalPosition: verticalPosition
        };
        var p = this.props;
        p.positionVal = this.definePosition();
        var vp = p.verticalPosition;
        var ns = p.noStyles;
        var pv = p.positionVal;
        this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
        if (!('length' in this.els)) this.els = [this.els];
        this.instances = [];
        for (var i = 0; i < this.els.length; i += 1) {
            var el = this.els[i];
            var styles = el.style;
            if (vp === 'top' && !ns) styles[vp] = p.stickyBitStickyOffset + 'px';
            if (pv !== 'fixed' && p.useStickyClasses === false) {
                styles.position = pv;
            } else {
                if (pv !== 'fixed') styles.position = pv;
                var instance = this.addInstance(el, p);
                this.instances.push(instance);
            }
        }
        return this;
    }

    Stickybits.prototype.definePosition = function () {
        var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
        var test = document.head.style;
        for (var i = 0; i < prefix.length; i += 1) {
            test.position = prefix[i] + 'sticky';
        }
        var stickyProp = typeof test.position !== 'undefined' ? test.position : 'fixed';
        test.position = '';
        return stickyProp;
    };
    Stickybits.prototype.addInstance = function addInstance(el, props) {
        var _this = this;
        var item = {el: el, parent: el.parentNode, props: props};
        var p = item.props;
        item.parent.className += ' ' + props.parentClass;
        var se = p.scrollEl;
        item.isWin = se === window;
        if (!item.isWin) se = this.getClosestParent(item.el, se);
        this.computeScrollOffsets(item);
        item.state = 'default';
        this.stateContainer = function () {
            _this.manageState(item);
        };
        se.addEventListener('scroll', this.stateContainer);
        return item;
    };
    Stickybits.prototype.getClosestParent = function getClosestParent(el, matchSelector) {
        var p = document.querySelector(matchSelector);
        var e = el;
        if (e.parentElement === p) return p;
        while (e.parentElement !== p) {
            e = e.parentElement;
        }
        return p;
    };
    Stickybits.prototype.computeScrollOffsets = function computeScrollOffsets(item) {
        var it = item;
        var p = it.props;
        var parent = it.parent;
        var iw = it.isWin;
        var scrollElOffset = 0;
        var stickyStart = parent.getBoundingClientRect().top;
        if (!iw && p.positionVal === 'fixed') {
            scrollElOffset = p.scrollEl.getBoundingClientRect().top;
            stickyStart = parent.getBoundingClientRect().top - scrollElOffset;
        }
        it.offset = scrollElOffset + p.stickyBitStickyOffset;
        it.stickyStart = stickyStart;
        it.stickyStop = it.stickyStart + parent.offsetHeight - (it.el.offsetHeight - it.offset);
        return it;
    };
    Stickybits.prototype.toggleClasses = function toggleClasses(el, r, a) {
        var e = el;
        var cArray = e.className.split(' ');
        if (a && cArray.indexOf(a) === -1) cArray.push(a);
        var rItem = cArray.indexOf(r);
        if (rItem !== -1) cArray.splice(rItem, 1);
        e.className = cArray.join(' ');
    };
    Stickybits.prototype.manageState = function manageState(item) {
        var it = item;
        var e = it.el;
        var p = it.props;
        var state = it.state;
        var start = it.stickyStart;
        var stop = it.stickyStop;
        var stl = e.style;
        var ns = p.noStyles;
        var pv = p.positionVal;
        var se = p.scrollEl;
        var sticky = p.stickyClass;
        var stuck = p.stuckClass;
        var vp = p.verticalPosition;
        var rAF = se.requestAnimationFrame;
        if (typeof rAF !== 'undefined') rAF = function rAFDummy(f) {
            f();
        };
        var tC = this.toggleClasses;
        var scroll = it.isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
        var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
        var isSticky = scroll < start && state === 'sticky';
        var isStuck = scroll > stop && state === 'sticky';
        if (notSticky) {
            it.state = 'sticky';
            rAF(function () {
                tC(e, stuck, sticky);
                stl.position = pv;
                if (ns) return;
                stl.bottom = '';
                stl[vp] = p.stickyBitStickyOffset + 'px';
            });
        } else if (isSticky) {
            it.state = 'default';
            rAF(function () {
                tC(e, sticky);
                if (pv === 'fixed') stl.position = '';
            });
        } else if (isStuck) {
            it.state = 'stuck';
            rAF(function () {
                tC(e, sticky, stuck);
                if (pv !== 'fixed' || ns) return;
                stl.top = '';
                stl.bottom = '0';
                stl.position = 'absolute';
            });
        }
        return it;
    };
    Stickybits.prototype.removeClass = function removeClass(el, className) {
        var e = el;
        var cArray = e.className.split(' ');
        var cItem = cArray.indexOf(className);
        if (cItem !== -1) cArray.splice(cItem, 1);
        e.className = cArray.join(' ');
    };
    Stickybits.prototype.removeInstance = function removeInstance(instance) {
        var e = instance.el;
        var p = instance.props;
        var rC = this.removeClass;
        e.style.position = '';
        e.style[this.vp] = '';
        rC(e, p.stickyClass);
        rC(e, p.stuckClass);
        rC(e.parentNode, p.parentClass);
    };
    Stickybits.prototype.cleanup = function cleanup() {
        for (var i = 0; i < this.instances.length; i += 1) {
            var instance = this.instances[i];
            this.removeInstance(instance);
        }
        this.stateManager = false;
        this.instances = [];
    };

    function stickybits(target, o) {
        return new Stickybits(target, o);
    }

    return stickybits;
})));
;jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
;jQuery.fn.extend({
    getUrlParam: function (strParamName) {
        strParamName = escape(unescape(strParamName));
        var returnVal = new Array();
        var qString = null;
        if ($(this).attr("nodeName") == "#document") {
            if (window.location.search.search(strParamName) > -1) {
                qString = window.location.search.substr(1, window.location.search.length).split("&");
            }
        } else if (typeof $(this).attr("src") != "undefined") {
            var strHref = $(this).attr("src")
            if (strHref.indexOf("?") > -1) {
                var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
                qString = strQueryString.split("&");
            }
        } else if (typeof $(this).attr("href") != "undefined") {
            var strHref = $(this).attr("href")
            if (strHref.indexOf("?") > -1) {
                var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
                qString = strQueryString.split("&");
            }
        } else {
            return null;
        }
        if (qString == null) return null;
        for (var i = 0; i < qString.length; i++) {
            if (escape(unescape(qString[i].split("=")[0])) == strParamName) {
                returnVal.push(qString[i].split("=")[1]);
            }
        }
        if (returnVal.length == 0) return null; else if (returnVal.length == 1) return returnVal[0]; else return returnVal;
    }
});
;(function (root, factory) {
    if (typeof exports !== "undefined") {
        module.exports = factory(window.dataLayer, window._gaq);
    } else {
        root.track_event = factory(root.dataLayer, root._gaq);
    }
}(this, function (dataLayer, _gaq) {
    function track_event(category, action, label, value) {
        value = value || '';
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({'event': category, 'eventAction': action, 'eventLabel': label, 'eventValue': value});
        } else if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent', category, action, label, value]);
        } else if (typeof console !== 'undefined') {
            console.debug('TRACK EVENT', category, action, label, value);
        }
    }

    return track_event;
}));
;(function (root, factory) {
    if (typeof exports !== "undefined") {
        module.exports = factory(require("jquery"), window.dataLayer, window._gaq);
    } else {
        factory(root.$, root.dataLayer, root._gaq);
    }
}(this, function ($, dataLayer, _gaq) {
    var defaults = {
        'attribute': 'activity',
        'delim': ',',
        'events': ['click'],
        'label_callback': null,
        'value_callback': null
    }, track_event = function (config) {
        var $this = $(this);
        var activity = $this.attr(config.attribute);
        var logger = bows('track_event');
        if (typeof activity === "undefined") {
            return;
        }
        var params = activity.split(config.delim);
        if (params.length >= 2) {
            if (params.length < 3) {
                var label = (config.label_callback) ? [config.label_callback.apply(this)] : [];
                params = params.concat(label);
            }
            if (params.length == 3) {
                var value = (config.value_callback) ? [config.value_callback.apply(this)] : [];
                params = params.concat(value);
            }
            var data = {
                'event': params[0],
                'eventAction': params[1] || '',
                'eventLabel': params[2] || '',
                'eventValue': params[3] || ''
            };
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push(data);
            }
            logger(data);
        }
    }, bind_event = function (config) {
        var $this = $(this);
        for (var i = 0; i < config.events.length; i++) {
            $this.bind(config.events[i], function () {
                track_event.apply(this, [config]);
            });
        }
    };
    $.fn.pushActivity = function (settings) {
        settings || (settings = {});
        settings = $.extend({}, defaults, settings);
        track_event.apply(this, [settings]);
        return this;
    };
    $.fn.trackActivities = function (settings) {
        settings || (settings = {});
        settings = $.extend({}, defaults, settings);
        this.each(function () {
            if ($(this).attr(settings.attribute)) {
                bind_event.apply(this, [settings]);
            }
        });
        return this;
    };
}));
;jQuery.extend(jQuery.expr[":"], {
    current: function (a) {
        return matches_path(a);
    }
});

function matches_path(a) {
    var path = window.location.pathname;
    var href = $(a).attr('href');
    if (href == path) return true;
    return false;
};!function (e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : "undefined" != typeof window ? window.bows = e() : "undefined" != typeof global ? global.bows = e() : "undefined" != typeof self && (self.bows = e())
}(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {exports: {}};
                t[o][0].call(f.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }

        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function (require, module, exports) {
            (function () {
                function checkColorSupport() {
                    var chrome = !!window.chrome, firefox = /firefox/i.test(navigator.userAgent),
                        firebug = firefox && !!window.console.exception;
                    return chrome || firebug;
                }

                if (typeof Array.prototype.forEach != 'function') {
                    Array.prototype.forEach = function (callback) {
                        for (var i = 0; i < this.length; i++) {
                            callback.apply(this, [this[i], i, this]);
                        }
                    };
                }
                var inNode = typeof window === 'undefined', ls = !inNode && window.localStorage, debug = ls.debug,
                    logger = require('andlog'), hue = 0, padLength = 15, noop = function () {
                    }, colorsSupported = ls.debugColors || checkColorSupport(), yieldColor, bows, debugRegex;
                yieldColor = function () {
                    var goldenRatio = 0.618033988749895;
                    hue += goldenRatio;
                    hue = hue % 1;
                    return hue * 360;
                };
                debugRegex = debug && debug[0] === '/' && new RegExp(debug.substring(1, debug.length - 1));
                bows = function (str) {
                    var msg, colorString, logfn;
                    msg = (str.slice(0, padLength));
                    msg += Array(padLength + 3 - msg.length).join(' ') + '|';
                    if (debugRegex && !str.match(debugRegex)) return noop;
                    if (colorsSupported) {
                        var color = yieldColor();
                        msg = "%c" + msg;
                        colorString = "color: hsl(" + (color) + ",99%,40%); font-weight: bold";
                        logfn = logger.log.bind(logger, msg, colorString);
                        ['log', 'debug', 'warn', 'error', 'info'].forEach(function (f) {
                            logfn[f] = logger[f].bind(logger, msg, colorString);
                        });
                    } else {
                        logfn = logger.log.bind(logger, msg);
                        ['log', 'debug', 'warn', 'error', 'info'].forEach(function (f) {
                            logfn[f] = logger[f].bind(logger, msg);
                        });
                    }
                    return logfn;
                };
                bows.config = function (config) {
                    if (config.padLength) {
                        this.padLength = config.padLength;
                    }
                };
                if (typeof module !== 'undefined') {
                    module.exports = bows;
                } else {
                    window.bows = bows;
                }
            }).call();
        }, {"andlog": 2}], 2: [function (require, module, exports) {
            (function () {
                var inNode = typeof window === 'undefined', ls = !inNode && window.localStorage, out = {};
                if (inNode) {
                    module.exports = console;
                    return;
                }
                if (ls && ls.debug && window.console) {
                    out = window.console;
                } else {
                    var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),
                        l = methods.length, fn = function () {
                        };
                    while (l--) {
                        out[methods[l]] = fn;
                    }
                }
                if (typeof exports !== 'undefined') {
                    module.exports = out;
                } else {
                    window.console = out;
                }
            })();
        }, {}]
    }, {}, [1])
    (1)
});
;
;(function () {
    var log_methods, method, _i, _len;
    log_methods = ['error', 'warn', 'info', 'debug', 'log'];
    if (window.console) {
        window.debug = window.console;
        for (_i = 0, _len = log_methods.length; _i < _len; _i++) {
            method = log_methods[_i];
            if (!window.debug[method]) {
                window.debug[method] = window.console.log;
            }
        }
    } else {
        window.console = {};
        var empty_logger = function () {
        };
        for (_i = 0, _len = log_methods.length; _i < _len; _i++) {
            window.console[log_methods[_i]] = empty_logger;
        }
        window.debug = window.console;
    }
}).call(this);
;$(function () {
    $("#id_localization_country").change(function () {
        $("#country_localization_form").submit();
    });
});
;$(function () {
    $(".notification-dismiss").click(function (e) {
        e.preventDefault();
        var notice = $(this).closest('.notifications-note');
        notice.hide();
        var cookie_name = notice.data('cookie');
        $.cookie(cookie_name, (new Date()).getTime(), {'path': '/', 'expires': 365});
    });
    var notification_link = $(".notification-link");
    notification_link.attr('href', notification_link.attr('href') + document.location.search);
});
;!function ($) {
    "use strict";
    $(function () {
        $.support.transition = (function () {
            var transitionEnd = (function () {
                var el = document.createElement('bootstrap'), transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd otransitionend',
                    'transition': 'transitionend'
                }, name
                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name]
                    }
                }
            }())
            return transitionEnd && {end: transitionEnd}
        })()
    })
}(window.jQuery);
;!function ($) {
    "use strict";
    var dismiss = '[data-dismiss="alert"]', Alert = function (el) {
        $(el).on('click', dismiss, this.close)
    }
    Alert.prototype.close = function (e) {
        var $this = $(this), selector = $this.attr('data-target'), $parent
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        $parent = $(selector)
        e && e.preventDefault()
        $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())
        $parent.trigger(e = $.Event('close'))
        if (e.isDefaultPrevented()) return
        $parent.removeClass('in')

        function removeElement() {
            $parent.trigger('closed').remove()
        }

        $.support.transition && $parent.hasClass('fade') ? $parent.on($.support.transition.end, removeElement) : removeElement()
    }
    var old = $.fn.alert
    $.fn.alert = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('alert')
            if (!data) $this.data('alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }
    $.fn.alert.Constructor = Alert
    $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
    }
    $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)
}(window.jQuery);
;!function ($) {
    "use strict";
    var Modal = function (element, options) {
        this.options = options
        this.$element = $(element).delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
        this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
    }
    Modal.prototype = {
        constructor: Modal, toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']()
        }, show: function () {
            var that = this, e = $.Event('show')
            this.$element.trigger(e)
            if (this.isShown || e.isDefaultPrevented()) return
            this.isShown = true
            this.escape()
            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade')
                if (!that.$element.parent().length) {
                    that.$element.appendTo(document.body)
                }
                that.$element.show()
                if (transition) {
                    that.$element[0].offsetWidth
                }
                that.$element.addClass('in').attr('aria-hidden', false)
                that.enforceFocus()
                transition ? that.$element.one($.support.transition.end, function () {
                    that.$element.focus().trigger('shown')
                }) : that.$element.focus().trigger('shown')
            })
        }, hide: function (e) {
            e && e.preventDefault()
            var that = this
            e = $.Event('hide')
            this.$element.trigger(e)
            if (!this.isShown || e.isDefaultPrevented()) return
            this.isShown = false
            this.escape()
            $(document).off('focusin.modal')
            this.$element.removeClass('in').attr('aria-hidden', true)
            $.support.transition && this.$element.hasClass('fade') ? this.hideWithTransition() : this.hideModal()
        }, enforceFocus: function () {
            var that = this
            $(document).on('focusin.modal', function (e) {
                if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                    that.$element.focus()
                }
            })
        }, escape: function () {
            var that = this
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.modal', function (e) {
                    e.which == 27 && that.hide()
                })
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.modal')
            }
        }, hideWithTransition: function () {
            var that = this, timeout = setTimeout(function () {
                that.$element.off($.support.transition.end)
                that.hideModal()
            }, 500)
            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout)
                that.hideModal()
            })
        }, hideModal: function () {
            var that = this
            this.$element.hide()
            this.backdrop(function () {
                that.removeBackdrop()
                that.$element.trigger('hidden')
            })
        }, removeBackdrop: function () {
            this.$backdrop.remove()
            this.$backdrop = null
        }, backdrop: function (callback) {
            var that = this, animate = this.$element.hasClass('fade') ? 'fade' : ''
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate
                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body)
                this.$backdrop.click(this.options.backdrop == 'static' ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this))
                if (doAnimate) this.$backdrop[0].offsetWidth
                this.$backdrop.addClass('in')
                if (!callback) return
                doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in')
                $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback) : callback()
            } else if (callback) {
                callback()
            }
        }
    }
    var old = $.fn.modal
    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('modal'),
                options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }
    $.fn.modal.defaults = {backdrop: true, keyboard: true, show: true}
    $.fn.modal.Constructor = Modal
    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }
    $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this), href = $this.attr('href'),
            $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))),
            option = $target.data('modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data())
        e.preventDefault()
        $target.modal(option).one('hide', function () {
            $this.focus()
        })
    })
}(window.jQuery);
;!function ($) {
    "use strict";
    var toggle = '[data-toggle=dropdown]', Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
            $el.parent().removeClass('open')
        })
    }
    Dropdown.prototype = {
        constructor: Dropdown, toggle: function (e) {
            var $this = $(this), $parent, isActive
            if ($this.is('.disabled, :disabled')) return
            $parent = getParent($this)
            isActive = $parent.hasClass('open')
            clearMenus()
            if (!isActive) {
                $parent.toggleClass('open')
            }
            $this.focus()
            return false
        }, keydown: function (e) {
            var $this, $items, $active, $parent, isActive, index
            if (!/(38|40|27)/.test(e.keyCode)) return
            $this = $(this)
            e.preventDefault()
            e.stopPropagation()
            if ($this.is('.disabled, :disabled')) return
            $parent = getParent($this)
            isActive = $parent.hasClass('open')
            if (!isActive || (isActive && e.keyCode == 27)) {
                if (e.which == 27) $parent.find(toggle).focus()
                return $this.click()
            }
            $items = $('[role=menu] li:not(.divider):visible a', $parent)
            if (!$items.length) return
            index = $items.index($items.filter(':focus'))
            if (e.keyCode == 38 && index > 0) index--
            if (e.keyCode == 40 && index < $items.length - 1) index++
            if (!~index) index = 0
            $items.eq(index).focus()
        }
    }

    function clearMenus() {
        $(toggle).each(function () {
            getParent($(this)).removeClass('open')
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target'), $parent
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        $parent = selector && $(selector)
        if (!$parent || !$parent.length) $parent = $this.parent()
        return $parent
    }

    var old = $.fn.dropdown
    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('dropdown')
            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }
    $.fn.dropdown.Constructor = Dropdown
    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }
    $(document).on('click.dropdown.data-api', clearMenus).on('click.dropdown.data-api', '.dropdown form', function (e) {
        e.stopPropagation()
    }).on('.dropdown-menu', function (e) {
        e.stopPropagation()
    }).on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)
}(window.jQuery);
;!function ($) {
    "use strict";

    function ScrollSpy(element, options) {
        var process = $.proxy(this.process, this), $element = $(element).is('body') ? $(window) : $(element), href
        this.options = $.extend({}, $.fn.scrollspy.defaults, options)
        this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
        this.selector = (this.options.target || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' .nav li > a'
        this.$body = $('body')
        this.refresh()
        this.process()
    }

    ScrollSpy.prototype = {
        constructor: ScrollSpy, refresh: function () {
            var self = this, $targets
            this.offsets = $([])
            this.targets = $([])
            $targets = this.$body.find(this.selector).map(function () {
                var $el = $(this), href = $el.data('target') || $el.attr('href'), $href = /^#\w/.test(href) && $(href)
                return ($href && $href.length && [[$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]]) || null
            }).sort(function (a, b) {
                return a[0] - b[0]
            }).each(function () {
                self.offsets.push(this[0])
                self.targets.push(this[1])
            })
        }, process: function () {
            var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                maxScroll = scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets,
                activeTarget = this.activeTarget, i
            if (scrollTop >= maxScroll) {
                return activeTarget != (i = targets.last()[0]) && this.activate(i)
            }
            for (i = offsets.length; i--;) {
                activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
            }
        }, activate: function (target) {
            var active, selector
            this.activeTarget = target
            $(this.selector).parent('.active').removeClass('active')
            selector = this.selector
                + '[data-target="' + target + '"],'
                + this.selector + '[href="' + target + '"]'
            active = $(selector).parent('li').addClass('active')
            if (active.parent('.dropdown-menu').length) {
                active = active.closest('li.dropdown').addClass('active')
            }
            active.trigger('activate')
        }
    }
    var old = $.fn.scrollspy
    $.fn.scrollspy = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('scrollspy'), options = typeof option == 'object' && option
            if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.scrollspy.Constructor = ScrollSpy
    $.fn.scrollspy.defaults = {offset: 10}
    $.fn.scrollspy.noConflict = function () {
        $.fn.scrollspy = old
        return this
    }
    $(window).on('load', function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this)
            $spy.scrollspy($spy.data())
        })
    })
}(window.jQuery);
;!function ($) {
    "use strict";
    var Tab = function (element) {
        this.element = $(element)
    }
    Tab.prototype = {
        constructor: Tab, show: function () {
            var $this = this.element, $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'), previous, $target, e
            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
            }
            if ($this.parent('li').hasClass('active')) return
            previous = $ul.find('.active:last a')[0]
            e = $.Event('show', {relatedTarget: previous})
            $this.trigger(e)
            if (e.isDefaultPrevented()) return
            $target = $(selector)
            this.activate($this.parent('li'), $ul)
            this.activate($target, $target.parent(), function () {
                $this.trigger({type: 'shown', relatedTarget: previous})
            })
        }, activate: function (element, container, callback) {
            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade')

            function next() {
                $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
                element.addClass('active')
                if (transition) {
                    element[0].offsetWidth
                    element.addClass('in')
                } else {
                    element.removeClass('fade')
                }
                if (element.parent('.dropdown-menu')) {
                    element.closest('li.dropdown').addClass('active')
                }
                callback && callback()
            }

            transition ? $active.one($.support.transition.end, next) : next()
            $active.removeClass('in')
        }
    }
    var old = $.fn.tab
    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('tab')
            if (!data) $this.data('tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.tab.Constructor = Tab
    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }
    $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
}(window.jQuery);
;!function ($) {
    "use strict";
    var Tooltip = function (element, options) {
        this.init('tooltip', element, options)
    }
    Tooltip.prototype = {
        constructor: Tooltip, init: function (type, element, options) {
            var eventIn, eventOut, triggers, trigger, i
            this.type = type
            this.$element = $(element)
            this.options = this.getOptions(options)
            this.enabled = true
            triggers = this.options.trigger.split(' ')
            for (i = triggers.length; i--;) {
                trigger = triggers[i]
                if (trigger == 'click') {
                    this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
                } else if (trigger != 'manual') {
                    eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
                    eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
                    this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                    this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
                }
            }
            this.options.selector ? (this._options = $.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            })) : this.fixTitle()
        }, getOptions: function (options) {
            options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)
            if (options.delay && typeof options.delay == 'number') {
                options.delay = {show: options.delay, hide: options.delay}
            }
            return options
        }, enter: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type)
            if (!self.options.delay || !self.options.delay.show) return self.show()
            clearTimeout(this.timeout)
            self.hoverState = 'in'
            this.timeout = setTimeout(function () {
                if (self.hoverState == 'in') self.show()
            }, self.options.delay.show)
        }, leave: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type)
            if (this.timeout) clearTimeout(this.timeout)
            if (!self.options.delay || !self.options.delay.hide) return self.hide()
            self.hoverState = 'out'
            this.timeout = setTimeout(function () {
                if (self.hoverState == 'out') self.hide()
            }, self.options.delay.hide)
        }, show: function () {
            var $tip, pos, actualWidth, actualHeight, placement, tp, e = $.Event('show')
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $tip = this.tip()
                this.setContent()
                if (this.options.animation) {
                    $tip.addClass('fade')
                }
                placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement
                $tip.detach().css({top: 0, left: 0, display: 'block'})
                this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
                pos = this.getPosition()
                actualWidth = $tip[0].offsetWidth
                actualHeight = $tip[0].offsetHeight
                switch (placement) {
                    case'bottom':
                        tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
                        break
                    case'top':
                        tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
                        break
                    case'left':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
                        break
                    case'right':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
                        break
                }
                this.applyPlacement(tp, placement)
                this.$element.trigger('shown')
            }
        }, applyPlacement: function (offset, placement) {
            var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, actualWidth,
                actualHeight, delta, replace
            $tip.offset(offset).addClass(placement).addClass('in')
            actualWidth = $tip[0].offsetWidth
            actualHeight = $tip[0].offsetHeight
            if (placement == 'top' && actualHeight != height) {
                offset.top = offset.top + height - actualHeight
                replace = true
            }
            if (placement == 'bottom' || placement == 'top') {
                delta = 0
                if (offset.left < 0) {
                    delta = offset.left * -2
                    offset.left = 0
                    $tip.offset(offset)
                    actualWidth = $tip[0].offsetWidth
                    actualHeight = $tip[0].offsetHeight
                }
                this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
            } else {
                this.replaceArrow(actualHeight - height, actualHeight, 'top')
            }
            if (replace) $tip.offset(offset)
        }, replaceArrow: function (delta, dimension, position) {
            this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
        }, setContent: function () {
            var $tip = this.tip(), title = this.getTitle()
            $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
            $tip.removeClass('fade in top bottom left right')
        }, hide: function () {
            var that = this, $tip = this.tip(), e = $.Event('hide')
            this.$element.trigger(e)
            if (e.isDefaultPrevented()) return
            $tip.removeClass('in')

            function removeWithAnimation() {
                var timeout = setTimeout(function () {
                    $tip.off($.support.transition.end).detach()
                }, 500)
                $tip.one($.support.transition.end, function () {
                    clearTimeout(timeout)
                    $tip.detach()
                })
            }

            $.support.transition && this.$tip.hasClass('fade') ? removeWithAnimation() : $tip.detach()
            this.$element.trigger('hidden')
            return this
        }, fixTitle: function () {
            var $e = this.$element
            if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
                $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
            }
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var el = this.$element[0]
            return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
                width: el.offsetWidth,
                height: el.offsetHeight
            }, this.$element.offset())
        }, getTitle: function () {
            var title, $e = this.$element, o = this.options
            title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)
            return title
        }, tip: function () {
            return this.$tip = this.$tip || $(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            if (!this.$element[0].parentNode) {
                this.hide()
                this.$element = null
                this.options = null
            }
        }, enable: function () {
            this.enabled = true
        }, disable: function () {
            this.enabled = false
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (e) {
            var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
            self.tip().hasClass('in') ? self.hide() : self.show()
        }, destroy: function () {
            this.hide().$element.off('.' + this.type).removeData(this.type)
        }
    }
    var old = $.fn.tooltip
    $.fn.tooltip = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('tooltip'), options = typeof option == 'object' && option
            if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.tooltip.Constructor = Tooltip
    $.fn.tooltip.defaults = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false
    }
    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
    }
}(window.jQuery);
;!function ($) {
    "use strict";
    var Popover = function (element, options) {
        this.init('popover', element, options)
    }
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
        constructor: Popover, setContent: function () {
            var $tip = this.tip(), title = this.getTitle(), content = this.getContent()
            $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
            $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)
            $tip.removeClass('fade top bottom left right in')
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var content, $e = this.$element, o = this.options
            content = (typeof o.content == 'function' ? o.content.call($e[0]) : o.content) || $e.attr('data-content')
            return content
        }, tip: function () {
            if (!this.$tip) {
                this.$tip = $(this.options.template)
            }
            return this.$tip
        }, destroy: function () {
            this.hide().$element.off('.' + this.type).removeData(this.type)
        }
    })
    var old = $.fn.popover
    $.fn.popover = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('popover'), options = typeof option == 'object' && option
            if (!data) $this.data('popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.popover.Constructor = Popover
    $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })
    $.fn.popover.noConflict = function () {
        $.fn.popover = old
        return this
    }
}(window.jQuery);
;!function ($) {
    "use strict";
    var Button = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.button.defaults, options)
    }
    Button.prototype.setState = function (state) {
        var d = 'disabled', $el = this.$element, data = $el.data(), val = $el.is('input') ? 'val' : 'html'
        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())
        $el[val](data[state] || this.options[state])
        setTimeout(function () {
            state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
        }, 0)
    }
    Button.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]')
        $parent && $parent.find('.active').removeClass('active')
        this.$element.toggleClass('active')
    }
    var old = $.fn.button
    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('button'), options = typeof option == 'object' && option
            if (!data) $this.data('button', (data = new Button(this, options)))
            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }
    $.fn.button.defaults = {loadingText: 'loading...'}
    $.fn.button.Constructor = Button
    $.fn.button.noConflict = function () {
        $.fn.button = old
        return this
    }
    $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
        var $btn = $(e.target)
        if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
        $btn.button('toggle')
    })
}(window.jQuery);
;!function ($) {
    "use strict";
    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.collapse.defaults, options)
        if (this.options.parent) {
            this.$parent = $(this.options.parent)
        }
        this.options.toggle && this.toggle()
    }
    Collapse.prototype = {
        constructor: Collapse, dimension: function () {
            var hasWidth = this.$element.hasClass('width')
            return hasWidth ? 'width' : 'height'
        }, show: function () {
            var dimension, scroll, actives, hasData
            if (this.transitioning || this.$element.hasClass('in')) return
            dimension = this.dimension()
            scroll = $.camelCase(['scroll', dimension].join('-'))
            actives = this.$parent && this.$parent.find('> .accordion-group > .in')
            if (actives && actives.length) {
                hasData = actives.data('collapse')
                if (hasData && hasData.transitioning) return
                actives.collapse('hide')
                hasData || actives.data('collapse', null)
            }
            this.$element[dimension](0)
            this.transition('addClass', $.Event('show'), 'shown')
            $.support.transition && this.$element[dimension](this.$element[0][scroll])
        }, hide: function () {
            var dimension
            if (this.transitioning || !this.$element.hasClass('in')) return
            dimension = this.dimension()
            this.reset(this.$element[dimension]())
            this.transition('removeClass', $.Event('hide'), 'hidden')
            this.$element[dimension](0)
        }, reset: function (size) {
            var dimension = this.dimension()
            this.$element.removeClass('collapse')
                [dimension](size || 'auto')
                [0].offsetWidth
            this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')
            return this
        }, transition: function (method, startEvent, completeEvent) {
            var that = this, complete = function () {
                if (startEvent.type == 'show') that.reset()
                that.transitioning = 0
                that.$element.trigger(completeEvent)
            }
            this.$element.trigger(startEvent)
            if (startEvent.isDefaultPrevented()) return
            this.transitioning = 1
            this.$element[method]('in')
            $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete()
        }, toggle: function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']()
        }
    }
    var old = $.fn.collapse
    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('collapse'),
                options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.collapse.defaults = {toggle: true}
    $.fn.collapse.Constructor = Collapse
    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old
        return this
    }
    $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
        var $this = $(this), href,
            target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''),
            option = $(target).data('collapse') ? 'toggle' : $this.data()
        $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
        $(target).collapse(option)
    })
}(window.jQuery);
;!function ($) {
    "use strict";
    var Carousel = function (element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.options.pause == 'hover' && this.$element.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this))
    }
    Carousel.prototype = {
        cycle: function (e) {
            if (!e) this.paused = false
            if (this.interval) clearInterval(this.interval);
            this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
            return this
        }, getActiveIndex: function () {
            this.$active = this.$element.find('.item.active')
            this.$items = this.$active.parent().children()
            return this.$items.index(this.$active)
        }, to: function (pos) {
            var activeIndex = this.getActiveIndex(), that = this
            if (pos > (this.$items.length - 1) || pos < 0) return
            if (this.sliding) {
                return this.$element.one('slid', function () {
                    that.to(pos)
                })
            }
            if (activeIndex == pos) {
                return this.pause().cycle()
            }
            return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
        }, pause: function (e) {
            if (!e) this.paused = true
            if (this.$element.find('.next, .prev').length && $.support.transition.end) {
                this.$element.trigger($.support.transition.end)
                this.cycle()
            }
            clearInterval(this.interval)
            this.interval = null
            return this
        }, next: function () {
            if (this.sliding) return
            return this.slide('next')
        }, prev: function () {
            if (this.sliding) return
            return this.slide('prev')
        }, slide: function (type, next) {
            var $active = this.$element.find('.item.active'), $next = next || $active[type](),
                isCycling = this.interval, direction = type == 'next' ? 'left' : 'right',
                fallback = type == 'next' ? 'first' : 'last', that = this, e
            this.sliding = true
            isCycling && this.pause()
            $next = $next.length ? $next : this.$element.find('.item')[fallback]()
            e = $.Event('slide', {relatedTarget: $next[0], direction: direction})
            if ($next.hasClass('active')) return
            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active')
                this.$element.one('slid', function () {
                    var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                    $nextIndicator && $nextIndicator.addClass('active')
                })
            }
            if ($.support.transition && this.$element.hasClass('slide')) {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $next.addClass(type)
                $next[0].offsetWidth
                $active.addClass(direction)
                $next.addClass(direction)
                this.$element.one($.support.transition.end, function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function () {
                        that.$element.trigger('slid')
                    }, 0)
                })
            } else {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $active.removeClass('active')
                $next.addClass('active')
                this.sliding = false
                this.$element.trigger('slid')
            }
            isCycling && this.cycle()
            return this
        }
    }
    var old = $.fn.carousel
    $.fn.carousel = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('carousel'),
                options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option),
                action = typeof option == 'string' ? option : options.slide
            if (!data) $this.data('carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }
    $.fn.carousel.defaults = {interval: 5000, pause: 'hover'}
    $.fn.carousel.Constructor = Carousel
    $.fn.carousel.noConflict = function () {
        $.fn.carousel = old
        return this
    }
    $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
        var $this = $(this), href,
            $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')),
            options = $.extend({}, $target.data(), $this.data()), slideIndex
        $target.carousel(options)
        if (slideIndex = $this.attr('data-slide-to')) {
            $target.data('carousel').pause().to(slideIndex).cycle()
        }
        e.preventDefault()
    })
}(window.jQuery);
;var csrftoken = $.cookie('csrftoken');

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    crossDomain: false, beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
jQuery(function ($) {
    var token = $.cookie("csrftoken");
    if (token) {
        let inputs = $("input[name='csrfmiddlewaretoken']");
        for (let index = 0; index < inputs.length; index++) {
            let input = inputs[index];
            input.dataset.overwritten = input.value + ((input.dataset.overwritten && ";") || "") + (input.dataset.overwritten || "");
            input.value = token;
        }
    }
});
;$(function () {
    $('a').trackActivities();
    $('select').trackActivities({
        'events': ['change'], 'label_callback': function () {
            return $(this).find(':selected').text();
        }
    });
    $("#id_localization_country").change(function () {
        $("#country_localization_form").submit();
    });
    $("#id_select_language").change(function () {
        $("#set_language_form").submit();
    });
    if (typeof (stickybits) !== 'undefined' && $(window).width() > 800) {
        stickybits('.stickthis');
    }
});
;
;(function () {
    function n(n, t, e) {
        e = (e || 0) - 1;
        for (var r = n ? n.length : 0; ++e < r;) if (n[e] === t) return e;
        return -1
    }

    function t(t, e) {
        var r = typeof e;
        if (t = t.l, "boolean" == r || null == e) return t[e] ? 0 : -1;
        "number" != r && "string" != r && (r = "object");
        var u = "number" == r ? e : _ + e;
        return t = (t = t[r]) && t[u], "object" == r ? t && -1 < n(t, e) ? 0 : -1 : t ? 0 : -1
    }

    function e(n) {
        var t = this.l, e = typeof n;
        if ("boolean" == e || null == n) t[n] = !0; else {
            "number" != e && "string" != e && (e = "object");
            var r = "number" == e ? n : _ + n, t = t[e] || (t[e] = {});
            "object" == e ? (t[r] || (t[r] = [])).push(n) : t[r] = !0
        }
    }

    function r(n) {
        return n.charCodeAt(0)
    }

    function u(n, t) {
        var e = n.m, r = t.m;
        if (e !== r) {
            if (e > r || typeof e == "undefined") return 1;
            if (e < r || typeof r == "undefined") return -1
        }
        return n.n - t.n
    }

    function o(n) {
        var t = -1, r = n.length, u = n[0], o = n[0 | r / 2], a = n[r - 1];
        if (u && typeof u == "object" && o && typeof o == "object" && a && typeof a == "object") return !1;
        for (u = l(), u["false"] = u["null"] = u["true"] = u.undefined = !1, o = l(), o.k = n, o.l = u, o.push = e; ++t < r;) o.push(n[t]);
        return o
    }

    function a(n) {
        return "\\" + Z[n]
    }

    function i() {
        return y.pop() || []
    }

    function l() {
        return m.pop() || {
            k: null,
            l: null,
            m: null,
            "false": !1,
            n: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            o: null
        }
    }

    function f(n) {
        return typeof n.toString != "function" && typeof (n + "") == "string"
    }

    function c() {
    }

    function p(n) {
        n.length = 0, y.length < j && y.push(n)
    }

    function s(n) {
        var t = n.l;
        t && s(t), n.k = n.l = n.m = n.object = n.number = n.string = n.o = null, m.length < j && m.push(n)
    }

    function g(n, t, e) {
        t || (t = 0), typeof e == "undefined" && (e = n ? n.length : 0);
        var r = -1;
        e = e - t || 0;
        for (var u = Array(0 > e ? 0 : e); ++r < e;) u[r] = n[t + r];
        return u
    }

    function h(e) {
        function y(n) {
            return n && typeof n == "object" && !Je(n) && de.call(n, "__wrapped__") ? n : new m(n)
        }

        function m(n, t) {
            this.__chain__ = !!t, this.__wrapped__ = n
        }

        function j(n, t, e, r, u) {
            if (e) {
                var o = e(n);
                if (typeof o != "undefined") return o
            }
            if (!_t(n)) return n;
            var a = ke.call(n);
            if (!U[a] || !We.nodeClass && f(n)) return n;
            var l = qe[a];
            switch (a) {
                case z:
                case q:
                    return new l(+n);
                case G:
                case H:
                    return new l(n);
                case M:
                    return o = l(n.source, I.exec(n)), o.lastIndex = n.lastIndex, o
            }
            if (a = Je(n), t) {
                var c = !r;
                r || (r = i()), u || (u = i());
                for (var s = r.length; s--;) if (r[s] == n) return u[s];
                o = a ? l(n.length) : {}
            } else o = a ? g(n) : er({}, n);
            return a && (de.call(n, "index") && (o.index = n.index), de.call(n, "input") && (o.input = n.input)), t ? (r.push(n), u.push(o), (a ? tr : or)(n, function (n, a) {
                o[a] = j(n, t, e, r, u)
            }), c && (p(r), p(u)), o) : o
        }

        function Z(n, t, e) {
            if (typeof n != "function") return Ht;
            if (typeof t == "undefined") return n;
            var r = n.__bindData__ || We.funcNames && !n.name;
            if (typeof r == "undefined") {
                var u = P && ye.call(n);
                We.funcNames || !u || A.test(u) || (r = !0), (We.funcNames || !r) && (r = !We.funcDecomp || P.test(u), Ge(n, r))
            }
            if (true !== r && r && 1 & r[1]) return n;
            switch (e) {
                case 1:
                    return function (e) {
                        return n.call(t, e)
                    };
                case 2:
                    return function (e, r) {
                        return n.call(t, e, r)
                    };
                case 3:
                    return function (e, r, u) {
                        return n.call(t, e, r, u)
                    };
                case 4:
                    return function (e, r, u, o) {
                        return n.call(t, e, r, u, o)
                    }
            }
            return Gt(n, t)
        }

        function tt(n, t, e, r) {
            r = (r || 0) - 1;
            for (var u = n ? n.length : 0, o = []; ++r < u;) {
                var a = n[r];
                if (a && typeof a == "object" && typeof a.length == "number" && (Je(a) || vt(a))) {
                    t || (a = tt(a, t, e));
                    var i = -1, l = a.length, f = o.length;
                    for (o.length += l; ++i < l;) o[f++] = a[i]
                } else e || o.push(a)
            }
            return o
        }

        function et(n, t, e, r, u, o) {
            if (e) {
                var a = e(n, t);
                if (typeof a != "undefined") return !!a
            }
            if (n === t) return 0 !== n || 1 / n == 1 / t;
            if (n === n && !(n && Y[typeof n] || t && Y[typeof t])) return !1;
            if (null == n || null == t) return n === t;
            var l = ke.call(n), c = ke.call(t);
            if (l == L && (l = J), c == L && (c = J), l != c) return !1;
            switch (l) {
                case z:
                case q:
                    return +n == +t;
                case G:
                    return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
                case M:
                case H:
                    return n == oe(t)
            }
            if (c = l == T, !c) {
                if (de.call(n, "__wrapped__") || de.call(t, "__wrapped__")) return et(n.__wrapped__ || n, t.__wrapped__ || t, e, r, u, o);
                if (l != J || !We.nodeClass && (f(n) || f(t))) return !1;
                var l = !We.argsObject && vt(n) ? re : n.constructor, s = !We.argsObject && vt(t) ? re : t.constructor;
                if (l != s && !(bt(l) && l instanceof l && bt(s) && s instanceof s)) return !1
            }
            for (s = !u, u || (u = i()), o || (o = i()), l = u.length; l--;) if (u[l] == n) return o[l] == t;
            var g = 0, a = !0;
            if (u.push(n), o.push(t), c) {
                if (l = n.length, g = t.length, a = g == n.length, !a && !r) return a;
                for (; g--;) if (c = l, s = t[g], r) for (; c-- && !(a = et(n[c], s, e, r, u, o));) ; else if (!(a = et(n[g], s, e, r, u, o))) break;
                return a
            }
            return ur(t, function (t, i, l) {
                return de.call(l, i) ? (g++, a = de.call(n, i) && et(n[i], t, e, r, u, o)) : void 0
            }), a && !r && ur(n, function (n, t, e) {
                return de.call(e, t) ? a = -1 < --g : void 0
            }), s && (p(u), p(o)), a
        }

        function ut(n, t, e, r, u) {
            (Je(t) ? St : or)(t, function (t, o) {
                var a, i, l = t, f = n[o];
                if (t && ((i = Je(t)) || ar(t))) {
                    for (l = r.length; l--;) if (a = r[l] == t) {
                        f = u[l];
                        break
                    }
                    if (!a) {
                        var c;
                        e && (l = e(f, t), c = typeof l != "undefined") && (f = l), c || (f = i ? Je(f) ? f : [] : ar(f) ? f : {}), r.push(t), u.push(f), c || ut(f, t, e, r, u)
                    }
                } else e && (l = e(f, t), typeof l == "undefined" && (l = t)), typeof l != "undefined" && (f = l);
                n[o] = f
            })
        }

        function at(e, r, u) {
            var a = -1, l = st(), f = e ? e.length : 0, c = [], g = !r && f >= w && l === n, h = u || g ? i() : c;
            if (g) {
                var v = o(h);
                v ? (l = t, h = v) : (g = !1, h = u ? h : (p(h), c))
            }
            for (; ++a < f;) {
                var v = e[a], y = u ? u(v, a, e) : v;
                (r ? !a || h[h.length - 1] !== y : 0 > l(h, y)) && ((u || g) && h.push(y), c.push(v))
            }
            return g ? (p(h.k), s(h)) : u && p(h), c
        }

        function it(n) {
            return function (t, e, r) {
                var u = {};
                if (e = y.createCallback(e, r, 3), Je(t)) {
                    r = -1;
                    for (var o = t.length; ++r < o;) {
                        var a = t[r];
                        n(u, a, e(a, r, t), t)
                    }
                } else tr(t, function (t, r, o) {
                    n(u, t, e(t, r, o), o)
                });
                return u
            }
        }

        function lt(n, t, e, r, u, o) {
            var a = 1 & t, i = 2 & t, l = 4 & t, f = 8 & t, c = 16 & t, p = 32 & t, s = n;
            if (!i && !bt(n)) throw new ae;
            c && !e.length && (t &= -17, c = e = !1), p && !r.length && (t &= -33, p = r = !1);
            var g = n && n.__bindData__;
            if (g) return !a || 1 & g[1] || (g[4] = u), !a && 1 & g[1] && (t |= 8), !l || 4 & g[1] || (g[5] = o), c && _e.apply(g[2] || (g[2] = []), e), p && _e.apply(g[3] || (g[3] = []), r), g[1] |= t, lt.apply(null, g);
            if (!a || i || l || p || !(We.fastBind || Se && c)) v = function () {
                var g = arguments, h = a ? u : this;
                return (l || c || p) && (g = Le.call(g), c && Ee.apply(g, e), p && _e.apply(g, r), l && g.length < o) ? (t |= 16, lt(n, f ? t : -4 & t, g, null, u, o)) : (i && (n = h[s]), this instanceof v ? (h = ct(n.prototype), g = n.apply(h, g), _t(g) ? g : h) : n.apply(h, g))
            }; else {
                if (c) {
                    var h = [u];
                    _e.apply(h, e)
                }
                var v = c ? Se.apply(n, h) : Se.call(n, u)
            }
            return Ge(v, Le.call(arguments)), v
        }

        function ft() {
            X.h = $, X.b = X.c = X.g = X.i = "", X.e = "t", X.j = !0;
            for (var n, t = 0; n = arguments[t]; t++) for (var e in n) X[e] = n[e];
            t = X.a, X.d = /^[^,]+/.exec(t)[0], n = ne, t = "return function(" + t + "){", e = X;
            var r = "var n,t=" + e.d + ",E=" + e.e + ";if(!t)return E;" + e.i + ";";
            e.b ? (r += "var u=t.length;n=-1;if(" + e.b + "){", We.unindexedChars && (r += "if(s(t)){t=t.split('')}"), r += "while(++n<u){" + e.g + ";}}else{") : We.nonEnumArgs && (r += "var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';" + e.g + ";}}else{"), We.enumPrototypes && (r += "var G=typeof t=='function';"), We.enumErrorProps && (r += "var F=t===k||t instanceof Error;");
            var u = [];
            if (We.enumPrototypes && u.push('!(G&&n=="prototype")'), We.enumErrorProps && u.push('!(F&&(n=="message"||n=="name"))'), e.j && e.f) r += "var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];", u.length && (r += "if(" + u.join("&&") + "){"), r += e.g + ";", u.length && (r += "}"), r += "}"; else if (r += "for(n in t){", e.j && u.push("m.call(t, n)"), u.length && (r += "if(" + u.join("&&") + "){"), r += e.g + ";", u.length && (r += "}"), r += "}", We.nonEnumShadows) {
                for (r += "if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];", k = 0; 7 > k; k++) r += "n='" + e.h[k] + "';if((!(r&&x[n])&&m.call(t,n))", e.j || (r += "||(!x[n]&&t[n]!==A[n])"), r += "){" + e.g + "}";
                r += "}"
            }
            return (e.b || We.nonEnumArgs) && (r += "}"), r += e.c + ";return E", n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L", t + r + "}")(Z, K, le, de, b, vt, Je, jt, X.f, fe, Y, Ke, H, ce, ke)
        }

        function ct(n) {
            return _t(n) ? Ie(n) : {}
        }

        function pt(n) {
            return Xe[n]
        }

        function st() {
            var t = (t = y.indexOf) === Lt ? n : t;
            return t
        }

        function gt(n) {
            var t, e;
            return !n || ke.call(n) != J || (t = n.constructor, bt(t) && !(t instanceof t)) || !We.argsClass && vt(n) || !We.nodeClass && f(n) ? !1 : We.ownLast ? (ur(n, function (n, t, r) {
                return e = de.call(r, t), !1
            }), false !== e) : (ur(n, function (n, t) {
                e = t
            }), typeof e == "undefined" || de.call(n, e))
        }

        function ht(n) {
            return Ye[n]
        }

        function vt(n) {
            return n && typeof n == "object" && typeof n.length == "number" && ke.call(n) == L || !1
        }

        function yt(n, t, e) {
            var r = He(n), u = r.length;
            for (t = Z(t, e, 3); u-- && (e = r[u], false !== t(n[e], e, n));) ;
            return n
        }

        function mt(n) {
            var t = [];
            return ur(n, function (n, e) {
                bt(n) && t.push(e)
            }), t.sort()
        }

        function dt(n) {
            for (var t = -1, e = He(n), r = e.length, u = {}; ++t < r;) {
                var o = e[t];
                u[n[o]] = o
            }
            return u
        }

        function bt(n) {
            return typeof n == "function"
        }

        function _t(n) {
            return !(!n || !Y[typeof n])
        }

        function wt(n) {
            return typeof n == "number" || ke.call(n) == G
        }

        function jt(n) {
            return typeof n == "string" || ke.call(n) == H
        }

        function xt(n) {
            for (var t = -1, e = He(n), r = e.length, u = Xt(r); ++t < r;) u[t] = n[e[t]];
            return u
        }

        function Ct(n, t, e) {
            var r = -1, u = st(), o = n ? n.length : 0, a = !1;
            return e = (0 > e ? Pe(0, o + e) : e) || 0, Je(n) ? a = -1 < u(n, t, e) : typeof o == "number" ? a = -1 < (jt(n) ? n.indexOf(t, e) : u(n, t, e)) : tr(n, function (n) {
                return ++r < e ? void 0 : !(a = n === t)
            }), a
        }

        function kt(n, t, e) {
            var r = !0;
            if (t = y.createCallback(t, e, 3), Je(n)) {
                e = -1;
                for (var u = n.length; ++e < u && (r = !!t(n[e], e, n));) ;
            } else tr(n, function (n, e, u) {
                return r = !!t(n, e, u)
            });
            return r
        }

        function Et(n, t, e) {
            var r = [];
            if (t = y.createCallback(t, e, 3), Je(n)) {
                e = -1;
                for (var u = n.length; ++e < u;) {
                    var o = n[e];
                    t(o, e, n) && r.push(o)
                }
            } else tr(n, function (n, e, u) {
                t(n, e, u) && r.push(n)
            });
            return r
        }

        function Ot(n, t, e) {
            if (t = y.createCallback(t, e, 3), !Je(n)) {
                var r;
                return tr(n, function (n, e, u) {
                    return t(n, e, u) ? (r = n, !1) : void 0
                }), r
            }
            e = -1;
            for (var u = n.length; ++e < u;) {
                var o = n[e];
                if (t(o, e, n)) return o
            }
        }

        function St(n, t, e) {
            if (t && typeof e == "undefined" && Je(n)) {
                e = -1;
                for (var r = n.length; ++e < r && false !== t(n[e], e, n);) ;
            } else tr(n, t, e);
            return n
        }

        function It(n, t, e) {
            var r = n, u = n ? n.length : 0;
            if (t = t && typeof e == "undefined" ? t : Z(t, e, 3), Je(n)) for (; u-- && false !== t(n[u], u, n);) ; else {
                if (typeof u != "number") var o = He(n),
                    u = o.length; else We.unindexedChars && jt(n) && (r = n.split(""));
                tr(n, function (n, e, a) {
                    return e = o ? o[--u] : --u, t(r[e], e, a)
                })
            }
            return n
        }

        function At(n, t, e) {
            var r = -1, u = n ? n.length : 0, o = Xt(typeof u == "number" ? u : 0);
            if (t = y.createCallback(t, e, 3), Je(n)) for (; ++r < u;) o[r] = t(n[r], r, n); else tr(n, function (n, e, u) {
                o[++r] = t(n, e, u)
            });
            return o
        }

        function Nt(n, t, e) {
            var u = -1 / 0, o = u;
            if (!t && Je(n)) {
                e = -1;
                for (var a = n.length; ++e < a;) {
                    var i = n[e];
                    i > o && (o = i)
                }
            } else t = !t && jt(n) ? r : y.createCallback(t, e, 3), tr(n, function (n, e, r) {
                e = t(n, e, r), e > u && (u = e, o = n)
            });
            return o
        }

        function Bt(n, t, e, r) {
            var u = 3 > arguments.length;
            if (t = Z(t, r, 4), Je(n)) {
                var o = -1, a = n.length;
                for (u && (e = n[++o]); ++o < a;) e = t(e, n[o], o, n)
            } else tr(n, function (n, r, o) {
                e = u ? (u = !1, n) : t(e, n, r, o)
            });
            return e
        }

        function Dt(n, t, e, r) {
            var u = 3 > arguments.length;
            return t = Z(t, r, 4), It(n, function (n, r, o) {
                e = u ? (u = !1, n) : t(e, n, r, o)
            }), e
        }

        function Pt(n) {
            var t = -1, e = n ? n.length : 0, r = Xt(typeof e == "number" ? e : 0);
            return St(n, function (n) {
                var e = Vt(++t);
                r[t] = r[e], r[e] = n
            }), r
        }

        function Rt(n, t, e) {
            var r;
            if (t = y.createCallback(t, e, 3), Je(n)) {
                e = -1;
                for (var u = n.length; ++e < u && !(r = t(n[e], e, n));) ;
            } else tr(n, function (n, e, u) {
                return !(r = t(n, e, u))
            });
            return !!r
        }

        function Ft(e) {
            var r = -1, u = st(), a = e ? e.length : 0, i = tt(arguments, !0, !0, 1), l = [], f = a >= w && u === n;
            if (f) {
                var c = o(i);
                c ? (u = t, i = c) : f = !1
            }
            for (; ++r < a;) c = e[r], 0 > u(i, c) && l.push(c);
            return f && s(i), l
        }

        function $t(n, t, e) {
            var r = 0, u = n ? n.length : 0;
            if (typeof t != "number" && null != t) {
                var o = -1;
                for (t = y.createCallback(t, e, 3); ++o < u && t(n[o], o, n);) r++
            } else if (r = t, null == r || e) return n ? n[0] : v;
            return g(n, 0, Re(Pe(0, r), u))
        }

        function Lt(t, e, r) {
            if (typeof r == "number") {
                var u = t ? t.length : 0;
                r = 0 > r ? Pe(0, u + r) : r || 0
            } else if (r) return r = zt(t, e), t[r] === e ? r : -1;
            return n(t, e, r)
        }

        function Tt(n, t, e) {
            if (typeof t != "number" && null != t) {
                var r = 0, u = -1, o = n ? n.length : 0;
                for (t = y.createCallback(t, e, 3); ++u < o && t(n[u], u, n);) r++
            } else r = null == t || e ? 1 : Pe(0, t);
            return g(n, r)
        }

        function zt(n, t, e, r) {
            var u = 0, o = n ? n.length : u;
            for (e = e ? y.createCallback(e, r, 1) : Ht, t = e(t); u < o;) r = u + o >>> 1, e(n[r]) < t ? u = r + 1 : o = r;
            return u
        }

        function qt(n, t, e, r) {
            return typeof t != "boolean" && null != t && (e = (r = e) && r[t] === n ? null : t, t = !1), null != e && (e = y.createCallback(e, r, 3)), at(n, t, e)
        }

        function Kt() {
            for (var n = 1 < arguments.length ? arguments : arguments[0], t = -1, e = n ? Nt(cr(n, "length")) : 0, r = Xt(0 > e ? 0 : e); ++t < e;) r[t] = cr(n, t);
            return r
        }

        function Wt(n, t) {
            for (var e = -1, r = n ? n.length : 0, u = {}; ++e < r;) {
                var o = n[e];
                t ? u[o] = t[e] : o && (u[o[0]] = o[1])
            }
            return u
        }

        function Gt(n, t) {
            return 2 < arguments.length ? lt(n, 17, Le.call(arguments, 2), null, t) : lt(n, 1, null, null, t)
        }

        function Jt(n, t, e) {
            function r() {
                c && he(c), a = c = p = v, (h || g !== t) && (s = be(), i = n.apply(f, o))
            }

            function u() {
                var e = t - (be() - l);
                0 < e ? c = xe(u, e) : (a && he(a), e = p, a = c = p = v, e && (s = be(), i = n.apply(f, o)))
            }

            var o, a, i, l, f, c, p, s = 0, g = !1, h = !0;
            if (!bt(n)) throw new ae;
            if (t = Pe(0, t) || 0, true === e) var y = !0,
                h = !1; else _t(e) && (y = e.leading, g = "maxWait" in e && (Pe(t, e.maxWait) || 0), h = "trailing" in e ? e.trailing : h);
            return function () {
                if (o = arguments, l = be(), f = this, p = h && (c || !y), false === g) var e = y && !c; else {
                    a || y || (s = l);
                    var v = g - (l - s);
                    0 < v ? a || (a = xe(r, v)) : (a && (a = he(a)), s = l, i = n.apply(f, o))
                }
                return c || t === g || (c = xe(u, t)), e && (i = n.apply(f, o)), i
            }
        }

        function Mt(n) {
            if (!bt(n)) throw new ae;
            var t = Le.call(arguments, 1);
            return xe(function () {
                n.apply(v, t)
            }, 1)
        }

        function Ht(n) {
            return n
        }

        function Ut(n, t) {
            var e = n, r = !t || bt(e);
            t || (e = m, t = n, n = y), St(mt(t), function (u) {
                var o = n[u] = t[u];
                r && (e.prototype[u] = function () {
                    var t = this.__wrapped__, r = [t];
                    return _e.apply(r, arguments), r = o.apply(n, r), t && typeof t == "object" && t === r ? this : new e(r)
                })
            })
        }

        function Vt(n, t, e) {
            var r = null == n, u = null == t;
            return null == e && (typeof n == "boolean" && u ? (e = n, n = 1) : u || typeof t != "boolean" || (e = t, u = !0)), r && u && (t = 1), n = +n || 0, u ? (t = n, n = 0) : t = +t || 0, r = $e(), e || n % 1 || t % 1 ? Re(n + r * (t - n + parseFloat("1e-" + ((r + "").length - 1))), t) : n + ve(r * (t - n + 1))
        }

        function Qt() {
            return this.__wrapped__
        }

        e = e ? ot.defaults(nt.Object(), e, ot.pick(nt, F)) : nt;
        var Xt = e.Array, Yt = e.Boolean, Zt = e.Date, ne = e.Function, te = e.Math, ee = e.Number, re = e.Object,
            ue = e.RegExp, oe = e.String, ae = e.TypeError, ie = [], le = e.Error.prototype, fe = re.prototype,
            ce = oe.prototype, pe = e._,
            se = ue("^" + oe(fe.valueOf).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
            ge = te.ceil, he = e.clearTimeout, ve = te.floor, ye = ne.prototype.toString,
            me = se.test(me = re.getPrototypeOf) && me, de = fe.hasOwnProperty,
            be = se.test(be = Zt.now) && be || function () {
                return +new Zt
            }, _e = ie.push, we = fe.propertyIsEnumerable, je = e.setImmediate, xe = e.setTimeout, Ce = ie.splice,
            ke = fe.toString, Ee = ie.unshift, Oe = function () {
                try {
                    var n = {}, t = se.test(t = re.defineProperty) && t, e = t(n, n, n) && t
                } catch (r) {
                }
                return e
            }(), Se = se.test(Se = ke.bind) && Se, Ie = se.test(Ie = re.create) && Ie, Ae = se.test(Ae = Xt.isArray) && Ae,
            Ne = e.isFinite, Be = e.isNaN, De = se.test(De = re.keys) && De, Pe = te.max, Re = te.min, Fe = e.parseInt,
            $e = te.random, Le = ie.slice, Te = se.test(e.attachEvent), ze = Se && !/\n|true/.test(Se + Te), qe = {};
        qe[T] = Xt, qe[z] = Yt, qe[q] = Zt, qe[W] = ne, qe[J] = re, qe[G] = ee, qe[M] = ue, qe[H] = oe;
        var Ke = {};
        Ke[T] = Ke[q] = Ke[G] = {
            constructor: !0,
            toLocaleString: !0,
            toString: !0,
            valueOf: !0
        }, Ke[z] = Ke[H] = {constructor: !0, toString: !0, valueOf: !0}, Ke[K] = Ke[W] = Ke[M] = {
            constructor: !0,
            toString: !0
        }, Ke[J] = {constructor: !0}, function () {
            for (var n = $.length; n--;) {
                var t, e = $[n];
                for (t in Ke) de.call(Ke, t) && !de.call(Ke[t], e) && (Ke[t][e] = !1)
            }
        }(), m.prototype = y.prototype;
        var We = y.support = {};
        !function () {
            function n() {
                this.x = 1
            }

            var t = {0: 1, length: 1}, r = [];
            n.prototype = {valueOf: 1};
            for (var u in new n) r.push(u);
            for (u in arguments) ;
            We.argsClass = ke.call(arguments) == L, We.argsObject = arguments.constructor == re && !(arguments instanceof Xt), We.enumErrorProps = we.call(le, "message") || we.call(le, "name"), We.enumPrototypes = we.call(n, "prototype"), We.fastBind = Se && !ze, We.funcDecomp = !se.test(e.p) && P.test(h), We.funcNames = typeof ne.name == "string", We.nonEnumArgs = 0 != u, We.nonEnumShadows = !/valueOf/.test(r), We.ownLast = "x" != r[0], We.spliceObjects = (ie.splice.call(t, 0, 1), !t[0]), We.unindexedChars = "xx" != "x"[0] + re("x")[0];
            try {
                We.nodeClass = !(ke.call(document) == J && !({toString: 0} + ""))
            } catch (o) {
                We.nodeClass = !0
            }
        }(1), y.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: N,
            variable: "",
            imports: {_: y}
        }, Ie || (ct = function (n) {
            if (_t(n)) {
                c.prototype = n;
                var t = new c;
                c.prototype = null
            }
            return t || {}
        });
        var Ge = Oe ? function (n, t) {
            Q.value = t, Oe(n, "__bindData__", Q)
        } : c;
        We.argsClass || (vt = function (n) {
            return n && typeof n == "object" && typeof n.length == "number" && de.call(n, "callee") || !1
        });
        var Je = Ae || function (n) {
                return n && typeof n == "object" && typeof n.length == "number" && ke.call(n) == T || !1
            }, Me = ft({a: "z", e: "[]", i: "if(!(B[typeof z]))return E", g: "E.push(n)"}), He = De ? function (n) {
                return _t(n) ? We.enumPrototypes && typeof n == "function" || We.nonEnumArgs && n.length && vt(n) ? Me(n) : De(n) : []
            } : Me, Ue = {
                a: "g,e,K",
                i: "e=e&&typeof K=='undefined'?e:d(e,K,3)",
                b: "typeof u=='number'",
                v: He,
                g: "if(e(t[n],n,g)===false)return E"
            }, Ve = {
                a: "z,H,l",
                i: "var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",
                v: He,
                g: "if(typeof E[n]=='undefined')E[n]=t[n]",
                c: "}}"
            }, Qe = {i: "if(!B[typeof t])return E;" + Ue.i, b: !1},
            Xe = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, Ye = dt(Xe),
            Ze = ue("(" + He(Ye).join("|") + ")", "g"), nr = ue("[" + He(Xe).join("") + "]", "g"), tr = ft(Ue),
            er = ft(Ve, {
                i: Ve.i.replace(";", ";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),
                g: "E[n]=e?e(E[n],t[n]):t[n]"
            }), rr = ft(Ve), ur = ft(Ue, Qe, {j: !1}), or = ft(Ue, Qe);
        bt(/x/) && (bt = function (n) {
            return typeof n == "function" && ke.call(n) == W
        });
        var ar = me ? function (n) {
            if (!n || ke.call(n) != J || !We.argsClass && vt(n)) return !1;
            var t = n.valueOf, e = typeof t == "function" && (e = me(t)) && me(e);
            return e ? n == e || me(n) == e : gt(n)
        } : gt, ir = it(function (n, t, e) {
            de.call(n, e) ? n[e]++ : n[e] = 1
        }), lr = it(function (n, t, e) {
            (de.call(n, e) ? n[e] : n[e] = []).push(t)
        }), fr = it(function (n, t, e) {
            n[e] = t
        }), cr = At;
        ze && rt && typeof je == "function" && (Mt = function (n) {
            if (!bt(n)) throw new ae;
            return je.apply(e, arguments)
        });
        var pr = 8 == Fe(x + "08") ? Fe : function (n, t) {
            return Fe(jt(n) ? n.replace(B, "") : n, t || 0)
        };
        return y.after = function (n, t) {
            if (!bt(t)) throw new ae;
            return function () {
                return 1 > --n ? t.apply(this, arguments) : void 0
            }
        }, y.assign = er, y.at = function (n) {
            var t = arguments, e = -1, r = tt(t, !0, !1, 1), t = t[2] && t[2][t[1]] === n ? 1 : r.length, u = Xt(t);
            for (We.unindexedChars && jt(n) && (n = n.split("")); ++e < t;) u[e] = n[r[e]];
            return u
        }, y.bind = Gt, y.bindAll = function (n) {
            for (var t = 1 < arguments.length ? tt(arguments, !0, !1, 1) : mt(n), e = -1, r = t.length; ++e < r;) {
                var u = t[e];
                n[u] = lt(n[u], 1, null, null, n)
            }
            return n
        }, y.bindKey = function (n, t) {
            return 2 < arguments.length ? lt(t, 19, Le.call(arguments, 2), null, n) : lt(t, 3, null, null, n)
        }, y.chain = function (n) {
            return n = new m(n), n.__chain__ = !0, n
        }, y.compact = function (n) {
            for (var t = -1, e = n ? n.length : 0, r = []; ++t < e;) {
                var u = n[t];
                u && r.push(u)
            }
            return r
        }, y.compose = function () {
            for (var n = arguments, t = n.length; t--;) if (!bt(n[t])) throw new ae;
            return function () {
                for (var t = arguments, e = n.length; e--;) t = [n[e].apply(this, t)];
                return t[0]
            }
        }, y.countBy = ir, y.createCallback = function (n, t, e) {
            var r = typeof n;
            if (null == n || "function" == r) return Z(n, t, e);
            if ("object" != r) return function (t) {
                return t[n]
            };
            var u = He(n), o = u[0], a = n[o];
            return 1 != u.length || a !== a || _t(a) ? function (t) {
                for (var e = u.length, r = !1; e-- && (r = et(t[u[e]], n[u[e]], null, !0));) ;
                return r
            } : function (n) {
                return n = n[o], a === n && (0 !== a || 1 / a == 1 / n)
            }
        }, y.curry = function (n, t) {
            return t = typeof t == "number" ? t : +t || n.length, lt(n, 4, null, null, null, t)
        }, y.debounce = Jt, y.defaults = rr, y.defer = Mt, y.delay = function (n, t) {
            if (!bt(n)) throw new ae;
            var e = Le.call(arguments, 2);
            return xe(function () {
                n.apply(v, e)
            }, t)
        }, y.difference = Ft, y.filter = Et, y.flatten = function (n, t, e, r) {
            return typeof t != "boolean" && null != t && (e = (r = e) && r[t] === n ? null : t, t = !1), null != e && (n = At(n, e, r)), tt(n, t)
        }, y.forEach = St, y.forEachRight = It, y.forIn = ur, y.forInRight = function (n, t, e) {
            var r = [];
            ur(n, function (n, t) {
                r.push(t, n)
            });
            var u = r.length;
            for (t = Z(t, e, 3); u-- && false !== t(r[u--], r[u], n);) ;
            return n
        }, y.forOwn = or, y.forOwnRight = yt, y.functions = mt, y.groupBy = lr, y.indexBy = fr, y.initial = function (n, t, e) {
            var r = 0, u = n ? n.length : 0;
            if (typeof t != "number" && null != t) {
                var o = u;
                for (t = y.createCallback(t, e, 3); o-- && t(n[o], o, n);) r++
            } else r = null == t || e ? 1 : t || r;
            return g(n, 0, Re(Pe(0, u - r), u))
        }, y.intersection = function (e) {
            for (var r = arguments, u = r.length, a = -1, l = i(), f = -1, c = st(), g = e ? e.length : 0, h = [], v = i(); ++a < u;) {
                var y = r[a];
                l[a] = c === n && (y ? y.length : 0) >= w && o(a ? r[a] : v)
            }
            n:for (; ++f < g;) {
                var m = l[0], y = e[f];
                if (0 > (m ? t(m, y) : c(v, y))) {
                    for (a = u, (m || v).push(y); --a;) if (m = l[a], 0 > (m ? t(m, y) : c(r[a], y))) continue n;
                    h.push(y)
                }
            }
            for (; u--;) (m = l[u]) && s(m);
            return p(l), p(v), h
        }, y.invert = dt, y.invoke = function (n, t) {
            var e = Le.call(arguments, 2), r = -1, u = typeof t == "function", o = n ? n.length : 0,
                a = Xt(typeof o == "number" ? o : 0);
            return St(n, function (n) {
                a[++r] = (u ? t : n[t]).apply(n, e)
            }), a
        }, y.keys = He, y.map = At, y.max = Nt, y.memoize = function (n, t) {
            function e() {
                var r = e.cache, u = t ? t.apply(this, arguments) : _ + arguments[0];
                return de.call(r, u) ? r[u] : r[u] = n.apply(this, arguments)
            }

            if (!bt(n)) throw new ae;
            return e.cache = {}, e
        }, y.merge = function (n) {
            var t = arguments, e = 2;
            if (!_t(n)) return n;
            if ("number" != typeof t[2] && (e = t.length), 3 < e && "function" == typeof t[e - 2]) var r = Z(t[--e - 1], t[e--], 2); else 2 < e && "function" == typeof t[e - 1] && (r = t[--e]);
            for (var t = Le.call(arguments, 1, e), u = -1, o = i(), a = i(); ++u < e;) ut(n, t[u], r, o, a);
            return p(o), p(a), n
        }, y.min = function (n, t, e) {
            var u = 1 / 0, o = u;
            if (!t && Je(n)) {
                e = -1;
                for (var a = n.length; ++e < a;) {
                    var i = n[e];
                    i < o && (o = i)
                }
            } else t = !t && jt(n) ? r : y.createCallback(t, e, 3), tr(n, function (n, e, r) {
                e = t(n, e, r), e < u && (u = e, o = n)
            });
            return o
        }, y.omit = function (n, t, e) {
            var r = st(), u = typeof t == "function", o = {};
            if (u) t = y.createCallback(t, e, 3); else var a = tt(arguments, !0, !1, 1);
            return ur(n, function (n, e, i) {
                (u ? !t(n, e, i) : 0 > r(a, e)) && (o[e] = n)
            }), o
        }, y.once = function (n) {
            var t, e;
            if (!bt(n)) throw new ae;
            return function () {
                return t ? e : (t = !0, e = n.apply(this, arguments), n = null, e)
            }
        }, y.pairs = function (n) {
            for (var t = -1, e = He(n), r = e.length, u = Xt(r); ++t < r;) {
                var o = e[t];
                u[t] = [o, n[o]]
            }
            return u
        }, y.partial = function (n) {
            return lt(n, 16, Le.call(arguments, 1))
        }, y.partialRight = function (n) {
            return lt(n, 32, null, Le.call(arguments, 1))
        }, y.pick = function (n, t, e) {
            var r = {};
            if (typeof t != "function") for (var u = -1, o = tt(arguments, !0, !1, 1), a = _t(n) ? o.length : 0; ++u < a;) {
                var i = o[u];
                i in n && (r[i] = n[i])
            } else t = y.createCallback(t, e, 3), ur(n, function (n, e, u) {
                t(n, e, u) && (r[e] = n)
            });
            return r
        }, y.pluck = cr, y.pull = function (n) {
            for (var t = arguments, e = 0, r = t.length, u = n ? n.length : 0; ++e < r;) for (var o = -1, a = t[e]; ++o < u;) n[o] === a && (Ce.call(n, o--, 1), u--);
            return n
        }, y.range = function (n, t, e) {
            n = +n || 0, e = typeof e == "number" ? e : +e || 1, null == t && (t = n, n = 0);
            var r = -1;
            t = Pe(0, ge((t - n) / (e || 1)));
            for (var u = Xt(t); ++r < t;) u[r] = n, n += e;
            return u
        }, y.reject = function (n, t, e) {
            return t = y.createCallback(t, e, 3), Et(n, function (n, e, r) {
                return !t(n, e, r)
            })
        }, y.remove = function (n, t, e) {
            var r = -1, u = n ? n.length : 0, o = [];
            for (t = y.createCallback(t, e, 3); ++r < u;) e = n[r], t(e, r, n) && (o.push(e), Ce.call(n, r--, 1), u--);
            return o
        }, y.rest = Tt, y.shuffle = Pt, y.sortBy = function (n, t, e) {
            var r = -1, o = n ? n.length : 0, a = Xt(typeof o == "number" ? o : 0);
            for (t = y.createCallback(t, e, 3), St(n, function (n, e, u) {
                var o = a[++r] = l();
                o.m = t(n, e, u), o.n = r, o.o = n
            }), o = a.length, a.sort(u); o--;) n = a[o], a[o] = n.o, s(n);
            return a
        }, y.tap = function (n, t) {
            return t(n), n
        }, y.throttle = function (n, t, e) {
            var r = !0, u = !0;
            if (!bt(n)) throw new ae;
            return false === e ? r = !1 : _t(e) && (r = "leading" in e ? e.leading : r, u = "trailing" in e ? e.trailing : u), V.leading = r, V.maxWait = t, V.trailing = u, Jt(n, t, V)
        }, y.times = function (n, t, e) {
            n = -1 < (n = +n) ? n : 0;
            var r = -1, u = Xt(n);
            for (t = Z(t, e, 1); ++r < n;) u[r] = t(r);
            return u
        }, y.toArray = function (n) {
            return n && typeof n.length == "number" ? We.unindexedChars && jt(n) ? n.split("") : g(n) : xt(n)
        }, y.transform = function (n, t, e, r) {
            var u = Je(n);
            return t = Z(t, r, 4), null == e && (u ? e = [] : (r = n && n.constructor, e = ct(r && r.prototype))), (u ? tr : or)(n, function (n, r, u) {
                return t(e, n, r, u)
            }), e
        }, y.union = function () {
            return at(tt(arguments, !0, !0))
        }, y.uniq = qt, y.values = xt, y.where = Et, y.without = function (n) {
            return Ft(n, Le.call(arguments, 1))
        }, y.wrap = function (n, t) {
            if (!bt(t)) throw new ae;
            return function () {
                var e = [n];
                return _e.apply(e, arguments), t.apply(this, e)
            }
        }, y.zip = Kt, y.zipObject = Wt, y.collect = At, y.drop = Tt, y.each = St, y.q = It, y.extend = er, y.methods = mt, y.object = Wt, y.select = Et, y.tail = Tt, y.unique = qt, y.unzip = Kt, Ut(y), y.clone = function (n, t, e, r) {
            return typeof t != "boolean" && null != t && (r = e, e = t, t = !1), j(n, t, typeof e == "function" && Z(e, r, 1))
        }, y.cloneDeep = function (n, t, e) {
            return j(n, !0, typeof t == "function" && Z(t, e, 1))
        }, y.contains = Ct, y.escape = function (n) {
            return null == n ? "" : oe(n).replace(nr, pt)
        }, y.every = kt, y.find = Ot, y.findIndex = function (n, t, e) {
            var r = -1, u = n ? n.length : 0;
            for (t = y.createCallback(t, e, 3); ++r < u;) if (t(n[r], r, n)) return r;
            return -1
        }, y.findKey = function (n, t, e) {
            var r;
            return t = y.createCallback(t, e, 3), or(n, function (n, e, u) {
                return t(n, e, u) ? (r = e, !1) : void 0
            }), r
        }, y.findLast = function (n, t, e) {
            var r;
            return t = y.createCallback(t, e, 3), It(n, function (n, e, u) {
                return t(n, e, u) ? (r = n, !1) : void 0
            }), r
        }, y.findLastIndex = function (n, t, e) {
            var r = n ? n.length : 0;
            for (t = y.createCallback(t, e, 3); r--;) if (t(n[r], r, n)) return r;
            return -1
        }, y.findLastKey = function (n, t, e) {
            var r;
            return t = y.createCallback(t, e, 3), yt(n, function (n, e, u) {
                return t(n, e, u) ? (r = e, !1) : void 0
            }), r
        }, y.has = function (n, t) {
            return n ? de.call(n, t) : !1
        }, y.identity = Ht, y.indexOf = Lt, y.isArguments = vt, y.isArray = Je, y.isBoolean = function (n) {
            return true === n || false === n || ke.call(n) == z
        }, y.isDate = function (n) {
            return n ? typeof n == "object" && ke.call(n) == q : !1
        }, y.isElement = function (n) {
            return n ? 1 === n.nodeType : !1
        }, y.isEmpty = function (n) {
            var t = !0;
            if (!n) return t;
            var e = ke.call(n), r = n.length;
            return e == T || e == H || (We.argsClass ? e == L : vt(n)) || e == J && typeof r == "number" && bt(n.splice) ? !r : (or(n, function () {
                return t = !1
            }), t)
        }, y.isEqual = function (n, t, e, r) {
            return et(n, t, typeof e == "function" && Z(e, r, 2))
        }, y.isFinite = function (n) {
            return Ne(n) && !Be(parseFloat(n))
        }, y.isFunction = bt, y.isNaN = function (n) {
            return wt(n) && n != +n
        },y.isNull = function (n) {
            return null === n
        },y.isNumber = wt,y.isObject = _t,y.isPlainObject = ar,y.isRegExp = function (n) {
            return n && Y[typeof n] ? ke.call(n) == M : !1
        },y.isString = jt,y.isUndefined = function (n) {
            return typeof n == "undefined"
        },y.lastIndexOf = function (n, t, e) {
            var r = n ? n.length : 0;
            for (typeof e == "number" && (r = (0 > e ? Pe(0, r + e) : Re(e, r - 1)) + 1); r--;) if (n[r] === t) return r;
            return -1
        },y.mixin = Ut,y.noConflict = function () {
            return e._ = pe, this
        },y.parseInt = pr,y.random = Vt,y.reduce = Bt,y.reduceRight = Dt,y.result = function (n, t) {
            if (n) {
                var e = n[t];
                return bt(e) ? n[t]() : e
            }
        },y.runInContext = h,y.size = function (n) {
            var t = n ? n.length : 0;
            return typeof t == "number" ? t : He(n).length
        },y.some = Rt,y.sortedIndex = zt,y.template = function (n, t, e) {
            var r = y.templateSettings;
            n || (n = ""), e = rr({}, e, r);
            var u, o = rr({}, e.imports, r.imports), r = He(o), o = xt(o), i = 0, l = e.interpolate || D, f = "__p+='",
                l = ue((e.escape || D).source + "|" + l.source + "|" + (l === N ? S : D).source + "|" + (e.evaluate || D).source + "|$", "g");
            n.replace(l, function (t, e, r, o, l, c) {
                return r || (r = o), f += n.slice(i, c).replace(R, a), e && (f += "'+__e(" + e + ")+'"), l && (u = !0, f += "';" + l + ";__p+='"), r && (f += "'+((__t=(" + r + "))==null?'':__t)+'"), i = c + t.length, t
            }), f += "';\n", l = e = e.variable, l || (e = "obj", f = "with(" + e + "){" + f + "}"), f = (u ? f.replace(C, "") : f).replace(E, "$1").replace(O, "$1;"), f = "function(" + e + "){" + (l ? "" : e + "||(" + e + "={});") + "var __t,__p='',__e=_.escape" + (u ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + f + "return __p}";
            try {
                var c = ne(r, "return " + f).apply(v, o)
            } catch (p) {
                throw p.source = f, p
            }
            return t ? c(t) : (c.source = f, c)
        },y.unescape = function (n) {
            return null == n ? "" : oe(n).replace(Ze, ht)
        },y.uniqueId = function (n) {
            var t = ++d;
            return oe(null == n ? "" : n) + t
        },y.all = kt,y.any = Rt,y.detect = Ot,y.findWhere = Ot,y.foldl = Bt,y.foldr = Dt,y.include = Ct,y.inject = Bt,or(y, function (n, t) {
            y.prototype[t] || (y.prototype[t] = function () {
                var t = [this.__wrapped__], e = this.__chain__;
                return _e.apply(t, arguments), t = n.apply(y, t), e ? new m(t, e) : t
            })
        }),y.first = $t,y.last = function (n, t, e) {
            var r = 0, u = n ? n.length : 0;
            if (typeof t != "number" && null != t) {
                var o = u;
                for (t = y.createCallback(t, e, 3); o-- && t(n[o], o, n);) r++
            } else if (r = t, null == r || e) return n ? n[u - 1] : v;
            return g(n, Pe(0, u - r))
        },y.sample = function (n, t, e) {
            var r = n ? n.length : 0;
            return typeof r != "number" ? n = xt(n) : We.unindexedChars && jt(n) && (n = n.split("")), null == t || e ? n ? n[Vt(r - 1)] : v : (n = Pt(n), n.length = Re(Pe(0, t), n.length), n)
        },y.take = $t,y.head = $t,or(y, function (n, t) {
            var e = "sample" !== t;
            y.prototype[t] || (y.prototype[t] = function (t, r) {
                var u = this.__chain__, o = n(this.__wrapped__, t, r);
                return u || null != t && (!r || e && typeof t == "function") ? new m(o, u) : o
            })
        }),y.VERSION = "2.2.0",y.prototype.chain = function () {
            return this.__chain__ = !0, this
        },y.prototype.toString = function () {
            return oe(this.__wrapped__)
        },y.prototype.value = Qt,y.prototype.valueOf = Qt,tr(["join", "pop", "shift"], function (n) {
            var t = ie[n];
            y.prototype[n] = function () {
                var n = this.__chain__, e = t.apply(this.__wrapped__, arguments);
                return n ? new m(e, n) : e
            }
        }),tr(["push", "reverse", "sort", "unshift"], function (n) {
            var t = ie[n];
            y.prototype[n] = function () {
                return t.apply(this.__wrapped__, arguments), this
            }
        }),tr(["concat", "slice", "splice"], function (n) {
            var t = ie[n];
            y.prototype[n] = function () {
                return new m(t.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),We.spliceObjects || tr(["pop", "shift", "splice"], function (n) {
            var t = ie[n], e = "splice" == n;
            y.prototype[n] = function () {
                var n = this.__chain__, r = this.__wrapped__, u = t.apply(r, arguments);
                return 0 === r.length && delete r[0], n || e ? new m(u, n) : u
            }
        }),y
    }

    var v, y = [], m = [], d = 0, b = {}, _ = +new Date + "", w = 75, j = 40,
        x = " \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",
        C = /\b__p\+='';/g, E = /\b(__p\+=)''\+/g, O = /(__e\(.*?\)|\b__t\))\+'';/g,
        S = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, I = /\w*$/, A = /^function[ \n\r\t]+\w/, N = /<%=([\s\S]+?)%>/g,
        B = RegExp("^[" + x + "]*0+(?=.$)"), D = /($^)/, P = /\bthis\b/, R = /['\n\r\t\u2028\u2029\\]/g,
        F = "Array Boolean Date Error Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setImmediate setTimeout".split(" "),
        $ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        L = "[object Arguments]", T = "[object Array]", z = "[object Boolean]", q = "[object Date]",
        K = "[object Error]", W = "[object Function]", G = "[object Number]", J = "[object Object]",
        M = "[object RegExp]", H = "[object String]", U = {};
    U[W] = !1, U[L] = U[T] = U[z] = U[q] = U[G] = U[J] = U[M] = U[H] = !0;
    var V = {leading: !1, maxWait: 0, trailing: !1}, Q = {configurable: !1, enumerable: !1, value: null, writable: !1},
        X = {a: "", b: null, c: "", d: "", e: "", v: null, g: "", h: null, support: null, i: "", j: !1},
        Y = {"boolean": !1, "function": !0, object: !0, number: !1, string: !1, undefined: !1},
        Z = {"\\": "\\", "'": "'", "\n": "n", "\r": "r", "\t": "t", "\u2028": "u2028", "\u2029": "u2029"},
        nt = Y[typeof window] && window || this, tt = Y[typeof exports] && exports && !exports.nodeType && exports,
        et = Y[typeof module] && module && !module.nodeType && module, rt = et && et.exports === tt && tt,
        ut = Y[typeof global] && global;
    !ut || ut.global !== ut && ut.window !== ut || (nt = ut);
    var ot = h();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? (nt._ = ot, define(function () {
        return ot
    })) : tt && et ? rt ? (et.exports = ot)._ = ot : tt._ = ot : nt._ = ot
}).call(this);
;!function (e, n) {
    "use strict";

    function r(e, n) {
        var r, t, u = e.toLowerCase();
        for (n = [].concat(n), r = 0; n.length > r; r += 1) if (t = n[r]) {
            if (t.test && t.test(e)) return !0;
            if (t.toLowerCase() === u) return !0
        }
    }

    var t = n.prototype.trim, u = n.prototype.trimRight, i = n.prototype.trimLeft, l = function (e) {
        return 1 * e || 0
    }, o = function (e, n) {
        if (1 > n) return "";
        for (var r = ""; n > 0;) 1 & n && (r += e), n >>= 1, e += e;
        return r
    }, a = [].slice, c = function (e) {
        return null == e ? "\\s" : e.source ? e.source : "[" + g.escapeRegExp(e) + "]"
    }, s = {lt: "<", gt: ">", quot: '"', amp: "&", apos: "'"}, f = {};
    for (var p in s) f[s[p]] = p;
    f["'"] = "#39";
    var h = function () {
        function e(e) {
            return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
        }

        var r = o, t = function () {
            return t.cache.hasOwnProperty(arguments[0]) || (t.cache[arguments[0]] = t.parse(arguments[0])), t.format.call(null, t.cache[arguments[0]], arguments)
        };
        return t.format = function (t, u) {
            var i, l, o, a, c, s, f, p = 1, g = t.length, d = "", m = [];
            for (l = 0; g > l; l++) if (d = e(t[l]), "string" === d) m.push(t[l]); else if ("array" === d) {
                if (a = t[l], a[2]) for (i = u[p], o = 0; a[2].length > o; o++) {
                    if (!i.hasOwnProperty(a[2][o])) throw new Error(h('[_.sprintf] property "%s" does not exist', a[2][o]));
                    i = i[a[2][o]]
                } else i = a[1] ? u[a[1]] : u[p++];
                if (/[^s]/.test(a[8]) && "number" != e(i)) throw new Error(h("[_.sprintf] expecting number but found %s", e(i)));
                switch (a[8]) {
                    case"b":
                        i = i.toString(2);
                        break;
                    case"c":
                        i = n.fromCharCode(i);
                        break;
                    case"d":
                        i = parseInt(i, 10);
                        break;
                    case"e":
                        i = a[7] ? i.toExponential(a[7]) : i.toExponential();
                        break;
                    case"f":
                        i = a[7] ? parseFloat(i).toFixed(a[7]) : parseFloat(i);
                        break;
                    case"o":
                        i = i.toString(8);
                        break;
                    case"s":
                        i = (i = n(i)) && a[7] ? i.substring(0, a[7]) : i;
                        break;
                    case"u":
                        i = Math.abs(i);
                        break;
                    case"x":
                        i = i.toString(16);
                        break;
                    case"X":
                        i = i.toString(16).toUpperCase()
                }
                i = /[def]/.test(a[8]) && a[3] && i >= 0 ? "+" + i : i, s = a[4] ? "0" == a[4] ? "0" : a[4].charAt(1) : " ", f = a[6] - n(i).length, c = a[6] ? r(s, f) : "", m.push(a[5] ? i + c : c + i)
            }
            return m.join("")
        }, t.cache = {}, t.parse = function (e) {
            for (var n = e, r = [], t = [], u = 0; n;) {
                if (null !== (r = /^[^\x25]+/.exec(n))) t.push(r[0]); else if (null !== (r = /^\x25{2}/.exec(n))) t.push("%"); else {
                    if (null === (r = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(n))) throw new Error("[_.sprintf] huh?");
                    if (r[2]) {
                        u |= 1;
                        var i = [], l = r[2], o = [];
                        if (null === (o = /^([a-z_][a-z_\d]*)/i.exec(l))) throw new Error("[_.sprintf] huh?");
                        for (i.push(o[1]); "" !== (l = l.substring(o[0].length));) if (null !== (o = /^\.([a-z_][a-z_\d]*)/i.exec(l))) i.push(o[1]); else {
                            if (null === (o = /^\[(\d+)\]/.exec(l))) throw new Error("[_.sprintf] huh?");
                            i.push(o[1])
                        }
                        r[2] = i
                    } else u |= 2;
                    if (3 === u) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
                    t.push(r)
                }
                n = n.substring(r[0].length)
            }
            return t
        }, t
    }(), g = {
        VERSION: "2.3.0", isBlank: function (e) {
            return null == e && (e = ""), /^\s*$/.test(e)
        }, stripTags: function (e) {
            return null == e ? "" : n(e).replace(/<\/?[^>]+>/g, "")
        }, capitalize: function (e) {
            return e = null == e ? "" : n(e), e.charAt(0).toUpperCase() + e.slice(1)
        }, chop: function (e, r) {
            return null == e ? [] : (e = n(e), r = ~~r, r > 0 ? e.match(new RegExp(".{1," + r + "}", "g")) : [e])
        }, clean: function (e) {
            return g.strip(e).replace(/\s+/g, " ")
        }, count: function (e, r) {
            if (null == e || null == r) return 0;
            e = n(e), r = n(r);
            for (var t = 0, u = 0, i = r.length; ;) {
                if (u = e.indexOf(r, u), -1 === u) break;
                t++, u += i
            }
            return t
        }, chars: function (e) {
            return null == e ? [] : n(e).split("")
        }, swapCase: function (e) {
            return null == e ? "" : n(e).replace(/\S/g, function (e) {
                return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
            })
        }, escapeHTML: function (e) {
            return null == e ? "" : n(e).replace(/[&<>"']/g, function (e) {
                return "&" + f[e] + ";"
            })
        }, unescapeHTML: function (e) {
            return null == e ? "" : n(e).replace(/\&([^;]+);/g, function (e, r) {
                var t;
                return r in s ? s[r] : (t = r.match(/^#x([\da-fA-F]+)$/)) ? n.fromCharCode(parseInt(t[1], 16)) : (t = r.match(/^#(\d+)$/)) ? n.fromCharCode(~~t[1]) : e
            })
        }, escapeRegExp: function (e) {
            return null == e ? "" : n(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        }, splice: function (e, n, r, t) {
            var u = g.chars(e);
            return u.splice(~~n, ~~r, t), u.join("")
        }, insert: function (e, n, r) {
            return g.splice(e, n, 0, r)
        }, include: function (e, r) {
            return "" === r ? !0 : null == e ? !1 : -1 !== n(e).indexOf(r)
        }, join: function () {
            var e = a.call(arguments), n = e.shift();
            return null == n && (n = ""), e.join(n)
        }, lines: function (e) {
            return null == e ? [] : n(e).split("\n")
        }, reverse: function (e) {
            return g.chars(e).reverse().join("")
        }, startsWith: function (e, r) {
            return "" === r ? !0 : null == e || null == r ? !1 : (e = n(e), r = n(r), e.length >= r.length && e.slice(0, r.length) === r)
        }, endsWith: function (e, r) {
            return "" === r ? !0 : null == e || null == r ? !1 : (e = n(e), r = n(r), e.length >= r.length && e.slice(e.length - r.length) === r)
        }, succ: function (e) {
            return null == e ? "" : (e = n(e), e.slice(0, -1) + n.fromCharCode(e.charCodeAt(e.length - 1) + 1))
        }, titleize: function (e) {
            return null == e ? "" : (e = n(e).toLowerCase(), e.replace(/(?:^|\s|-)\S/g, function (e) {
                return e.toUpperCase()
            }))
        }, camelize: function (e) {
            return g.trim(e).replace(/[-_\s]+(.)?/g, function (e, n) {
                return n ? n.toUpperCase() : ""
            })
        }, underscored: function (e) {
            return g.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
        }, dasherize: function (e) {
            return g.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
        }, classify: function (e) {
            return g.titleize(n(e).replace(/[\W_]/g, " ")).replace(/\s/g, "")
        }, humanize: function (e) {
            return g.capitalize(g.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
        }, trim: function (e, r) {
            return null == e ? "" : !r && t ? t.call(e) : (r = c(r), n(e).replace(new RegExp("^" + r + "+|" + r + "+$", "g"), ""))
        }, ltrim: function (e, r) {
            return null == e ? "" : !r && i ? i.call(e) : (r = c(r), n(e).replace(new RegExp("^" + r + "+"), ""))
        }, rtrim: function (e, r) {
            return null == e ? "" : !r && u ? u.call(e) : (r = c(r), n(e).replace(new RegExp(r + "+$"), ""))
        }, truncate: function (e, r, t) {
            return null == e ? "" : (e = n(e), t = t || "...", r = ~~r, e.length > r ? e.slice(0, r) + t : e)
        }, prune: function (e, r, t) {
            if (null == e) return "";
            if (e = n(e), r = ~~r, t = null != t ? n(t) : "...", r >= e.length) return e;
            var u = function (e) {
                return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
            }, i = e.slice(0, r + 1).replace(/.(?=\W*\w*$)/g, u);
            return i = i.slice(i.length - 2).match(/\w\w/) ? i.replace(/\s*\S+$/, "") : g.rtrim(i.slice(0, i.length - 1)), (i + t).length > e.length ? e : e.slice(0, i.length) + t
        }, words: function (e, n) {
            return g.isBlank(e) ? [] : g.trim(e, n).split(n || /\s+/)
        }, pad: function (e, r, t, u) {
            e = null == e ? "" : n(e), r = ~~r;
            var i = 0;
            switch (t ? t.length > 1 && (t = t.charAt(0)) : t = " ", u) {
                case"right":
                    return i = r - e.length, e + o(t, i);
                case"both":
                    return i = r - e.length, o(t, Math.ceil(i / 2)) + e + o(t, Math.floor(i / 2));
                default:
                    return i = r - e.length, o(t, i) + e
            }
        }, lpad: function (e, n, r) {
            return g.pad(e, n, r)
        }, rpad: function (e, n, r) {
            return g.pad(e, n, r, "right")
        }, lrpad: function (e, n, r) {
            return g.pad(e, n, r, "both")
        }, sprintf: h, vsprintf: function (e, n) {
            return n.unshift(e), h.apply(null, n)
        }, toNumber: function (e, n) {
            return e ? (e = g.trim(e), e.match(/^-?\d+(?:\.\d+)?$/) ? l(l(e).toFixed(~~n)) : 0 / 0) : 0
        }, numberFormat: function (e, n, r, t) {
            if (isNaN(e) || null == e) return "";
            e = e.toFixed(~~n), t = "string" == typeof t ? t : ",";
            var u = e.split("."), i = u[0], l = u[1] ? (r || ".") + u[1] : "";
            return i.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + t) + l
        }, strRight: function (e, r) {
            if (null == e) return "";
            e = n(e), r = null != r ? n(r) : r;
            var t = r ? e.indexOf(r) : -1;
            return ~t ? e.slice(t + r.length, e.length) : e
        }, strRightBack: function (e, r) {
            if (null == e) return "";
            e = n(e), r = null != r ? n(r) : r;
            var t = r ? e.lastIndexOf(r) : -1;
            return ~t ? e.slice(t + r.length, e.length) : e
        }, strLeft: function (e, r) {
            if (null == e) return "";
            e = n(e), r = null != r ? n(r) : r;
            var t = r ? e.indexOf(r) : -1;
            return ~t ? e.slice(0, t) : e
        }, strLeftBack: function (e, n) {
            if (null == e) return "";
            e += "", n = null != n ? "" + n : n;
            var r = e.lastIndexOf(n);
            return ~r ? e.slice(0, r) : e
        }, toSentence: function (e, n, r, t) {
            n = n || ", ", r = r || " and ";
            var u = e.slice(), i = u.pop();
            return e.length > 2 && t && (r = g.rtrim(n) + r), u.length ? u.join(n) + r + i : i
        }, toSentenceSerial: function () {
            var e = a.call(arguments);
            return e[3] = !0, g.toSentence.apply(g, e)
        }, slugify: function (e) {
            if (null == e) return "";
            var r = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź", t = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
                u = new RegExp(c(r), "g");
            return e = n(e).toLowerCase().replace(u, function (e) {
                var n = r.indexOf(e);
                return t.charAt(n) || "-"
            }), g.dasherize(e.replace(/[^\w\s-]/g, ""))
        }, surround: function (e, n) {
            return [n, e, n].join("")
        }, quote: function (e, n) {
            return g.surround(e, n || '"')
        }, unquote: function (e, n) {
            return n = n || '"', e[0] === n && e[e.length - 1] === n ? e.slice(1, e.length - 1) : e
        }, exports: function () {
            var e = {};
            for (var n in this) this.hasOwnProperty(n) && !n.match(/^(?:include|contains|reverse)$/) && (e[n] = this[n]);
            return e
        }, repeat: function (e, r, t) {
            if (null == e) return "";
            if (r = ~~r, null == t) return o(n(e), r);
            for (var u = []; r > 0; u[--r] = e) ;
            return u.join(t)
        }, naturalCmp: function (e, r) {
            if (e == r) return 0;
            if (!e) return -1;
            if (!r) return 1;
            for (var t = /(\.\d+)|(\d+)|(\D+)/g, u = n(e).toLowerCase().match(t), i = n(r).toLowerCase().match(t), l = Math.min(u.length, i.length), o = 0; l > o; o++) {
                var a = u[o], c = i[o];
                if (a !== c) {
                    var s = parseInt(a, 10);
                    if (!isNaN(s)) {
                        var f = parseInt(c, 10);
                        if (!isNaN(f) && s - f) return s - f
                    }
                    return c > a ? -1 : 1
                }
            }
            return u.length === i.length ? u.length - i.length : r > e ? -1 : 1
        }, levenshtein: function (e, r) {
            if (null == e && null == r) return 0;
            if (null == e) return n(r).length;
            if (null == r) return n(e).length;
            e = n(e), r = n(r);
            for (var t, u, i = [], l = 0; r.length >= l; l++) for (var o = 0; e.length >= o; o++) u = l && o ? e.charAt(o - 1) === r.charAt(l - 1) ? t : Math.min(i[o], i[o - 1], t) + 1 : l + o, t = i[o], i[o] = u;
            return i.pop()
        }, toBoolean: function (e, n, t) {
            return "number" == typeof e && (e = "" + e), "string" != typeof e ? !!e : (e = g.trim(e), r(e, n || ["true", "1"]) ? !0 : r(e, t || ["false", "0"]) ? !1 : void 0)
        }
    };
    g.strip = g.trim, g.lstrip = g.ltrim, g.rstrip = g.rtrim, g.center = g.lrpad, g.rjust = g.lpad, g.ljust = g.rpad, g.contains = g.include, g.q = g.quote, g.toBool = g.toBoolean, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (module.exports = g), exports._s = g), "function" == typeof define && define.amd && define("underscore.string", [], function () {
        return g
    }), e._ = e._ || {}, e._.string = e._.str = g
}(this, String);
;(function () {
    _.mixin({
        dateLang: function () {
            return {
                days: [gettext("Sunday"), gettext("Monday"), gettext("Tuesday"), gettext("Wednesday"), gettext("Thursday"), gettext("Friday"), gettext("Saturday"), gettext("Sunday")],
                daysShort: [gettext("Sun"), gettext("Mon"), gettext("Tue"), gettext("Wed"), gettext("Thu"), gettext("Fri"), gettext("Sat"), gettext("Sun")],
                daysMin: ["S", "M", "T", "W", "T", "F", "S", "S"],
                months: [gettext("January"), gettext("February"), gettext("March"), gettext("April"), gettext("May"), gettext("June"), gettext("July"), gettext("August"), gettext("September"), gettext("October"), gettext("November"), gettext("December")],
                monthsShort: [gettext("Jan"), gettext("Feb"), gettext("Mar"), gettext("Apr"), gettext("May"), gettext("Jun"), gettext("Jul"), gettext("Aug"), gettext("Sep"), gettext("Oct"), gettext("Nov"), gettext("Dec")]
            };
        }, prettyPrintDate: function (date) {
            return [_.dateLang().days[date.getDay()], ', ', _.dateLang().months[date.getMonth()], ' ', date.getDate(), ', ', date.getFullYear()].join('');
        }, parseISO: function (d) {
            if (!d) {
                return null;
            }
            if (d.constructor === Date) {
                return d;
            }
            var year = parseInt(d.substring(0, 4), 10);
            var month = parseInt(d.substring(5, 7), 10) - 1;
            var day = parseInt(d.substring(8, 10), 10);
            return new Date(year, month, day);
        }, toShortISOString: function (d) {
            var day = d.getDate();
            if (day < 10) {
                day = ["0", day].join('');
            }
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = ["0", month].join('');
            }
            var year = d.getFullYear();
            return [year, month, day].join('-');
        }, firstDayOfMonth: function (date) {
            return new Date(date.getFullYear(), date.getMonth(), 1);
        }, clearTime: function (date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }, getDateDiff: function (date1, date2) {
            return Math.round((_.parseISO(date1) - _.parseISO(date2)) / 1000 / 60 / 60 / 24);
        }, pluralize: function (s, count) {
            if (/s$/.test(s)) {
                s = s.substr(0, s.length - 1);
            }
            count = parseInt(count, 10);
            if (count === 0 || count > 1) {
                return s + 's';
            }
            return s;
        }, prettyPrice: function (value) {
            if (value && value % 1 !== 0) {
                return value.toFixed(2);
            }
            return value;
        }
    });
}());
;(function () {
    'use strict';

    function e(a) {
        this.a = document.createElement("div");
        this.a.setAttribute("aria-hidden", "true");
        this.a.appendChild(document.createTextNode(a));
        this.b = document.createElement("span");
        this.c = document.createElement("span");
        this.f = document.createElement("span");
        this.e = document.createElement("span");
        this.d = -1;
        this.b.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";
        this.c.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";
        this.e.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";
        this.f.style.cssText = "display:inline-block;width:200%;height:200%;";
        this.b.appendChild(this.f);
        this.c.appendChild(this.e);
        this.a.appendChild(this.b);
        this.a.appendChild(this.c)
    }

    function t(a, b, c) {
        a.a.style.cssText = "min-width:20px;min-height:20px;display:inline-block;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font-size:100px;font-family:" + b + ";" + c
    }

    function u(a) {
        var b = a.a.offsetWidth, c = b + 100;
        a.e.style.width = c + "px";
        a.c.scrollLeft = c;
        a.b.scrollLeft = a.b.scrollWidth + 100;
        return a.d !== b ? (a.d = b, !0) : !1
    }

    function v(a, b) {
        a.b.addEventListener("scroll", function () {
            u(a) && null !== a.a.parentNode && b(a.d)
        }, !1);
        a.c.addEventListener("scroll", function () {
            u(a) && null !== a.a.parentNode && b(a.d)
        }, !1);
        u(a)
    };

    function w(a, b) {
        this.family = a;
        this.style = b.style || "normal";
        this.variant = b.variant || "normal";
        this.weight = b.weight || "normal";
        this.stretch = b.stretch || "stretch";
        this.featureSettings = b.featureSettings || "normal"
    }

    var x = null;
    w.prototype.a = function (a, b) {
        var c = a || "BESbswy", z = b || 3E3,
            f = "font-style:" + this.style + ";font-variant:" + this.variant + ";font-weight:" + this.weight + ";font-stretch:" + this.stretch + ";font-feature-settings:" + this.featureSettings + ";-moz-font-feature-settings:" + this.featureSettings + ";-webkit-font-feature-settings:" + this.featureSettings + ";",
            g = document.createElement("div"), m = new e(c), n = new e(c), p = new e(c), h = -1, d = -1, k = -1, q = -1,
            r = -1, s = -1, l = this;
        t(m, "sans-serif", f);
        t(n, "serif", f);
        t(p, "monospace", f);
        g.appendChild(m.a);
        g.appendChild(n.a);
        g.appendChild(p.a);
        document.body.appendChild(g);
        q = m.a.offsetWidth;
        r = n.a.offsetWidth;
        s = p.a.offsetWidth;
        return new Promise(function (a, b) {
            function c() {
                null !== g.parentNode && document.body.removeChild(g)
            }

            function y() {
                if (-1 !== h && -1 !== d && -1 !== k && h === d && d === k) {
                    if (null === x) {
                        var b = /AppleWeb[kK]it\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                        x = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))
                    }
                    x ? h === q && d === q && k === q || h === r && d === r && k === r || h === s && d === s && k === s || (c(), a(l)) : (c(), a(l))
                }
            }

            setTimeout(function () {
                c();
                b(l)
            }, z);
            v(m, function (a) {
                h = a;
                y()
            });
            t(m, l.family + ",sans-serif", f);
            v(n, function (a) {
                d = a;
                y()
            });
            t(n, l.family + ",serif", f);
            v(p, function (a) {
                k = a;
                y()
            });
            t(p, l.family + ",monospace", f)
        })
    };
    window.FontFaceObserver = w;
    window.FontFaceObserver.prototype.check = w.prototype.a;
}());
;
;var Hypersearch = !function ($, _) {
    'use strict';
    var headingRenderer = function (headingText) {
        return $('<li>').data('ui-autocomplete-item', null).append($('<strong>').text(headingText));
    };
    var tripRenderer = function (ul, item) {
        var trips = item.value;
        headingRenderer(item.label).appendTo(ul);
        var tripPosition = 1;
        _.each(trips, function (trip) {
            $('<li>').data('ui-autocomplete-item', trip).append($('<a>').attr('data-insights-object-id', trip.objectID).attr('data-insights-position', tripPosition++).text(trip.label)).appendTo(ul);
        });
        if (item.count) {
            $('<li class="view-all">').data('ui-autocomplete-item', {label: item.keywords}).append($('<a>').text('View all tours')).appendTo(ul);
        }
        if (item.indexName) {
            ul.attr('data-insights-index-name', item.indexName);
        }
        if (item.queryID) {
            ul.attr('data-insights-query-id', item.queryID);
        }
    };
    var defaultItemDataRenderer = function (ul, item) {
        ul.addClass('hypersearch-menu');
        if (item) {
            switch (item.label) {
                case'Trips':
                    tripRenderer(ul, item);
                    break;
                default:
                    break;
            }
        }
    };
    var defaultDataSource = function (request, response) {
        var term = request.term;
        var data = $(this.element.context).data();
        var source;
        if (data.source) {
            source = data.source;
        }
        var lastXhr = $.getJSON(source, {q: term}, function (data, status, xhr) {
            if (xhr === lastXhr) {
                response(data);
            }
        });
    };
    var defaultSelectHandler = function (event, ui) {
        if (ui.item && ui.item.url) {
            window.location = ui.item.url +
                (ui.item.url.indexOf('?') < 0 ? "?" : "&") + "ref=asearch";
        } else {
            var $form = $(this).closest('form');
            $form.submit();
        }
    };
    var defaultPosition = {my: "right top", at: "right bottom", collision: "none", offset: "100px 5px"};
    var defaultMinLength = 2;
    $.fn.hypersearch = function (options) {
        options = options || {};
        var position = _.clone(defaultPosition);
        if (options.position) {
            _.assign(position, options.position);
        }
        var minLength = options.minLength || defaultMinLength;
        var dataSource = options.dataSource || defaultDataSource;
        var selectHandler = options.selectHandler || defaultSelectHandler;
        var appendTo = options.appendTo || false;
        var customCSS = options.css || undefined;
        return this.each(function () {
            var $this = $(this);
            var $form = $(this).closest('form');
            var widgetOptions = {
                minLength: minLength,
                position: position,
                select: selectHandler,
                source: dataSource,
                open: function () {
                    if (customCSS) {
                        $(this).autocomplete('widget').css(customCSS);
                    } else {
                        var width = $this.outerWidth();
                        var offset = $this.offset();
                        $(this).autocomplete('widget').css({
                            'width': width + 'px',
                            'max-width': '1000px',
                            'left': offset.left + 'px'
                        });
                    }
                }
            };
            if (appendTo) {
                widgetOptions.appendTo = appendTo;
            }
            $this.autocomplete(widgetOptions);
            $this.data('uiAutocomplete')._renderItemData = defaultItemDataRenderer;
            $form.find('input, button').focus(function () {
                $form.addClass('hyperfocus');
            }).blur(function () {
                $form.removeClass('hyperfocus');
            });
        });
    };
}(window.jQuery, window._);
;var navScroll = function () {
    var logger = bows('nav_scroll'), win = $(window), navbar = $('.pinned-nav'),
        nav_search = navbar.find('.js-search-toggle'), nav_height = navbar.height(), navbar_parent = navbar.parent(),
        header_container = $('#header'), nav_start_y = navbar.offset().top, scroll_timeout = null,
        fixed_class = 'sticky', velocity_threshold = 2, scroll_log = [];
    reset_scroll_log();
    if ($(window).width() > 768 && !$('body').hasClass('disable-pinning')) {
        $(window).scroll({previousTop: 0}, scroll_listener);
        $(window).resize(function () {
            parent_height = navbar_parent.height();
            if (header_container.css('height') !== parent_height) {
                header_container.css('height', parent_height);
            }
        }).resize();
    }

    function dropdown_disable_scroll($el) {
        $el.bind('mousewheel', function (e) {
            $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
            return false;
        });
    }

    function trigger_close_dropdown($el) {
        if ($el.hasClass('open')) {
            $el.removeClass('open');
        }
    }

    function scroll_listener() {
        var current = win.scrollTop();
        scroll_log.push({top: current, time: (new Date()).getTime()});
        if (current > nav_start_y) {
            pin();
            if (intent_to_navigate() || current <= nav_start_y + (nav_height * 2)) {
                show();
            } else if (intent_to_read()) {
                hide();
            }
        } else {
            unpin(true);
            show();
        }
        this.previousTop = current;
    }

    function pin() {
        if (!navbar.hasClass(fixed_class)) {
            navbar.addClass(fixed_class);
            reset_scroll_log();
            logger('pin');
        }
    }

    function canHide(element) {
        return !nav_search.hasClass('is-toggled');
    }

    function hide() {
        if (canHide()) {
            navbar.addClass('animate-hide');
        }
    }

    function show() {
        navbar.removeClass('animate-hide');
    }

    function unpin(force) {
        if (force || navbar.hasClass(fixed_class)) {
            remove_fixed();
            logger('unpin');
        }
    }

    function remove_fixed() {
        navbar.removeClass(fixed_class);
    }

    function intent_to_navigate() {
        var velocity = px_per_ms();
        return velocity < -velocity_threshold;
    }

    function intent_to_read() {
        var velocity = px_per_ms();
        return velocity > velocity_threshold;
    }

    function reset_scroll_log() {
        scroll_log = [];
        scroll_log.push({top: win.scrollTop(), time: (new Date()).getTime()});
    }

    function px_per_ms() {
        if (scroll_log.length < 2) {
            return 0;
        }
        var p1 = scroll_log[scroll_log.length - 2], p2 = scroll_log[scroll_log.length - 1];
        var dY = p2.top - p1.top, dT = p2.time - p1.time;
        v = dY / dT;
        return v;
    }
};
;var vname, framename, player, scrol;
$(document).ready(function () {
    $('.showplay').click(function () {
        vname = $(this).data('video');
        framename = $(this).data('src');
        $('.' + vname + '-img').addClass('bg-black');
        $('.' + vname + '-img img').addClass('opac');
        $('.' + framename).show();
        player = $f(vname);
        player.api('play');
    });
    $('.video-close').click(function () {
        $(this).parent('div').hide();
        $('.' + vname + '-img img').removeClass('opac');
        player.api('pause');
    });
    $('.video-close-wbg').click(function () {
        $(this).parent().parent('div').hide();
        $('.' + vname + '-img img').removeClass('opac');
        player.api('pause');
    });
    $('.video-frame').click(function () {
        $(this).hide();
        player.api('pause');
    });
});
$('.scrollto').click(function () {
    z = $(this).data('target');
    scrollToAnchor(z);
});

function scrollToAnchor(z) {
    var aTag = $('.' + z);
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
};$(function () {
    var PPC_PHONE_COOKIE = 'adwords_alternate_phone_number', PHONE_CODE_PARAM = 'phonecode', COOKIE_PATH = '/',
        phone_code = $(document).getUrlParam(PHONE_CODE_PARAM), cookie_expiration = 60,
        cookie_options = {expires: cookie_expiration, path: COOKIE_PATH}, phone = $.cookie(PPC_PHONE_COOKIE);
    if (phone_code) {
        var response = $.get('/ppc/phonenumber/' + phone_code + '/').done(function (phone) {
            set_phone(phone);
        });
    } else if (phone) {
        set_phone(phone);
    }

    function set_phone(phone) {
        if ((!$.cookie(PPC_PHONE_COOKIE)) || ($.cookie(PPC_PHONE_COOKIE) != phone)) {
            $.cookie(PPC_PHONE_COOKIE, phone, cookie_options);
        }
        phone = phone.replace(/\"/g, "");
        $("a.telephone").text(phone);
    }
});
;var g2gCallToAction = function () {
    var COOKIE_NAME = "g2g_cta_seen";
    var $g2gModal = $("#goodtogo-modal");
    var isSecureLocation = window.location.protocol == 'https:';
    cta_check();
    init();

    function cta_check() {
        if ($.cookie("is_a") !== "1") {
            return;
        }
        if ($.cookie(COOKIE_NAME) !== "1") {
            $.get("/navigation/goodtogo/", function (data) {
                $g2gModal.empty().append(data).show();
            });
        }
        $.cookie(COOKIE_NAME, "1", {expires: 1, path: '/', secure: isSecureLocation});
    }

    function init() {
        $g2gModal.click(function () {
            $(this).hide();
        });
    }
};
$(function () {
    if (typeof dataLayer == "undefined") {
        return;
    }
    var isAuthenticated = $.cookie("is_a") == "1";
    var logger = bows('datalayer');
    var visitorData = {'visitorType': 'anonymous'};
    if (isAuthenticated) {
        $.get("/profiles/data-layer/", function (visitorDataLayer) {
            visitorData = visitorDataLayer;
            logger('Profile dataLayer loaded', visitorDataLayer);
            _.each(visitorDataLayer, function (value, key, list) {
                dataLayer[key] = value;
            });
            if (typeof Event !== "undefined") {
                var loadedEvent = new Event('visitorDataLoaded');
                document.dispatchEvent(loadedEvent);
            }
            userIdentify();
            updateVIP();
        }).fail(function () {
            logger('Profile dataLayer failed');
        });
    } else {
        var visitorId = $(document).getUrlParam("guuid") || $.cookie("guuid");
        if (!visitorId) {
            visitorId = dataLayer[0].profileId;
        }
        if (visitorId) {
            dataLayer['visitorId'] = String(visitorId);
            dataLayer['visitorType'] = visitorData['visitorType'] = 'member';
        }
        if ($.cookie("browser_agent_code")) {
            dataLayer['visitorType'] = visitorData['visitorType'] = 'agent';
        }
        userIdentify();
    }

    function updateVIP() {
        if (!dataLayer.isVip) {
            return;
        }
        $('.telephone').addClass('vip-phone').text(dataLayer.phoneNumber);
    }

    function userIdentify() {
        if (!dataLayer.visitorId) {
            return;
        }
        logger('userIdentify. visitorId:', dataLayer.visitorId);
        var isSecureLocation = window.location.protocol == 'https:';
        $.cookie("guuid", dataLayer.visitorId, {expires: 14, path: '/', secure: isSecureLocation});
        if (typeof heap !== "undefined") {
            logger('Send user ID to Heap Analytics');
            heap.identify(dataLayer.visitorId);
            var properties = {};
            if (dataLayer.visitorId) {
                properties["handle"] = dataLayer.visitorId;
            }
            logger('visitorType', visitorData['visitorType']);
            properties["visitorType"] = visitorData['visitorType'];
            heap.addUserProperties(properties);
        } else {
            logger('heap (analytics) object is not defined');
        }
        if (typeof (DY) !== "undefined" && typeof (DY.API) !== "undefined") {
            logger('Send login event to Dynamic Yield');
            DY.API("event", {name: "Login", properties: {type: "login-v1", cuid: dataLayer.visitorId}});
        }
    }
});
;$(document).ready(function () {
    $(".hypersearch").hypersearch();
    $(".hypersearch-header").hypersearch({
        appendTo: '#searchInputTarget',
        css: {'width': '100%', 'max-width': '629px', 'left': '50px', 'top': '100px'}
    });
    $(".hypersearch-mobile").hypersearch({css: {'width': '100%', 'max-width': '629px', 'left': '0px'}});
    g2gCallToAction();
    $.each(readyQ, function (index, handler) {
        $(handler);
    });
    $.each(bindReadyQ, function (index, handler) {
        $(document).bind("ready", handler);
    });
    $('form[class="hypersearchform"]').on("submit", function () {
        var searchString = $(this).find('input[name="q"]').val();
        if (searchString) {
            if (typeof DY !== "undefined" && typeof DY.API !== "undefined") {
                DY.API("event", {
                    name: "Keyword Search",
                    properties: {dyType: "keyword-search-v1", keywords: searchString}
                });
            }
        }
    });
});
;$(document).ready(function () {
    var menuButtons = [{
        button: '#destinations_menu_button',
        panel: '#destinations_dropdown_panel',
        className: 'styles_nav_list_item_selected__7oyOT',
    }, {
        button: '#travel_styles_menu_button',
        panel: '#travel_styles_dropdown_panel',
        className: 'styles_nav_list_item_selected__7oyOT',
    }, {
        button: '#why_g_menu_button',
        panel: '#why_g_dropdown_panel',
        className: 'styles_nav_list_item_selected__7oyOT',
    }, {
        button: '#deals_menu_button',
        panel: '#deals_dropdown_panel',
        className: 'styles_nav_list_item_selected__7oyOT',
    },];

    function hideAllDropdownPanels() {
        menuButtons.forEach(({panel, button}) => {
            $(panel).hide();
            $(button).removeClass('styles_nav_list_item_selected__7oyOT');
            $(button).find('.icon_chevronDownGrey').removeClass('rotate_left');
        });
        $('#search_modal_container').hide();
        $('[data-testid="profile-avatar-dropdown"]').hide();
    }

    menuButtons.forEach(({button, panel, className}) => {
        $(button).hover(function () {
            hideAllDropdownPanels();
            $(panel).show();
            $(button).addClass(className);
            $(button).find('.icon_chevronDownGrey').addClass('rotate_left');
            $('#swaps > div').hide();
            $('#swaps > div:first-child').show();
            $('.styles_nav_dropdown_selector__OTc81 button').removeClass('styles_selected__dZWqb',);
            $('.styles_nav_dropdown_selector__OTc81 button:first-child').addClass('styles_selected__dZWqb',);
        });
    });
    var nav_search_button = $('#nav_search_button');
    var search_modal_container = $('#search_modal_container');
    nav_search_button.click(function (e) {
        e.preventDefault();
        hideAllDropdownPanels();
        search_modal_container.toggle();
    });
    var profile_dropdown_menu = $('[data-testid="profile-avatar-dropdown"]');
    var profile_dropdown_menu_non_logged_in = $('[data-testid="profile-avatar-dropdown-non-logged-in"]');
    var profile_dropdown_button = $('#profile_dropdown_button');
    profile_dropdown_button.click(function (e) {
        e.preventDefault();
        hideAllDropdownPanels();
        if ($.cookie("is_a") === "1") {
            profile_dropdown_menu.toggle();
        } else {
            profile_dropdown_menu_non_logged_in.toggle();
        }
    });
    $('body').on('click', function (event) {
        if (event.target === document.body) {
            hideAllDropdownPanels();
        }
    });
    $("#c-inner").click(function () {
        hideAllDropdownPanels();
    });
    $('.styles_nav_dropdown_navigation_button__DMXKE').hover(function () {
        $('.styles_nav_dropdown_navigation_button__DMXKE').removeClass('styles_selected__dZWqb',);
        $(this).addClass('styles_selected__dZWqb');
        var swaps = $('#swaps > div');
        swaps.hide();
        var id = $(this).attr('id');
        $("[data-testid='" + id + "']").show();
    });
    $('button.Mobile_user_control__Wd9Lr').click(function () {
        if ($.cookie("is_a") === "1") {
            $('[data-testid="profile-avatar-dropdown-logged-in"]').toggle();
        } else {
            $('[data-testid="profile-avatar-dropdown-not-logged-in"]').toggle();
        }
    });
    $('#jollof_signup_button').click(function (e) {
        e.preventDefault();
        window.location.href = $(this).attr('href');
    });
    $('#jollof_login_button').click(function (e) {
        e.preventDefault();
        window.location.href = $(this).attr('href');
    });
    $('#desktop_search_header_button').click(function (e) {
        e.preventDefault();
        var searchInput = $('#nav_search_mobile input').val();
        window.location.href = window.location.protocol + "//" + window.location.host + '/search/?q=' + searchInput;
    });
    $('.styles_nav_list_item__gXRu_').click(function (e) {
        e.preventDefault();
    });
    $('.Search_search_header_container__5jbL4 [data-testid="link-component"]').click(function (e) {
        e.preventDefault();
        var searchInput = $('.Search_search_header_container__5jbL4 input').val();
        window.location.href = $(this).attr('href') + searchInput;
    });
    $('.Search_search_mobile_container__fiykU [data-testid="link-component"]').click(function (e) {
        e.preventDefault();
        var searchInput = $('.Search_search_mobile_container__fiykU input').val();
        window.location.href = $(this).attr('href') + searchInput;
    });
    $('.styles_destination_explorer_wrapper__wOiK8').hover(function () {
    }, hideAllDropdownPanels,);
    $('.styles_ways_to_travel_wrapper__On0BU').hover(function () {
    }, hideAllDropdownPanels);
    $('.styles_why_travel_with_g_wrapper__J7xT4').hover(function () {
    }, hideAllDropdownPanels,);
    $('.styles_travel_deals_wrapper__2CAQL').hover(function () {
    }, hideAllDropdownPanels,);
    $('.styles_search_dropdown__WrufZ').hover(function () {
    }, hideAllDropdownPanels,);
    $('a[data-testid="logo"]').hover(hideAllDropdownPanels, hideAllDropdownPanels,);
    $('.Search_search_mobile_top_focus__cbNAo').click(function (e) {
        e.stopPropagation();
        $(".jollof_search_header").hide();
        $("[data-testid='Search'] .Modal_modal_has_title_text__XzqC8").hide();
        $(".Search_search_mobile_input_close_button__FqyPl").show();
    });
    $('.Search_search_mobile_input_close_button__FqyPl').click(function (e) {
        e.stopPropagation();
        $(".jollof_search_header").show();
        $("[data-testid='Search'] .Modal_modal_has_title_text__XzqC8").show();
        $(".Search_search_mobile_input_close_button__FqyPl").hide();
    });
    $('#nav_search_mobile input[name=q]').on('input', function () {
        if ($(this).val().length > 0) {
            $('.jollof_desktop_nav_dropdown').css('height', '510px');
        } else {
            $('.jollof_desktop_nav_dropdown').css('height', 'auto');
        }
    });
});
;$(document).ready(function () {
    $(".BottomIcons_bottom_icons_container___42eI > div[role='button']").click(function () {
        $(this).addClass('BottomIcons_is_active__Yqc7q');
        $(".BottomIcons_bottom_icons_container___42eI > div[role='button']").not(this).removeClass('BottomIcons_is_active__Yqc7q');
        var bottomNavButtonName = $(this).find('span').attr("data-testid");
        $('.Modal_modal_overlay__bCKGC[data-testid="' +
            bottomNavButtonName + '"]',).show();
        $('.Modal_modal_overlay__bCKGC').not('[data-testid="' + bottomNavButtonName + '"]').hide();
    },);
    $('.styles_accordion_toggle__nMAeY').click(function () {
        $(this).find('.styles_accordion_collapse_icon__cyx6r').toggleClass('styles_expanded__avkfI');
        var accordionCollapse = $(this).next('.styles_accordion_collapse__9YZG7');
        if (accordionCollapse.attr('style')) {
            accordionCollapse.removeAttr('style');
        } else {
            accordionCollapse.css('height', '0px');
        }
    });
    $('.Modal_close_btn__qn_on').click(function () {
        $('.Modal_modal_overlay__bCKGC').hide();
    });
    $('#jollof_jump_to_destinations').click(function (e) {
        e.preventDefault();
        $('#jollof_menu_button').removeClass('BottomIcons_is_active__Yqc7q');
        $('[id="jollof_menu"]').hide();
        $('[data-testid="Destinations"]').show();
        $('.BottomIcons_bottom_icons_container___42eI > div:first-child').addClass('BottomIcons_is_active__Yqc7q');
    });
});
;