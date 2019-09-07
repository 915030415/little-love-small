class Time{

   getNowTime () {
        return parseInt(Date.now() / 1000)
    }
    getTime (time) { // 转化时间格式
        let now = new Date(time * 1000)
        let date1 = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
        let date2 = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
        return now.getFullYear() + '-' + date1 + '-' + date2
    }
    getTimeMinute (time) { // 转化时间格式
        let now = new Date(time * 1000)
        let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
        let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
        let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
        let minutes = now.getMinutes() < 10 ? '0' + now.getHours() : now.getHours()
        return month + '-' + day + ' ' + hours + ':' + minutes
    }
    getTime (time) { // 转化时间格式
        let now = new Date(time * 1000)
        let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
        let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
        let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
        let minutes = now.getMinutes() < 10 ? '0' + now.getHours() : now.getHours()
        return now.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    }
}
export {Time}