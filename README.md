# 🔖 BookmarkHub

BookmarkHub is a modern full-stack web application built with Next.js and Supabase that allows users to securely save, manage, and organize their favorite links in one place.

## 🚀 Live Demo
https://bookmark-app-ten.vercel.app/

---

## 📌 Features

- 🔐 Google Authentication (via Supabase Auth)
- ➕ Add new bookmarks
- 🗑 Delete bookmarks instantly
- 📋 View all saved bookmarks
- ⚡ Real-time UI updates without refresh
- 🎨 Clean and responsive UI using Tailwind CSS
- ☁️ Deployed on Vercel

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router, Client Components)
- **Styling:** Tailwind CSS
- **Backend / Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Google OAuth)
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

app/
dashboard/
page.tsx
lib/
supabase.ts


---

## ⚙️ Setup Instructions (Local Development)

1. Clone the repository:
git clone https://github.com/mdsaifali09/Bookmark-App.git

2. Install dependencies:
npm install


3. Create a `.env.local` file and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key


4. Run the development server:


npm run dev


---

## 🧠 Challenges Faced & Solutions

### 1️⃣ Bookmarks not updating without refresh

**Problem:**  
After adding a bookmark, it only appeared after manually refreshing the page.

**Cause:**  
The UI state was not updating after database insertion.

**Solution:**  
Used `.select()` after inserting into Supabase and updated React state manually using:

```js
setBookmarks((prev) => [...data, ...prev])
This ensured immediate UI updates without requiring a page refresh.

2️⃣ Environment Variables not working in production

Problem:
Supabase authentication failed after deployment.

Cause:
.env.local file does not get pushed to GitHub.

Solution:
Manually added environment variables in Vercel dashboard under:
Settings → Environment Variables.

3️⃣ Google OAuth not working after deployment

Problem:
Google login failed in production.

Solution:
Added production URL in:

Supabase → Authentication → URL Configuration

Google Cloud Console → Authorized Origins

📈 Improvements I Plan to Add

Edit bookmark feature

Duplicate URL validation

Toast notifications

Loading states

Search & filter functionality

Drag & drop sorting

💡 What I Learned

Handling authentication securely in production

Managing environment variables in deployment

React state synchronization with backend

Full deployment pipeline (GitHub → Vercel → Supabase)

👨‍💻 Author

Built by [Md Saif Ali]

📄 License

This project is for learning and demonstration purposes.

