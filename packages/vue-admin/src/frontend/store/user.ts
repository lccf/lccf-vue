export type UserState = {
  token: string,
  name: string,
  avatar: string,
  roles: string[]
}
const getDefaultState = (): UserState => {
  return {
    token: '',
    name: '',
    avatar: '',
    roles: []
  }
}

export const user = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    RESET_STATE: (state: UserState) => {
      Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state: UserState, token: string) => {
      state.token = token
    },
    SET_NAME: (state: UserState, name: string) => {
      state.name = name
    },
    SET_AVATAR: (state: UserState, avatar: string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state: UserState, roles: string[]) => {
      state.roles = roles
    }
  }
}