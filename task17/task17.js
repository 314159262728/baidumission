/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
 var color=["#FF4500","#CD00CD","#A0522D","#9400D3"]
function renderChart(chartData) {
  document.getElementById("aqi-chart-wrap").innerHTML=null;
    for(var daydiv in chartData){
      var rect=document.createElement("div");
      rect.className="rect";
      rect.title=daydiv+"空气质量:"+chartData[daydiv];
      rect.style.height=chartData[daydiv];
      if(pageState.nowGraTime=="day")
      {
        rect.style.width='5px';
        rect.style.backgroundColor=color[Math.floor(Math.random()*4)];
      }
      if(pageState.nowGraTime=="week")
      {
        rect.style.width='10px';
      }
      if(pageState.nowGraTime=="month")
      {
        rect.style.width='20px';
      }
  document.getElementById("aqi-chart-wrap").appendChild(rect);
      rect.onmouseover=function(){
        var show=document.getElementById("show");
       document.getElementById("show").innerHTML=this.title;
       //alert(document.getElementById("show").innerHTML);
       show.style.visibility="visible";
       show.style.left=event.clientX;
       show.style.top=event.clientY-20;
      // //隐藏
      rect.onmouseout=function(){
         document.getElementById("show").style.visibility="hidden";
                    };
}

}
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var rado=document.getElementsByName("gra-time");
  var radovalue=null;
  for(var i=0;i<3;i++){
    if(rado[i].checked==true)
    radovalue=rado[i].value;
  }
  // 设置对应数据

  pageState.nowGraTime=radovalue;
  // 调用图表渲染函数
  var chart=initAqiChartData();

  renderChart(chart);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  var sel=document.getElementById("city-select");
  var selectvalue=sel.options[sel.selectedIndex].innerHTML;

  // 设置对应数据
  pageState.nowSelectCity=selectvalue;
  // 调用图表渲染函数
  //renderChart();
  var chart=initAqiChartData();
  renderChart(chart);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var iput=document.getElementsByTagName("input");
  for(var j=0;j<iput.length;j++)
  {
    if(iput[j].type="radio"){
      iput[j].onclick=function(){
        graTimeChange();
      }
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
      for(key in aqiSourceData){
      var opt=document.createElement("option");
      var optext=document.createTextNode(key);
      opt.appendChild(optext);
      document.getElementById("city-select").appendChild(opt);
    }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
      var selt=document.getElementById("city-select");
      selt.onchange=function(){
        citySelectChange();
      }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  chartData={};
  switch(pageState.nowGraTime){
      case "day":
            for(var sekd in aqiSourceData[pageState.nowSelectCity])
            {
              chartData[sekd]=aqiSourceData[pageState.nowSelectCity][sekd];
            }
            break;
      case "week":
            var m=5;
            var sum={};
            var ssum=0;
            var n=0;
            var t=0;
            for(var sekw in aqiSourceData[pageState.nowSelectCity])
            {
              m=m+1;
              sum[t]=aqiSourceData[pageState.nowSelectCity][sekw];
              ssum=ssum+sum[t];
              t++;
              if(m==7){
                n++;
                m=0;
                chartData["第"+n+"周"]=parseInt(ssum/t);
                ssum=0;
                t=0;
              }

            }
            break;
      case "month":
              var i=0;
              var sum={};
              var ssum=0;
              var n=1;
              var t=0;
              var mon=[31,29,31,30,31,30,31,31,30,31,30,31];
              for(var sekm in aqiSourceData[pageState.nowSelectCity])
              {
                sum[t]=aqiSourceData[pageState.nowSelectCity][sekm];
                ssum=ssum+sum[t];
                t++;
                if(t==mon[i]){
                  chartData[i+1+"月份"]=parseInt(ssum/t);
                  ssum=0;
                  t=0;
                  i++;
                }
              }
              break;
  }
return chartData;

  // 处理好的数据存到 chartData 中

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  var chart=initAqiChartData();
  renderChart(chart);
}

init();
