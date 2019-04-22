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
    refreshLoading: true,
    addPost: false,
    imageUpload: null,
    adminPosts: null
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
    },
    addPostStatus(state) {
      return state.addPost
    },
    imageUpload(state) {
      return state.imageUpload
    },
    getAdminPosts(state) {
      return state.adminPosts;
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
    },
    addPost(state) {
      state.addPost = true;
    },
    clearAddPost(state) {
      state.addPost = false;
    },
    imageUpload(state, imageData) {
      state.imageUpload = imageData.secure_url
    },
    clearImageUpload(state) {
      state.imageUpload = null
    },
    getAdminPosts(state, posts) {
     state.adminPosts = posts;
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
    },
    addPost({commit, state}, payload) {
      Vue.http.post(`posts.json?auth=${state.token}`, payload)
        .then(res => res.json())
        .then(data => {
          commit("addPost");
          setTimeout(() => {
            commit("clearAddPost");
          }, 3000)
        })
    },
    imageUpload({ commit }, file) {
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dyxyl4lpx/image/upload';
      const CLOUDINARY_PRESET = 'v3bmj7xn';


     let formData = new FormData();

     formData.append('file', file);
     formData.append('upload_preset', CLOUDINARY_PRESET);

     Vue.http.post(CLOUDINARY_URL, formData, {
       headers: {
         'Content-type': 'application/x-www-form-urlencoded'
       }
     })
     .then(res => res.json())
     .then(res => {
       commit("imageUpload", res)
     })
    },
    getAdminPosts({ commit }) {
      Vue.http.get('posts.json')
      .then(res => res.json())
      .then(res => {
        let posts = [];
        for(let key in res) {
          posts.push({...res[key], id: key});
        }
        commit("getAdminPosts" ,posts.reverse());
      })
      
    }
  }
}

export default admin;