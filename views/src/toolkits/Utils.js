const Utils = {
  isMobile () {
    const mobileDetect = new  require('mobile-detect')(window.navigator.userAgent)
    console.log(mobileDetect)
  }
}

export default Utils