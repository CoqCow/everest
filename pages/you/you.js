//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    token: null,
    total: null,
    planList: null,
  },
  onLoad: function () {
    this.setData({
      token: app.globalData.token
    });
  },
  onShow: function () {
    this.setData({
      token: app.globalData.token
    });
    this.getPlanListInfo();
  },
  getPlanListInfo: function () {
    if (this.data.token==null){
      this.setData({
        token: app.globalData.token
      });
    }
    let paramdata = {
      token: this.data.token,
      types: [4]
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
  clickPlan: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?pid=' + e.currentTarget.dataset.pid
    })
  }

})