Discuz – Where Learning Meets Simplicity
Educational Platform for Course & Assignment Management

Live Project

Team Members

Mohit Pipaliya – 202412072

Bhumi Vyas – 202412123

Faculty: Ms. Shruti Bhilare

📘 Table of Contents

Introduction

Purpose

Key Features

Functional Requirements

Non-Functional Requirements

Methodology

Process Modeling Steps

Design (UML Diagrams)

Tech Stack & Code Overview

Testing

Snapshots

Summary

Lessons Learnt

References

Introduction

Discuz is a full-stack Educational Web Application designed to simplify course, assignment, and student management. It provides a centralized platform for Students, Admins, and Super Admins with role-based functionalities such as assignment submissions, reminders, commenting, admin controls, and course management.

Purpose

The purpose of Discuz is to build a modern academic system that:

Helps Admins manage courses & assignments

Allows Students to submit work, join classes, and use reminders

Enables Super Admins to manage user roles

Offers a clean, structured, and centralized system for academic workflows

Key Features

🔐 User Authentication (Login & Registration)

📚 Course Management with secure code-based enrollment

📝 Assignment Upload & Submission

💬 Public/Private Comments between students & teachers

📊 Personalized Dashboard

📅 Calendar with Reminders

🎓 Student Directory

🛡 Role-Based Access Control

⏳ Unsubmit Assignment Feature

📤 Export Student List (CSV)

Functional Requirements
👤 User Management

Secure login & registration

Role-based access for Student, Admin, Super Admin

Super Admin can promote/demote Admins

📚 Course Management

Admins can create & delete courses

Auto-generated entry code for joining

Students join via access code

📝 Assignment Management

Admin uploads assignments

Students view & submit assignments

Unsubmit feature before deadline

Public & private comments system

📅 Calendar & Reminders

Personal & event-based reminders

Dashboard displays upcoming reminders

🎓 Student Directory

Students can see enrolled classmates

Admin can export directory CSV

🏠 Dashboard

Role-based dashboard

Stats for admins: students, assignments, classes, events

Non-Functional Requirements
⚡ Performance

Supports multiple users concurrently

Fast & responsive UI

🔒 Security

JWT authentication

Strict role-based access

📱 Usability

Clean, intuitive UI

Responsive design

🔧 Maintainability

Modular code structure

Easily extendable backend & frontend

Methodology
🌀 Agile Development Approach

Incremental development

Iterative enhancements

Continuous testing & improvements

Modular design for both backend & frontend

Role-based workflow ensured secure access

Process Modeling Steps

Requirement Gathering

System Design (Models + UI Wireframes)

Module-wise Development

Auth

Courses

Assignments

Comments

Directory

Reminders

Testing & Validation

Refactoring & Enhancements

Documentation + UML Diagrams

Design (UML Diagrams)

(Insert your diagrams images here)

4.1 Use Case Diagram
4.2 Activity Diagram

Course enrollment

Assignment submission

Login flow

Reminder flow

Admin promotion flow

4.3 Sequence Diagram

Authentication

Course lifecycle

Assignment interactions

Reminder scheduling

4.4 Class Diagram
Tech Stack & Code Overview
Frontend

React.js

Axios for API communication

React Router

Tailwind CSS

Features include:

Course enrollment

Assignment submission

Dashboard stats

Calendar with reminders

Backend

Node.js + Express.js

MongoDB (Mongoose)

Secure REST APIs

Core APIs
Method	Endpoint	Description
POST	/auth/register	User registration
POST	/auth/login	Login
POST	/api/courses	Create course
GET	/api/courses/:id	Get course
POST	/api/assignments	Add assignment
PUT	/api/assignments/:id/submit	Submit assignment
POST	/api/reminders	Add reminder
GET	/api/students/export	Export student CSV
Authentication

JWT-based

Token stored in localStorage

Testing
✔ Unit Testing

Components like login, submission, commenting tested individually

✔ Integration Testing

Full flow testing between frontend & backend

✔ Manual Testing

All roles validated

Edge cases tested (resubmission, invalid codes, expired deadlines, etc.)

Snapshots

(Add screenshots from the project here)

Summary

Discuz is a complete academic workflow management platform with:

✔ Course & assignment handling
✔ Student submission tracking
✔ Calendar reminders
✔ Admin & Super Admin controls
✔ Role-based access throughout
✔ Fully responsive UI
✔ Scalable backend with MongoDB

It delivers an intuitive, powerful, classroom-friendly system suitable for real academic use.

Lessons Learnt

Importance of modular backend design

Deep understanding of role-based access control (RBAC)

MongoDB schema design for nested objects

Synchronization between frontend & backend

User-centered design practices

Importance of reminders & real-world academic flows

References

MongoDB Docs – https://www.mongodb.com/docs/manual/

Mongoose ODM – https://mongoosejs.com/docs/guide.html

Express.js – https://expressjs.com/

React.js – https://reactjs.org/docs/

Node.js – https://nodejs.org/en/docs
