function nhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  var xepHang;
  var tongLuong;
  this.xepLoai = function () {
    if (gioLam >= 192) {
      return (xepHang = "Nhân viên xuất sắc");
    } else if (gioLam >= 176) {
      return (xepHang = "Nhân viên giỏi");
    } else if (gioLam >= 160) {
      return (xepHang = "Nhân viên khá");
    } else {
      return (xepHang = "Nhân viên trung bình");
    }
  };
  this.tongLuong = function () {
    if (this.chucVu === "Sếp") {
      tongLuong = this.luongCB * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      tongLuong = this.luongCB * 2;
    } else {
      tongLuong = this.luongCB;
    }
    return tongLuong;
  };
}
