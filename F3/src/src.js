import React ,{Component} from 'react';
import ReactDOM from 'react-dom';


class Img extends Component{
  constructor(props) {
    super(props);
    this.props.superProps=props.superProps;
    this.state={
      isHover:false
    };
    this.props.source=props.src;
    this.props.n=props.n;
    this.props.frame=props.frame;
    this.handleMouseEnter=this.handleMouseEnter.bind(this);
    this.handleMouseLeave=this.handleMouseLeave.bind(this);
  }

  getStyle(n,frame,isHover){
    let style={
      display:"block",
      height:100-this.props.superProps.percentage+"%",
      width:100-this.props.superProps.percentage+"%",
      position:"absolute",
      top:n*this.props.superProps.space+frame*this.props.superProps.spacePerFrame+"%",
      left:n*this.props.superProps.space+frame*this.props.superProps.spacePerFrame+"%",
      borderRadius: "5px",
      borderColor: "rgba(255, 255, 255, 0.7)",
      borderWidth: "3px",
      borderStyle: "solid",
      boxShadow: "-1px -1px 2px rgba(255, 255, 255, 0.5)",
      zIndex: n+""
    };
    if(this.props.superProps.numOfimgs===this.props.n+1){
      style.top=this.props.superProps.percentage+"%";
      style.left=this.props.superProps.percentage+frame*this.props.superProps.lastSpacePerFrame+"%";
    }
    if(isHover){
      style.zIndex="9999";
    }
    return style;
  }

  render(){
    let style=this.getStyle(this.props.n,this.props.frame,this.state.isHover);
    return <img src={this.props.superProps.sources[this.props.n]} style={style} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>
  }

  handleMouseEnter(e){
    this.setState({
      isHover:true
    });
  }

  handleMouseLeave(e){
    this.setState({
      isHover:false
    });
  }
}


class Carousel extends Component{

  constructor(props){
    super(props);
    this.props.numOfimgs=props.sources.length;
    this.props.fps=props.fps;
    this.props.numOfFramePerChange=Math.round(props.timechange*this.props.fps/1000);
    let spaceTemp=props.percentage/(this.props.numOfimgs-1);
    this.props.spacePerFrame=spaceTemp/this.props.numOfFramePerChange;
    this.props.lastSpacePerFrame=(100-this.props.percentage)/this.props.numOfFramePerChange;
    this.props.timespace=props.timespace;
    this.props.timechange=props.timechange;
    this.props.space=spaceTemp;
    this.handleTouchEnd=this.handleTouchEnd.bind(this);
    this.handleTouchStart=this.handleTouchStart.bind(this);
    this.state={
      frame:0
    };
  }

  render(){
    return (
      <div style={{position:"relative", height:"100%" , width:"100%" ,overflow: "hidden", padding: "0px"}} onTouchStart={this.handleTouchStart}  onTouchEnd={this.handleTouchEnd}>
        {this.props.sources.map((src,index)=>{
          return <Img superProps={this.props} n={index} frame={this.state.frame}/>;
        })}
      </div>
    )
  }

  divChange(){
    let timer=setInterval(()=>{
      if(this.props.numOfFramePerChange-1===this.state.frame) {
        clearInterval(timer);
        let temp=this.props.sources[this.props.numOfimgs-1];
        this.props.sources.splice(0,0,temp);
        this.props.sources.pop();
        this.setState({
            frame:0
        });
      }else{
        this.setState({
          frame:this.state.frame+1
        });
      }
    },1000/this.props.fps);
  }

  componentDidMount(){
    this.timer=setInterval(this.divChange.bind(this),this.props.timespace);
  }

  handleTouchStart(e){
    e.preventDefault();
    this.xOfTouchStart=e.nativeEvent.targetTouches[0].pageX;
    clearInterval(this.timer);
  }

  handleTouchEnd(e){
    e.preventDefault();
    if(e.nativeEvent.changedTouches[0].pageX-this.xOfTouchStart>=50){
      this.divChange();
    }
    this.timer=setInterval(this.divChange.bind(this),this.props.timespace);
  }
}

Carousel.defaultProps = {
  timespace:5000,
  timechange:500,
  percentage:25,
  fps:60
};

