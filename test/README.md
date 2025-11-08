# Fitness Class Booking System API Test Suite

## Overview
This folder contains automated REST API tests for the Fitness Class Booking System, organized by feature. Tests use Mocha, Chai, Supertest, Mochawesome, and dotenv for environment isolation and reporting.

## Structure
- `student/` - Tests for student registration, login, and bookings
- `admin/` - Tests for admin registration and login
- `class/` - Tests for class listing, details, creation, and removal
- `booking/` - Tests for booking and canceling spots
- `fixtures/` - Data-driven test data for students, admins, classes, and bookings

## Running Tests
- **Standard test run:**
  ```bash
  npm test
  ```
- **With HTML report (Mochawesome):**
  ```bash
  npm run test:html
  ```
  The HTML report will be generated in the `mochawesome-report/` directory.

## Environment Variables
- Set the API base URL and other variables in `.env` (default: `BASE_URL=http://localhost:3000`).

## Hooks and Reusable Logic
- JWT tokens and other setup steps are handled using Mocha hooks (`before`, `beforeEach`) for code reuse and isolation.

## Data Driven Testing
- Test data is separated in the `fixtures/` folder for easy maintenance and extension.

---
