//user.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util');

Page({
  created: function () {
    wx.navigateTo({
      url: '/pages/create/create',
    })
  },
  data: {
    userInfo: {},
    banner: null,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    txtAds: null,
    advertise: null
  },
  /*
  * 首页banner
  */
  setBanner: function () {
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/banner', function (data) {
      that.setData({
        banner: data.data
      });
    });
  },
  /**
   * 首页文字广告
   */
  setTxtAds: function () {
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/roll', function (data) {
      that.setData({
        txtAds: data.data[0]
      });
    });
  },
  /**
   * 首页两块子banner
   */
  setSubBanner: function () {
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/index', function (data) {
      that.setData({
        advertise: data.data
      });
    });
  },
  /**
   * 模块入口
   */
  setModule: function () {

  },
  /**
   * 入口
   */
  /*onLoad: function () {
    var that = this;
    that.setBanner();
    that.setTxtAds();
    that.setSubBanner();
    that.setModule();
    
  }*/
  onLoad: function () {
    //获取用户昵称及头像
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
});