// 浏览器检测
(function (win) {
  var ua = win.navigator.userAgent.toLowerCase();
  if (ua.indexOf('msie') > -1) {
    var reg = ua.match(/msie\s*([0-9\.]+);/);
    if (reg && reg.length === 2 && parseInt(reg[1], 10) < 9) {
      alert('本站不支持在IE9以下的IE浏览器中浏览，推荐使用最新版本的谷歌浏览器');
    }
  }
})(window)