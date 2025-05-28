# 📖 Gaming Platform API Design Documentation

---

## 📌 Project Overview

Is project ka objective ek aise backend API system develop karna tha jo MPL, WinZO jaise gaming platforms ki tarah kaam kare — jahan users web-based games ko browse, search, play kar sakein, apna score submit kar sakein, aur admin games ko manage kar sake.

---

## 📌 Technical Stack

- Backend: Node.js (Express)
- Database: MongoDB (Mongoose)
- Authentication: JWT with role-based verification (admin/user)
- Validation: express-validator
- Password Security: bcrypt hashing

---

## 📌 Authentication System Overview

- Separate signup/login APIs for Users and Admin
- JWT-based token authentication
- Role-based secret key validation
- Token verify on every protected route
- Decoded token info attached to `req.user`

---

## 📌 API Route Structure

### ✅ Admin Routes (Protected with admin JWT token)

| Method | Endpoint                     | Description                      |
|:--------|:------------------------------|:----------------------------------|
| POST   | /api/admin/games              | Add new game                      |
| PUT    | /api/admin/games/:id          | Update existing game              |
| GET    | /api/admin/games              | Get list of all games             |
| DELETE | /api/admin/games/:id          | Soft delete a game (mark deleted) |

---

### ✅ User Routes (Protected with user JWT token)

| Method | Endpoint                        | Description                  |
|:---------|:---------------------------------|:------------------------------|
| GET      | /api/user/games                  | Get list of available games    |
| GET      | /api/user/games/search           | Search game by name            |
| GET      | /api/user/games/:id              | Get details of specific game   |
| GET      | /api/user/games/:id/play         | Get game play URL              |
| POST     | /api/user/games/:id/score        | Submit score for a game        |

---

### ✅ Auth Routes (Public)

| Method | Endpoint          | Description         |
|:--------|:-------------------|:---------------------|
| POST   | /api/user/signup   | User registration     |
| POST   | /api/user/login    | User login, get token  |
| POST   | /api/admin/signup  | Admin registration    |
| POST   | /api/admin/login   | Admin login, get token |

---

## 📌 Authentication & Token Flow

- Login pe JWT token generate hota hai  
  `{ id: "abc123", role: "admin" }`
- Token headers me send hota hai  
  `Authorization: Bearer <token>`
- Middleware `authenticateToken` token verify karta hai:
  - Decode token
  - Validate role from payload
  - Correct secret key se verify
  - `req.user` me verified data attach
- Controller me `req.user` se current login user ka data available




