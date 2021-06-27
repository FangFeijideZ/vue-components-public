function displayDate(val) {
  console.log(val);
  console.log(new Date('2021-06-23'));
  document.getElementById("demo").innerHTML = new Date();
}

function changeImage() {
    element = document.getElementById('myimage');
    // console.log(element.src.match('tool'));
    console.log(element);
    if (element.src.match('tool')) {
      element.src="../element-ui/img/24sdhb.png";
    } else {
      element.src="./img/tool.png";
    }
}
var carname="Volvo";
var carname;
var cars=new Array("{Saab: 123}","Volvo","BMW");
console.log(this);
console.log(cars);
console.log(carname);
console.log(16 + "Volvo");
console.log(objectName);

function myfunction(){
  document.write("使用函数来执行doucment.write，即在文档加载后再执行这个操作，会实现文档覆盖");
}
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落。</p>");