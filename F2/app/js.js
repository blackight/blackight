require("!style-loader!css-loader!./css.css");

function getNum(obj ,str){
   return parseInt(window.getComputedStyle(obj)[str]);
}

var timespace=5000;
var timechange=500;
var startX=0;
var startY=0;

var carousels=document.getElementsByClassName("carousel");
for (var i = 0; i < carousels.length; i++) {
  var contents=carousels[i].getElementsByClassName("content");
  if(contents[0]){
    var spacex=(getNum(carousels[i],"width")-getNum(contents[0],"width"))/(contents.length-1);
    var spacey=(getNum(carousels[i],"height")-getNum(contents[0],"height"))/(contents.length-1);
  }
  for (var j = 0; j < contents.length; j++) {
    contents[j].style.left=(j*spacex)/getNum(carousels[i],"width")*100+"%";
    contents[j].style.top=(j*spacey)/getNum(carousels[i],"height")*100+"%";
    contents[j].style.zIndex=j;
    contents[j].addEventListener('touchstart',
    function (e) {
      startX=e.targetTouches[0].pageX;
      startY=e.targetTouches[0].pageY;
    });
    contents[j].addEventListener('touchend',
    function (e) {
      if(e.changedTouches[0].pageX-startX>50||e.changedTouches[0].pageY-startY>50){
        divChanges(timechange);
      }
    });
  }
}

var jCarousels=$(".carousel");
var jContents=new Array();
for (var i = 0; i < jCarousels.length; i++) {
  let a=jCarousels.eq(i).children(".content");
  jContents[i]=new Array();
  for (var j = 0; j < a.length; j++) {
    jContents[i][j]=a.eq(j);
  }
}

$("document").ready(function () {
  let temp;
  jCarousels.children(".content").hover(function(){
    temp=$(this).css("z-index");
    $(this).css('z-index',"9999");
    clearInterval(timer);
  },function(){
    $(this).css('z-index',temp);
    timer=setInterval(startAChange,timespace);
  })
})


function divChanges(time){
  for (var i = 0; i < jContents.length; i++) {
    let spaceY=0,spaceX=0;
    // spaceY=parseInt(jContents[i][1].css("top"))*100/jCarousels.eq(i).height();
    spaceY=(jCarousels.eq(i).height()-jContents[i][jContents[i].length-1].height())*100/jCarousels.eq(i).height()/(jContents[i].length-1);
    spaceX=(jCarousels.eq(i).width()-jContents[i][jContents[i].length-1].width())*100/jCarousels.eq(i).width()/(jContents[i].length-1);
    // spaceX=parseInt(jContents[i][1].css("left"))*100/jCarousels.eq(i).width();
    for (var j = 0; j < jContents[i].length; j++) {
       if(j==jContents[i].length-1){
         let a=jContents[i][j];
         a.animate( {left: "100%",zIndex:"0"},time,function(){
           a.css({"top":"0%","left":"0%","display":"none"});
           a.fadeIn(0.7*time);
         });
         let temp=jContents[i][j];
         jContents[i].splice(0,0,temp);
         jContents[i].pop();
       }else {
         jContents[i][j].animate( {left: (j+1)*spaceX+"%",top: (j+1)*spaceY+"%",zIndex:"+=1"},time);
       }
    }
  }
}

var timer=setInterval(startAChange,timespace);

function startAChange(){
  divChanges(timechange);
}
