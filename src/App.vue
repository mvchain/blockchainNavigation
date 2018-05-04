<template>
  <div id="app">
    <Home/>
    <footer class="footer">
      <div class="footer-con">
        <div class="footer-con-top">
          <div><img src="./assets/imgs/TTBTC.png" alt="foot"></div>
          <div>
            <img src="./assets/imgs/email.png" alt="email">
            <span>合作邮箱：ttbtc.cc@gmail.com</span>
          </div>
        </div>
        <div class="footer-con-bottom">
          © Copyright ttbtc 2018
        </div>
      </div>
    </footer>
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
  .footer{

    height: 190px;
    background:#3c3c3c;
    margin-top:30px;
    text-align center
  }
  .footer-con
    width:1200px;
    background:#3c3c3c;
    text-align center
    margin: 0 auto;
    color #9f9f9f
    .footer-con-top
      display flex
      justify-content space-between
      height 130px
      line-height 130px
      border-bottom: 1px solid #9f9f9f
    .footer-con-bottom
      height 59px
      line-height 59px

</style>
