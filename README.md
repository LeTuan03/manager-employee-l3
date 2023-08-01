# manager-employee-l3
tài khoản chức vụ manage: username: manage, pasword : admin
tài khoản chức vụ user: username: user, pasword : admin

Mô tả các luồng chức năng
1. Luồng quản lý nhân viên
Mục đích: Hiển thị danh sách nhân viên đã được lãnh đạo phê duyệt đăng ký hồ sơ, cho phép người dùng thực hiện cập nhật diễn biến, Kết thúc hồ sơ
Logic xử lý: Bản ghi thông tin nhân viên sau khi đã được lãnh đạo duyệt sẽ hiển thị ở màn hình quản lý nhân viên, cho phép người dùng xem thông tin nhân viên, cập nhật diễn biến và kết thúc hồ sơ
2. Luồng kết thúc
Mục đích: Cho phép người dùng role quản lý kết thúc hồ sơ đang hiện hành
Logic xử lý: Tại màn hình quản lý -> chọn bản ghi muốn kết thúc -> bấm Kết thúc -> Hiển thị popup nhập Ngày kết thúc, lý do kết thúc -> bấm Xác nhận -> Hiển thị sang màn hình Kết thúc.
3. Luồng cập nhật diễn biến
Mục đích: Cho phép người dùng cập nhật diễn biến, quá trình hoạt động của nhân viên ở công ty.
Logic xử lý: Chọn bản ghi muốn cập nhật diễn biến -> chọn Loại diễn biến -> Hiển thị các trường thông tin cần nhập vào theo từng loại diễn biến (Các trường thông tin nhập sẽ hiển thị lên đầu, và bảng danh sách ở dưới, sau khi nhập thông tin thì có thể lưu, cập nhật và xóa thông tin của từng loại diễn biến)
Đăng ký hồ sơ: Gồm các trường dữ liệu Ngày đăng ký, Các loại hồ sơ đã nộp (hiện dưới dạng bảng nếu có thể), Nội dung, Ghi chú.
Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
=>Pending 
Tăng lương: Gồm các trường dữ liệu Ngày tăng lương, Lần thứ, Lý do, Bậc, Ghi chú.
Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
Hiển thị danh sách biểu mẫu Quyết định tăng lương và biểu mẫu Sơ yếu lý lịch
Thăng chức: Gồm các trường dữ liệu Ngày thăng chức, Lần thứ, Lý do, Chức vụ hiện tại, Chức vụ cũ, Ghi chú.
Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
Hiển thị danh sách biểu mẫu Quyết định thăng chức và biểu mẫu Sơ yếu lý lịch
Đề xuất, tham mưu: Gồm các trường dữ liệu Ngày diễn biến, Nội dung, Ghi chú, Loại (đề xuất, tham mưu) -> hiển thị thêm trường mô tả chi tiết.
Khi bấm Lưu -> Lưu được thông tin vừa nhập vào bảng
Hiển thị danh sách biểu mẫu Báo cáo đề xuất
Sau khi nhập thông tin biểu mẫu -> tiếp theo trình tự trình lãnh đạo, mỗi loại biểu mẫu và loại diễn biến sẽ có từng loại đề xuất khác nhau
4. Luồng nộp lưu hồ sơ
Mục đích: Sau khi hồ sơ kết thúc, bản ghi được hiển thị ở menu Kết thúc và cho phép người dùng nộp lưu trữ thông tin hồ sơ
Logic xử lý: Tại màn hình kết thúc, chọn bản ghi muốn Nộp lưu -> Hiện popup nhập Ngày quyết định, Số lưu -> bấm Xác nhận -> đóng dialog và hiển thị ngày quyết định, số lưu ra màn hình Kết thúc, trạng thái chuyển thành Đã nộp lưu
5. Biểu mẫu
Gồm các biểu mẫu: Báo cáo đề xuất, Quyết định tăng lương/thăng chức, Đơn xin nghỉ việc
Logic xử lý:
Ở Role Quản lý cho phép nhập các thông tin của biểu mẫu
Role Lãnh đạo chỉ được phép xem thông tin và nhập ở mục Ý kiến của lãnh đạo
Màn hình Lãnh đạo:
Cho phép xem thông tin biểu mẫu, nhập ý kiến, thực hiện Phê duyệt, yêu cầu bổ sung, từ chối biểu  mẫu
Màn hình quản lý nhân viên -> Kết thúc:
Gồm biểu mẫu quyết định kết thúc hồ sơ
Bước 1: Quản lý nhập thông tin quyết định về việc,  kính gửi, ….
Bước 2: Bấm trình lãnh đạo -> hiển thị ở màn hình chờ duyệt với loại yêu cầu Kết thúc hồ sơ
Bước 3: Lãnh đạo có thể Phê duyệt -> hiển thị ở menu kết thúc với trạng thái Kết thúc; Yêu cầu bổ sung -> hiển thị ở màn hình Quản lý với trạng thái Yêu cầu bổ sung (Phân biệt với yêu cầu bổ sung lúc đăng ký hồ sơ); Từ chối -> hiển thị ở màn hình Quản lý với trạng thái Từ chối
 
