import React ,{Component} from 'react';
import ReactDOM from 'react-dom';


class Img extends Component{
  constructor(props) {
    super(props);
    this.state={
      isHover:false //isHover表示是否被鼠标悬停
    };

    //事件绑定
    this.handleMouseEnter=this.handleMouseEnter.bind(this);
    this.handleMouseLeave=this.handleMouseLeave.bind(this);
  }


//获得第n张图片第frame帧的样式
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
    return (
      <img src={this.props.superProps.sources[this.props.n]}
      style={style} onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}/>
    )
  }


//鼠标事件处理函数
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

export {Img};
