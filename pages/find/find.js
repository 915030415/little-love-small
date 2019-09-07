// pages/find/find.js
import $ajaxList from '../../api/ajaxList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenFlag:true,
    falgApply:false,
    studentName: '', // 搜索框的值
    timer: null, // 清除节流函数 之前的未执行的函数
    findStuMes:[
         // {
         //   student_id: 1,
         //   user_id: 2,
         //   student_name: 'asdf',
         //   school_address: "湖南",
         //   student_birthday: "12-11",
         //   student_money: '5000',
         //   student_text: "sdfaf",
         //   student_photo: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg"
         // },
         // {
         //   student_id: 1,
         //   user_id: 2,
         //   student_name: 'asdf',
         //   school_address: "湖南",
         //   student_birthday: "12-11",
         //   student_money: '5000',
         //   student_text: "sdfaf",
         //   student_photo: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg"
         // },
         // {
         //   student_id: 1,
         //   user_id: 2,
         //   student_name: 'asdf',
         //   school_address: "湖南",
         //   student_birthday: "12-11",
         //   student_money: '5000',
         //   student_text: "sdfaf",
         //   student_photo: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg"
         // }
       ],
    findAfterStuNameArr:[],
  },


  // 搜索框 节流函数
  debounce (handler, delay) {
    return () => {
      let arg = [].slice.call(arguments, 0)
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        handler.apply(this, arg)
      }, delay)
    }
  },

  searchName () { // 筛选 名字 功能
    let findAfterStuNameArr = this.data.findStuMes.filter(ele => {
      let flag = false
      if (ele.student_name.indexOf(this.data.studentName) == -1) {
        flag = false
      } else {
        flag = true
      }
      // console.log(flag)
      return flag // 只有 名字的值 包含 输入框里面的值 才保留
    })
    this.setData({
      findAfterStuNameArr:findAfterStuNameArr
    })
    // console.log(this.findAfterStuNameArr)
  },
  inputChange (e) { // 根据学生姓名搜索学生
     this.setData({
       studentName:e.detail.value
     })
    this.debounce(this.searchName, 500)()
  },
  /**
   * 生命周期函数--监听页面加载
   */

  upData () { // 跳转上传 学生资料
    wx.navigateTo({
      url:'./oneupdata/oneupdata'
    })
  },
  information(e){
    console.log(e)
    wx.navigateTo({
      url:`../../pages/find/information/information?id=${e.currentTarget.dataset['id']}`,
    })
  },
  getYear (time) { // 获取岁数
    //一年毫秒数(365 * 86400000 = 31536000000)
    // let now = Date.now()
    // let nowDate = new Date(now)
    // let nowYear = nowDate.getFullYear()
    // let lastNow = new Date(time * 1000)
    // let lastYear = lastNow.getFullYear()
    let now = new Date().getTime();
    let last = time *1000;
    return  Math.ceil((now - last) / 31536000000)
  },
  getFindMes () { // 获取 发现页 列表学生信息
    console.log($ajaxList)
   $ajaxList.getFindMes(
    ).then(res => {
      this.setData({
        falgApply:true,// 没有数据前 不显示
      })
      let findMesArr = res.data.one
      findMesArr.forEach((ele, index) => {
        ele.student_birthday = this.getYear(ele.student_birthday)
      })
     this.setData({
       findStuMes:findMesArr.reverse(),
     })
    })
  },
  onLoad: function (options) {
    this.setData({// 提示完成个人资料
      hiddenFlag: wx.getStorageSync('roleMan') === '0' && wx.getStorageSync('hiddenFlag') !== 'true' ? false : true,
      role:Number(wx.getStorageSync('roleMan'))
    })
    // this.role = Number(wx.getStorageSync('roleMan'));
    this.getFindMes()
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