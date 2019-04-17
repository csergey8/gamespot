/* eslint-disable */
import Vue from 'vue';
import router from '../../../routes';

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyB95EXqnFaV48ws5DcETgnH7VM-AAqbWfI";

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
    authFailed: false,
    refreshLoading: true
  },
  getters: {
    isAuth(state) {
      if(state.token){
        return true
      } else {
        return false
      }
    },
    refreshLoading(state) {
      return state.refreshLoading
    }
  },
  mutations: {
    authUser(state, authData) {
      state.token = authData.idToken;
      state.refresh = authData.refreshToken;

      if(authData.type === 'signin') {
        router.push('/dashboard');
      }
    },
    authFailed(state, type){
      if(type === 'reset'){
        state.authFailed = false;
      } else {
        state.authFailed = true;
        setTimeout(() => {
          state.authFailed = false;
        },3000)
      }
    },
    logoutUser(state) {
      state.token = null;
      state.refresh = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');

      router.push('/');
    },
    refreshLoading(state) {
      state.refreshLoading = false;
    }
  },
  actions: {
    signIn({commit}, payload) {
      Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`, {
        ...payload,
        returnSecureToken: true
      })
      .then(res => res.json())
      .then(authData => {
        commit("authUser", {
          ...authData,
          type: 'signin'
        });
        localStorage.setItem('token', authData.idToken);
        localStorage.setItem('refresh', authData.refreshToken);
      })
      .catch(err => {
        commit("authFailed")
      })
    }, 
    refreshToken({commit}) {
      const refreshToken = localStorage.getItem('refresh');
      if(refreshToken) {
        Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
        .then(res => res.json())
        .then(data => {
          commit("authUser", {
            idToken: data.id_token,
            refreshToken: data.refresh_token,
            type: 'refresh'
          });

          commit("refreshLoading");

          localStorage.setItem('token', data.id_token);
          localStorage.setItem('refresh', data.refresh_token);
        })
        .catch(err => console.log(err))
      } else {
        commit("refreshLoading");
      }
    }
  }
}

export default admin;