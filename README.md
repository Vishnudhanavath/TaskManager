# 📝 Task Manager App

A simple and efficient full-stack Task Manager application built with:

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Express + TypeORM + SQLite
- **Database**: SQLite (file-based, ideal for lightweight apps)

## 🚀 Live Demo

🌐 [Task Manager Live](https://task-manager-mtfn.vercel.app/)

## 📦 Features

- ✅ Create, update, delete tasks
- 🗂️ Filter tasks by status (To Do, In Progress, Done)
- 🔍 Search and pagination (coming soon)
- 📆 Due date and status tracking
- 🎯 Responsive and clean UI with Tailwind CSS

## 🛠️ Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | React (Next.js) + Tailwind CSS |
| Backend   | Express + TypeORM + SQLite |
| Hosting   | Vercel (Frontend), Render (Backend) |

## 🧪 Local Development

### Backend

```bash
cd backend
npm install
npm run dev
Runs on http://localhost:5000
```
### Frontend
```bash
cd frontend
npm install
npm run dev
http://localhost:3000
```
Add `env` configuration:
```markdown
> Make sure to set the environment variable in `frontend/.env.local`:
```
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api



