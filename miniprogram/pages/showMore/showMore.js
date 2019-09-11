// pages/showMore/showMore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isShow: ["","","",""],
  },
  gotoDetail: function (e) {
    console.log(e)
    let myid = e.currentTarget.dataset.myid;
    console.log(myid)
    // 保留并且跳转
    wx.navigateTo({
      url: '/pages/movies/movies?id=' + myid,
    });
    // 将电影id获取并且转跳组件时，传递showMore组件，在showMoret获取id
  },
  //方法
  loadMore: function() {
    //1:接收列表传递参数index
    var index = this.data.movieid;
    // 2:显示数据加载提示框
    wx.showLoading({
      title: '加载中...',
    });
    if (index == "1") {
      this.data.isShow[0] = true;
      // 调用云函数movelist190906
      wx.cloud.callFunction({
          name: "movielist190906",
          data: {
            //从第几条开始
            start: this.data.list.length,
            // 每次获得20条记录
            count: 15
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
            list: rows
          })
          wx.hideLoading();

        })
        .catch(err => {
          console.log(err)
        });
    } else if (index == "2") {
      this.data.isShow[1] = true;
      // 调用云函数newmovielist190906
      wx.cloud.callFunction({
          name: "newmovielist190906",
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
            list: rows
          })
          wx.hideLoading();

        })
        .catch(err => {
          console.log(err)
        });
    } else if (index == "3") {
      this.data.isShow[2]=true;
      wx.cloud.callFunction({
          name: "hotsalebooks190906",
          data: {
            q: "畅销图书",
            //从第几条开始
            start: this.data.list.length,
            // 每次获得10条记录
            count: 15
          }
        })
        .then(res => {
          // console.log(res.result)
          //res.result得到的是字符串
          // 将字符串转为js对象
          var bookObj = JSON.parse(res.result);
          // console.log(bookObj)
          var bookRows = bookObj.books;
          // console.log(bookRows)
          //将电影列表拼接
          bookRows = this.data.list.concat(bookRows);
          // 将拼接后结果保存在setdata里
          this.setData({
            list: bookRows
          })
          wx.hideLoading();
        })
        .catch(err => {
          console.log(err)
        });
    } else if (index == "4") {
      
      this.data.isShow[3] = true;
      // 调用云函数music190906
      wx.cloud.callFunction({
          name: "music190906",
          data: {
            q: "热门单曲榜单",
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
          var musiceObj = JSON.parse(res.result);
          // console.log(musiceObj)
          var musicRows = musiceObj.musics;
          //将电影列表拼接
          musicRows = this.data.list.concat(musicRows);
          // 将拼接后结果保存在setdata里
          this.setData({
            list: musicRows
          })
          wx.hideLoading();
        })
        .catch(err => {
          console.log(err)
        });

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //将电影列表组件传递参数 index
    //保存data中movieid
    this.setData({
      movieid: options.index
    });
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})