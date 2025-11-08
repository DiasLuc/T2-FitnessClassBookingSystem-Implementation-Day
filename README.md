
# Fitness Class Booking System API

## Overview
This project is a RESTful API for managing fitness class bookings, student and admin accounts, and class schedules. It is built with Express.js, uses JWT for authentication, and stores data in memory. The API is documented with Swagger and follows a layered architecture (routes, controllers, services, models).

## Features
- Student registration and login (JWT authentication)
- Admin registration and login (JWT authentication)
- List all available classes (public)
- Get class details (public)
- Book and cancel class spots (student login required)
- View current user’s bookings (student login required)
- Create and remove classes (admin login required)
- Swagger documentation and UI

## Setup Instructions
1. **Install dependencies:**
	```bash
	npm install express swagger-ui-express jsonwebtoken
	```
2. **Run the server:**
	```bash
	node app.js
	```
3. **Access the API:**
	- Base URL: `http://localhost:3000`
	- Swagger UI: `http://localhost:3000/api-docs`

## API Documentation
See [resources/swagger.json](resources/swagger.json) for the full OpenAPI spec. You can interact with the API via Swagger UI at `/api-docs`.

## Project Structure
```
├── app.js
├── routes/
│   ├── studentRoutes.js
│   ├── adminRoutes.js
│   ├── classRoutes.js
│   └── bookingRoutes.js
├── controllers/
│   ├── studentController.js
│   ├── adminController.js
│   ├── classController.js
│   └── bookingController.js
├── service/
│   ├── authMiddleware.js
│   ├── studentService.js
│   ├── adminService.js
│   ├── classService.js
│   └── bookingService.js
├── model/
│   ├── student.js
│   ├── admin.js
│   ├── class.js
│   └── booking.js
├── resources/
│   └── swagger.json
└── README.md
```

## Usage Notes
- All authentication-protected endpoints require a JWT token in the `Authorization` header as `Bearer <token>`.
- Data is stored in memory and will reset when the server restarts.
- Error responses follow the status codes and messages described in the Swagger documentation.

---
Here’s a complete set of **user stories** for each feature of your **Fitness Class Booking System**, each paired with clear **business rules**.

---
### **1. Student Registration**

**User Story:**
As a student,
I want to register for an account,
So that I can book and manage my fitness class reservations.

**Business Rules:**

* Students must provide a unique username, and a password.
* A success message is shown upon registration, and the student can log in immediately.

---

### **2. Student Login with JWT**

**User Story:**
As a student,
I want to log in securely using my credentials,
So that I can access my personal bookings and book classes.

**Business Rules:**

* Login requires a valid username and password.
* The system generates a JWT token upon successful authentication.
* Protected routes (booking, cancelation, view bookings) require a valid token.

---

### **3. List All Available Classes (Public)**

**User Story:**
As a visitor,
I want to view all available fitness classes,
So that I can decide which class I might want to join.

**Business Rules:**

* The list is accessible without authentication.
* Each class must display basic info: id, name, instructor, time, capacity, and available spots.

---

### **4. Get Class Details (Public)**

**User Story:**
As a visitor,
I want to view detailed information about a specific class,
So that I can learn more before deciding to register or book.

**Business Rules:**

* Details include class name, description, instructor, schedule, duration, and current availability.
* The route is public and doesn’t require authentication.
* If the class doesn’t exist or is inactive, an error message must be returned.

---

### **5. Book and Cancel Spots (Student Login Needed)**

**User Story:**
As a student,
I want to book or cancel a spot in a fitness class,
So that I can manage my participation in upcoming sessions.

**Business Rules:**

* Only authenticated students can book or cancel.
* A class cannot be overbooked — the system must check capacity before confirming.
* A student cannot book the same class twice.
* When a student cancels, the available spots must update immediately.

---

### **6. View Current User’s Bookings (Student Login Needed)**

**User Story:**
As a student,
I want to view my current and past class bookings,
So that I can keep track of my fitness schedule.

**Business Rules:**

* Only authenticated students can view their bookings.
* The list should be sorted by class date/time.

---

### **7. Admin Registration**

**User Story:**
As an admin,
I want to register for an admin account,
So that I can manage the fitness classes in the system.

**Business Rules:**

* Admin username must be unique.
* Only registered admins can log in to the admin dashboard.

---


### **8. Admin Login with JWT**

**User Story:**
As an admin,
I want to log in securely,
So that I can access and manage classes in the system.

**Business Rules:**

* Admins must log in using valid credentials.
* A JWT token is issued upon successful authentication.
* Admin-only routes require a valid admin JWT.

---

### **9. Create a New Class (Admin Login Needed)**

**User Story:**
As an admin,
I want to create new fitness classes,
So that students can book and participate in them.

**Business Rules:**

* Only authenticated admins can create classes.
* A class must have a title, description, instructor, date/time, and max capacity.
* The system must validate that the date/time is in the future.

---

### **10. Remove Class (Admin Login Needed)**

**User Story:**
As an admin,
I want to remove a class from the schedule,
So that students can no longer book or view it.

**Business Rules:**

* Only authenticated admins can delete classes.
* Once deleted or inactive, the class no longer appears in public listings.

