const Initialization = {
  init () {
    this.initFontSize()
  },
  initFontSize () {
    const dEl = document.documentElement
    const dWidth = parseInt(dEl.clientWidth)
    if (dWidth > 1200) {
      dEl.style.fontSize = '16px'
    } else {
      const sizeRatio = dWidth / 375 // 相对 iphone6 的比例
      dEl.style.fontSize = sizeRatio * 16 + 'px'
    }
  }
}
export default Initialization
