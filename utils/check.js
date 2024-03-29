// 根据身份证获取出生年月
function getBirthdayFromIdCard (idCard) {
    let birthday = ''
    if (idCard != null && idCard != '') {
        if (idCard.length == 15) {
            birthday = '19' + idCard.substr(6, 6)
        } else if (idCard.length == 18) {
            birthday = idCard.substr(6, 8)
        }

        birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
    }

    return birthday
}

// 根据身份证判断性别
function getSexFromIDCard (idCard) {
    let sex = ''
    if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
        sex = '男'
    } else {
        sex = '女'
    }
    return sex
}

function IdentityCodeValid (code) {
    let city = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 '}
    let tip = ''
    let pass = true

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
    } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
    } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('')
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
            // 校验位
            let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = code[i]
                wi = factor[i]
                sum += ai * wi
            }
            let last = parity[sum % 11]
            if (parity[sum % 11] != code[17]) {
                tip = '身份证校验位错误'
                pass = false
            }
        }
    }
    // if(!pass) alert(tip);
    // let arr = []
    // if(!pass){
    //   arr.push(pass,tip);
    //   return arr
    // }
    return pass
}
function checkTel (tel) {
    let mobile = /^1[3|5|8]\d{9}$/, phone = /^0\d{2,3}-?\d{7,8}$/
    return mobile.test(tel) || phone.test(tel)
}

export default {
    'getBirthdayFromIdCard': getBirthdayFromIdCard,
    'getSexFromIDCard': getSexFromIDCard,
    'IdentityCodeValid': IdentityCodeValid,
    'checkTel': checkTel
}