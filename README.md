# 🏠 Roommate Finder - Server Side

This is the backend server for the **Roommate Finder** web application. It provides RESTful API endpoints to manage roommate listings using **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌐 Server URL

**Base URL:**  
`[https://roommate-finder-server-steel.vercel.app/]`  


---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- CORS
- dotenv

---

## 📁 API Endpoints

### 🔍 General Routes

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| GET    | `/`                    | Server status check              |

---

### 🏘️ Roommate Data

| Method | Endpoint                  | Description                                         |
|--------|---------------------------|-----------------------------------------------------|
| GET    | `/roommateData`           | Get 6 roommate listings                            |
| GET    | `/listingData`            | Get all roommate listings                          |
| GET    | `/roommateData/:id`       | Get single roommate listing by ID                  |
| GET    | `/findMyEmail/:email`     | Find listings by user email                        |
| GET    | `/availableData`          | Get listings with `availability: "Available"`      |
| POST   | `/addRoommate`            | Add new roommate listing                           |
| PATCH  | `/addLike/:id`            | Add like to a listing                              |
| PUT    | `/update/:id`             | Update roommate listing by ID                      |
| DELETE | `/deleteList/:id`         | Delete roommate listing by ID                      |

---

## 🛡️ Environment Variables

Create a `.env` file and add the following:

