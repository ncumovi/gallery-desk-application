<template>
   <section class='stage' ref='stage'>
      <section class='img-src'>
        <img-figure v-for='(img,index) in imageDatas' :key="index"  :img-datas='img' @click.native='center(index)'/>
      </section>
      <nav class='controller-nav'>
        <control v-for='(img,index) in imageDatas' :key="index" :img-datas='img'  @click.native='controlImg(index)'></control>
      </nav>
    </section>
</template>

<script>
import ImgFigure from './ImgFigure';
import Control from './Control';
//获取相关图片的数据
var imgDatas = require('../../static/imageDatas.json');

//利用执行函数 将图片信息转化成图片URL路径信息
imgDatas = (function genImageUrl(imageDatasArr) {
  for (var i = 0; i < imageDatasArr.length; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageUrl = require('../../static/' + singleImageData.fileName); //结合require处理图片的地址
    //初始化图片翻转 默认false
    singleImageData.isInverse = false;
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imgDatas);

export default {
  name: 'stage',
  data () {
    return {
      imageDatas:imgDatas, //获取相关图片的数据
      // imageArrays:[], //自定义添加的一些数据状态 例如：是否是居中 是否翻转等
      Constant:{
        centerPos: {
          left: 0,
          right: 0
        },
        hPosRange: { //水平方向图片的取值范围
          leftSecx: [0, 0],
          rightSecx: [0, 0],
          y: [0, 0]
        },
        vPosRange: {//垂直方向图片的取值范围
          x: [0, 0],
          topY: [0, 0]
        }
      }
    }
  },
  components:{
    ImgFigure:ImgFigure,
    Control:Control
  },
  mounted:function(){
    var that = this;
    this.initStage();
    window.onresize = function(){
      that.initStage();
    }
  },
  methods:{
    initStage(){
    //首先拿到舞台的大小
      var stageDom = this.$refs.stage,
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

      //拿到一个imgageFigure的大小
      var imgFigureDom = this.$children[0].$el,
          imgW = imgFigureDom.scrollWidth,
          imgH = imgFigureDom.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);


      //计算中心图片的位置
      this.Constant.centerPos = {
        left: (halfStageW - halfImgW)+'px',
        top: (halfStageH - halfImgH)+'px'
      }

      //计算左侧图片的位置 水平范围
      this.Constant.hPosRange.leftSecx[0] = -halfImgW;
      this.Constant.hPosRange.leftSecx[1] = halfStageW - halfImgW * 3;
      //计算右侧图片的位置 水平范围
      this.Constant.hPosRange.rightSecx[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
      //计算水平图片的位置 竖直范围
      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;
      //计算上侧图片的位置 竖直范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

      //计算上侧图片的位置 水平范围
      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;

      this.rearrange(2);
    },
    //导航条的点击事件
    controlImg(index){
      if(this.imageDatas[index].isCenter){ //是否居中
        this.inverse(index);
      }else{
        this.center(index);
      }
    },
    // 翻转图片
    inverse(index){

      this.imageDatas[index].isInverse = !this.imageDatas[index].isInverse;

    },
    //点击图片 图片居中
    center(index){
      if(this.imageDatas[index].isCenter){
        this.inverse(index);
      }else{
        this.rearrange(index);
      }
    },
    //重新排序的方法
    rearrange(centerIndex){
      // 初始化所有数据 事所有图片回归未翻转状态
      for(var i=0;i<this.imageDatas.length;i++){
        this.imageDatas[i].isInverse = false;
      }
      var vm = this;
      var imgsArranageArr =  [].concat(JSON.parse(JSON.stringify(this.imageDatas))),
          Constant = this.Constant,
          centerPos = Constant.centerPos,
          hPosRange = Constant.hPosRange,
          vPosRange = Constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecx,
          hPosRangeRightSecX = hPosRange.rightSecx,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,

          imgsArrangeTopArr = [],  //上侧布局图片
          topImgNum = Math.floor(Math.random() * 2),  //一个或者没有

          topImgSpliceIndex = 0,
          imgsArrangeCenter = imgsArranageArr.splice(centerIndex, 1);


      imgsArrangeCenter[0].pos = centerPos  //首先居中 cengterIndex的图片

      imgsArrangeCenter[0].rotate = 0;  //居中的图片centerIndex不需要旋转
      imgsArrangeCenter[0].isCenter = true;  //图片居中

      //取出要布局上侧图片的状态信息
      topImgSpliceIndex = Math.ceil(Math.random() * (imgsArranageArr.length - topImgNum));
      imgsArrangeTopArr = imgsArranageArr.splice(topImgSpliceIndex, topImgNum);

      //布局位于上侧的图片
      imgsArrangeTopArr.forEach(function (v, index) {
        imgsArrangeTopArr[0].pos = {
          top: vm.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])+'px',
          left: vm.getRangeRandom(vPosRangeX[0], vPosRangeX[1])+'px',
        };
        imgsArrangeTopArr[0].rotate = vm.get30DegRandom()+'deg';
        imgsArrangeTopArr[0].isCenter = false;
      })


      //布局左右两侧的图片
      for (var i = 0, k = imgsArranageArr.length / 2; i < imgsArranageArr.length; i++) {
        var hPosRangeLOrR = null;

        //前半部分左边 右半部分右边
        if (i < k) {
          hPosRangeLOrR = hPosRangeLeftSecX;
        } else {
          hPosRangeLOrR = hPosRangeRightSecX;
        }


        imgsArranageArr[i].pos = {
          top: vm.getRangeRandom(hPosRangeY[0], hPosRangeY[1])+'px',
          left: vm.getRangeRandom(hPosRangeLOrR[0], hPosRangeLOrR[1])+'px',
        };
        imgsArranageArr[i].rotate = vm.get30DegRandom()+'deg';
        imgsArranageArr[i].isCenter = false;
      }

      //把截取出来的布局上侧以及中心的图片 放回去 还原整个图片数组
      if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        imgsArranageArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      imgsArranageArr.splice(centerIndex, 0, imgsArrangeCenter[0]);

      this.imageDatas = imgsArranageArr;

    },
    // 获取区间内随机值
    getRangeRandom(low, high){
      return Math.ceil(Math.random() * (high - low) + low);
    },
    // 获取0-30度之间任意正负值
    get30DegRandom(){
      return ((Math.random() > 0.5 ? '':'-')+ Math.ceil(Math.random()*30));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.stage{
  position: relative;
  width: 100%;
  /*height: 680px; */
  height: 100%;
}
.img-src{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ddd;
  perspective: 1800px;
}
.controller-nav{
  position: absolute;
  left: 0;
  height: 4%;;
  bottom: 2.5rem;
  z-index: 101;
  width: 100%;
  text-align: center;
}
</style>
