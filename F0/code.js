function seepsd(){
  if(document.getElementById("psd").type==="text"){
    document.getElementById("psd").type="password"
  }else if(document.getElementById("psd").type==="password"){
    document.getElementById("psd").type="text";
  };
}
