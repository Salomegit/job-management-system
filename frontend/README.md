# 🧑‍💼 Job Management System

A full-stack Job Management Web Application that allows users to  view, update, and soft-delete job listings.



## 📖 Overview

This project is a job listing management system built using **Django REST Framework** and **PostgreSQL** on the backend, and **React** with **Tailwind CSS** on the frontend. Users can perform full CRUD operations, and jobs are *soft-deleted* using a `status` field.

---

## 🧱 Tech Stack

### 🔗 Backend:
- Python
- Django
- Django REST Framework
- PostgreSQL

### 🎨 Frontend:
- React
- Tailwind CSS
- Axios (for API communication)

### 📦 Dev Tools:
- Git & GitHub (Version Control)

---

## ✅ Features

### 🔧 Backend (API)
- Full CRUD operations on job listings
- Soft delete functionality using a `status` field
- Auto timestamp on job creation and updates
- All responses returned in JSON format
- PostgreSQL database integration

### 💻 Frontend
- List all active jobs (status = "active")
- Edit existing job listings
- View full job details
- Soft delete job (set `status` to "inactive")
- UI badges to visually indicate job status
- Success messages on job actions

---

## 🚀 Setup Instructions

### 🔙 Backend (Django + PostgreSQL)

1. Navigate to the backend directory:

    python -m venv env

    source env/bin/activate  

2. Install dependencies:

    pip install -r requirements.txt

3. Set up PostgreSQL database (ensure it is running and configured in settings.py)

    Apply migrations: python manage.py migrate

4. Run the server:

    python manage.py runserver

## 🖥️ Frontend (React + Tailwind)
1.  Navigate to the frontend directory:

    cd frontend

2. Install dependencies:

   npm install

3. Start the development server:

    npm run dev

Open in browser: http://localhost:5173

![alt text](image.png)