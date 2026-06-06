# Blog Management System

## 1. Giới thiệu

Blog Management System là ứng dụng web được xây dựng bằng MERN Stack (MongoDB, ExpressJS, ReactJS, NodeJS).

Hệ thống cho phép người dùng:

* Đăng ký tài khoản
* Đăng nhập bằng JWT Authentication
* Tạo bài viết
* Chỉnh sửa bài viết
* Xóa bài viết
* Xem danh sách bài viết
* Tìm kiếm bài viết
* Bình luận bài viết
* Thích/Bỏ thích bài viết

---

# 2. Công nghệ sử dụng

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* express-validator
* cors
* dotenv

## Frontend

* ReactJS
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

---

# 3. Cấu trúc dự án

```text
project-root
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   ├── config
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── pages
│   │   ├── components
│   │   ├── routes
│   │   ├── context
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# 4. Yêu cầu hệ thống

Cần cài đặt trước:

* NodeJS >= 18
* MongoDB >= 7
* Git

Kiểm tra:

```bash
node -v
npm -v
mongod --version
```

---

# 5. Cài đặt dự án

Clone source code:

```bash
git clone <repository-url>
cd project-root
```

---

# 6. Cấu hình biến môi trường

Tạo file:

```text
backend/.env
```

Nội dung:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/blog_management

JWT_SECRET=my_super_secret_key
```

Giải thích:

| Biến       | Mô tả                 |
| ---------- | --------------------- |
| PORT       | Cổng chạy backend     |
| MONGO_URI  | Chuỗi kết nối MongoDB |
| JWT_SECRET | Khóa mã hóa JWT       |

---

# 7. Chạy Backend

Di chuyển vào thư mục backend:

```bash
cd backend
```

Cài đặt package:

```bash
npm install
```

Chạy server:

```bash
npm run dev
```

Nếu thành công:

```text
Server running on port 5000
MongoDB Connected
```

Backend URL:

```text
http://localhost:5000
```

---

# 8. Chạy Frontend

Di chuyển vào thư mục frontend:

```bash
cd frontend
```

Cài đặt package:

```bash
npm install
```

Chạy dự án:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 9. API Documentation

## Authentication

### Đăng ký

POST

```http
/api/auth/register
```

Body:

```json
{
  "name": "Nguyen Van A",
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

### Đăng nhập

POST

```http
/api/auth/login
```

Body:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt_token"
}
```

---

## Posts

### Lấy tất cả bài viết

GET

```http
/api/posts
```

---

### Lấy chi tiết bài viết

GET

```http
/api/posts/:id
```

---

### Tạo bài viết

POST

```http
/api/posts
```

Headers:

```text
Authorization: Bearer TOKEN
```

Body:

```json
{
  "title": "NodeJS Tutorial",
  "content": "Learning ExpressJS"
}
```

---

### Cập nhật bài viết

PUT

```http
/api/posts/:id
```

---

### Xóa bài viết

DELETE

```http
/api/posts/:id
```

---

## Comments

### Thêm bình luận

POST

```http
/api/comments
```

Body:

```json
{
  "postId": "POST_ID",
  "content": "Great article"
}
```

---

### Xóa bình luận

DELETE

```http
/api/comments/:id
```

---

## Likes

### Like/Bỏ Like

POST

```http
/api/posts/:id/like
```

---

# 10. Postman Collection

File:

```text
BlogManagement.postman_collection.json
```

Collection bao gồm:

* Authentication

  * Register
  * Login

* Posts

  * Get All Posts
  * Get Post By Id
  * Create Post
  * Update Post
  * Delete Post

* Comments

  * Add Comment
  * Delete Comment

* Likes

  * Like Post

Biến môi trường Postman:

```text
baseUrl = http://localhost:5000/api
token = JWT_TOKEN
```

---

# 11. Tài khoản Demo

```text
Email: admin@test.com
Password: 123456
```

(Nếu có)

---

# 12. Hình ảnh minh họa

## Trang đăng nhập

[Thêm ảnh]

## Trang chủ

[Thêm ảnh]

## Trang tạo bài viết

[Thêm ảnh]

## Trang chi tiết bài viết

[Thêm ảnh]