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
    token: null
  },
  //围观
  guan: function() {
    let paramdata = {
      token: this.data.token,
      planId: this.data.planInfo.id,
      type: 1
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/relation/tomatoes/addRelation`, paramdata).then(
      res => {
        this.setData({
          planInfo: res.data
        });
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //点赞
  zan: function() {
    let paramdata = {
      token: this.data.token,
      planId: this.data.planInfo.id,
      type: 2
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/relation/tomatoes/addRelation`, paramdata).then(
      res => {
        this.setData({
          planInfo: res.data
        });
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //挑战
  challenge: function() {
    if (this.data.planInfo.userId == this.data.userInfo.id) {
      wx.showToast({
        title: '不能挑战自己的计划哦～',
        duration: 3000
      })

      return;
    }

    let paramdata = {
      token: this.data.token,
      planId: this.data.planInfo.id,
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/plan/apple/challengePlan`, paramdata).then(
      res => {
        wx.switchTab({
          url: '/pages/square/square'
        })
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //done it按钮
  over: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定已完成该计划了吗？不要欺骗自己吆~',
      confirmText: "已完成",
      cancelText: "再努力",
      success(res) {
        if (res.confirm) {
          let paramdata = {
            token: that.data.token,
            planId: that.data.planInfo.id,
          }
          return util.requestApi(`${app.globalReqUrl}/plan/apple/donePlan`, paramdata).then(
            res => {
              that.setData({
                planInfo: res.data
              });
              return res.data;
            },
            err => {
              console.log('error', err)
              return err;
            }
          )
        }
      }
    })
  },
  //更多围观用户展示
  moreguan: function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      token: app.globalData.token,
      pid: options.pid,
      userInfo: app.globalData.userInfo
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
          planInfo: res.data
        });
        return res.data;
      },
      err => {
        console.log('error', err)
        return err;
      }
    )

  },

  donePlan: function() {

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