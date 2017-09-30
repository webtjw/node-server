const RouteHandle = {
  // 已注册路由对象集合，按先后顺序匹配
  routes: [],
  // 初始化路由对象
  init () {
    
  },
  dispatch (request, response) {
    console.log(request)
  }
}

//  初始化
RouteHandle.init();


module.exports = RouteHandle;