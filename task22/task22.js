
    var divList=[]
    var timer=null;
    var btn=document.getElementsByTagName("button");
    var treeBoot=document.getElementsByClassName("root")[0];

  btn[0].onclick=function(){
      reset();
        preOrder(treeBoot);
        changeColor();
      }
      btn[1].onclick=function() {
        reset();
          inOrder(treeBoot);
          changeColor();
      }
      btn[2].onclick=function() {
        reset();
          postOrder(treeBoot);
          changeColor();
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
function preOrder(node){
  if(!(node==null)){
    divList.push(node);
    preOrder(node.firstElementChild)
    preOrder(node.lastElementChild)
  }
}
  function inOrder(node){
    if(!(node==null)){
      inOrder(node.firstElementChild)
      divList.push(node);
      inOrder(node.lastElementChild)
    }
  }
    function postOrder(node){
      if(!(node==null)){

        postOrder(node.firstElementChild)
        postOrder(node.lastElementChild)
        divList.push(node);
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
