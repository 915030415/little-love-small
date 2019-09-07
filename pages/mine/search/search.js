// pages/mine/search/search.js
import $ajaxList from '../../../api/ajaxList'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        message: [
            {
                number: 0,
                mes: '审核中·'
            },
            {
                number: 0,
                mes: '审核通过·'
            },
            {
                number: 0,
                mes: '已驳回|已取消·'
            }
        ],
        activeClass: [true, false, false],
        falgApply: false, // 没有学生时显示 没有数据
        flag1: false, // 显示 我调查的学生
        flag2: false, // 显示 共建者 和 志愿者
        flag3: false,  // 显示 管理 学生档案
        flagVG: true, // 为 true 代表 是 志愿者 否则 共建者
        flag4: false, // 显示 回访记录列表
        flag5: false,// 显示 共建者申请资助列表
        flag6: false,// 显示 学生外出活动 申请列表
        flag7: false,// 显示 我资助学生
        indexStatus: 1,//  访问 的列表的  状态
        studentName: '',//输入框 内容

        // 我调查学生
        stuMes: [],
        filterAfterStuMes: [],

    // 我资助的学生
        stuMesHelp: [],
        filterAfterStuMesHelp: [],
    },

    // 跳转 到学生详细页面
    info(e) {//stuId,role,user_id
        let stuId = e.currentTarget.dataset.stuid;
         let userId = e.currentTarget.dataset.userId;
        let role = e.currentTarget.dataset.role || 'inq';
        let user_id = e.currentTarget.dataset.user_id;
        //  设置 缓存 学生详情页面是 我调查的还是 管理员 学生档案详细


        wx.setStorageSync('roleStuInfo', role);// role = M 为 管理员 为 inq 为 我调查的学生
        wx.setStorageSync('userId', user_id);
        wx.navigateTo({
            url: `../stuInfo/stuInfo?id=${stuId}`
        })
    },


    getAge(time) { // 获取岁数
        //一年毫秒数(365 * 86400000 = 31536000000)
        // let now = Date.now()
        // let nowDate = new Date(now)
        // let nowYear = nowDate.getFullYear()
        // let lastNow = new Date(time * 1000)
        // let lastYear = lastNow.getFullYear()
        let now = new Date().getTime();
        let last = time * 1000;
        return Math.ceil((now - last) / 31536000000)
    },

    // 获取我调查学生 的列表
    getMyinquire() { // 获取 我调查的 学生 列表
        if (this.data.indexStatus == 3) { //已结束 已驳回
            let quire3 = $ajaxList.getMyinquire({
                Id: 7,
                Stats: 3
            })
            let quire4 = $ajaxList.getMyinquire({
                Id: 7,
                Stats: 4
            })
            Promise.all([quire3, quire4]).then(res => {
                // 合并数组
                if(res[1].data.one[1] && res[1].data.one[0]){
                    this.setData({
                        stuMes: this.getinquireStuMes()(res[0].data.one.concat(res[1].data.one)),
                        falgApply: true
                    })
                }else{
                    this.setData({
                        falgApply: false
                    })
                }
            })
        } else {
            $ajaxList.getMyinquire({
                Id: 7,
                Stats: this.data.indexStatus
            }).then(res => {
                if(res.data.one[0]){
                    this.setData({
                        stuMes: this.getinquireStuMes()(res.data.one),
                        falgApply: true
                    })
                }else{
                    this.setData({
                        falgApply: false
                    })
                }
            })

        }
    },
    getinquireStuMes() {
        //  默认 等于 拥有所有学生的数组
        return (arr) => {
            arr.forEach(ele => {
                // 转换年龄
                ele.student_birthday = this.getAge(ele.student_birthday)
                // 设置 学生的状态
                let states = ele.status2
                switch (states) {
                    case 1 :
                        ele.status2 = '申请中'
                        break
                    case 2 :
                        ele.status2 = '资助中'
                        break
                    case 0:
                        ele.status2 = '待资助'
                        break
                    case 4:
                        ele.status2 = '已结束资助'
                        break
                }
            })
            return arr
        }
    },

    // 获取 我资助学生数量
    getMyhelp() { // 获取 我调查的学生
        if (this.data.indexStatus  == 3) {
            let help3 = $ajaxList.getMyhelp(
                {
                    id: 2,
                    Stats: 3
                }
            )
            let help4 = $ajaxList.getMyhelp(
                {
                    id: 2,
                    Stats: 4
                }
            )
            Promise.all([help3, help4]).then(res => {
                // 合并两个数组
                if(res[1].data.one[1] && res[1].data.one[0]){
                    this.setData({
                        stuMesHelp: this.getinquireStuMesHelp()(res[0].data.one.concat(res[1].data.one)),
                        falgApply: true
                    })
                }else{
                    this.setData({
                        falgApply: false
                    })
                }

            })
        } else {
            $ajaxList.getMyhelp(
                {
                    id: 2,
                    Stats: this.data.indexStatus
                }
            ).then(res => {
                if(res.data.one[0]){
                    this.setData({
                        stuMesHelp: this.getinquireStuMes()(res.data.one),
                        falgApply: true
                    })
                }else{
                    this.setData({
                        falgApply: false
                    })
                }
            })
        }
    },
    getinquireStuMesHelp() {
        //  默认 等于 拥有所有学生的数组
        // this.inquireStuMes = this.$store.state.inquireStuMes.stuMes;
        return  (arr)=> {
            // this.stuMes = arr;
            arr.forEach(ele => {
                // 转换年龄
                ele.student_birthday = this.getAge(ele.student_birthday)
                // 设置 学生的状态
                let states = ele.student_stats
                switch (states) {
                    case 1 :
                        ele.student_stats = '审核中'
                        break
                    case 2 :
                        ele.student_stats = '资助中'
                        break
                    case 3:
                        ele.student_stats = '已资助结束'
                        break
                    case 4:
                        ele.student_stats = '已驳回'
                        break
                }
            })
            return arr
        }
    },


    // 获取 各状态数量
    PostAjax(index) { // 获取我调查学生 各状态的数量
        return $ajaxList.getMyinquire({
            Id: 7,
            Stats: index
        })
    },
    PostAjaxHelp(index) {// 获取我资助学生 数量
        return $ajaxList.getMyhelp({
            id: 2,
            Stats: index
        })
    },

    PostAjaxVolun(index) { // 获取管理员 界面 志愿者 各个状态是 数量
        return $ajaxList.getVolunteerList({
            role: 1,
            status: index
        })
    },
    PostAjaxGongjian(index) { // 获取 共建者 各状态的数量
        return $ajaxList.getGongjian({
            role: 2,
            status: index
        })
    },
    PostAjaxManStu(index) {
        return $ajaxList.getManStuArr({
            Id: index
        })
    },
    PostAjaxVisiteBack(index) {
        return $ajaxList.getStuVisiteBackM({
            status: index
        })
    },
    PostAjaxAidApply(index) { // 申请资助学生 管理
        return $ajaxList.getStuAidApply({
            status: index
        })
    },
    PostAjaxOutApply(index) {// 外出活动管理
        return $ajaxList.getStuOutApply({
            Id: index
        })
    },
    getNumberAllAjax() { // 获取 志愿者 或者  学生 各状态的 数量
        switch (this.data.id) {
            case 'M0':
                this.getNumber(this.PostAjaxVolun(1), this.PostAjaxVolun(2), this.PostAjaxVolun(3), this.PostAjaxVolun(4));
                break;
            case 'M1':
                this.getNumber(this.PostAjaxGongjian(1), this.PostAjaxGongjian(2), this.PostAjaxGongjian(3), this.PostAjaxGongjian(4));
                break;
            case 'M2':
                this.getNumber(this.PostAjaxManStu(1), this.PostAjaxManStu(2), this.PostAjaxManStu(3), this.PostAjaxManStu(4));
                break;
            case 'M3' :
                this.getNumber(this.PostAjaxVisiteBack(1), this.PostAjaxVisiteBack(2), this.PostAjaxVisiteBack(3));
                break;
            case 'M4' :
                this.getNumber(this.PostAjaxAidApply(1), this.PostAjaxAidApply(2), this.PostAjaxAidApply(3), this.PostAjaxAidApply(4));
                break;
            case 'M5' :
                this.getNumber(this.PostAjaxOutApply(1), this.PostAjaxOutApply(2), this.PostAjaxOutApply(3));
                break;
            case 'help':
                this.getNumber(this.PostAjaxHelp(1), this.PostAjaxHelp(2), this.PostAjaxHelp(3), this.PostAjaxHelp(4));
                break;
            default:
                this.getNumber(this.PostAjax(1), this.PostAjax(2), this.PostAjax(3), this.PostAjax(4));
        }
    },
    getNumber(...arg) { // 获取 各状态的数量
        arg[0].then(res => {
            this.setData({
                [`message[${0}].number`]: res.data.one.length,
            })
        });
        arg[1].then(res => {
            this.setData({
                [`message[${1}].number`]: res.data.one.length,
            })
        });
        if (arg[3]) { // 我调查的学生
            Promise.all([arg[2], arg[3]]).then(res => {

                this.setData({
                    [`message[${2}].number`]: res[0].data.one.length + res[1].data.one.length,
                })
            })
        } else {
            this.setData({
                [`message[${2}].number`]: res.data.one.length,
            })
        }
    },


    setFlag() { // 设置 显示 志愿者 我调查的学生 或者 共建者 或者 学生档案
        let id = this.data.id;
        switch (id) {
            case 'M0':
                this.setData({flag2: true, flagVG: true});
                break;
            case 'M1':
                this.setData({flag2: true, flagVG: false});
                break;
            case 'M2':
                this.setData({flag3: true});
                break;
            case 'M3':
                this.setData({flag4: true});
                break;
            case 'M4':
                this.setData({flag5: true});
                break;
            case 'M5':
                this.setData({flag6: true});
                break;
            case 'help':
                this.setData({flag7: true});
                break;
            default:
                this.setData({flag1: true});
        }
    },

    removeClassAndgetStuMes(e) {
        let index = e.currentTarget.dataset.index;
        wx.setStorageSync('volunteerStatus', index + 1); // 控制志愿者 驳回 通过的 展示
        let classArr = [false, false, false];
        classArr.splice(index, 1, true);
        this.setData({activeClass: classArr});
        this.upDateMesList(index + 1);
    },
    upDateMesList(index) { //更新 不同状态的 列表
        this.setData({
            indexStatus: index,
        })
        this.setFlag();
        this.data.flag2 && !this.data.flagVG && this.getGongjian(); // 获取 共建者的列表
        this.data.flag2 && this.data.flagVG && this.getVolunteerList()// 获取 志愿者 管理 界面的列表
        // this.flag2 && this.getVolunteerOrGonjian() // 获取所有志愿者的信息 和 共建者的列表
        this.data.flag1 && this.getMyinquire() // 获取 我调查的 学生列表
        this.data.flag3 && this.getManStuArr() // 获取 学生档案管理 学生
        this.data.flag4 && this.getStuVisiteBackM(); // 获取 返回记录列表
        this.data.flag5 && this.getStuAidApply(); // 获取 共建者资助列表
        this.data.flag6 && this.getStuOutApply(); // 获取 外出申请列表
        this.data.flag7 && this.getMyhelp(); // 获取我资助的学生

    },

    // 搜索框 节流函数
    debounce(handler, delay) {
        return () => {
            let arg = [].slice.call(arguments, 0)
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                handler.apply(this, arg)
            }, delay)
        }
    },
    inputChange(e) { // 根据学生姓名搜索学生
        this.setData({
            studentName: e.detail.value
        })
        this.debounce(this.filterTheStuMes, 500)()
    },
    // 筛选 各种列表
    filterTheStuMes() { // 筛选 符合 的学生

        //      通过 名字 筛选 数组
        // 通过 事件总线 监听 来自 inquire 页面 传过来的 输入框 内容

        // 根据 flag1 flag2判断 是进行 我调查学生的 帅选 还是 管理员 志愿者 列表的筛选

        if (this.data.flag1) {
            let List = this.data.stuMes.filter(ele => {
                let flag = false
                if (ele.student_name.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
            this.setData({
                filterAfterStuMes: List,
            })
        } else if (this.data.flag2) {
            this.filterAftervolunteerListOrGongjian = this.volunteerListOrGongjian.filter(ele => {
                let flag = false
                if (ele.name.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
        } else if (this.data.flag3) {
            this.filterAfterAllStuList = this.totalStuList.filter(ele => {
                let flag = false
                if (ele.student_name.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
        } else if (this.data.flag4) {
            this.filterVisiteBackStuList = this.visiteBackStuList.filter(ele => {
                let flag = false
                if (ele.name.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
        } else if (this.data.flag5) {
            this.filterAidApplyList = this.aidApplyList.filter(ele => {
                let flag = false
                if (ele.username.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
        } else if (this.data.flag6) {
            this.filterOutApplyList = this.outApplyList.filter(ele => {
                let flag = false
                if (ele.user_name.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
        }else if(this.data.flag7){
            let List = this.data.stuMesHelp.filter(ele => {
                let flag = false
                if (ele.student_name.indexOf(this.data.studentName) == -1) {
                    flag = false
                } else {
                    flag = true
                }
                return flag // 只有 名字的值 包含 输入框里面的值 才保留
            })
            this.setData({
                filterAfterStuMesHelp: List,
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setStorageSync('volunteerStatus', 1);
        this.setData({
            message: Number(wx.getStorageSync('roleMan')) == 2 ? [{
                number: 0,
                mes: '审核中·'
            },
                {
                    number: 0,
                    mes: '资助中·'
                },
                {
                    number: 0,
                    mes: '已驳回|已取消·'
                }] : this.data.message,
            id: options.id
        });
        this.getNumberAllAjax();
        this.upDateMesList(1);
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