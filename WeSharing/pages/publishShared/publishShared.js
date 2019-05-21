// pages/publishShared/publishShared.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    location: 'loading',
    actionSheetHidden: true,
    isFocus: false,
    selectArray: [{
        id: 1,
        text: '天'
      },
      {
        id: 2,
        text: '周'
      },
      {
        id: 3,
        text: '月'
      },
      {
        id: 4,
        text: '年'
      }
    ],
    // selectArray: [{
    //   "id": "10",
    //   "text": "会计类"
    // }, {
    //   "id": "21",
    //   "text": "工程类"
    // }]

    //已选图片列表
    selectedImg: [],
    //已选视频列表
    selectedVideo: [],
    //可选位置列表
    actionSheetList: []
  },

  titleConfirm: function(e) {
    console.log("title输入完成")
    var that = this;
    that.setData({
      isFocus: true
    })
  },

  //获取下拉框选中的数据
  getDate: function(e) {
    console.log(e.detail)
  },

  //添加图片
  chooseImg: function(e) {
    console.log("点击了添加图片的按钮")
    var that = this;
    //已选择的图片数组
    var imgArr = that.data.selectedImg;
    var videoArr = that.data.selectedVideo;
    //只能上传9张图片
    var leftCount = 9 - imgArr.length - videoArr.length;
    if (leftCount <= 0) {
      console.log("只能上传9张图片和视频");
      wx.showToast({
        title: '最多只能上传9张图片和视频',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.chooseImage({
      count: leftCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          selectedImg: imgArr.concat(res.tempFilePaths)
        })
      },
    })

  },

  //添加视频
  chooseVideo: function(e) {
    var that = this;
    var videoArr = that.data.selectedVideo; //已选择的图片数组
    var imgArr = that.data.selectedImg;
    //只能上传9张图片
    var leftCount = 9 - imgArr.length - videoArr.length;
    if (leftCount <= 0) {
      console.log("只能上传9张图片和视频");
      wx.showToast({
        title: '最多只能上传9张图片和视频',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        console.log(~~res.duration)
        var time = that.s_to_hs(~~res.duration)
        var newData = {
          tempFilePath: res.tempFilePath,
          duration: time,
          img: res.thumbTempFilePath
        }
        that.setData({
          selectedVideo: videoArr.concat(newData)
        })
      }
    })
  },

  //删除图片
  deleteImg: function(e) {
    var index = e.currentTarget.dataset.idx;
    console.log("index=" + index);
    var that = this;
    that.data.selectedImg.splice(index, 1);
    that.setData({
      selectedImg: that.data.selectedImg
    })
  },

  deleteVideo: function(e) {
    var index = e.currentTarget.dataset.idx;
    console.log("index=" + index);
    var that = this;
    that.data.selectedVideo.splice(index, 1);
    that.setData({
      selectedVideo: that.data.selectedVideo
    })
  },

  showActionSheet: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetChange: function(e) {

    console.log("actionSheet改变值了");
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  changeValue: function(e) {
    var title = e.currentTarget.dataset.title;
    console.log("title=" + title)
    this.setData({
      location: title,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  chooseLocation: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          location: res.name,
          actionSheetHidden: !that.data.actionSheetHidden
        })
      },
    })
  },

  /**
   * 将秒转换为 分:秒
   * s int 秒数
   */
  s_to_hs: function(s) {
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h;
    h = Math.floor(s / 60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s = s % 60;
    //将变量转换为字符串
    h += '';
    s += '';
    //如果只有一位数，前面增加一个0
    h = (h.length == 1) ? '0' + h : h;
    s = (s.length == 1) ? '0' + s : s;
    return h + ':' + s;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
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