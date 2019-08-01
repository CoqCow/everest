let app = getApp()
console.log(app.globalReqjtUrl)
const Api = {
  getUserInfo: `${app.globalReqjtUrl}/user/green/getUserInfo`,//登录、获取用户信息
  register: `${app.globalReqjtUrl}/user/green/register`//注册
}
export default Api
