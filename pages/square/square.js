const app = getApp()
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    total: null,
    planList: null,
    pageNo: 1,
    pageSize: 10,
    noMoreData: false,
    bloading: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      token: app.globalData.token
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.getPlanListInfo();
  },
  getPlanListInfo: function() {
    if (this.data.token == null) {
      this.setData({
        token: wx.getStorageSync('token')
      });
    }
    console.log("广场:",this.data.token)
    let paramdata = {
      token: this.data.token,
      type: [2, 4],
      status: [2, 3, 4, 5]
    }
    return util.requestApi(`${app.globalReqUrl}/plan/apple/listPlan`, paramdata).then(
      res => {
        this.setData({
          total: res.data.total,
          planList: res.data.list
        });
        return res.data;
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNo: 1,
      planList: [],
      noMoreData: false,
      bloading: true
    })
    this.getPlanListInfo(1)

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 到页面底部时，请求列表
    if (!this.data.noMoreData) {
      this.setData({
        bloading: true,
        pageNo: ++this.data.pageNo
      })
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true
      })
      this.getPlanListInfo(this.data.pageNo)
    }
  },
  clickPlan: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?pid=' + e.currentTarget.dataset.pid
    })
  },
})