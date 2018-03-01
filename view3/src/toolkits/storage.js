let Storage = {
  getCookie (key) {
    if (document.cookie) {
      let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
      let result = document.cookie.match(reg)
      if (result && result.length > 2) return result[2]
    }

    return null
  }
}

export default Storage
