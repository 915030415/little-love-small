// pages/mine/stuInfo/askOut/askOut.js
import check from "../../../../utils/check";
import $ajaxList from '../../../../api/ajaxList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nextFlag: true,
    date: '2016-09-01',
    out_addressLength:0,
    out_purposeLength:0,
    out_contextLength:0,
    mes: {
      out_time: '',
      out_address: '',
      out_purpose: '',
      out_context: '',
      student_id: 13,
      user_id: 13
    },
  },
  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setData({
      nextFlag:false
    })
  },
  birthday (val) { // 保存 生日 秒数
    let time = val.replace(new RegExp('-', 'gm'), '/')
    // new Date(time).getTime() / 1000
    this.setData({
      [`mes.out_time`]:new Date(time).getTime() / 1000
    })
  },
  submitForm () {
    this.setData({
      nextFlag:true,
    })
    let flag = this.checking()
    if (flag) {
      $ajaxList.postOutAsk({
        ...this.data.mes
      }).then(res => {
        wx.showToast({ icon:'success',title: '上传成功'})
        wx.navigateBack({
          delta:1
        })
      })
    }
  },
  checking(){
    if (!this.data.mes.out_time) { // 判断地址
      this.showCheckingMes( '请选择活动时间')
      return  this.data.nextFlag
    }
    if (!this.data.mes.out_address) { // 判断生日
      this.showCheckingMes( '请填活动详细地址')
      return this.data.nextFlag
    }
    if (!this.data.mes.out_purpose) { // 判断是否上传照片
      this.showCheckingMes( '请填写活动目的')
      return this.data.nextFlag

    }
    if (!this.data.mes.out_context) { // 判断是否上传照片
      this.showCheckingMes( '请填写活动内容')
      return this.data.nextFlag
    }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  bindDateChange(e) {
    if(e.currentTarget.id == 'date'){ // 设置生日
      this.setData({
        date:e.detail.value
      })
      this.birthday(e.detail.value)
    }
  },
  setStuMes(type,value){ // 设置 学生信息
    this.setData({
      [`mes.${type}`]: value
    })
  },
  formInputChange(e) { // 设置 所有input textarear 输入框的值
    if(e.currentTarget.id == 'out_address'){
      this.setData({
        out_addressLength:e.detail.value.length
      })
      this.setStuMes('out_address',e.detail.value)
    }
    if(e.currentTarget.id == 'out_purpose'){
      this.setData({
        out_purposeLength:e.detail.value.length
      })
      this.setStuMes('out_purpose',e.detail.value)
    }
    if(e.currentTarget.id == 'out_context'){
      this.setData({
        out_contextLength:e.detail.value.length
      })
      this.setStuMes('out_context',e.detail.value)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      [`mes.student_id`]:Number(options.id)
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