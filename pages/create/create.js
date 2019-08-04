const app = getApp();
let utils = require('../../utils/util');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var util = require("../../utils/util.js")
Page({
  data: {
    userInfo: null,
    token: null,
    type: null,
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
    console.log("currentDate:", this.data.beginTime)
    console.log("max:", this.data.maxDate)
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
        title: '标题20个字以内哦～',
        duration: 2000
      })
      return;
    }
    if (e.detail.value.content.length == 0 || e.detail.value.content.length > 200) {
      wx.showToast({
        title: '内容200个字以内哦～',
        duration: 1500
      })
      return;
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