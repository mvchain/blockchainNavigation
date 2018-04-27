<template>
  <div id="app">
    <Home/>
    <div style="text-align: right">
    </div>
  </div>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home
  },
  mounted() {
    this.$store.dispatch('getCointList');
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./assets/css/reset.css";
</style>
