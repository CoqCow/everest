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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      token: wx.getStorageSync("token")
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.getPlanListInfo();
  },
  getPlanListInfo: function() {

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
clickPlan: function(e) {
  wx.navigateTo({
    url: '/pages/detail/detail?pid=' + e.currentTarget.dataset.pid
  })
}

})