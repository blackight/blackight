import  "./decoration.css";
import $ from "jquery";
window.$=$;
window.jQuery=$;
export default $;
import "bootstrap/dist/css/bootstrap.css";

//api变量
var timespace=new Array();
var timechange=new Array();

function Carousel(jCarousel,timespace=5000,timechange=500){
  this.self=jCarousel;
  let storeOfContents=jCarousel.children(".content");
  this.contents=new Array();
  for (var i = 0; i < storeOfContents.length; i++) {
    this.contents[i]=storeOfContents.eq(i);
  }
  this.numOfContents=this.contents.length;
  this.timespace=timespace;
  this.timechange=timechange;
  this.spaceY=(jCarousel.height()-this.contents[this.numOfContents-1].height())*100/jCarousel.height()/(this.numOfContents-1);
  this.spaceX=(jCarousel.width()-this.contents[this.numOfContents-1].width())*100/jCarousel.width()/(this.numOfContents-1);
  //静态载入网页
  this.reload=()=>{
    for (var j = 0; j < this.numOfContents; j++) {
      this.contents[j].css("left",j*this.spaceX+"%");
      this.contents[j].css("top",j*this.spaceY+"%");
      this.contents[j].css("zIndex",j+"");
    }
  };
  this.reload();
  //轮播一次
  this.divChanges =() => {
    for (var j = 0; j <this.numOfContents; j++) {
       if(j==this.numOfContents-1){
         let a=this.contents[j];
         a.animate( {left: "100%",zIndex:"0"},this.timechange,()=>{
           a.css({"top":"0%","left":"0%","display":"none"});
           a.fadeIn(0.382*this.timechange);
         });
         let temp=this.contents[j];
         this.contents.splice(0,0,temp);
         this.contents.pop();
       }else {
         this.contents[j].animate( {left: (j+1)*this.spaceX+"%",top: (j+1)*this.spaceY+"%",zIndex:"+=1"},this.timechange);
       }
    }
  }
  //计时器
  this.timer=window.setInterval(this.divChanges,this.timespace);
  this.setTouchEventsListener=()=>{
    //touch events
    let startX,startY,endX,endY;
    this.self.bind('touchstart',(e)=>{
          startX = e.originalEvent.changedTouches[0].pageX,
          startY = e.originalEvent.changedTouches[0].pageY;
          e.preventDefault();
    });
    this.self.bind('touchend',(e)=>{
          endX = e.originalEvent.changedTouches[0].pageX,
          endY = e.originalEvent.changedTouches[0].pageY;
          let distanceX = endX-startX;
          let distanceY = endY-startY;
          e.preventDefault();
          clearInterval(this.timer);
          this.timer=setInterval(this.divChanges,this.timespace);
          if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
              this.divChanges();
          }
    });
  }
  this.setCarouselListener=()=>{
    $("document").ready(()=>{
      let temp1;
      let temp2;
      this.self.mousemove((e)=>{
        let a=$(e.target).parents(".content").eq(0);
        if(a.length &&temp2!==a){
          if(temp2){
            temp2.css('z-index',temp1+"");
          }
          temp1=a.css('z-index');
          a.css('z-index',"9999");
          temp2=a;
        }
      })
      //hover events
      this.self.hover(()=>{
        clearInterval(this.timer);
      },()=>{
        this.reload();
        this.timer=setInterval(this.divChanges,this.timespace);
        temp1=undefined;
        temp2=undefined;
      });
      this.setTouchEventsListener();
    });
  };
  this.setCarouselListener();
}

var carousels=new Array();
var a=$(".carousel");
for (var i = 0; i < a.length; i++) {
  let x=a.eq(i).attr("data-timespace");
  if(x!==undefined){
    x=parseInt(x);
  }
  let y=a.eq(i).attr("data-timechange");
  if(y!==undefined){
    y=parseInt(y);
  }
  carousels[i]=new Carousel(a.eq(i),x,y);
}
