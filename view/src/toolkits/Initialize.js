import Vue from 'vue'
import VueSvg from '../components/ui/VueSvg'
import Hinter from '../components/ui/Hinter'

const Initialize = {
  init () {
    // this.initFontSize()
    this.registerGlobalComponents()
  },
  registerGlobalComponents () {
    Vue.component('vue-svg', VueSvg)
    Vue.component('hinter', Hinter)
  },
  initFontSize () {
    const dEl = document.documentElement
    const dWidth = parseInt(dEl.clientWidth, 10) // 指明十进制
    if (dWidth > 1200) {
      dEl.style.fontSize = '16px'
    } else {
      const sizeRatio = dWidth / 375 // 相对 iphone6 的比例
      dEl.style.fontSize = sizeRatio * 16 + 'px'
    }
  }
}

export default Initialize
