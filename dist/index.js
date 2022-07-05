/*! Copyright Notice
 * @version 0.1.0
 * @author VSirrr <1084037255@qq.com>
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Seal =
        e())
})(this, function () {
  'use strict'
  function t(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function')
  }
  function e(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n]
      ;(r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r)
    }
  }
  function n(t, n, r) {
    return (
      n && e(t.prototype, n),
      r && e(t, r),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      t
    )
  }
  function r(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (t[e] = n),
      t
    )
  }
  function o(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function')
    ;(t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 }
    })),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e && a(t, e)
  }
  function i(t) {
    return (
      (i = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          }),
      i(t)
    )
  }
  function a(t, e) {
    return (
      (a = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (t, e) {
            return (t.__proto__ = e), t
          }),
      a(t, e)
    )
  }
  function l(t, e) {
    if (e && ('object' == typeof e || 'function' == typeof e)) return e
    if (void 0 !== e)
      throw new TypeError(
        'Derived constructors may only return object or undefined'
      )
    return (function (t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      return t
    })(t)
  }
  function c(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' == typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (t) {
        return !1
      }
    })()
    return function () {
      var n,
        r = i(t)
      if (e) {
        var o = i(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return l(this, n)
    }
  }
  var s = (function () {
      function e(n) {
        t(this, e),
          (this.canvas = document.querySelector(n)),
          (this.ctx = this.canvas.getContext('2d'))
      }
      return (
        n(e, [
          {
            key: 'saveSeal',
            value: function () {
              return this.canvas.toDataURL()
            }
          }
        ]),
        e
      )
    })(),
    f = (function (e) {
      o(i, e)
      var r = c(i)
      function i(e, n) {
        var o
        return (
          t(this, i),
          ((o = r.call(this, e)).options = Object.assign(
            {},
            i.defaultOptions,
            n || {}
          )),
          o._init(),
          o
        )
      }
      return (
        n(i, [
          {
            key: '_init',
            value: function () {
              var t = this.ctx,
                e = this.canvas,
                n = this.options,
                r = n.code,
                o = n.type,
                i = n.radius,
                a = n.innerLine
              ;(e.width = e.height = 2 * i),
                t.clearRect(0, 0, e.width, e.height),
                this._drawOuterline(),
                a && this._drawInnerLine(),
                this._draw5Star(),
                this._drawName(),
                o && this._drawType(),
                r && this._drawCode()
            }
          },
          {
            key: '_drawOuterline',
            value: function () {
              var t = this.ctx,
                e = this.options,
                n = e.color,
                r = e.radius,
                o = e.lineWidth
              t.save(),
                (t.strokeStyle = n),
                (t.lineWidth = o),
                t.beginPath(),
                t.arc(r, r, r - o, 0, 2 * Math.PI, !0),
                t.stroke(),
                t.restore()
            }
          },
          {
            key: '_drawInnerLine',
            value: function () {
              var t = this.ctx,
                e = this.options,
                n = e.color,
                r = e.radius,
                o = e.lineWidth
              t.save(),
                (t.strokeStyle = n),
                (t.lineWidth = 1),
                t.beginPath(),
                t.arc(r, r, r - o - r / 15, 0, 2 * Math.PI, !0),
                t.stroke(),
                t.restore()
            }
          },
          {
            key: '_draw5Star',
            value: function () {
              var t = this.ctx,
                e = this.options,
                n = e.color,
                r = e.radius
              t.save(),
                (t.fillStyle = n),
                t.translate(r, r),
                t.rotate(Math.PI),
                t.beginPath()
              for (var o = (Math.PI / 5) * 4, i = 0; i < 5; i++) {
                var a = Math.sin(i * o),
                  l = Math.cos(i * o)
                t.lineTo(30 * a, 30 * l)
              }
              t.closePath(), t.fill(), t.restore()
            }
          },
          {
            key: '_drawName',
            value: function () {
              var t = this.ctx,
                e = this.options,
                n = e.name,
                r = e.color,
                o = e.radius,
                i = e.fontSize,
                a = e.fontFamily
              ;(t.fillStyle = r),
                (t.font = 'normal normal normal '.concat(i, 'px ').concat(a)),
                (t.textAlign = 'left'),
                (t.textBaseline = 'middle'),
                t.translate(o, o)
              for (var l = 0, c = n.length; l < c; l++)
                t.save(),
                  t.rotate(-0.17 * (c - 1) + 0.34 * l),
                  t.fillText(n[l], -i / 2, 0.73 * -o),
                  t.restore()
            }
          },
          {
            key: '_drawType',
            value: function () {
              var t = this.ctx,
                e = this.options,
                n = e.type,
                r = e.radius,
                o = e.typeFontSize,
                i = e.fontFamily
              ;(t.font = 'normal normal normal '.concat(o, 'px ').concat(i)),
                (t.textAlign = 'center'),
                t.fillText(n, 0, 0.5 * r),
                t.restore()
            }
          },
          {
            key: '_drawCode',
            value: function () {
              var t = this.ctx,
                e = this.options,
                n = e.code,
                r = e.radius,
                o = e.codeFontSize,
                i = e.fontFamily
              if ('string' != typeof n)
                throw new TypeError('防伪码只能为字符串！')
              if (13 !== n.length) throw new RangeError('防伪码只能为13位！')
              t.font = 'normal normal normal '.concat(o, 'px ').concat(i)
              for (var a = 0; a < n.length; a++)
                t.save(),
                  t.rotate(0.57 - 0.1 * a),
                  t.fillText(n[a], -0.03 * r, 0.8 * r),
                  t.restore()
            }
          }
        ]),
        i
      )
    })(s)
  r(f, 'defaultOptions', {
    name: '请设置印章名称',
    code: '',
    type: '',
    radius: 75,
    color: '#e60021',
    fontFamily: '宋体',
    fontSize: 18,
    lineWidth: 4,
    innerLine: !1,
    typeFontSize: 16,
    codeFontSize: 10
  })
  var u = (function (e) {
    o(i, e)
    var r = c(i)
    function i(e, n) {
      var o
      return (
        t(this, i),
        ((o = r.call(this, e)).options = Object.assign(
          {},
          i.defaultOptions,
          n || {}
        )),
        o._init(),
        o
      )
    }
    return (
      n(i, [
        {
          key: '_init',
          value: function () {
            var t = this.canvas,
              e = this.options,
              n = e.name,
              r = e.border,
              o = e.lineWidth,
              i = e.fontSize
            if (r) {
              var a = 2 * o
              ;(t.width = n.length * i + a),
                (t.height = i + a),
                this._drawBorder()
            } else (t.width = n.length * i), (t.height = i)
            this._drawName()
          }
        },
        {
          key: '_drawBorder',
          value: function () {
            var t = this.ctx,
              e = this.canvas,
              n = e.width,
              r = e.height,
              o = this.options,
              i = o.color,
              a = o.lineWidth
            t.save(),
              (t.strokeStyle = i),
              (t.lineWidth = a),
              t.beginPath(),
              t.strokeRect(0, 0, n, r),
              t.stroke(),
              t.restore()
          }
        },
        {
          key: '_drawName',
          value: function () {
            var t = this.ctx,
              e = this.options,
              n = e.name,
              r = e.color,
              o = e.border,
              i = e.lineWidth,
              a = e.fontSize,
              l = e.fontFamily
            ;(t.textAlign = 'left'),
              (t.fillStyle = r),
              (t.textBaseline = 'middle'),
              (t.font = 'normal normal normal '.concat(a, 'px ').concat(l)),
              t.fillText(n, o ? i : 0, a / 2 + (o ? i : 0))
          }
        }
      ]),
      i
    )
  })(s)
  return (
    r(u, 'defaultOptions', {
      name: '请设置印章姓名',
      color: '#e60021',
      fontFamily: '宋体',
      fontSize: 40,
      lineWidth: 10,
      border: !0
    }),
    (s.Official = f),
    (s.Personal = u),
    s
  )
})
