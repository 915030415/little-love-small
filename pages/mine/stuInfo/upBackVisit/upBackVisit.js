// pages/mine/stuInfo/upBackVisit/upBackVisit.js
import $ajaxList from '../../../../api/ajaxList';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyLength:0,
    commentLength:0,
    familyLength:0,
    date: '2019-09-01',
    stuMes: {
      date: null,
      study: '',
      comment: '',
      family: '',
      score: '',
      photo: ''
    },
    uploaderList1: [],
    uploaderNum1:0,
    showUpload1:true,
    // 感谢信图片
    uploaderList2: [],
    uploaderNum2:0,
    showUpload2:true,
    showTopTips: false,
    id:1,
    nextFlag:true,
  },

  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setDateAll('nextFlag',false)
  },
  checking(){
    if (!this.data.stuMes.date) { // 判断地址
      this.showCheckingMes( '请选择回访日期')
      return this.data.nextFlag
    }
    if (!this.data.stuMes.study) { // 判断生日
      this.showCheckingMes( '请填写学习近况')
      return this.data.nextFlag
    }
    if (!this.data.stuMes.comment) { // 判断是否上传照片
      this.showCheckingMes( '请填写对学生的评价')
      return this.data.nextFlag
    }
    if (!this.data.stuMes.family) { // 判断是否上传照片
      this.showCheckingMes( '请填写家庭近况')
      return this.data.nextFlag
    }
    if (!this.data.stuMes.photo) { // 判断是否上传照片
      this.showCheckingMes( '请上传学生照片')
      return this.data.nextFlag
    }
    if (!this.data.stuMes.score) { // 判断是否上传照片
      this.showCheckingMes( '请上传成绩单')
      return this.data.nextFlag
    }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  submitForm() {
    this.setData({
      nextFlag:true,
    })
    let flag = this.checking()
    if (flag) {
      $ajaxList.postVisitRecord({
        student:this.data.id,
        ...this.data.stuMes
      }).then(resp => {
        wx.showToast({ icon:'success',title: '上传成功'})
        wx.navigateBack({
          delta:1
        })
      })
    }
  },


  birthday (val) { // 保存 生日 秒数
    let time = val.replace(new RegExp('-', 'gm'), '/')
    // new Date(time).getTime() / 1000
    this.setData({
      [`stuMes.date`]:new Date(time).getTime() / 1000
    })
  },
  setDateAll(type,value){
    // 设置 data
    this.setData({
      [type]:value
    })
  },
  setStuMes(type,value){ // 设置 学生信息
    this.setData({
      [`stuMes.${type}`]: value
    })
  },
  formInputChange(e) { // 设置 所有input textarear 输入框的值
    if(e.currentTarget.id == 'study'){
      this.setDateAll('studyLength',e.detail.value.length);
      this.setStuMes('study',e.detail.value)
    }
    if(e.currentTarget.id == 'comment'){
      this.setDateAll('commentLength',e.detail.value.length);
      this.setStuMes('comment',e.detail.value)
    }
    if(e.currentTarget.id == 'family'){
      this.setDateAll('familyLength',e.detail.value.length);
      this.setStuMes('family',e.detail.value)
    }
  },
  bindDateChange(e) {
    if(e.currentTarget.id == 'date'){ // 设置生日
      this.setDateAll('date',e.detail.value);
      this.birthday(e.detail.value)
    }
  },

  // 图片上传的一些方法
  // 删除图片
  clearImg(e){
    let nowList = [];//新数据
    let typeIndex = e.currentTarget.dataset.type
    let uploaderListType = `uploaderList${typeIndex}`
    console.log(uploaderListType)
    let uploaderList = this.data[uploaderListType];//原数据
    let imageArr = [];
    if(typeIndex == '1'){
      imageArr = this.data.stuMes.score.split('++++');
    }else{
      imageArr = this.data.stuMes.photo.split('++++');
    }
    for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
        imageArr.splice(i,1,);
        continue;
      }else{
        nowList.push(uploaderList[i])
      }
    }
    let imgStr = imageArr.join('++++');
    if(typeIndex == '1'){
      this.setData({
        uploaderNum1: this.data.uploaderNum1 - 1,
        uploaderList1: nowList,
        showUpload1: true,
        [`stuMes.score`]:imgStr
      })
    }else{
      this.setStuMes('photo',imgStr)
      this.setData({
        uploaderNum2: this.data.uploaderNum2 - 1,
        uploaderList2: nowList,
        showUpload2: true
      })
    }

  },
  //展示图片
  showImg(e){
    let that=this;
    let typeIndex = e.currentTarget.dataset.type
    let uploaderList = `uploaderList${typeIndex}`
    wx.previewImage({
      urls: that.data[uploaderList],
      current: that.data[uploaderList][e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload(e) {
    let that = this;
    let typeIndex =e.currentTarget.dataset.index;
    let uploaderNum = `uploaderNum${typeIndex}`
    wx.chooseImage({
      count: typeIndex == 1 ? 6 - that.data[uploaderNum] :1 - that.data[uploaderNum] , // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if(typeIndex == '1'){
          if(that.data.stuMes.score == ''){
            that.setData({
              [`stuMes.score`]:res.tempFilePaths[0]
            });// 存储图片
          }else{
            let urlStr = that.data.stuMes.score + '++++' + res.tempFilePaths[0]
            that.setData({
              [`stuMes.score`]:urlStr
            });// 存储图片
          }
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList1.concat(tempFilePaths);
          if (uploaderList.length== 6){
            that.setData({
              showUpload1:false
            })
          }
          that.setData({
            uploaderList1: uploaderList,
            uploaderNum1: uploaderList.length,
          })
        }else{
          if(that.data.stuMes.photo === ''){
            that.setStuMes('photo',res.tempFilePaths[0]);// 存储图片
          }else{
            let urlStr = that.data.stuMes.photo + '++++' + res.tempFilePaths[0]
            that.setStuMes('photo',urlStr);// 存储图片
          }
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList2.concat(tempFilePaths);
          if (uploaderList.length== 1){
            that.setData({
              showUpload2:false
            })
          }
          that.setData({
            uploaderList2: uploaderList,
            uploaderNum2: uploaderList.length,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     id:Number(options.id)
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