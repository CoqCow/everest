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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      token: wx.getStorageSync("token")
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    this.getPlanListInfo();
  },
  getPlanListInfo: function (){
    let paramdata = {
      token: this.data.token,
      type: 2,
      status:[2,3,4,5]
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
  },
  clickPlan:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail?pid=' + e.currentTarget.dataset.pid
    })
  }
    
})