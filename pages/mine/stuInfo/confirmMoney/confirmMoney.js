// pages/mine/stuInfo/confirmMoney/confirmMoney.js
import $ajaxList from '../../../../api/ajaxList';
import {Time as time} from '../../../../utils/time.js';
const Time = new time();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuHelpLength:0,
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    nextFlag: true,
    id:1,
    proof: '',
  },

  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setDateAll('nextFlag',false)
  },
  checking(){

    if (!this.data.proof) {
      this.showCheckingMes( '请上传收款凭证')
      return this.data.nextFlag
    }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  submit () {
    this.setData({
      nextFlag:true,
    })
    let flag = this.checking()
    if (flag) {
      let nowTime = Time.getNowTime()
      $ajaxList.postMoneyRecord({
        student: this.data.id,
        proof: this.data.proof,
        time: nowTime
      }).then(resp => {
        wx.showToast({ icon:'success',title: '上传成功'})
        wx.navigateBack({
          delta:1
        })
      })
    }
  },
  setDateAll(type,value){
    // 设置 data
    this.setData({
      [type]:value
    })
  },
// 图片上传的一些方法
  // 删除图片
  clearImg(e){
    let nowList = [];//新数据
    let uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
        continue;
      }else{
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
    this.setDateAll('proof','');// 删除存储的图片
  },
  //展示图片
  showImg(e){
    let that=this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload(e) {
    let that = this;
    wx.chooseImage({
      count: 1 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setDateAll('proof',res.tempFilePaths[0]);// 存储图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length==1){
          that.setData({
            showUpload:false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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