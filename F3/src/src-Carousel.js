import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Img} from "./src-Img.js";

class Carousel extends Component{

  constructor(props){
    super(props);

    //assist 对象封装了关于图片位置的一些参数，传入子组件方便子组件确定位置
    this.assist={
      numOfimgs:props.sources.length,
      numOfFramePerChange:Math.round(props.timechange*props.fps/1000),
      sources:props.sources,
      percentage:props.percentage
    };
    this.assist.space=props.percentage/(this.assist.numOfimgs-1)；
    this.assist.spacePerFrame=this.assist.space/this.assist.numOfFramePerChange；
    this.assist.lastSpacePerFrame=(100-props.percentage)/this.assist.numOfFramePerChange；

    this.state={
      frame:0
    };

    //事件绑定
    this.handleTouchEnd=this.handleTouchEnd.bind(this);
    this.handleTouchStart=this.handleTouchStart.bind(this);
  }

  render(){
    return (
      <div style={{position:"relative",
        height:"100%" ,
        width:"100%" ,
        overflow: "hidden",
        padding: "0px"
      }}
      onTouchStart={this.handleTouchStart}
      onTouchEnd={this.handleTouchEnd}>
      {this.props.sources.map((src,index)=>{
        return <Img superProps={this.assist} n={index} frame={this.state.frame}/>;
      })}
      </div>
    )
  }

//Carousel控制子组件进行变换（一次轮播）
  divChange(){
    let timer=setInterval(()=>{
      if(this.assist.numOfFramePerChange-1===this.state.frame) {
        clearInterval(timer);
        let temp=this.props.sources[this.assist.numOfimgs-1];
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

//touch事件处理函数
  handleTouchStart(e){
    e.preventDefault();
    this.xOfTouchStart=e.nativeEvent.targetTouches[0].pageX;
    clearInterval(this.timer);
  }

//touch事件处理函数
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

export {Carousel};
