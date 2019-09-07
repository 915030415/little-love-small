// pages/find/twoupdata/twoupdata.js
import check from '../../../utils/check'
import $ajaxList from '../../../api/ajaxList'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shcoolAddrLength:0,
    stuProgressLength:0,//学生近况长度
    commentLength:0,//
    uploaderList: [],
    uploaderNum:0,
    showTopTips: false,
    showUpload:true,
    region: ['广东省', '广州市', '海珠区'],
    stuMes:{
      school_people: '',
      school_contact: null,
      school_teacher: '',
      school_teacher_number: null,
      school_progress: '',
      school_comment: '',
      school_score: '',
      school_address:'',
      schoolArea:''
    },
    nextFlag:true
  },
  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setDateAll('nextFlag',false)
  },
  checking(){
    for (let item in this.data.stuMes) { // 验证 信息
      if (!this.data.nextFlag) { // 避免 很多资料 没填 弹出n条弹框
        break
      }
      switch (item) {
        case 'school_people':
          if (this.data.stuMes.school_people == '') {
            this.showCheckingMes('请输入校方负责人')
            //   wx.showToast({ icon:'none',title: '请输入金额'})
            // this.setDateAll('nextFlag',false)
            break;
          }
        case 'school_contact' :
          if (!check.checkTel(this.data.stuMes.school_contact)) {
            this.showCheckingMes('校方联系方式有误')
            //  wx.showToast({ icon:'none',title: '请填写名字'})
            // this.setDateAll('nextFlag',false)
            break;
          }
          // break;
        case 'school_teacher' :
          // let obj =  Object.assign({},this.data.stuMes);
          if(this.data.stuMes.school_teacher == ''){
            this.showCheckingMes('请填写班主任姓名')
            // wx.showToast({ icon:'none',title: '请输入正确身份证'})
            // this.data.nextFlag = false
            break;
          }

        case 'school_teacher_number' :
          if (!check.checkTel(this.data.stuMes.school_teacher_number)) {
            this.showCheckingMes('班主任手机号码有误')
            //  wx.showToast({ icon:'none',title: '请填写学校名称'})
            // this.setDateAll('nextFlag',false)
            break;
          }
          // break;

        case 'school_progress' :
          if (this.data.stuMes.school_progress == '') {
            this.showCheckingMes('请填写学生近况')
            //  wx.showToast({ icon:'none',title: '请填写资助信息'})
            // this.setDateAll('nextFlag',false)
            break;
          }
      }
    }

    if (!this.data.stuMes.schoolArea) {
      this.showCheckingMes( '请选择学校地址')
      return this.data.nextFlag
    }
    if (!this.data.stuMes.school_score) { // 判断是否上传照片
      this.showCheckingMes( '请上传成绩单')
      this.setDateAll('nextFlag',false)
      return this.data.nextFlag

    }
    if (this.data.stuMes.school_address.length  > 100) {
      this.showCheckingMes( '学校详细地址不能超过100字')
      // wx.showToast({icon:'none',title: '输入家庭详细地址'})
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    if (!this.data.stuMes.school_address) { // 判断是否上传照片
      this.showCheckingMes( '输入学校详细地址')
      // wx.showToast({icon:'none',title: '输入家庭详细地址'})
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  submitForm(e) {// 下一步
    this.setDateAll('nextFlag',true);// 确保每次都可以验证
    let flag =  this.checking();
    console.log(this.data.stuMes)
    if(flag){
      $ajaxList.postFindStudentMes({
        ...this.data.stuMes,
      }).then(res => {
        if(res.code == -113){
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
        }else{
          // this.data.stuId = res.data.id
          this.setData({
            stuId:res.data.id
          })
          // let stuMesStr = 'stuMes' + this.stuIdCard
          // sessionStorage.setItem(stuMesStr,JSON.stringify(this.stuMes));
          wx.redirectTo({
            url:`../threeupdata/threeupdata?id=${this.data.stuId}`
          });
          // this.$router.replace({name: 'threeUpData', params: {id: this.stuId}});
        }
      },res=>{
        wx.showToast({
          title: '填写资料出错',
          icon: 'none',
          duration: 1000
        })
      });
      // let idCard = this.data.stuMes.id_card.substr(this.data.stuMes.id_card.length - 4)
      // let stuMesStr = 'stuMes' + idCard
      // wx.setStorageSync(stuMesStr,JSON.stringify(this.data.stuMes));
      // let that = this
      // wx.navigateTo({
      //   url:`../twoupdata/twoupdata?id=1`,
      //   success(res){ // 当页面成功被打开 传送数据过去
      //     res.eventChannel.emit('postStuMes',{stuMes:that.data.stuMes});
      //   }
      // })
    }
  },
  bindPickerChange(e) {
    if(e.currentTarget.id == 'schoolArea'){
      // 设置地址
      this.setDateAll('region',e.detail.value)
      this.setStuMes('schoolArea',Number(e.detail.code[2]))
    }
    // if(e.currentTarget.id == 'sex'){ // 设置性别
    //   this.setDateAll('index',e.detail.value)
    //   this.setStuMes('sex',Number(e.detail.value) + 1); // 1为男 2 为女
    // }
    // if(e.currentTarget.id == 'date'){ // 设置生日
    //   this.setDateAll('date',e.detail.value);
    //   this.birthday(e.detail.value)
    // }
  },
  setDateAll(type,value){
    // 设置 data
    this.setData({
      [type]:value
    })
  },
  onConfirm (val) { // 创档日期的值
    this.setData({
      'stuMes':{...this.data.stuMes,student_date:Time.getNowTime()}
    })
  },
  setStuMes(type,value){ // 设置 学生信息
    this.setData({
      [`stuMes.${type}`]: value
    })
  },
  formInputChange(e) { // 设置 所有input textarear 输入框的值
    if(e.currentTarget.id == 'school_people'){
      this.setStuMes('school_people',e.detail.value)
    }
    if(e.currentTarget.id == 'school_contact'){
      this.setStuMes('school_contact',e.detail.value)
    }
    if(e.currentTarget.id == 'school_address'){
      this.setDateAll('shcoolAddrLength',e.detail.value.length)
      this.setStuMes('school_address',e.detail.value)
    }
    if(e.currentTarget.id == 'school_teacher'){
      this.setStuMes('school_teacher',e.detail.value)
    }
    if(e.currentTarget.id == 'school_teacher_number'){
      this.setStuMes('school_teacher_number',e.detail.value)
    }
    if(e.currentTarget.id == 'stuProgress'){
      this.setDateAll('stuProgressLength',e.detail.value.length);
      this.setStuMes('school_progress',e.detail.value)
    }
    if(e.currentTarget.id == 'comment'){
      this.setDateAll('commentLength',e.detail.value.length);
      this.setStuMes('school_comment',e.detail.value)
    }
  },

  // 图片上传的一些方法
  // 删除图片
  clearImg(e){
    let nowList = [];//新数据
    let uploaderList = this.data.uploaderList;//原数据
     let imageArr = this.data.stuMes.school_score.split('++++');
    for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
        imageArr.splice(i,1,);
        continue;
      }else{
        nowList.push(uploaderList[i])
      }
    }
    let imgStr = imageArr.join('++++');
    this.setStuMes('school_score',imgStr)
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })

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
      count: 6 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if(that.data.stuMes.school_score == ''){
          that.setStuMes('school_score',res.tempFilePaths[0]);// 存储图片
        }else{
          let urlStr = that.data.stuMes.school_score + '++++' + res.tempFilePaths[0]
          that.setStuMes('school_score',urlStr);// 存储图片
        }
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length== 6){
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
  onLoad: function (option) {
    // console.log(option.query);
    // const eventChannel = this.getOpenerEventChannel();
    // eventChannel.on('postStuMes', data=>{//注册 监听事件
    //   this.setData({
    //     stuMes:data.stuMes
    //   })
    // })
    this.setData({
      stuMes:JSON.parse(wx.getStorageSync('stuMesStr'))
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