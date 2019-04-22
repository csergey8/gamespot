/* eslint-disable */
import Vue from 'vue';


const posts = {
  namespaced: true,
  state: {
    homePosts: null,
    post: null
  },
  getters: {
    getAllPosts(state) {
      return state.homePosts
    },
    getPost(state) {
      return state.post
    }
  },
  mutations: {
    getAllPosts(state, posts) {
      state.homePosts = posts;
    },
    getPost(state, post) {
      state.post = post
    },
    clearPost(state) {
      state.post = null
    }
  },
  actions: {
    getAllPosts({commit}, payload) {
      Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
      .then(res => res.json())
      .then(res => {
        const posts = [];
        for(let key in res) {
          posts.push({
            ...res[key],
            id: key
          })
        }
        commit("getAllPosts", posts.reverse())
      })
    },
    getPost({commit}, payload) {
      Vue.http.get(`posts.json?orderBy="$key"&equalTo="${payload}"`)
      .then(res => res.json())
      .then(res => {
        let post = {};
        for(let key in res) {
          post = {
            ...res[key]
          }
        }
        commit("getPost", post)
      })
    }
  }
}

export default posts;