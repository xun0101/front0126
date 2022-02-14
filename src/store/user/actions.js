import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'

export const login = async ({ commit }, form) => {
  try {
    console.log(form)
    const { data } = await api.post('/users/login', form)
    commit('login', data.result)
    window.history.pushState('', '', '/')
    // router.push('/')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登入成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const logout = async ({ commit, state }) => {
  try {
    await api.delete('/users/logout', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('logout')
    router.push('/').catch(err => (err))
    router.replace('/').catch(err => (err))
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登出成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const getInfo = async ({ commit, state }) => {
  if (state.token.length === 0) return
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('getInfo', data.result)
  } catch (error) {
    commit('logout')
  }
}

export const signInLine = async ({ commit, state }) => {
  console.log(12345)
  const matches = location.href.match(/jwt=([^.\s]+.[^.\s]+.[^.\s]+)/gm)
  if (matches.length > 0) {
    const jwt = matches[0].substring(4, 176)
    if (jwt) {
      await api.get('/users/signInLineData', {
        headers: {
          authorization: 'Bearer ' + jwt
        }
      }).then(res => {
        commit('login', res.data)
        // router.push('/')
        window.history.pushState('', '', '/')
        // window.history.pushState('', '', '/line')
      }).catch((error) => {
        console.log(error)
        commit('logout')
      })
    }
  }
}

export const addcart = async ({ commit, state }, data) => {
  if (state.token.length === 0) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請先登入'
    })
    router.push('/')
    return
  }
  if (data.quantity <= 0) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請輸入正確數量'
    })
    return
  }
  try {
    const { data: resData } = await api.post('/users/me/cart', data, {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('editcart', resData.result)
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '加入購物車成功'
    })
  } catch (error) {
    console.log(error)
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '加入購物車失敗'
    })
  }
}
