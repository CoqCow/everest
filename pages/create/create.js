var app = getApp();
var util=require("../../utils/util.js")
Page({
  data: {
    userInfo: {},
    item: {
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
    focus: true
  },
  //获取用户昵称及头像
  onLoad: function () {
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