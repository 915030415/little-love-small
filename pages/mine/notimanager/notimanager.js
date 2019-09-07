// pages/mine/notimanager/notimanager.js
import $ajaxList from '../../../api/ajaxList'
import {Time as time} from '../../../utils/time'
let Time = new time()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    stu:[{},{},{}],
    flagApply:false,
    flag:true, // 是否为管理员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  noti(){
    // 只有管理员 才可以 发布通知
    // this.$router.push({name:'upNotifyInfo'})
      wx.navigateTo({
          url:`./upnotifyInfo/upnotifyInfo`
      })
  },
  setContent(e){//设置缓存
      wx.navigateTo({
          url:`./notifyInfo/notifyInfo?id=${e.currentTarget.dataset.index}`
      })
  },
  // 用户根据自己的id查看通知
  getNotiById(){
    $ajaxList.getNotiById({
      // id:this.data.id
    }).then(res =>{
      res.data.list.forEach(ele =>{
        ele.letter_time = Time.getTimeMinute(ele.letter_time)
      })
      this.setData({
        stu: res.data.list.reverse(),
        flagApply:true
      })
      if( res.data.list[0] == undefined){
        this.setData({
          flagApply:false
        })
      }
      // this.setData({
      //   [`stu.letter_time`]:Time.getTimeMinute(this.data.stu.letter_time)
      // });
      // this.stu.letter_time = this.getTimeMinute(this.stu.letter_time);
     wx.setStorageSync('notiMes',JSON.stringify(this.data.stu));
    })
  },
  onLoad: function (options) {
    let index =  Number(wx.getStorageSync('roleMan'));
    this.setData({
      flag:index == 3 ? true : false,
      // id:options.id
    })
    this.getNotiById();
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