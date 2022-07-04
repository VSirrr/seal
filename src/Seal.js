export default class Seal {
  constructor(id) {
    this.canvas = document.querySelector(id)
    this.ctx = this.canvas.getContext('2d')
  }

  // 保存印章（base64）
  saveSeal() {
    return this.canvas.toDataURL()
  }
}
