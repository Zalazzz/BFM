// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    newlist: [],
    bookslist: [],
    musiclist: [],
    score: 5,
    /*默认五分好评 */
    imgUrls: [{
        id: 0,
        url: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566598269.webp'
      },
      {
        id: 1,
        url: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566598269.webp'
      },
      {
        id: 2,
        url: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566598269.webp'
      }
    ],
  },
  // 方法
  gotoDetail: function(e) {
    // console.log(e)
    let myid = e.currentTarget.dataset.myid;
    // console.log(myid)
    // 保留并且跳转
    wx.navigateTo({
      url: '/pages/movies/movies?id=' + myid,
    });
    // 将电影id获取并且转跳组件时，传递showMore组件，在showMoret获取id
  },
  showMore: function(e) {
    // console.log(e.target)
    // 获取自定义属性
    let index = e.target.dataset.index;
    // console.log(index)
    // 保留并且跳转
    wx.navigateTo({
      url: '/pages/showMore/showMore?index=' + index,
    });
    // 将电影id获取并且转跳组件时，传递showMore组件，在showMoret获取id
  },

  loadMore: function() {
    // console.log(123);
    // 调用云函数movelist190906
    wx.cloud.callFunction({
        name: "movielist190906",
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
        // console.log(this.data.list)

      })
      .catch(err => {
        console.log(err)
      });
    // 调用云函数newmovelist190906
    wx.cloud.callFunction({
        name: "newmovielist190906",
        data: {
          //从第几条开始
          start: this.data.newlist.length,
          // 每次获得10条记录
          count: 10
        }
      })
      .then(res => {
        // console.log(res.result)
        //res.result得到的是字符串
        // 将字符串转为js对象
        var newObj = JSON.parse(res.result);
        // console.log(newObj)
        var newRows = newObj.subjects;
        for (var i = 0; i < newRows.length; i++) {
          var newStarsNum = newRows[i].rating.stars.split("").join(".");
          // starsNum=Math.floor(starsNum)
          newStarsNum = Number(newStarsNum)
          newRows[i].rating.stars = newStarsNum;
          // console.log(typeof stars+stars)
        }
        // console.log(rows[0].rating.stars)
        //将电影列表拼接
        newRows = this.data.newlist.concat(newRows);
        // 将拼接后结果保存在setdata里
        this.setData({
          newlist: newRows
        })


      })
      .catch(err => {
        console.log(err)
      });
    // 调用云函数hotsalebooks190906
    wx.cloud.callFunction({
        name: "hotsalebooks190906",
        data: {
          q: "人",
          //从第几条开始
          start: this.data.bookslist.length,
          // 每次获得10条记录
          count: 10
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
        bookRows = this.data.bookslist.concat(bookRows);
        // 将拼接后结果保存在setdata里
        this.setData({
          bookslist: bookRows
        })
        // console.log(this.data.bookslist)
      })
      .catch(err => {
        console.log(err)
      });
    // 调用云函数music190906
    wx.cloud.callFunction({
        name: "music190906",
        data: {
          q: "热门单曲榜单",
          //从第几条开始
          start: this.data.musiclist.length,
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
        musicRows = this.data.musiclist.concat(musicRows);
        // 将拼接后结果保存在setdata里
        this.setData({
          musiclist: musicRows
        })


      })
      .catch(err => {
        console.log(err)
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})