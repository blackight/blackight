function save() {
  if(typeof (Storage)!=="undefined"){
    var temp=new student();
    var a=true;
    if(localStorage.getItem(document.getElementById('number').value)!==null){
      a=false;
    }
    localStorage.setItem(document.getElementById('number').value,JSON.stringify(temp));
    if(a){
      alert("储存成功");
    }else alert("更改成功");
  }else {
    alert("你不支持本地储存");
  }
}

function delete1() {
  var temp;
  if(typeof (Storage)!=="undefined"){
    temp=localStorage.getItem(document.getElementById('number').value);
    if(temp!==null){
      localStorage.removeItem(document.getElementById('number').value);
      alert("删除成功");
    }else{
      alert("查无此人");
    }
  }else {
    alert("你不支持本地储存");
  }
}

function find() {
  var temp;
  if(typeof (Storage)!=="undefined"){
    temp=JSON.parse(localStorage.getItem(document.getElementById('number').value));
    if(temp!==null){
      //alert("姓名： "+temp.name+"\n性别： "+temp.sex+"\n学号： "+temp.number+"\n年级： "+temp.grade+"\n专业： "+temp.speciality);
      document.getElementById('name').value=temp.name;
      document.getElementById('sex').value=temp.sex;
      document.getElementById('number').value=temp.number;
      document.getElementById('grade').value=temp.grade;
      document.getElementById('speciality').value=temp.speciality;
    }else{
      alert("查无此人");
    }
  }else {
    alert("你不支持本地储存");
  }
}

function student() {
    this.name=document.getElementById('name').value;
    this.sex=document.getElementById('sex').value;
    this.number=document.getElementById('number').value;
    this.grade=document.getElementById('grade').value;
    this.speciality=document.getElementById('speciality').value;
}
