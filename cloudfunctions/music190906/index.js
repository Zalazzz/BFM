// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//1.引入request-promise库
const rq = require("request-promise");

//2.添加入口函数
exports.main = async (event, context) => {
  // 2.1返回函数:向豆瓣发送请求获得正在上映的电影的数据
  var url = `https://api.douban.com/v2/music/search?apikey=0df993c66c0c636e29ecbb5344252a4a&q=${event.mname}&start=${event.start}&count=${event.count}`;
  //2.2返回函数结果
  return rq(url).then(
    //发送请求
    res => {
      return res;//返回结果
    }
  ).catch(
    err => {
      console.log(err)
    }
  )
}



// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }