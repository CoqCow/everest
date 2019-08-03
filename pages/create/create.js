var app = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
var util=require("../../utils/util.js")
Page({
  data: {
    userInfo: {},
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
    /*item: {
      key: "",
      value: {
        title: "",
        content: ""
      },
      create_time: "",
      update_time: "",
      state: 1
    },
    isNew: false,
    focus: true*/
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  onLoad: function () {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    //获取创建时间,用户昵称及头像
    var TIME = util.formatTime(new Date());
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        TIME,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 页面渲染事件
   */
  onShow: function () {
    var item = this.data.item;
    item.key = app.globalData.hotapp.genPrimaryKey('item');
    this.setData({
      item: item
    });
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
    
    
  },

  /**
   * 保存数据事件
   */
  onSubmit: function (event) {
    console.log(event)
    var item = this.data.item;
    item.value.title = event.detail.value.title;
    item.value.content = event.detail.value.content;
    this.setData({
      item: item
    });
    this.saveData();
  },
  /**
   * 请求服务器保存数据
   */
  saveData: function () {
    var item = this.data.item;
    var now = Date.parse(new Date()) / 1000;
    item.update_time = now;
    item.create_time = now;
    this.setData({
      item: item
    });
    app.store(this.data.item, function (res) {
      if (res) {
        wx.showToast({
          title: "保存成功"
        });
        //返回首页
        wx.navigateBack();
      } 
      else {
        wx.showToast({
          title: "保存失败"
        });
      }
    });
  }
});