ReactDOM.render(<Carousel  fps={60} sources={["./img/01.jpg","./img/02.jpg","./img/03.jpg","./img/04.jpg","./img/05.jpg"]}/>,document.getElementById("main"));










// //api变量
// var timespace=new Array();
// var timechange=new Array();
//
// function Carousel(jCarousel,timespace=5000,timechange=500){
//   this.self=jCarousel;
//   let storeOfContents=jCarousel.children(".content");
//   this.contents=new Array();
//   for (var i = 0; i < storeOfContents.length; i++) {
//     this.contents[i]=storeOfContents.eq(i);
//   }
//   this.numOfContents=this.contents.length;
//   this.timespace=timespace;
//   this.timechange=timechange;
//   this.spaceY=(jCarousel.height()-this.contents[this.numOfContents-1].height())*100/jCarousel.height()/(this.numOfContents-1);
//   this.spaceX=(jCarousel.width()-this.contents[this.numOfContents-1].width())*100/jCarousel.width()/(this.numOfContents-1);
//   //静态载入网页
//   this.reload=()=>{
//     for (var j = 0; j < this.numOfContents; j++) {
//       this.contents[j].css("left",j*this.spaceX+"%");
//       this.contents[j].css("top",j*this.spaceY+"%");
//       this.contents[j].css("zIndex",j+"");
//     }
//   };
//   this.reload();
//   //轮播一次
//   this.divChanges =() => {
//     for (var j = 0; j <this.numOfContents; j++) {
//        if(j==this.numOfContents-1){
//          let a=this.contents[j];
//          a.animate( {left: "100%",zIndex:"0"},this.timechange,()=>{
//            a.css({"top":"0%","left":"0%","display":"none"});
//            a.fadeIn(0.382*this.timechange);
//          });
//          let temp=this.contents[j];
//          this.contents.splice(0,0,temp);
//          this.contents.pop();
//        }else {
//          this.contents[j].animate( {left: (j+1)*this.spaceX+"%",top: (j+1)*this.spaceY+"%",zIndex:"+=1"},this.timechange);
//        }
//     }
//   }
//   //计时器
//   this.timer=window.setInterval(this.divChanges,this.timespace);
//   this.setTouchEventsListener=()=>{
//     //touch events
//     let startX,startY,endX,endY;
//     this.self.bind('touchstart',(e)=>{
//           startX = e.originalEvent.changedTouches[0].pageX,
//           startY = e.originalEvent.changedTouches[0].pageY;
//           e.preventDefault();
//     });
//     this.self.bind('touchend',(e)=>{
//           endX = e.originalEvent.changedTouches[0].pageX,
//           endY = e.originalEvent.changedTouches[0].pageY;
//           let distanceX = endX-startX;
//           let distanceY = endY-startY;
//           e.preventDefault();
//           clearInterval(this.timer);
//           this.timer=setInterval(this.divChanges,this.timespace);
//           if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
//               this.divChanges();
//           }
//     });
//   }
//   this.setCarouselListener=()=>{
//     $("document").ready(()=>{
//       let temp1;
//       let temp2;
//       this.self.mousemove((e)=>{
//         let a=$(e.target).parents(".content").eq(0);
//         if(a.length &&temp2!==a){
//           if(temp2){
//             temp2.css('z-index',temp1+"");
//           }
//           temp1=a.css('z-index');
//           a.css('z-index',"9999");
//           temp2=a;
//         }
//       })
//       //hover events
//       this.self.hover(()=>{
//         clearInterval(this.timer);
//       },()=>{
//         this.reload();
//         this.timer=setInterval(this.divChanges,this.timespace);
//         temp1=undefined;
//         temp2=undefined;
//       });
//       this.setTouchEventsListener();
//     });
//   };
//   this.setCarouselListener();
// }
//
// var carousels=new Array();
// var a=$(".carousel");
// for (var i = 0; i < a.length; i++) {
//   let x=a.eq(i).attr("data-timespace");
//   if(x!==undefined){
//     x=parseInt(x);
//   }
//   let y=a.eq(i).attr("data-timechange");
//   if(y!==undefined){
//     y=parseInt(y);
//   }
//   carousels[i]=new Carousel(a.eq(i),x,y);
// }
