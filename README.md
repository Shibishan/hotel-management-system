# Hotel Guest Management System

# Project Overview
This is a simple Hotel Guest Management System built as a mini project.  
It allows hotel staff to manage guest information with features like adding, editing, deleting, and searching for guests.

# Tech Stack
- Frontend: React + TypeScript (Vite) with Tailwind CSS  
- Backend: PocketBase (SQLite built-in)  
- Version Control: Git & GitHub  

# Features
- Add new guest information  
- View all guests in a table  
- Update guest details  
- Delete guests  
- Search/filter guests  

# Setup & Run Instructions

# 1. Clone the Repository
git clone https://github.com/Shibishan/hotel-management-system.git
cd hotel-guest-management

# 2.Start PocketBase (Backend)
cd server
./pocketbase serve
Runs backend on http://127.0.0.1:8090.

# 3. Start React App (Frontend)
cd client
npm install
npm run dev