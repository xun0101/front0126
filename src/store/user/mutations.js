export const login = (state, data) => {
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.cart = data.cart.length
  state.avatar = data.avatar
}

export const logout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.cart = 0
  state.avatar = ''
}

export const getInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.cart = data.cart.length
  state.avatar = data.avatar
}

export const extend = (state, data) => {
  state.token = data
}

export const editcart = (state, data) => {
  state.cart = data
}
