# Next.js Project Setup Guide

This README provides detailed setup instructions for your Next.js project configured with Clerk authentication and Neon PostgreSQL database. Follow these steps to get your project up and running.

---

## 🚀 Getting Started

### 🔑 Get All Required API Keys
Use the links below to create accounts and generate your API keys:

- 📜 **Clerk:** https://go.clerk.com/UsvFQQ5
- 🔗 **CodeRabbit:** https://coderabbit.link/tubeguruji
- 📦 **Neon DB:** https://fyi.neon.tech/tg8
- 📜 **Eraser Docs:** https://dcmk.short.gy/codebox-doc
- 🚀 **TubeGuruji Pro:** https://www.tubeguruji.com

---

## 🚀 Getting Started

### 0. **Download the Source Code ZIP**
1. Download the project ZIP file provided.
2. Unzip the file on your system.
3. Open **VS Code**.
4. Click **File → Open Folder** and select the unzipped project folder.

---

## 🚀 Project Setup

### 1. Install Dependencies
Run the following command inside your project folder:
```bash
npm install
```

⚠️ **If you face dependency installation issues**, run:
```bash
npm install --legacy-peer-deps
```

---

## 🔐 Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW1tZW5zZS1xdWFpbC0xNy5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_kabrziZZm664EZuUGZiZIu2kzAVDYo3enEJVJY6t3M

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

DATABASE_URL=postgresql://accounts:mv4Mx0OdHZQA@ep-weathered-heart-a58wmzem-pooler.us-east-2.aws.neon.tech/CodeBox?sslmode=require&channel_binding=require
```

---

## 🗄️ Database Setup (Neon + Drizzle/Prisma)

### 1. **Test Your Database Connection**
```bash
npm run db:push
```
_or depending on your ORM:_
```bash
npx drizzle-kit push
```
```bash
npx prisma db push
```

---

## ▶️ Running the Project

```bash
npm run dev
```
Your application will run at:
```
http://localhost:3000
```

---

## 🛠 Troubleshooting

### ❌ **npm install not working?**
Use:
```bash
npm install --legacy-peer-deps
```

### ❌ Clerk keys not loading?
- Ensure `.env.local` is added in the **root directory**.
- Restart the dev server.

### ❌ Database connection failing?
- Make sure your Neon DB is **active**.
- Verify `DATABASE_URL` is correct.

---

## 📦 Build for Production
```bash
npm run build
npm run start
```

---

## 📚 Additional Notes
- Do **NOT** commit your `.env.local` file to GitHub.
- Rotate Clerk or DB keys immediately if leaked.

---

If you need me to add instructions for **deployment on Vercel**, **Clerk webhook setup**, or **drizzle folder structure**, just ask! 🚀

