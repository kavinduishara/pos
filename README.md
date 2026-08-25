# 🛍️ Store Management System

A full-stack web application for managing store operations including billing, inventory, employees, and sales analysis. Built with **Spring Boot (Java)** for the backend and **React.js** for the frontend.

---

## 🚀 Features

- 🔐 **JWT Authentication** with Access & Refresh Tokens
- 👥 **Custom Role-Based Access Control** (RBAC) using `AntPathMatcher`
- 🏬 **Multi-Store Support** with per-store role mapping
- 👨‍💼 **Roles**: `OWNER`, `ADMIN`, `CASHIER`, `USER`
- 🧾 **Billing System** (only accessible by Cashiers)
- 📦 **Inventory Management**
- 🧑‍💼 **Employee Role Management**
- 📊 **Dashboard** with Sales & Bill Overview
- 🔍 **Fast Product Search** with live filtering
- ⚡ **Responsive UI**

---

## 🛠️ Tech Stack

### 🧠 Backend
- Spring Boot
- Spring Security (custom RBAC logic)
- JPA / Hibernate
- PostgreSQL
- JWT (Access + Refresh Tokens)

### 💻 Frontend
- React.js (with Vite)
- Axios
- Tailwind CSS
- React Toastify
- Lucide Icons

---
## 🐳 DevOps & Deployment

### 🏗️ Containerization
- Multi-stage **Docker builds** for both services to keep images lean and production-ready
  - **Backend**: Maven build stage → slim JRE runtime stage
  - **Frontend**: Node build stage (Vite) → Nginx static-serve stage
- **Docker Compose** for local multi-container orchestration (backend, frontend, PostgreSQL) with service networking and environment-based config

### ☸️ Kubernetes (Minikube)
- Deployed the containerized stack to a local **Kubernetes cluster (Minikube)**
- **Deployments** for backend and frontend with defined replicas and resource limits
- **Services** (ClusterIP/NodePort) for internal and external traffic routing
- **ConfigMaps & Secrets** for environment variables and DB credentials
- **PersistentVolumeClaims** for PostgreSQL data persistence

### 🧰 Tooling
- Docker, Docker Compose
- Kubernetes, Minikube, kubectl
---

