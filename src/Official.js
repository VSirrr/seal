import Seal from './Seal.js'
import { normalize } from './_util'

export default class Official extends Seal {
  static defaultOptions = {
    // 公司信息
    name: '请设置印章名称',
    code: '', // 13位数字
    type: '', // eg. 公司公章 合同专用章
    // 样式
    radius: 75,
    color: '#e60021',
    fontFamily: '宋体',
    fontSize: 18,
    lineWidth: 4,
    innerLine: false,
    typeFontSize: 16,
    codeFontSize: 10
  }

  constructor(id, options) {
    super(id)
    this.options = Object.assign({}, Official.defaultOptions, options || {})

    this._init()
  }

  _init() {
    const {
      ctx,
      canvas,
      options: { code, type, radius, innerLine }
    } = this

    canvas.width = canvas.height = radius * 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this._drawOuterline()
    if (innerLine) {
      this._drawInnerLine()
    }
    this._draw5Star()
    this._drawName()
    if (type) {
      this._drawType()
    }
    if (code) {
      this._drawCode()
    }
  }

  _drawOuterline() {
    const {
      ctx,
      options: { color, radius, lineWidth }
    } = this
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(radius, radius, radius - lineWidth, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.restore()
  }

  _drawInnerLine() {
    const {
      ctx,
      options: { color, radius, lineWidth }
    } = this

    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(
      radius,
      radius,
      radius - lineWidth - radius / 15,
      0,
      Math.PI * 2,
      true
    )
    ctx.stroke()
    ctx.restore()
  }

  _draw5Star() {
    const {
      ctx,
      options: { color, radius }
    } = this

    ctx.save()
    ctx.fillStyle = color
    ctx.translate(radius, radius)
    ctx.rotate(Math.PI)
    ctx.beginPath()
    const dig = (Math.PI / 5) * 4
    for (let i = 0; i < 5; i++) {
      const x = Math.sin(i * dig)
      const y = Math.cos(i * dig)
      ctx.lineTo(x * 30, y * 30)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  _drawName() {
    const {
      ctx,
      options: { name, color, radius, fontSize, fontFamily }
    } = this

    if ('string' !== typeof name) {
      throw new TypeError('name 字段必须是字符串类型')
    }

    const companyName = normalize(name)

    ctx.fillStyle = color
    ctx.font = `normal normal normal ${fontSize}px ${fontFamily}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.translate(radius, radius)

    for (let i = 0, length = companyName.length; i < length; i++) {
      ctx.save()
      ctx.rotate(-0.17 * (length - 1) + i * 0.34)
      ctx.fillText(companyName[i], -fontSize / 2, -radius * 0.73)
      ctx.restore()
    }
  }

  _drawType() {
    const {
      ctx,
      options: { type, radius, typeFontSize, fontFamily }
    } = this

    if ('string' !== typeof type) {
      throw new TypeError('type 字段必须是字符串类型')
    }

    ctx.font = `normal normal normal ${typeFontSize}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.fillText(normalize(type), 0, radius * 0.5)
    ctx.restore()
  }

  _drawCode() {
    const {
      ctx,
      options: { code, radius, codeFontSize, fontFamily }
    } = this

    if (typeof code !== 'string') {
      throw new TypeError('防伪码只能为字符串！')
    }
    if (code.length !== 13) {
      throw new RangeError('防伪码只能为13位！')
    }

    ctx.font = `normal normal normal ${codeFontSize}px ${fontFamily}`

    for (let i = 0; i < code.length; i++) {
      ctx.save()
      ctx.rotate(0.57 - i * 0.1)
      ctx.fillText(code[i], -0.03 * radius, 0.8 * radius)
      ctx.restore()
    }
  }
}
