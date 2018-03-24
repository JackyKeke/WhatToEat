// 底部
var footer = document.getElementById("myfoot");
var content = document.getElementById("mycontent");
var iconli = footer.getElementsByTagName("span");
// var mainli = content.getElementsByTagName("div");
var mainli = content.children;


// 首页
var jiaBtn = document.getElementById("jiaBtn");
var yiBtn = document.getElementById("yiBtn");
var jiaImg = document.getElementById("jiaImg");
var yiImg = document.getElementById("yiImg");
var onceBtn = document.getElementById("onceBtn");
// alert(mainli.length);

// 吃——页面
var add = document.getElementById("add");
var seleInput = document.getElementById("seleInput");
var foodlist = document.getElementById("foodlist");
var foodlists = foodlist.children[0].children;
var seleFoodBtn = document.getElementById("seleFoodBtn");
var seleFoodContent = document.getElementById("seleFoodContent");

var h = document.body.clientHeight - 300;
console.log(h);
foodlist.style.height = h + "px";
// foodlist.style.height = "300px";



for(var i = 0; i < iconli.length; i++){
    iconli[i].index = i;
    iconli[i].onclick = function(){

        for(var i = 0; i < iconli.length; i++){

            iconli[i].children[0].style.display = "none";
            iconli[i].children[1].style.display = "block";
            mainli[i].style.display = "none";
        }

        this.children[0].style.display = "block";
        this.children[1].style.display = "none";
        mainli[this.index].style.display = "block";
    }
}

jiaBtn.onclick = function(){
    jiaImg.style.display = "block";
    var a = Math.floor(Math.random()*3);
    console.log(a);
    if(a == 0){
        jiaImg.style.backgroundImage = "url(image/stone.png)";
        console.log("石头");
    }else if(a == 1){
        jiaImg.style.backgroundImage = "url(image/scissors.png)";
        console.log("剪刀");
    }else{
        jiaImg.style.backgroundImage = "url(image/cloth.png)";
        console.log("布");
    }

}

yiBtn.onclick = function(){
    yiImg.style.display = "block";
    var a = Math.floor(Math.random()*3);
    console.log(a);
    if(a == 0){
        yiImg.style.backgroundImage = "url(image/stone.png)";
        console.log("石头");
    }else if(a == 1){
        yiImg.style.backgroundImage = "url(image/scissors.png)";
        console.log("剪刀");
    }else{
        yiImg.style.backgroundImage = "url(image/cloth.png)";
        console.log("布");
    }

}

onceBtn.onclick = function(){
    jiaImg.style.display = "none";
    yiImg.style.display = "none";
}

// 吃 ---页面 方法


// 从Android获取数据

// 添加菜色
add.onclick = function(){
    // alert(seleInput.value);
    if (seleInput.value != ""){
        var liObj = document.createElement("li");
        liObj.innerHTML = '<span class="selection">'+ seleInput.value +'</span><span class="btnr">删除</span>';
        foodlist.children[0].insertBefore(liObj,foodlists[0]);
        sendmyAddData(seleInput.value);
        seleInput.value = "";

        cancelFood();

    }
}

//foodlists[0].onclick = function(){
//    document.write("8888");}

function cancelFood(){
// 删除菜色
for(var i = 0; i < foodlists.length; i++){
    foodlists[i].index = i;

    foodlists[i].children[1].onclick = function(){
         foodlist.children[0].removeChild(this.parentNode);
        sendmyDeleData(this.parentNode.children[0].innerHTML);
        if(foodlists.length==0) {
           seleFoodContent.style.display = "none";
        }
        console.log("打印删除内容："+ this.parentNode.children[0].innerHTML);
        // console.log(this.parentNode);
    }
}

}






// 选择今天吃什么
seleFoodBtn.onclick = function(){
    var a = Math.floor(Math.random()*foodlists.length);
    seleFoodContent.innerHTML = foodlists[a].children[0].innerHTML;
    seleFoodContent.style.display = "block";
}





// 从Android端传入数组
function showInfoFromJava(msg){

     if(msg != "" ){
    arr = msg.split(',');
     for(var i = 0; i < arr.length; i++){
             var liObj = document.createElement("li");
             liObj.innerHTML = '<span class="selection">'+ arr[i] +'</span><span class="btnr">删除</span>';
             foodlist.children[0].insertBefore(liObj,foodlists[0]);
          }
            cancelFood();
     }

}

// 添加的数据给Android端
function sendmyAddData(addData){
    //调用android程序中的方法，并传递参数

    window.hello.sendAddData(addData);
   // document.write(addData);
}


// 删除的数据给Android端
function sendmyDeleData(deleData){
    //调用android程序中的方法，并传递参数
//    document.write(deleData);
    window.hello.sendDeleData(deleData);


}