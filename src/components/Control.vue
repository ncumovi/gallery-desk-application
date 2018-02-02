<template>
  <span class='controller-unit' :class="{'is-center':ImgDatas.isCenter,'is-inverse':ImgDatas.isInverse}">
    <i class='iconfont icon-jiantouarrow476-copy'></i>
  </span>
</template>

<script>
export default {
  props:[
    'ImgDatas'
  ],
  mounted:function(){


  },
  watch:{

  },
  data () {
    return {
      styObj: {}
    }
  },
  methods:{
    giveData(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controller-unit{
  display: inline-block;
  margin: 0 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: #aaa;
  border-radius: 50%;
  transform: scale(0.5);
  transition: all 0.6s ease-in-out;
}
.controller-unit i{
  display: none;
  color: #fff;
}
.controller-unit.is-center{
  transform: scale(1);
}
.controller-unit.is-center i{
  display: inline-block;
}
.controller-unit.is-inverse{
  transform: rotateY(180deg);
}
</style>
