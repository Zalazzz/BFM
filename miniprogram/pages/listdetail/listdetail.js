// pages/listdetail/listdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:5,
    listdetailid:0,
    list:[],
    color:[
      { "style":"background-color: lightcoral;"},
      { "style":"background-color: lightsalmon;"},
      { "style":"background-color: lightgoldenrodyellow;"},
      { "style":"background-color: lightgray;"}
    ],
    backgroundimg: []
  },
  //方法
  gotocomment(e) {
    var id = this.data.movieid;
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    })
  },
  loadMore: function () {
    var listdetailid = this.data.listdetailid;
    // console.log(this.data.listdetailid);
    wx.showLoading({
      title: '更新榜单中',
    });
    if (listdetailid=="1"){
      var backgroundimg = { "cid": 1, "style": "background-image: url('https://img3.doubanio.com/view/activity_page/raw/public/p3132.jpg')", "title": "BFN--250" };
    // console.log(123);
    // 调用云函数movelist190906
    wx.cloud.callFunction({
      name: "movietop250",
      data: {
        //从第几条开始
        start: this.data.list.length,
        // 每次获得10条记录
        count: 10
      }
    })
      .then(res => {
        // console.log(res.result)
        //res.result得到的是字符串
        // 将字符串转为js对象
        var obj = JSON.parse(res.result);
        // console.log(obj)
        var rows = obj.subjects;
        for (var i = 0; i < rows.length; i++) {
          var starsNum = rows[i].rating.stars.split("").join(".");
          // starsNum=Math.floor(starsNum)
          starsNum = Number(starsNum)
          rows[i].rating.stars = starsNum;
          // console.log(typeof stars+stars)
        }
        // console.log(rows[0].rating.stars)
        //将电影列表拼接
        rows = this.data.list.concat(rows);
        // 将拼接后结果保存在setdata里
        this.setData({
          list: rows,
          backgroundimg
        })
        wx.hideLoading();
        // console.log(this.data.list)

      })
      .catch(err => {
        console.log(err)
      });
    }
    else if (listdetailid=="2"){
      var backgroundimg ={ "cid": 1, "style": "background-image: url('https://img3.doubanio.com/view/activity_page/raw/public/p3133.jpg')", "title": "一周口碑电影榜" };
    // 调用云函数moveweekly190906
    wx.cloud.callFunction({
      name: "movieweekly20190906",
      data: {
        //从第几条开始
        start: this.data.list.length,
        // 每次获得10条记录
        count: 10
      }
    })
      .then(res => {
        // console.log(res.result)
        //res.result得到的是字符串
        // 将字符串转为js对象
        var obj = JSON.parse(res.result);
        // console.log(obj)
        var rows = obj.subjects;
        var reallrows=[];
        // console.log(rows)
        for (var i = 0; i < rows.length; i++) {
          // console.log(rows[i].subject)
           reallrows.push(rows[i].subject);
          var starsNum = rows[i].subject.rating.stars.split("").join(".");
          // starsNum=Math.floor(starsNum)
          starsNum = Number(starsNum)
          rows[i].subject.rating.stars = starsNum;
          // console.log(typeof stars+stars)
        }
        // console.log(reallrows)
        //将电影列表拼接
        reallrows = this.data.list.concat(reallrows);
        // 将拼接后结果保存在setdata里
        this.setData({
          list: reallrows,
          backgroundimg
        })
        wx.hideLoading();
        // console.log(this.data.list)

      })
      .catch(err => {
        console.log(err)
      });
    }
    else if (listdetailid == "3") {
      var backgroundimg={
        "cid": 1, "style": "background-image: url('https://img1.doubanio.com/view/activity_page/raw/public/p3387.jpg')", "title": "北美热门电影榜"
      };
      wx.cloud.callFunction({
        name: "newmovie190906",
        data: {
          //从第几条开始
          start: this.data.list.length,
          // 每次获得10条记录
          count: 10
        }
      })
        .then(res => {
          // console.log(res.result)
          //res.result得到的是字符串
          // 将字符串转为js对象
          var obj = JSON.parse(res.result);
          // console.log(obj)
          var rows = obj.subjects;
          var reallrows = [];
          // console.log(rows)
          for (var i = 0; i < rows.length; i++) {
            // console.log(rows[i].subject)
            reallrows.push(rows[i].subject);
            var starsNum = rows[i].subject.rating.stars.split("").join(".");
            // starsNum=Math.floor(starsNum)
            starsNum = Number(starsNum)
            rows[i].subject.rating.stars = starsNum;
            // console.log(typeof stars+stars)
          }
          // console.log(reallrows)
          //将电影列表拼接
          reallrows = this.data.list.concat(reallrows);
          // 将拼接后结果保存在setdata里
          this.setData({
            list: reallrows,
            backgroundimg
          })
          wx.hideLoading();
          // console.log(this.data.list)

        })
        .catch(err => {
          console.log(err)
        });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // console.log(options.listid);
    this.setData({
      listdetailid: options.listid
    });
    this.loadMore();
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
    if (this.data.listdetailid=="1"){
    this.loadMore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})