let Toast = {
  // Toast 组件需要用到的状态都放在 data 里面
  data: {
    show: false,
    text: ''
  },
  clock: null,
  show (text, delay) {
    delay = parseInt(delay, 10) // 指明十进制
    !delay && (delay = 3000)

    if (!text) console.error('Toast needing warning text!')
    else {
      this.data.show = true
      this.data.text = text

      if (!this.clock) clearTimeout(this.clock)
      this.clock = setTimeout(this.hide.bind(this), delay)
    }
  },
  hide () {
    this.data.show = false
  }
}

window.Toast = Toast

export default Toast
