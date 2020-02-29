const app = getApp()
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    begin: 1571500800000,
    token: null,
    total: null,
    planList: null,
    type:null,
    day: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const nowTime = new Date(new Date());
    var now = nowTime.setHours(0, 0, 0, 0);
    this.setData({
      day: ((now - this.data.begin) / 86400000) + 1,
      token: app.globalData.token
    });
    this.getPlanListInfo(options.status, options.type, options.upvote);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {},
  getPlanListInfo: function(status, type, upvote) {

    var paramdata;
    if (null != status) {
      paramdata = {
        token: this.data.token,
        source: "personal",
        upvote: upvote,
        status: [status]
      }
    }
    if (null != type) {
      if(type==1){
        this.setData({
          type: type
        });
      }else{
        this.setData({
          type: null
        });
      }
      paramdata = {
        token: this.data.token,
        source: "personal",
        upvote: upvote,
        types: [type],
      }
    }
    if (null != upvote) {
      paramdata = {
        token: this.data.token,
        source: "personal",
        upvote: upvote,
      }
    }
    console.log("paramdata", paramdata);
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