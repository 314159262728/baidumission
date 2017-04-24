
    var divList=[]
    var timer=null;
    var btn=document.getElementsByTagName("button");
    var treeBoot=document.getElementsByClassName("root")[0];

      btn[0].onclick=function(){
        reset();
        depthOrder(treeBoot);
        changeColor();
      }
      btn[1].onclick=function() {
          reset();
          breadthOrder(treeBoot);
          changeColor();
      }
      btn[2].onclick=function() {
        reset();
          depthOrder(treeBoot);
          searchColor();
      }
      btn[3].onclick=function(){
        reset();
          breadthOrder(treeBoot);
          searchColor();
      }
function  reset(){
  divList=[];
  clearInterval(timer);
  divs=document.getElementsByTagName("div");

  for(var j=0;j<divs.length;j++)
  {
    divs[j].style.backgroundColor="white";
  }
}
function depthOrder(node){
  if(!(node==null))
  {
    divList.push(node);
      for(var i=0;i<node.childElementCount;i++){
        depthOrder(node.children[i]);
      }
  }
}
function breadthOrder(node){
  var m=divList.length;
  divList.push(node);
  var n=divList.length;
  bianli(m,n);


}
var v=0;
function bianli(m,n){
  var r=n;
  for( t=m;t<n;t++){
      for(var j=0;j<divList[t].childElementCount;j++){
            divList.push(divList[t].children[j]);
      }
  }
   var f=divList.length;
   v++;
    if(v<4){
       bianli(r,f);
    }
    else{
      v=0;
      return 0;
    }
}


function changeColor() {
	var i = 0;
	divList[i].style.backgroundColor = 'blue'
	timer = setInterval(function (argument) {
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'blue';
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500)
}
function getNodeText(){

}
 function searchColor(){
   var i = 0;
   var l=null;
 	divList[i].style.backgroundColor = 'blue'
  var p=document.getElementById("text").value.trim();
 	timer = setInterval(function (argument) {
 		i++;
    l=divList[i].firstChild.nodeValue.trim();
      if(l==p){
        clearInterval(timer);
          divList[i].style.backgroundColor = 'rgb(255,0,255)';
          divList[i-1].style.backgroundColor = '#fff';
      }
      else if (i < divList.length-1) {
        divList[i-1].style.backgroundColor = '#fff';
        divList[i].style.backgroundColor = 'blue';
      }
      else{
          clearInterval(timer);
          divList[divList.length-2].style.backgroundColor = '#fff';
          alert("未找到目标值");
      }

      },500)
}
document.getElementById("delete").onclick=function(){
  var s=document.getElementsByTagName("div");
  for(var t=0;t<s.length;t++){
    if(s[t].style.backgroundColor=="rgb(255, 0, 255)"){
      s[t].parentNode.removeChild(s[t]);
    }
  }
}

    $("div").click(function(e){
      $("div").css("backgroundColor","white")
      $(this).css("backgroundColor","#F0F")
      e.stopPropagation();
  });
  document.getElementById("add").onclick=function(){
    var txt=document.getElementsByTagName("textarea")[0].value.trim();
    var node=document.createElement("div")
    var txtnode=document.createTextNode(txt);
    node.appendChild(txtnode)
    var s=document.getElementsByTagName("div");
    for(var t=0;t<s.length;t++){
      if(s[t].style.backgroundColor=="rgb(255, 0, 255)"){
        s[t].appendChild(node);
        s[t].style.backgroundColor="white";
      }
    }
  }
