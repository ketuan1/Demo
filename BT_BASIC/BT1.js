//Viết chương trình cộng hai só
//function cộng hai số

function total(a, b) {
   // return a+b; => have return and no return
   //get infotion form user
//user function prompt de user enter vao
var a = parseInt(prompt("Enter number a"));
var b = parseInt(prompt("Enter number b"));

//Tinh Total
var tong = total(a,b) 

//scan ra mang hinh
//12console.log("Total 2 number : " + a + " + " + b + " = " + tong);
document.write("Total 2 number : " + a + " + " + b + " = " + tong);
}

total();


