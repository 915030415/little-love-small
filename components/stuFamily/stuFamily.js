// components/stuFamily/stuFamily.js
Component({

  /**
   * 页面的初始数据
   */
  properties:{
    familyInfo:{
      type:Object,
      value:{},
      observer:'setFamily'
    }
  },
  data: {
    idCard:'',
    progressImgArr:[],
    progressText:[],// 家庭情况文本
    letterImgArr:[],
    flagLetter:true,
    flagApply:false,
  },
  methods:{
     // 开始 第一次传时 this.properties.familyInfo 为 {}
     // 没有数据时this.properties.familyInfo 为 null
     setFamily(){
       if(this.properties.familyInfo == null || !this.properties.familyInfo.familyInfo){
         this.setData({
           flagApply:false
         })
       }else{
         this.setData({
           flagApply:true
         })
         this.setIdCard();
         this.progressImgArr();
         this.progressText();
         this.letterImgArr();
         this.flagLetter();
       }
     },
     setIdCard(){
       let srt = ''
       if(this.properties.familyInfo.family_id_number){
         srt = '' +  this.properties.familyInfo.family_id_number || '';
       }else{
         srt = ''
       }
       let IDCARD = '*****'+  srt.substring(6,14) + '*****';
       if(Number(wx.getStorageSync('roleMan')) == 3){
         this.setData({
           idCard:this.properties.familyInfo.family_id_number
         })
       }
       this.setData({
         idCard:IDCARD
       })
     },
    progressImgArr(){// 设置家庭情况
      let family_progress = this.properties.familyInfo.family_progress || '';
       console.log(family_progress)
      let arr = family_progress.split('++++') || []
      arr.shift()
      this.setData({
        progressImgArr:this.arrWay( arr)
      })
    },
    arrWay(arr){ // 处理 数组
      let lastArr = [];
      let newArr = [];
      arr.forEach((ele,index,self) =>{
        if(index % 2 === 0){
          //   最后一位 落单 时 也push进去
          index !=0 && lastArr.push(newArr);
          newArr = [];
        }
        newArr.push(ele);
        if( index == self.length -1){
          lastArr.push(newArr)
        }
      });
      return lastArr
    },
    progressText(){
      let family_progress = this.properties.familyInfo.family_progress || '';
      this.setData({
        progressText:family_progress.split('++++')[0] || []
      })
    },
    letterImgArr(){
      let letter = this.properties.familyInfo.family_letter || '';
      let arr  = letter.split('++++') || []
       this.setData({
         letterImgArr:this.arrWay(arr)
       })
    },
    flagLetter(){
      let str = this.properties.familyInfo.family_letter || '';
      if(str == ''){
        return false
      }else{
        return true
      }
    },
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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