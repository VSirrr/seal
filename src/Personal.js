import Seal from './Seal.js'
import { normalize } from './_util'

export default class Personal extends Seal {
  static defaultOptions = {
    name: '请设置印章姓名',
    // 样式
    color: '#e60021',
    fontFamily: '宋体',
    fontSize: 40,
    lineWidth: 10,
    border: true
  }

  constructor(id, options) {
    super(id)
    this.options = Object.assign({}, Personal.defaultOptions, options || {})

    this._init()
  }

  _init() {
    const {
      canvas,
      options: { name, border, lineWidth, fontSize }
    } = this

    if ('string' !== typeof name) {
      throw new TypeError('name 字段必须是字符串类型')
    }

    const personName = normalize(name)

    if (border) {
      const pad = lineWidth * 2
      const dotNum = personName.replace(/[^·]/g, '').length

      if (dotNum) {
        canvas.width =
          (personName.length - dotNum) * fontSize +
          dotNum * (fontSize / 2) +
          pad
      } else {
        canvas.width = personName.length * fontSize + pad
      }
      canvas.height = fontSize + pad
      this._drawBorder()
    } else {
      canvas.width = personName.length * fontSize
      canvas.height = fontSize
    }

    this._drawName()
  }

  _drawBorder() {
    const {
      ctx,
      canvas: { width, height },
      options: { color, lineWidth }
    } = this

    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.strokeRect(0, 0, width, height)
    ctx.stroke()
    ctx.restore()
  }

  _drawName() {
    const {
      ctx,
      options: { name, color, border, lineWidth, fontSize, fontFamily }
    } = this

    ctx.textAlign = 'left'
    ctx.fillStyle = color
    ctx.textBaseline = 'middle'
    ctx.font = `normal normal normal ${fontSize}px ${fontFamily}`

    ctx.fillText(
      normalize(name),
      border ? lineWidth : 0,
      fontSize / 2 + (border ? lineWidth : 0)
    )
  }
}
