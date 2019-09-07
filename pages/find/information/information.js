// pages/find/information/information.js
import $ajaxList from '../../../api/ajaxList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagSubmit:false,// 只有信息显示完全后才显示 我要资助
    stuId: 3,
    userId: 5,
    hiddenFlag: true, // 控制 中间宽的 出现
    hiddenFlag1: true,
    askFlag: true, // 控制 只能申请一次
    second: 3, // 几秒后关闭
    clickFlag: true, // 控制 重复点击 申请
    askStatus: 1, // 为1 的话 表示 我要资助
    status:1, // 共建者的状态
    role:0,
    askMes:'我要资助',
    // mes: {},
    // mesArr: [], // 受资历史
    // familyArr: {},// 家庭信息
    stuInfo:{
      // city: "市辖区",
      // cobuilderName: "李思思",
      // cobuilderPhone: "0156098766789",
      // discovered: 0,
      // district: "万州区",
      // exist: false,
      // financed: 0,
      // id_card: "451025198803217675",
      // name: null,
      // province: "重庆市",
      // province_student: 0,
      // reject_reason: '2344234234',
      // schoolArea: 500101,
      // schoolCity: "市辖区",
      // schoolDistrict: "万州区",
      // schoolProvince: "重庆市",
      // school_address: "阿斯蒂芬",
      // school_comment: "萨达",
      // school_contact: "13055172874",
      // school_people: "阿斯蒂芬",
      // school_progress: "士大夫",
      // school_score: "http://loveproject.oss-cn-beijing.aliyuncs.com/1566811379/07.jpg",
      // school_teacher: "sadf",
      // school_teacher_number: "13055172874",
      // status3: 0,
      // stu_areaid: 500101,
      // studentAddress: "asdf",
      // student_birthday: 574876800,
      // student_count: 0,
      // student_date: 1566811306,
      // student_id: 988,
      // student_inneed: "asdf",
      // student_money: 4000,
      // student_name: "s暗示法",
      // student_photo: "http://loveproject.oss-cn-beijing.aliyuncs.com/1566811337/04.jpg",
      // student_school: "asdf",
      // student_sex: 1,
      // student_stats: 2,
      // student_stats2: 1,
      // user_id: 3,
      // volunteerName: "CCC",
      // volunteerPhone: "33333333",
      // volunteer_id: 1,
    },
    moneyHistory:[
      // {
      //   history_note: "sadf ",
      //   history_reason: "sdaf ",
      //   student_id: 988,
      // },
      // {
      //   history_note: "sadf ",
      //   history_reason: "sdaf ",
      //   student_id: 988,
      // },
      // {
      //   history_note: "sadf ",
      //   history_reason: "sdaf ",
      //   student_id: 988,
      // },  {
      //   history_note: "sadf ",
      //   history_reason: "sdaf ",
      //   student_id: 988,
      // }
    ],
    familyInfo:{
      // areaId: 460105,
      // family_address: "sadf",
      // family_contact: "13055172874",
      // family_id_number: "451025198803217675",
      // family_letter: "http://loveproject.oss-cn-beijing.aliyuncs.com/1566811395/05.jpg",
      // family_name: "sadf",
      // family_note: "sadf",
      // family_progress: "sadf++++http://loveproject.oss-cn-beijing.aliyuncs.com/1566811393/06.jpg",
      // family_relation: "sadf",
      // student_id: 988,
    },
  },
  getStuInfoByIdAndHistoryAndFamily () {
    let Info = $ajaxList.getStuInfoById( // 查看学生个人信息
        {
          id: this.data.stuId
        }
    )
    let money = $ajaxList.getMoneyHistory( // 查看学生受资助历史信息
        {
          Id: this.data.stuId
        }
    )
    let familyArr = $ajaxList.getFamilyInfo( // 查看学生家庭情况
        {
          Id: this.data.stuId
        }
    )
    console.log(this.data.role,this.data.role,'jjjjjjjjjjj')
    let volunteer =  this.data.role &&  this.data.role != 3  && $ajaxList.getVolunteerInfo({ // 获取共建者资料的状态判断是否审核通过
      // id: this.
      id: 2
    }) || ''
    Promise.all([Info, money, familyArr,volunteer]).then(resp => {
      this.setData({
        stuInfo:resp[0].data.one,
        userId:resp[0].data.one.user_id, // 获取 共建者的id
        askStatus:resp[0].data.one.student_stats2,// 获取 学生状态
        moneyHistory:resp[1].data.one,
        familyInfo:resp[2].data && resp[2].data.one[0] || {},
        status:resp[3].data && resp[3].data.one.status || 0,
        role: resp[3].data && resp[3].data.one.role || 0,
        flagSubmit:true,
      });
      this.askMesTitle();
      // this.mes = resp[0].data.one
      // this.userId = resp[0].data.one.user_id // 获取 共建者的id
      // this.askStatus = resp[0].data.one.student_stats2 // 获取 学生状态
      // // this.getStates();
      // // console.log(this.mes)
      // // console.log(this.askStatus,resp[0].data.one.student_stats2)
      // this.mesArr = resp[1].data.one
      // this.familyArr = resp[2].data.one[0] || {}
      // this.status = resp[3].data.one.status || 0;
      // this.role = resp[3].data.one.role || 0;
      // this.flagSubmit = true;
    })
  },
  submit (e) {
    // 申请资助成功 隐藏 框
    if(this.data.role == 2 && this.data.status == 2){
      if (this.data.askFlag) { // 只能 申请一次
        this.postTradeAsk()
      } else {
        this.setData({
          hiddenFlag1:false
        })
      }
    }else if(this.data.role == 1 || this.data.role == 3 || this.data.role == 0){
      wx.showToast({
           title:'只有共建者才能资助',
            icon:'none',
           duration:1000,
      })
      // this.showToast({msg: '只有共建者才能资助'});
    }else if(this.data.role == 2 && this.data.status == 1 ){
      wx.showToast({
        title:'你的资料待审核,审核通过才可以资助哦',
        icon:'none',
        duration:1000,
      })
      // this.showToast({msg: '你的资料待审核,审核通过才可以资助哦'});
    }else if(this.data.role == 2 && this.data.status == 3){
      wx.showToast({
        title:'你的资料待审核失败,审核通过才可以资助哦',
        icon:'none',
        duration:1000,
      })
      // this.showToast({msg: '你的资料待审核失败,审核通过才可以资助哦'});
    }

  },
  askMesTitle () { //设置 我要资助的文字
    if (this.data.askStatus !=1) { // 是申请状态 就不可以 点击
      this.setData({
        askFlag:false
      })
    }
    this.setData({
      askMes: this.data.askStatus == 1 ? '我要资助' : '资助申请中'
    })
  },
  postTradeAsk () {
    //    资助申请
    this.setData({
      hiddenFlag:false,
      askFlag:false,
      askStatus:0,
    })
    // this.hiddenFlag = false;
    // // 成功之后弹出 成功弹框
    // this.askFlag = false
    // this.askStatus = 0// 修改成 申请中

    // 防止多次点击

    // 把学生 和 共建者 关联起来
    let UpdataStuMesId = $ajaxList.postUpdataStuMes({
      student_id:this.data.stuId,
      user_id:this.data.userId,
    });
    let postTradeAsk =  $ajaxList.postTradeAsk(
        {
          user: this.data.userId,
          student: this.data.stuId,
        }
    )
    Promise.all([UpdataStuMesId,postTradeAsk]).then(res =>{
      this.getStuInfoByIdAndHistoryAndFamily();// 刷新数据
      // 成功之后弹出 成功弹框
      // this.askFlag = false
      // this.askStatus = 0// 修改成 申请中
      this.setData({
        askFlag:false,
        askStatus:0,
      })
      // 设置 缓存 表示 该学生 正在 请求资助中
      //  this.askStu.push(this.stuId);
      wx.setStorageSync('applying' + this.data.stuId,1);
      if (this.data.clickFlag) {
        // this.hiddenFlag = false;
        // this.clickFlag = false;
        this.setData({
          hiddenFlag:false,
          clickFlag:false,
        })
        let timer = setInterval(() => {

          this.setData({
            second:this.data.second-1
          })
        }, 1000)
        let timer1 = setTimeout(() => {
          // this.hiddenFlag = true
          // this.second = 3
          this.setData({
            hiddenFlag:true,
            second:3
          })
          // cancelAnimationFrame(timer)
          clearInterval(timer)
          clearTimeout(timer1)
        }, 3000);
      }
    })

    //  .then(res => {
    //   // console.log(res);
    //   // 成功之后弹出 成功弹框
    //   this.askFlag = false
    //   this.askStatus = 0// 修改成 申请中
    //   // 设置 缓存 表示 该学生 正在 请求资助中
    //   //  this.askStu.push(this.stuId);
    //    sessionStorage.setItem('applying' + this.stuId,1);
    //   if (this.clickFlag) {
    //     this.hiddenFlag = false;
    //     this.clickFlag = false;
    //     let timer = setInterval(() => {
    //       this.second -= 1
    //     }, 1000)
    //     let timer1 = setTimeout(() => {
    //       this.hiddenFlag = true
    //       this.second = 3
    //       cancelAnimationFrame(timer)
    //       clearTimeout(timer1)
    //     }, 3000);
    //   }
    // })
  },
  backFind () { // 返回 发现页面
    wx.switchTab({
      url:'../../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      role: Number(wx.getStorageSync('roleMan')),
      stuId:Number(options.id)
    })
    // this.role = Number(sessionStorage.getItem('roleMan'));
    // this.stuId = this.$route.params.id
    // this.getStates();
    this.getStuInfoByIdAndHistoryAndFamily()
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