let utils = require('../../utils/util');
const app = getApp();
Page({
  data: {
    begin: 1571500800000,
    day:0,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    if (app.globalData.userInfo) {
      //用户已经授权过
      wx.switchTab({
        url: '/pages/square/square'
      })
    }
    else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        wx.switchTab({
          url: '/pages/square/square'
        })
      }
    }
    else {
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({});
          }
        }
        
      })
    }
  },
  bindGetUserInfo: function(e) {
   if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      let paramdata = {
        token: wx.getStorageSync("token"),
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        gender: e.detail.userInfo.gender,
        country: e.detail.userInfo.country,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city
      }
      return utils.requestApi(`${app.globalReqUrl}/user/green/register`, paramdata).then(
        res => {
          console.log("res:" + res.code);
          app.globalData.userInfo = res.data.user;
          app.globalData.token = res.data.token

          wx.switchTab({
            url: '/pages/square/square',
          })
          return res.data
        },
        err => {
          console.log('error', err)
          return err
        }
      )
    } else {
     let userInfo = {
       nickName: '匿名',
       avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ic0hVMibI2lR0hun2Bcgb5RI37PND6PIicYsNUvpBZP0hA9dyBiavxhWbZEIommWr3CicDeaBicCbt2p5M9ULqicAeOHQ/132',
     }
     app.globalData.userInfo = userInfo;
     wx.switchTab({
       url: '/pages/square/square',
     })
      //用户按了拒绝按钮
      // wx.showModal({

      //   title: '提示',
      //   content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //   showCancel: false,
      //   confirmText: '返回授权',
      //   success: function(res) {
      //     if (res.confirm) {
      //       console.log('用户点击了“返回授权”')
      //     }
      //   }
      // })
    }
  }
})