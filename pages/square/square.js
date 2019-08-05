//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    token: null,
    total: null,
    planList: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  details: function() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.setData({
      token: wx.getStorageSync("token")
    });
    
  },
  onShow:function(){
    this.getPlanListInfo();
  },
  getPlanListInfo: function (){
    let paramdata = {
      token: this.data.token,
      type: 2
    }
    return util.requestApi(`${app.globalReqUrl}/plan/apple/listPlan`, paramdata).then(
      res => {
        this.setData({
          total: res.data.total,
          planList: res.data.list
        });
        console.log(this.data.total)
        return res.data;
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  }
})