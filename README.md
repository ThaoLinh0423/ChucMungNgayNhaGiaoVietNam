# Website Chúc Mừng Bố Mẹ Nhân Ngày 20-11 🌸

Dự án website thiệp chúc mừng điện tử tri ân Bố Mẹ nhân ngày Nhà giáo Việt Nam 20-11 với tone màu hồng pastel ngọt ngào, ấm áp và giàu cảm xúc.

---

## 🌟 Điểm nổi bật của Website
- **Tone màu Hồng Pastel (`#F8BBD0`, `#FCE4EC`, `#EC407A`)**: Nhẹ nhàng, ấm áp, tinh tế.
- **Hiệu ứng tương tác ấn tượng**:
  - Màn hình phong bì thư dán sáp niêm phong 20/11 với hiệu ứng phập phồng lôi cuốn.
  - Khi bấm nút **"Bấm Để Mở Lời Chúc Mừng"**:
    - Nắp phong bì mở ra.
    - Pháo hoa giấy (confetti) hoa & trái tim pastel bung tỏa khắp màn hình.
    - Thiệp thư chúc mừng cuộn hiện ra mượt mà.
    - Bộ ảnh kỷ niệm gia đình dạng khung ảnh Polaroid Vintage lướt hiện bên dưới.
- **Trình chiếu ảnh kỷ niệm (Polaroid Gallery)**:
  - 4 khung ảnh kỷ niệm có kẹp băng dính Washi Tape xinh xắn.
  - Bấm vào từng ảnh để **phóng to (Lightbox)** xem chi tiết.
- **Nhạc nền du dương (Web Audio API)**:
  - Tích hợp sẵn hộp nhạc (Music Box) phát giai điệu êm dịu mà **không cần cài file mp3**, mở web lên là nghe được ngay. Có nút bật/tắt ở góc trên bên phải.
- **Cánh hoa rơi bồng bềnh**: Tạo không gian lãng mạn, ấm áp.
- **Tương thích hoàn hảo (Responsive)**: Hiển thị đẹp mắt trên cả điện thoại di động (iPhone/Android) và máy tính.

---

## 🚀 Cách mở và sử dụng ngay
1. Vào thư mục `d:\htu\20_11`.
2. **Nhấp đúp chuột vào file `index.html`** để mở ngay trên trình duyệt (Chrome, Edge, Cốc Cốc, Safari,...).

---

## 📝 Hướng dẫn cá nhân hoá (Thay ảnh & Lời chúc)

### 1. Thay ảnh của Bố Mẹ & Gia đình
- Chuẩn bị 1 đến 4 bức ảnh thật của gia đình bạn (định dạng `.jpg` hoặc `.png`).
- Đặt các bức ảnh này vào thư mục `images/` (ví dụ: `images/bo_me_1.jpg`, `images/bo_me_2.jpg`,...).
- Mở file `index.html`, tìm đến các thẻ:
  ```html
  <img src="images/photo1.svg" alt="...">
  ```
  và sửa lại đường dẫn ảnh:
  ```html
  <img src="images/bo_me_1.jpg" alt="...">
  ```
  *(Đừng quên sửa cả thuộc tính `data-full="images/bo_me_1.jpg"` trên thẻ `polaroid-card` cha để khi bấm xem to sẽ hiện đúng ảnh nhé!)*

### 2. Thay đổi nội dung lời chúc
- Mở file `index.html`, tìm đến khối `<div class="letter-body">` để chỉnh sửa các đoạn văn hoặc thêm tên riêng của bạn và bố mẹ:
  - `Bố mẹ kính yêu của con,`
  - Các đoạn văn tri ân
  - Chữ ký ở cuối: `Con yêu Bố Mẹ rất nhiều ❤️`

---

## 🌐 Cách chia sẻ link trực tiếp cho Bố Mẹ xem qua Zalo/Facebook
Nếu bạn muốn gửi đường link cho bố mẹ mở xem trên điện thoại ở bất kỳ đâu, bạn có thể tải toàn bộ thư mục này lên các dịch vụ lưu trữ web miễn phí:
1. **GitHub Pages** (Khuyên dùng, miễn phí 100% vĩnh viễn):
   - Đưa thư mục lên một repository trên GitHub.
   - Bật Settings -> Pages -> Chọn nhánh `main` -> Bạn sẽ có link dạng `https://ten-ban.github.io/20_11/`.
2. **Vercel / Netlify**:
   - Kéo thả trực tiếp cả thư mục vào trang [netlify.com/drop](https://app.netlify.com/drop) là có ngay đường link web sau 5 giây!
