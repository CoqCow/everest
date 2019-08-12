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
      url: '/pages/personal/personal?status=2'
    })
  },
  /**
   * 进行中
   */
  ongoing: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?status=3'
    })
  },
  /**
   * 已完成
   */
  complete: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?status=4'
    })
  },
  /**
   * 未完成
   */
  fail: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?status=5'
    })
  },

  /**
   * 私密计划
   */
  private: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?type=1'
    })
  },
  /**
   * 公开计划
   */
  public: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?type=2'
    })
  },
  /**
   * 我的点赞
   */
  upvote: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?upvote=1'
    })
  },
  /**
   * 我的挑战
   */
  challenge: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?type=3'
    })
  }
});