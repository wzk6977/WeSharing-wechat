// pages/publishDemand/publishDemand.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandName: '',//需求标题框输入内容
    demandDetail: '',//需求详情框输入内容
    demandPrice: 0.0,//需求感谢费输入内容
    latitude: 0,//发布位置的纬度
    longitude: 0,//发布位置的经度
    location: 'loading',
    actionSheetHidden: true,//是否隐藏地点选择框
    isFocus: false,//共享详细框是否获取焦点
    actionSheetList: []//可选位置列表
  },

  titleConfirm: function (e) {
    console.log("title输入完成")
    var that = this;
    that.setData({
      isFocus: true
    })
  },

  // 需求标题输入内容
  getDemandNameInput: function(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      demandName:e.detail.value
    })
  },

  // 需求详情输入内容
  getDemandDetailInput: function(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      demandDetail:e.detail.value
    })
  },

  // 感谢费输入内容
  getDemandPriceInput: function(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      demandPrice:e.detail.value
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

  //选择其他位置
  changeValue: function (e) {
    var title = e.currentTarget.dataset.title;
    var newlocation = e.currentTarget.dataset.location;
    console.log(newlocation)
    console.log("位置为：" + title)
    this.setData({
      location: title,
      actionSheetHidden: !this.data.actionSheetHidden,
      latitude: newlocation.lat,
      longitude: newlocation.lng
    })
  },

  chooseLocation: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          location: res.name,
          latitude: res.latitude,
          longitude: res.longitude,
          actionSheetHidden: !that.data.actionSheetHidden
        })
      },
    })
  },

  // 确认发布
  confirmPublishDemand: function(e){
    // 判断标题、详细内容、价格都不为空
    var myData = this.data;
    var warnStr = '';
    if (myData.demandName == '') {
      warnStr = '标题不能为空'
    } else if (myData.demandDetail == '') {
      warnStr = '详请不能为空'
    } else if (myData.demandPrice == 0.0) {
      warnStr = '价格不能为空'
    } else if (myData.latitude == 0 || myData.longitude == 0) {
      warnStr = '请选择您的位置'
    }

    if (warnStr != '') {
      wx.showToast({
        title: warnStr,
        image: "/images/delete.png "
      })
    } else {

      wx.showLoading({
        title: '正在发布请稍候',
        mask: true,
      })

      wx.request({
        url: app.globalData.httpID +'publishDemand.do',
        data:{
          user_id: app.globalData.userInfo.uuid,
          name:myData.demandName,
          price:myData.demandPrice,
          detail:myData.demandDetail,
          distance_lat:myData.latitude,
          distance_lng:myData.longitude,
        },
        success(res){
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          wx.switchTab({
            url: '../home/home',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        },
        fail(res) {
          // 图片上传失败，提示重新提交
          wx.hideLoading()
          wx.showToast({
            title: '发布失败',
            image: "/images/delete.png "
          })
        }
      })
    }

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

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
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
              image: "/images/delete.png "
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