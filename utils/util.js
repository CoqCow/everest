const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function requestApi(reqfile, paramdata, method) {
  //let plugin_ptKey = plugin.getStorageSync('jdlogin_pt_key')
 // const ptKey = wx.getStorageSync('jdlogin_pt_key') || plugin_ptKey || '' // 登录标识
 //paramdata.clientType = 'xcx'
  return new Promise((resolve, reject) => {
    wx.request({
      url: reqfile,
      data: paramdata,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: result => {
        if (result.data.code == 200) {
          resolve(result.data)
        } else {
          reject(result.data)
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  })
}
module.exports = {
  requestApi,
  formatTime: formatTime
}
