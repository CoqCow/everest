let utils = require('./utils/util')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
       success: res => {
         this.getUserInfo(res.code);
      }
    })
   /* wx.getSetting({
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
    })*/
  },
  getUserInfo: function (code) {
    let that = this
    let paramdata = {
      code: code,
      token: wx.getStorageSync('token')
    }
    console.log(paramdata);
    return utils.requestApi(`${this.globalReqUrl}/user/green/getUserInfo`, paramdata).then(
      res => {
        console.log("res:"+res.code);
        this.globalData.userInfo = res.data.user;
        this.globalData.token = res.data.token
        wx.setStorageSync('token', res.data.token)
       //console.log('缓存数据', wx.getStorageSync('token'))

        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(this.globalData.userInfo)
        }
        return res.data
      },
      err => {
        console.log('error', err)
        if (1000 == err.code){
          that.userInfo = null
          that.token = err.msg
          wx.setStorageSync('token', err.msg)
        }else if (1001 == err.code) {
          console.log("code过期");
        }
        return err
      }
    )
  },
  globalData: {
    userInfo: null,
    token:null
  },
  globalReqUrl: 'http://39.106.162.237:1818/superman', //本地
})