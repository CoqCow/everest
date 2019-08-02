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
         console.log(res.code);
        // 这里可以拿到登录code
         //this.getUserInfo(res.code);
      }
    }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("here");
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
  getUserInfo: function (code) {
    let that = this
    let paramdata = {
      code: code,
      token: that.token
    }
    console.log(paramdata);
    return utils.requestApi(`${this.globalReqUrl}/user/green/getUserInfo`, paramdata).then(
      res => {
        console.log("res:"+res.code);
        code=res.code;
        console.log(code);
        if(200==code){
          that.userInfo = res.data.user;
          that.token = res.data.token;
          console.log("success");
        }

       // wx.setStorageSync('globaluserInfo', res.data)
       // console.log('缓存数据', wx.getStorageSync('globaluserInfo'))
       // console.log(res, that, '用户接口请求')
        return res.data
      },
      err => {
        console.log('error', err)
        if (1000 == err.code){
          console.log("没有注册");
        }else if (1001 == err.code) {
          console.log("code过期");
        }
       // wx.removeStorageSync('globaluserInfo')
        return err
      }
    )
  },
  globalData: {
    userInfo: null,
    token:null
  },
  globalReqUrl: 'http://127.0.0.1:1818/superman', //本地
})