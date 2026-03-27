# Shihablvl100

A full-stack educational content platform built with **.NET 10**, **Next.js**, and **Supabase**. Organize and share structured learning content across Computer Science, HSC, IELTS, and more.

## 🌐 Live Demo

- **Frontend:** [https://shihablvl100.vercel.app](https://shihablvl100.vercel.app)
- **Backend API:** [https://shihablvl100.onrender.com/api](https://shihablvl100.onrender.com/api)


## 🏗️ Architecture

    Frontend (Next.js) → Backend (.NET API) → Database (Supabase Postgres)

### Backend — Clean Architecture

    Shihablvl100.Domain           → Entities (Category, Content, User)
    Shihablvl100.Application      → Interfaces + Services (Business Logic)
    Shihablvl100.Infrastructure   → Repositories + DbContext (Database)
    Shihablvl100.API              → Controllers + Auth (HTTP Endpoints)

### Frontend — Next.js App Router

    app/
    ├── components/        → Navbar, Footer, Breadcrumb, Container
    ├── lib/api.ts         → API helper functions
    ├── [...slug]/         → Dynamic category pages
    ├── content/[slug]/    → Article reading page
    ├── login/             → Authentication page
    ├── admin/             → Admin dashboard
    └── page.tsx           → Landing page

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | .NET 10, C#, Entity Framework Core |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth + JWT |
| Deployment | Vercel (Frontend) + Render (Backend) |

## ✨ Features

- **Hierarchical Categories** — Infinite nesting (Learning → CS → CP → articles)
- **Dynamic Routing** — Catch-all routes for any category depth
- **JWT Authentication** — Supabase Auth with role-based access control
- **Admin Dashboard** — Create categories and content from the browser
- **Protected API** — Only admins can create, edit, delete content
- **Responsive Design** — Dark theme with professional styling
- **RESTful API** — Full CRUD for categories and contents

## 📂 Database Schema

### Categories (self-referencing)

| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary key (auto-generated) |
| Name | string | Category name |
| Slug | string | URL-friendly name |
| ParentId | int? | Parent category (null = root) |
| Order | int | Sort order |
| CreatedAt | DateTime | Creation timestamp |

### Contents

| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary key (auto-generated) |
| Title | string | Article title |
| Slug | string | URL-friendly title |
| Body | string | Markdown content |
| CategoryId | int | Parent category |
| CreatedAt | DateTime | Creation timestamp |
| UpdatedAt | DateTime | Last edit timestamp |

### Users

| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary key (auto-generated) |
| Username | string | Display name |
| Email | string | Email address |
| Role | enum | Admin or User |
| CreatedAt | DateTime | Creation timestamp |

## 🔗 API Endpoints

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/categories | No | Get all categories |
| GET | /api/categories/:id | No | Get category by ID |
| POST | /api/categories | Admin | Create category |
| PUT | /api/categories/:id | Admin | Update category |
| DELETE | /api/categories/:id | Admin | Delete category |

### Contents

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/contents | No | Get all contents |
| GET | /api/contents/:id | No | Get content by ID |
| POST | /api/contents | Admin | Create content |
| PUT | /api/contents/:id | Admin | Update content |
| DELETE | /api/contents/:id | Admin | Delete content |

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Login and get JWT token |

## 🚀 Getting Started

### Prerequisites

- .NET 10 SDK
- Node.js 18+
- Supabase account

### Backend Setup

    cd backend
    dotnet restore

Create `Shihablvl100.API/appsettings.json`:

    {
      "ConnectionStrings": {
        "DefaultConnection": "Host=YOUR_HOST;Port=5432;Database=postgres;Username=YOUR_USER;Password=YOUR_PASSWORD;SSL Mode=Require;Trust Server Certificate=true"
      },
      "Supabase": {
        "Url": "https://YOUR_PROJECT.supabase.co",
        "AnonKey": "YOUR_ANON_KEY"
      }
    }

Run migrations and start:

    dotnet ef database update --project Shihablvl100.Infrastructure --startup-project Shihablvl100.API
    dotnet run --project Shihablvl100.API

### Frontend Setup

    cd frontend
    npm install

Create `frontend/.env.local`:

    NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start development server:

    npm run dev

## 📁 Project Structure

    Shihablvl100/
    ├── backend/
    │   ├── Shihablvl100.Domain/
    │   │   └── Entities/
    │   │       ├── Category.cs
    │   │       ├── Content.cs
    │   │       └── User.cs
    │   ├── Shihablvl100.Application/
    │   │   ├── Interfaces/
    │   │   │   ├── ICategoryRepository.cs
    │   │   │   ├── IContentRepository.cs
    │   │   │   └── IUserRepository.cs
    │   │   └── Services/
    │   │       ├── CategoryService.cs
    │   │       ├── ContentService.cs
    │   │       └── AuthService.cs
    │   ├── Shihablvl100.Infrastructure/
    │   │   ├── Data/
    │   │   │   └── AppDbContext.cs
    │   │   └── Repositories/
    │   │       ├── CategoryRepository.cs
    │   │       ├── ContentRepository.cs
    │   │       └── UserRepository.cs
    │   ├── Shihablvl100.API/
    │   │   ├── Controllers/
    │   │   │   ├── CategoriesController.cs
    │   │   │   ├── ContentsController.cs
    │   │   │   └── AuthController.cs
    │   │   └── Program.cs
    │   ├── Dockerfile
    │   └── Shihablvl100.slnx
    ├── frontend/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── Navbar.tsx
    │   │   │   └── Footer.tsx
    │   │   ├── lib/
    │   │   │   └── api.ts
    │   │   ├── [...slug]/
    │   │   │   └── page.tsx
    │   │   ├── content/[slug]/
    │   │   │   └── page.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── admin/
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   ├── globals.css
    │   │   └── page.tsx
    │   └── package.json
    ├── .gitignore
    └── README.md

## 🔐 Authentication Flow

    1. User logs in → email + password sent to /api/auth/login
    2. Backend forwards to Supabase Auth
    3. Supabase validates → returns JWT token
    4. Frontend stores token in localStorage
    5. Protected requests include: Authorization: Bearer <token>
    6. Backend validates token + checks admin role in Users table

## 🗺️ Roadmap

- [x] Category CRUD API
- [x] Content CRUD API
- [x] JWT Authentication
- [x] Admin Dashboard
- [x] Dynamic Category Routing
- [x] Content Reading Page
- [x] Deployment (Vercel + Render)
- [ ] Markdown Rendering
- [ ] Community Section (user posts, comments, likes)
- [ ] Portfolio / About Me Section
- [ ] News Section
- [ ] Search Functionality
- [ ] Image Uploads (Cloudinary)
- [ ] Responsive Mobile Design
- [ ] SEO Optimization

## 👤 Author

**Shihab**

- GitHub: [@sanjid-007](https://github.com/sanjid-007)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).