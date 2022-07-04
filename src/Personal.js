import Seal from './Seal.js'

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

    if (border) {
      const pad = lineWidth * 2
      canvas.width = name.length * fontSize + pad
      canvas.height = fontSize + pad
      this._drawBorder()
    } else {
      canvas.width = name.length * fontSize
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
      name,
      border ? lineWidth : 0,
      fontSize / 2 + (border ? lineWidth : 0)
    )
  }
}
