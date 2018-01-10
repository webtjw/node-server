;(function () {
  if (window.Lottery) {
    console.error('The valiabale "window.Lottery" has been used');
    return;
  }

  /**
   * @param settings.cavcas canvas element's id name
   * @param settings.data lottery's prize, an object like this: {text: 'lottery', image: 'http://lottery.com/a.png'}
   * @param settings.outLine the line outside, object like this: {width: 3, color: '#000'}
   * @param settings.itemSize size of image in sector
   */

  var Lottery = function (settings) {
    if (settings && Object.prototype.toString.call(settings) === '[object Object]') this.settings = settings;
    this.init();
    return this;
  };

  Lottery.prototype = {
    running: false,
    settings: {},
    canvas: null, // element
    context: null, // context in 2d
    data: [], // datas
    maxRadius: 0, // max radius which may including outside circle
    radius: 0, // the real size of lottery circle
    dpr: 1,

    // initialize func & element
    init: function () {
      var checkResult = this._checkNecessaryParams();
      if (checkResult === true) {
        this.canvas = document.getElementById(this.settings.canvas);
        this.context = this.canvas.getContext('2d');

        this.sizeCanvas();
        this.settings.itemSize = this.settings.itemSize * this.dpr;
        this.draw(0);

        this.canvas.addEventListener('click', this.start.bind(this));
      } else console.error('wrong settings parmas:' + checkResult + ', please check');
    },

    // check params
    _checkNecessaryParams: function () {
      var settings = this.settings;
      // check canvas element
      if (!settings.canvas || !document.getElementById(settings.canvas)) return 'canvas';
      if (!settings.data || !settings.data.length) return 'data';

      return true;
    },

    // set the size params of canvas element
    sizeCanvas: function () {
      var dpr = window.devicePixelRatio || 1,
        physicalWidth = window.parseFloat(window.getComputedStyle(this.canvas).width),
        drawWidth = physicalWidth * dpr;
      
      this.dpr = dpr;
      this.maxRadius = drawWidth / 2;
      this.canvas.setAttribute('width', drawWidth);
      this.canvas.setAttribute('height', drawWidth);
    },

    draw: function (angle) {
      var _this = this;

      this.context.clearRect(0, 0, this.maxRadius, this.maxRadius);
      this.drawOutline();
      this.drawSector.bind(this)(angle);
      this.drawPointer();
    },

    drawOutline: function () {
      var settings = this.settings,
      maxRadius = this.maxRadius;

      if (settings.outLine) {
        var context = this.context;

        context.save();
        context.translate(maxRadius, maxRadius);
        context.arc(0, 0, maxRadius, 0, 2 * Math.PI);
        context.fillStyle = settings.outLine.color || '#e62d2d';
        context.fill();
        context.restore();
      }

      if (settings.outLine && settings.outLine.width) this.radius = maxRadius - settings.outLine.width
      else this.radius = maxRadius
    },
    
    drawSector: function (angle) {
      var _this = this,
        settings = this.settings,
        context = this.context,
        maxRadius = this.maxRadius,
        radius = this.radius,
        itemSize = settings.itemSize,
        distance = settings.distance || 0.95,
        oneDegree = 2 * Math.PI / settings.data.length;

      settings.data.forEach(function (item, index) {
        if (index % 2 === 0) context.fillStyle= 'rgba(255, 255, 255, 1)';
        else context.fillStyle= 'rgba(255, 246, 219, 1)';
        
        var startDegree = (angle || 0) + oneDegree * index,
          endDegree = startDegree + oneDegree;

        // 绘制底部扇形
        context.save();
        context.translate(maxRadius, maxRadius);
        context.beginPath();
        context.arc(0, 0, radius, startDegree, endDegree);
        context.save();
        context.rotate(endDegree);
        context.moveTo(radius, 0);
        context.lineTo(0, 0);
        context.restore();
        context.rotate(startDegree);
        context.lineTo(radius, 0);
        context.closePath();
        context.restore();
        context.fill();   

        var img = new Image();
        img.src = item.image;
        if (!img.complete) img.addEventListener('load', function () {
          _this.loadImage(img, item.text, oneDegree, startDegree, endDegree);
        }.bind(_this));
        else _this.loadImage(img, item.text, oneDegree, startDegree, endDegree);
      })
    },

    loadImage: function (img, text, oneDegree, sdeg, edeg) {
      var maxRadius = this.maxRadius,
        radius = this.radius,
        context = this.context,
        settings = this.settings,
        itemSize = settings.itemSize,
        distance = settings.distance || 0.95;

      context.save();
      context.translate(maxRadius, maxRadius);
      context.rotate(sdeg);
      context.translate(distance * radius * Math.cos(oneDegree / 2) + itemSize / 2 * Math.sin(oneDegree / 2), distance * radius * Math.sin(oneDegree / 2) - itemSize / 2 * Math.cos(oneDegree / 2));
      context.rotate((Math.PI + oneDegree) / 2);
      context.font = 12 * this.dpr + 'px "Microsoft Yahei"';
      context.drawImage(img, 0, 0, itemSize, itemSize);
      context.fillStyle = '#e62d2d';
      context.textAlign = 'center';
      context.fillText(text, itemSize / 2, itemSize * 1.1);
      context.restore();
    },

    drawPointer: function () {
      var img = new Image(),
        width = 93 * this.dpr,
        maxRadius = this.maxRadius,
        context = this.context;

      img.src = './images/playbtn.png';

      context.save();
      if (img.complete) {
        context.translate(maxRadius, maxRadius);
        context.drawImage(img, -width / 2,  -width / 2, width, width);
        context.restore();
      } else img.addEventListener('load', function () {
        context.translate(maxRadius, maxRadius);
        context.drawImage(img, -width / 2,  -width / 2, width, width);
        context.restore();
      })
    },

    start: function () {
      var context = this.context,
        maxRadius = this.maxRadius,
        running = this.running,
        oneDegree = 2 * Math.PI / this.settings.data.length,
        finalAngle = 10 * Math.PI + oneDegree * this.settings.selectedIndex + (Math.random() * 0.5 + 0.3) * oneDegree + Math.PI / 2;
      var maxSpeed = Math.PI / 9;

      if (!running) {
        this.running = true;
        this.animate(0, finalAngle, maxSpeed)
      }
    },

    animate: function (number, sum ,speed) {
      var _this = this;
      var settings = this.settings,
        percentage = this.toFixed(number / sum),
        angle = this.toFixed(Math.PI * (0.5 - percentage / 2)),
        delta = this.toFixed(speed * Math.sin(angle));

      if (percentage >= 1) {
        this.running = false;
        settings.callback && settings.callback();
      }
      else {
        number += delta;
        this.draw(number);
        window.requestAnimationFrame(function () {
          this.animate(number, sum, speed)
        }.bind(_this))
      }
    },

    toFixed: function (num) {
      return +Number.prototype.toFixed.call(num, 2)
    }
  }
  
  window.Lottery = Lottery;
}())