// pages/proxy/proxy.js
// pages/addAddress/addAddress.js
let logUtil = require('../../utils/weixinAppReport')
let log = logUtil.init()

let app = getApp();
import Api from '../../apis/api'
let utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmdata: {
      message: '',
      rightTxt: '',
      visible: false,
      share: true
    },
    confirmOpendata: {
      title: '当前已通过快捷方式登录，同意用户协议后自动升级为京东品客正式会员',
      rightTxt: '',
      visible: false,
      share: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取用户信息
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getUserInfo: function () {
    app.getUserInfo().then(res => {
      if (res.code && res.code == 3) {
        console.log('未登录')
        //未登录
        wx.hideTabBar()
        this.setData({
          'confirmdata.visible': true
        })
      } else if (res.code && res.code == 1002) {
        //未开通京东品客
        wx.hideTabBar()
        wx.reLaunch({
          url:'/pages/jtIntroduction/jtIntroduction'
        })
        this.setData({
          'confirmdata.visible': false
        })
        console.log('未开通京东品客')
      } else if (res) {
        this.setData({
          'confirmdata.visible': false
        })
      }
    })
  },
  bindGetUserInfo: function (e) {
    //点击立即登录
    log.click({
      event: e, //必填，点击事件event
      eid: 'eid-click',
      elevel: 'elevel-click',
      eparam: 'eparam-click',
      pname: 'pname-click',
      pparam: 'pparam-click',
      target: '/pages/login/index/index' //选填，点击事件目标链接，凡是能取到链接的都要上报
    })
    wx.getSetting({
      success: res => {
        console.log('是否授权', res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          console.log(e.detail.userInfo)
          wx.setStorageSync('userInfo', e.detail.userInfo)
          this.setData({
            userInfo: e.detail && e.detail.userInfo
          })
          let returnPage = utils.getCurrentPageUrlWithArgs()
          // let pageType = 'switchTab'
          wx.navigateTo({
            url: `/pages/login/index/index?returnPage=${returnPage}`
          })
        } else {
          wx.removeStorageSync('userInfo')
          return
        }
      }
    })
  },
  
})