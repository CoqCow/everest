const app = getApp();
var util = require("../../utils/util")
Page({
  data: {
    userInfo: null,
    token: null,
    type: 2,
    status: null,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 11, 1).getTime(),
    beginTime: new Date().getTime(),
    endTime: new Date().getTime(),
    beginTimeForShow: null,
    endTimeForShow: null,
  },
  beginTimeInput(event) {
    this.setData({
      beginTime: event.detail,
      beginTimeForShow: util.formatTimeTwo(event.detail, "Y-M-D h:m:s"),
    });
  },
  endTimeInput(event) {
    this.setData({
      endTime: event.detail,
      endTimeForShow: util.formatTimeTwo(event.detail, "Y-M-D h:m:s"),
    });
    console.log("currentDate:", util.formatTimeTwo(this.data.endTime, "'Y-M-D h:m:s'"))
  },
  switchChange: function(e) {
    if (e.detail.value) {
      this.setData({
        type: 2,
      })
    } else {
      this.setData({
        type: 1,
      })
    }
  },
  return: function () {
    wx.showModal({
      title: '提示',
      content: '您确定要放弃发布了吗？',
      confirmText: '确定',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击了“确定”')
          wx.switchTab({
            url: '/pages/user/user',
          })
        }
      }
    })
  },
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      token: wx.getStorageSync("token"),
      beginTimeForShow: util.formatTimeTwo(this.data.beginTime, "Y-M-D h:m:s"),
      endTimeForShow: util.formatTimeTwo(this.data.endTime, "Y-M-D h:m:s"),
    });
  },
  onSubmit: function(e) {
    console.log(e.detail.value);
    if (e.detail.value.title.length == 0 || e.detail.value.title.length > 20) {
      wx.showToast({
        title: '标题20字以内哦',
        duration: 3000
      })
      return;
    }
    if (e.detail.value.content.length == 0 || e.detail.value.content.length > 200) {
      wx.showToast({
        title: '内容200字以内',
        duration: 3000
      })
      return;
    }
    if(null==e.detail.beginTime||null==e.detail.endTime||e.detail.beginTime<=e.detail.endTime){
      wx.showToast({
        title: '起始日期有误！',
        duration:3000
      })
    }
    let paramdata = {
      token: this.data.token,
      type: this.data.type,
      title: e.detail.value.title,
      content: e.detail.value.content,
      beginTime: this.data.beginTime,
      endTime: this.data.endTime
    }
    console.log("添加计划:", paramdata)
    return utils.requestApi(`${app.globalReqUrl}/plan/apple/addPlan`, paramdata).then(
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
  }



});