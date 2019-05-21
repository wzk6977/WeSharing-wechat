var leftList = new Array();//左侧集合
var rightList = new Array();//右侧集合
var leftHight = 0, rightHight = 0, itemWidth = 0, maxHeight = 0;

Component({
  properties: {},
  data: {
    leftList: [],//左侧集合
    rightList: [],//右侧集合
    tmpHeight:0,
    tmpWidth:0,
    imgHigth:0,
    maxHeight:0,
    width:0,
  },

  attached: function () {
    wx.getSystemInfo({
      success: (res) => {
        let percentage = 750 / res.windowWidth;
        let margin = 20 / percentage;
        itemWidth = (res.windowWidth - margin) / 2;
        maxHeight = itemWidth / 0.8
      }
    });
  },

  methods: {
    /**
        * 填充数据
        */
    fillData: function (isPull, listData) {
      var that = this;
      if (isPull) { //是否下拉刷新，是的话清除之前的数据
        leftList.length = 0;
        rightList.length = 0;
        leftHight = 0;
        rightHight = 0;
      }
      for (let i = 0, len = listData.length; i < len; i++) {
        let tmp = listData[i];
        wx.getImageInfo({
          src: tmp.image,
          success:function(res){
              that.setData({
                tmpHeight:res.height,
                tmpWidth:res.width
              })

            console.log(" --------------------------"+i+"  " + res.height + "  " + res.width)
          },

          
        })

        console.log("图片"+i+"宽度为"+that.data.tmpWidth+"  高度为"+that.data.tmpHeight)
        // tmp.width = parseInt(tmp.image.width);
        // tmp.height = parseInt(tmp.image.height);
        // tmp.itemWidth = itemWidth
        // itemWidth = wx.getSystemInfo().windowWidth * 0.48;
        wx.getSystemInfo({
          success: function(res) {
            that.setData({
              width:res.windowWidth * 0.48
            })
          },
        })
        // let per = tmp.image.width / tmp.image.itemWidth;
        var per = that.data.tmpWidth / that.data.width;
        // tmp.itemHeight = tmp.image.height / per;
        that.setData({
          imgHigth:that.data.tmpHeight / per
        })
        listData[i].imgHigth = that.data.imgHigth;
        // 
        if (that.data.tmpHeight > maxHeight) {
          that.data.tmpHeight = maxHeight;
        }

        if (leftHight == rightHight) {
          leftList.push(tmp);
          // leftHight = leftHight + tmp.height;
          leftHight = leftHight + that.data.tmpHeight;
        } else if (leftHight < rightHight) {
          leftList.push(tmp);
          // leftHight = leftHight + tmp.height;

          leftHight = leftHight + that.data.tmpHeight;
        } else {
          rightList.push(tmp);
          // rightHight = rightHight + tmp.height;

          leftHight = leftHight + tmpHeight;
        }
        console.log("leftHeight=" + leftHight + "    rightHeight=" + rightHight + "   tmp.itemHeight=" + tmp.image.Height);
      }

      that.setData({
        leftList: leftList,
        rightList: rightList,
      });
    },
  }
})