
var a=[];
 init();

 function init(){
      document.getElementById("tagtext").innerHTML=null;
      while(a.length>10){
        a.shift();
      }
      for(var j=0;j<a.length;j++){
        var node=document.createElement("button");
        node.className="data";
        node.type="button";
        node.name="button";
        var nodtext=document.createTextNode(a[j]);
        node.appendChild(nodtext);
        document.getElementById("tagtext").appendChild(node);
        node.onmouseover=function(){
          this.innerHTML="删除"+this.innerHTML;
          this.style.backgroundColor="red"
        }
        node.onmouseout=function(){
          var m=this.innerHTML.replace("删除","")
          this.innerHTML=m;
          this.style.backgroundColor="blue";
        }
        node.onclick=function(){
          delbtn(this.innerHTML);
        }
      }
    }
function delbtn(m){
  for(var i=0;i<a.length;i++){
    var n=m.replace("删除","")
    if(a[i]==n){
      for(var k=i;k<a.length-1;k++){
        a[k]=a[k+1];
      }
      a.pop();
      break;
    }
  }
  init();
}
document.getElementById("tag").onkeydown=function(event){
  var e = event || window.event;
    if(e.keyCode==13||e.keyCode==188||e.keyCode==32){
      a.push(document.getElementById("tag").value.trim());
      document.getElementById("tag").value=null;
      init();
    }

}
//用于消除逗号
document.getElementById("tag").oninput=function(){
  if(document.getElementById("tag").value.trim()==",")
  {
    document.getElementById("tag").value=null;
  }
}
var b=[];
document.getElementById("interest").onclick=function(){
  var reg=/,|(\n)|\\|\s+/g;

  var array=document.getElementById("textvalue").value.trim().replace(reg,' ').split(' ');
  for(var i=0;i<array.length;i++)
  {   var bool=true;
      for(var r=0;r<b.length;r++){
        if(b[r]==array[i]){
          bool=false;
          break;
        }
      }
      if(bool==true)
      {
          var m=b.push(array[i]);
      }
  }
      initb();
}
function initb(){
  document.getElementById("interestext").innerHTML=null;
  while(b.length>10){
    b.shift();
  }
  for(var u=0;u<b.length;u++){
    var node=document.createElement("div");
    node.className="data";
    var nodtext=document.createTextNode(b[u]);
    node.appendChild(nodtext);
    document.getElementById("interestext").appendChild(node);
  }
}
