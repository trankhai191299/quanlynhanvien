/***
 *  1. Thêm nhân viên
 *  2. Show nhân viên
 *  - Xếp loại nhân viên
 *  - Tính lương cho từng chức vụ
 *  3. Xóa nhân viên
 *  4. Cập nhật nhân viên
 *  5. Tìm theo loại + hiển thị
 *  6. Validation
 */
//<------------------------------------------------->//
document.getElementById("btnThem").onclick = function () {
  document.getElementById("btnThemNV").style.display = "block";
  resetForm();
};
var listNV = [];
//thêm nhân viên
function themNhanVien() {
  var taikhoan = document.getElementById("tknv").value;
  var hoten = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matkhau = document.getElementById("password").value;
  var ngaylam = document.getElementById("datepicker").value;
  var luong = +document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLm = +document.getElementById("gioLam").value;

  var foundIndex = findTK(taikhoan);
  if (foundIndex === -1) {
    alert("Tài khoản không hợp lệ");
    return;
  }

  var newNhanvien = new nhanVien(
    taikhoan,
    hoten,
    email,
    matkhau,
    ngaylam,
    luong,
    chucvu,
    gioLm
  );

  listNV.push(newNhanvien);
  renderListNV();
  stayData();
  resetForm();
  // console.log(listNV);
}
//cho thông tin lên bảng
function renderListNV(data) {
  if (!data) {
    data = listNV;
  }
  var html = "";
  for (var i = 0; i < listNV.length; i++) {
    var currentNV = listNV[i];
    html += `
    <tr>
      <td>${currentNV.taiKhoan}</td>
      <td>${currentNV.hoTen}</td>
      <td>${currentNV.email}</td>
      <td>${currentNV.ngayLam}</td>
      <td>${currentNV.chucVu}</td>
      <td>${currentNV.tongLuong()}</td>
      <td>${currentNV.xepLoai()}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteNV('${
          currentNV.taiKhoan
        }')" id="delete-button">Xoá</button>
        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="getNV('${
          currentNV.taiKhoan
        }')" id="update-button">Cập nhật</button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}
//xóa nhân viên
function deleteNV(taikhoan) {
  var index = findTK(taikhoan);
  if (index === -1) {
    alert("Tài khoản không hợp lệ");
    return;
  }

  listNV.splice(index, 1);
  renderListNV();
  stayData();
}
//update 1: lấy thông tin nhân viên
function getNV(taikhoan) {
  var index = findTK(taikhoan);

  if (index === -1) {
    alert("Tài khoản không hợp lệ");
    return;
  }

  var foundNV = listNV[index];

  document.getElementById("tknv").value = foundNV.taiKhoan;
  document.getElementById("name").value = foundNV.hoTen;
  document.getElementById("email").value = foundNV.email;
  document.getElementById("password").value = foundNV.matKhau;
  document.getElementById("datepicker").value = foundNV.ngayLam;
  document.getElementById("luongCB").value = foundNV.luongCB;
  document.getElementById("chucvu").value = foundNV.chucVu;
  document.getElementById("gioLam").value = foundNV.gioLam;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
}
//update 2: cập nhật thông tin nhân viên
document.getElementById("btnCapNhat").onclick = function () {
  var taikhoan = document.getElementById("tknv").value;
  var hoten = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matkhau = document.getElementById("password").value;
  var ngaylam = document.getElementById("datepicker").value;
  var luong = +document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLm = +document.getElementById("gioLam").value;

  var foundIndex = findTK(taikhoan);
  if (foundIndex === -1) {
    alert("Tài khoản không hợp lệ");
    return;
  }
  var foundNV = listNV[foundIndex];
  foundNV.taiKhoan = taikhoan;
  foundNV.hoTen = hoten;
  foundNV.email = email;
  foundNV.matKhau = matkhau;
  foundNV.ngayLam = ngaylam;
  foundNV.luongCB = luong;
  foundNV.chucVu = chucvu;
  foundNV.gioLam = gioLm;

  renderListNV();
  stayData();

  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnDong").click();
};
//search theo loại nhân viên
function findNV() {
  var result = [];
  var search = document.getElementById("searchName").value.toLowerCase().trim();

  for (var i = 0; i < listNV.length; i++) {
    var currNV = listNV[i];
    if (currNV.xepLoai().toLowerCase().includes(search)) {
      result.push(currNV);
    }
    
    renderListNV(result);
  }
};
//<------------------------------------------------->//
//lưu, lấy + map dữ liệu lên local storage
function stayData() {
  localStorage.setItem("list", JSON.stringify(listNV));
}
function mapData(data) {
  var mappedData = [];
  for (var i = 0; i < data.length; i++) {
    var currentData = data[i];

    mappedData.push(
      new nhanVien(
        currentData.taiKhoan,
        currentData.hoTen,
        currentData.email,
        currentData.matKhau,
        currentData.ngayLam,
        currentData.luongCB,
        currentData.chucVu,
        currentData.gioLam
      )
    );
  }
  return mappedData;
}
function getData() {
  if (localStorage.getItem("list")) {
    listLocal = mapData(JSON.parse(localStorage.getItem("list")));
    // console.log(listLocal);
    for (var i = 0; i < listLocal.length; i++) {
      listNV.push(listLocal[i]);
    }
  }
  renderListNV();
}
//dò nhân viên theo tài khoản
function findTK(taikhoan) {
  for (var i = 0; i < listNV.length; i++) {
    if (listNV[i].taiKhoan === taikhoan) {
      return i;
    }
  }
  return -1;
}
//reset form
function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
}
getData()

