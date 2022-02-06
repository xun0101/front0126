export const login = (state, data) => {
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.cart = data.cart
}

export const logout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.cart = 0
}

export const getInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.cart = data.cart
}

export const extend = (state, data) => {
  state.token = data
}
