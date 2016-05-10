(function(){
  require('styles/index.css');
  var React = require('React');
  var ReactDom = require('react-dom');

  var iamgeDatas = require('../sources/imageDatas.json');

  iamgeDatas = (function (iamgeDatas){
    iamgeDatas.forEach(function(element,index){
      element.imageURL = element.imgSrc;
    });
  })(iamgeDatas);

  var GalleryByReactApp = React.createClass({
    render:function(){
      return React.createElement('section',{className:'stage'},
        React.createElement('section',{className:'img-sec'}),
        React.createElement('nav',{className:'controller-nav'})
      );
    }
  });

  ReactDom.render(React.createElement(GalleryByReactApp,null),document.getElementById('app'));
})();
