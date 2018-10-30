import {
  // login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        /*暂时改为本地模拟数据，不发请求 */
        try {
          const mockResponse = {
            code: 20000,
            data: {
              token: 'admin'
            }
          }
          setToken(mockResponse.data.token)
          commit('SET_TOKEN', mockResponse.data.token)
          resolve()
        } catch (e) {
          reject(e)
        }
        /*暂时改为本地模拟数据，不发请求 */

        /*注释原发送请求代码 */
        // login(username, userInfo.password).then(response => {
        //   console.log("login response:", response);
        //   const data = response.data
        //   setToken(data.token)
        //   commit('SET_TOKEN', data.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        /*注释原发送请求代码 */
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        /*暂时改为本地模拟数据，不发请求 */
        try {
          const userInfoResponse = {
            code: 20000,
            data: {
              name: "admin",
              avatar: "",
              roles: ["admin"]
            }
          };
          console.log("userInfoResponse.data.roles:", userInfoResponse.data.roles);
          if (userInfoResponse.data.roles && userInfoResponse.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', userInfoResponse.data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', userInfoResponse.data.name)
          commit('SET_AVATAR', userInfoResponse.data.avatar)
          resolve(userInfoResponse)
        } catch (e) {
          console.log("getUserInfo Error:", e);
          reject(e)
        }
        /*暂时改为本地模拟数据，不发请求 */

        /*注释原发送请求代码 */
        // getInfo(state.token).then(response => {
        //   console.log("user info response:", response);
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
        /*注释原发送请求代码 */
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        /*暂时改为本地模拟数据，不发请求 */
        try {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        } catch (e) {
          reject(e)
        }
        /*暂时改为本地模拟数据，不发请求 */

        /*注释原发送请求代码 */
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        /*注释原发送请求代码 */
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
