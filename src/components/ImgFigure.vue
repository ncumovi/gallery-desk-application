<template>

  <figure class="img-figure" :class="{'is-inverse':ImgDatas.isInverse,'is-center':ImgDatas.isCenter}" :style="styObj" >
    <img :src='ImgDatas.imageUrl' :alt='ImgDatas.title'></img>
    <figcaption>
      <h2 class='img-title'>{{ImgDatas.title}}</h2>
      <div class='img-back'>
        <p>{{ImgDatas.desc}}</p>
      </div>
    </figcaption>
  </figure>


</template>

<script>
export default {
  props:[
    'ImgDatas'
  ],
  mounted:function(){

    setTimeout(function(){

      this.giveData();

    }.bind(this),100)


  },
  watch:{
    ImgDatas: {
　　　　handler(v) {
　　　　　 this.giveData();
　　　　},
　　　　deep: true
　　}
  },
  data () {
    return {
      styObj: {}
    }
  },
  methods:{
    giveData(){
      this.styObj = this.ImgDatas.pos;
      this.styObj.transform = 'rotate('+this.ImgDatas.rotate+')';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .img-figure{
    position: absolute;
    left: 0;
    top:0;
    width: 16%;
    /* height: 20%; */
    margin: 0;
    padding: 2%;
    box-sizing: border-box;
    cursor: pointer;
    background-color: #fff;
    transform-style: preserve-3d;
    transition: all 0.6s ease-in-out ;
    transform-origin: 0 50% 0;
    outline:1px solid transparent;  /* 去锯齿 */
  }
  .img-figure img{
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    outline:1px solid transparent;  /* 去锯齿 */
  }
  .img-figure.is-inverse {
    z-index: 12;
    transform:  translateX(100%) rotateY(180deg)!important;
  }
  .img-figure.is-center{
    z-index: 12;
  }
  figcaption{
    text-align: center;
  }
  figcaption .img-title{
    margin: 2% 0 0 0;
    color: #a7a0a2;
    font-size: 13px;
    backface-visibility: hidden;
  }
  figcaption .img-back {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 10% 8%;
    overflow: auto;
    color: #a7a0a2;
    font-size: 13px;
    line-height: 1.25;
    text-align: left;
    background-color: #fff;
    backface-visibility: hidden;
    box-sizing: border-box;
    transform: rotateY(-180deg) translateZ(1px);
  }
  /* 处理手机端的样式问题 */
  @media screen and (max-width: 1000px) {
    figcaption .img-back p{
      font-size: 10px;
    }
  }
  figcaption .img-back  p {
    margin: 0;
  }
</style>
