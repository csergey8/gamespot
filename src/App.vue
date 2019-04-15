<template>
  <div>
    <comp-header />
    <div>content</div>
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
  }
  
}
</script>

<style>
  @import './assets/style.css';
</style>
