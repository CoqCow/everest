const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    userInfo:null
  },
  details2:function(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  onLoad: function () {
    this.setData({
      userInfo:app.globalData.userInfo
    })
  }
})
