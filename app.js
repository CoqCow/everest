//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
       success: res => {
        // 这里可以拿到登录code
        console.log(res.code);
      
       //请求我们后端的获取用户信息接口
         wx.request({
           url: 'http://127.0.0.1:1818/superman/user/green/getUserInfo', 
           data: {
             code: res.code
           },
           header: {
             'content-type': 'application/json'
           },
           method: "POST",
           success(res) {
             //接口返回值
             console.log("code:" + res.data.code)
             console.log("msg:"+ res.data.msg)
             console.log("openId:" + res.data.data)
           }
         })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token:null
  },
  globalReqUrl: 'http://127.0.0.1:1818/superman', //本地
})