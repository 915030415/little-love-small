// pages/mine/mine.js
import $ajaxList from "../../api/ajaxList";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitRole:0,// 提交的是共建者 或志愿者
    noMargin:'noMargin',
    hiddenFlag:true,
    bottomClassPx:false,
    loginOrOut:'点击登录',
    totalNumInquire: 0,
    totalBumHelp: 0,
    notiNumber:0,// 通知数量
    user: {
      id: 2,
      name: '',
      photo: "http://loveproject.oss-cn-beijing.aliyuncs.com/1564989313/ico_logo.svg",
      title: ''
    },
    loginFlag:false,
    // menu: [
    //   {title: '我的资料', router: 'MyInfo'},
    //   {title: '我的账目', router: 'history'},
    //   {title: '设置收款账户', router: 'count'},
    //   {title: '资料审核管理', router: 'dataManagement'},
    //   {title: '通知管理', router: 'notiManager'},
    //   {title: '意见反馈', router: 'suggest'}
    // ],
    menu:[
        // {title: '我的资料', router: 'MyInfo'},
        // {title: '我的账目', router: 'history'},
        // {title: '设置收款账户', router: 'count'},
        // {title: '资料审核管理', router: 'dataManagement'},
        // {title: '通知管理', router: 'notiManager'},
        // {title: '意见反馈', router: 'suggest'}
    ],
    role:'',
  },
  toFillMes () { // 完善资料
    // this.$router.push({name: 'MyInfo', params: {id: 1}})
    // this.hiddenFlag = true
  },

  navigateTo(e){// 跳转页面
    function navigateUrl(url){
      wx.navigateTo({
        url:url
      })
    }
    if(e.currentTarget.dataset.router == 'MyInfo'){
      navigateUrl('./myinfo/myinfo')
    }
    if(e.currentTarget.dataset.router == 'notiManager'){
      navigateUrl('./notimanager/notimanager')
    }

    if(e.currentTarget.dataset.router == 'suggest'){
      navigateUrl('./suggest/suggest')
    }
    if(e.currentTarget.dataset.router == 'history'){
      navigateUrl('./history/history')
    }
    if(e.currentTarget.dataset.router == 'count'){
      navigateUrl('./count/count')
    }
    if(e.currentTarget.dataset.router == 'dataManagement'){
      navigateUrl('./dataManagement/dataManagement')
    }
  },

  close(){
    // this.hiddenFlag = true;
     this.setData({
       hiddenFlag:true
     })
      wx.setStorageSync('hiddenFlag',true);
  },
  login(){
    if(this.data.role == ''){
      // this.$router.push({name:'login'});
        wx.setStorageSync('roleMan','');
      wx.navigateTo({
        url:'../login/login'
      })
      // this.$router.push({name:'newLogin'});
    }else{
        wx.setStorageSync('roleMan','');

        wx.navigateTo({
          url:'../login/login'
        })
      // this.$router.push({name:'login'});
      // this.$router.push({name:'newLogin'});
    }
  },
  look () { // 跳转到 我的奖章页面
    // this.$router.push({name: 'decoration', params: {id: this.user.id}})
  },
  inquire () { // 跳转 已调查学生 页面
    wx.navigateTo({
      url:'./search/search'
    })
  },
  help () { // 跳转到 已经资助学生接口
    wx.navigateTo({
      url:'./search/search' + '?id=' + 'help'
    })
    // this.$router.push({name: 'helpSearch', params: {id: this.user.id}})
  },
  getTotalNum () { // 获取 已经 资助 或调查学生的总数
    if(Number(this.data.role) == 2){
      $ajaxList.getTotalNum({
        id: this.data.id
      }).then(res => {
         this.setData({
           totalBumHelp:res.data.result
         })
        // this.totalBumHelp = res.data.result
      })
    }else if(Number(this.data.role) == 1){
      $ajaxList.getTotalNumV({
        id: this.data.id
      }).then(res => {
        this.setData({
          totalNumInquire:res.data.result
        })
        // this.totalNumInquire = res.data.result
      })
    }

  },
  getHeaderMes () {
    //  获取头部信息
    $ajaxList.getHeaderMes({
      id: this.data.id
    }).then(res => {
      this.setData({
        [`user.name`]:res.data.result.name,
        [`user.title`]: res.data.result.points,
        [`user.photo`]: res.data.result.photo || 'http://loveproject.oss-cn-beijing.aliyuncs.com/1567504693/ico_logo.svg'
      })
      // this.user.name = res.data.result.name
      // this.user.title = res.data.result.points
      // this.user.photo = res.data.result.photo || 'http://loveproject.oss-cn-beijing.aliyuncs.com/1567504693/ico_logo.svg'
      // this.user.image =  res.data.result.photo || '../../assets/ico_logo.svg'
    })
  },
  getNotiById(){
    // 查看通知数量
    $ajaxList.getNotiById({
      id:this.data.id
    }).then(res =>{
      this.setData({
        notiNumber:res.data.list.length
      })
      // this.notiNumber = res.data.list.length;

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  setDataAll(type,data){
    this.setData({
      [type]:data
    })
  },
  onLoad: function (options) {
     this.setData({
       submitRole:  wx.getStorageSync('subMitRole'),// 提交时 是志愿者 或者是共建者
       hiddenFlag:wx.getStorageSync('roleMan') === '0' &&   wx.getStorageSync('hiddenFlag') !== 'true' ? false : true,// 提示完成个人资料
       id:Number(  wx.getStorageSync('id')),
       [`user.id`]:this.data.id,
       role:wx.getStorageSync('roleMan'),
     })
    // console.log(this.data.role == '','ddd')
    // this.submitRole =   wx.getStorageSync('subMitRole');// 提交时 是志愿者 或者是共建者
    // this.hiddenFlag =   wx.getStorageSync('roleMan') === '0' &&   wx.getStorageSync('hiddenFlag') !== 'true' ? false : true;// 提示完成个人资料
    // this.id =Number(  wx.getStorageSync('id'));
    // this.user.id  = this.id;
    // this.role =   wx.getStorageSync('roleMan');
    if(this.data.role !== ''){
      this.setDataAll('loginOrOut','退出登录')
      this.setDataAll('loginFlag',true)
    }
    if(this.data.role == 3){
      let menu =   [
        // {title: '我的资料', router: 'MyInfo',className:'MyInfo'},
        // {title: '我的账目', router: 'history',className:'history'},
        {title: '设置收款账户', router: 'count',className:'count'},
        {title: '资料审核管理', router: 'dataManagement',className:'dataManagement'},
        {title: '通知管理', router: 'notiManager',className:'notiManager'},
        // {title: '意见反馈', router: 'suggest',className:'suggest'}
      ]
      this.setDataAll('menu',menu)
    }else if(this.data.role !== '' && (this.data.role == 1 || this.data.role == 0)){
      this.setDataAll('bottomClassPx',true)
      let menu =   [
        {title: '我的资料', router: 'MyInfo',className:'MyInfo'},
        // {title: '我的账目', router: 'history',className:'history'},
        // {title: '设置收款账户', router: 'count'},
        // {title: '资料审核管理', router: 'dataManagement'},
        {title: '通知中心', router: 'notiManager',className:'notiManager'},
        {title: '意见反馈', router: 'suggest',className:'suggest'}
      ]
      this.setDataAll('menu',menu)
    }else if(this.data.role !== null && this.data.role ==2){
      this.setDataAll('bottomClassPx',true)
      let menu =   [
        {title: '我的资料', router: 'MyInfo',className:'MyInfo'},
        {title: '我的账目', router: 'history',className:'history'},
        // {title: '设置收款账户', router: 'count'},
        // {title: '资料审核管理', router: 'dataManagement'},
        {title: '通知中心', router: 'notiManager',className:'notiManager'},
        {title: '意见反馈', router: 'suggest',className:'suggest'}
      ]
      this.setDataAll('menu',menu)
      console.log(this.data.menu,'ssss')
    }
    // this.getNotiById()
    if(Number(this.data.role) !== 3 && Number(this.data.role) !== 0){
      this.getTotalNum()// 管理员时不用
      this.getHeaderMes()
    }
    if(Number(this.data.role) !== 3 && wx.getStorageSync('helpFlag') == 'true'){
      // this.getTotalNum()// 管理员时不用
      this.getHeaderMes()
    }

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