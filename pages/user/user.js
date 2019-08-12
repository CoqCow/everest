//user.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    token: null,
    total: null,
    planList: null,
  },
  /**
   * 新建计划
   */
  created: function() {
    wx.navigateTo({
      url: '/pages/create/create',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      token: wx.getStorageSync("token")
    });
  },
  /**
   * 未开始
   */
  notbegin: function() {
    wx.navigateTo({
      url: '/pages/notbegin/notbegin',
    })
  },
  /**
   * 进行中
   */
  ongoing: function () {
    wx.navigateTo({
      url: '/pages/ongoing/ongoing',
    })
  },
  /**
   * 已完成
   */
  complete: function () {
    wx.navigateTo({
      url: '/pages/doneover/doneover',
    })
  },
  /**
   * 未完成
   */
  fail:function(){
    wx.navigateTo({
      url: '/pages/donefail/donefail',
    })
  }
});