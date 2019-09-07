// pages/find/oneupdata/oneupdata.js
import {Time as time} from '../../../utils/time.js';
import check from '../../../utils/check'
import $ajaxList from '../../../api/ajaxList'

const Time = new time();
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stuAddrLength: 0,//学生详细地址长度
        stuHelpLength: 0,
        uploaderList: [],
        uploaderNum: 0,
        showUpload: true,
        array: ['男', '女'],
        index: 0,
        region: ['广东省', '广州市', '海珠区'],
        // customItem: '全部',
        date: '2016-09-01',
        date1: '2016-09-01',
        showTopTips: false,
        stuMes: {
            student_money: '',
            student_name: '',
            id_card: '',
            student_school: '',
            student_inneed: '',
            student_photo: '',
            studentAddress: '',
            student_sex: 1,
            student_date: ''
            // stu_areaid: 440305
        },
        nextFlag: true
    },
    showCheckingMes(mes) {
        wx.showToast({icon: 'none', title: mes})
        this.setDateAll('nextFlag', false)
    },
    checking() {
        for (let item in this.data.stuMes) { // 验证 信息
            if (!this.data.nextFlag) { // 避免 很多资料 没填 弹出n条弹框
                break
            }
            switch (item) {
                case 'student_money':
                    if (this.data.stuMes.student_money == '') {
                        this.showCheckingMes('请输入金额')
                        //   wx.showToast({ icon:'none',title: '请输入金额'})
                        // this.setDateAll('nextFlag',false)
                        break;
                    }
                    if (this.data.stuMes.student_money == '错误' || this.data.stuMes.student_money == 0) {
                        this.showCheckingMes('请输入正确金额')
                        //  wx.showToast({ icon:'none',title: '请输入正确金额'})
                        // this.setDateAll('nextFlag',false)
                        break;
                    }
                // break;
                case 'student_name' :
                    if (this.data.stuMes.student_name == '') {
                        this.showCheckingMes('请填写名字')
                        //  wx.showToast({ icon:'none',title: '请填写名字'})
                        // this.setDateAll('nextFlag',false)
                        break;
                    }
                // break;
                case 'id_card' :
                    // let obj =  Object.assign({},this.data.stuMes);
                    if (!check.IdentityCodeValid(this.data.stuMes['id_card'])) {
                        this.showCheckingMes('请输入正确身份证')
                        // wx.showToast({ icon:'none',title: '请输入正确身份证'})
                        // this.data.nextFlag = false
                        break;
                    }

                case 'student_school' :
                    if (this.data.stuMes.student_school == '') {
                        this.showCheckingMes('请填写学校名称')
                        //  wx.showToast({ icon:'none',title: '请填写学校名称'})
                        // this.setDateAll('nextFlag',false)
                        break;
                    }
                // break;

                case 'student_inneed' :
                    if (this.data.stuMes.student_inneed == '') {
                        this.showCheckingMes('请填写资助信息')
                        //  wx.showToast({ icon:'none',title: '请填写资助信息'})
                        // this.setDateAll('nextFlag',false)
                        break;
                    } else if (this.data.stuMes.student_inneed.length > 500) {
                        this.showCheckingMes('资助信息不能超过500字')
                        //  wx.showToast({ icon:'none',title: '资助信息不能超过500字'})
                        // this.setDateAll('nextFlag',false)
                        break;
                    }
            }
        }

        if (!this.data.stuMes.stu_areaid) { // 判断地址
            this.showCheckingMes('请选择学生住址')
            return this.data.nextFlag
        }
        if (!this.data.stuMes.student_birthday) { // 判断生日
            this.showCheckingMes('请填写生日')

            return this.data.nextFlag
        }
        if (!this.data.stuMes.student_photo) { // 判断是否上传照片
            this.showCheckingMes('请上传照片')
            return this.data.nextFlag

        }
        if (!this.data.stuMes.studentAddress) { // 判断是否上传照片
            this.showCheckingMes('输入学生详细地址')

            return this.data.nextFlag
        }
        // if (this.data.stuMes.studentAddress.length > 100) {
        //   this.showCheckingMes( '学生详细地址不能超过100字')
        //   return this.data.nextFlag
        // }
        return this.data.nextFlag // 返回 是否 可以点击 下一步
    },
    submitForm(e) {// 下一步
        this.setDateAll('nextFlag', true);// 确保每次都可以验证
        let flag = this.checking();
        if (flag) {
            // let idCard = this.data.stuMes.id_card.substr(this.data.stuMes.id_card.length - 4)
            // let stuMesStr = 'stuMes' + idCard
            // wx.setStorageSync(stuMesStr,JSON.stringify(this.data.stuMes));
            let that = this
            $ajaxList.CheackIdCard({
                crad: this.data.stuMes.id_card
            }).then(res => {
                if (!res.data) {
                    if (flag) {
                        // let idCard = this.data.stuMes.id_card.substr(this.data.stuMes.id_card.length - 4)
                        // let stuMesStr = 'stuMes' + idCard
                        // this.stuMes.data.student_sex = this.sex[0] == '男' ? 1 : 2;
                        wx.setStorageSync('stuMesStr', JSON.stringify(this.data.stuMes));
                        // wx.navigateTo({
                        //   url:`../twoupdata/twoupdata?id=1`,
                        //   success(res){ // 当页面成功被打开 传送数据过去
                        //     res.eventChannel.emit('postStuMes',{stuMes:that.data.stuMes});
                        //   }
                        // })
                        wx.redirectTo({
                            url: `../twoupdata/twoupdata?id=1`,
                        })
                    }
                } else {
                    wx.showToast({
                        title: '身份证已存在请重新填写',
                        icon: 'none',
                        duration: 1500
                    })
                }

            });
        }
    },
    bindPickerChange(e) {
        if (e.currentTarget.id == 'region') {
            // 设置地址
            this.setDateAll('region', e.detail.value)
            this.setStuMes('stu_areaid', Number(e.detail.code[2]))
        }
        if (e.currentTarget.id == 'sex') { // 设置性别
            this.setDateAll('index', e.detail.value)
            this.setStuMes('sex', Number(e.detail.value) + 1); // 1为男 2 为女
        }
        if (e.currentTarget.id == 'date') { // 设置生日
            this.setDateAll('date', e.detail.value);
            this.birthday(e.detail.value)
        }
        if (e.currentTarget.id == 'date1') { // 设置生日
            this.setDateAll('date1', e.detail.value);
            this.birthday(e.detail.value)
        }
    },
    birthday(val, index) { // 保存 生日 秒数
        let time = val.replace(new RegExp('-', 'gm'), '/')
        if (index == 1) {
            this.setData({
                [`stuMes.student_date`]: new Date(time).getTime() / 1000
            });
        }
        this.setData({
            [`stuMes.student_birthday`]: new Date(time).getTime() / 1000
        });

    },
    getMesSexAndage() { //根据身份证 获取生日 和 性别

        let sex = 1;
        let age = '';
        if (check.IdentityCodeValid(this.data.stuMes.id_card)) {
            sex = check.getSexFromIDCard(this.data.stuMes.id_card);
            age = check.getBirthdayFromIdCard(this.data.stuMes.id_card);
            this.setDateAll('date', age);
            let index = sex == '男' ? 0 : 1;
            this.setDateAll('index', index);
            this.birthday(age)
        }
    },
    autoGetNowTime() { // 自动获取创档日期
        let nowDate = Date.now();
        this.setData({
            'date': Time.getTime(nowDate / 1000)
        })
        // this.data.date = Time.getTime(nowDate / 1000);
        //       // this.setData({
        //   date:Time.getTime(nowDate / 1000)
        // })
        this.onConfirm();
    },
    onConfirm(val) { // 创档日期的值
        this.setData({
            'stuMes': {...this.data.stuMes, student_date: Time.getNowTime()}
        })
    },
    setDateAll(type, value) {
        // 设置 data
        this.setData({
            [type]: value
        })
    },
    setStuMes(type, value) { // 设置 学生信息
        this.setData({
            [`stuMes.${type}`]: value
        })
    },
    formInputChange(e) { // 设置 所有input textarear 输入框的值
        if (e.currentTarget.id == 'money') {
            let str = Number(e.detail.value)
            let type = typeof str
            if (type == 'number') {
                this.setStuMes('student_money', Number(e.detail.value))
            }
            let strNaN = str + ''
            if (strNaN == 'NaN') { //为字符串 str 为NaN
                this.setStuMes('student_money', '错误')
            }
        }
        if (e.currentTarget.id == 'stuName') {
            this.setStuMes('student_name', e.detail.value)
        }
        if (e.currentTarget.id == 'idcard') {
            this.setStuMes('id_card', e.detail.value)
        }
        if (e.currentTarget.id == 'stuAddr') {
            this.setDateAll('stuAddrLength', e.detail.value.length);
            this.setStuMes('studentAddress', e.detail.value)
        }
        if (e.currentTarget.id == 'schoolName') {
            this.setStuMes('student_school', e.detail.value)
        }
        if (e.currentTarget.id == 'stuHelp') {
            this.setDateAll('stuHelpLength', e.detail.value.length);
            this.setStuMes('student_inneed', e.detail.value)
        }
    },

    // 图片上传的一些方法
    // 删除图片
    clearImg(e) {
        let nowList = [];//新数据
        let uploaderList = this.data.uploaderList;//原数据

        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum: this.data.uploaderNum - 1,
            uploaderList: nowList,
            showUpload: true
        })
        this.setStuMes('noti_addition', '');// 删除存储的图片
    },
    //展示图片
    showImg(e) {
        let that = this;
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index]
        })
    },
    //上传图片
    upload(e) {
        let that = this;

        // wx.chooseImage({
        //     success(res) {
        //         const tempFilePaths = res.tempFilePaths
        //         console.log(tempFilePaths[0])
        //         wx.uploadFile({
        //             url: 'https://loveproject.oss-cn-beijing.aliyuncs.com', //仅为示例，非真实的接口地址
        //             filePath: tempFilePaths[0],
        //             name: 'file',
        //             header: {
        //                 'Content-type': 'multipart/form-data'
        //             },
        //             formData: {
        //                 'user': 'test'
        //             },
        //             success(res) {
        //                 const data = res.data
        //                 //do something
        //             }
        //         })
        //     }
        // })


        wx.chooseImage({

          count: 1 - that.data.uploaderNum, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            // that.setStuMes('student_photo',res.tempFilePaths[0]);// 存储图片
            let tempFilePaths = res.tempFilePaths;
            // let uploaderList = that.data.uploaderList.concat(tempFilePaths);
            // if (uploaderList.length==1){
            //   that.setData({
            //     showUpload:false
            //   })
            // }
            // that.setData({
            //   uploaderList: uploaderList,
            //   uploaderNum: uploaderList.length,
            // })
            console.log(tempFilePaths[0])
              let key = parseInt(new Date().getTime() / 1000) + '/' + 'file'
              console.log(key)
            wx.uploadFile({
              url: 'http://loveproject.oss-cn-beijing.aliyuncs.com', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              // header: {
              //   'Content-type': 'multipart/form-data'
              // },
              formData: {
                key:key,
              },
              success (res){
                console.log(res)
              }
            })
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.autoGetNowTime();// 自动 创建日期
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