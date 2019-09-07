// components/headerInfo/headerInfo.js
Component({

  /**
   * 页面的初始数据
   */
   properties:{
    stuInfo:{
      type:Object,
       value:{},
      observer:'setHeader'
    },
  },
  data: {
    idCard:'',
    Info:{
      status3:'待资助'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //created 组件实例化，但节点树还未导入，因此这时不能用setData
  // attached 节点树完成，可以用setData渲染节点，但无法操作节点
  // ready(不是onReady) 组件布局完成，这时可以获取节点信息，也可以操作节点
  // moved 组件实例被移动到树的另一个位置
  // detached 组件实例从节点树中移除

  methods:{
    setHeader(){
           this.setIdCard();
           this.setAetAndStatus()
    },
    setAetAndStatus(){
        let age = this.properties.stuInfo.student_birthday || 1000;
        let Info = Object.assign({}, this.properties.stuInfo)
        age = this.getYear(Info.student_birthday || 10000);
        Info.age = age
        let states = Info.status3
        switch (states) {
          case 1 :
            // this.setDataInfo('status3','申请中')
            Info.status3 = '申请中'
            break
          case 2 :
            // this.setDataInfo('status3','资助中')
            Info.status3 = '资助中'
            break
          case 0:
            // this.setDataInfo('status3','待资助')
            Info.status3 = '待资助'
            break
          case 4:
            // this.setDataInfo('status3','已结束资助')
            Info.status3 = '已结束资助'
            break
        }
        this.setData({
          Info:Info
        })
    },
    setDataInfo(type,mes){
      this.setData({
          [`Info${type}`]:mes
      })
    },
    setIdCard(){
      let srt = '' + this.properties.stuInfo.id_card || '';
      let IDCARD = '*****'+  srt.substring(6,14) + '*****';
      if(Number(wx.getStorageSync('roleMan')) == 3){
        this.setData({
          idCard:this.properties.stuInfo.id_card
        })
      }
      this.setData({
        idCard:IDCARD
      })
    },
    getYear (time) { // 获取岁数
      let now = new Date().getTime();
      let last = time *1000;
      return  Math.ceil((now - last) / 31536000000)
    }
  },
  created(){

  },
  attached(){
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setIdCard();
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