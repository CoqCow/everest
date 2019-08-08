// pages/detail/detail.js
const app = getApp();
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: null,
    userInfo: null,
    planInfo: null,
    token: null,
    bg:"other-meta",
    bg0: "other-meta",
    url:"/images/star.png",
    url0:"/images/icon-good.png"
  },
  //围观
  guan:function(){
    this.setData({
      bg:"other-meta1",
      url:"/images/star_active.png"
    })
  },
  //点赞
  zan:function(){
    this.setData({
      bg0:"other-meta1",
      url0:"/images/icon-good-active.png"
    })
  },
  //更多围观用户展示
  moreguan:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      token: wx.getStorageSync("token"),
      pid: options.pid,
      userInfo: app.globalData.userInfo,
    })
    this.getPlanDetail();
  },

  getPlanDetail: function() {
    let paramdata = {
      token: this.data.token,
      planId: this.data.pid
    }
    return util.requestApi(`${app.globalReqUrl}/plan/apple/detailPlan`, paramdata).then(
      res => {
        
        this.setData({
          planInfo:res.data
        });
        return res.data;
      },
      err => {
        console.log('error', err)
        return err;
      }
    )

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})