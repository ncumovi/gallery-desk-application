<template>
  <div id="app">
    <div  class='orention' v-if='show_orention'>
      为了更好的体验效果，敬请横屏浏览哦！！
    </div>
    <router-view v-if='!show_orention' />
  </div>
</template>

<script>
// var Vc = require('vconsole')
export default {
  name: 'app',
  mounted:function(){
    var that = this;
    // var vConsole = new Vc();
    if (window.orientation === 180 || window.orientation === 0) {
      that.show_orention = true; //竖屏显示
    }
    //移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
      if (window.orientation === 180 || window.orientation === 0) {
        that.show_orention = true; //竖屏显示
      }
      if (window.orientation === 90 || window.orientation === -90 ){
        that.show_orention = false;
      }
    }, false);
  },
  data(){
    return{
      show_orention:false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html,body{
  width: 100%;
  height: 100%;
  background-color: #222;
  margin: 0;
}
.orention{
  width: 100%;
  height: 100%;
  z-index: 99;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color:#fff;

}
</style>
