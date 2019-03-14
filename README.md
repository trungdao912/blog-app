# Project Title

Blog-app

Đây là một project được tạo bởi TrungDD10, QuyNV14, NgocVD2, sử dụng Angular 7 dựa trên project sau: https://github.com/gothinkster/realworld . Web-app là một phiên bản blog-mini, có đầy đủ chức năng của một web blog hoàn chỉnh. Người dùng có thể đăng kí/đăng nhập nick, có thể xem được những post mình like/những post mình follow. Người dùng có thể follow những blogger khác.

## Chức năng của app

- Authenticate người dùng thông qua JWT (login/signup pages + logout button trong settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET và hiển thị phân trang các articles
- Favorite articles
- Follow người dùng khác
- Form Validation

## Getting Started

### Step 1: Clone repo
```shell
git clone https://github.com/trungdao912/blog-app.git
cd blog-app
```
### Step 2: Cài đặt npm packages
```shell
npm install
npm start
```
Sau khi chạy câu lệnh npm start, ứng dụng sẽ được angular-cli tự động build, mọi sự thay đổi sẽ được update một cách tự động. Sau đó bạn có thể vào cổng `localhost:4200` để chạy ứng dụng.

Tắt ứng dụng bằng tổ hợp phím `Ctrl-C`

## Project Details

### Cài đặt angular-cli và khởi tạo project
```shell
npm install -g @angular/cli
ng new blog-app
```

### Khởi tạo các component cần thiết dựa theo bản thiết kế cấu trúc ứng dụng
- Header
- Footer
- Home
- Tag
- Setting
- Profile
- Sign in
- Sign up
- Articles: 
  + Article-information
  + Articles
  + Comment
  + New-article
 
### Mô hình chung của app khi được xây dựng cụ thể như sau:

- Home page (URL: /#/ )
    - Danh sách các tags - Tag component - NgocVD2
    - List of articles pulled from either Feed, Global, or by Tag - QuyNV14
    - Pagination for list of articles - NgocVD2 + QuyNV14
- Sign in/Sign up pages (URL: /#/signin, /#/signup ) - TrungDD10
    - Sử dụng JWT (lưu token trong localStorage)
    - Sử dụng Interceptor để gán token vào trong mỗi request
- Settings page (URL: /#/settings ) - QuyNV14
- Editor page to để thêm và sửa articles (URL: /#/editor, /#/editor/article-slug-here ) - QuyNV14
- Article page (URL: /#/article/article-slug-here )
    - Nút Delete article (chỉ hiện ra với tác giả bài viết) - TrungDD10
    - Hiển thị markdown - QuyNV14
    - Comments section at bottom of page - NgocVD2
    - Delete comment button (only shown to comment's author) - TrungDD10
 - Profile page (URL: /#/profile/:username)
    - Show basic user info - NgocVD2
    - Danh sách các articles được tạo ra bởi người đó / và các articles người đó thích - TrungDD10 + NgocVD2
 - Chặn người dùng chưa đăng nhập không cho vào các routes như setting, editor - TrungDD10
 - Sau khi người dùng không thao tác sau một khoảng thời gian, thì người dùng sẽ bị logout - TrungDD10
 - Kiểm tra xe người dùng có chắc chắn muốn chuyển route sau khi edit hay không - TrungDD10
    
## Built With

* [Angular](https://angular.io/) - The web framework used
* [Node Package Manager](https://www.npmjs.com/) - Dependency Management

## Contributing
[QuyNV14](https://github.com/bknguyenvanquy)
[NgocVD2]()

## Versioning

Project sử dụng phiên bản Angular-cli 7.0.6 và Angular 7.0.0

## License

Project này được tạo ra sau quá trình tham khảo và học hỏi từ https://github.com/gothinkster/

## Acknowledgments

* Trainer - DươngTQ
* https://github.com/gothinkster/


