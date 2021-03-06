/*4.1 点击menu,设置自然滚动tween 18-12-5*/
(function () {
  let view = document.querySelector('nav.menu')
  let controller = {
    view: null,
    aTags: null,
    initAnimation: function () {// 设置循环动画
      function animate(time) { requestAnimationFrame(animate); TWEEN.update(time); }
      requestAnimationFrame(animate);
    },
    init: function (view) {
      this.view = view;
      this.aTags = this.view.querySelectorAll('ul > li >a')//ATags是个NodeList
      this.initAnimation()
      this.bindEvents()
      console.log('结束')
    },
    scrollToElement: function (element) {
      let top = element.offsetTop; //上面四句可归为一句
      //window.scrollTo(0,top - 55);  //(左右滑，上下滑动)手动设置滑动位置
      let currentTop = window.scrollY; //当前滑动的高度
      let targetTop = top - 48;
      let s = targetTop - currentTop; //距离
      let t = Math.abs((s / 100) * 100)   //移动时间
      let coords = { y: currentTop }; // 起始点 (0, 0)
      if (t > 400) { t = 400; }
      let tween = new TWEEN.Tween(coords) // 创建一个新的tween用来改变 'coords'
        .to({ y: targetTop }, t) // 在1s内移动至 (300, 200)
        .easing(TWEEN.Easing.Quadratic.InOut) // 使用缓动功能使的动画更加平滑
        .onUpdate(function () { // 在 tween.js 更新 'coords' 后调用
          // 将 'box' 移动到 'coords' 所描述的位置，配合 CSS 过渡
          window.scrollTo(0, coords.y);
        })
        .start(); // 立即开始 tween
    },
    bindEvents: function () {
      console.log('绑定事件开始')
      for (let i = 0; i < this.aTags.length; i++) {
        this.aTags[i].onclick = function (x) {
          x.preventDefault();
          let element = document.querySelector(x.currentTarget.getAttribute('href'))
          this.scrollToElement(element)
          console.log('我有运行到这里哦')
        }.bind(this)
      }
    }
  }
  controller.init(view)
  console.log('程序结束')
})()
