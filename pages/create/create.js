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
  onSubmit:function(e){
    console.log(e.detail.value);
    if (e.detail.value.title.length == 0 || e.detail.value.title.length >= 20) {
      wx.showToast({
        title: '标题不能为空或过长!',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.content.length == 0) {
      wx.showToast({
        title: '内容不能为空!',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else {
      wx.request({
        url: `${this.globalReqUrl}/user/green/getUserInfo`,
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: { title: e.detail.value.title, content: e.detail.value.content},
        success: function (res) {
          console.log("good");
          if (res.data.status == 0) {
            wx.showToast({
              title: '提交失败！！！',
              
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '提交成功！！！',//这里打印出登录成功
              
              duration: 1000
            })
          }
        }
      })
    }

  }
  /**
   * 页面渲染事件
   */
  /*onShow: function () {
    var item = this.data;
    this.setData({
      item: item
    });
  },*/
  /**
   * 保存数据事件
   */
  /*onSubmit: function (event) {
    console.log(event)
    var item = this.data;
    item.value.title = event.detail.value.title;
    item.value.content = event.detail.value.content;
    this.setData({
      item: item
    });
    this.saveData();
  },*/
  /**
   * 请求服务器保存数据
   */
  /*saveData: function () {
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
  }*/
});