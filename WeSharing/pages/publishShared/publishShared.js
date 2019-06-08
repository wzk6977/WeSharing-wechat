// pages/publishShared/publishShared.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharedName:'',//共享标题框输入内容
    sharedDetail:'',//共享详情框输入内容
    sharedPrice:0.0,//共享价格框输入内容
    sharedPriceUnit:'天',//共享价格单位框输入内容
    latitude: 0,//发布位置的纬度
    longitude: 0,//发布位置的经度
    location: 'loading',
    actionSheetHidden: true,//是否隐藏地点选择框
    isFocus: false,//共享详细框是否获取焦点
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

  //共享标题框输入完成
  titleConfirm: function(e) {
    console.log("title输入完成")
    var that = this;
    that.setData({
      isFocus: true
    })
  },

  //共享标题输入内容
  getSharedNameInput:function(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      sharedName: e.detail.value
    })
  },

  //共享详情输入内容
  getSharedDetailInput:function(e){
    console.log(e.detail.value)
    this.setData({
      sharedDetail:e.detail.value
    })
  },

  //共享价格输入内容
  getSharedPriceInput:function(e){
    //需限制只能输入数字
    console.log(e.detail.value)
    this.setData({
      sharedPrice:e.detail.value
    })
  },

  //获取下拉框选中的数据
  getDate: function(e) {
    console.log(e.detail)
    this.setData({
      sharedPriceUnit:e.detail.text
    })
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

  //删除视频
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

  //选择其他位置
  changeValue: function(e) {
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

  chooseLocation: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          location: res.name,
          latitude:res.latitude,
          longitude:res.longitude,
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

  // 确认发布
  confirmPublishShared:function(){
    // 判断标题、详细内容、价格、价格单位、位置都不为空且图片或视频>1
    var myData = this.data;
    var sharedUUID = '';
    var warnStr = '';
    if(myData.sharedName == ''){
      warnStr = '标题不能为空'
    }else if(myData.sharedDetail == ''){
      warnStr = '详请不能为空'
    }else if(myData.sharedPrice == 0.0){
      warnStr = '价格不能为空'
    }else if(myData.selectedImg.length<1 && myData.selectedVideo.length<1){
      warnStr = '至少选择一张图'
    }else if(myData.latitude == 0 || myData.longitude == 0){
      warnStr = '请选择您的位置'
    }

    if(warnStr != ''){
      wx.showToast({
        title: warnStr,
        image: "/images/delete.png "
      })
    }else{

      wx.showLoading({
        title: '正在上传请稍候',
        mask:true,
      })

      sharedUUID = this.publishSharedWithoutImagesViodes()
      
    }

  },

// 发布共享（标题、详细内容、价格、价格单位、位置）
  publishSharedWithoutImagesViodes:function(){
    var myData = this.data
    var that = this
    wx.request({
      url: app.globalData.httpID+'publishSharedWithoutImagesVideos.do',
      data:{
        user_id: app.globalData.userInfo.uuid,
        name:myData.sharedName,
        detail:myData.sharedDetail,
        price:myData.sharedPrice,
        price_unit:myData.sharedPriceUnit,
        distance_lat:myData.latitude,
        distance_lng:myData.longitude
      },
      success(res){
        that.publishSharedWithImages(res.data,0,1)
      }
    })
  },

  // 发布共享图片
  publishSharedWithImages:function(sharedID,currentIndex,isCover){
    var that = this
    wx.getImageInfo({
      src: that.data.selectedImg[currentIndex],
      success(res){
        wx.uploadFile({
          url: app.globalData.httpID+'publishSharedWithImages.do',
              filePath: that.data.selectedImg[currentIndex],
          name: 'pictureFile',
          formData:{
            shared_id: sharedID,
            is_cover:isCover,
            image_width:res.width,
            image_height:res.height
          },
          success(res){
            if(currentIndex+1 < that.data.selectedImg.length){
              that.publishSharedWithImages(sharedID,currentIndex+1,0)
            }else{
              // 图片上传完成
              if(that.data.selectedVideo.length==0){
                console.log("图片上传完毕")
                wx.hideLoading()
                wx.showToast({
                  title: '发布成功',
                })
                wx.switchTab({
                  url: '../home/home',
                  success: function(e){
                    var page = getCurrentPages().pop();
                    if(page == undefined || page == null) return;
                    page.onLoad();
                  }
                })
              }
            }
          },
          fail(res){
            // 图片上传失败，提示重新提交
            wx.hideLoading()
            wx.showToast({
              title: '图片上传失败',
              image: "/images/delete.png "
            })
          }
        })
          }
        })
        
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

        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
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