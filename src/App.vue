<template>
  <div>
    <comp-header />
    <router-view />
    <comp-footer />
  </div>
</template>

<script>
import compHeader from './components/Header/index.vue';
import compFooter from './components/Footer/index.vue';

export default {
  components: {
    compHeader,
    compFooter
  },
  created() {
    this.$store.dispatch('admin/refreshToken');
  }
  
}
</script>

<style>
  @import './assets/style.css';
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
