// pages/publishDemand/publishDemand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    isFocus: false,
    location:'loading',
    actionSheetHidden: true,
    actionSheetList: []
  },

  titleConfirm: function (e) {
    console.log("title输入完成")
    var that = this;
    that.setData({
      isFocus: true
    })
  },

  showActionSheet: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetChange: function (e) {

    console.log("actionSheet改变值了");
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  changeValue: function (e) {
    var title = e.currentTarget.dataset.title;
    console.log("title=" + title)
    this.setData({
      location: title,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  chooseLocation: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          location: res.name,
          actionSheetHidden: !that.data.actionSheetHidden
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("latitude=" + res.latitude + "     longitide=" + res.longitude);
        // wx.showToast({
        //   title: '获取地点完成',
        // })
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: res.latitude + "," + res.longitude,
            get_poi: 1,
            poi_options: 'page_size=3;page_index=1',
            key: "TIVBZ-S52WX-4NI4C-TEOQ6-XD6R3-FMBCY",
          },
          success(res) {
            // wx.showToast({
            //   title: "调用成功",
            // })
            console.log(res);

            that.setData({
              location: res.data.result.formatted_addresses.recommend,
              actionSheetList: res.data.result.pois
            })

          },
          complete() {

            // wx.showToast({
            //   title: "调用完成",
            // })
          },
          fail() {
            that.setData({
              location: "请选择地点"
            })
            wx.showToast({
              title: "获取地点失败",
              image:"/images/delete.png "
            })
          }
        })
        // that.setData({
        //   latitude:res.latitude,
        //   longitude:res.longitude
        // })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})