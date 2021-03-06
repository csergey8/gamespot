/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './components/Store/store';

import Home from './components/Home/index.vue';
import Signin from './components/Signin/index.vue';
import Dashboard from './components/Dashboard/index.vue';

import MainDashboard from './components/Dashboard/main.vue';
import AddPost from './components/Dashboard/addPosts.vue';
import ListsPosts from './components/Dashboard/listPosts.vue';
import Post from './components/Post/post.vue';
import NotFound from './components/404/index.vue';


Vue.use(VueRouter);


const authGuard = {
  beforeEnter: (to, from, next) => {

    const redirect = () => {
      if(store.state.admin.token) {
        if(to.path === '/signin') {
          next('/dashboard')
        } else {
          next()
        }
        next()
      } else {
        if(to.path === '/signin') {
          next();
        } else {
          next('/')
        }
      }
    }
    if(store.state.admin.refreshLoading) {
      store.watch((state, getters) => getters['admin/refreshLoading'], () => {
        redirect();
      })
    } else {
      redirect();
    }
  }
}

const routes = [
  { path: '/', component: Home},
  { path: '/signin', component: Signin, ...authGuard},
  { path: '/dashboard', component: Dashboard, children: [
    {path: '/', component: MainDashboard},
    {path: 'add_posts', component: AddPost},
    {path: 'list_posts', component: ListsPosts},
  ], ...authGuard},
  { path: '/post/:id', component: Post, ...authGuard},
  { path: '*', component: NotFound }
]

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(from, to, savedPosition) {
    return {x:0 ,y: 0}
  }
})