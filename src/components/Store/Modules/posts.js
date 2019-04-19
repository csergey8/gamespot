/* eslint-disable */
import Vue from 'vue';


const posts = {
  namespaced: true,
  state: {
    homePosts: null
  },
  getters: {
    getAllPosts(state) {
      return state.homePosts
    }
  },
  mutations: {
    getAllPosts(state, posts) {
      state.homePosts = posts;
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
    }
  }
}

export default posts;