let utils = require('./utils/util')
App({
  globalData: {
    userInfo: null,
    token: null
  },
  //globalReqUrl: 'http://127.0.0.1:1818/superman', //本地
  globalReqUrl: 'https://www.youshow.xyz:1818/superman', //阿里云
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        this.getUserInfo(res.code);
      }
    })

  },
  getUserInfo: function(code) {
    let paramdata = {
      code: code,
      token: wx.getStorageSync('token')
    }
    console.log(paramdata);
    return utils.requestApi(`${this.globalReqUrl}/user/green/getUserInfo`, paramdata).then(
      res => {
        console.log("res:" + res.code);
        this.globalData.token = res.data.token
        this.globalData.userInfo = res.data.user
        wx.setStorageSync('token', res.data.token)
        //console.log('缓存数据', wx.getStorageSync('token'))
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(this.globalData.userInfo)
        }
        return res.data
      },
      err => {
        console.log('error', err)
        if (1000 == err.code) {
          this.globalData.userInfo = null
          this.globalData.token = err.msg
          wx.setStorageSync('token', err.msg)
        } else if (1001 == err.code) {
          console.log("code过期");
        }
        return err
      }
    )
  }
})