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
 
 ## API sử dụng
 
 ### Kiểm tra đăng nhập

`POST /api/users/login`

Ví dụ: 
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

Trường yêu cầu: `email`, `password`


### Đăng kí tài khoản mới:

`POST /api/users`

Ví dụ
```JSON
{
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

Không yêu cầu đăng nhập
Trường yêu cầu: `email`, `username`, `password`



### Lấy thông tin người dùng hiện tại

`GET /api/user`
 
 Yêu cầu đăng nhập

### Update thông tin người dùng

`PUT /api/user`

Ví dụ
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Yêu cầu dăng nhập


Chấp nhận các trường sau: `email`, `username`, `password`, `image`, `bio`



### Lấy thông tin profile

`GET /api/profiles/:username`

Yêu cầu đăng nhập



### Follow user

`POST /api/profiles/:username/follow`

Yêu cầu đăng nhập
Không yêu cầu params


### Unfollow user

`DELETE /api/profiles/:username/follow`

Yêu cầu đăng nhập
Không yêu cầu params



### Gọi ra list các articles
`GET /api/articles`

Trả về tất cả các articles được post bởi người dùng, cung cấp các params sau: tag, author và favorited để lọc kết quả
Query Parameters:

Filter by tag:

`?tag=AngularJS`

Filter by author:

`?author=jake`

Favorited by user:

`?favorited=jake`

Limit number of articles (default is 20):

`?limit=20`

Offset/skip number of articles (default is 0):

`?offset=0`

Yêu cầu đăng nhập



### Trả về các articles mà người dùng follow

`GET /api/articles/feed`
Có thể sử dụng `limit` và `offset`
Yêu cầu đăng nhập


### Lấy một article cụ thể

`GET /api/articles/:slug`

Không yêu cầu đăng nhập

### Tạo Article mới

`POST /api/articles`

Ví dụ

```JSON
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

Yêu cầu đăng nhập

Trường bắt buộc: `title`, `description`, `body`

Trường không bắt buộc: `tagList` và một mảng gồm các chuỗi



### Update Article

`PUT /api/articles/:slug`

Ví dụ

```JSON
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

Không yêu cầu đăng nhập

Trường không bắt buộc: `title`, `description`, `body`

### Delete Article

`DELETE /api/articles/:slug`

Yêu cầu đăng nhập

### Add Comments to an Article

`POST /api/articles/:slug/comments`

Ví dụ

```JSON
{
  "comment": {
    "body": "His name was my name too."
  }
}
```

Yêu cầu đăng nhập

Trường bắt buộc: `body`



### Lấy tất cả comments từ Article

`GET /api/articles/:slug/comments`

Yêu cầu đăng nhập



### Delete Comment

`DELETE /api/articles/:slug/comments/:id`

Yêu cầu đăng nhập



### Favorite Article

`POST /api/articles/:slug/favorite`

Yêu cầu đăng nhập


### Unfavorite Article

`DELETE /api/articles/:slug/favorite`

Yêu cầu đăng nhập

### Get Tags

`GET /api/tags`

Yêu cầu đăng nhập
    
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


