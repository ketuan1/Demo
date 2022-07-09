//tính tổng các số lẻ trong mảng
var mang1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17, 18, 19, 20];
 
// Gọi hàm tính tổng số lẻ


function tonga(mang1) {
    var tong = 0;
    for(var i = 0; i < mang1.length; i++) {
        if(mang1[i] % 2 != 0) {
            tong += mang1[i];
        }
    }
    document.write("tong so le la " + tong);

}
tonga(mang1);