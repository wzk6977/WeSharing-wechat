// pages/sharedDetail/sharedDetail.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imagesUrl: [{
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      }
    ],
    activeIndex: 0,
    showOrHidden: true, //true为全文，false为收起
    ellipsis: false, // 文字是否收起，默认收起
    showBtn: false, //是否显示全文按钮
    screenWidth: 0,
  },

  showLength: function() {
    return this.imagesUrl.length;
  },
  changeImg: function(e) {
    var that = this;
    console.log(e.detail)
    that.setData({
      activeIndex: e.detail.current
    })

  },

  ellipsis: function() {
    var value = !this.data.ellipsis;
    var newShowOrHidden = !this.data.showOrHidden;
    this.setData({
      ellipsis: value,
      showOrHidden: newShowOrHidden
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.screenWidth
        })
      },
    })

    var query1 = wx.createSelectorQuery();

    query1.select(".detail-content").boundingClientRect(function(rest) {
      console.log(rest.height + "------------")
      var height = rest.height * 750 / that.data.screenWidth
      console.log("文字高度rpx"+height)
      that.setData({
        ellipsis: height > 126 ?true :false,
        showBtn: height > 126 ? true : false
      })
    }).exec()

    //获取头像
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})