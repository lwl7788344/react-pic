(function(){
  require('styles/index.css');
  var React = require('react');
  var ReactDom = require('react-dom');

// 图片文件处理
  var iamgeDatas = require('../sources/imageDatas.json');
  iamgeDatas = (function (iamgeDatas){
    iamgeDatas.forEach(function(element,index){
      element.imageURL = 'images/' + element.imgSrc;
    });
    return iamgeDatas;
  })(iamgeDatas);
  // 获取 low - high 之间的随机值
  function getRangeRandom(low,high){
    return Math.ceil(Math.random() * (high - low) + low);
  }
  // 获取 0 - 30 之间的随机正负值
  function get30DegRandom(){
    return (Math.random() > 0.5 ? '' : '-') + (Math.random() * 30) + 'deg';
  }

  // 单个图片控件
  var ImgFigure = React.createClass({
    handleClick:function(event){
      event.stopPropagation();
      event.preventDefault();
      // 判断是否居中
      if(this.props.arrange.isCenter){
        // 调用反转
        this.props.inverse();
      }else{
        this.props.center();
      }

    },
    render:function(){
      var styleObj = {};
      // 如果props属性中指定了这张图片的位置,则使用
      if(this.props.arrange.pos){
        styleObj = this.props.arrange.pos;
      }
      // 设置旋转角度
      if(this.props.arrange.rotate){
        (['-moz-','-ms-','-webkit-','']).forEach(function(element){
          styleObj[element+'transform'] = 'rotate('+this.props.arrange.rotate+')';
        }.bind(this));
      }

      // 居中显示层级调高
      if(this.props.arrange.isCenter){
        styleObj.zIndex = 11;
      }

      // 控件图片是否反转
      var imgFigureClassName = 'img-figure';
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

      return React.createElement('figure',{className:imgFigureClassName,style:styleObj,onClick:this.handleClick},
        React.createElement('img',{src:this.props.data.imageURL,alt:this.props.data.desc}),
        React.createElement('figcaption',null,
          React.createElement('h2',{className:'img-title'},this.props.data.caption),
          React.createElement('div',{className:'img-back'},'ceshit')
        )
      );
    }
  });

  // 控制组件
  var ControllerUnit = React.createClass({
      handleClick:function(event){
        event.stopPropagation();
        event.preventDefault();
      },
      render:function(){
        return React.createElement('span',{className:'controller-unit',onClick:this.handleClick});
      }
  });

// 舞台控件
  var GalleryByReactApp = React.createClass({
    // 边界常量
    Constant:{
      centerPos:{
        left:0,
        top:0
      },
      hPosRange:{// 水平方向的取值范围
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{// 垂直方向的取值范围
        x:[0,0],
        topY:[0,0]
      }
    },
    // 图片反转
    inverse:function(index){
        return function(){
          var imgsArrangeArr = this.state.imgsArrangeArr;
          imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

          this.setState({
            imgsArrangeArr:imgsArrangeArr
          });
        }.bind(this);
    },
    // 居中
    center:function(index){
      return function(){
        this.rearrange(index);
      }.bind(this);
    },
    // 重新布局图片,centerIndex 居中图片的下标
    rearrange:function(centerIndex){
      var imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      // 头部图片
      imgsArrangeTopArr = [],
      // 取0-1张头部图片
      topImgNum = Math.floor(Math.random() * 2),
      topImgSpliceIndex = 0,
      // 居中图片
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
      // // 居中图片的位置信息
      // imgsArrangeCenterArr[0].pos = centerPos;
      // // 居中图片不需要旋转
      // imgsArrangeCenterArr[0].rotate = 0;
      // // 设置图片居中
      // imgsArrangeCenterArr[0].isCenter = true;
      imgsArrangeCenterArr[0] = {
        pos:centerPos,
        rotate:0,
        isInverse:false,
        isCenter:true
      };

      // 取出要布局上侧的图片的状态信息
      topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,1);

      imgsArrangeTopArr.forEach(function(element,index){
        element = {
          pos:{
            top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
            left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
          },
          rotate:get30DegRandom(),
          isInverse:false,
          isCenter:false
        };

      });

      // 左右图片的布局
      for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
        var hPosRangeLORX = null;
        // 前半左侧,后半右侧
        if(i < k){
          hPosRangeLORX = hPosRangeLeftSecX;
        }else{
          hPosRangeLORX = hPosRangeRightSecX;
        }
        imgsArrangeArr[i] = {
          pos:{
            top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
            left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
          },
          rotate:get30DegRandom(),

          isCenter:false
        };
      }
      // 把头部图片放回数组
      if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
      }
      // 把居中图片放回数组
      imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

      // 状态回写,重新渲染
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
    },
    // 初始化每个图片的状态
    getInitialState:function(){
      return {
        imgsArrangeArr:[
          // {
          //   pos:{
          //     left:'0',
          //     top:'0'
          //   },
          //   rotate:0 // 旋转角度
          //  isInverse:false // 图片正反面
          //  isCenter:false // 是否居中
          // }
        ]
      };
    },
    // 组件加载以后,为每张图片计算位置
    componentDidMount:function(){
      // 舞台大小
      var stageDom = ReactDom.findDOMNode(this.refs.stage),
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

      // 单个图片大小
      var imgFigureDom = ReactDom.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDom.scrollWidth,
        imgH = imgFigureDom.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);
      // 计算中心图片的位置点
      this.Constant.centerPos = {
        left : halfStageW - halfImgW,
        top : halfStageH - halfImgH
      };
      // 计算左侧,右侧区域图片排布位置的范围
      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;
      // 计算上侧区域图片排布位置的取值范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;

      // 计算图片位置
      this.rearrange(0);
    },
    render:function(){
      // 控制器/图片组件列表
      var controllerUnits = [],
        imgFigures = [];
      // 图片组件
      iamgeDatas.forEach(function(element,index){
        // 初始化图片位置
        if(!this.state.imgsArrangeArr[index]){
          this.state.imgsArrangeArr[index] = {
            pos:{
              left:0,
              top:0
            },
            rotate:0,
            isInverse:false,
            isCenter:false
          };
        }
        // 创建图片组件列表
        imgFigures.push(React.createElement(ImgFigure,{data:element,ref:'imgFigure'+index,key:'imgFigure'+index,arrange:this.state.imgsArrangeArr[index],inverse:this.inverse(index),center:this.center(index)}));//<ImgFigure data={element}/>
        // 控制器
        controllerUnits.push(React.createElement(ControllerUnit,{key:'ctrl'+index}));
      }.bind(this));
      return React.createElement('section',{className:'stage',ref:'stage'},
        React.createElement('section',{className:'img-sec'},imgFigures),
        React.createElement('nav',{className:'controller-nav'},controllerUnits)
      );
    }
  });

  ReactDom.render(React.createElement(GalleryByReactApp,null),document.getElementById('app'));
})();
