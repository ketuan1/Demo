// tinh gia tri bieu thuc vd: a = 1/n + 2/n + 3/n ..+n/n

function total() {
    var tong = 0;
    var n = parseInt(prompt("Enter number can tinh: "));
    if(n <= 0) {
        alert("ban phai nhap so lon hon 0")
    } else {
        for(var i = 1; i <= n; i++) {
            tong += (1/i);
        }
        document.write("tong gia tri cua bieu thuc la: " + tong)
    }
}

total();