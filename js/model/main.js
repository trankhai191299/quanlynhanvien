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

  var isValid = validation();
  if (!isValid) {
    return alert("Vui lòng kiểm tra lại các ô nhập!!!");
  }
  var foundIndex = findTK(taikhoan);
  if (foundIndex !== -1) {
    alert("Tài khoản trùng");
    resetForm();
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
  alert("Thêm nhân viên thành công");
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
  for (var i = 0; i < data.length; i++) {
    var currentNV = data[i];
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
  alert("Đã xóa nhân viên");
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

  var isValid = validation();
  if (!isValid) {
    return alert("Vui lòng kiểm tra lại các ô nhập!!!");
  }

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
  alert("Cập nhật hoàn thành");
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnDong").click();
};
//search theo loại nhân viên
function findNV() {
  var result = [];
  var tuKhoa = document.getElementById("searchName").value.toLowerCase().trim();

  for (var i = 0; i < listNV.length; i++) {
    var currNV = listNV[i];
    if (currNV.xepLoai().toLowerCase().trim().search(tuKhoa) != -1) {
      result.push(currNV);
    }

    renderListNV(result);
  }
}
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
//validation
function validation() {
  var isValid = document.getElementById("formQLNV").checkValidity();
  if (!isValid) {
    //check tài khoản
    var inpTK = document.getElementById("tknv");
    var spaTK = document.getElementById("tbTKNV");
    if (inpTK.validity.valueMissing) {
      spaTK.innerHTML = "Tài khoản không được để trống";
      spaTK.style.display = "block";
    } else if (inpTK.validity.patternMismatch) {
      spaTK.innerHTML = "Tài khoản chỉ từ 4 đến 6 ký tự";
      spaTK.style.display = "block";
    } else {
      spaTK.innerHTML = "";
      spaTK.style.display = "none";
    }

    //check họ tên
    var inpHoTen = document.getElementById("name");
    var spaHoTen = document.getElementById("tbTen");
    if (inpHoTen.validity.valueMissing) {
      spaHoTen.innerHTML = "Họ tên không được để trống";
      spaHoTen.style.display = "block";
    } else if (inpHoTen.validity.patternMismatch) {
      spaHoTen.innerHTML = "Họ tên không được thêm ký tự đặc biệt và số";
      spaHoTen.style.display = "block";
    } else {
      spaHoTen.innerHTML = "";
      spaHoTen.style.display = "none";
    }

    //check email
    var inpEmail = document.getElementById("email");
    var spaEmail = document.getElementById("tbEmail");
    if (inpEmail.validity.valueMissing) {
      spaEmail.innerHTML = "Email không được để trống";
      spaEmail.style.display = "block";
    } else if (inpEmail.validity.patternMismatch) {
      spaEmail.innerHTML = "Email không hợp lệ";
      spaEmail.style.display = "block";
    } else {
      spaEmail.innerHTML = "";
      spaEmail.style.display = "none";
    }

    //check password
    var inpPassword = document.getElementById("password");
    var spaPassword = document.getElementById("tbMatKhau");
    if (inpPassword.validity.valueMissing) {
      spaPassword.innerHTML = "Mật khẩu không được để trống";
      spaPassword.style.display = "block";
    } else if (inpPassword.validity.patternMismatch) {
      spaPassword.innerHTML =
        "Mật khẩu từ 6 đến 10 ký tự, gồm ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt(ví dụ: !K%as9d@H )";
      spaPassword.style.display = "block";
    } else {
      spaPassword.innerHTML = "";
      spaPassword.style.display = "none";
    }

    //check ngày làm
    var inpNgayLam = document.getElementById("datepicker");
    var spaNgayLam = document.getElementById("tbNgay");
    if (inpNgayLam.validity.valueMissing) {
      spaNgayLam.innerHTML = "Ngày làm không được để trống";
      spaNgayLam.style.display = "block";
    } else {
      spaNgayLam.innerHTML = "";
      spaNgayLam.style.display = "none";
    }
    //check lương cơ bản
    var inpLuongCB = document.getElementById("luongCB");
    var spaLuongCB = document.getElementById("tbLuongCB");
    if (inpLuongCB.validity.valueMissing) {
      spaLuongCB.innerHTML = "Lương cơ bản không được để trống";
      spaLuongCB.style.display = "block";
    } else if (inpLuongCB.validity.patternMismatch) {
      spaLuongCB.innerHTML = "Lương cơ bản không được có chữ và ký tự đặc biệt";
      spaLuongCB.style.display = "block";
    } else if (+inpLuongCB.value < 1000000 || +inpLuongCB.value > 20000000) {
      spaLuongCB.innerHTML = "Lương cơ bản chỉ từ 1.000.000 đến 20.000.000";
      spaLuongCB.style.display = "block";
    } else {
      spaLuongCB.innerHTML = "";
      spaLuongCB.style.display = "none";
    }
    //check chức vụ
    var inpChucVu = document.getElementById("chucvu");
    var spaChucVu = document.getElementById("tbChucVu");
    if (inpChucVu.validity.valueMissing || inpChucVu.value === "") {
      spaChucVu.innerHTML = "Xin hãy chọn chức vụ";
      spaChucVu.style.display = "block";
    } else {
      spaChucVu.innerHTML = "";
      spaChucVu.style.display = "none";
    }
    //check giờ làm
    var inpGioLam = document.getElementById("gioLam");
    var spaGioLam = document.getElementById("tbGiolam");
    if (inpGioLam.validity.valueMissing) {
      spaGioLam.innerHTML = "Xin hãy nhập số giờ làm";
      spaGioLam.style.display = "block";
    } else if (inpGioLam.validity.patternMismatch) {
      spaGioLam.innerHTML = "Số giờ làm không được có chữ và ký tự đặc biệt";
      spaGioLam.style.display = "block";
    } else if (+inpGioLam.value < 80 || +inpGioLam.value > 200) {
      spaGioLam.innerHTML = "Số giờ làm giới hạn từ 80 đến 200";
      spaGioLam.style.display = "block";
    } else {
      spaGioLam.innerHTML = "";
      spaGioLam.style.display = "none";
    }
  }
  return isValid;
}
//reset form
function resetForm() {
  //reset input
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  //reset span error
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}
//----------------------------------------------------------//
document.getElementById("btnThem").onclick = function () {
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("tknv").disabled = false;
  resetForm();
};
getData();
